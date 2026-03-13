/**
 * AEGIS NETWORK — PSD Builder v2 (Reconstruction complète)
 * =========================================================
 * Génère tous les PSD avec :
 * - Vrais calques texte Photoshop (éditables)
 * - Chaque élément sur son propre calque
 * - Groupes logiques nommés en français
 * - Couleurs strictement conformes au référentiel de marque
 * - Polices Inter avec les bonnes graisses
 * - Structure exploitable pour modification rapide
 *
 * Référentiel couleurs :
 *   Aegis Blue    #2563EB  rgb(37,99,235)   — Primaire, CTAs
 *   Optical Blue  #3B82F6  rgb(59,130,246)  — Accents, icônes
 *   Deep Violet   #7C3AED  rgb(124,58,237)  — Secondaire, gradients
 *   Deep BG       #020617  rgb(2,6,23)      — Fond principal
 *   Slate 900     #0F172A  rgb(15,23,42)    — Cards, surfaces
 *   Slate 800     #1E293B  rgb(30,41,59)    — Bordures
 *   Slate 700     #334155  rgb(51,65,85)    — Texte tertiaire
 *   Slate 400     #94A3B8  rgb(148,163,184) — Texte courant (fond sombre)
 *   Slate 300     #CBD5E1  rgb(203,213,225) — Texte secondaire
 *   Slate 200     #E2E8F0  rgb(226,232,240) — Texte principal (fond sombre)
 *   Slate 50      #F8FAFC  rgb(248,250,252) — Fond clair
 *
 * Typographie :
 *   Wordmark "AEGIS NETWORK" : Inter Black, tracking 0.06em, word-spacing 0.2em
 *   Baseline "Conseil & Optimisation IT" : Inter Bold, tracking 0.25em
 *   Titres : Inter Black (900), tracking -0.02em à -0.03em
 *   Sous-titres : Inter Bold (700)
 *   Corps : Inter Medium (500) ou Regular (400→Medium fallback)
 *   Labels : Inter Bold, uppercase, tracking 0.15em
 *
 * Output: C:\Users\Ludovic\Documents\AEGIS_NETWORK_DESIGNER\01_PSD_EDITABLE\
 *
 * Dependencies: ag-psd, @napi-rs/canvas, sharp
 */

import { createCanvas, GlobalFonts, Image as CanvasImage } from '@napi-rs/canvas';
import { initializeCanvas, writePsdBuffer } from 'ag-psd';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// ─── Register @napi-rs/canvas with ag-psd ────────────────────────────
initializeCanvas(
  (w, h) => createCanvas(w, h),
  (data) => {
    const img = new CanvasImage();
    img.src = Buffer.from(data);
    const c = createCanvas(img.width, img.height);
    c.getContext('2d').drawImage(img, 0, 0);
    return c;
  }
);

// ─── Register Inter fonts ────────────────────────────────────────────
const FONT_DIR = path.join(process.env.LOCALAPPDATA || '', 'Microsoft', 'Windows', 'Fonts');
const FONT_FILES = [
  'Inter-Medium.ttf',    // 400/500 (no Regular static, Medium is closest)
  'Inter-SemiBold.ttf',  // 600
  'Inter-Bold.ttf',      // 700
  'Inter-ExtraBold.ttf', // 800
  'Inter-Black.ttf',     // 900
];
for (const fname of FONT_FILES) {
  for (const dir of [FONT_DIR, 'C:\\Windows\\Fonts']) {
    const fp = path.join(dir, fname);
    if (fs.existsSync(fp)) {
      try { GlobalFonts.registerFromPath(fp); } catch { /* silent */ }
      break;
    }
  }
}

// ─── Output directories ──────────────────────────────────────────────
const OUT_BASE = 'C:\\Users\\Ludovic\\Documents\\AEGIS_NETWORK_DESIGNER';
const OUT_PSD = path.join(OUT_BASE, '01_PSD_EDITABLE');
const OUT_PSD_LOGOS = path.join(OUT_PSD, 'logos');
const OUT_PSD_DOCS = path.join(OUT_PSD, 'documents');

function ensureDir(dir) { fs.mkdirSync(dir, { recursive: true }); }

// ═══════════════════════════════════════════════════════════════════════
// BRAND COLORS (référentiel strict)
// ═══════════════════════════════════════════════════════════════════════
const C = {
  aegisBlue:   { r: 37,  g: 99,  b: 235 }, // #2563EB — Primaire
  opticalBlue: { r: 59,  g: 130, b: 246 }, // #3B82F6 — Accents
  deepViolet:  { r: 124, g: 58,  b: 237 }, // #7C3AED — Secondaire
  skyAccent:   { r: 56,  g: 189, b: 248 }, // #38BDF8 — Halos
  nodeBlue:    { r: 96,  g: 165, b: 250 }, // #60A5FA — Nodes logo
  deepBg:      { r: 2,   g: 6,   b: 23  }, // #020617 — Fond principal
  slate900:    { r: 15,  g: 23,  b: 42  }, // #0F172A — Cards
  slate800:    { r: 30,  g: 41,  b: 59  }, // #1E293B — Bordures
  slate700:    { r: 51,  g: 65,  b: 85  }, // #334155 — Texte tertiaire
  slate400:    { r: 148, g: 163, b: 184 }, // #94A3B8 — Texte courant
  slate300:    { r: 203, g: 213, b: 225 }, // #CBD5E1 — Texte secondaire
  slate200:    { r: 226, g: 232, b: 240 }, // #E2E8F0 — Texte principal
  slate50:     { r: 248, g: 250, b: 252 }, // #F8FAFC — Fond clair
  white:       { r: 255, g: 255, b: 255 }, // #FFFFFF
  black:       { r: 0,   g: 0,   b: 0   }, // #000000
};

// ═══════════════════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════════════════

/** Render SVG to canvas at given size */
async function svgToCanvas(svgInput, width, height) {
  let buf;
  if (typeof svgInput === 'string' && fs.existsSync(svgInput)) {
    buf = await sharp(fs.readFileSync(svgInput), { density: 300 })
      .resize(width, height, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png().toBuffer();
  } else {
    const svgBuf = Buffer.from(typeof svgInput === 'string' ? svgInput : svgInput);
    buf = await sharp(svgBuf, { density: 300 })
      .resize(width, height, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png().toBuffer();
  }
  const img = new CanvasImage();
  img.src = buf;
  const canvas = createCanvas(width, height);
  canvas.getContext('2d').drawImage(img, 0, 0, width, height);
  return canvas;
}

/** Create solid color canvas */
function solidCanvas(w, h, color, alpha = 255) {
  const canvas = createCanvas(w, h);
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = `rgba(${color.r},${color.g},${color.b},${alpha / 255})`;
  ctx.fillRect(0, 0, w, h);
  return canvas;
}

/** Create linear gradient canvas */
function gradientCanvas(w, h, stops, direction = 'horizontal') {
  const canvas = createCanvas(w, h);
  const ctx = canvas.getContext('2d');
  let grad;
  if (direction === 'horizontal') grad = ctx.createLinearGradient(0, 0, w, 0);
  else if (direction === 'vertical') grad = ctx.createLinearGradient(0, 0, 0, h);
  else if (direction === 'diagonal') grad = ctx.createLinearGradient(0, 0, w, h);
  else {
    const angle = parseFloat(direction) * Math.PI / 180;
    const cx2 = w / 2, cy2 = h / 2, len = Math.sqrt(w * w + h * h) / 2;
    grad = ctx.createLinearGradient(
      cx2 - Math.cos(angle) * len, cy2 - Math.sin(angle) * len,
      cx2 + Math.cos(angle) * len, cy2 + Math.sin(angle) * len
    );
  }
  for (const [pos, color] of stops) grad.addColorStop(pos, color);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);
  return canvas;
}

/** Create radial glow canvas */
function radialGlowCanvas(w, h, cx, cy, radius, color, opacity) {
  const canvas = createCanvas(w, h);
  const ctx = canvas.getContext('2d');
  const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
  grad.addColorStop(0, `rgba(${color.r},${color.g},${color.b},${opacity})`);
  grad.addColorStop(1, `rgba(${color.r},${color.g},${color.b},0)`);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);
  return canvas;
}

/** Create rounded rectangle canvas */
function roundedRectCanvas(w, h, radius, color, alpha = 255) {
  const canvas = createCanvas(w, h);
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = `rgba(${color.r},${color.g},${color.b},${alpha / 255})`;
  ctx.beginPath();
  ctx.roundRect(0, 0, w, h, radius);
  ctx.fill();
  return canvas;
}

/** Rounded rect with border only */
function roundedRectStroke(w, h, radius, strokeColor, strokeWidth = 2) {
  const canvas = createCanvas(w, h);
  const ctx = canvas.getContext('2d');
  ctx.strokeStyle = `rgba(${strokeColor.r},${strokeColor.g},${strokeColor.b},0.3)`;
  ctx.lineWidth = strokeWidth;
  ctx.beginPath();
  ctx.roundRect(strokeWidth, strokeWidth, w - strokeWidth * 2, h - strokeWidth * 2, radius);
  ctx.stroke();
  return canvas;
}

/** Vertical gradient bar (Aegis Blue → Deep Violet) */
function verticalGradientBar(w, h) {
  return gradientCanvas(w, h, [[0, '#2563EB'], [1, '#7C3AED']], 'vertical');
}

/** Horizontal gradient bar */
function horizontalGradientBar(w, h) {
  return gradientCanvas(w, h, [[0, '#2563EB'], [1, '#7C3AED']], 'horizontal');
}

/** Diagonal gradient (for icon backgrounds) */
function diagonalGradientCanvas(w, h) {
  return gradientCanvas(w, h, [[0, '#2563EB'], [1, '#7C3AED']], 'diagonal');
}

/** Create a rounded gradient rect */
function roundedGradientCanvas(w, h, radius) {
  const canvas = createCanvas(w, h);
  const ctx = canvas.getContext('2d');
  const grad = ctx.createLinearGradient(0, 0, w, h);
  grad.addColorStop(0, '#2563EB');
  grad.addColorStop(1, '#7C3AED');
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.roundRect(0, 0, w, h, radius);
  ctx.fill();
  return canvas;
}

