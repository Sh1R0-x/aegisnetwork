/**
 * DEEP PSD DIAGNOSTIC — Aegis Network
 * ====================================
 * Reads back generated PSDs and checks EVERY layer for:
 * - Text layers: font metadata, canvas presence, canvas pixel data (not empty)
 * - Image layers: canvas presence, canvas pixel data (not empty), bounds
 * - Groups: child count
 * - Resolution, color mode
 * 
 * Reports any layer that has a canvas but is visually empty (all transparent pixels).
 */

import { createCanvas, Image as CanvasImage } from '@napi-rs/canvas';
import { initializeCanvas, readPsd } from 'ag-psd';
import fs from 'fs';
import path from 'path';

// Register canvas for ag-psd readback
initializeCanvas(
  (w, h) => createCanvas(w, h),
  function createImage(dataOrWidth, maybeHeight) {
    if (typeof dataOrWidth === 'number') {
      return createCanvas(dataOrWidth, maybeHeight || dataOrWidth);
    }
    const img = new CanvasImage();
    img.src = Buffer.from(dataOrWidth);
    const c = createCanvas(img.width, img.height);
    c.getContext('2d').drawImage(img, 0, 0);
    return c;
  }
);

const OUT_PSD = 'C:\\Users\\Ludovic\\Documents\\AEGIS_NETWORK_DESIGNER\\01_PSD_EDITABLE';

// Check if a canvas has any visible (non-transparent) pixels
function hasVisiblePixels(canvas) {
  if (!canvas) return false;
  try {
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;
    if (w === 0 || h === 0) return false;
    const data = ctx.getImageData(0, 0, w, h).data;
    for (let i = 3; i < data.length; i += 4) {
      if (data[i] > 0) return true; // alpha > 0 means visible pixel
    }
    return false;
  } catch {
    return false; // canvas access failed
  }
}

function inspectLayer(layer, depth = 0, parentName = '') {
  const indent = '  '.repeat(depth);
  const issues = [];
  const fullPath = parentName ? `${parentName} > ${layer.name}` : layer.name;

  if (layer.children) {
    // Group
    console.log(`${indent}[Group] "${layer.name}" (${layer.children.length} children)`);
    if (layer.children.length === 0) {
      issues.push({ path: fullPath, issue: 'EMPTY GROUP — no children' });
    }
    for (const child of layer.children) {
      issues.push(...inspectLayer(child, depth + 1, fullPath));
    }
    return issues;
  }

  const hasCanvas = !!layer.canvas;
  const canvasW = hasCanvas ? layer.canvas.width : 0;
  const canvasH = hasCanvas ? layer.canvas.height : 0;
  const visible = hasCanvas ? hasVisiblePixels(layer.canvas) : false;
  const isHidden = layer.hidden === true;
  const opacity = layer.opacity !== undefined ? layer.opacity : 1;
  const bounds = `${layer.top || 0},${layer.left || 0} → ${layer.bottom || 0},${layer.right || 0}`;
  const boundsArea = ((layer.bottom || 0) - (layer.top || 0)) * ((layer.right || 0) - (layer.left || 0));

  if (layer.text) {
    // Text layer
    const font = layer.text.style?.font;
    const fontSize = layer.text.style?.fontSize;
    const tracking = layer.text.style?.tracking;
    const fillColor = layer.text.style?.fillColor;
    const transform = layer.text.transform;
    const textContent = layer.text.text?.substring(0, 50);

    console.log(`${indent}[TEXT] "${layer.name}" = "${textContent}"`);
    console.log(`${indent}  font: ${JSON.stringify(font)}`);
    console.log(`${indent}  size: ${fontSize}, tracking: ${tracking}`);
    console.log(`${indent}  transform: [${transform?.join(', ')}]`);
    console.log(`${indent}  bounds: ${bounds} (area: ${boundsArea})`);
    console.log(`${indent}  canvas: ${canvasW}×${canvasH}, visible pixels: ${visible}`);
    console.log(`${indent}  hidden: ${isHidden}, opacity: ${opacity}`);

    // Check for issues
    if (!hasCanvas) issues.push({ path: fullPath, issue: 'TEXT — NO CANVAS (invisible)' });
    else if (!visible) issues.push({ path: fullPath, issue: 'TEXT — canvas exists but ALL TRANSPARENT (invisible)' });
    if (boundsArea === 0) issues.push({ path: fullPath, issue: 'TEXT — zero-area bounds' });
    if (isHidden) issues.push({ path: fullPath, issue: 'TEXT — hidden flag is true' });
    if (opacity === 0) issues.push({ path: fullPath, issue: 'TEXT — opacity is 0' });

    // Check font issues
    if (font?.name && font.name.includes('Variable')) {
      issues.push({ path: fullPath, issue: `TEXT — font name "${font.name}" looks like variable font reference` });
    }
    if (font?.synthetic) {
      issues.push({ path: fullPath, issue: `TEXT — synthetic font flag set (faux bold/italic)` });
    }

  } else {
    // Image/shape layer
    console.log(`${indent}[Image] "${layer.name}"`);
    console.log(`${indent}  bounds: ${bounds} (area: ${boundsArea})`);
    console.log(`${indent}  canvas: ${canvasW}×${canvasH}, visible pixels: ${visible}`);
    console.log(`${indent}  hidden: ${isHidden}, opacity: ${opacity}`);

    if (!hasCanvas) issues.push({ path: fullPath, issue: 'IMAGE — NO CANVAS' });
    else if (!visible) issues.push({ path: fullPath, issue: 'IMAGE — canvas exists but ALL TRANSPARENT (invisible)' });
    if (boundsArea === 0) issues.push({ path: fullPath, issue: 'IMAGE — zero-area bounds' });
    if (isHidden) issues.push({ path: fullPath, issue: 'IMAGE — hidden flag is true' });
    if (opacity === 0) issues.push({ path: fullPath, issue: 'IMAGE — opacity is 0' });
  }

  return issues;
}

