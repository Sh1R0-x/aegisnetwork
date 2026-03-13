/**
 * AEGIS NETWORK — Professional PSD Builder (ag-psd)
 * ==================================================
 * Generates truly layered, editable PSD files with:
 * - Real text layers (editable in Photoshop)
 * - Separated icons as individual layers
 * - Separated backgrounds/shapes
 * - Decorative elements on their own layers
 * - Logical layer groups with clear names
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
  function createImageCallback(dataOrWidth, maybeHeight) {
    // ag-psd may call with (width, height) or (imageData)
    if (typeof dataOrWidth === 'number' && typeof maybeHeight === 'number') {
      return createCanvas(dataOrWidth, maybeHeight);
    }
    const buf = Buffer.isBuffer(dataOrWidth) ? dataOrWidth : Buffer.from(dataOrWidth);
    const img = new CanvasImage();
    img.src = buf;
    // Note: onload is async but this callback is synchronous.
    // For write-only usage this is acceptable; pixel data comes from our canvases.
    const c = createCanvas(img.width || 1, img.height || 1);
    c.getContext('2d').drawImage(img, 0, 0);
    return c;
  }
);

// ─── Register all Inter font weights ─────────────────────────────────
const FONT_DIRS = [
  path.join(process.env.LOCALAPPDATA || '', 'Microsoft\\Windows\\Fonts'),
  'C:\\Windows\\Fonts',
];
const FONT_FILES = [
  'Inter-Medium.ttf', 'Inter-SemiBold.ttf', 'Inter-Bold.ttf',
  'Inter-ExtraBold.ttf', 'Inter-Black.ttf',
  // Variable font removed: causes Photoshop "font representation" warnings
  // due to opsz/wght axes. Static weights only.
];
let fontsRegistered = 0;
for (const dir of FONT_DIRS) {
  for (const file of FONT_FILES) {
    const fp = path.join(dir, file);
    if (fs.existsSync(fp)) {
      try { GlobalFonts.registerFromPath(fp); fontsRegistered++; } catch { /* silent */ }
    }
  }
}
console.log(`  Fonts registered: ${fontsRegistered} Inter files`);

// ─── Config ──────────────────────────────────────────────────────────
const BRAND_DIR = path.resolve('brand');
const ASSETS_DIR = path.join(BRAND_DIR, 'assets');
const OUT_BASE = 'C:\\Users\\Ludovic\\Documents\\AEGIS_NETWORK_DESIGNER';
const OUT_PSD = path.join(OUT_BASE, '01_PSD_EDITABLE');
const OUT_PSD_LOGOS = path.join(OUT_PSD, 'logos');
const OUT_PSD_DOCS = path.join(OUT_PSD, 'documents');

const SRC_BASE = 'C:\\Users\\Ludovic\\Documents\\AEGIS NETWORK';
const SRC_LOGOS_SVG = path.join(SRC_BASE, '01_LOGOS', 'svg');

// Brand colors
const C = {
  aegisBlue:   { r: 37,  g: 99,  b: 235 },
  opticalBlue: { r: 59,  g: 130, b: 246 },
  deepViolet:  { r: 124, g: 58,  b: 237 },
  nodeBlue:    { r: 96,  g: 165, b: 250 },
  deepBg:      { r: 2,   g: 6,   b: 23  },
  slate900:    { r: 15,  g: 23,  b: 42  },
  slate800:    { r: 30,  g: 41,  b: 59  },
  slate700:    { r: 51,  g: 65,  b: 85  },
  slate500:    { r: 100, g: 116, b: 139 },
  slate400:    { r: 148, g: 163, b: 184 },
  slate300:    { r: 203, g: 213, b: 225 },
  slate200:    { r: 226, g: 232, b: 240 },
  slate50:     { r: 248, g: 250, b: 252 },
  white:       { r: 255, g: 255, b: 255 },
  black:       { r: 0,   g: 0,   b: 0   },
  cardDarkBg:  { r: 19,  g: 27,  b: 46  }, // #131B2E
};

// ─── Helpers ─────────────────────────────────────────────────────────
function ensureDir(dir) { fs.mkdirSync(dir, { recursive: true }); }

/** Convert hex color string to {r,g,b} */
function hexToRgb(hex) {
  const h = hex.replace('#', '');
  return { r: parseInt(h.slice(0, 2), 16), g: parseInt(h.slice(2, 4), 16), b: parseInt(h.slice(4, 6), 16) };
}

/** Render SVG string or file to a canvas at given size */
async function svgToCanvas(svgInput, width, height) {
  let buf;
  if (Buffer.isBuffer(svgInput) || typeof svgInput === 'string') {
    const svgBuf = typeof svgInput === 'string' && fs.existsSync(svgInput)
      ? fs.readFileSync(svgInput)
      : Buffer.from(svgInput);
    buf = await sharp(svgBuf, { density: 300 })
      .resize(width, height, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png().toBuffer();
  } else {
    buf = svgInput; // already a PNG buffer
  }
  const img = new CanvasImage();
  img.src = buf;
  await new Promise(resolve => { img.onload = resolve; });
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0, width, height);
  return canvas;
}

/** Create a solid color canvas */
function solidCanvas(w, h, color, alpha = 255) {
  const canvas = createCanvas(w, h);
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = `rgba(${color.r},${color.g},${color.b},${alpha / 255})`;
  ctx.fillRect(0, 0, w, h);
  return canvas;
}

/** Create a horizontal gradient canvas */
function gradientCanvas(w, h, stops, direction = 'horizontal') {
  const canvas = createCanvas(w, h);
  const ctx = canvas.getContext('2d');
  let grad;
  if (direction === 'horizontal') {
    grad = ctx.createLinearGradient(0, 0, w, 0);
  } else if (direction === 'vertical') {
    grad = ctx.createLinearGradient(0, 0, 0, h);
  } else if (direction === 'diagonal') {
    grad = ctx.createLinearGradient(0, 0, w, h);
  } else {
    // angle in degrees
    const angle = parseFloat(direction) * Math.PI / 180;
    const cx = w / 2, cy = h / 2;
    const len = Math.sqrt(w * w + h * h) / 2;
    grad = ctx.createLinearGradient(
      cx - Math.cos(angle) * len, cy - Math.sin(angle) * len,
      cx + Math.cos(angle) * len, cy + Math.sin(angle) * len
    );
  }
  for (const [pos, color] of stops) {
    grad.addColorStop(pos, color);
  }
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);
  return canvas;
}

/** Create a radial glow canvas */
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

/** Create a vertical thin bar with gradient */
function verticalGradientBar(w, h) {
  return gradientCanvas(w, h, [
    [0, '#2563EB'],
    [1, '#7C3AED'],
  ], 'vertical');
}

/** Create a horizontal gradient bar */
function horizontalGradientBar(w, h) {
  return gradientCanvas(w, h, [
    [0, '#3B82F6'],
    [0.5, '#7C3AED'],
    [1, '#3B82F6'],
  ], 'horizontal');
}

// ─── Text rendering helpers ──────────────────────────────────────────

/** Map weight keyword to CSS numeric weight and PostScript font name */
function fontSpec(weight) {
  switch (weight) {
    case 'black':     return { css: 900, ps: 'Inter-Black' };
    case 'extrabold': return { css: 800, ps: 'Inter-ExtraBold' };
    case 'bold':      return { css: 700, ps: 'Inter-Bold' };
    case 'semibold':  return { css: 600, ps: 'Inter-SemiBold' };
    case 'medium':    return { css: 500, ps: 'Inter-Medium' };
    default:          return { css: 500, ps: 'Inter-Medium' }; // No Inter-Regular static installed
  }
}

/** Render text to a canvas preview for immediate display in Photoshop */
function renderTextPreview(text, fontSize, color, opts = {}) {
  const {
    weight = 'medium',
    tracking = 0,
    leading,
  } = opts;

  const { css: cssWeight } = fontSpec(weight);
  const letterSpacing = tracking * fontSize; // tracking is in em
  const lines = text.split('\n');
  const lineH = leading || Math.round(fontSize * 1.25);

  // Measure context
  const mc = createCanvas(1, 1).getContext('2d');
  mc.font = `${cssWeight} ${fontSize}px Inter, sans-serif`;

  // Measure each line with tracking
  let maxW = 0;
  for (const line of lines) {
    let w = 0;
    for (let i = 0; i < line.length; i++) {
      w += mc.measureText(line[i]).width;
      if (i < line.length - 1) w += letterSpacing;
    }
    maxW = Math.max(maxW, w);
  }

  const padX = 2, padY = 2;
  const totalH = lineH * lines.length;
  const cvW = Math.ceil(maxW) + padX * 2 + 2;
  const cvH = Math.ceil(totalH) + padY * 2 + 2;

  const canvas = createCanvas(cvW, cvH);
  const ctx = canvas.getContext('2d');
  ctx.font = `${cssWeight} ${fontSize}px Inter, sans-serif`;
  ctx.fillStyle = `rgb(${color.r},${color.g},${color.b})`;
  ctx.textBaseline = 'top';
  ctx.antialias = 'subpixel';

  for (let l = 0; l < lines.length; l++) {
    const line = lines[l];
    let cx = padX;
    const cy = padY + l * lineH;
    for (let i = 0; i < line.length; i++) {
      ctx.fillText(line[i], cx, cy);
      cx += ctx.measureText(line[i]).width;
      if (i < line.length - 1) cx += letterSpacing;
    }
  }

  return canvas;
}