/** Network pattern */
function networkPatternCanvas(w, h, opacity = 0.04) {
  const canvas = createCanvas(w, h);
  const ctx = canvas.getContext('2d');
  ctx.globalAlpha = opacity;
  ctx.strokeStyle = '#FFFFFF';
  ctx.fillStyle = '#FFFFFF';
  const step = 60;
  for (let x = step; x < w; x += step) {
    for (let y = step; y < h; y += step) {
      ctx.beginPath();
      ctx.arc(x, y, 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + step, y - step);
      ctx.stroke();
    }
  }
  return canvas;
}

// ─── Text layer builder ──────────────────────────────────────────────
/**
 * Create a true Photoshop text layer.
 * ag-psd with invalidateTextLayers will render these as real text.
 */
function textLayer(name, text, x, y, opts = {}) {
  const {
    fontSize = 24,
    color = C.white,
    tracking = 0,
    leading,
    weight = 'medium',
    justification = 'left',
  } = opts;

  const fontNameMap = {
    'black': 'Inter-Black',
    'extrabold': 'Inter-ExtraBold',
    'bold': 'Inter-Bold',
    'semibold': 'Inter-SemiBold',
    'medium': 'Inter-Medium',
    'regular': 'Inter-Medium', // No Inter-Regular static available
  };

  const fontName = fontNameMap[weight] || 'Inter-Medium';

  return {
    name,
    text: {
      text,
      transform: [1, 0, 0, 1, x, y],
      antiAlias: 'smooth',
      style: {
        font: { name: fontName },
        fontSize,
        fillColor: color,
        tracking: Math.round(tracking * 1000),
        ...(leading ? { leading } : {}),
        autoLeading: !leading,
      },
      paragraphStyle: {
        justification,
      },
    },
  };
}

/** Save PSD with error handling and size report */
function savePsd(filepath, psd) {
  try {
    const buf = writePsdBuffer(psd, { invalidateTextLayers: true });
    ensureDir(path.dirname(filepath));
    fs.writeFileSync(filepath, buf);
    const sizeKB = Math.round(fs.statSync(filepath).size / 1024);
    console.log(`  ✓  ${path.basename(filepath)} (${sizeKB} KB)`);
    return true;
  } catch (e) {
    console.error(`  ✗  ${path.basename(filepath)}: ${e.message}`);
    return false;
  }
}

// ─── SVG logo builders ───────────────────────────────────────────────
function aegisLogoSvg(stroke = 'url(#g)', nodeColor1 = '#60A5FA', nodeColor2 = '#7C3AED') {
  return `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
    <stop offset="0%" stop-color="#2563EB"/><stop offset="100%" stop-color="#7C3AED"/>
  </linearGradient></defs>
  <path d="M15 85 L50 15 L85 85" stroke="${stroke}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="82" cy="18" r="4" fill="${nodeColor1}"/>
  <circle cx="92" cy="32" r="3" fill="${nodeColor1}" opacity="0.6"/>
  <circle cx="72" cy="8" r="3" fill="${nodeColor2}" opacity="0.8"/>
  <path d="M65 35 L82 18" stroke="${stroke}" stroke-width="1.5" stroke-dasharray="4 4"/>
</svg>`;
}

function aegisLogoCleanSvg(stroke = 'url(#g)') {
  return `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
    <stop offset="0%" stop-color="#2563EB"/><stop offset="100%" stop-color="#7C3AED"/>
  </linearGradient></defs>
  <path d="M15 85 L50 15 L85 85" stroke="${stroke}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
}

// ─── Lucide-style SVG icons ──────────────────────────────────────────
const ICONS = {
  phone: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
  mail: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`,
  globe: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
  mapPin: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
  clipboard: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/></svg>`,
  bolt: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>`,
  users: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>`,
  chart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>`,
  lock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>`,
  alertTriangle: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>`,
  checkCircle: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
  shield: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
};

async function iconCanvas(iconKey, size, strokeColor = '#94A3B8') {
  let svg = ICONS[iconKey];
  if (!svg) throw new Error(`Unknown icon: ${iconKey}`);
  svg = svg.replace(/stroke="currentColor"/g, `stroke="${strokeColor}"`);
  return svgToCanvas(svg, size, size);
}

// ═══════════════════════════════════════════════════════════════════════
// 1. LOGO PSDs
// ═══════════════════════════════════════════════════════════════════════
async function buildLogoPSDs() {
  console.log('\n━━━ LOGOS ━━━\n');

  const SZ = 2048;
  const CAN = 3000;
  const off = (CAN - SZ) / 2;

  // Pre-render symbol variants
  const symGradient = await svgToCanvas(aegisLogoSvg(), SZ, SZ);
  const symClean = await svgToCanvas(aegisLogoCleanSvg(), SZ, SZ);
  const symWhite = await svgToCanvas(aegisLogoSvg('#FFFFFF', '#FFFFFF', '#FFFFFF'), SZ, SZ);
  const symBlue = await svgToCanvas(aegisLogoSvg('#2563EB', '#2563EB', '#2563EB'), SZ, SZ);
  const symDark = await svgToCanvas(aegisLogoSvg('#0F172A', '#0F172A', '#0F172A'), SZ, SZ);

  // ── Logo Master Fond Sombre ──
  savePsd(path.join(OUT_PSD_LOGOS, 'logo-master-fond-sombre.psd'), {
    width: CAN, height: CAN,
    children: [
      { name: 'Fond sombre #020617', canvas: solidCanvas(CAN, CAN, C.deepBg), top: 0, left: 0, bottom: CAN, right: CAN },
      { name: 'Lueur bleue', canvas: radialGlowCanvas(CAN, CAN, CAN * 0.3, CAN * 0.3, CAN * 0.5, C.aegisBlue, 0.08), top: 0, left: 0, bottom: CAN, right: CAN, blendMode: 'screen' },
      { name: 'Lueur violette', canvas: radialGlowCanvas(CAN, CAN, CAN * 0.7, CAN * 0.7, CAN * 0.4, C.deepViolet, 0.06), top: 0, left: 0, bottom: CAN, right: CAN, blendMode: 'screen' },
      { name: 'Symbole (gradient + nodes)', canvas: symGradient, top: off, left: off, bottom: off + SZ, right: off + SZ },
      textLayer('AEGIS', 'AEGIS', CAN / 2 - 380, CAN * 0.82, { fontSize: 120, color: C.white, weight: 'black', tracking: 0.06 }),
      textLayer('NETWORK', 'NETWORK', CAN / 2 + 100, CAN * 0.82, { fontSize: 120, color: C.opticalBlue, weight: 'black', tracking: 0.06 }),
      textLayer('Baseline', 'CONSEIL & OPTIMISATION IT', CAN / 2 - 380, CAN * 0.87, { fontSize: 40, color: C.slate400, weight: 'bold', tracking: 0.25 }),
    ],
  });

  // ── Logo Master Fond Clair ──
  savePsd(path.join(OUT_PSD_LOGOS, 'logo-master-fond-clair.psd'), {
    width: CAN, height: CAN,
    children: [
      { name: 'Fond clair #F8FAFC', canvas: solidCanvas(CAN, CAN, C.slate50), top: 0, left: 0, bottom: CAN, right: CAN },
      { name: 'Symbole sombre', canvas: symDark, top: off, left: off, bottom: off + SZ, right: off + SZ },
      textLayer('AEGIS', 'AEGIS', CAN / 2 - 380, CAN * 0.82, { fontSize: 120, color: C.slate900, weight: 'black', tracking: 0.06 }),
      textLayer('NETWORK', 'NETWORK', CAN / 2 + 100, CAN * 0.82, { fontSize: 120, color: C.aegisBlue, weight: 'black', tracking: 0.06 }),
      textLayer('Baseline', 'CONSEIL & OPTIMISATION IT', CAN / 2 - 380, CAN * 0.87, { fontSize: 40, color: C.slate700, weight: 'bold', tracking: 0.25 }),
    ],
  });

  // ── Symbol All Variants ──
  savePsd(path.join(OUT_PSD_LOGOS, 'symbol-all-variants.psd'), {
    width: SZ + 200, height: SZ + 200,
    children: [
      { name: 'Symbole - Gradient + Nodes', canvas: symGradient, top: 100, left: 100, bottom: 100 + SZ, right: 100 + SZ },
      { name: 'Symbole - Gradient épuré', canvas: symClean, top: 100, left: 100, bottom: 100 + SZ, right: 100 + SZ, hidden: true },
      { name: 'Symbole - Blanc', canvas: symWhite, top: 100, left: 100, bottom: 100 + SZ, right: 100 + SZ, hidden: true },
      { name: 'Symbole - Bleu mono', canvas: symBlue, top: 100, left: 100, bottom: 100 + SZ, right: 100 + SZ, hidden: true },
      { name: 'Symbole - Sombre mono', canvas: symDark, top: 100, left: 100, bottom: 100 + SZ, right: 100 + SZ, hidden: true },
    ],
  });

  // ── Wordmark Variants ──
  const wmW = 2400, wmH = 600;
  savePsd(path.join(OUT_PSD_LOGOS, 'wordmark-variants.psd'), {
    width: wmW, height: wmH,
    children: [
      {
        name: 'Wordmark fond sombre',
        opened: true,
        children: [
          { name: 'Fond sombre', canvas: solidCanvas(wmW, wmH, C.deepBg), top: 0, left: 0, bottom: wmH, right: wmW },
          textLayer('AEGIS (blanc)', 'AEGIS', 100, 200, { fontSize: 100, color: C.white, weight: 'black', tracking: 0.06 }),
          textLayer('NETWORK (bleu)', 'NETWORK', 620, 200, { fontSize: 100, color: C.opticalBlue, weight: 'black', tracking: 0.06 }),
          textLayer('Baseline (gris)', 'CONSEIL & OPTIMISATION IT', 100, 320, { fontSize: 28, color: C.slate400, weight: 'bold', tracking: 0.25 }),
        ],
      },
      {
        name: 'Wordmark fond clair',
        opened: true,
        hidden: true,
        children: [
          { name: 'Fond clair', canvas: solidCanvas(wmW, wmH, C.slate50), top: 0, left: 0, bottom: wmH, right: wmW },
          textLayer('AEGIS (sombre)', 'AEGIS', 100, 200, { fontSize: 100, color: C.slate900, weight: 'black', tracking: 0.06 }),
          textLayer('NETWORK (bleu)', 'NETWORK', 620, 200, { fontSize: 100, color: C.aegisBlue, weight: 'black', tracking: 0.06 }),
          textLayer('Baseline (gris)', 'CONSEIL & OPTIMISATION IT', 100, 320, { fontSize: 28, color: C.slate700, weight: 'bold', tracking: 0.25 }),
        ],
      },
    ],
  });

  // ── Lockup fond sombre (symbol + wordmark) ──
  const lkW = 3200, lkH = 800;
  const lkSym = await svgToCanvas(aegisLogoSvg(), 400, 400);
  savePsd(path.join(OUT_PSD_LOGOS, 'lockup-fond-sombre.psd'), {
    width: lkW, height: lkH,
    children: [
      { name: 'Fond sombre #020617', canvas: solidCanvas(lkW, lkH, C.deepBg), top: 0, left: 0, bottom: lkH, right: lkW },
      { name: 'Lueur ambiante', canvas: radialGlowCanvas(lkW, lkH, lkW * 0.3, lkH * 0.5, lkW * 0.3, C.aegisBlue, 0.04), top: 0, left: 0, bottom: lkH, right: lkW },
      { name: 'Symbole Aegis', canvas: lkSym, top: (lkH - 400) / 2, left: 150, bottom: (lkH - 400) / 2 + 400, right: 550 },
      textLayer('AEGIS', 'AEGIS', 620, lkH / 2 - 50, { fontSize: 140, color: C.white, weight: 'black', tracking: 0.06 }),
      textLayer('NETWORK', 'NETWORK', 1380, lkH / 2 - 50, { fontSize: 140, color: C.opticalBlue, weight: 'black', tracking: 0.06 }),
      textLayer('Baseline', 'CONSEIL & OPTIMISATION IT', 620, lkH / 2 + 100, { fontSize: 36, color: C.slate400, weight: 'bold', tracking: 0.25 }),
    ],
  });

  // ── Lockup fond clair ──
  const lkSymDark = await svgToCanvas(aegisLogoSvg('#0F172A', '#0F172A', '#0F172A'), 400, 400);
  savePsd(path.join(OUT_PSD_LOGOS, 'lockup-fond-clair.psd'), {
    width: lkW, height: lkH,
    children: [
      { name: 'Fond clair #F8FAFC', canvas: solidCanvas(lkW, lkH, C.slate50), top: 0, left: 0, bottom: lkH, right: lkW },
      { name: 'Symbole Aegis (sombre)', canvas: lkSymDark, top: (lkH - 400) / 2, left: 150, bottom: (lkH - 400) / 2 + 400, right: 550 },
      textLayer('AEGIS', 'AEGIS', 620, lkH / 2 - 50, { fontSize: 140, color: C.slate900, weight: 'black', tracking: 0.06 }),
      textLayer('NETWORK', 'NETWORK', 1380, lkH / 2 - 50, { fontSize: 140, color: C.aegisBlue, weight: 'black', tracking: 0.06 }),
      textLayer('Baseline', 'CONSEIL & OPTIMISATION IT', 620, lkH / 2 + 100, { fontSize: 36, color: C.slate700, weight: 'bold', tracking: 0.25 }),
    ],
  });

  // ── Decorative Elements ──
  savePsd(path.join(OUT_PSD_LOGOS, 'decorative-elements.psd'), {
    width: 4000, height: 2000,
    children: [
      {
        name: 'Nodes réseau',
        canvas: await svgToCanvas(`<svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#2563EB"/><stop offset="100%" stop-color="#7C3AED"/>
        </linearGradient></defs>
        <circle cx="30" cy="12" r="5" fill="#60A5FA"/>
        <circle cx="45" cy="28" r="4" fill="#60A5FA" opacity="0.6"/>
        <circle cx="18" cy="6" r="4" fill="#7C3AED" opacity="0.8"/>
        <path d="M10 40 L30 12" stroke="url(#g)" stroke-width="1.5" stroke-dasharray="4 4"/>
        <path d="M30 12 L45 28" stroke="url(#g)" stroke-width="1.5" stroke-dasharray="4 4"/>
      </svg>`, 1024, 1024),
        top: 100, left: 100, bottom: 1124, right: 1124,
      },
      { name: 'Barre dégradée horizontale', canvas: horizontalGradientBar(4000, 60), top: 1400, left: 0, bottom: 1460, right: 4000 },
      { name: 'Barre dégradée verticale', canvas: verticalGradientBar(12, 1000), top: 200, left: 2000, bottom: 1200, right: 2012 },
      { name: 'Halo bleu (réutilisable)', canvas: radialGlowCanvas(1000, 1000, 500, 500, 400, C.aegisBlue, 0.15), top: 100, left: 2200, bottom: 1100, right: 3200 },
      { name: 'Halo violet (réutilisable)', canvas: radialGlowCanvas(1000, 1000, 500, 500, 400, C.deepViolet, 0.12), top: 100, left: 3000, bottom: 1100, right: 4000 },
    ],
  });

  // ── Monochromes All ──
  savePsd(path.join(OUT_PSD_LOGOS, 'monochromes-all.psd'), {
    width: CAN, height: CAN,
    children: [
      { name: 'Fond damier (transparent)', canvas: solidCanvas(CAN, CAN, { r: 200, g: 200, b: 200 }, 50), top: 0, left: 0, bottom: CAN, right: CAN },
      { name: 'Monochrome blanc', canvas: symWhite, top: off, left: off, bottom: off + SZ, right: off + SZ },
      { name: 'Monochrome bleu #2563EB', canvas: symBlue, top: off, left: off, bottom: off + SZ, right: off + SZ, hidden: true },
      { name: 'Monochrome sombre #0F172A', canvas: symDark, top: off, left: off, bottom: off + SZ, right: off + SZ, hidden: true },
    ],
  });
}