function diagnosePsd(filepath) {
  console.log(`\n${'═'.repeat(70)}`);
  console.log(`FILE: ${path.basename(filepath)}`);
  console.log(`${'═'.repeat(70)}`);

  try {
    const psd = readPsd(fs.readFileSync(filepath));
    console.log(`Dimensions: ${psd.width}×${psd.height}`);

    const res = psd.imageResources?.resolutionInfo;
    console.log(`Resolution: ${res ? `${res.horizontalResolution} PPI` : 'UNDEFINED'}`);

    let allIssues = [];
    if (psd.children) {
      for (const child of psd.children) {
        allIssues.push(...inspectLayer(child, 1));
      }
    }

    if (allIssues.length === 0) {
      console.log(`\n  ✓ NO ISSUES FOUND`);
    } else {
      console.log(`\n  ⚠ ${allIssues.length} ISSUE(S):`);
      for (const { path: p, issue } of allIssues) {
        console.log(`    ✗ ${issue}`);
        console.log(`      at: ${p}`);
      }
    }

    return allIssues;
  } catch (e) {
    console.error(`  FATAL: ${e.message}`);
    return [{ path: filepath, issue: `FATAL READ ERROR: ${e.message}` }];
  }
}

// ── Main ──
const allFiles = [];
for (const subdir of ['logos', 'documents']) {
  const dir = path.join(OUT_PSD, subdir);
  if (!fs.existsSync(dir)) continue;
  for (const f of fs.readdirSync(dir).filter(f => f.endsWith('.psd'))) {
    allFiles.push(path.join(dir, f));
  }
}

console.log(`\nDEEP PSD DIAGNOSTIC — ${allFiles.length} files\n`);

let totalIssues = 0;
const summaryByFile = {};
for (const f of allFiles) {
  const issues = diagnosePsd(f);
  summaryByFile[path.basename(f)] = issues;
  totalIssues += issues.length;
}

// Final summary
console.log(`\n${'═'.repeat(70)}`);
console.log(`SUMMARY: ${totalIssues} total issues across ${allFiles.length} files`);
console.log(`${'═'.repeat(70)}`);
for (const [file, issues] of Object.entries(summaryByFile)) {
  const status = issues.length === 0 ? '✓' : `✗ ${issues.length} issues`;
  console.log(`  ${status.padEnd(20)} ${file}`);
}