/** Make a text layer with BOTH text metadata AND pixel preview */
function textLayer(name, text, x, y, opts = {}) {
  const {
    font = 'Inter',
    fontSize = 24,
    color = C.white,
    tracking = 0,
    leading,
    weight,
    justification = 'left',
    transform,
  } = opts;

  const { ps: fontName } = fontSpec(weight);

  // Render pixel preview
  const preview = renderTextPreview(text, fontSize, color, { weight, tracking, leading });

  // Calculate bounds from position
  const tx = transform ? transform[4] : x;
  const ty = transform ? transform[5] : y;

  // Align transform Y to baseline: canvas preview is top-aligned,
  // but Photoshop text transform Y is the baseline position.
  // Ascent ≈ 75% of fontSize for Inter.
  const baselineY = ty + Math.round(fontSize * 0.75);

  return {
    name,
    canvas: preview,
    top: ty,
    left: tx,
    bottom: ty + preview.height,
    right: tx + preview.width,
    text: {
      text,
      transform: transform || [1, 0, 0, 1, x, y + Math.round(fontSize * 0.75)],
      antiAlias: 'smooth',
      style: {
        font: { name: font === 'Arial' ? 'ArialMT' : fontName },
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

/**
 * Create a dual-color text layer using styleRuns.
 * Used for "AEGIS NETWORK" where AEGIS is one color and NETWORK another.
 */
function dualColorTextLayer(name, text1, text2, x, y, opts = {}) {
  const {
    font = 'Inter',
    fontSize = 24,
    color1 = C.slate900,
    color2 = C.aegisBlue,
    tracking = 0,
    weight = 'black',
    justification = 'left',
    wordSpacing = ' ',
  } = opts;

  const { ps: fontName, css: cssWeight } = fontSpec(weight);
  const fullText = text1 + wordSpacing + text2;
  const letterSpacing = tracking * fontSize;

  // Render preview with dual colors
  const mc = createCanvas(1, 1).getContext('2d');
  mc.font = `${cssWeight} ${fontSize}px Inter, sans-serif`;

  let totalW = 0;
  for (let i = 0; i < fullText.length; i++) {
    totalW += mc.measureText(fullText[i]).width;
    if (i < fullText.length - 1) totalW += letterSpacing;
  }

  const padX = 2, padY = 2;
  const lineH = Math.round(fontSize * 1.25);
  const cvW = Math.ceil(totalW) + padX * 2 + 2;
  const cvH = lineH + padY * 2 + 2;

  const canvas = createCanvas(cvW, cvH);
  const ctx = canvas.getContext('2d');
  ctx.font = `${cssWeight} ${fontSize}px Inter, sans-serif`;
  ctx.textBaseline = 'top';
  ctx.antialias = 'subpixel';

  let cx = padX;
  for (let i = 0; i < fullText.length; i++) {
    ctx.fillStyle = i < text1.length
      ? `rgb(${color1.r},${color1.g},${color1.b})`
      : `rgb(${color2.r},${color2.g},${color2.b})`;
    ctx.fillText(fullText[i], cx, padY);
    cx += ctx.measureText(fullText[i]).width;
    if (i < fullText.length - 1) cx += letterSpacing;
  }

  const baselineY = y + Math.round(fontSize * 0.75);

  return {
    name,
    canvas,
    top: y,
    left: x,
    bottom: y + canvas.height,
    right: x + canvas.width,
    text: {
      text: fullText,
      transform: [1, 0, 0, 1, x, baselineY],
      antiAlias: 'smooth',
      style: {
        font: { name: fontName },
        fontSize,
        fillColor: color1,
        tracking: Math.round(tracking * 1000),
        autoLeading: true,
      },
      styleRuns: [
        {
          length: text1.length,
          style: { font: { name: fontName }, fontSize, fillColor: color1, tracking: Math.round(tracking * 1000) },
        },
        {
          length: wordSpacing.length,
          style: { font: { name: fontName }, fontSize, fillColor: color1, tracking: Math.round(tracking * 1000) },
        },
        {
          length: text2.length,
          style: { font: { name: fontName }, fontSize, fillColor: color2, tracking: Math.round(tracking * 1000) },
        },
      ],
      paragraphStyle: {
        justification,
      },
    },
  };
}

/** Standard imageResources for explicit 72 DPI */
const RESOLUTION_72 = {
  resolutionInfo: {
    horizontalResolution: 72,
    horizontalResolutionUnit: 'PPI',
    widthUnit: 'Inches',
    verticalResolution: 72,
    verticalResolutionUnit: 'PPI',
    heightUnit: 'Inches',
  },
};

/** Write PSD to disk — NO invalidateTextLayers so Photoshop uses our previews */
function savePsd(filepath, psd) {
  try {
    // Inject resolution if not already set
    if (!psd.imageResources) psd.imageResources = RESOLUTION_72;
    // Do NOT invalidate text layers — we provide pixel previews
    const buf = writePsdBuffer(psd);
    ensureDir(path.dirname(filepath));
    fs.writeFileSync(filepath, buf);
    const sizeKB = Math.round(fs.statSync(filepath).size / 1024);
    console.log(`  OK  ${path.basename(filepath)} (${sizeKB} KB)`);
    return true;
  } catch (e) {
    console.error(`  ERR ${path.basename(filepath)}: ${e.message}`);
    return false;
  }
}

// ─── SVG icon generators (Lucide-style, stroke-based) ────────────────
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

/** Render an SVG icon with a specific stroke color */
async function iconCanvas(iconKey, size, strokeColor = '#94A3B8') {
  let svg = ICONS[iconKey];
  if (!svg) throw new Error(`Unknown icon: ${iconKey}`);
  svg = svg.replace(/stroke="currentColor"/g, `stroke="${strokeColor}"`);
  return svgToCanvas(svg, size, size);
}

// ─── Aegis Logo SVG (inline, parametric) ─────────────────────────────
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

// ─── Network pattern generator ───────────────────────────────────────
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
      // Connect to neighbors
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + step, y - step);
      ctx.stroke();
    }
  }
  return canvas;
}

// ═══════════════════════════════════════════════════════════════════════
// PSD BUILDERS
// ═══════════════════════════════════════════════════════════════════════

// ─── 1. LOGO PSDs ────────────────────────────────────────────────────
async function buildLogoPSDs() {
  console.log('\n━━━ LOGO PSD FILES ━━━\n');

  const LOGO_SIZE = 2048;

  // --- Logo Master Fond Sombre ---
  console.log('  Building logo-master-fond-sombre.psd ...');
  const symbolGrad = await svgToCanvas(aegisLogoSvg(), LOGO_SIZE, LOGO_SIZE);
  const nodesOnly = await svgToCanvas(`<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="82" cy="18" r="4" fill="#60A5FA"/>
    <circle cx="92" cy="32" r="3" fill="#60A5FA" opacity="0.6"/>
    <circle cx="72" cy="8" r="3" fill="#7C3AED" opacity="0.8"/>
    <path d="M65 35 L82 18" stroke="url(#g)" stroke-width="1.5" stroke-dasharray="4 4">
      <defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#2563EB"/><stop offset="100%" stop-color="#7C3AED"/>
      </linearGradient></defs>
    </path>
  </svg>`, LOGO_SIZE, LOGO_SIZE);
  const triangleOnly = await svgToCanvas(aegisLogoCleanSvg(), LOGO_SIZE, LOGO_SIZE);

  const canvasSize = 3000;
  const offset = (canvasSize - LOGO_SIZE) / 2;

  savePsd(path.join(OUT_PSD_LOGOS, 'logo-master-fond-sombre.psd'), {
    width: canvasSize,
    height: canvasSize,
    children: [
      {
        name: 'Fond sombre #020617',
        canvas: solidCanvas(canvasSize, canvasSize, C.deepBg),
        top: 0, left: 0, bottom: canvasSize, right: canvasSize,
      },
      {
        name: 'Lueur bleue',
        canvas: radialGlowCanvas(canvasSize, canvasSize, canvasSize * 0.3, canvasSize * 0.3, canvasSize * 0.5, C.aegisBlue, 0.08),
        top: 0, left: 0, bottom: canvasSize, right: canvasSize,
        opacity: 0.6,
      },
      {
        name: 'Lueur violette',
        canvas: radialGlowCanvas(canvasSize, canvasSize, canvasSize * 0.7, canvasSize * 0.7, canvasSize * 0.4, C.deepViolet, 0.06),
        top: 0, left: 0, bottom: canvasSize, right: canvasSize,
        opacity: 0.5,
      },
      {
        name: 'Symbole complet (triangle + nodes)',
        canvas: symbolGrad,
        top: offset, left: offset, bottom: offset + LOGO_SIZE, right: offset + LOGO_SIZE,
      },
      textLayer('AEGIS', 'AEGIS', canvasSize / 2 - 400, canvasSize * 0.82, {
        fontSize: 120, color: C.white, weight: 'black', tracking: 0.06,
      }),
      textLayer('NETWORK', 'NETWORK', canvasSize / 2 + 80, canvasSize * 0.82, {
        fontSize: 120, color: C.opticalBlue, weight: 'black', tracking: 0.06,
      }),
      textLayer('Baseline', 'CONSEIL & OPTIMISATION IT', canvasSize / 2 - 400, canvasSize * 0.87, {
        fontSize: 40, color: C.slate400, weight: 'bold', tracking: 0.25,
      }),
    ],
  });

  // --- Logo Master Fond Clair ---
  console.log('  Building logo-master-fond-clair.psd ...');
  const symbolDark = await svgToCanvas(aegisLogoSvg('#0F172A', '#0F172A', '#0F172A'), LOGO_SIZE, LOGO_SIZE);

  savePsd(path.join(OUT_PSD_LOGOS, 'logo-master-fond-clair.psd'), {
    width: canvasSize,
    height: canvasSize,
    children: [
      {
        name: 'Fond clair #F8FAFC',
        canvas: solidCanvas(canvasSize, canvasSize, C.slate50),
        top: 0, left: 0, bottom: canvasSize, right: canvasSize,
      },
      {
        name: 'Symbole sombre',
        canvas: symbolDark,
        top: offset, left: offset, bottom: offset + LOGO_SIZE, right: offset + LOGO_SIZE,
      },
      textLayer('AEGIS', 'AEGIS', canvasSize / 2 - 400, canvasSize * 0.82, {
        fontSize: 120, color: C.slate900, weight: 'black', tracking: 0.06,
      }),
      textLayer('NETWORK', 'NETWORK', canvasSize / 2 + 80, canvasSize * 0.82, {
        fontSize: 120, color: C.aegisBlue, weight: 'black', tracking: 0.06,
      }),
      textLayer('Baseline', 'CONSEIL & OPTIMISATION IT', canvasSize / 2 - 400, canvasSize * 0.87, {
        fontSize: 40, color: C.slate700, weight: 'bold', tracking: 0.25,
      }),
    ],
  });

  // --- Symbol All Variants ---
  console.log('  Building symbol-all-variants.psd ...');
  const symbolWhite = await svgToCanvas(aegisLogoSvg('#FFFFFF', '#FFFFFF', '#FFFFFF'), LOGO_SIZE, LOGO_SIZE);
  const symbolBlue = await svgToCanvas(aegisLogoSvg('#2563EB', '#2563EB', '#2563EB'), LOGO_SIZE, LOGO_SIZE);
  const symbolClean = await svgToCanvas(aegisLogoCleanSvg(), LOGO_SIZE, LOGO_SIZE);

  savePsd(path.join(OUT_PSD_LOGOS, 'symbol-all-variants.psd'), {
    width: LOGO_SIZE + 200,
    height: LOGO_SIZE + 200,
    children: [
      {
        name: 'Symbol - Gradient + Nodes',
        canvas: symbolGrad,
        top: 100, left: 100, bottom: 100 + LOGO_SIZE, right: 100 + LOGO_SIZE,
      },
      {
        name: 'Symbol - Gradient Clean (no nodes)',
        canvas: symbolClean,
        top: 100, left: 100, bottom: 100 + LOGO_SIZE, right: 100 + LOGO_SIZE,
        hidden: true,
      },
      {
        name: 'Symbol - White',
        canvas: symbolWhite,
        top: 100, left: 100, bottom: 100 + LOGO_SIZE, right: 100 + LOGO_SIZE,
        hidden: true,
      },
      {
        name: 'Symbol - Blue Mono',
        canvas: symbolBlue,
        top: 100, left: 100, bottom: 100 + LOGO_SIZE, right: 100 + LOGO_SIZE,
        hidden: true,
      },
      {
        name: 'Symbol - Dark Mono',
        canvas: symbolDark,
        top: 100, left: 100, bottom: 100 + LOGO_SIZE, right: 100 + LOGO_SIZE,
        hidden: true,
      },
    ],
  });

  // --- Decorative Elements ---
  console.log('  Building decorative-elements.psd ...');
  const fiberNodes = await svgToCanvas(`<svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
    <stop offset="0%" stop-color="#2563EB"/><stop offset="100%" stop-color="#7C3AED"/>
  </linearGradient></defs>
  <circle cx="30" cy="12" r="5" fill="#60A5FA"/>
  <circle cx="45" cy="28" r="4" fill="#60A5FA" opacity="0.6"/>
  <circle cx="18" cy="6" r="4" fill="#7C3AED" opacity="0.8"/>
  <path d="M10 40 L30 12" stroke="url(#g)" stroke-width="1.5" stroke-dasharray="4 4"/>
  <path d="M30 12 L45 28" stroke="url(#g)" stroke-width="1.5" stroke-dasharray="4 4"/>
</svg>`, 1024, 1024);

  const gradBar = horizontalGradientBar(4000, 60);

  savePsd(path.join(OUT_PSD_LOGOS, 'decorative-elements.psd'), {
    width: 4000,
    height: 2000,
    children: [
      {
        name: 'Fiber Nodes (cluster réseau)',
        canvas: fiberNodes,
        top: 100, left: 100, bottom: 1124, right: 1124,
      },
      {
        name: 'Barre dégradée horizontale',
        canvas: gradBar,
        top: 1400, left: 0, bottom: 1460, right: 4000,
      },
      {
        name: 'Barre dégradée verticale',
        canvas: verticalGradientBar(12, 1000),
        top: 200, left: 2000, bottom: 1200, right: 2012,
      },
    ],
  });
}