// ═══════════════════════════════════════════════════════════════════════
// 2. BUSINESS CARDS
// ═══════════════════════════════════════════════════════════════════════
async function buildBusinessCardPSDs() {
  console.log('\n━━━ CARTES DE VISITE ━━━\n');

  // 85×55mm at 300dpi + 3mm bleed = 1075×720px
  const W = 1075, H = 720;
  const BLEED = 35, SAFE = 59;
  const logoSz = 80, iconSz = 28;

  // Assets
  const logoGrad = await svgToCanvas(aegisLogoSvg(), logoSz, logoSz);
  const logoDark = await svgToCanvas(aegisLogoSvg('#0F172A', '#0F172A', '#0F172A'), logoSz, logoSz);
  const logoLarge = await svgToCanvas(aegisLogoSvg(), 160, 160);
  const phoneIcn = await iconCanvas('phone', iconSz, '#334155');
  const mailIcn = await iconCanvas('mail', iconSz, '#334155');
  const globeIcn = await iconCanvas('globe', iconSz, '#334155');
  const phoneIcnLight = await iconCanvas('phone', iconSz, '#94A3B8');
  const mailIcnLight = await iconCanvas('mail', iconSz, '#94A3B8');
  const globeIcnLight = await iconCanvas('globe', iconSz, '#94A3B8');

  const contactBaseY = H - BLEED - SAFE - 130;

  // ── RECTO — Version accent barre gauche ──
  savePsd(path.join(OUT_PSD_DOCS, 'business-card-recto.psd'), {
    width: W, height: H,
    children: [
      { name: 'Fond clair #F8FAFC', canvas: solidCanvas(W, H, C.slate50), top: 0, left: 0, bottom: H, right: W },
      { name: 'Barre accent gauche (dégradé)', canvas: verticalGradientBar(8, H - BLEED * 2), top: BLEED, left: BLEED, bottom: H - BLEED, right: BLEED + 8 },
      { name: 'Orbe décoratif (bas-droite)', canvas: radialGlowCanvas(400, 400, 200, 200, 180, C.aegisBlue, 0.06), top: H - 400, left: W - 400, bottom: H, right: W, opacity: 0.7 },
      {
        name: 'Logo',
        opened: true,
        children: [
          { name: 'Symbole Aegis', canvas: logoDark, top: BLEED + SAFE, left: BLEED + SAFE + 20, bottom: BLEED + SAFE + logoSz, right: BLEED + SAFE + 20 + logoSz },
          textLayer('AEGIS NETWORK', 'AEGIS NETWORK', BLEED + SAFE + 20 + logoSz + 16, BLEED + SAFE + 34, { fontSize: 18, color: C.slate900, weight: 'black', tracking: 0.06 }),
        ],
      },
      {
        name: 'Identité',
        opened: true,
        children: [
          textLayer('Nom', 'Ludovic ROCHET-BELLAVIA', BLEED + SAFE + 30, BLEED + SAFE + logoSz + 40, { fontSize: 28, color: C.slate900, weight: 'black', tracking: -0.01 }),
          textLayer('Fonction', 'Consultant réseaux & téléphonie', BLEED + SAFE + 30, BLEED + SAFE + logoSz + 72, { fontSize: 16, color: C.aegisBlue, weight: 'semibold', tracking: 0.02 }),
        ],
      },
      {
        name: 'Contact',
        opened: true,
        children: [
          { name: 'Icône téléphone', canvas: phoneIcn, top: contactBaseY, left: BLEED + SAFE + 30, bottom: contactBaseY + iconSz, right: BLEED + SAFE + 30 + iconSz },
          textLayer('Téléphone', '04 82 53 26 99', BLEED + SAFE + 30 + iconSz + 10, contactBaseY + 4, { fontSize: 15, color: C.slate700, weight: 'medium' }),
          { name: 'Icône email', canvas: mailIcn, top: contactBaseY + 40, left: BLEED + SAFE + 30, bottom: contactBaseY + 40 + iconSz, right: BLEED + SAFE + 30 + iconSz },
          textLayer('Email', 'contact@aegisnetwork.fr', BLEED + SAFE + 30 + iconSz + 10, contactBaseY + 44, { fontSize: 15, color: C.slate700, weight: 'medium' }),
          { name: 'Icône web', canvas: globeIcn, top: contactBaseY + 80, left: BLEED + SAFE + 30, bottom: contactBaseY + 80 + iconSz, right: BLEED + SAFE + 30 + iconSz },
          textLayer('Site web', 'aegisnetwork.fr', BLEED + SAFE + 30 + iconSz + 10, contactBaseY + 84, { fontSize: 15, color: C.slate700, weight: 'medium' }),
          textLayer('Ville', 'Lyon, France', W - BLEED - SAFE - 160, contactBaseY + 84, { fontSize: 13, color: C.slate400, weight: 'medium' }),
        ],
      },
    ],
  });

  // ── RECTO ALT — Version bandeau dégradé haut ──
  savePsd(path.join(OUT_PSD_DOCS, 'business-card-recto-alt.psd'), {
    width: W, height: H,
    children: [
      { name: 'Fond blanc #FFFFFF', canvas: solidCanvas(W, H, C.white), top: 0, left: 0, bottom: H, right: W },
      { name: 'Bandeau dégradé haut', canvas: horizontalGradientBar(W - BLEED * 2, 8), top: BLEED, left: BLEED, bottom: BLEED + 8, right: W - BLEED },
      { name: 'Orbe décoratif (bas-droite)', canvas: radialGlowCanvas(400, 400, 200, 200, 180, C.aegisBlue, 0.04), top: H - 400, left: W - 400, bottom: H, right: W },
      {
        name: 'Logo',
        opened: true,
        children: [
          { name: 'Symbole Aegis', canvas: logoDark, top: BLEED + SAFE + 16, left: BLEED + SAFE, bottom: BLEED + SAFE + 16 + logoSz, right: BLEED + SAFE + logoSz },
          textLayer('AEGIS NETWORK', 'AEGIS NETWORK', BLEED + SAFE + logoSz + 16, BLEED + SAFE + 44, { fontSize: 18, color: C.slate900, weight: 'black', tracking: 0.06 }),
        ],
      },
      {
        name: 'Identité',
        opened: true,
        children: [
          textLayer('Nom', 'Ludovic ROCHET-BELLAVIA', BLEED + SAFE, BLEED + SAFE + logoSz + 50, { fontSize: 28, color: C.slate900, weight: 'black', tracking: -0.01 }),
          textLayer('Fonction', 'Consultant réseaux & téléphonie', BLEED + SAFE, BLEED + SAFE + logoSz + 82, { fontSize: 16, color: C.aegisBlue, weight: 'semibold', tracking: 0.02 }),
        ],
      },
      {
        name: 'Contact',
        opened: true,
        children: [
          { name: 'Icône téléphone', canvas: phoneIcn, top: contactBaseY, left: BLEED + SAFE, bottom: contactBaseY + iconSz, right: BLEED + SAFE + iconSz },
          textLayer('Téléphone', '04 82 53 26 99', BLEED + SAFE + iconSz + 10, contactBaseY + 4, { fontSize: 15, color: C.slate700, weight: 'medium' }),
          { name: 'Icône email', canvas: mailIcn, top: contactBaseY + 40, left: BLEED + SAFE, bottom: contactBaseY + 40 + iconSz, right: BLEED + SAFE + iconSz },
          textLayer('Email', 'contact@aegisnetwork.fr', BLEED + SAFE + iconSz + 10, contactBaseY + 44, { fontSize: 15, color: C.slate700, weight: 'medium' }),
          { name: 'Icône web', canvas: globeIcn, top: contactBaseY + 80, left: BLEED + SAFE, bottom: contactBaseY + 80 + iconSz, right: BLEED + SAFE + iconSz },
          textLayer('Site web', 'aegisnetwork.fr', BLEED + SAFE + iconSz + 10, contactBaseY + 84, { fontSize: 15, color: C.slate700, weight: 'medium' }),
          textLayer('Ville', 'Lyon, France', W - BLEED - SAFE - 160, contactBaseY + 84, { fontSize: 13, color: C.slate400, weight: 'medium' }),
        ],
      },
    ],
  });

  // ── VERSO (fond sombre) ──
  savePsd(path.join(OUT_PSD_DOCS, 'business-card-verso.psd'), {
    width: W, height: H,
    children: [
      { name: 'Fond sombre (dégradé)', canvas: gradientCanvas(W, H, [[0, '#0F172A'], [1, '#131B2E']], '145'), top: 0, left: 0, bottom: H, right: W },
      { name: 'Lueur bleue (haut-gauche)', canvas: radialGlowCanvas(W, H, W * 0.2, H * 0.2, W * 0.5, C.aegisBlue, 0.06), top: 0, left: 0, bottom: H, right: W },
      { name: 'Lueur violette (bas-droite)', canvas: radialGlowCanvas(W, H, W * 0.8, H * 0.8, W * 0.4, C.deepViolet, 0.04), top: 0, left: 0, bottom: H, right: W },
      {
        name: 'Logo centré',
        opened: true,
        children: [
          { name: 'Symbole Aegis', canvas: logoLarge, top: (H - 160) / 2 - 50, left: (W - 160) / 2, bottom: (H - 160) / 2 - 50 + 160, right: (W - 160) / 2 + 160 },
          textLayer('AEGIS NETWORK', 'AEGIS NETWORK', W / 2 - 120, H / 2 + 50, { fontSize: 24, color: C.white, weight: 'black', tracking: 0.06, justification: 'center' }),
          textLayer('Baseline', 'CONSEIL & OPTIMISATION IT', W / 2 - 120, H / 2 + 82, { fontSize: 10, color: C.slate400, weight: 'bold', tracking: 0.25, justification: 'center' }),
        ],
      },
      textLayer('URL', 'aegisnetwork.fr', W / 2 - 50, H - BLEED - SAFE - 30, { fontSize: 11, color: C.slate700, weight: 'medium', tracking: 0.05, justification: 'center' }),
    ],
  });
}

