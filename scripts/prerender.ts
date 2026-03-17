/**
 * Build-time SSR prerender script.
 *
 * Flow:
 *   1. Vite builds a Node-compatible SSR bundle from src/entry-server.tsx
 *   2. The bundle is imported and its render() fn produces the full HTML string
 *   3. The <!--ssr-outlet--> placeholder in dist/index.html is replaced with that HTML
 *   4. The temporary SSR build artefacts (dist-ssr/) are deleted
 *
 * Run:  tsx scripts/prerender.ts
 * Wired into the build script in package.json: vite build && tsx scripts/prerender.ts
 *
 * No Node runtime is shipped to production — this script runs locally at build time only.
 */
import { readFileSync, writeFileSync, rmSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { build } from 'vite';
import react from '@vitejs/plugin-react';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '..');

async function prerender() {
  // ── 1. Build SSR bundle ────────────────────────────────────────────────────
  console.log('[prerender] Building SSR bundle…');
  await build({
    root: rootDir,
    configFile: false, // Minimal config — no Tailwind plugin needed for HTML rendering
    plugins: [react()],
    resolve: {
      alias: { '@': rootDir },
    },
    build: {
      ssr: resolve(rootDir, 'src/entry-server.tsx'),
      outDir: resolve(rootDir, 'dist-ssr'),
      rollupOptions: {
        output: { format: 'es' },
      },
    },
    ssr: {
      // Bundle motion/react inline to avoid Node ESM resolution issues
      noExternal: ['motion', 'motion/react'],
    },
    logLevel: 'warn',
  });

  // ── 2. Render to HTML string ───────────────────────────────────────────────
  console.log('[prerender] Rendering app to HTML…');
  const entryPath = resolve(rootDir, 'dist-ssr', 'entry-server.js');
  // pathToFileURL ensures Windows-compatible file:// URL for dynamic import
  const { render } = (await import(pathToFileURL(entryPath).href)) as {
    render: () => string;
  };
  const appHtmlRaw = render();

  // Strip Framer Motion's initial animation inline-style from heading elements.
  // H2–H6 are plain <h> elements (not motion components) so they have no inline styles.
  // Only motion.h1 in the hero has opacity:0;transform:... from the SSR initial state.
  // Removing it keeps the H1 visible in the HTML source for SEO tools and avoids
  // a blank-page flash before JS hydrates.
  // React reconciles the style difference gracefully during hydrateRoot.
  const appHtml = appHtmlRaw.replace(
    /(<h[1-6][^>]*?) style="opacity[^"]*"/g,
    '$1',
  );

  // ── 3. Inject rendered HTML into dist/index.html ───────────────────────────
  const templatePath = resolve(rootDir, 'dist', 'index.html');
  let html = readFileSync(templatePath, 'utf-8');

  const OUTLET = '<!--ssr-outlet-->';
  if (!html.includes(OUTLET)) {
    throw new Error(
      `${OUTLET} not found in dist/index.html — run "vite build" before this script.`,
    );
  }
  html = html.replace(OUTLET, appHtml);

  writeFileSync(templatePath, html, 'utf-8');

  // ── 4. Clean up SSR build artefacts ───────────────────────────────────────
  rmSync(resolve(rootDir, 'dist-ssr'), { recursive: true, force: true });

  const kb = Math.round(readFileSync(templatePath).length / 1024);
  console.log(`[prerender] ✓ dist/index.html updated (${kb} kB) — prerender complete`);
}

prerender().catch((err: unknown) => {
  console.error('[prerender] Failed:', err);
  process.exit(1);
});