// ─── 2. BUSINESS CARD PSD ────────────────────────────────────────────
async function buildBusinessCardPSD() {
  console.log('\n━━━ BUSINESS CARD PSD ━━━\n');

  // 85×55mm at 300dpi = 1004×650px (per side)
  // We add 3mm bleed: 91×61mm = 1075×720px
  const W = 1075;
  const H = 720;
  const BLEED = 35; // 3mm in px at 300dpi
  const SAFE = 59; // 5mm

  const logoSize = 80;
  const iconSize = 28;

  // Logo SVG canvas
  const logoCanvas = await svgToCanvas(aegisLogoSvg(), logoSize, logoSize);
  const logoDarkCanvas = await svgToCanvas(aegisLogoSvg('#0F172A', '#0F172A', '#0F172A'), logoSize, logoSize);
  const logoLargeVerso = await svgToCanvas(aegisLogoSvg(), 160, 160);

  // Contact icons — render at higher res for quality
  const phoneIcon = await iconCanvas('phone', iconSize, '#334155');
  const mailIcon = await iconCanvas('mail', iconSize, '#334155');
  const globeIcon = await iconCanvas('globe', iconSize, '#334155');

  // Layout constants for recto
  const leftMargin = BLEED + SAFE + 20; // After accent bar
  const contentLeft = leftMargin + 10;  // Content indented from bar

  // ── RECTO (fond clair) ──
  console.log('  Building business-card.psd (recto + verso) ...');

  const rectoChildren = [
    // Background
    {
      name: 'Fond clair #F8FAFC',
      canvas: solidCanvas(W, H, C.slate50),
      top: 0, left: 0, bottom: H, right: W,
    },
    // Accent bar (left, vertical gradient)
    {
      name: 'Barre accent gauche (dégradé)',
      canvas: verticalGradientBar(8, H - BLEED * 2),
      top: BLEED, left: BLEED, bottom: H - BLEED, right: BLEED + 8,
    },
    // Decorative orb (bottom-right)
    {
      name: 'Orbe décoratif (bas-droite)',
      canvas: radialGlowCanvas(400, 400, 200, 200, 180, C.aegisBlue, 0.06),
      top: H - 400, left: W - 400, bottom: H, right: W,
      opacity: 0.7,
    },
    // Logo group
    {
      name: 'Logo',
      opened: true,
      children: [
        {
          name: 'Symbole Aegis',
          canvas: logoDarkCanvas,
          top: BLEED + SAFE, left: contentLeft,
          bottom: BLEED + SAFE + logoSize, right: contentLeft + logoSize,
        },
        // AEGIS (noir) + NETWORK (bleu) — dual color
        dualColorTextLayer('AEGIS NETWORK', 'AEGIS', 'NETWORK',
          contentLeft + logoSize + 16, BLEED + SAFE + 34, {
          fontSize: 18, color1: C.slate900, color2: C.aegisBlue,
          weight: 'black', tracking: 0.06,
        }),
      ],
    },
    // Identité
    {
      name: 'Identité',
      opened: true,
      children: [
        textLayer('Nom', 'Ludovic ROCHET-BELLAVIA', contentLeft, BLEED + SAFE + logoSize + 40, {
          fontSize: 28, color: C.slate900, weight: 'extrabold', tracking: -0.01,
        }),
        textLayer('Fonction', 'Consultant réseaux & téléphonie', contentLeft, BLEED + SAFE + logoSize + 76, {
          fontSize: 16, color: C.aegisBlue, weight: 'semibold', tracking: 0.02,
        }),
      ],
    },
    // Contact
    {
      name: 'Contact',
      opened: true,
      children: [
        // Phone
        {
          name: 'Icône téléphone',
          canvas: phoneIcon,
          top: H - BLEED - SAFE - 100, left: contentLeft,
          bottom: H - BLEED - SAFE - 100 + iconSize, right: contentLeft + iconSize,
        },
        textLayer('Téléphone', '06 52 95 00 10', contentLeft + iconSize + 10, H - BLEED - SAFE - 96, {
          fontSize: 15, color: C.slate700, weight: 'medium',
        }),
        // Email
        {
          name: 'Icône email',
          canvas: mailIcon,
          top: H - BLEED - SAFE - 60, left: contentLeft,
          bottom: H - BLEED - SAFE - 60 + iconSize, right: contentLeft + iconSize,
        },
        textLayer('Email', 'contact@aegisnetwork.fr', contentLeft + iconSize + 10, H - BLEED - SAFE - 56, {
          fontSize: 15, color: C.slate700, weight: 'medium',
        }),
        // Website (bottom-right)
        {
          name: 'Icône web',
          canvas: globeIcon,
          top: H - BLEED - SAFE - 34, left: W - BLEED - SAFE - 220,
          bottom: H - BLEED - SAFE - 34 + iconSize, right: W - BLEED - SAFE - 220 + iconSize,
        },
        textLayer('Site web', 'aegisnetwork.fr', W - BLEED - SAFE - 220 + iconSize + 10, H - BLEED - SAFE - 30, {
          fontSize: 15, color: C.slate700, weight: 'medium',
        }),
      ],
    },
  ];

  // ── VERSO (fond sombre) ──
  const versoChildren = [
    // Background gradient
    {
      name: 'Fond sombre (dégradé)',
      canvas: gradientCanvas(W, H, [
        [0, '#0F172A'],
        [1, '#131B2E'],
      ], '145'),
      top: 0, left: 0, bottom: H, right: W,
    },
    // Glows
    {
      name: 'Lueur bleue (haut-gauche)',
      canvas: radialGlowCanvas(W, H, W * 0.2, H * 0.2, W * 0.5, C.aegisBlue, 0.06),
      top: 0, left: 0, bottom: H, right: W,
    },
    {
      name: 'Lueur violette (bas-droite)',
      canvas: radialGlowCanvas(W, H, W * 0.8, H * 0.8, W * 0.4, C.deepViolet, 0.04),
      top: 0, left: 0, bottom: H, right: W,
    },
    // Logo centered
    {
      name: 'Logo',
      opened: true,
      children: [
        {
          name: 'Symbole Aegis',
          canvas: logoLargeVerso,
          top: (H - 160) / 2 - 50, left: (W - 160) / 2,
          bottom: (H - 160) / 2 - 50 + 160, right: (W - 160) / 2 + 160,
        },
        // AEGIS (blanc) + NETWORK (bleu optique) — dual color
        dualColorTextLayer('AEGIS NETWORK', 'AEGIS', 'NETWORK',
          W / 2 - 120, H / 2 + 50, {
          fontSize: 24, color1: C.white, color2: C.opticalBlue,
          weight: 'black', tracking: 0.06,
        }),
        textLayer('Baseline', 'CONSEIL & OPTIMISATION IT', W / 2 - 120, H / 2 + 82, {
          fontSize: 10, color: C.slate400, weight: 'bold', tracking: 0.25,
        }),
      ],
    },
    textLayer('URL', 'aegisnetwork.fr', W / 2 - 50, H - BLEED - SAFE - 30, {
      fontSize: 11, color: C.slate700, weight: 'medium', tracking: 0.05,
    }),
  ];

  // ── VERSION ALTERNATIVE (accent bandeau haut) ──
  const rectoAltChildren = [
    {
      name: 'Fond blanc #FFFFFF',
      canvas: solidCanvas(W, H, C.white),
      top: 0, left: 0, bottom: H, right: W,
    },
    {
      name: 'Bandeau dégradé haut',
      canvas: horizontalGradientBar(W - BLEED * 2, 8),
      top: BLEED, left: BLEED, bottom: BLEED + 8, right: W - BLEED,
    },
    {
      name: 'Logo',
      opened: true,
      children: [
        {
          name: 'Symbole Aegis',
          canvas: logoDarkCanvas,
          top: BLEED + SAFE + 16, left: BLEED + SAFE,
          bottom: BLEED + SAFE + 16 + logoSize, right: BLEED + SAFE + logoSize,
        },
        dualColorTextLayer('AEGIS NETWORK', 'AEGIS', 'NETWORK',
          BLEED + SAFE + logoSize + 16, BLEED + SAFE + 44, {
          fontSize: 18, color1: C.slate900, color2: C.aegisBlue,
          weight: 'black', tracking: 0.06,
        }),
      ],
    },
    {
      name: 'Identité',
      opened: true,
      children: [
        textLayer('Nom', 'Ludovic ROCHET-BELLAVIA', BLEED + SAFE, BLEED + SAFE + logoSize + 50, {
          fontSize: 28, color: C.slate900, weight: 'extrabold', tracking: -0.01,
        }),
        textLayer('Fonction', 'Consultant réseaux & téléphonie', BLEED + SAFE, BLEED + SAFE + logoSize + 82, {
          fontSize: 16, color: C.aegisBlue, weight: 'semibold', tracking: 0.02,
        }),
      ],
    },
    {
      name: 'Contact',
      opened: true,
      children: [
        {
          name: 'Icône téléphone',
          canvas: phoneIcon,
          top: H - BLEED - SAFE - 100, left: BLEED + SAFE,
          bottom: H - BLEED - SAFE - 100 + iconSize, right: BLEED + SAFE + iconSize,
        },
        textLayer('Téléphone', '06 52 95 00 10', BLEED + SAFE + iconSize + 10, H - BLEED - SAFE - 96, {
          fontSize: 15, color: C.slate700, weight: 'medium',
        }),
        {
          name: 'Icône email',
          canvas: mailIcon,
          top: H - BLEED - SAFE - 60, left: BLEED + SAFE,
          bottom: H - BLEED - SAFE - 60 + iconSize, right: BLEED + SAFE + iconSize,
        },
        textLayer('Email', 'contact@aegisnetwork.fr', BLEED + SAFE + iconSize + 10, H - BLEED - SAFE - 56, {
          fontSize: 15, color: C.slate700, weight: 'medium',
        }),
        {
          name: 'Icône web',
          canvas: globeIcon,
          top: H - BLEED - SAFE - 34, left: W - BLEED - SAFE - 220,
          bottom: H - BLEED - SAFE - 34 + iconSize, right: W - BLEED - SAFE - 220 + iconSize,
        },
        textLayer('Site web', 'aegisnetwork.fr', W - BLEED - SAFE - 220 + iconSize + 10, H - BLEED - SAFE - 30, {
          fontSize: 15, color: C.slate700, weight: 'medium',
        }),
      ],
    },
  ];

  // Save business card PSDs
  savePsd(path.join(OUT_PSD_DOCS, 'business-card-recto.psd'), {
    width: W, height: H,
    children: [
      {
        name: 'Version Principale (accent gauche)',
        opened: true,
        children: rectoChildren,
      },
    ],
  });

  savePsd(path.join(OUT_PSD_DOCS, 'business-card-recto-alt.psd'), {
    width: W, height: H,
    children: [
      {
        name: 'Version Alternative (bandeau haut)',
        opened: true,
        children: rectoAltChildren,
      },
    ],
  });

  savePsd(path.join(OUT_PSD_DOCS, 'business-card-verso.psd'), {
    width: W, height: H,
    children: [
      {
        name: 'Verso',
        opened: true,
        children: versoChildren,
      },
    ],
  });
}

