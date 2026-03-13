/**
 * Deep diagnostic of PSD text layers — check resolution, font names,
 * transform matrices, bounding boxes, and preview canvas state.
 */
import { readPsd } from 'ag-psd';
import { initializeCanvas } from 'ag-psd';
import { createCanvas, Image as CanvasImage } from '@napi-rs/canvas';
import fs from 'fs';
import path from 'path';

initializeCanvas(
  (w, h) => createCanvas(w, h),
  createCanvasFromData
);

function createCanvasFromData(data, w, h) {
  if (typeof data === 'number') {
    // readPsd passes (width, height) — create empty canvas
    return createCanvas(data, w);
  }
  const img = new CanvasImage();
  img.src = Buffer.isBuffer(data) ? data : Buffer.from(data);
  const c = createCanvas(img.width, img.height);
  c.getContext('2d').drawImage(img, 0, 0);
  return c;
}

const OUT = 'C:\\Users\\Ludovic\\Documents\\AEGIS_NETWORK_DESIGNER\\01_PSD_EDITABLE';

// Read one representative PSD deeply
const testFile = path.join(OUT, 'documents', 'business-card-recto.psd');
console.log(`\nReading: ${testFile}\n`);

const buf = fs.readFileSync(testFile);
const psd = readPsd(buf, { skipCompositeImageData: true });

// 1. Check resolution
console.log('=== DOCUMENT INFO ===');
console.log(`Dimensions: ${psd.width} × ${psd.height}`);
console.log(`Resolution info:`, JSON.stringify(psd.imageResources?.resolutionInfo, null, 2));
console.log(`Color mode:`, psd.colorMode);
console.log(`Bits per channel:`, psd.bitsPerChannel);

// 2. Inspect text layers deeply
function inspectLayers(children, indent = 0) {
  if (!children) return;
  for (const layer of children) {
    const pad = '  '.repeat(indent);
    if (layer.children) {
      console.log(`${pad}[Group] "${layer.name}"`);
      inspectLayers(layer.children, indent + 1);
      continue;
    }

    if (layer.text) {
      console.log(`${pad}[TEXT] "${layer.name}"`);
      console.log(`${pad}  content: "${(layer.text.text || '').substring(0, 50)}"`);
      console.log(`${pad}  transform: [${layer.text.transform?.join(', ')}]`);
      console.log(`${pad}  antiAlias: ${layer.text.antiAlias}`);
      console.log(`${pad}  font: ${JSON.stringify(layer.text.style?.font)}`);
      console.log(`${pad}  fontSize: ${layer.text.style?.fontSize}`);
      console.log(`${pad}  fillColor: ${JSON.stringify(layer.text.style?.fillColor)}`);
      console.log(`${pad}  tracking: ${layer.text.style?.tracking}`);
      console.log(`${pad}  leading: ${layer.text.style?.leading}`);
      console.log(`${pad}  autoLeading: ${layer.text.style?.autoLeading}`);
      console.log(`${pad}  bounds: top=${layer.top} left=${layer.left} bottom=${layer.bottom} right=${layer.right}`);
      console.log(`${pad}  has canvas: ${!!layer.canvas}`);
      if (layer.canvas) {
        console.log(`${pad}  canvas size: ${layer.canvas.width}×${layer.canvas.height}`);
      }
      console.log(`${pad}  opacity: ${layer.opacity}`);
      console.log(`${pad}  hidden: ${layer.hidden}`);
      console.log(`${pad}  clipping: ${layer.clipping}`);
      console.log(`${pad}  blendMode: ${layer.blendMode}`);

      // Check paragraphStyle
      if (layer.text.paragraphStyle) {
        console.log(`${pad}  paragraphStyle: ${JSON.stringify(layer.text.paragraphStyle)}`);
      }
      // Check styleRuns
      if (layer.text.styleRuns) {
        console.log(`${pad}  styleRuns: ${layer.text.styleRuns.length} runs`);
        for (const run of layer.text.styleRuns) {
          console.log(`${pad}    run: length=${run.length}, font=${run.style?.font?.name}, size=${run.style?.fontSize}`);
        }
      }
    } else {
      console.log(`${pad}[Image] "${layer.name}" — bounds: ${layer.top},${layer.left} → ${layer.bottom},${layer.right} — has canvas: ${!!layer.canvas}`);
    }
  }
}

console.log('\n=== LAYERS ===');
inspectLayers(psd.children);

// 3. Also check a logo PSD
const logoFile = path.join(OUT, 'logos', 'logo-master-fond-sombre.psd');
console.log(`\n\n=== LOGO PSD: ${path.basename(logoFile)} ===`);
const logoBuf = fs.readFileSync(logoFile);
const logoPsd = readPsd(logoBuf, { skipCompositeImageData: true });
console.log(`Resolution info:`, JSON.stringify(logoPsd.imageResources?.resolutionInfo, null, 2));
inspectLayers(logoPsd.children);