// ═══════════════════════════════════════════════════════════════════════
// 3. EMAIL SIGNATURES
// ═══════════════════════════════════════════════════════════════════════
async function buildEmailSignaturePSDs() {
  console.log('\n━━━ SIGNATURES EMAIL ━━━\n');

  const W = 1200, H = 500;
  const logoSz = 120, iconSz = 32;

  const logoGrad = await svgToCanvas(aegisLogoSvg(), logoSz, logoSz);
  const phoneIcnLight = await iconCanvas('phone', iconSz, '#64748B');
  const mailIcnLight = await iconCanvas('mail', iconSz, '#64748B');
  const globeIcnLight = await iconCanvas('globe', iconSz, '#64748B');
  const phoneIcnDark = await iconCanvas('phone', iconSz, '#94A3B8');
  const mailIcnDark = await iconCanvas('mail', iconSz, '#94A3B8');
  const globeIcnDark = await iconCanvas('globe', iconSz, '#94A3B8');

  const infoX = 40 + logoSz + 56;

  // ── Version Claire ──
  savePsd(path.join(OUT_PSD_DOCS, 'email-signature-light.psd'), {
    width: W, height: H,
    children: [
      { name: 'Fond blanc', canvas: solidCanvas(W, H, C.white), top: 0, left: 0, bottom: H, right: W },
      {
        name: 'Logo',
        opened: true,
        children: [
          { name: 'Symbole Aegis', canvas: logoGrad, top: 40, left: 40, bottom: 40 + logoSz, right: 40 + logoSz },
        ],
      },
      { name: 'Séparateur bleu vertical', canvas: solidCanvas(6, 200, C.aegisBlue), top: 40, left: 40 + logoSz + 30, bottom: 240, right: 40 + logoSz + 36 },
      {
        name: 'Identité',
        opened: true,
        children: [
          textLayer('Nom', 'Ludovic ROCHET-BELLAVIA', infoX, 52, { fontSize: 30, color: C.slate900, weight: 'bold' }),
          textLayer('Fonction & Entreprise', 'Consultant réseaux & téléphonie — AEGIS NETWORK', infoX, 90, { fontSize: 24, color: C.aegisBlue, weight: 'semibold' }),
        ],
      },
      {
        name: 'Contact',
        opened: true,
        children: [
          { name: 'Icône téléphone', canvas: phoneIcnLight, top: 135, left: infoX, bottom: 135 + iconSz, right: infoX + iconSz },
          textLayer('Téléphone', '04 82 53 26 99', infoX + iconSz + 12, 140, { fontSize: 22, color: C.slate900, weight: 'medium' }),
          { name: 'Icône email', canvas: mailIcnLight, top: 180, left: infoX, bottom: 180 + iconSz, right: infoX + iconSz },
          textLayer('Email', 'contact@aegisnetwork.fr', infoX + iconSz + 12, 185, { fontSize: 22, color: C.aegisBlue, weight: 'medium' }),
          { name: 'Icône web', canvas: globeIcnLight, top: 225, left: infoX, bottom: 225 + iconSz, right: infoX + iconSz },
          textLayer('Web & Lieu', 'aegisnetwork.fr · Lyon, France', infoX + iconSz + 12, 230, { fontSize: 22, color: C.aegisBlue, weight: 'medium' }),
        ],
      },
      { name: 'Séparateur bas', canvas: solidCanvas(W - 80, 2, C.slate200), top: 300, left: 40, bottom: 302, right: W - 40 },
      textLayer('Baseline signature', 'Conseil & Optimisation IT — Réseaux, Téléphonie, Infrastructure', 40, 320, { fontSize: 20, color: C.slate400, weight: 'medium', tracking: 0.03 }),
    ],
  });

  // ── Version Sombre ──
  savePsd(path.join(OUT_PSD_DOCS, 'email-signature-dark.psd'), {
    width: W, height: H,
    children: [
      { name: 'Fond sombre #0F172A', canvas: solidCanvas(W, H, C.slate900), top: 0, left: 0, bottom: H, right: W },
      {
        name: 'Logo',
        opened: true,
        children: [
          { name: 'Symbole Aegis', canvas: logoGrad, top: 40, left: 40, bottom: 40 + logoSz, right: 40 + logoSz },
        ],
      },
      { name: 'Séparateur bleu vertical', canvas: solidCanvas(6, 200, C.opticalBlue), top: 40, left: 40 + logoSz + 30, bottom: 240, right: 40 + logoSz + 36 },
      {
        name: 'Identité',
        opened: true,
        children: [
          textLayer('Nom', 'Ludovic ROCHET-BELLAVIA', infoX, 52, { fontSize: 30, color: C.slate50, weight: 'bold' }),
          textLayer('Fonction & Entreprise', 'Consultant réseaux & téléphonie — AEGIS NETWORK', infoX, 90, { fontSize: 24, color: C.opticalBlue, weight: 'semibold' }),
        ],
      },
      {
        name: 'Contact',
        opened: true,
        children: [
          { name: 'Icône téléphone', canvas: phoneIcnDark, top: 135, left: infoX, bottom: 135 + iconSz, right: infoX + iconSz },
          textLayer('Téléphone', '04 82 53 26 99', infoX + iconSz + 12, 140, { fontSize: 22, color: C.slate200, weight: 'medium' }),
          { name: 'Icône email', canvas: mailIcnDark, top: 180, left: infoX, bottom: 180 + iconSz, right: infoX + iconSz },
          textLayer('Email', 'contact@aegisnetwork.fr', infoX + iconSz + 12, 185, { fontSize: 22, color: C.opticalBlue, weight: 'medium' }),
          { name: 'Icône web', canvas: globeIcnDark, top: 225, left: infoX, bottom: 225 + iconSz, right: infoX + iconSz },
          textLayer('Web & Lieu', 'aegisnetwork.fr · Lyon, France', infoX + iconSz + 12, 230, { fontSize: 22, color: C.opticalBlue, weight: 'medium' }),
        ],
      },
      { name: 'Séparateur bas', canvas: solidCanvas(W - 80, 2, C.slate800), top: 300, left: 40, bottom: 302, right: W - 40 },
      textLayer('Baseline signature', 'Conseil & Optimisation IT — Réseaux, Téléphonie, Infrastructure', 40, 320, { fontSize: 20, color: C.slate700, weight: 'medium', tracking: 0.03 }),
    ],
  });
}