// ─── 3. EMAIL SIGNATURE PSD ─────────────────────────────────────────
async function buildEmailSignaturePSD() {
  console.log('\n━━━ EMAIL SIGNATURE PSD ━━━\n');

  // Email signature is typically ~600px wide, digital format
  const W = 1200;
  const H = 500;

  const logoSize = 120;
  const iconSize = 32;

  const logoCanvas = await svgToCanvas(aegisLogoSvg(), logoSize, logoSize);
  const logoWhite = await svgToCanvas(aegisLogoSvg('#FFFFFF', '#FFFFFF', '#FFFFFF'), logoSize, logoSize);
  const phoneIcon = await iconCanvas('phone', iconSize, '#94A3B8');
  const mailIcon = await iconCanvas('mail', iconSize, '#94A3B8');
  const globeIcon = await iconCanvas('globe', iconSize, '#94A3B8');
  const phoneIconDark = await iconCanvas('phone', iconSize, '#64748B');
  const mailIconDark = await iconCanvas('mail', iconSize, '#64748B');
  const globeIconDark = await iconCanvas('globe', iconSize, '#64748B');

  // ── Version Claire ──
  console.log('  Building email-signature-light.psd ...');
  savePsd(path.join(OUT_PSD_DOCS, 'email-signature-light.psd'), {
    width: W, height: H,
    children: [
      {
        name: 'Fond blanc',
        canvas: solidCanvas(W, H, C.white),
        top: 0, left: 0, bottom: H, right: W,
      },
      {
        name: 'Logo',
        opened: true,
        children: [
          {
            name: 'Symbole Aegis',
            canvas: logoCanvas,
            top: 40, left: 40,
            bottom: 40 + logoSize, right: 40 + logoSize,
          },
        ],
      },
      {
        name: 'Séparateur bleu vertical',
        canvas: solidCanvas(6, 200, C.aegisBlue),
        top: 40, left: 40 + logoSize + 30,
        bottom: 240, right: 40 + logoSize + 36,
      },
      {
        name: 'Identité',
        opened: true,
        children: [
          textLayer('Nom', 'Ludovic ROCHET-BELLAVIA', 40 + logoSize + 56, 52, {
            fontSize: 30, color: C.slate900, weight: 'bold',
          }),
          textLayer('Fonction & Entreprise', 'Consultant réseaux & téléphonie — AEGIS NETWORK', 40 + logoSize + 56, 90, {
            fontSize: 24, color: C.aegisBlue, weight: 'semibold',
          }),
        ],
      },
      {
        name: 'Contact',
        opened: true,
        children: [
          {
            name: 'Icône téléphone',
            canvas: phoneIcon,
            top: 135, left: 40 + logoSize + 56,
            bottom: 135 + iconSize, right: 40 + logoSize + 56 + iconSize,
          },
          textLayer('Téléphone', '06 52 95 00 10', 40 + logoSize + 56 + iconSize + 12, 140, {
            fontSize: 22, color: C.slate900, weight: 'medium',
          }),
          {
            name: 'Icône email',
            canvas: mailIcon,
            top: 180, left: 40 + logoSize + 56,
            bottom: 180 + iconSize, right: 40 + logoSize + 56 + iconSize,
          },
          textLayer('Email', 'contact@aegisnetwork.fr', 40 + logoSize + 56 + iconSize + 12, 185, {
            fontSize: 22, color: C.aegisBlue, weight: 'medium',
          }),
          {
            name: 'Icône web/lieu',
            canvas: globeIcon,
            top: 225, left: 40 + logoSize + 56,
            bottom: 225 + iconSize, right: 40 + logoSize + 56 + iconSize,
          },
          textLayer('Web & Lieu', 'aegisnetwork.fr · Lyon, France', 40 + logoSize + 56 + iconSize + 12, 230, {
            fontSize: 22, color: C.aegisBlue, weight: 'medium',
          }),
        ],
      },
      // Separator line
      {
        name: 'Séparateur bas',
        canvas: solidCanvas(W - 80, 2, C.slate200),
        top: 300, left: 40, bottom: 302, right: W - 40,
      },
      textLayer('Baseline', 'Conseil & Optimisation IT — Réseaux, Téléphonie, Infrastructure', 40, 320, {
        fontSize: 20, color: C.slate400, weight: 'medium', tracking: 0.03,
      }),
    ],
  });

  // ── Version Sombre ──
  console.log('  Building email-signature-dark.psd ...');
  savePsd(path.join(OUT_PSD_DOCS, 'email-signature-dark.psd'), {
    width: W, height: H,
    children: [
      {
        name: 'Fond sombre #0F172A',
        canvas: solidCanvas(W, H, C.slate900),
        top: 0, left: 0, bottom: H, right: W,
      },
      {
        name: 'Logo',
        opened: true,
        children: [
          {
            name: 'Symbole Aegis',
            canvas: logoCanvas,
            top: 40, left: 40,
            bottom: 40 + logoSize, right: 40 + logoSize,
          },
        ],
      },
      {
        name: 'Séparateur bleu vertical',
        canvas: solidCanvas(6, 200, C.opticalBlue),
        top: 40, left: 40 + logoSize + 30,
        bottom: 240, right: 40 + logoSize + 36,
      },
      {
        name: 'Identité',
        opened: true,
        children: [
          textLayer('Nom', 'Ludovic ROCHET-BELLAVIA', 40 + logoSize + 56, 52, {
            fontSize: 30, color: C.slate50, weight: 'bold',
          }),
          textLayer('Fonction & Entreprise', 'Consultant réseaux & téléphonie — AEGIS NETWORK', 40 + logoSize + 56, 90, {
            fontSize: 24, color: C.opticalBlue, weight: 'semibold',
          }),
        ],
      },
      {
        name: 'Contact',
        opened: true,
        children: [
          {
            name: 'Icône téléphone',
            canvas: phoneIconDark,
            top: 135, left: 40 + logoSize + 56,
            bottom: 135 + iconSize, right: 40 + logoSize + 56 + iconSize,
          },
          textLayer('Téléphone', '06 52 95 00 10', 40 + logoSize + 56 + iconSize + 12, 140, {
            fontSize: 22, color: C.slate200, weight: 'medium',
          }),
          {
            name: 'Icône email',
            canvas: mailIconDark,
            top: 180, left: 40 + logoSize + 56,
            bottom: 180 + iconSize, right: 40 + logoSize + 56 + iconSize,
          },
          textLayer('Email', 'contact@aegisnetwork.fr', 40 + logoSize + 56 + iconSize + 12, 185, {
            fontSize: 22, color: C.opticalBlue, weight: 'medium',
          }),
          {
            name: 'Icône web/lieu',
            canvas: globeIconDark,
            top: 225, left: 40 + logoSize + 56,
            bottom: 225 + iconSize, right: 40 + logoSize + 56 + iconSize,
          },
          textLayer('Web & Lieu', 'aegisnetwork.fr · Lyon, France', 40 + logoSize + 56 + iconSize + 12, 230, {
            fontSize: 22, color: C.opticalBlue, weight: 'medium',
          }),
        ],
      },
      {
        name: 'Séparateur bas',
        canvas: solidCanvas(W - 80, 2, C.slate800),
        top: 300, left: 40, bottom: 302, right: W - 40,
      },
      textLayer('Baseline', 'Conseil & Optimisation IT — Réseaux, Téléphonie, Infrastructure', 40, 320, {
        fontSize: 20, color: { r: 71, g: 85, b: 105 }, weight: 'medium', tracking: 0.03,
      }),
    ],
  });
}

