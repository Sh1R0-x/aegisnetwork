/**
 * Verify PSD files — reads each PSD and reports which layers
 * are real text layers vs image (pixel) layers.
 */
import { readPsd } from 'ag-psd';
import { initializeCanvas } from 'ag-psd';
import { createCanvas, Image as CanvasImage } from '@napi-rs/canvas';
import fs from 'fs';
import path from 'path';

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

const OUT = 'C:\\Users\\Ludovic\\Documents\\AEGIS_NETWORK_DESIGNER\\01_PSD_EDITABLE';

function analyzeLayers(children, indent = 0) {
  const stats = { textLayers: 0, imageLayers: 0, groups: 0, texts: [] };
  if (!children) return stats;

  for (const layer of children) {
    const prefix = '  '.repeat(indent);
    if (layer.children) {
      // It's a group
      stats.groups++;
      console.log(`${prefix}📁 [Group] ${layer.name || '(unnamed)'}`);
      const sub = analyzeLayers(layer.children, indent + 1);
      stats.textLayers += sub.textLayers;
      stats.imageLayers += sub.imageLayers;
      stats.groups += sub.groups;
      stats.texts.push(...sub.texts);
    } else if (layer.text) {
      // REAL TEXT LAYER
      stats.textLayers++;
      const fontName = layer.text.style?.font?.name || '?';
      const fontSize = layer.text.style?.fontSize || '?';
      const textContent = (layer.text.text || '').substring(0, 60).replace(/\n/g, '↵');
      stats.texts.push(textContent);
      console.log(`${prefix}✏️  [TEXT] "${layer.name}" → "${textContent}" (${fontName} ${fontSize}pt)`);
    } else {
      // Pixel/image layer
      stats.imageLayers++;
      console.log(`${prefix}🖼️  [Image] ${layer.name || '(unnamed)'}`);
    }
  }
  return stats;
}

// Scan all PSD files
const dirs = [path.join(OUT, 'logos'), path.join(OUT, 'documents')];
let totalFiles = 0;
let totalText = 0;
let totalImage = 0;
let totalGroups = 0;
const fileReports = [];

for (const dir of dirs) {
  if (!fs.existsSync(dir)) continue;
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.psd'));
  for (const file of files) {
    const filepath = path.join(dir, file);
    const relPath = filepath.replace(OUT + '\\', '');
    console.log(`\n${'═'.repeat(60)}`);
    console.log(`📄 ${relPath} (${Math.round(fs.statSync(filepath).size / 1024)} KB)`);
    console.log('═'.repeat(60));

    const buf = fs.readFileSync(filepath);
    const psd = readPsd(buf, { skipLayerImageData: true, skipCompositeImageData: true });

    const stats = analyzeLayers(psd.children);
    totalFiles++;
    totalText += stats.textLayers;
    totalImage += stats.imageLayers;
    totalGroups += stats.groups;

    fileReports.push({
      file: relPath,
      textLayers: stats.textLayers,
      imageLayers: stats.imageLayers,
      groups: stats.groups,
    });

    console.log(`\n  → ${stats.textLayers} calques texte réels | ${stats.imageLayers} calques image | ${stats.groups} groupes`);
  }
}

console.log(`\n${'═'.repeat(60)}`);
console.log('RÉSUMÉ GLOBAL');
console.log('═'.repeat(60));
console.log(`\nFichiers PSD analysés : ${totalFiles}`);
console.log(`Calques texte RÉELS  : ${totalText}`);
console.log(`Calques image (pixel): ${totalImage}`);
console.log(`Groupes de calques   : ${totalGroups}`);
console.log('\nDétail par fichier :');
for (const r of fileReports) {
  const emoji = r.textLayers > 0 ? '✅' : '⚠️';
  console.log(`  ${emoji} ${r.file.padEnd(42)} | ${r.textLayers} texte | ${r.imageLayers} image | ${r.groups} groupes`);
}
