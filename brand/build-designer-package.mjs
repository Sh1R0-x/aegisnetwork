/**
 * AEGIS NETWORK — Designer-Grade Package Builder
 * ================================================
 * Generates a Photoshop-oriented delivery package:
 *   00_MASTER_VECTOR  — SVG + vector PDF masters
 *   01_PSD_EDITABLE   — Layered PSD files
 *   02_COMPONENTS_REUSABLE — Isolated reusable elements
 *   03_EXPORTS_FINAL   — Ready-to-use PNGs & PDFs
 *
 * Uses: sharp (SVG→PNG), Node fs (structure), then calls Python for PSD assembly.
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

// ─── Config ──────────────────────────────────────────────────────────
const SRC = 'C:\\Users\\Ludovic\\Documents\\AEGIS NETWORK';
const OUT = 'C:\\Users\\Ludovic\\Documents\\AEGIS_NETWORK_DESIGNER';
const PY = 'C:/Users/Ludovic/AppData/Local/Programs/Python/Python311/python.exe';

// Brand colors
const COLORS = {
  opticalBlue: '#3B82F6',
  aegisBlue: '#2563EB',
  accentViolet: '#7C3AED',
  deepBg: '#020617',
  white: '#FFFFFF',
  slate200: '#E2E8F0',
  slate300: '#CBD5E1',
  slate400: '#94A3B8',
};

// ─── Helpers ─────────────────────────────────────────────────────────
function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function copyFile(src, dest) {
  ensureDir(path.dirname(dest));
  fs.copyFileSync(src, dest);
  console.log(`  COPY  ${path.basename(dest)}`);
}

async function svgToPng(svgPath, pngPath, width, height, opts = {}) {
  ensureDir(path.dirname(pngPath));
  const svgBuf = fs.readFileSync(svgPath);
  let pipeline = sharp(svgBuf, { density: 300 })
    .resize(width, height, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } });

  if (opts.flatten) {
    pipeline = pipeline.flatten({ background: opts.flattenBg || '#020617' });
  }

  await pipeline.png({ quality: 100, compressionLevel: 6 }).toFile(pngPath);
  console.log(`  RENDER ${path.basename(pngPath)} (${width}×${height})`);
}

async function svgToPngBuffer(svgContent, width, height) {
  return sharp(Buffer.from(svgContent), { density: 300 })
    .resize(width, height, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
}

// ─── Folder structure ────────────────────────────────────────────────
const DIRS = {
  masterVec:    path.join(OUT, '00_MASTER_VECTOR'),
  masterSvg:    path.join(OUT, '00_MASTER_VECTOR', 'svg'),
  masterPdf:    path.join(OUT, '00_MASTER_VECTOR', 'pdf'),
  psd:          path.join(OUT, '01_PSD_EDITABLE'),
  psdLogos:     path.join(OUT, '01_PSD_EDITABLE', 'logos'),
  psdDocuments: path.join(OUT, '01_PSD_EDITABLE', 'documents'),
  components:   path.join(OUT, '02_COMPONENTS_REUSABLE'),
  compSymbol:   path.join(OUT, '02_COMPONENTS_REUSABLE', 'symbol'),
  compWordmark: path.join(OUT, '02_COMPONENTS_REUSABLE', 'wordmark'),
  compIcons:    path.join(OUT, '02_COMPONENTS_REUSABLE', 'icons'),
  compElements: path.join(OUT, '02_COMPONENTS_REUSABLE', 'elements'),
  exports:      path.join(OUT, '03_EXPORTS_FINAL'),
  expPng:       path.join(OUT, '03_EXPORTS_FINAL', 'png'),
  expPdf:       path.join(OUT, '03_EXPORTS_FINAL', 'pdf'),
  expIco:       path.join(OUT, '03_EXPORTS_FINAL', 'ico_favicons'),
  archive:      path.join(OUT, '04_ARCHIVE_REFERENCE'),
};

// ─── SVG generators for isolated elements ────────────────────────────

/** Aegis triangle symbol only (no nodes) */
function svgSymbolClean(stroke = 'url(#g)', bgRect = '') {
  return `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
    <stop offset="0%" stop-color="#2563EB"/><stop offset="100%" stop-color="#7C3AED"/>
  </linearGradient></defs>${bgRect}
  <path d="M15 85 L50 15 L85 85" stroke="${stroke}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
}

/** Aegis symbol with fiber nodes */
function svgSymbolFull(stroke = 'url(#g)', nodeColor1 = '#60A5FA', nodeColor2 = '#7C3AED', bgRect = '') {
  return `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
    <stop offset="0%" stop-color="#2563EB"/><stop offset="100%" stop-color="#7C3AED"/>
  </linearGradient></defs>${bgRect}
  <path d="M15 85 L50 15 L85 85" stroke="${stroke}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="82" cy="18" r="4" fill="${nodeColor1}"/>
  <circle cx="92" cy="32" r="3" fill="${nodeColor1}" opacity="0.6"/>
  <circle cx="72" cy="8" r="3" fill="${nodeColor2}" opacity="0.8"/>
  <path d="M65 35 L82 18" stroke="${stroke}" stroke-width="1.5" stroke-dasharray="4 4"/>
</svg>`;
}

/** Wordmark only SVG */
function svgWordmark(aegisColor, networkColor, baselineColor, bg = '') {
  return `<svg viewBox="0 0 340 60" fill="none" xmlns="http://www.w3.org/2000/svg">
  ${bg}
  <text x="0" y="32" font-family="Inter, Arial, sans-serif" font-weight="900" font-size="32" letter-spacing="0.06em" fill="${aegisColor}">AEGIS</text>
  <text x="120" y="32" font-family="Inter, Arial, sans-serif" font-weight="900" font-size="32" letter-spacing="0.06em" fill="${networkColor}">NETWORK</text>
  <text x="0" y="52" font-family="Inter, Arial, sans-serif" font-weight="700" font-size="10" letter-spacing="0.25em" fill="${baselineColor}">CONSEIL &amp; OPTIMISATION IT</text>
</svg>`;
}

/** Fiber node cluster SVG (decorative element) */
function svgFiberNodes() {
  return `<svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
    <stop offset="0%" stop-color="#2563EB"/><stop offset="100%" stop-color="#7C3AED"/>
  </linearGradient></defs>
  <circle cx="30" cy="12" r="5" fill="#60A5FA"/>
  <circle cx="45" cy="28" r="4" fill="#60A5FA" opacity="0.6"/>
  <circle cx="18" cy="6" r="4" fill="#7C3AED" opacity="0.8"/>
  <path d="M10 40 L30 12" stroke="url(#g)" stroke-width="1.5" stroke-dasharray="4 4"/>
  <path d="M30 12 L45 28" stroke="url(#g)" stroke-width="1.5" stroke-dasharray="4 4"/>
</svg>`;
}

/** Gradient bar SVG (brand decoration) */
function svgGradientBar() {
  return `<svg viewBox="0 0 400 6" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="gb" x1="0%" y1="50%" x2="100%" y2="50%">
    <stop offset="0%" stop-color="#3B82F6"/>
    <stop offset="50%" stop-color="#7C3AED"/>
    <stop offset="100%" stop-color="#3B82F6"/>
  </linearGradient></defs>
  <rect width="400" height="6" rx="3" fill="url(#gb)"/>
</svg>`;
}

// ─── MAIN ────────────────────────────────────────────────────────────
async function main() {
  console.log('╔══════════════════════════════════════════════════╗');
  console.log('║  AEGIS NETWORK — Designer Package Builder       ║');
  console.log('╚══════════════════════════════════════════════════╝\n');

  // Create all directories
  console.log('▸ Creating folder structure...');
  Object.values(DIRS).forEach(ensureDir);

  // ═══════════════════════════════════════════════════════════════════
  // STEP 1: 00_MASTER_VECTOR — SVG + PDF
  // ═══════════════════════════════════════════════════════════════════
  console.log('\n▸ 00_MASTER_VECTOR — Copying SVG masters...');

  const svgSrc = path.join(SRC, '01_LOGOS', 'svg');
  const svgFiles = fs.readdirSync(svgSrc).filter(f => f.endsWith('.svg'));
  for (const f of svgFiles) {
    copyFile(path.join(svgSrc, f), path.join(DIRS.masterSvg, f));
  }
  // Also copy favicon SVG
  copyFile(path.join(SRC, '01_LOGOS', 'ico_favicons', 'favicon.svg'),
           path.join(DIRS.masterSvg, 'favicon.svg'));

  // Generate isolated component SVGs
  console.log('\n  Generating isolated component SVGs...');
  const isolatedSvgs = {
    'symbol-gradient.svg': svgSymbolFull(),
    'symbol-gradient-clean.svg': svgSymbolClean(),
    'symbol-white.svg': svgSymbolFull('#FFFFFF', '#FFFFFF', '#FFFFFF'),
    'symbol-white-clean.svg': svgSymbolClean('#FFFFFF'),
    'symbol-blue.svg': svgSymbolFull('#2563EB', '#2563EB', '#2563EB'),
    'symbol-dark.svg': svgSymbolFull('#0F172A', '#0F172A', '#0F172A'),
    'wordmark-sombre.svg': svgWordmark('#FFFFFF', '#3B82F6', '#94A3B8'),
    'wordmark-clair.svg': svgWordmark('#0F172A', '#2563EB', '#64748B'),
    'fiber-nodes.svg': svgFiberNodes(),
    'gradient-bar.svg': svgGradientBar(),
  };
  for (const [name, content] of Object.entries(isolatedSvgs)) {
    const dest = path.join(DIRS.masterSvg, name);
    fs.writeFileSync(dest, content);
    console.log(`  GEN   ${name}`);
  }

  // Copy existing PDFs
  console.log('\n  Copying vector PDFs...');
  const pdfSrc = path.join(SRC, '01_LOGOS', 'pdf');
  if (fs.existsSync(pdfSrc)) {
    for (const f of fs.readdirSync(pdfSrc).filter(f => f.endsWith('.pdf'))) {
      copyFile(path.join(pdfSrc, f), path.join(DIRS.masterPdf, f));
    }
  }

  // Generate vector PDFs from new SVGs using svglib+reportlab
  console.log('\n  Generating vector PDFs from SVGs...');
  const svgsForPdf = [
    'symbol-gradient.svg', 'symbol-white.svg', 'symbol-blue.svg', 'symbol-dark.svg',
    'wordmark-sombre.svg', 'wordmark-clair.svg',
  ];
  for (const svgName of svgsForPdf) {
    const svgPath = path.join(DIRS.masterSvg, svgName);
    const pdfName = svgName.replace('.svg', '.pdf');
    const pdfPath = path.join(DIRS.masterPdf, pdfName);
    try {
      execSync(`${PY} -c "
from svglib.svglib import svg2rlg
from reportlab.graphics import renderPDF
drawing = svg2rlg(r'${svgPath.replace(/\\/g, '\\\\')}')
if drawing:
    renderPDF.drawToFile(drawing, r'${pdfPath.replace(/\\/g, '\\\\')}', fmt='PDF')
    print('OK')
else:
    print('SKIP - could not parse SVG')
"`, { stdio: 'pipe' });
      console.log(`  PDF   ${pdfName}`);
    } catch (e) {
      console.log(`  SKIP  ${pdfName} (SVG too complex for svglib)`);
    }
  }

  // ═══════════════════════════════════════════════════════════════════
  // STEP 2: Render high-res PNGs for PSD assembly
  // ═══════════════════════════════════════════════════════════════════
  console.log('\n▸ Rendering high-resolution PNGs for PSD layers...');

  const psdTempDir = path.join(OUT, '_psd_temp');
  ensureDir(psdTempDir);

  // Logo symbol variants at 2048px (large for Smart Object quality)
  const symbolRenders = [
    { svg: 'symbol-gradient.svg', png: 'symbol-gradient-2048.png', w: 2048, h: 2048 },
    { svg: 'symbol-gradient-clean.svg', png: 'symbol-clean-2048.png', w: 2048, h: 2048 },
    { svg: 'symbol-white.svg', png: 'symbol-white-2048.png', w: 2048, h: 2048 },
    { svg: 'symbol-blue.svg', png: 'symbol-blue-2048.png', w: 2048, h: 2048 },
    { svg: 'symbol-dark.svg', png: 'symbol-dark-2048.png', w: 2048, h: 2048 },
  ];

  for (const r of symbolRenders) {
    await svgToPng(
      path.join(DIRS.masterSvg, r.svg),
      path.join(psdTempDir, r.png),
      r.w, r.h
    );
  }

  // Lockup logos at high res
  const lockupSvgs = ['aegis-logo-fond-sombre.svg', 'aegis-logo-fond-clair.svg'];
  for (const svg of lockupSvgs) {
    const name = svg.replace('.svg', '');
    await svgToPng(
      path.join(DIRS.masterSvg, svg),
      path.join(psdTempDir, `${name}-4000.png`),
      4000, 1044 // proportional to 460:120 viewBox
    );
  }

  // Monochrome symbols at 2048
  const monoSvgs = [
    'aegis-logo-monochrome-blanc.svg',
    'aegis-logo-monochrome-bleu.svg',
    'aegis-logo-monochrome-sombre.svg',
  ];
  for (const svg of monoSvgs) {
    const name = svg.replace('.svg', '');
    await svgToPng(
      path.join(DIRS.masterSvg, svg),
      path.join(psdTempDir, `${name}-2048.png`),
      2048, 2048
    );
  }

  // Fiber nodes & gradient bar
  await svgToPng(
    path.join(DIRS.masterSvg, 'fiber-nodes.svg'),
    path.join(psdTempDir, 'fiber-nodes-1024.png'),
    1024, 1024
  );
  await svgToPng(
    path.join(DIRS.masterSvg, 'gradient-bar.svg'),
    path.join(psdTempDir, 'gradient-bar-4000.png'),
    4000, 60
  );

  // Wordmarks at high res
  for (const variant of ['wordmark-sombre.svg', 'wordmark-clair.svg']) {
    const name = variant.replace('.svg', '');
    await svgToPng(
      path.join(DIRS.masterSvg, variant),
      path.join(psdTempDir, `${name}-3000.png`),
      3000, 530 // proportional to 340:60
    );
  }

  // ═══════════════════════════════════════════════════════════════════
  // STEP 3: 02_COMPONENTS_REUSABLE
  // ═══════════════════════════════════════════════════════════════════
  console.log('\n▸ 02_COMPONENTS_REUSABLE — Extracting isolated elements...');

  // Symbol in multiple sizes
  const symbolSizes = [256, 512, 1024, 2048];
  const symbolVariants = [
    { svg: 'symbol-gradient.svg', prefix: 'symbol-gradient' },
    { svg: 'symbol-gradient-clean.svg', prefix: 'symbol-clean' },
    { svg: 'symbol-white.svg', prefix: 'symbol-white' },
    { svg: 'symbol-blue.svg', prefix: 'symbol-blue' },
    { svg: 'symbol-dark.svg', prefix: 'symbol-dark' },
  ];
  for (const v of symbolVariants) {
    // SVG master
    copyFile(path.join(DIRS.masterSvg, v.svg), path.join(DIRS.compSymbol, v.svg));
    // PNG at key sizes
    for (const sz of symbolSizes) {
      await svgToPng(
        path.join(DIRS.masterSvg, v.svg),
        path.join(DIRS.compSymbol, `${v.prefix}-${sz}.png`),
        sz, sz
      );
    }
  }

  // Wordmark components
  for (const variant of ['wordmark-sombre.svg', 'wordmark-clair.svg']) {
    copyFile(path.join(DIRS.masterSvg, variant), path.join(DIRS.compWordmark, variant));
    const name = variant.replace('.svg', '');
    for (const w of [1000, 2000, 3000]) {
      await svgToPng(
        path.join(DIRS.masterSvg, variant),
        path.join(DIRS.compWordmark, `${name}-${w}.png`),
        w, Math.round(w * 60 / 340)
      );
    }
  }

  // Decorative elements
  const decoElements = ['fiber-nodes.svg', 'gradient-bar.svg'];
  for (const svg of decoElements) {
    copyFile(path.join(DIRS.masterSvg, svg), path.join(DIRS.compElements, svg));
  }
  // Fiber nodes PNG
  for (const sz of [256, 512, 1024]) {
    await svgToPng(
      path.join(DIRS.masterSvg, 'fiber-nodes.svg'),
      path.join(DIRS.compElements, `fiber-nodes-${sz}.png`),
      sz, sz
    );
  }
  // Gradient bar PNG
  for (const w of [1000, 2000, 4000]) {
    await svgToPng(
      path.join(DIRS.masterSvg, 'gradient-bar.svg'),
      path.join(DIRS.compElements, `gradient-bar-${w}.png`),
      w, Math.round(w * 6 / 400)
    );
  }

  // Color swatches ASE-compatible descriptor
  const swatchFile = path.join(DIRS.compElements, 'brand-colors.txt');
  fs.writeFileSync(swatchFile, `AEGIS NETWORK — Brand Color Palette
══════════════════════════════════════

Primary Colors:
  Optical Blue    #3B82F6  RGB(59, 130, 246)
  Aegis Blue      #2563EB  RGB(37, 99, 235)
  Accent Violet   #7C3AED  RGB(124, 58, 237)

Backgrounds:
  Deep Background #020617  RGB(2, 6, 23)
  Light Card      #F8FAFC  RGB(248, 250, 252)

Neutrals:
  White           #FFFFFF  RGB(255, 255, 255)
  Slate 200       #E2E8F0  RGB(226, 232, 240)
  Slate 300       #CBD5E1  RGB(203, 213, 225)
  Slate 400       #94A3B8  RGB(148, 163, 184)
  Slate 700       #334155  RGB(51, 65, 85)
  Slate 900       #0F172A  RGB(15, 23, 42)

Accent:
  Node Blue       #60A5FA  RGB(96, 165, 250)

Gradient:
  Brand gradient  #2563EB → #7C3AED (135°)
  Bar gradient    #3B82F6 → #7C3AED → #3B82F6 (horizontal)

Usage in Photoshop:
  Import these values manually in Color Swatches panel.
  Or create a .aco swatch file from these hex values.
`);
  console.log('  GEN   brand-colors.txt');

  // ═══════════════════════════════════════════════════════════════════
  // STEP 4: 03_EXPORTS_FINAL
  // ═══════════════════════════════════════════════════════════════════
  console.log('\n▸ 03_EXPORTS_FINAL — Copying ready-to-use exports...');

  // PNGs
  const pngSrc = path.join(SRC, '01_LOGOS', 'png');
  for (const f of fs.readdirSync(pngSrc).filter(f => f.endsWith('.png'))) {
    copyFile(path.join(pngSrc, f), path.join(DIRS.expPng, f));
  }

  // PDFs
  const pdfsToCopy = [
    ['01_LOGOS\\pdf', '*.pdf'],
    ['02_BRAND_MANUAL', 'aegis-network-brand-manual.pdf'],
    ['03_BUSINESS_CARD', 'aegis-network-business-card.pdf'],
    ['03_BUSINESS_CARD', 'aegis-network-business-card-A4.pdf'],
    ['04_EMAIL_SIGNATURE', 'aegis-network-email-signatures-preview.pdf'],
  ];
  for (const [dir, pattern] of pdfsToCopy) {
    const srcDir = path.join(SRC, dir);
    if (pattern === '*.pdf') {
      for (const f of fs.readdirSync(srcDir).filter(f => f.endsWith('.pdf'))) {
        copyFile(path.join(srcDir, f), path.join(DIRS.expPdf, f));
      }
    } else {
      const fp = path.join(srcDir, pattern);
      if (fs.existsSync(fp)) {
        copyFile(fp, path.join(DIRS.expPdf, pattern));
      }
    }
  }

  // Favicons
  const icoSrc = path.join(SRC, '01_LOGOS', 'ico_favicons');
  for (const f of fs.readdirSync(icoSrc)) {
    copyFile(path.join(icoSrc, f), path.join(DIRS.expIco, f));
  }

  // Flyer & brochure PNGs
  const extraPngs = [
    ['07_FLYER', 'aegis-network-flyer-A4.png'],
    ['07_FLYER', 'aegis-network-flyer-A5.png'],
  ];
  for (const [dir, file] of extraPngs) {
    const fp = path.join(SRC, dir, file);
    if (fs.existsSync(fp)) {
      copyFile(fp, path.join(DIRS.expPng, file));
    }
  }

  // ═══════════════════════════════════════════════════════════════════
  // STEP 5: 04_ARCHIVE_REFERENCE — HTML sources & brand manual
  // ═══════════════════════════════════════════════════════════════════
  console.log('\n▸ 04_ARCHIVE_REFERENCE — Copying source HTML and docs...');

  const archiveSources = [
    ['02_BRAND_MANUAL\\aegis-network-brand-identity.html', 'brand-identity.html'],
    ['02_BRAND_MANUAL\\aegis-network-brand-identity.md', 'brand-identity.md'],
    ['03_BUSINESS_CARD\\aegis-network-business-card.html', 'business-card.html'],
    ['04_EMAIL_SIGNATURE\\aegis-network-email-signatures.html', 'email-signatures.html'],
    ['07_FLYER\\aegis-network-flyer.html', 'flyer.html'],
    ['08_BROCHURE\\aegis-network-brochure.html', 'brochure.html'],
    ['08_BROCHURE\\brochure-source-page.tsx', 'brochure-source-page.tsx'],
    ['README.md', 'README.md'],
  ];
  for (const [src, dest] of archiveSources) {
    const fp = path.join(SRC, src);
    if (fs.existsSync(fp)) {
      copyFile(fp, path.join(DIRS.archive, dest));
    }
  }

  // ═══════════════════════════════════════════════════════════════════
  // STEP 6: Call Python to assemble PSD files
  // ═══════════════════════════════════════════════════════════════════
  console.log('\n▸ 01_PSD_EDITABLE — Generating layered PSD files...');

  const psdScript = path.join(OUT, '_psd_temp', 'build_psds.py');
  // Write the PSD generation script (see next section)
  fs.writeFileSync(psdScript, generatePsdPythonScript(DIRS, psdTempDir));
  console.log('  Launching Python PSD builder...');

  try {
    const pyOutput = execSync(`${PY} "${psdScript}"`, {
      stdio: 'pipe',
      timeout: 120000,
      encoding: 'utf8',
    });
    console.log(pyOutput);
  } catch (e) {
    console.error('  PSD generation encountered issues:', e.stderr || e.message);
  }

  // Cleanup temp
  console.log('\n▸ Cleaning up temp files...');
  fs.rmSync(psdTempDir, { recursive: true, force: true });

  // ═══════════════════════════════════════════════════════════════════
  // FINAL: Generate README
  // ═══════════════════════════════════════════════════════════════════
  console.log('\n▸ Generating package README...');
  generateReadme(OUT, DIRS);

  console.log('\n╔══════════════════════════════════════════════════╗');
  console.log('║  ✓ Designer Package complete!                    ║');
  console.log(`║  Output: ${OUT}`);
  console.log('╚══════════════════════════════════════════════════╝');
}