// ─── 4. FLYER PSD ────────────────────────────────────────────────────
async function buildFlyerPSD() {
  console.log('\n━━━ FLYER PSD ━━━\n');

  // A5 at 300dpi = 1748×2480px
  const W = 1748;
  const H = 2480;
  const PAD = 120; // ~10mm padding

  const logoSize = 100;
  const iconSize = 42;
  const serviceIconSize = 56;

  // Render assets
  const logoCanvas = await svgToCanvas(aegisLogoSvg(), logoSize, logoSize);
  const alertIcon = await iconCanvas('alertTriangle', 36, '#64748B');
  const checkIcon = await iconCanvas('checkCircle', 36, '#3B82F6');
  const clipboardIcon = await iconCanvas('clipboard', serviceIconSize, '#FFFFFF');
  const networkIcon = await iconCanvas('networkGlobe', serviceIconSize, '#FFFFFF');
  const boltIcon = await iconCanvas('bolt', serviceIconSize, '#FFFFFF');
  const usersIcon = await iconCanvas('users', serviceIconSize, '#FFFFFF');
  const chartIcon = await iconCanvas('chart', serviceIconSize, '#FFFFFF');
  const lockIcon = await iconCanvas('lock', serviceIconSize, '#FFFFFF');
  const phoneFlyer = await iconCanvas('phone', 36, '#2563EB');
  const mailFlyer = await iconCanvas('mail', 36, '#2563EB');
  const globeFlyer = await iconCanvas('globe', 36, '#2563EB');
  const mapPinIcon = await iconCanvas('mapPin', 36, '#2563EB');

  // Service icon background gradient squares
  const serviceIconBg = gradientCanvas(serviceIconSize + 16, serviceIconSize + 16, [
    [0, '#2563EB'], [1, '#7C3AED'],
  ], 'diagonal');

  // Challenge & benefit card backgrounds
  const challengeCardW = (W - PAD * 2 - 40) / 2;
  const challengeCardH = 420;
  const challengeCardBg = roundedRectCanvas(challengeCardW, challengeCardH, 20, C.slate900, 128);
  const benefitCardBg = roundedRectCanvas(challengeCardW, challengeCardH, 20, { r: 23, g: 37, b: 84 }, 50); // blue-950/20

  // Services section
  const servicesOuterW = W - PAD * 2;
  const servicesOuterH = 520;
  const servicesInnerBg = roundedRectCanvas(servicesOuterW - 4, servicesOuterH - 4, 18, C.deepBg);

  // Contact footer
  const footerW = W - PAD * 2;
  const footerH = 340;
  const footerBg = roundedRectCanvas(footerW, footerH, 20, C.white);

  // Y positions (layout)
  const Y_HEADER = PAD;
  const Y_HERO = PAD + 140;
  const Y_CARDS = Y_HERO + 260;
  const Y_SERVICES = Y_CARDS + challengeCardH + 60;
  const Y_FOOTER = H - PAD - footerH;

  console.log('  Building flyer-A5.psd ...');

  const psd = {
    width: W,
    height: H,
    children: [
      // ── Background Group ──
      {
        name: 'Background',
        opened: true,
        children: [
          {
            name: 'Fond profond #020617',
            canvas: solidCanvas(W, H, C.deepBg),
            top: 0, left: 0, bottom: H, right: W,
          },
          {
            name: 'Lueur bleue (haut-droite)',
            canvas: radialGlowCanvas(W, H, W * 0.8, H * 0.1, W * 0.6, C.aegisBlue, 0.20),
            top: 0, left: 0, bottom: H, right: W,
          },
          {
            name: 'Lueur violette (bas-gauche)',
            canvas: radialGlowCanvas(W, H, W * 0.2, H * 0.9, W * 0.6, C.deepViolet, 0.15),
            top: 0, left: 0, bottom: H, right: W,
          },
          {
            name: 'Motif réseau',
            canvas: networkPatternCanvas(W, H, 0.04),
            top: 0, left: 0, bottom: H, right: W,
          },
        ],
      },

      // ── Header ──
      {
        name: 'Header',
        opened: true,
        children: [
          {
            name: 'Symbole Aegis',
            canvas: logoCanvas,
            top: Y_HEADER, left: PAD,
            bottom: Y_HEADER + logoSize, right: PAD + logoSize,
          },
          textLayer('AEGIS NETWORK', 'AEGIS NETWORK', PAD + logoSize + 20, Y_HEADER + 20, {
            fontSize: 42, color: C.white, weight: 'black', tracking: 0.06,
          }),
          textLayer('Baseline', 'CONSEIL & OPTIMISATION IT', PAD + logoSize + 20, Y_HEADER + 68, {
            fontSize: 16, color: C.slate400, weight: 'bold', tracking: 0.25,
          }),
        ],
      },

      // ── Hero ──
      {
        name: 'Hero',
        opened: true,
        children: [
          textLayer('Titre principal', 'Reprenez le contrôle de votre', PAD, Y_HERO, {
            fontSize: 60, color: C.white, weight: 'black', tracking: -0.02,
          }),
          textLayer('Titre principal (accent)', 'infrastructure IT', PAD, Y_HERO + 70, {
            fontSize: 60, color: C.opticalBlue, weight: 'black', tracking: -0.02,
          }),
          textLayer('Sous-titre', 'Conseil, audit et pilotage pour TPE & PME. Ne laissez plus\nla technique freiner votre activité ni peser sur votre budget.', PAD, Y_HERO + 160, {
            fontSize: 24, color: C.slate300, weight: 'medium', leading: 36,
          }),
        ],
      },

      // ── Défis (left card) ──
      {
        name: 'Défis (carte gauche)',
        opened: true,
        children: [
          {
            name: 'Fond carte défis',
            canvas: challengeCardBg,
            top: Y_CARDS, left: PAD,
            bottom: Y_CARDS + challengeCardH, right: PAD + challengeCardW,
          },
          {
            name: 'Icône alerte',
            canvas: alertIcon,
            top: Y_CARDS + 30, left: PAD + 30,
            bottom: Y_CARDS + 66, right: PAD + 66,
          },
          textLayer('Label Défis', 'VOS DÉFIS', PAD + 76, Y_CARDS + 36, {
            fontSize: 16, color: C.slate400, weight: 'bold', tracking: 0.15,
          }),
          textLayer('Défi 1', '✕  Prestataires télécoms difficiles à piloter', PAD + 30, Y_CARDS + 100, {
            fontSize: 22, color: C.slate300, weight: 'medium', leading: 30,
          }),
          textLayer('Défi 2', '✕  Hausses de coûts inexpliquées', PAD + 30, Y_CARDS + 160, {
            fontSize: 22, color: C.slate300, weight: 'medium', leading: 30,
          }),
          textLayer('Défi 3', '✕  Incidents récurrents sans suivi', PAD + 30, Y_CARDS + 220, {
            fontSize: 22, color: C.slate300, weight: 'medium', leading: 30,
          }),
          textLayer('Défi 4', '✕  Évolutions sans cap technique', PAD + 30, Y_CARDS + 280, {
            fontSize: 22, color: C.slate300, weight: 'medium', leading: 30,
          }),
        ],
      },

      // ── Bénéfices (right card) ──
      {
        name: 'Bénéfices (carte droite)',
        opened: true,
        children: [
          {
            name: 'Fond carte bénéfices',
            canvas: benefitCardBg,
            top: Y_CARDS, left: PAD + challengeCardW + 40,
            bottom: Y_CARDS + challengeCardH, right: W - PAD,
          },
          {
            name: 'Icône check',
            canvas: checkIcon,
            top: Y_CARDS + 30, left: PAD + challengeCardW + 70,
            bottom: Y_CARDS + 66, right: PAD + challengeCardW + 106,
          },
          textLayer('Label Bénéfices', 'VOS BÉNÉFICES', PAD + challengeCardW + 116, Y_CARDS + 36, {
            fontSize: 16, color: C.opticalBlue, weight: 'bold', tracking: 0.15,
          }),
          textLayer('Bénéfice 1', '✓  Gain de temps immédiat', PAD + challengeCardW + 70, Y_CARDS + 100, {
            fontSize: 22, color: C.slate200, weight: 'medium', leading: 30,
          }),
          textLayer('Bénéfice 2', '✓  Coûts maîtrisés et justifiés', PAD + challengeCardW + 70, Y_CARDS + 160, {
            fontSize: 22, color: C.slate200, weight: 'medium', leading: 30,
          }),
          textLayer('Bénéfice 3', '✓  Décisions claires et éclairées', PAD + challengeCardW + 70, Y_CARDS + 220, {
            fontSize: 22, color: C.slate200, weight: 'medium', leading: 30,
          }),
          textLayer('Bénéfice 4', '✓  Continuité d\'activité assurée', PAD + challengeCardW + 70, Y_CARDS + 280, {
            fontSize: 22, color: C.slate200, weight: 'medium', leading: 30,
          }),
        ],
      },

      // ── Services ──
      {
        name: 'Services',
        opened: true,
        children: [
          {
            name: 'Bordure dégradée services',
            canvas: gradientCanvas(servicesOuterW, servicesOuterH, [
              [0, '#2563EB'], [1, '#7C3AED'],
            ], 'diagonal'),
            top: Y_SERVICES, left: PAD,
            bottom: Y_SERVICES + servicesOuterH, right: W - PAD,
          },
          {
            name: 'Fond intérieur services',
            canvas: servicesInnerBg,
            top: Y_SERVICES + 2, left: PAD + 2,
            bottom: Y_SERVICES + servicesOuterH - 2, right: W - PAD - 2,
          },
          textLayer('Titre services', 'NOTRE EXPERTISE', (W - 200) / 2, Y_SERVICES + 40, {
            fontSize: 20, color: C.white, weight: 'bold', tracking: 0.15,
            justification: 'center',
          }),
          // Services grid (2x3)
          ...(await buildServiceItems(Y_SERVICES + 100, PAD + 40, W - PAD - 40, [
            { icon: clipboardIcon, label: 'Audit & Cadrage' },
            { icon: networkIcon, label: 'Conseil Réseau & Téléphonie' },
            { icon: boltIcon, label: 'Pilotage de projets' },
            { icon: usersIcon, label: 'Coordination prestataires' },
            { icon: chartIcon, label: 'Optimisation & Suivi' },
            { icon: lockIcon, label: 'Sécurité & Résilience' },
          ], serviceIconBg, serviceIconSize)),
        ],
      },

      // ── Contact Footer ──
      {
        name: 'Contact',
        opened: true,
        children: [
          {
            name: 'Fond blanc arrondi',
            canvas: footerBg,
            top: Y_FOOTER, left: PAD,
            bottom: Y_FOOTER + footerH, right: W - PAD,
          },
          textLayer('Titre contact', 'CONTACT & INTERVENTION', PAD + 40, Y_FOOTER + 40, {
            fontSize: 24, color: C.slate900, weight: 'black', tracking: 0.12,
          }),
          {
            name: 'Icône localisation',
            canvas: mapPinIcon,
            top: Y_FOOTER + 80, left: PAD + 40,
            bottom: Y_FOOTER + 116, right: PAD + 76,
          },
          textLayer('Localisation', 'Lyon · Auvergne-Rhône-Alpes · Suisse Romande', PAD + 86, Y_FOOTER + 85, {
            fontSize: 20, color: C.aegisBlue, weight: 'bold',
          }),
          textLayer('Accroche', 'Premier échange offert — sans engagement', PAD + 40, Y_FOOTER + 125, {
            fontSize: 18, color: C.slate400, weight: 'semibold',
          }),
          // Separator
          {
            name: 'Séparateur',
            canvas: solidCanvas(footerW - 80, 2, C.slate200),
            top: Y_FOOTER + 165, left: PAD + 40,
            bottom: Y_FOOTER + 167, right: W - PAD - 40,
          },
          // Contact grid
          {
            name: 'Téléphone',
            opened: true,
            children: [
              textLayer('Label téléphone', 'TÉLÉPHONE', PAD + 40, Y_FOOTER + 190, {
                fontSize: 14, color: C.slate400, weight: 'bold', tracking: 0.1,
              }),
              textLayer('Numéro', '06 52 95 00 10', PAD + 40, Y_FOOTER + 218, {
                fontSize: 26, color: C.slate900, weight: 'black',
              }),
            ],
          },
          {
            name: 'Email',
            opened: true,
            children: [
              textLayer('Label email', 'EMAIL', PAD + 40 + footerW / 3, Y_FOOTER + 190, {
                fontSize: 14, color: C.slate400, weight: 'bold', tracking: 0.1,
              }),
              textLayer('Adresse', 'contact@aegisnetwork.fr', PAD + 40 + footerW / 3, Y_FOOTER + 218, {
                fontSize: 22, color: C.slate900, weight: 'bold',
              }),
            ],
          },
          {
            name: 'Site Web',
            opened: true,
            children: [
              textLayer('Label web', 'SITE WEB', PAD + 40 + (footerW / 3) * 2, Y_FOOTER + 190, {
                fontSize: 14, color: C.slate400, weight: 'bold', tracking: 0.1,
              }),
              textLayer('URL', 'aegisnetwork.fr', PAD + 40 + (footerW / 3) * 2, Y_FOOTER + 218, {
                fontSize: 26, color: C.aegisBlue, weight: 'black',
              }),
            ],
          },
        ],
      },
    ],
  };

  savePsd(path.join(OUT_PSD_DOCS, 'flyer-A5.psd'), psd);

  // ── FLYER A4 (scaled up from A5 layout) ──
  console.log('  Building flyer-A4.psd ...');

  // A4 at 72dpi = 595×842 logical px
  // Scale factor from A5 to A4 ~= 1.414
  const A4_W = 2480;
  const A4_H = 3508;
  const A4_PAD = 170;
  const A4_SCALE = A4_W / W; // ~1.419

  const a4LogoSize = Math.round(logoSize * A4_SCALE);
  const a4Logo = await svgToCanvas(aegisLogoSvg(), a4LogoSize, a4LogoSize);
  const a4AlertIcon = await iconCanvas('alertTriangle', 48, '#64748B');
  const a4CheckIcon = await iconCanvas('checkCircle', 48, '#3B82F6');
  const a4ServiceIconSize = 72;
  const a4ServiceBg = gradientCanvas(a4ServiceIconSize + 16, a4ServiceIconSize + 16, [
    [0, '#2563EB'], [1, '#7C3AED'],
  ], 'diagonal');
  const a4ClipboardIcon = await iconCanvas('clipboard', a4ServiceIconSize, '#FFFFFF');
  const a4NetworkIcon = await iconCanvas('networkGlobe', a4ServiceIconSize, '#FFFFFF');
  const a4BoltIcon = await iconCanvas('bolt', a4ServiceIconSize, '#FFFFFF');
  const a4UsersIcon = await iconCanvas('users', a4ServiceIconSize, '#FFFFFF');
  const a4ChartIcon = await iconCanvas('chart', a4ServiceIconSize, '#FFFFFF');
  const a4LockIcon = await iconCanvas('lock', a4ServiceIconSize, '#FFFFFF');
  const a4PhoneFlyer = await iconCanvas('phone', 48, '#2563EB');
  const a4MailFlyer = await iconCanvas('mail', 48, '#2563EB');
  const a4GlobeFlyer = await iconCanvas('globe', 48, '#2563EB');
  const a4MapPinIcon = await iconCanvas('mapPin', 48, '#2563EB');

  const a4ChallengeCardW = (A4_W - A4_PAD * 2 - 60) / 2;
  const a4ChallengeCardH = 560;
  const a4ChallengeBg = roundedRectCanvas(a4ChallengeCardW, a4ChallengeCardH, 24, C.slate900, 128);
  const a4BenefitBg = roundedRectCanvas(a4ChallengeCardW, a4ChallengeCardH, 24, { r: 23, g: 37, b: 84 }, 50);

  const a4ServicesOuterW = A4_W - A4_PAD * 2;
  const a4ServicesOuterH = 640;
  const a4ServicesInnerBg = roundedRectCanvas(a4ServicesOuterW - 4, a4ServicesOuterH - 4, 18, C.deepBg);

  const a4FooterW = A4_W - A4_PAD * 2;
  const a4FooterH = 440;
  const a4FooterBg = roundedRectCanvas(a4FooterW, a4FooterH, 24, C.white);

  const A4_Y_HEADER = A4_PAD;
  const A4_Y_HERO = A4_PAD + 200;
  const A4_Y_CARDS = A4_Y_HERO + 340;
  const A4_Y_SERVICES = A4_Y_CARDS + a4ChallengeCardH + 80;
  const A4_Y_FOOTER = A4_H - A4_PAD - a4FooterH;

  const a4Psd = {
    width: A4_W,
    height: A4_H,
    children: [
      {
        name: 'Background',
        opened: true,
        children: [
          { name: 'Fond profond #020617', canvas: solidCanvas(A4_W, A4_H, C.deepBg), top: 0, left: 0, bottom: A4_H, right: A4_W },
          { name: 'Lueur bleue', canvas: radialGlowCanvas(A4_W, A4_H, A4_W * 0.8, A4_H * 0.08, A4_W * 0.7, C.aegisBlue, 0.20), top: 0, left: 0, bottom: A4_H, right: A4_W },
          { name: 'Lueur violette', canvas: radialGlowCanvas(A4_W, A4_H, A4_W * 0.2, A4_H * 0.92, A4_W * 0.7, C.deepViolet, 0.15), top: 0, left: 0, bottom: A4_H, right: A4_W },
          { name: 'Motif réseau', canvas: networkPatternCanvas(A4_W, A4_H, 0.03), top: 0, left: 0, bottom: A4_H, right: A4_W },
        ],
      },
      {
        name: 'Header',
        opened: true,
        children: [
          { name: 'Symbole Aegis', canvas: a4Logo, top: A4_Y_HEADER, left: A4_PAD, bottom: A4_Y_HEADER + a4LogoSize, right: A4_PAD + a4LogoSize },
          textLayer('AEGIS NETWORK', 'AEGIS NETWORK', A4_PAD + a4LogoSize + 28, A4_Y_HEADER + 30, {
            fontSize: 56, color: C.white, weight: 'black', tracking: 0.06,
          }),
          textLayer('Baseline', 'CONSEIL & OPTIMISATION IT', A4_PAD + a4LogoSize + 28, A4_Y_HEADER + 96, {
            fontSize: 22, color: C.slate400, weight: 'bold', tracking: 0.25,
          }),
        ],
      },
      {
        name: 'Hero',
        opened: true,
        children: [
          textLayer('Titre principal', 'Reprenez le contrôle de votre', A4_PAD, A4_Y_HERO, {
            fontSize: 80, color: C.white, weight: 'black', tracking: -0.02,
          }),
          textLayer('Titre (accent)', 'infrastructure IT', A4_PAD, A4_Y_HERO + 95, {
            fontSize: 80, color: C.opticalBlue, weight: 'black', tracking: -0.02,
          }),
          textLayer('Sous-titre', 'Conseil, audit et pilotage pour TPE & PME. Ne laissez plus\nla technique freiner votre activité ni peser sur votre budget.', A4_PAD, A4_Y_HERO + 210, {
            fontSize: 30, color: C.slate300, weight: 'medium', leading: 44,
          }),
        ],
      },
      {
        name: 'Défis (carte gauche)',
        opened: true,
        children: [
          { name: 'Fond carte défis', canvas: a4ChallengeBg, top: A4_Y_CARDS, left: A4_PAD, bottom: A4_Y_CARDS + a4ChallengeCardH, right: A4_PAD + a4ChallengeCardW },
          { name: 'Icône alerte', canvas: a4AlertIcon, top: A4_Y_CARDS + 40, left: A4_PAD + 40, bottom: A4_Y_CARDS + 88, right: A4_PAD + 88 },
          textLayer('VOS DÉFIS', 'VOS DÉFIS', A4_PAD + 100, A4_Y_CARDS + 46, { fontSize: 22, color: C.slate400, weight: 'bold', tracking: 0.15 }),
          textLayer('Défi 1', '✕  Prestataires télécoms difficiles à piloter', A4_PAD + 40, A4_Y_CARDS + 130, { fontSize: 26, color: C.slate300, weight: 'medium', leading: 38 }),
          textLayer('Défi 2', '✕  Hausses de coûts inexpliquées', A4_PAD + 40, A4_Y_CARDS + 210, { fontSize: 26, color: C.slate300, weight: 'medium', leading: 38 }),
          textLayer('Défi 3', '✕  Incidents récurrents sans suivi', A4_PAD + 40, A4_Y_CARDS + 290, { fontSize: 26, color: C.slate300, weight: 'medium', leading: 38 }),
          textLayer('Défi 4', '✕  Évolutions sans cap technique', A4_PAD + 40, A4_Y_CARDS + 370, { fontSize: 26, color: C.slate300, weight: 'medium', leading: 38 }),
        ],
      },
      {
        name: 'Bénéfices (carte droite)',
        opened: true,
        children: [
          { name: 'Fond carte bénéfices', canvas: a4BenefitBg, top: A4_Y_CARDS, left: A4_PAD + a4ChallengeCardW + 60, bottom: A4_Y_CARDS + a4ChallengeCardH, right: A4_W - A4_PAD },
          { name: 'Icône check', canvas: a4CheckIcon, top: A4_Y_CARDS + 40, left: A4_PAD + a4ChallengeCardW + 100, bottom: A4_Y_CARDS + 88, right: A4_PAD + a4ChallengeCardW + 148 },
          textLayer('VOS BÉNÉFICES', 'VOS BÉNÉFICES', A4_PAD + a4ChallengeCardW + 160, A4_Y_CARDS + 46, { fontSize: 22, color: C.opticalBlue, weight: 'bold', tracking: 0.15 }),
          textLayer('Bénéfice 1', '✓  Gain de temps immédiat', A4_PAD + a4ChallengeCardW + 100, A4_Y_CARDS + 130, { fontSize: 26, color: C.slate200, weight: 'medium', leading: 38 }),
          textLayer('Bénéfice 2', '✓  Coûts maîtrisés et justifiés', A4_PAD + a4ChallengeCardW + 100, A4_Y_CARDS + 210, { fontSize: 26, color: C.slate200, weight: 'medium', leading: 38 }),
          textLayer('Bénéfice 3', '✓  Décisions claires et éclairées', A4_PAD + a4ChallengeCardW + 100, A4_Y_CARDS + 290, { fontSize: 26, color: C.slate200, weight: 'medium', leading: 38 }),
          textLayer('Bénéfice 4', '✓  Continuité d\'activité assurée', A4_PAD + a4ChallengeCardW + 100, A4_Y_CARDS + 370, { fontSize: 26, color: C.slate200, weight: 'medium', leading: 38 }),
        ],
      },
      {
        name: 'Services',
        opened: true,
        children: [
          { name: 'Bordure dégradée', canvas: gradientCanvas(a4ServicesOuterW, a4ServicesOuterH, [[0, '#2563EB'], [1, '#7C3AED']], 'diagonal'), top: A4_Y_SERVICES, left: A4_PAD, bottom: A4_Y_SERVICES + a4ServicesOuterH, right: A4_W - A4_PAD },
          { name: 'Fond intérieur', canvas: a4ServicesInnerBg, top: A4_Y_SERVICES + 2, left: A4_PAD + 2, bottom: A4_Y_SERVICES + a4ServicesOuterH - 2, right: A4_W - A4_PAD - 2 },
          textLayer('Titre services', 'NOTRE EXPERTISE', (A4_W - 200) / 2, A4_Y_SERVICES + 50, { fontSize: 24, color: C.white, weight: 'bold', tracking: 0.15, justification: 'center' }),
          ...(await buildServiceItems(A4_Y_SERVICES + 120, A4_PAD + 50, A4_W - A4_PAD - 50, [
            { icon: a4ClipboardIcon, label: 'Audit & Cadrage' },
            { icon: a4NetworkIcon, label: 'Conseil Réseau & Téléphonie' },
            { icon: a4BoltIcon, label: 'Pilotage de projets' },
            { icon: a4UsersIcon, label: 'Coordination prestataires' },
            { icon: a4ChartIcon, label: 'Optimisation & Suivi' },
            { icon: a4LockIcon, label: 'Sécurité & Résilience' },
          ], a4ServiceBg, a4ServiceIconSize)),
        ],
      },
      {
        name: 'Contact',
        opened: true,
        children: [
          { name: 'Fond blanc arrondi', canvas: a4FooterBg, top: A4_Y_FOOTER, left: A4_PAD, bottom: A4_Y_FOOTER + a4FooterH, right: A4_W - A4_PAD },
          textLayer('Titre contact', 'CONTACT & INTERVENTION', A4_PAD + 50, A4_Y_FOOTER + 50, { fontSize: 30, color: C.slate900, weight: 'black', tracking: 0.12 }),
          { name: 'Icône localisation', canvas: a4MapPinIcon, top: A4_Y_FOOTER + 100, left: A4_PAD + 50, bottom: A4_Y_FOOTER + 148, right: A4_PAD + 98 },
          textLayer('Localisation', 'Lyon · Auvergne-Rhône-Alpes · Suisse Romande', A4_PAD + 110, A4_Y_FOOTER + 108, { fontSize: 24, color: C.aegisBlue, weight: 'bold' }),
          textLayer('Accroche', 'Premier échange offert — sans engagement', A4_PAD + 50, A4_Y_FOOTER + 155, { fontSize: 22, color: C.slate400, weight: 'semibold' }),
          { name: 'Séparateur', canvas: solidCanvas(a4FooterW - 100, 2, C.slate200), top: A4_Y_FOOTER + 200, left: A4_PAD + 50, bottom: A4_Y_FOOTER + 202, right: A4_W - A4_PAD - 50 },
          {
            name: 'Téléphone', opened: true,
            children: [
              textLayer('Label téléphone', 'TÉLÉPHONE', A4_PAD + 50, A4_Y_FOOTER + 230, { fontSize: 16, color: C.slate400, weight: 'bold', tracking: 0.1 }),
              textLayer('Numéro', '06 52 95 00 10', A4_PAD + 50, A4_Y_FOOTER + 260, { fontSize: 32, color: C.slate900, weight: 'black' }),
            ],
          },
          {
            name: 'Email', opened: true,
            children: [
              textLayer('Label email', 'EMAIL', A4_PAD + 50 + a4FooterW / 3, A4_Y_FOOTER + 230, { fontSize: 16, color: C.slate400, weight: 'bold', tracking: 0.1 }),
              textLayer('Adresse', 'contact@aegisnetwork.fr', A4_PAD + 50 + a4FooterW / 3, A4_Y_FOOTER + 260, { fontSize: 26, color: C.slate900, weight: 'bold' }),
            ],
          },
          {
            name: 'Site Web', opened: true,
            children: [
              textLayer('Label web', 'SITE WEB', A4_PAD + 50 + (a4FooterW / 3) * 2, A4_Y_FOOTER + 230, { fontSize: 16, color: C.slate400, weight: 'bold', tracking: 0.1 }),
              textLayer('URL', 'aegisnetwork.fr', A4_PAD + 50 + (a4FooterW / 3) * 2, A4_Y_FOOTER + 260, { fontSize: 32, color: C.aegisBlue, weight: 'black' }),
            ],
          },
        ],
      },
    ],
  };

  savePsd(path.join(OUT_PSD_DOCS, 'flyer-A4.psd'), a4Psd);
}