// ═══════════════════════════════════════════════════════════════════════
// 4. FLYER A5 (reconstruction complète — PAS de rendu HTML)
// ═══════════════════════════════════════════════════════════════════════
async function buildFlyerPSD() {
  console.log('\n━━━ FLYER A5 ━━━\n');

  // A5 at 300dpi = 1748×2480px
  const W = 1748, H = 2480;
  const PAD = 120;
  const logoSz = 100, svcIconSz = 56;

  // Assets
  const logoCan = await svgToCanvas(aegisLogoSvg(), logoSz, logoSz);
  const alertIcn = await iconCanvas('alertTriangle', 36, '#64748B');
  const checkIcn = await iconCanvas('checkCircle', 36, '#3B82F6');
  const clipIcn = await iconCanvas('clipboard', svcIconSz, '#FFFFFF');
  const netIcn = await iconCanvas('globe', svcIconSz, '#FFFFFF');
  const boltIcn = await iconCanvas('bolt', svcIconSz, '#FFFFFF');
  const usersIcn = await iconCanvas('users', svcIconSz, '#FFFFFF');
  const chartIcn = await iconCanvas('chart', svcIconSz, '#FFFFFF');
  const lockIcn = await iconCanvas('lock', svcIconSz, '#FFFFFF');
  const mapPinIcn = await iconCanvas('mapPin', 36, '#2563EB');

  // Layout Y positions
  const Y_HEADER = PAD;
  const Y_HERO = PAD + 140;
  const Y_CARDS = Y_HERO + 260;
  const cardW = (W - PAD * 2 - 40) / 2;
  const cardH = 420;
  const Y_SERVICES = Y_CARDS + cardH + 60;
  const svcOutW = W - PAD * 2;
  const svcOutH = 520;
  const footerW = W - PAD * 2;
  const footerH = 340;
  const Y_FOOTER = H - PAD - footerH;

  // Service items helper
  const services = [
    { icon: clipIcn, label: 'Audit & Cadrage' },
    { icon: netIcn, label: 'Conseil Réseau & Téléphonie' },
    { icon: boltIcn, label: 'Pilotage de projets' },
    { icon: usersIcn, label: 'Coordination prestataires' },
    { icon: chartIcn, label: 'Optimisation & Suivi' },
    { icon: lockIcn, label: 'Sécurité & Résilience' },
  ];

  const svcLayers = [];
  const svcCols = 2;
  const svcColW = (svcOutW - 80) / svcCols;
  const svcRowH = 120;
  const svcStartX = PAD + 40;
  const svcStartY = Y_SERVICES + 100;
  const iconBgSz = svcIconSz + 16;

  for (let i = 0; i < services.length; i++) {
    const col = i % svcCols;
    const row = Math.floor(i / svcCols);
    const x = svcStartX + col * svcColW;
    const y = svcStartY + row * svcRowH;
    svcLayers.push(
      { name: `Fond icône — ${services[i].label}`, canvas: roundedGradientCanvas(iconBgSz, iconBgSz, 12), top: y, left: x, bottom: y + iconBgSz, right: x + iconBgSz },
      { name: `Icône — ${services[i].label}`, canvas: services[i].icon, top: y + 8, left: x + 8, bottom: y + 8 + svcIconSz, right: x + 8 + svcIconSz },
      textLayer(services[i].label, services[i].label, x + iconBgSz + 16, y + 20, { fontSize: 22, color: C.slate200, weight: 'semibold' }),
    );
  }

  savePsd(path.join(OUT_PSD_DOCS, 'flyer-A5.psd'), {
    width: W, height: H,
    children: [
      // ── Background ──
      {
        name: 'Fond',
        opened: true,
        children: [
          { name: 'Fond profond #020617', canvas: solidCanvas(W, H, C.deepBg), top: 0, left: 0, bottom: H, right: W },
          { name: 'Lueur bleue (haut-droite)', canvas: radialGlowCanvas(W, H, W * 0.8, H * 0.1, W * 0.6, C.aegisBlue, 0.20), top: 0, left: 0, bottom: H, right: W },
          { name: 'Lueur violette (bas-gauche)', canvas: radialGlowCanvas(W, H, W * 0.2, H * 0.9, W * 0.6, C.deepViolet, 0.15), top: 0, left: 0, bottom: H, right: W },
          { name: 'Motif réseau', canvas: networkPatternCanvas(W, H, 0.04), top: 0, left: 0, bottom: H, right: W },
        ],
      },

      // ── Header ──
      {
        name: 'En-tête',
        opened: true,
        children: [
          { name: 'Symbole Aegis', canvas: logoCan, top: Y_HEADER, left: PAD, bottom: Y_HEADER + logoSz, right: PAD + logoSz },
          textLayer('AEGIS NETWORK', 'AEGIS NETWORK', PAD + logoSz + 20, Y_HEADER + 20, { fontSize: 42, color: C.white, weight: 'black', tracking: 0.06 }),
          textLayer('Baseline', 'CONSEIL & OPTIMISATION IT', PAD + logoSz + 20, Y_HEADER + 68, { fontSize: 16, color: C.slate400, weight: 'bold', tracking: 0.25 }),
        ],
      },

      // ── Hero ──
      {
        name: 'Titre principal',
        opened: true,
        children: [
          textLayer('Titre ligne 1', 'Reprenez le contrôle de votre', PAD, Y_HERO, { fontSize: 60, color: C.white, weight: 'black', tracking: -0.02 }),
          textLayer('Titre ligne 2 (accent)', 'infrastructure IT', PAD, Y_HERO + 70, { fontSize: 60, color: C.opticalBlue, weight: 'black', tracking: -0.02 }),
          textLayer('Sous-titre', 'Conseil, audit et pilotage pour TPE & PME. Ne laissez plus\nla technique freiner votre activité ni peser sur votre budget.', PAD, Y_HERO + 160, { fontSize: 24, color: C.slate300, weight: 'medium', leading: 36 }),
        ],
      },

      // ── Carte Défis (gauche) ──
      {
        name: 'Carte Défis',
        opened: true,
        children: [
          { name: 'Fond carte défis', canvas: roundedRectCanvas(cardW, cardH, 20, C.slate900, 128), top: Y_CARDS, left: PAD, bottom: Y_CARDS + cardH, right: PAD + cardW },
          { name: 'Bordure carte défis', canvas: roundedRectStroke(cardW, cardH, 20, C.slate800), top: Y_CARDS, left: PAD, bottom: Y_CARDS + cardH, right: PAD + cardW },
          { name: 'Icône alerte', canvas: alertIcn, top: Y_CARDS + 30, left: PAD + 30, bottom: Y_CARDS + 66, right: PAD + 66 },
          textLayer('Label Défis', 'VOS DÉFIS', PAD + 76, Y_CARDS + 36, { fontSize: 16, color: C.slate400, weight: 'bold', tracking: 0.15 }),
          textLayer('Défi 1', '✕  Prestataires télécoms difficiles à piloter', PAD + 30, Y_CARDS + 100, { fontSize: 22, color: C.slate300, weight: 'medium', leading: 30 }),
          textLayer('Défi 2', '✕  Hausses de coûts inexpliquées', PAD + 30, Y_CARDS + 160, { fontSize: 22, color: C.slate300, weight: 'medium', leading: 30 }),
          textLayer('Défi 3', '✕  Incidents récurrents sans suivi', PAD + 30, Y_CARDS + 220, { fontSize: 22, color: C.slate300, weight: 'medium', leading: 30 }),
          textLayer('Défi 4', '✕  Évolutions sans cap technique', PAD + 30, Y_CARDS + 280, { fontSize: 22, color: C.slate300, weight: 'medium', leading: 30 }),
        ],
      },

      // ── Carte Bénéfices (droite) ──
      {
        name: 'Carte Bénéfices',
        opened: true,
        children: [
          { name: 'Fond carte bénéfices', canvas: roundedRectCanvas(cardW, cardH, 20, { r: 23, g: 37, b: 84 }, 50), top: Y_CARDS, left: PAD + cardW + 40, bottom: Y_CARDS + cardH, right: W - PAD },
          { name: 'Bordure carte bénéfices', canvas: roundedRectStroke(cardW, cardH, 20, C.aegisBlue), top: Y_CARDS, left: PAD + cardW + 40, bottom: Y_CARDS + cardH, right: W - PAD },
          { name: 'Icône check', canvas: checkIcn, top: Y_CARDS + 30, left: PAD + cardW + 70, bottom: Y_CARDS + 66, right: PAD + cardW + 106 },
          textLayer('Label Bénéfices', 'VOS BÉNÉFICES', PAD + cardW + 116, Y_CARDS + 36, { fontSize: 16, color: C.opticalBlue, weight: 'bold', tracking: 0.15 }),
          textLayer('Bénéfice 1', '✓  Gain de temps immédiat', PAD + cardW + 70, Y_CARDS + 100, { fontSize: 22, color: C.slate200, weight: 'medium', leading: 30 }),
          textLayer('Bénéfice 2', '✓  Coûts maîtrisés et justifiés', PAD + cardW + 70, Y_CARDS + 160, { fontSize: 22, color: C.slate200, weight: 'medium', leading: 30 }),
          textLayer('Bénéfice 3', '✓  Décisions claires et éclairées', PAD + cardW + 70, Y_CARDS + 220, { fontSize: 22, color: C.slate200, weight: 'medium', leading: 30 }),
          textLayer('Bénéfice 4', '✓  Continuité d\'activité assurée', PAD + cardW + 70, Y_CARDS + 280, { fontSize: 22, color: C.slate200, weight: 'medium', leading: 30 }),
        ],
      },

      // ── Services ──
      {
        name: 'Services',
        opened: true,
        children: [
          { name: 'Bordure dégradée services', canvas: roundedGradientCanvas(svcOutW, svcOutH, 20), top: Y_SERVICES, left: PAD, bottom: Y_SERVICES + svcOutH, right: W - PAD },
          { name: 'Fond intérieur services', canvas: roundedRectCanvas(svcOutW - 4, svcOutH - 4, 18, C.deepBg), top: Y_SERVICES + 2, left: PAD + 2, bottom: Y_SERVICES + svcOutH - 2, right: W - PAD - 2 },
          textLayer('Titre services', 'NOTRE EXPERTISE', W / 2 - 100, Y_SERVICES + 40, { fontSize: 20, color: C.white, weight: 'bold', tracking: 0.15, justification: 'center' }),
          ...svcLayers,
        ],
      },

      // ── Contact Footer ──
      {
        name: 'Contact',
        opened: true,
        children: [
          { name: 'Fond blanc arrondi', canvas: roundedRectCanvas(footerW, footerH, 20, C.white), top: Y_FOOTER, left: PAD, bottom: Y_FOOTER + footerH, right: W - PAD },
          textLayer('Titre contact', 'CONTACT & INTERVENTION', PAD + 40, Y_FOOTER + 40, { fontSize: 24, color: C.slate900, weight: 'black', tracking: 0.12 }),
          { name: 'Icône localisation', canvas: mapPinIcn, top: Y_FOOTER + 80, left: PAD + 40, bottom: Y_FOOTER + 116, right: PAD + 76 },
          textLayer('Localisation', 'Lyon · Auvergne-Rhône-Alpes', PAD + 86, Y_FOOTER + 85, { fontSize: 20, color: C.aegisBlue, weight: 'bold' }),
          textLayer('Accroche', 'Premier échange offert — sans engagement', PAD + 40, Y_FOOTER + 125, { fontSize: 18, color: C.slate400, weight: 'semibold' }),
          { name: 'Séparateur', canvas: solidCanvas(footerW - 80, 2, C.slate200), top: Y_FOOTER + 165, left: PAD + 40, bottom: Y_FOOTER + 167, right: W - PAD - 40 },
          {
            name: 'Coordonnées',
            opened: true,
            children: [
              textLayer('Label téléphone', 'TÉLÉPHONE', PAD + 40, Y_FOOTER + 190, { fontSize: 14, color: C.slate400, weight: 'bold', tracking: 0.1 }),
              textLayer('Numéro', '04 82 53 26 99', PAD + 40, Y_FOOTER + 218, { fontSize: 26, color: C.slate900, weight: 'black' }),
              textLayer('Label email', 'EMAIL', PAD + 40 + footerW / 3, Y_FOOTER + 190, { fontSize: 14, color: C.slate400, weight: 'bold', tracking: 0.1 }),
              textLayer('Adresse email', 'contact@aegisnetwork.fr', PAD + 40 + footerW / 3, Y_FOOTER + 218, { fontSize: 22, color: C.slate900, weight: 'bold' }),
              textLayer('Label web', 'SITE WEB', PAD + 40 + (footerW / 3) * 2, Y_FOOTER + 190, { fontSize: 14, color: C.slate400, weight: 'bold', tracking: 0.1 }),
              textLayer('URL', 'aegisnetwork.fr', PAD + 40 + (footerW / 3) * 2, Y_FOOTER + 218, { fontSize: 26, color: C.aegisBlue, weight: 'black' }),
            ],
          },
        ],
      },
    ],
  });

  // ── Flyer A4 (scaled version) ──
  // A4 at 300dpi = 2480×3508px
  const W4 = 2480, H4 = 3508;
  const PAD4 = 160;
  const logoSz4 = 130;
  const logoCan4 = await svgToCanvas(aegisLogoSvg(), logoSz4, logoSz4);
  const alertIcn4 = await iconCanvas('alertTriangle', 48, '#64748B');
  const checkIcn4 = await iconCanvas('checkCircle', 48, '#3B82F6');
  const mapPinIcn4 = await iconCanvas('mapPin', 48, '#2563EB');

  const svcIconSz4 = 72;
  const clipIcn4 = await iconCanvas('clipboard', svcIconSz4, '#FFFFFF');
  const netIcn4 = await iconCanvas('globe', svcIconSz4, '#FFFFFF');
  const boltIcn4 = await iconCanvas('bolt', svcIconSz4, '#FFFFFF');
  const usersIcn4 = await iconCanvas('users', svcIconSz4, '#FFFFFF');
  const chartIcn4 = await iconCanvas('chart', svcIconSz4, '#FFFFFF');
  const lockIcn4 = await iconCanvas('lock', svcIconSz4, '#FFFFFF');

  // A4 Layout
  const Y_HEADER4 = PAD4;
  const Y_HERO4 = PAD4 + 200;
  const Y_CARDS4 = Y_HERO4 + 380;
  const cardW4 = (W4 - PAD4 * 2 - 60) / 2;
  const cardH4 = 580;
  const Y_SERVICES4 = Y_CARDS4 + cardH4 + 80;
  const svcOutW4 = W4 - PAD4 * 2;
  const svcOutH4 = 700;
  const footerW4 = W4 - PAD4 * 2;
  const footerH4 = 440;
  const Y_FOOTER4 = H4 - PAD4 - footerH4;

  const services4 = [
    { icon: clipIcn4, label: 'Audit & Cadrage' },
    { icon: netIcn4, label: 'Conseil Réseau & Téléphonie' },
    { icon: boltIcn4, label: 'Pilotage de projets' },
    { icon: usersIcn4, label: 'Coordination prestataires' },
    { icon: chartIcn4, label: 'Optimisation & Suivi' },
    { icon: lockIcn4, label: 'Sécurité & Résilience' },
  ];

  const svcLayers4 = [];
  const svcColW4 = (svcOutW4 - 100) / 2;
  const svcRowH4 = 160;
  const svcStartX4 = PAD4 + 50;
  const svcStartY4 = Y_SERVICES4 + 130;
  const iconBgSz4 = svcIconSz4 + 20;

  for (let i = 0; i < services4.length; i++) {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = svcStartX4 + col * svcColW4;
    const y = svcStartY4 + row * svcRowH4;
    svcLayers4.push(
      { name: `Fond icône — ${services4[i].label}`, canvas: roundedGradientCanvas(iconBgSz4, iconBgSz4, 14), top: y, left: x, bottom: y + iconBgSz4, right: x + iconBgSz4 },
      { name: `Icône — ${services4[i].label}`, canvas: services4[i].icon, top: y + 10, left: x + 10, bottom: y + 10 + svcIconSz4, right: x + 10 + svcIconSz4 },
      textLayer(services4[i].label, services4[i].label, x + iconBgSz4 + 20, y + 26, { fontSize: 28, color: C.slate200, weight: 'semibold' }),
    );
  }

  savePsd(path.join(OUT_PSD_DOCS, 'flyer-A4.psd'), {
    width: W4, height: H4,
    children: [
      {
        name: 'Fond',
        opened: true,
        children: [
          { name: 'Fond profond #020617', canvas: solidCanvas(W4, H4, C.deepBg), top: 0, left: 0, bottom: H4, right: W4 },
          { name: 'Lueur bleue (haut-droite)', canvas: radialGlowCanvas(W4, H4, W4 * 0.8, H4 * 0.08, W4 * 0.7, C.aegisBlue, 0.18), top: 0, left: 0, bottom: H4, right: W4 },
          { name: 'Lueur violette (bas-gauche)', canvas: radialGlowCanvas(W4, H4, W4 * 0.2, H4 * 0.92, W4 * 0.7, C.deepViolet, 0.12), top: 0, left: 0, bottom: H4, right: W4 },
          { name: 'Motif réseau', canvas: networkPatternCanvas(W4, H4, 0.03), top: 0, left: 0, bottom: H4, right: W4 },
        ],
      },
      {
        name: 'En-tête',
        opened: true,
        children: [
          { name: 'Symbole Aegis', canvas: logoCan4, top: Y_HEADER4, left: PAD4, bottom: Y_HEADER4 + logoSz4, right: PAD4 + logoSz4 },
          textLayer('AEGIS NETWORK', 'AEGIS NETWORK', PAD4 + logoSz4 + 24, Y_HEADER4 + 24, { fontSize: 56, color: C.white, weight: 'black', tracking: 0.06 }),
          textLayer('Baseline', 'CONSEIL & OPTIMISATION IT', PAD4 + logoSz4 + 24, Y_HEADER4 + 90, { fontSize: 20, color: C.slate400, weight: 'bold', tracking: 0.25 }),
        ],
      },
      {
        name: 'Titre principal',
        opened: true,
        children: [
          textLayer('Titre ligne 1', 'Reprenez le contrôle de votre', PAD4, Y_HERO4, { fontSize: 80, color: C.white, weight: 'black', tracking: -0.02 }),
          textLayer('Titre ligne 2 (accent)', 'infrastructure IT', PAD4, Y_HERO4 + 96, { fontSize: 80, color: C.opticalBlue, weight: 'black', tracking: -0.02 }),
          textLayer('Sous-titre', 'Conseil, audit et pilotage pour TPE & PME.\nNe laissez plus la technique freiner votre activité\nni peser sur votre budget.', PAD4, Y_HERO4 + 220, { fontSize: 32, color: C.slate300, weight: 'medium', leading: 48 }),
        ],
      },
      {
        name: 'Carte Défis',
        opened: true,
        children: [
          { name: 'Fond carte défis', canvas: roundedRectCanvas(cardW4, cardH4, 24, C.slate900, 128), top: Y_CARDS4, left: PAD4, bottom: Y_CARDS4 + cardH4, right: PAD4 + cardW4 },
          { name: 'Bordure carte défis', canvas: roundedRectStroke(cardW4, cardH4, 24, C.slate800), top: Y_CARDS4, left: PAD4, bottom: Y_CARDS4 + cardH4, right: PAD4 + cardW4 },
          { name: 'Icône alerte', canvas: alertIcn4, top: Y_CARDS4 + 40, left: PAD4 + 40, bottom: Y_CARDS4 + 88, right: PAD4 + 88 },
          textLayer('Label Défis', 'VOS DÉFIS', PAD4 + 100, Y_CARDS4 + 50, { fontSize: 20, color: C.slate400, weight: 'bold', tracking: 0.15 }),
          textLayer('Défi 1', '✕  Prestataires télécoms difficiles à piloter', PAD4 + 40, Y_CARDS4 + 130, { fontSize: 28, color: C.slate300, weight: 'medium', leading: 40 }),
          textLayer('Défi 2', '✕  Hausses de coûts inexpliquées', PAD4 + 40, Y_CARDS4 + 210, { fontSize: 28, color: C.slate300, weight: 'medium', leading: 40 }),
          textLayer('Défi 3', '✕  Incidents récurrents sans suivi', PAD4 + 40, Y_CARDS4 + 290, { fontSize: 28, color: C.slate300, weight: 'medium', leading: 40 }),
          textLayer('Défi 4', '✕  Évolutions sans cap technique', PAD4 + 40, Y_CARDS4 + 370, { fontSize: 28, color: C.slate300, weight: 'medium', leading: 40 }),
        ],
      },
      {
        name: 'Carte Bénéfices',
        opened: true,
        children: [
          { name: 'Fond carte bénéfices', canvas: roundedRectCanvas(cardW4, cardH4, 24, { r: 23, g: 37, b: 84 }, 50), top: Y_CARDS4, left: PAD4 + cardW4 + 60, bottom: Y_CARDS4 + cardH4, right: W4 - PAD4 },
          { name: 'Bordure carte bénéfices', canvas: roundedRectStroke(cardW4, cardH4, 24, C.aegisBlue), top: Y_CARDS4, left: PAD4 + cardW4 + 60, bottom: Y_CARDS4 + cardH4, right: W4 - PAD4 },
          { name: 'Icône check', canvas: checkIcn4, top: Y_CARDS4 + 40, left: PAD4 + cardW4 + 100, bottom: Y_CARDS4 + 88, right: PAD4 + cardW4 + 148 },
          textLayer('Label Bénéfices', 'VOS BÉNÉFICES', PAD4 + cardW4 + 160, Y_CARDS4 + 50, { fontSize: 20, color: C.opticalBlue, weight: 'bold', tracking: 0.15 }),
          textLayer('Bénéfice 1', '✓  Gain de temps immédiat', PAD4 + cardW4 + 100, Y_CARDS4 + 130, { fontSize: 28, color: C.slate200, weight: 'medium', leading: 40 }),
          textLayer('Bénéfice 2', '✓  Coûts maîtrisés et justifiés', PAD4 + cardW4 + 100, Y_CARDS4 + 210, { fontSize: 28, color: C.slate200, weight: 'medium', leading: 40 }),
          textLayer('Bénéfice 3', '✓  Décisions claires et éclairées', PAD4 + cardW4 + 100, Y_CARDS4 + 290, { fontSize: 28, color: C.slate200, weight: 'medium', leading: 40 }),
          textLayer('Bénéfice 4', '✓  Continuité d\'activité assurée', PAD4 + cardW4 + 100, Y_CARDS4 + 370, { fontSize: 28, color: C.slate200, weight: 'medium', leading: 40 }),
        ],
      },
      {
        name: 'Services',
        opened: true,
        children: [
          { name: 'Bordure dégradée services', canvas: roundedGradientCanvas(svcOutW4, svcOutH4, 24), top: Y_SERVICES4, left: PAD4, bottom: Y_SERVICES4 + svcOutH4, right: W4 - PAD4 },
          { name: 'Fond intérieur services', canvas: roundedRectCanvas(svcOutW4 - 4, svcOutH4 - 4, 22, C.deepBg), top: Y_SERVICES4 + 2, left: PAD4 + 2, bottom: Y_SERVICES4 + svcOutH4 - 2, right: W4 - PAD4 - 2 },
          textLayer('Titre services', 'NOTRE EXPERTISE', W4 / 2 - 120, Y_SERVICES4 + 50, { fontSize: 26, color: C.white, weight: 'bold', tracking: 0.15, justification: 'center' }),
          ...svcLayers4,
        ],
      },
      {
        name: 'Contact',
        opened: true,
        children: [
          { name: 'Fond blanc arrondi', canvas: roundedRectCanvas(footerW4, footerH4, 24, C.white), top: Y_FOOTER4, left: PAD4, bottom: Y_FOOTER4 + footerH4, right: W4 - PAD4 },
          textLayer('Titre contact', 'CONTACT & INTERVENTION', PAD4 + 50, Y_FOOTER4 + 50, { fontSize: 30, color: C.slate900, weight: 'black', tracking: 0.12 }),
          { name: 'Icône localisation', canvas: mapPinIcn4, top: Y_FOOTER4 + 100, left: PAD4 + 50, bottom: Y_FOOTER4 + 148, right: PAD4 + 98 },
          textLayer('Localisation', 'Lyon · Auvergne-Rhône-Alpes', PAD4 + 110, Y_FOOTER4 + 108, { fontSize: 24, color: C.aegisBlue, weight: 'bold' }),
          textLayer('Accroche', 'Premier échange offert — sans engagement', PAD4 + 50, Y_FOOTER4 + 160, { fontSize: 22, color: C.slate400, weight: 'semibold' }),
          { name: 'Séparateur', canvas: solidCanvas(footerW4 - 100, 2, C.slate200), top: Y_FOOTER4 + 210, left: PAD4 + 50, bottom: Y_FOOTER4 + 212, right: W4 - PAD4 - 50 },
          {
            name: 'Coordonnées',
            opened: true,
            children: [
              textLayer('Label téléphone', 'TÉLÉPHONE', PAD4 + 50, Y_FOOTER4 + 240, { fontSize: 16, color: C.slate400, weight: 'bold', tracking: 0.1 }),
              textLayer('Numéro', '04 82 53 26 99', PAD4 + 50, Y_FOOTER4 + 275, { fontSize: 32, color: C.slate900, weight: 'black' }),
              textLayer('Label email', 'EMAIL', PAD4 + 50 + footerW4 / 3, Y_FOOTER4 + 240, { fontSize: 16, color: C.slate400, weight: 'bold', tracking: 0.1 }),
              textLayer('Adresse email', 'contact@aegisnetwork.fr', PAD4 + 50 + footerW4 / 3, Y_FOOTER4 + 275, { fontSize: 28, color: C.slate900, weight: 'bold' }),
              textLayer('Label web', 'SITE WEB', PAD4 + 50 + (footerW4 / 3) * 2, Y_FOOTER4 + 240, { fontSize: 16, color: C.slate400, weight: 'bold', tracking: 0.1 }),
              textLayer('URL', 'aegisnetwork.fr', PAD4 + 50 + (footerW4 / 3) * 2, Y_FOOTER4 + 275, { fontSize: 32, color: C.aegisBlue, weight: 'black' }),
            ],
          },
        ],
      },
    ],
  });
}