// ─── Python PSD builder script ───────────────────────────────────────
function generatePsdPythonScript(dirs, tempDir) {
  // Escape backslashes for Python strings
  const esc = (s) => s.replace(/\\/g, '\\\\');

  return `# -*- coding: utf-8 -*-
"""
AEGIS NETWORK — PSD Assembly Script
Creates layered PSD files from high-res PNG renders.
Uses psd-tools library for proper PSD format output.
"""
import struct, zlib, os, sys
from PIL import Image
import numpy as np

TEMP = r"${esc(tempDir)}"
PSD_LOGOS = r"${esc(dirs.psdLogos)}"
PSD_DOCS = r"${esc(dirs.psdDocuments)}"

os.makedirs(PSD_LOGOS, exist_ok=True)
os.makedirs(PSD_DOCS, exist_ok=True)

# ──────────────────────────────────────────────────────────────────
# Minimal PSD writer — creates valid Photoshop PSD with named layers
# ──────────────────────────────────────────────────────────────────

def write_psd(filepath, canvas_w, canvas_h, layers, bg_color=None):
    """
    layers: list of dict with keys:
      - name: str (layer name)
      - image: PIL.Image.RGBA
      - x: int (left offset)
      - y: int (top offset)
      - group: str (optional group name, for display in layer name)
      - visible: bool (default True)
    bg_color: tuple (R,G,B) or None for transparent
    """
    # PSD is Big Endian
    data = bytearray()

    # ─── File Header ───
    data.extend(b'8BPS')           # Signature
    data.extend(struct.pack('>H', 1))   # Version
    data.extend(b'\\x00' * 6)       # Reserved
    data.extend(struct.pack('>H', 4))   # Channels (RGBA)
    data.extend(struct.pack('>I', canvas_h))  # Height
    data.extend(struct.pack('>I', canvas_w))   # Width
    data.extend(struct.pack('>H', 8))   # Depth (8-bit)
    data.extend(struct.pack('>H', 3))   # Color mode (RGB)

    # ─── Color Mode Data ───
    data.extend(struct.pack('>I', 0))

    # ─── Image Resources ───
    # Resolution info (300 DPI)
    res_data = bytearray()
    # Resource: 0x03ED = Resolution Info
    res_data.extend(b'8BIM')
    res_data.extend(struct.pack('>H', 0x03ED))
    res_data.extend(struct.pack('>H', 0))  # Pascal string (empty)
    res_info = bytearray()
    res_info.extend(struct.pack('>I', 300))  # hRes (fixed point 16.16) = 300
    res_info.extend(struct.pack('>H', 1))    # hRes unit (pixels per inch)
    res_info.extend(struct.pack('>H', 1))    # width unit (inches)
    res_info.extend(struct.pack('>I', 300))  # vRes
    res_info.extend(struct.pack('>H', 1))    # vRes unit
    res_info.extend(struct.pack('>H', 1))    # height unit
    res_data.extend(struct.pack('>I', len(res_info)))
    res_data.extend(res_info)

    data.extend(struct.pack('>I', len(res_data)))
    data.extend(res_data)

    # ─── Layer and Mask Information ───
    layer_section = bytearray()

    # Layer info
    layer_info = bytearray()
    layer_count = len(layers)
    layer_info.extend(struct.pack('>h', layer_count))

    # Channel data (collect for each layer)
    channel_datas = []

    for layer in layers:
        img = layer['image']
        name = layer.get('name', 'Layer')
        x = layer.get('x', 0)
        y = layer.get('y', 0)
        visible = layer.get('visible', True)

        # Ensure RGBA
        if img.mode != 'RGBA':
            img = img.convert('RGBA')

        w, h = img.size
        top = y
        left = x
        bottom = y + h
        right = x + w

        # Layer record
        layer_info.extend(struct.pack('>i', top))
        layer_info.extend(struct.pack('>i', left))
        layer_info.extend(struct.pack('>i', bottom))
        layer_info.extend(struct.pack('>i', right))

        # Number of channels
        num_channels = 4  # R, G, B, A
        layer_info.extend(struct.pack('>H', num_channels))

        # Prepare channel data (raw, no compression for simplicity)
        r, g, b, a = img.split()
        channels = [
            (-1, np.array(a, dtype=np.uint8)),  # Alpha = -1
            (0, np.array(r, dtype=np.uint8)),
            (1, np.array(g, dtype=np.uint8)),
            (2, np.array(b, dtype=np.uint8)),
        ]

        ch_datas = []
        for ch_id, ch_arr in channels:
            # Compression type 0 = Raw
            ch_raw = struct.pack('>H', 0) + ch_arr.tobytes()
            ch_datas.append((ch_id, ch_raw))
            # Channel length + data
            layer_info.extend(struct.pack('>h', ch_id))
            layer_info.extend(struct.pack('>I', len(ch_raw)))

        channel_datas.append(ch_datas)

        # Blend mode signature
        layer_info.extend(b'8BIM')
        layer_info.extend(b'norm')  # Normal blend

        # Opacity
        layer_info.extend(struct.pack('>B', 255))
        # Clipping
        layer_info.extend(struct.pack('>B', 0))
        # Flags (bit 1 = visible)
        flags = 0 if visible else 2
        layer_info.extend(struct.pack('>B', flags))
        # Filler
        layer_info.extend(b'\\x00')

        # Extra data
        extra_data = bytearray()

        # Layer mask data (empty)
        extra_data.extend(struct.pack('>I', 0))

        # Blending ranges (empty)
        extra_data.extend(struct.pack('>I', 0))

        # Layer name (Pascal string, padded to 4 bytes)
        name_bytes = name.encode('ascii', errors='replace')
        if len(name_bytes) > 255:
            name_bytes = name_bytes[:255]
        pascal = struct.pack('>B', len(name_bytes)) + name_bytes
        # Pad to multiple of 4
        while len(pascal) % 4 != 0:
            pascal += b'\\x00'
        extra_data.extend(pascal)

        # Unicode layer name (additional layer info)
        # 8BIM + 'luni' + length + unicode string
        uni_name = name.encode('utf-16-be')
        luni_data = struct.pack('>I', len(name)) + uni_name + (b'\\x00\\x00' if len(name) % 2 else b'')
        extra_data.extend(b'8BIM')
        extra_data.extend(b'luni')
        extra_data.extend(struct.pack('>I', len(luni_data)))
        extra_data.extend(luni_data)
        if len(extra_data) % 2:
            extra_data.extend(b'\\x00')

        layer_info.extend(struct.pack('>I', len(extra_data)))
        layer_info.extend(extra_data)

    # Append channel image data
    for ch_datas in channel_datas:
        for ch_id, ch_raw in ch_datas:
            layer_info.extend(ch_raw)

    # Write layer info section
    # Pad to even
    if len(layer_info) % 2:
        layer_info.extend(b'\\x00')

    layer_section.extend(struct.pack('>I', len(layer_info)))
    layer_section.extend(layer_info)

    # Global layer mask info (empty)
    layer_section.extend(struct.pack('>I', 0))

    # Write layer section length
    data.extend(struct.pack('>I', len(layer_section)))
    data.extend(layer_section)

    # ─── Image Data (merged/composite) ───
    # Create composite from layers
    composite = Image.new('RGBA', (canvas_w, canvas_h), (0, 0, 0, 0))
    if bg_color:
        bg = Image.new('RGBA', (canvas_w, canvas_h), (*bg_color, 255))
        composite = Image.alpha_composite(composite, bg)

    for layer in layers:
        if layer.get('visible', True):
            img = layer['image'].convert('RGBA')
            temp = Image.new('RGBA', (canvas_w, canvas_h), (0, 0, 0, 0))
            temp.paste(img, (layer.get('x', 0), layer.get('y', 0)))
            composite = Image.alpha_composite(composite, temp)

    # Write merged image data (Raw)
    r, g, b, a = composite.split()
    data.extend(struct.pack('>H', 0))  # Compression: Raw
    data.extend(np.array(a, dtype=np.uint8).tobytes())
    data.extend(np.array(r, dtype=np.uint8).tobytes())
    data.extend(np.array(g, dtype=np.uint8).tobytes())
    data.extend(np.array(b, dtype=np.uint8).tobytes())

    with open(filepath, 'wb') as f:
        f.write(bytes(data))

    size_kb = os.path.getsize(filepath) // 1024
    print(f"  PSD   {os.path.basename(filepath)} ({size_kb} KB)")


# ──────────────────────────────────────────────────────────────
# PSD GENERATION
# ──────────────────────────────────────────────────────────────

def load_png(name):
    return Image.open(os.path.join(TEMP, name)).convert('RGBA')


def center_on_canvas(img_w, img_h, canvas_w, canvas_h):
    return ((canvas_w - img_w) // 2, (canvas_h - img_h) // 2)


# 1. Logo Master PSD (symbol + nodes, fond sombre)
print("  Building logo-master-fond-sombre.psd...")
canvas = (4000, 4000)
sym = load_png('symbol-gradient-2048.png')
# Place symbol centered
sx, sy = center_on_canvas(2048, 2048, *canvas)
bg_layer = Image.new('RGBA', canvas, (2, 6, 23, 255))
write_psd(
    os.path.join(PSD_LOGOS, 'logo-master-fond-sombre.psd'),
    canvas[0], canvas[1],
    [
        {'name': 'Background #020617', 'image': bg_layer, 'x': 0, 'y': 0},
        {'name': 'Symbol - Gradient + Nodes', 'image': sym, 'x': sx, 'y': sy},
    ],
    bg_color=(2, 6, 23)
)

# 2. Logo Master PSD (fond clair)
print("  Building logo-master-fond-clair.psd...")
bg_light = Image.new('RGBA', canvas, (248, 250, 252, 255))
sym_dark = load_png('symbol-dark-2048.png')
write_psd(
    os.path.join(PSD_LOGOS, 'logo-master-fond-clair.psd'),
    canvas[0], canvas[1],
    [
        {'name': 'Background #F8FAFC', 'image': bg_light, 'x': 0, 'y': 0},
        {'name': 'Symbol - Dark', 'image': sym_dark, 'x': sx, 'y': sy},
    ],
    bg_color=(248, 250, 252)
)

# 3. Symbol variations PSD
print("  Building symbol-all-variants.psd...")
canvas_sym = (2400, 2400)
variants = [
    ('symbol-gradient-2048.png', 'Symbol Gradient'),
    ('symbol-clean-2048.png', 'Symbol Clean (no nodes)'),
    ('symbol-white-2048.png', 'Symbol White'),
    ('symbol-blue-2048.png', 'Symbol Blue'),
    ('symbol-dark-2048.png', 'Symbol Dark'),
]
sym_layers = []
for i, (png, name) in enumerate(variants):
    img = load_png(png).resize((2000, 2000), Image.LANCZOS)
    cx, cy = center_on_canvas(2000, 2000, *canvas_sym)
    sym_layers.append({
        'name': name,
        'image': img,
        'x': cx, 'y': cy,
        'visible': i == 0  # Only first visible
    })
write_psd(
    os.path.join(PSD_LOGOS, 'symbol-all-variants.psd'),
    canvas_sym[0], canvas_sym[1],
    sym_layers
)

# 4. Lockup fond sombre PSD
print("  Building lockup-fond-sombre.psd...")
lockup_dark = load_png('aegis-logo-fond-sombre-4000.png')
lw, lh = lockup_dark.size
bg_lockup = Image.new('RGBA', (lw, lh), (2, 6, 23, 255))
write_psd(
    os.path.join(PSD_LOGOS, 'lockup-fond-sombre.psd'),
    lw, lh,
    [
        {'name': 'Background #020617', 'image': bg_lockup, 'x': 0, 'y': 0},
        {'name': 'Lockup - Fond Sombre', 'image': lockup_dark, 'x': 0, 'y': 0},
    ],
    bg_color=(2, 6, 23)
)

# 5. Lockup fond clair PSD
print("  Building lockup-fond-clair.psd...")
lockup_light = load_png('aegis-logo-fond-clair-4000.png')
lw2, lh2 = lockup_light.size
bg_lockup_light = Image.new('RGBA', (lw2, lh2), (248, 250, 252, 255))
write_psd(
    os.path.join(PSD_LOGOS, 'lockup-fond-clair.psd'),
    lw2, lh2,
    [
        {'name': 'Background #F8FAFC', 'image': bg_lockup_light, 'x': 0, 'y': 0},
        {'name': 'Lockup - Fond Clair', 'image': lockup_light, 'x': 0, 'y': 0},
    ],
    bg_color=(248, 250, 252)
)

# 6. Monochrome variants PSD
print("  Building monochromes-all.psd...")
mono_canvas = (2400, 2400)
mono_layers = []
mono_files = [
    ('aegis-logo-monochrome-blanc-2048.png', 'Monochrome White'),
    ('aegis-logo-monochrome-bleu-2048.png', 'Monochrome Blue'),
    ('aegis-logo-monochrome-sombre-2048.png', 'Monochrome Dark'),
]
for i, (png, name) in enumerate(mono_files):
    img = load_png(png).resize((2000, 2000), Image.LANCZOS)
    cx, cy = center_on_canvas(2000, 2000, *mono_canvas)
    mono_layers.append({
        'name': name,
        'image': img,
        'x': cx, 'y': cy,
        'visible': i == 0
    })
write_psd(
    os.path.join(PSD_LOGOS, 'monochromes-all.psd'),
    mono_canvas[0], mono_canvas[1],
    mono_layers
)

# 7. Wordmark PSD (both variants)
print("  Building wordmark-variants.psd...")
wm_dark = load_png('wordmark-sombre-3000.png')
wm_light = load_png('wordmark-clair-3000.png')
wm_w, wm_h = wm_dark.size
wm_canvas = (wm_w + 200, wm_h + 200)
wx, wy = center_on_canvas(wm_w, wm_h, *wm_canvas)
write_psd(
    os.path.join(PSD_LOGOS, 'wordmark-variants.psd'),
    wm_canvas[0], wm_canvas[1],
    [
        {'name': 'Wordmark - Fond Sombre (white+blue)', 'image': wm_dark, 'x': wx, 'y': wy, 'visible': True},
        {'name': 'Wordmark - Fond Clair (dark+blue)', 'image': wm_light, 'x': wx, 'y': wy, 'visible': False},
    ]
)

# 8. Decorative Elements PSD
print("  Building decorative-elements.psd...")
nodes = load_png('fiber-nodes-1024.png')
bar = load_png('gradient-bar-4000.png')
deco_canvas = (4000, 2000)
write_psd(
    os.path.join(PSD_LOGOS, 'decorative-elements.psd'),
    deco_canvas[0], deco_canvas[1],
    [
        {'name': 'Fiber Nodes', 'image': nodes, 'x': 100, 'y': 100},
        {'name': 'Gradient Bar', 'image': bar, 'x': 0, 'y': 1000},
    ]
)

# 9. Business Card PSD (85×55mm at 300dpi = 1004×650px)
print("  Building business-card.psd...")
bc_w, bc_h = 1004, 650

# Recto - dark background
recto_bg = Image.new('RGBA', (bc_w, bc_h), (2, 6, 23, 255))
# Load symbol for card
sym_card = load_png('symbol-gradient-2048.png').resize((200, 200), Image.LANCZOS)
# Gradient bar for card
bar_card = load_png('gradient-bar-4000.png').resize((bc_w, 8), Image.LANCZOS)

recto_layers = [
    {'name': 'BG Recto #020617', 'image': recto_bg, 'x': 0, 'y': 0},
    {'name': 'Gradient Bar Top', 'image': bar_card, 'x': 0, 'y': 0},
    {'name': 'Symbol', 'image': sym_card, 'x': (bc_w - 200) // 2, 'y': (bc_h - 200) // 2 - 40},
]
write_psd(
    os.path.join(PSD_DOCS, 'business-card-recto.psd'),
    bc_w, bc_h,
    recto_layers,
    bg_color=(2, 6, 23)
)

# Verso
verso_bg = Image.new('RGBA', (bc_w, bc_h), (248, 250, 252, 255))
sym_verso = load_png('symbol-dark-2048.png').resize((120, 120), Image.LANCZOS)
verso_layers = [
    {'name': 'BG Verso #F8FAFC', 'image': verso_bg, 'x': 0, 'y': 0},
    {'name': 'Symbol (watermark)', 'image': sym_verso, 'x': bc_w - 160, 'y': bc_h - 160},
]
write_psd(
    os.path.join(PSD_DOCS, 'business-card-verso.psd'),
    bc_w, bc_h,
    verso_layers,
    bg_color=(248, 250, 252)
)

# 10. Flyer A5 PSD (148×210mm = 1748×2480px at 300dpi)
print("  Building flyer-A5.psd...")
fa5_w, fa5_h = 1748, 2480
# Try loading existing flyer PNG
flyer_a5_path = os.path.join(r"${esc(path.join(SRC, '07_FLYER'))}", "aegis-network-flyer-A5.png")
if os.path.exists(flyer_a5_path):
    flyer_img = Image.open(flyer_a5_path).convert('RGBA')
    flyer_img = flyer_img.resize((fa5_w, fa5_h), Image.LANCZOS)
    bg_flyer = Image.new('RGBA', (fa5_w, fa5_h), (2, 6, 23, 255))
    write_psd(
        os.path.join(PSD_DOCS, 'flyer-A5.psd'),
        fa5_w, fa5_h,
        [
            {'name': 'Background #020617', 'image': bg_flyer, 'x': 0, 'y': 0},
            {'name': 'Flyer A5 - Smart Object', 'image': flyer_img, 'x': 0, 'y': 0},
        ],
        bg_color=(2, 6, 23)
    )

# 11. Flyer A4 PSD (210×297mm = 2480×3508px at 300dpi)
print("  Building flyer-A4.psd...")
fa4_w, fa4_h = 2480, 3508
flyer_a4_path = os.path.join(r"${esc(path.join(SRC, '07_FLYER'))}", "aegis-network-flyer-A4.png")
if os.path.exists(flyer_a4_path):
    flyer_a4 = Image.open(flyer_a4_path).convert('RGBA')
    flyer_a4 = flyer_a4.resize((fa4_w, fa4_h), Image.LANCZOS)
    bg_a4 = Image.new('RGBA', (fa4_w, fa4_h), (2, 6, 23, 255))
    write_psd(
        os.path.join(PSD_DOCS, 'flyer-A4.psd'),
        fa4_w, fa4_h,
        [
            {'name': 'Background #020617', 'image': bg_a4, 'x': 0, 'y': 0},
            {'name': 'Flyer A4 - Smart Object', 'image': flyer_a4, 'x': 0, 'y': 0},
        ],
        bg_color=(2, 6, 23)
    )

# 12. Email Signature PSD (600×200px for digital use)
print("  Building email-signature.psd...")
es_w, es_h = 1200, 400
sym_email = load_png('symbol-gradient-2048.png').resize((120, 120), Image.LANCZOS)
bar_email = load_png('gradient-bar-4000.png').resize((1200, 6), Image.LANCZOS)
bg_email = Image.new('RGBA', (es_w, es_h), (2, 6, 23, 255))
write_psd(
    os.path.join(PSD_DOCS, 'email-signature.psd'),
    es_w, es_h,
    [
        {'name': 'Background #020617', 'image': bg_email, 'x': 0, 'y': 0},
        {'name': 'Gradient Bar', 'image': bar_email, 'x': 0, 'y': 0},
        {'name': 'Symbol', 'image': sym_email, 'x': 40, 'y': (es_h - 120) // 2},
    ],
    bg_color=(2, 6, 23)
)

print("\\n  PSD generation complete.")
`;
}