/** Helper to build service item layers for the flyer */
async function buildServiceItems(startY, startX, endX, services, bgCanvas, iconSize) {
  const cols = 2;
  const colW = (endX - startX) / cols;
  const rowH = 120;
  const layers = [];

  for (let i = 0; i < services.length; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = startX + col * colW;
    const y = startY + row * rowH;

    // Icon background
    layers.push({
      name: `Fond icône - ${services[i].label}`,
      canvas: bgCanvas,
      top: y, left: x,
      bottom: y + iconSize + 16, right: x + iconSize + 16,
    });
    // Icon
    layers.push({
      name: `Icône - ${services[i].label}`,
      canvas: services[i].icon,
      top: y + 8, left: x + 8,
      bottom: y + 8 + iconSize, right: x + 8 + iconSize,
    });
    // Label
    layers.push(textLayer(services[i].label, services[i].label, x + iconSize + 30, y + 20, {
      fontSize: 22, color: C.slate200, weight: 'semibold',
    }));
  }

  return layers;
}

// ─── 5. BROCHURE PSD ─────────────────────────────────────────────────
async function buildBrochurePSD() {
  console.log('\n━━━ BROCHURE PSD ━━━\n');

  // A4 at 300dpi = 2480×3508px
  const W = 2480;
  const H = 3508;
  const PAD = 140;

  const logoSize = 120;

  const logoCanvas = await svgToCanvas(aegisLogoSvg(), logoSize, logoSize);
  const clipboardIcon = await iconCanvas('clipboard', 48, '#FFFFFF');
  const networkIcon = await iconCanvas('networkGlobe', 48, '#FFFFFF');
  const boltIcon = await iconCanvas('bolt', 48, '#FFFFFF');
  const usersIcon = await iconCanvas('users', 48, '#FFFFFF');
  const chartIcon = await iconCanvas('chart', 48, '#FFFFFF');
  const lockIcon = await iconCanvas('lock', 48, '#FFFFFF');
  const phoneIcon = await iconCanvas('phone', 36, '#94A3B8');
  const mailIcon = await iconCanvas('mail', 36, '#94A3B8');
  const globeIcon = await iconCanvas('globe', 36, '#94A3B8');
  const mapPinIcon = await iconCanvas('mapPin', 36, '#94A3B8');

  // ── PAGE 1 : Impact & Bénéfices ──
  console.log('  Building brochure-page1.psd ...');

  const statCardW = 480;
  const statCardH = 200;

  savePsd(path.join(OUT_PSD_DOCS, 'brochure-page1.psd'), {
    width: W, height: H,
    children: [
      {
        name: 'Background',
        opened: true,
        children: [
          {
            name: 'Fond #020617',
            canvas: solidCanvas(W, H, C.deepBg),
            top: 0, left: 0, bottom: H, right: W,
          },
          {
            name: 'Lueur bleue',
            canvas: radialGlowCanvas(W, H, W * 0.2, H * 0.15, W * 0.6, C.opticalBlue, 0.12),
            top: 0, left: 0, bottom: H, right: W,
          },
          {
            name: 'Lueur violette',
            canvas: radialGlowCanvas(W, H, W * 0.8, H * 0.85, W * 0.5, C.deepViolet, 0.08),
            top: 0, left: 0, bottom: H, right: W,
          },
          {
            name: 'Grille décorative',
            canvas: networkPatternCanvas(W, H, 0.015),
            top: 0, left: 0, bottom: H, right: W,
          },
        ],
      },
      // Accent bar top
      {
        name: 'Barre dégradée haut',
        canvas: horizontalGradientBar(W, 16),
        top: 0, left: 0, bottom: 16, right: W,
      },
      // Header
      {
        name: 'Header',
        opened: true,
        children: [
          {
            name: 'Fond logo (carré dégradé)',
            canvas: gradientCanvas(120, 120, [[0, '#3B82F6'], [1, '#7C3AED']], 'diagonal'),
            top: PAD, left: PAD,
            bottom: PAD + 120, right: PAD + 120,
          },
          {
            name: 'Symbole Aegis',
            canvas: await svgToCanvas(aegisLogoCleanSvg('#FFFFFF'), 70, 70),
            top: PAD + 25, left: PAD + 25,
            bottom: PAD + 95, right: PAD + 95,
          },
          textLayer('AEGIS NETWORK', 'AEGIS NETWORK', PAD + 145, PAD + 24, {
            fontSize: 38, color: C.white, weight: 'black', tracking: 0.06,
          }),
          textLayer('Baseline', 'CONSEIL & OPTIMISATION IT', PAD + 145, PAD + 72, {
            fontSize: 16, color: C.slate400, weight: 'semibold', tracking: 0.25,
          }),
        ],
      },
      // Headline
      {
        name: 'Headline',
        opened: true,
        children: [
          textLayer('Titre line 1', 'Reprenez le contrôle', PAD, PAD + 300, {
            fontSize: 72, color: C.white, weight: 'black', tracking: -0.03,
          }),
          textLayer('Titre line 2 (accent)', 'de votre IT.', PAD, PAD + 388, {
            fontSize: 72, color: C.opticalBlue, weight: 'black', tracking: -0.03,
          }),
          textLayer('Sous-titre', 'Audit, conseil et pilotage pour dirigeants\nde TPE/PME qui veulent optimiser sans subir.', PAD, PAD + 500, {
            fontSize: 28, color: C.slate300, weight: 'medium', leading: 42,
          }),
        ],
      },
      // Stats cards
      {
        name: 'Statistiques',
        opened: true,
        children: [
          // Card 1
          {
            name: 'Fond stat 1',
            canvas: roundedRectCanvas(statCardW, statCardH, 16, C.slate900, 128),
            top: PAD + 650, left: PAD,
            bottom: PAD + 650 + statCardH, right: PAD + statCardW,
          },
          textLayer('Stat 1 chiffre', '3 à 5 h', PAD + 30, PAD + 680, {
            fontSize: 48, color: C.white, weight: 'black',
          }),
          textLayer('Stat 1 label', 'perdues par semaine\nen gestion IT subie', PAD + 30, PAD + 740, {
            fontSize: 18, color: C.slate400, weight: 'medium', leading: 26,
          }),
          // Card 2
          {
            name: 'Fond stat 2',
            canvas: roundedRectCanvas(statCardW, statCardH, 16, C.slate900, 128),
            top: PAD + 650, left: PAD + statCardW + 40,
            bottom: PAD + 650 + statCardH, right: PAD + statCardW * 2 + 40,
          },
          textLayer('Stat 2 chiffre', '15 à 30 %', PAD + statCardW + 70, PAD + 680, {
            fontSize: 48, color: C.opticalBlue, weight: 'black',
          }),
          textLayer('Stat 2 label', 'd\'écart moyen entre offres\ndu même opérateur', PAD + statCardW + 70, PAD + 740, {
            fontSize: 18, color: C.slate400, weight: 'medium', leading: 26,
          }),
          // Card 3
          {
            name: 'Fond stat 3',
            canvas: roundedRectCanvas(statCardW, statCardH, 16, C.slate900, 128),
            top: PAD + 650, left: PAD + (statCardW + 40) * 2,
            bottom: PAD + 650 + statCardH, right: PAD + statCardW * 3 + 80,
          },
          textLayer('Stat 3 chiffre', '67 %', PAD + (statCardW + 40) * 2 + 30, PAD + 680, {
            fontSize: 48, color: C.deepViolet, weight: 'black',
          }),
          textLayer('Stat 3 label', 'des PME n\'ont pas de\nstratégie IT formalisée', PAD + (statCardW + 40) * 2 + 30, PAD + 740, {
            fontSize: 18, color: C.slate400, weight: 'medium', leading: 26,
          }),
        ],
      },
      // Process steps
      {
        name: 'Processus',
        opened: true,
        children: [
          textLayer('Titre processus', 'NOTRE APPROCHE', PAD, PAD + 950, {
            fontSize: 20, color: C.opticalBlue, weight: 'bold', tracking: 0.15,
          }),
          // Step group
          ...[
            { num: '01', title: 'Diagnostic', desc: 'Analyse de votre infrastructure, contrats, usages et irritants.' },
            { num: '02', title: 'Recommandation', desc: 'Plan d\'action chiffré avec gains estimés et priorités.' },
            { num: '03', title: 'Pilotage', desc: 'Mise en œuvre, coordination prestataires et suivi qualité.' },
            { num: '04', title: 'Suivi continu', desc: 'Évolution maîtrisée, réactivité garantie, reporting régulier.' },
          ].flatMap((step, i) => {
            const stepY = PAD + 1040 + i * 200;
            return [
              textLayer(`Étape ${step.num}`, step.num, PAD, stepY, {
                fontSize: 42, color: C.opticalBlue, weight: 'black',
              }),
              textLayer(`Titre ${step.num}`, step.title, PAD + 120, stepY, {
                fontSize: 28, color: C.white, weight: 'bold',
              }),
              textLayer(`Desc ${step.num}`, step.desc, PAD + 120, stepY + 40, {
                fontSize: 20, color: C.slate400, weight: 'medium',
              }),
            ];
          }),
        ],
      },
      // Services
      {
        name: 'Services',
        opened: true,
        children: [
          textLayer('Titre services', 'NOS DOMAINES D\'EXPERTISE', PAD, PAD + 1900, {
            fontSize: 20, color: C.opticalBlue, weight: 'bold', tracking: 0.15,
          }),
          ...[
            { icon: clipboardIcon,  label: 'Audit & Cadrage' },
            { icon: networkIcon,    label: 'Conseil Réseau & Téléphonie' },
            { icon: boltIcon,       label: 'Pilotage de projets' },
            { icon: usersIcon,      label: 'Coordination prestataires' },
            { icon: chartIcon,      label: 'Optimisation & Suivi' },
            { icon: lockIcon,       label: 'Sécurité & Résilience' },
          ].flatMap((svc, i) => {
            const col = i % 3;
            const row = Math.floor(i / 3);
            const colW = (W - PAD * 2) / 3;
            const x = PAD + col * colW;
            const y = PAD + 1980 + row * 160;
            return [
              {
                name: `Fond icône - ${svc.label}`,
                canvas: gradientCanvas(60, 60, [[0, '#2563EB'], [1, '#7C3AED']], 'diagonal'),
                top: y, left: x, bottom: y + 60, right: x + 60,
              },
              {
                name: `Icône - ${svc.label}`,
                canvas: svc.icon,
                top: y + 6, left: x + 6, bottom: y + 54, right: x + 54,
              },
              textLayer(svc.label, svc.label, x + 76, y + 16, {
                fontSize: 22, color: C.slate200, weight: 'semibold',
              }),
            ];
          }),
        ],
      },
      // Contact section
      {
        name: 'Contact',
        opened: true,
        children: [
          {
            name: 'Fond contact sombre',
            canvas: roundedRectCanvas(W - PAD * 2, 380, 24, C.slate900, 200),
            top: H - PAD - 400, left: PAD,
            bottom: H - PAD - 20, right: W - PAD,
          },
          textLayer('Titre contact', 'Parlons de votre infrastructure.', PAD + 60, H - PAD - 360, {
            fontSize: 36, color: C.white, weight: 'black',
          }),
          textLayer('Accroche', 'Premier échange gratuit et sans engagement.', PAD + 60, H - PAD - 310, {
            fontSize: 22, color: C.slate400, weight: 'medium',
          }),
          {
            name: 'Icône téléphone',
            canvas: phoneIcon,
            top: H - PAD - 250, left: PAD + 60,
            bottom: H - PAD - 214, right: PAD + 96,
          },
          textLayer('Téléphone', '06 52 95 00 10', PAD + 110, H - PAD - 246, {
            fontSize: 24, color: C.slate200, weight: 'bold',
          }),
          {
            name: 'Icône email',
            canvas: mailIcon,
            top: H - PAD - 200, left: PAD + 60,
            bottom: H - PAD - 164, right: PAD + 96,
          },
          textLayer('Email', 'contact@aegisnetwork.fr', PAD + 110, H - PAD - 196, {
            fontSize: 24, color: C.opticalBlue, weight: 'bold',
          }),
          {
            name: 'Icône web',
            canvas: globeIcon,
            top: H - PAD - 150, left: PAD + 60,
            bottom: H - PAD - 114, right: PAD + 96,
          },
          textLayer('Web', 'aegisnetwork.fr', PAD + 110, H - PAD - 146, {
            fontSize: 24, color: C.opticalBlue, weight: 'bold',
          }),
          {
            name: 'Icône lieu',
            canvas: mapPinIcon,
            top: H - PAD - 100, left: PAD + 60,
            bottom: H - PAD - 64, right: PAD + 96,
          },
          textLayer('Lieu', 'Lyon · Auvergne-Rhône-Alpes', PAD + 110, H - PAD - 96, {
            fontSize: 24, color: C.slate400, weight: 'medium',
          }),
        ],
      },
    ],
  });

  // ── PAGE 2 : Méthodologie & Cas pratiques ──
  console.log('  Building brochure-page2.psd ...');

  const caseCardW = (W - PAD * 2 - 40) / 2;
  const caseCardH = 480;
  const caseBg1 = roundedRectCanvas(caseCardW, caseCardH, 20, C.slate900, 160);
  const caseBg2 = roundedRectCanvas(caseCardW, caseCardH, 20, C.slate900, 160);
  const methodCardW = (W - PAD * 2 - 80) / 3;
  const methodCardH = 400;

  const arrowRightIcon = await iconCanvas('arrowRight', 36, '#3B82F6');
  const shieldCheckIcon = await iconCanvas('shieldCheck', 48, '#3B82F6');
  const trendingUpIcon = await iconCanvas('trendingUp', 48, '#7C3AED');

  const Y_METHOD = PAD + 200;
  const Y_CASES = Y_METHOD + 580;
  const Y_GUARANTEE = Y_CASES + caseCardH + 120;
  const Y_CTA = H - PAD - 520;

  savePsd(path.join(OUT_PSD_DOCS, 'brochure-page2.psd'), {
    width: W, height: H,
    children: [
      {
        name: 'Background',
        opened: true,
        children: [
          { name: 'Fond #020617', canvas: solidCanvas(W, H, C.deepBg), top: 0, left: 0, bottom: H, right: W },
          { name: 'Lueur violette haut', canvas: radialGlowCanvas(W, H, W * 0.7, H * 0.1, W * 0.5, C.deepViolet, 0.10), top: 0, left: 0, bottom: H, right: W },
          { name: 'Lueur bleue bas', canvas: radialGlowCanvas(W, H, W * 0.3, H * 0.8, W * 0.6, C.opticalBlue, 0.08), top: 0, left: 0, bottom: H, right: W },
          { name: 'Grille décorative', canvas: networkPatternCanvas(W, H, 0.015), top: 0, left: 0, bottom: H, right: W },
        ],
      },
      // Accent bar top
      { name: 'Barre dégradée haut', canvas: horizontalGradientBar(W, 16), top: 0, left: 0, bottom: 16, right: W },
      // Header (same as page 1)
      {
        name: 'Header',
        opened: true,
        children: [
          { name: 'Fond logo', canvas: gradientCanvas(120, 120, [[0, '#3B82F6'], [1, '#7C3AED']], 'diagonal'), top: PAD, left: PAD, bottom: PAD + 120, right: PAD + 120 },
          { name: 'Symbole Aegis', canvas: await svgToCanvas(aegisLogoCleanSvg('#FFFFFF'), 70, 70), top: PAD + 25, left: PAD + 25, bottom: PAD + 95, right: PAD + 95 },
          textLayer('AEGIS NETWORK', 'AEGIS NETWORK', PAD + 145, PAD + 24, { fontSize: 38, color: C.white, weight: 'black', tracking: 0.06 }),
          textLayer('Baseline', 'CONSEIL & OPTIMISATION IT', PAD + 145, PAD + 72, { fontSize: 16, color: C.slate400, weight: 'semibold', tracking: 0.25 }),
        ],
      },
      // Methodology section
      {
        name: 'Méthodologie',
        opened: true,
        children: [
          textLayer('Surtitre méthodo', 'COMMENT ÇA MARCHE', PAD, Y_METHOD, { fontSize: 20, color: C.opticalBlue, weight: 'bold', tracking: 0.15 }),
          textLayer('Titre méthodo', 'Une méthode éprouvée\nen 3 étapes', PAD, Y_METHOD + 40, { fontSize: 52, color: C.white, weight: 'black', tracking: -0.02, leading: 62 }),
          // Step cards
          ...[
            { num: '1', title: 'Diagnostic', desc: 'Nous auditons vos contrats,\nvos usages et vos irritants.\nVous recevez un état des lieux\nobjectif et chiffré.', color: '#3B82F6' },
            { num: '2', title: 'Plan d\'action', desc: 'Nous proposons des\noptimisations concrètes :\nrenégociations, migrations,\nréorganisation.', color: '#6366F1' },
            { num: '3', title: 'Pilotage', desc: 'Nous coordonnons la mise\nen œuvre, suivons les\nprestataires et mesurons\nles résultats.', color: '#7C3AED' },
          ].flatMap((step, i) => {
            const x = PAD + i * (methodCardW + 40);
            const y = Y_METHOD + 180;
            return [
              { name: `Fond étape ${step.num}`, canvas: roundedRectCanvas(methodCardW, methodCardH, 20, C.slate900, 160), top: y, left: x, bottom: y + methodCardH, right: x + methodCardW },
              { name: `Bordure accent ${step.num}`, canvas: solidCanvas(methodCardW, 4, hexToRgb(step.color)), top: y, left: x, bottom: y + 4, right: x + methodCardW },
              textLayer(`Numéro ${step.num}`, step.num, x + 30, y + 30, { fontSize: 56, color: hexToRgb(step.color), weight: 'black' }),
              textLayer(`Titre étape ${step.num}`, step.title, x + 30, y + 100, { fontSize: 28, color: C.white, weight: 'bold' }),
              textLayer(`Desc étape ${step.num}`, step.desc, x + 30, y + 150, { fontSize: 18, color: C.slate400, weight: 'medium', leading: 28 }),
            ];
          }),
          // Arrow connectors between cards
          { name: 'Flèche 1→2', canvas: arrowRightIcon, top: Y_METHOD + 180 + methodCardH / 2 - 18, left: PAD + methodCardW + 2, bottom: Y_METHOD + 180 + methodCardH / 2 + 18, right: PAD + methodCardW + 38 },
          { name: 'Flèche 2→3', canvas: arrowRightIcon, top: Y_METHOD + 180 + methodCardH / 2 - 18, left: PAD + methodCardW * 2 + 42, bottom: Y_METHOD + 180 + methodCardH / 2 + 18, right: PAD + methodCardW * 2 + 78 },
        ],
      },
      // Case studies
      {
        name: 'Cas concrets',
        opened: true,
        children: [
          textLayer('Surtitre cas', 'RÉSULTATS CONCRETS', PAD, Y_CASES - 60, { fontSize: 20, color: C.opticalBlue, weight: 'bold', tracking: 0.15 }),
          // Case 1
          { name: 'Fond cas 1', canvas: caseBg1, top: Y_CASES, left: PAD, bottom: Y_CASES + caseCardH, right: PAD + caseCardW },
          textLayer('Cas 1 type', 'PME — 45 postes', PAD + 40, Y_CASES + 30, { fontSize: 16, color: C.opticalBlue, weight: 'bold', tracking: 0.1 }),
          textLayer('Cas 1 titre', 'Migration téléphonie', PAD + 40, Y_CASES + 65, { fontSize: 30, color: C.white, weight: 'black' }),
          textLayer('Cas 1 detail', 'Audit des 3 lignes existantes, mise en\nconcurrence de 5 opérateurs, migration\nvers solution unifiée UCaaS.\n\nDurée : 6 semaines\nÉconomie annuelle : 18 000 €\nSatisfaction équipe : +40 %', PAD + 40, Y_CASES + 120, { fontSize: 18, color: C.slate300, weight: 'medium', leading: 28 }),
          // Case 2
          { name: 'Fond cas 2', canvas: caseBg2, top: Y_CASES, left: PAD + caseCardW + 40, bottom: Y_CASES + caseCardH, right: W - PAD },
          textLayer('Cas 2 type', 'TPE — 12 postes', PAD + caseCardW + 80, Y_CASES + 30, { fontSize: 16, color: C.deepViolet, weight: 'bold', tracking: 0.1 }),
          textLayer('Cas 2 titre', 'Optimisation contrats IT', PAD + caseCardW + 80, Y_CASES + 65, { fontSize: 30, color: C.white, weight: 'black' }),
          textLayer('Cas 2 detail', 'Renégociation fibre + mobile + support.\nConsolidation des interlocuteurs.\nMise en place d\'un suivi trimestriel.\n\nDurée : 3 semaines\nÉconomie annuelle : 7 200 €\nTemps libéré : 4 h/semaine', PAD + caseCardW + 80, Y_CASES + 120, { fontSize: 18, color: C.slate300, weight: 'medium', leading: 28 }),
        ],
      },
      // Guarantee / Trust section
      {
        name: 'Engagements',
        opened: true,
        children: [
          { name: 'Fond engagements', canvas: roundedRectCanvas(W - PAD * 2, 280, 24, { r: 23, g: 37, b: 84 }, 50), top: Y_GUARANTEE, left: PAD, bottom: Y_GUARANTEE + 280, right: W - PAD },
          { name: 'Icône bouclier', canvas: shieldCheckIcon, top: Y_GUARANTEE + 40, left: PAD + 50, bottom: Y_GUARANTEE + 88, right: PAD + 98 },
          textLayer('Titre engagements', 'Nos engagements', PAD + 120, Y_GUARANTEE + 46, { fontSize: 32, color: C.white, weight: 'black' }),
          textLayer('Engagement 1', '✓  Indépendance totale — aucun lien commercial avec les opérateurs', PAD + 50, Y_GUARANTEE + 120, { fontSize: 20, color: C.slate200, weight: 'medium' }),
          textLayer('Engagement 2', '✓  Transparence — chaque recommandation est chiffrée et justifiée', PAD + 50, Y_GUARANTEE + 160, { fontSize: 20, color: C.slate200, weight: 'medium' }),
          textLayer('Engagement 3', '✓  Résultat — premier diagnostic gratuit pour prouver la valeur', PAD + 50, Y_GUARANTEE + 200, { fontSize: 20, color: C.slate200, weight: 'medium' }),
        ],
      },
      // CTA section
      {
        name: 'CTA Final',
        opened: true,
        children: [
          { name: 'Fond CTA dégradé', canvas: gradientCanvas(W - PAD * 2, 440, [[0, '#1E3A8A'], [0.5, '#312E81'], [1, '#1E3A8A']], 'diagonal'), top: Y_CTA, left: PAD, bottom: Y_CTA + 440, right: W - PAD },
          { name: 'Icône trending', canvas: trendingUpIcon, top: Y_CTA + 50, left: (W - 48) / 2, bottom: Y_CTA + 98, right: (W + 48) / 2 },
          textLayer('CTA titre', 'Prêt à optimiser votre IT ?', (W - 500) / 2, Y_CTA + 120, { fontSize: 42, color: C.white, weight: 'black', justification: 'center' }),
          textLayer('CTA sous-titre', 'Premier échange gratuit et sans engagement.\nParlons de vos enjeux concrets.', (W - 600) / 2, Y_CTA + 180, { fontSize: 22, color: C.slate300, weight: 'medium', justification: 'center', leading: 34 }),
          // Contact info
          { name: 'Icône téléphone', canvas: phoneIcon, top: Y_CTA + 280, left: PAD + 120, bottom: Y_CTA + 316, right: PAD + 156 },
          textLayer('Téléphone CTA', '06 52 95 00 10', PAD + 170, Y_CTA + 284, { fontSize: 24, color: C.white, weight: 'bold' }),
          { name: 'Icône email', canvas: mailIcon, top: Y_CTA + 280, left: W / 2 - 80, bottom: Y_CTA + 316, right: W / 2 - 44 },
          textLayer('Email CTA', 'contact@aegisnetwork.fr', W / 2 - 30, Y_CTA + 284, { fontSize: 24, color: C.opticalBlue, weight: 'bold' }),
          { name: 'Icône globe', canvas: globeIcon, top: Y_CTA + 280, left: W - PAD - 380, bottom: Y_CTA + 316, right: W - PAD - 344 },
          textLayer('Web CTA', 'aegisnetwork.fr', W - PAD - 330, Y_CTA + 284, { fontSize: 24, color: C.opticalBlue, weight: 'bold' }),
          // Footer note
          textLayer('Copyright', '© 2025 Aegis Network — Tous droits réservés.', (W - 500) / 2, Y_CTA + 380, { fontSize: 16, color: C.slate500, weight: 'medium', justification: 'center' }),
        ],
      },
    ],
  });
}

