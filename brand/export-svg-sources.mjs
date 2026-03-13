/**
 * Export all SVG sources used by build-psd-pro.mjs
 * into organized directories for the designer package.
 *
 * Output: AEGIS_NETWORK_DESIGNER/03_SOURCES_SVG/
 *   logos/      — Aegis Network logo variants
 *   icons/      — UI icons (Lucide-style)
 */

import fs from 'fs';
import path from 'path';

const OUT_BASE = path.join(
  process.env.USERPROFILE || process.env.HOME,
  'Documents', 'AEGIS_NETWORK_DESIGNER', '03_SOURCES_SVG',
);

function ensureDir(dir) { fs.mkdirSync(dir, { recursive: true }); }

// ── Logos ──

function aegisLogoSvg(strokeColor = 'url(#g)', nodeColor1 = '#60A5FA', nodeColor2 = '#7C3AED') {
  return `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
    <stop offset="0%" stop-color="#2563EB"/><stop offset="100%" stop-color="#7C3AED"/>
  </linearGradient></defs>
  <path d="M15 85 L50 15 L85 85" stroke="${strokeColor}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="82" cy="18" r="4" fill="${nodeColor1}"/>
  <circle cx="92" cy="32" r="3" fill="${nodeColor1}" opacity="0.6"/>
  <circle cx="72" cy="8" r="3" fill="${nodeColor2}" opacity="0.8"/>
  <path d="M65 35 L82 18" stroke="${strokeColor}" stroke-width="1.5" stroke-dasharray="4 4"/>
</svg>`;
}

function aegisLogoCleanSvg(strokeColor = 'url(#g)') {
  return `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
    <stop offset="0%" stop-color="#2563EB"/><stop offset="100%" stop-color="#7C3AED"/>
  </linearGradient></defs>
  <path d="M15 85 L50 15 L85 85" stroke="${strokeColor}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
}

// ── Icons (Lucide-style) ──

const ICONS = {
  phone: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
  mail: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`,
  globe: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
  mapPin: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
  clipboard: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/></svg>`,
  networkGlobe: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
  bolt: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>`,
  users: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>`,
  chart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>`,
  lock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>`,
  alertTriangle: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>`,
  checkCircle: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
  arrowRight: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`,
  shieldCheck: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>`,
  trendingUp: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>`,
};

// ── Export ──

function main() {
  const logoDir = path.join(OUT_BASE, 'logos');
  const iconDir = path.join(OUT_BASE, 'icons');
  ensureDir(logoDir);
  ensureDir(iconDir);

  // Logo variants
  const logoVariants = {
    'aegis-symbol-gradient.svg': aegisLogoSvg(),
    'aegis-symbol-white.svg': aegisLogoSvg('#FFFFFF', '#FFFFFF', '#FFFFFF'),
    'aegis-symbol-blue.svg': aegisLogoSvg('#3B82F6', '#60A5FA', '#7C3AED'),
    'aegis-symbol-clean-gradient.svg': aegisLogoCleanSvg(),
    'aegis-symbol-clean-white.svg': aegisLogoCleanSvg('#FFFFFF'),
    'aegis-symbol-clean-blue.svg': aegisLogoCleanSvg('#3B82F6'),
  };

  for (const [name, svg] of Object.entries(logoVariants)) {
    fs.writeFileSync(path.join(logoDir, name), svg, 'utf8');
    console.log(`  ✓ logos/${name}`);
  }

  // Icons
  for (const [key, svg] of Object.entries(ICONS)) {
    fs.writeFileSync(path.join(iconDir, `${key}.svg`), svg, 'utf8');
    console.log(`  ✓ icons/${key}.svg`);
  }

  console.log(`\nExported ${Object.keys(logoVariants).length} logos + ${Object.keys(ICONS).length} icons → ${OUT_BASE}`);
}

main();