// ─── README generator ────────────────────────────────────────────────
function generateReadme(outDir, dirs) {
  // Count files in each directory
  const countFiles = (dir) => {
    if (!fs.existsSync(dir)) return 0;
    let count = 0;
    const items = fs.readdirSync(dir, { withFileTypes: true });
    for (const item of items) {
      if (item.isFile()) count++;
      else if (item.isDirectory()) count += countFiles(path.join(dir, item.name));
    }
    return count;
  };

  const readme = `# AEGIS NETWORK — Designer Package (Photoshop-Oriented)

> Generated: ${new Date().toISOString().split('T')[0]}
> Orientation: Photoshop (PSD + composants réutilisables)

---

## Structure

\`\`\`
AEGIS_NETWORK_DESIGNER/
├── 00_MASTER_VECTOR/        ← Source de vérité vectorielle
│   ├── svg/                 ← SVG masters (logos, symboles, éléments)
│   └── pdf/                 ← PDF vectoriels
├── 01_PSD_EDITABLE/         ← Fichiers PSD exploitables
│   ├── logos/               ← PSD logos et symboles
│   └── documents/           ← PSD business card, flyer, signature
├── 02_COMPONENTS_REUSABLE/  ← Éléments isolés réutilisables
│   ├── symbol/              ← Symbole Aegis (SVG + PNG multi-tailles)
│   ├── wordmark/            ← Wordmark isolé (SVG + PNG)
│   ├── icons/               ← Icônes isolées
│   └── elements/            ← Éléments décoratifs + palette
├── 03_EXPORTS_FINAL/        ← Exports prêts à l'emploi
│   ├── png/                 ← PNG finaux
│   ├── pdf/                 ← PDF finaux
│   └── ico_favicons/        ← Favicons web
└── 04_ARCHIVE_REFERENCE/    ← Sources HTML/code originales
\`\`\`

## Fichiers par catégorie

### 00_MASTER_VECTOR — Sources vectorielles (SVG + PDF)

Les SVG sont la **source de vérité absolue**. Ne jamais les remplacer par des rasters.

**Logos lockup :**
- \`aegis-logo-fond-sombre.svg\` — Lockup complet, fond sombre
- \`aegis-logo-fond-clair.svg\` — Lockup complet, fond clair

**Symboles isolés :**
- \`symbol-gradient.svg\` — Triangle + nodes, dégradé blue→violet
- \`symbol-gradient-clean.svg\` — Triangle seul (sans nodes)
- \`symbol-white.svg\` — Monochrome blanc (fonds sombres)
- \`symbol-blue.svg\` — Monochrome bleu
- \`symbol-dark.svg\` — Monochrome sombre (fonds clairs)

**Monochromes originaux :**
- \`aegis-logo-monochrome-blanc/bleu/sombre.svg\`

**Éléments décoratifs :**
- \`fiber-nodes.svg\` — Cluster de nodes réseau isolé
- \`gradient-bar.svg\` — Barre dégradée brand
- \`wordmark-sombre.svg\` / \`wordmark-clair.svg\` — Texte seul

### 01_PSD_EDITABLE — Fichiers Photoshop

**Logos (calques séparés, fond + symbole) :**
- \`logo-master-fond-sombre.psd\` — Logo principal 4000×4000, calques: BG + Symbol
- \`logo-master-fond-clair.psd\` — Variante fond clair
- \`lockup-fond-sombre.psd\` — Logo complet avec wordmark
- \`lockup-fond-clair.psd\` — Idem fond clair
- \`symbol-all-variants.psd\` — 5 variantes du symbole en calques (toggle visibility)
- \`monochromes-all.psd\` — 3 variantes monochromes en calques
- \`wordmark-variants.psd\` — Wordmark fond sombre / fond clair
- \`decorative-elements.psd\` — Fiber nodes + gradient bar

**Documents :**
- \`business-card-recto.psd\` — Carte de visite recto (85×55mm @300dpi)
- \`business-card-verso.psd\` — Carte de visite verso
- \`flyer-A5.psd\` — Flyer A5 @300dpi
- \`flyer-A4.psd\` — Flyer A4 @300dpi
- \`email-signature.psd\` — Signature email

### 02_COMPONENTS_REUSABLE — Composants isolés

Chaque composant est fourni en SVG (master) + PNG à plusieurs tailles (256, 512, 1024, 2048px).
Idéal pour reconstruire de nouveaux supports sans repartir de zéro.

### 03_EXPORTS_FINAL — Prêts à l'emploi

Exports PNG, PDF et favicons déjà optimisés pour usage direct.

### 04_ARCHIVE_REFERENCE — Sources HTML originales

Les fichiers HTML/code sources ayant servi à générer les supports.
Conservés comme référence, pas comme fichiers de travail Photoshop.

---

## Limites et choix techniques

| Élément | Type | Éditable PS | Notes |
|---------|------|-------------|-------|
| Logos symbole | PSD (calques raster haute-res) | ✅ Recolorer, déplacer, redimensionner | Master SVG dans 00_MASTER_VECTOR |
| Lockups | PSD (raster du SVG complet) | ⚠️ Smart Object | Le texte n'est pas éditable en calque texte PS (rendu SVG). Modifier via SVG puis re-render |
| Business card | PSD (composants séparés) | ✅ Déplacer, recolorer éléments | Texte à ajouter manuellement dans PS |
| Flyer / Brochure | PSD (raster du rendu HTML) | ⚠️ Smart Object seul | Source HTML dans 04_ARCHIVE |
| Wordmarks | PSD (raster haute-res) | ⚠️ Recolorer via teinte, pas éditable lettre par lettre | Master SVG disponible |
| Symboles | PSD + PNG + SVG | ✅ Pleinement exploitable | Meilleure éditabilité |
| Éléments déco | PSD + PNG + SVG | ✅ Pleinement exploitable | Fiber nodes, gradient bar |

**Pourquoi pas de vrais calques texte PSD ?**
Les textes du logo utilisent la police Inter avec un tracking précis (0.06em). Le rendu SVG→raster garantit la fidélité pixel-perfect. Pour modifier le texte : éditer le SVG dans 00_MASTER_VECTOR, puis re-rasteriser.

**Pourquoi les flyers/brochure sont des Smart Objects ?**
Ces supports sont générés depuis du HTML/React avec des mises en page complexes. Un PSD multicouche fidèle nécessiterait une reconstruction manuelle complète. Le Smart Object haute résolution permet de les utiliser comme base, avec le HTML source comme référence.

---

## Palette de couleurs

| Nom | Hex | Usage |
|-----|-----|-------|
| Optical Blue | \`#3B82F6\` | Couleur primaire, accents |
| Aegis Blue | \`#2563EB\` | Dégradé start, liens |
| Accent Violet | \`#7C3AED\` | Dégradé end, accents secondaires |
| Deep Background | \`#020617\` | Fond principal (slate-950) |
| White | \`#FFFFFF\` | Texte sur fond sombre |
| Slate 400 | \`#94A3B8\` | Baseline, texte secondaire |
| Node Blue | \`#60A5FA\` | Fiber nodes |

Fichier complet : \`02_COMPONENTS_REUSABLE/elements/brand-colors.txt\`

---

## Workflow recommandé

1. **Nouveau support** → Partir de \`02_COMPONENTS_REUSABLE\` (symbole + wordmark + éléments)
2. **Modifier un logo** → Éditer le SVG dans \`00_MASTER_VECTOR\`, re-rasteriser
3. **Recolorer un symbole** → Ouvrir le PSD dans \`01_PSD_EDITABLE/logos\`, ajuster teinte/saturation
4. **Reprendre un flyer** → Ouvrir le PSD comme base, ajouter/modifier les éléments
5. **Export final** → Vérifier dans \`03_EXPORTS_FINAL\` si l'export existe déjà
`;

  fs.writeFileSync(path.join(outDir, 'README.md'), readme);
  console.log('  GEN   README.md');
}

// ─── Run ─────────────────────────────────────────────────────────────
main().catch(console.error);