// ═══════════════════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════════════════
async function main() {
  console.log('╔══════════════════════════════════════════════════════╗');
  console.log('║  AEGIS NETWORK — Professional PSD Builder (ag-psd)  ║');
  console.log('╚══════════════════════════════════════════════════════╝\n');

  ensureDir(OUT_PSD_LOGOS);
  ensureDir(OUT_PSD_DOCS);

  const results = {
    logos: false,
    businessCard: false,
    emailSignature: false,
    flyerA5: false,
    flyerA4: false,
    brochurePage1: false,
    brochurePage2: false,
  };

  try {
    await buildLogoPSDs();
    results.logos = true;
  } catch (e) {
    console.error('  ERR logos:', e.message, e.stack);
  }

  try {
    await buildBusinessCardPSD();
    results.businessCard = true;
  } catch (e) {
    console.error('  ERR business card:', e.message, e.stack);
  }

  try {
    await buildEmailSignaturePSD();
    results.emailSignature = true;
  } catch (e) {
    console.error('  ERR email signature:', e.message, e.stack);
  }

  try {
    await buildFlyerPSD();
    results.flyerA5 = true;
    results.flyerA4 = true;
  } catch (e) {
    console.error('  ERR flyer:', e.message, e.stack);
  }

  try {
    await buildBrochurePSD();
    results.brochurePage1 = true;
    results.brochurePage2 = true;
  } catch (e) {
    console.error('  ERR brochure:', e.message, e.stack);
  }

  // Summary
  console.log('\n╔══════════════════════════════════════════════════════╗');
  console.log('║  RÉSUMÉ DE CONSTRUCTION                              ║');
  console.log('╠══════════════════════════════════════════════════════╣');
  for (const [key, ok] of Object.entries(results)) {
    console.log(`║  ${ok ? '✓' : '✗'} ${key.padEnd(20)}`);
  }
  console.log('╠══════════════════════════════════════════════════════╣');
  console.log(`║  Output: ${OUT_PSD}`);
  console.log('╚══════════════════════════════════════════════════════╝');
}

main().catch(e => {
  console.error('FATAL:', e);
  process.exit(1);
});