// ═══════════════════════════════════════════════════════════════════════
// 5. BROCHURE A4
// ═══════════════════════════════════════════════════════════════════════
async function buildBrochurePSD() {
  console.log('\n━━━ BROCHURE A4 ━━━\n');

  const W = 2480, H = 3508;
  const PAD = 140;
  const logoSz = 120;

  const logoCan = await svgToCanvas(aegisLogoSvg(), logoSz, logoSz);
  const logoClean = await svgToCanvas(aegisLogoCleanSvg('#FFFFFF'), 70, 70);
  const clipIcn = await iconCanvas('clipboard', 48, '#FFFFFF');
  const netIcn = await iconCanvas('globe', 48, '#FFFFFF');
  const boltIcn = await iconCanvas('bolt', 48, '#FFFFFF');
  const usersIcn = await iconCanvas('users', 48, '#FFFFFF');
  const chartIcn = await iconCanvas('chart', 48, '#FFFFFF');
  const lockIcn = await iconCanvas('lock', 48, '#FFFFFF');
  const phoneIcn = await iconCanvas('phone', 36, '#94A3B8');
  const mailIcn = await iconCanvas('mail', 36, '#94A3B8');
  const globeIcn = await iconCanvas('globe', 36, '#94A3B8');
  const mapPinIcn = await iconCanvas('mapPin', 36, '#94A3B8');

  const statW = 480, statH = 200;

  // Process steps
  const steps = [
    { num: '01', title: 'Diagnostic', desc: 'Analyse de votre infrastructure, contrats, usages et irritants.' },
    { num: '02', title: 'Recommandation', desc: 'Plan d\'action chiffré avec gains estimés et priorités.' },
    { num: '03', title: 'Pilotage', desc: 'Mise en œuvre, coordination prestataires et suivi qualité.' },
    { num: '04', title: 'Suivi continu', desc: 'Évolution maîtrisée, réactivité garantie, reporting régulier.' },
  ];

  const stepLayers = steps.flatMap((step, i) => {
    const y = PAD + 1040 + i * 200;
    return [
      textLayer(`Numéro ${step.num}`, step.num, PAD, y, { fontSize: 42, color: C.opticalBlue, weight: 'black' }),
      textLayer(`Titre étape ${step.num}`, step.title, PAD + 120, y, { fontSize: 28, color: C.white, weight: 'bold' }),
      textLayer(`Description ${step.num}`, step.desc, PAD + 120, y + 40, { fontSize: 20, color: C.slate400, weight: 'medium' }),
    ];
  });

  // Services
  const serviceData = [
    { icon: clipIcn, label: 'Audit & Cadrage' },
    { icon: netIcn, label: 'Conseil Réseau & Téléphonie' },
    { icon: boltIcn, label: 'Pilotage de projets' },
    { icon: usersIcn, label: 'Coordination prestataires' },
    { icon: chartIcn, label: 'Optimisation & Suivi' },
    { icon: lockIcn, label: 'Sécurité & Résilience' },
  ];

  const svcLayers = serviceData.flatMap((svc, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const colW = (W - PAD * 2) / 3;
    const x = PAD + col * colW;
    const y = PAD + 1980 + row * 160;
    return [
      { name: `Fond icône — ${svc.label}`, canvas: roundedGradientCanvas(60, 60, 12), top: y, left: x, bottom: y + 60, right: x + 60 },
      { name: `Icône — ${svc.label}`, canvas: svc.icon, top: y + 6, left: x + 6, bottom: y + 54, right: x + 54 },
      textLayer(svc.label, svc.label, x + 76, y + 16, { fontSize: 22, color: C.slate200, weight: 'semibold' }),
    ];
  });

  savePsd(path.join(OUT_PSD_DOCS, 'brochure-page1.psd'), {
    width: W, height: H,
    children: [
      {
        name: 'Fond',
        opened: true,
        children: [
          { name: 'Fond #020617', canvas: solidCanvas(W, H, C.deepBg), top: 0, left: 0, bottom: H, right: W },
          { name: 'Lueur bleue', canvas: radialGlowCanvas(W, H, W * 0.2, H * 0.15, W * 0.6, C.opticalBlue, 0.12), top: 0, left: 0, bottom: H, right: W },
          { name: 'Lueur violette', canvas: radialGlowCanvas(W, H, W * 0.8, H * 0.85, W * 0.5, C.deepViolet, 0.08), top: 0, left: 0, bottom: H, right: W },
          { name: 'Grille décorative', canvas: networkPatternCanvas(W, H, 0.015), top: 0, left: 0, bottom: H, right: W },
        ],
      },
      { name: 'Barre dégradée haut', canvas: horizontalGradientBar(W, 16), top: 0, left: 0, bottom: 16, right: W },
      {
        name: 'En-tête',
        opened: true,
        children: [
          { name: 'Fond logo (carré dégradé)', canvas: roundedGradientCanvas(120, 120, 16), top: PAD, left: PAD, bottom: PAD + 120, right: PAD + 120 },
          { name: 'Symbole Aegis (blanc)', canvas: logoClean, top: PAD + 25, left: PAD + 25, bottom: PAD + 95, right: PAD + 95 },
          textLayer('AEGIS NETWORK', 'AEGIS NETWORK', PAD + 145, PAD + 24, { fontSize: 38, color: C.white, weight: 'black', tracking: 0.06 }),
          textLayer('Baseline', 'CONSEIL & OPTIMISATION IT', PAD + 145, PAD + 72, { fontSize: 16, color: C.slate400, weight: 'semibold', tracking: 0.25 }),
        ],
      },
      {
        name: 'Titre',
        opened: true,
        children: [
          textLayer('Titre ligne 1', 'Reprenez le contrôle', PAD, PAD + 300, { fontSize: 72, color: C.white, weight: 'black', tracking: -0.03 }),
          textLayer('Titre ligne 2 (accent)', 'de votre IT.', PAD, PAD + 388, { fontSize: 72, color: C.opticalBlue, weight: 'black', tracking: -0.03 }),
          textLayer('Sous-titre', 'Audit, conseil et pilotage pour dirigeants\nde TPE/PME qui veulent optimiser sans subir.', PAD, PAD + 500, { fontSize: 28, color: C.slate300, weight: 'medium', leading: 42 }),
        ],
      },
      {
        name: 'Statistiques',
        opened: true,
        children: [
          { name: 'Fond stat 1', canvas: roundedRectCanvas(statW, statH, 16, C.slate900, 128), top: PAD + 650, left: PAD, bottom: PAD + 650 + statH, right: PAD + statW },
          textLayer('Stat 1 chiffre', '3 à 5 h', PAD + 30, PAD + 680, { fontSize: 48, color: C.white, weight: 'black' }),
          textLayer('Stat 1 label', 'perdues par semaine\nen gestion IT subie', PAD + 30, PAD + 740, { fontSize: 18, color: C.slate400, weight: 'medium', leading: 26 }),
          { name: 'Fond stat 2', canvas: roundedRectCanvas(statW, statH, 16, C.slate900, 128), top: PAD + 650, left: PAD + statW + 40, bottom: PAD + 650 + statH, right: PAD + statW * 2 + 40 },
          textLayer('Stat 2 chiffre', '15 à 30 %', PAD + statW + 70, PAD + 680, { fontSize: 48, color: C.opticalBlue, weight: 'black' }),
          textLayer('Stat 2 label', 'd\'écart moyen entre offres\ndu même opérateur', PAD + statW + 70, PAD + 740, { fontSize: 18, color: C.slate400, weight: 'medium', leading: 26 }),
          { name: 'Fond stat 3', canvas: roundedRectCanvas(statW, statH, 16, C.slate900, 128), top: PAD + 650, left: PAD + (statW + 40) * 2, bottom: PAD + 650 + statH, right: PAD + statW * 3 + 80 },
          textLayer('Stat 3 chiffre', '67 %', PAD + (statW + 40) * 2 + 30, PAD + 680, { fontSize: 48, color: C.deepViolet, weight: 'black' }),
          textLayer('Stat 3 label', 'des PME n\'ont pas de\nstratégie IT formalisée', PAD + (statW + 40) * 2 + 30, PAD + 740, { fontSize: 18, color: C.slate400, weight: 'medium', leading: 26 }),
        ],
      },
      {
        name: 'Processus',
        opened: true,
        children: [
          textLayer('Titre processus', 'NOTRE APPROCHE', PAD, PAD + 950, { fontSize: 20, color: C.opticalBlue, weight: 'bold', tracking: 0.15 }),
          ...stepLayers,
        ],
      },
      {
        name: 'Services',
        opened: true,
        children: [
          textLayer('Titre services', 'NOS DOMAINES D\'EXPERTISE', PAD, PAD + 1900, { fontSize: 20, color: C.opticalBlue, weight: 'bold', tracking: 0.15 }),
          ...svcLayers,
        ],
      },
      {
        name: 'Contact',
        opened: true,
        children: [
          { name: 'Fond contact', canvas: roundedRectCanvas(W - PAD * 2, 380, 24, C.slate900, 200), top: H - PAD - 400, left: PAD, bottom: H - PAD - 20, right: W - PAD },
          textLayer('Titre contact', 'Parlons de votre infrastructure.', PAD + 60, H - PAD - 360, { fontSize: 36, color: C.white, weight: 'black' }),
          textLayer('Accroche', 'Premier échange gratuit et sans engagement.', PAD + 60, H - PAD - 310, { fontSize: 22, color: C.slate400, weight: 'medium' }),
          { name: 'Icône téléphone', canvas: phoneIcn, top: H - PAD - 250, left: PAD + 60, bottom: H - PAD - 214, right: PAD + 96 },
          textLayer('Téléphone', '04 82 53 26 99', PAD + 110, H - PAD - 246, { fontSize: 24, color: C.slate200, weight: 'bold' }),
          { name: 'Icône email', canvas: mailIcn, top: H - PAD - 200, left: PAD + 60, bottom: H - PAD - 164, right: PAD + 96 },
          textLayer('Email', 'contact@aegisnetwork.fr', PAD + 110, H - PAD - 196, { fontSize: 24, color: C.opticalBlue, weight: 'bold' }),
          { name: 'Icône web', canvas: globeIcn, top: H - PAD - 150, left: PAD + 60, bottom: H - PAD - 114, right: PAD + 96 },
          textLayer('Web', 'aegisnetwork.fr', PAD + 110, H - PAD - 146, { fontSize: 24, color: C.opticalBlue, weight: 'bold' }),
          { name: 'Icône lieu', canvas: mapPinIcn, top: H - PAD - 100, left: PAD + 60, bottom: H - PAD - 64, right: PAD + 96 },
          textLayer('Lieu', 'Lyon · Auvergne-Rhône-Alpes', PAD + 110, H - PAD - 96, { fontSize: 24, color: C.slate400, weight: 'medium' }),
        ],
      },
    ],
  });
}

