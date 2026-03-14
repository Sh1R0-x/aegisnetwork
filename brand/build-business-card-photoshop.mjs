import { spawnSync } from 'child_process';
import { createCanvas } from '@napi-rs/canvas';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const REPO_ROOT = path.resolve('.');
const BRAND_DIR = path.join(REPO_ROOT, 'brand');
const GENERATED_DIR = path.join(BRAND_DIR, '.generated', 'business-card');
const ASSETS_DIR = path.join(GENERATED_DIR, 'assets');
const PSD_DIR = path.join(GENERATED_DIR, 'psd');
const MANIFEST_PATH = path.join(GENERATED_DIR, 'manifest.json');
const CONFIG_PATH = path.join(BRAND_DIR, 'business-card.config.json');
const JSX_PATH = path.join(BRAND_DIR, 'photoshop', 'build-business-card.jsx');

const DOC = {
  widthPx: 1075,
  heightPx: 720,
  resolution: 300,
  bleedPx: 35,
  safePx: 59,
};

const COLORS = {
  aegisBlue: '#2563EB',
  opticalBlue: '#3B82F6',
  deepViolet: '#7C3AED',
  slate900: '#0F172A',
  slate700: '#334155',
  slate400: '#94A3B8',
  slate50: '#F8FAFC',
  white: '#FFFFFF',
};

const ICONS = {
  phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>',
  globe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
};

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function angleGradient(ctx, width, height, angleDeg) {
  const angle = (angleDeg * Math.PI) / 180;
  const cx = width / 2;
  const cy = height / 2;
  const len = Math.sqrt(width * width + height * height) / 2;

  return ctx.createLinearGradient(
    cx - Math.cos(angle) * len,
    cy - Math.sin(angle) * len,
    cx + Math.cos(angle) * len,
    cy + Math.sin(angle) * len,
  );
}

function writeCanvasPng(canvas, filepath) {
  ensureDir(path.dirname(filepath));
  fs.writeFileSync(filepath, canvas.toBuffer('image/png'));
}

async function svgFileToPng(svgPath, outPath, width, height) {
  const buffer = await sharp(svgPath, { density: 300 })
    .resize(width, height, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  ensureDir(path.dirname(outPath));
  fs.writeFileSync(outPath, buffer);
}

async function svgStringToPng(svg, outPath, width, height) {
  const buffer = await sharp(Buffer.from(svg), { density: 300 })
    .resize(width, height, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  ensureDir(path.dirname(outPath));
  fs.writeFileSync(outPath, buffer);
}

function renderVerticalAccent() {
  const canvas = createCanvas(8, DOC.heightPx - DOC.bleedPx * 2);
  const ctx = canvas.getContext('2d');
  const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
  grad.addColorStop(0, COLORS.aegisBlue);
  grad.addColorStop(1, COLORS.deepViolet);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  writeCanvasPng(canvas, path.join(ASSETS_DIR, 'accent-vertical.png'));
}

function renderHorizontalAccent() {
  const canvas = createCanvas(DOC.widthPx - DOC.bleedPx * 2, 8);
  const ctx = canvas.getContext('2d');
  const grad = ctx.createLinearGradient(0, 0, canvas.width, 0);
  grad.addColorStop(0, COLORS.aegisBlue);
  grad.addColorStop(1, COLORS.deepViolet);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  writeCanvasPng(canvas, path.join(ASSETS_DIR, 'accent-horizontal.png'));
}

function renderRectoOrb() {
  const canvas = createCanvas(400, 400);
  const ctx = canvas.getContext('2d');
  const grad = ctx.createRadialGradient(200, 200, 0, 200, 200, 180);
  grad.addColorStop(0, 'rgba(37,99,235,0.06)');
  grad.addColorStop(1, 'rgba(124,58,237,0.03)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 400, 400);
  writeCanvasPng(canvas, path.join(ASSETS_DIR, 'recto-orb.png'));
}

function renderVersoBackground() {
  const canvas = createCanvas(DOC.widthPx, DOC.heightPx);
  const ctx = canvas.getContext('2d');
  const grad = angleGradient(ctx, canvas.width, canvas.height, 145);
  grad.addColorStop(0, COLORS.slate900);
  grad.addColorStop(1, '#131B2E');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  writeCanvasPng(canvas, path.join(ASSETS_DIR, 'verso-background.png'));
}

function renderVersoGlows() {
  const blue = createCanvas(DOC.widthPx, DOC.heightPx);
  const blueCtx = blue.getContext('2d');
  let grad = blueCtx.createRadialGradient(DOC.widthPx * 0.2, DOC.heightPx * 0.2, 0, DOC.widthPx * 0.2, DOC.heightPx * 0.2, DOC.widthPx * 0.5);
  grad.addColorStop(0, 'rgba(37,99,235,0.06)');
  grad.addColorStop(1, 'rgba(37,99,235,0)');
  blueCtx.fillStyle = grad;
  blueCtx.fillRect(0, 0, blue.width, blue.height);
  writeCanvasPng(blue, path.join(ASSETS_DIR, 'verso-glow-blue.png'));

  const violet = createCanvas(DOC.widthPx, DOC.heightPx);
  const violetCtx = violet.getContext('2d');
  grad = violetCtx.createRadialGradient(DOC.widthPx * 0.8, DOC.heightPx * 0.8, 0, DOC.widthPx * 0.8, DOC.heightPx * 0.8, DOC.widthPx * 0.4);
  grad.addColorStop(0, 'rgba(124,58,237,0.04)');
  grad.addColorStop(1, 'rgba(124,58,237,0)');
  violetCtx.fillStyle = grad;
  violetCtx.fillRect(0, 0, violet.width, violet.height);
  writeCanvasPng(violet, path.join(ASSETS_DIR, 'verso-glow-violet.png'));
}

async function renderAssets() {
  ensureDir(ASSETS_DIR);

  await Promise.all([
    svgFileToPng(path.join(BRAND_DIR, 'assets', 'logo-icon-gradient.svg'), path.join(ASSETS_DIR, 'logo-gradient-80.png'), 80, 80),
    svgFileToPng(path.join(BRAND_DIR, 'assets', 'logo-icon-gradient.svg'), path.join(ASSETS_DIR, 'logo-gradient-160.png'), 160, 160),
    svgFileToPng(path.join(BRAND_DIR, 'assets', 'logo-icon-dark.svg'), path.join(ASSETS_DIR, 'logo-dark-80.png'), 80, 80),
    svgStringToPng(ICONS.phone.replace(/currentColor/g, COLORS.slate700), path.join(ASSETS_DIR, 'icon-phone.png'), 28, 28),
    svgStringToPng(ICONS.mail.replace(/currentColor/g, COLORS.slate700), path.join(ASSETS_DIR, 'icon-mail.png'), 28, 28),
    svgStringToPng(ICONS.globe.replace(/currentColor/g, COLORS.slate700), path.join(ASSETS_DIR, 'icon-globe.png'), 28, 28),
  ]);

  renderVerticalAccent();
  renderHorizontalAccent();
  renderRectoOrb();
  renderVersoBackground();
  renderVersoGlows();
}

function buildManifest() {
  const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
  const manifest = {
    generatedAt: new Date().toISOString(),
    document: DOC,
    colors: {
      aegisBlue: { r: 37, g: 99, b: 235 },
      opticalBlue: { r: 59, g: 130, b: 246 },
      deepViolet: { r: 124, g: 58, b: 237 },
      slate900: { r: 15, g: 23, b: 42 },
      slate700: { r: 51, g: 65, b: 85 },
      slate400: { r: 148, g: 163, b: 184 },
      slate50: { r: 248, g: 250, b: 252 },
      white: { r: 255, g: 255, b: 255 },
    },
    identity: config.identity,
    contact: config.contact,
    referencePreview: config.referencePreview,
    paths: {
      assetsDir: ASSETS_DIR,
      outputDir: PSD_DIR,
      recto: path.join(PSD_DIR, 'business-card-recto.psd'),
      rectoAlt: path.join(PSD_DIR, 'business-card-recto-alt.psd'),
      verso: path.join(PSD_DIR, 'business-card-verso.psd'),
      rectoPreview: path.join(PSD_DIR, 'business-card-recto.png'),
      rectoAltPreview: path.join(PSD_DIR, 'business-card-recto-alt.png'),
      versoPreview: path.join(PSD_DIR, 'business-card-verso.png'),
      logoGradient80: path.join(ASSETS_DIR, 'logo-gradient-80.png'),
      logoGradient160: path.join(ASSETS_DIR, 'logo-gradient-160.png'),
      logoDark80: path.join(ASSETS_DIR, 'logo-dark-80.png'),
      iconPhone: path.join(ASSETS_DIR, 'icon-phone.png'),
      iconMail: path.join(ASSETS_DIR, 'icon-mail.png'),
      iconGlobe: path.join(ASSETS_DIR, 'icon-globe.png'),
      accentVertical: path.join(ASSETS_DIR, 'accent-vertical.png'),
      accentHorizontal: path.join(ASSETS_DIR, 'accent-horizontal.png'),
      rectoOrb: path.join(ASSETS_DIR, 'recto-orb.png'),
      versoBackground: path.join(ASSETS_DIR, 'verso-background.png'),
      versoGlowBlue: path.join(ASSETS_DIR, 'verso-glow-blue.png'),
      versoGlowViolet: path.join(ASSETS_DIR, 'verso-glow-violet.png'),
    },
  };

  ensureDir(path.dirname(MANIFEST_PATH));
  fs.writeFileSync(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
  return manifest;
}

function runPhotoshop() {
  const escapedJsxPath = JSX_PATH.replace(/'/g, "''");
  const powershellCommand = [
    '$ErrorActionPreference = "Stop"',
    '$ps = New-Object -ComObject Photoshop.Application',
    '$ps.DisplayDialogs = 3',
    `$ps.DoJavaScriptFile('${escapedJsxPath}')`,
  ].join('; ');

  return spawnSync('powershell', ['-NoProfile', '-Command', powershellCommand], {
    cwd: REPO_ROOT,
    stdio: 'inherit',
  });
}

function verifyOutputs(manifest, startedAt) {
  const required = [
    manifest.paths.recto,
    manifest.paths.rectoAlt,
    manifest.paths.verso,
    manifest.paths.rectoPreview,
    manifest.paths.rectoAltPreview,
    manifest.paths.versoPreview,
  ];
  const missing = required.filter((filepath) => !fs.existsSync(filepath));

  if (missing.length) {
    throw new Error(`PSD manquants après génération: ${missing.join(', ')}`);
  }

  const stale = required.filter((filepath) => fs.statSync(filepath).mtimeMs + 1000 < startedAt);
  if (stale.length) {
    throw new Error(`PSD non régénérés pendant ce run: ${stale.join(', ')}`);
  }

  return required.map((filepath) => ({
    filepath,
    sizeKB: Math.round(fs.statSync(filepath).size / 1024),
  }));
}

async function main() {
  ensureDir(PSD_DIR);
  await renderAssets();
  const manifest = buildManifest();
  const startedAt = Date.now();
  const result = runPhotoshop();
  const outputs = verifyOutputs(manifest, startedAt);

  console.log('\nBusiness card Photoshop build complete:');
  for (const output of outputs) {
    console.log(`  ${path.relative(REPO_ROOT, output.filepath)} (${output.sizeKB} KB)`);
  }

  if (result.status && result.status !== 0) {
    console.warn(`\nPhotoshop a renvoyé le code ${result.status}, mais les PSD attendus ont bien été régénérés.`);
  }
}

main().catch((error) => {
  console.error(`\nBusiness card Photoshop build failed: ${error.message}`);
  process.exitCode = 1;
});