// ═══════════════════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════════════════
async function main() {
  console.log('╔══════════════════════════════════════════════════════════╗');
  console.log('║  AEGIS NETWORK — PSD Builder v2 (Reconstruction)        ║');
  console.log('╚══════════════════════════════════════════════════════════╝\n');

  ensureDir(OUT_PSD_LOGOS);
  ensureDir(OUT_PSD_DOCS);

  const results = {};
  const tasks = [
    ['logos', buildLogoPSDs],
    ['business-cards', buildBusinessCardPSDs],
    ['email-signatures', buildEmailSignaturePSDs],
    ['flyer', buildFlyerPSD],
    ['brochure', buildBrochurePSD],
  ];

  for (const [name, fn] of tasks) {
    try {
      await fn();
      results[name] = true;
    } catch (e) {
      console.error(`  ✗ ${name}: ${e.message}\n${e.stack}`);
      results[name] = false;
    }
  }

  // Clean up obsolete email-signature.psd (old version)
  const oldSig = path.join(OUT_PSD_DOCS, 'email-signature.psd');
  if (fs.existsSync(oldSig)) {
    const archiveDir = path.join(OUT_BASE, '04_ARCHIVE_REFERENCE');
    ensureDir(archiveDir);
    fs.renameSync(oldSig, path.join(archiveDir, 'email-signature-old.psd'));
    console.log('\n  → Archivé : email-signature.psd → 04_ARCHIVE_REFERENCE/');
  }

  // Summary
  console.log('\n╔══════════════════════════════════════════════════════════╗');
  console.log('║  RÉSUMÉ DE CONSTRUCTION                                  ║');
  console.log('╠══════════════════════════════════════════════════════════╣');
  for (const [key, ok] of Object.entries(results)) {
    console.log(`║  ${ok ? '✓' : '✗'}  ${key}`);
  }
  console.log('╠══════════════════════════════════════════════════════════╣');

  // List all output files with sizes
  console.log('║  Fichiers générés :');
  const allFiles = [];
  function listPsdFiles(dir) {
    if (!fs.existsSync(dir)) return;
    for (const f of fs.readdirSync(dir)) {
      const fp = path.join(dir, f);
      if (fs.statSync(fp).isDirectory()) listPsdFiles(fp);
      else if (f.endsWith('.psd')) {
        const kb = Math.round(fs.statSync(fp).size / 1024);
        const rel = path.relative(OUT_PSD, fp);
        console.log(`║    ${rel.padEnd(45)} ${kb} KB`);
        allFiles.push(fp);
      }
    }
  }
  listPsdFiles(OUT_PSD);
  console.log(`║  Total : ${allFiles.length} fichiers PSD`);
  console.log('╚══════════════════════════════════════════════════════════╝');
}

main().catch(e => {
  console.error('FATAL:', e);
  process.exit(1);
});
