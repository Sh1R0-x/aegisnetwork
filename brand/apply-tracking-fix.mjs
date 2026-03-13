/**
 * AEGIS NETWORK — Tracking Coherence Fix
 * =======================================
 * Applies the final decision:
 *   - Wordmark letter-spacing: 0.06em everywhere
 *   - Increased word-spacing between AEGIS and NETWORK (0.2em)
 *   - SVG lockup: NETWORK x position moved from 250 to 258
 *   - All docs, HTML, CSS, SVG synced
 */

import fs from 'fs';
import path from 'path';

const DELIVERY = 'C:\\Users\\Ludovic\\Documents\\AEGIS NETWORK';
const REPO = 'C:\\Dev\\Aegisnetwork';

let changeLog = [];

function log(file, description) {
  const short = file.replace(DELIVERY + '\\', '[DELIVERY] ').replace(REPO + '\\', '[REPO] ');
  changeLog.push({ file: short, description });
  console.log(`  ✓ ${short}: ${description}`);
}

function replaceInFile(filePath, replacements) {
  if (!fs.existsSync(filePath)) {
    console.log(`  SKIP (not found): ${filePath}`);
    return;
  }
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  for (const [search, replace, desc] of replacements) {
    if (typeof search === 'string') {
      if (content.includes(search)) {
        content = content.replaceAll(search, replace);
        changed = true;
        log(filePath, desc || `"${search}" → "${replace}"`);
      }
    } else {
      // Regex
      const before = content;
      content = content.replace(search, replace);
      if (content !== before) {
        changed = true;
        log(filePath, desc || `regex replacement`);
      }
    }
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
  }
}

console.log('╔══════════════════════════════════════════════════════╗');
console.log('║  AEGIS NETWORK — Tracking Coherence Fix             ║');
console.log('╚══════════════════════════════════════════════════════╝\n');

// ═══════════════════════════════════════════════════════════════════
// 1. DOCUMENTATION UPDATES
// ═══════════════════════════════════════════════════════════════════
console.log('▸ 1. Documentation updates...\n');

// design-guidelines.md (repo root)
replaceInFile(path.join(REPO, 'design-guidelines.md'), [
  ['`0.08em` for the main title "AEGIS NETWORK"',
   '`0.06em` for the main title "AEGIS NETWORK" (with `word-spacing: 0.2em` for increased inter-word gap)',
   'Wordmark tracking 0.08em → 0.06em + word-spacing note'],
]);

// stitch/design-guidelines.md (reference)
replaceInFile(path.join(REPO, 'stitch', 'design-guidelines.md'), [
  ['`0.15em` for the main title "AEGIS NETWORK"',
   '`0.06em` for the main title "AEGIS NETWORK" (with `word-spacing: 0.2em` for increased inter-word gap)',
   'Wordmark tracking 0.15em → 0.06em'],
  ['`0.08em` for the main title "AEGIS NETWORK"',
   '`0.06em` for the main title "AEGIS NETWORK" (with `word-spacing: 0.2em` for increased inter-word gap)',
   'Wordmark tracking 0.08em → 0.06em'],
]);

// CLAUDE.md (repo)
replaceInFile(path.join(REPO, 'CLAUDE.md'), [
  ['`0.08em` pour "AEGIS NETWORK"',
   '`0.06em` pour "AEGIS NETWORK" (+ word-spacing 0.2em)',
   'Wordmark tracking 0.08em → 0.06em'],
]);

// brand-identity.md (delivery)
replaceInFile(path.join(DELIVERY, '02_BRAND_MANUAL', 'aegis-network-brand-identity.md'), [
  ['letter-spacing: 0.08em',
   'letter-spacing: 0.06em; word-spacing: 0.2em',
   'Wordmark tracking 0.08em → 0.06em + word-spacing'],
  ['| Wordmark "AEGIS NETWORK" | 0.08em |',
   '| Wordmark "AEGIS NETWORK" | 0.06em (+ word-spacing: 0.2em) |',
   'Tracking table: 0.08em → 0.06em'],
]);

// ═══════════════════════════════════════════════════════════════════
// 2. BRAND-IDENTITY HTML (delivery + source)
// ═══════════════════════════════════════════════════════════════════
console.log('\n▸ 2. Brand identity HTML...\n');

const brandIdentityReplacements = [
  // L176: CSS .brand-lockup brand name
  ['letter-spacing: 0.08em; line-height: 1;',
   'letter-spacing: 0.06em; word-spacing: 0.2em; line-height: 1;',
   'CSS brand lockup: 0.08em → 0.06em + word-spacing'],

  // L368: cover title
  ['style="letter-spacing: 0.08em; font-size: 2.5rem;">AEGIS <span',
   'style="letter-spacing: 0.06em; word-spacing: 0.2em; font-size: 2.5rem;">AEGIS <span',
   'Cover title: 0.08em → 0.06em + word-spacing'],

  // L933: tracking table row (wordmark)
  ['<tr><td>Wordmark "AEGIS NETWORK"</td><td>0.08em</td><td style="letter-spacing: 0.08em; font-weight: 900; color: #fff;">AEGIS NETWORK</td></tr>',
   '<tr><td>Wordmark "AEGIS NETWORK"</td><td>0.06em</td><td style="letter-spacing: 0.06em; word-spacing: 0.2em; font-weight: 900; color: #fff;">AEGIS NETWORK</td></tr>',
   'Tracking table: wordmark demo 0.08em → 0.06em'],

  // L1115: business card preview recto brand text (two spans)
  ['letter-spacing:0.08em; color:#0F172A;">AEGIS </span><span style="font-size:0.65rem; font-weight:900; letter-spacing:0.08em; color:#2563EB;">NETWORK',
   'letter-spacing:0.06em; word-spacing:0.2em; color:#0F172A;">AEGIS </span><span style="font-size:0.65rem; font-weight:900; letter-spacing:0.06em; color:#2563EB;">NETWORK',
   'Business card preview recto: 0.08em → 0.06em'],

  // L1142: business card preview verso title
  ['letter-spacing:0.08em; color:#fff;">AEGIS <span style="color:#3B82F6;">NETWORK',
   'letter-spacing:0.06em; word-spacing:0.2em; color:#fff;">AEGIS <span style="color:#3B82F6;">NETWORK',
   'Business card preview verso: 0.08em → 0.06em'],
];

// Apply to both delivery and source
replaceInFile(path.join(DELIVERY, '02_BRAND_MANUAL', 'aegis-network-brand-identity.html'), brandIdentityReplacements);
replaceInFile(path.join(DELIVERY, '09_SOURCES', 'brand_identity', 'brand-identity.html'), brandIdentityReplacements);

// ═══════════════════════════════════════════════════════════════════
// 3. BUSINESS CARD HTML (delivery + source)
// ═══════════════════════════════════════════════════════════════════
console.log('\n▸ 3. Business card HTML...\n');

// Delivery version (already has 0.08em)
replaceInFile(path.join(DELIVERY, '03_BUSINESS_CARD', 'aegis-network-business-card.html'), [
  // L73 CSS
  ['letter-spacing: 0.08em; color: var(--slate-900); }',
   'letter-spacing: 0.06em; word-spacing: 0.2em; color: var(--slate-900); }',
   'CSS recto-brand-text: 0.08em → 0.06em'],
  // L122 CSS
  ['letter-spacing: 0.08em; color: #fff; }',
   'letter-spacing: 0.06em; word-spacing: 0.2em; color: #fff; }',
   'CSS verso-title: 0.08em → 0.06em'],
  // L370 inline recto
  ['letter-spacing:0.08em; color:#0F172A;">AEGIS <span',
   'letter-spacing:0.06em; word-spacing:0.2em; color:#0F172A;">AEGIS <span',
   'Inline recto: 0.08em → 0.06em'],
  // L408 inline verso
  ['letter-spacing:0.08em; color:#fff; margin:0;">AEGIS <span',
   'letter-spacing:0.06em; word-spacing:0.2em; color:#fff; margin:0;">AEGIS <span',
   'Inline verso: 0.08em → 0.06em'],
]);

// Source version (has 0.15em)
replaceInFile(path.join(DELIVERY, '09_SOURCES', 'brand_identity', 'business-card.html'), [
  // L73 CSS
  ['letter-spacing: 0.15em; color: var(--slate-900); }',
   'letter-spacing: 0.06em; word-spacing: 0.2em; color: var(--slate-900); }',
   'CSS recto-brand-text: 0.15em → 0.06em'],
  // L122 CSS
  ['letter-spacing: 0.15em; color: #fff; }',
   'letter-spacing: 0.06em; word-spacing: 0.2em; color: #fff; }',
   'CSS verso-title: 0.15em → 0.06em'],
  // L370 inline recto
  ['letter-spacing:0.15em; color:#0F172A;">AEGIS <span',
   'letter-spacing:0.06em; word-spacing:0.2em; color:#0F172A;">AEGIS <span',
   'Inline recto: 0.15em → 0.06em'],
  // L408 inline verso
  ['letter-spacing:0.15em; color:#fff; margin:0;">AEGIS <span',
   'letter-spacing:0.06em; word-spacing:0.2em; color:#fff; margin:0;">AEGIS <span',
   'Inline verso: 0.15em → 0.06em'],
]);

// ═══════════════════════════════════════════════════════════════════
// 4. EMAIL SIGNATURES HTML (delivery + source)
// ═══════════════════════════════════════════════════════════════════
console.log('\n▸ 4. Email signatures HTML...\n');

// Both delivery and source have letter-spacing: 0.15em at L74
// Need to see the context around it
const emailFiles = [
  path.join(DELIVERY, '04_EMAIL_SIGNATURE', 'aegis-network-email-signatures.html'),
  path.join(DELIVERY, '09_SOURCES', 'brand_identity', 'email-signature.html'),
];
for (const f of emailFiles) {
  if (!fs.existsSync(f)) continue;
  let content = fs.readFileSync(f, 'utf8');

  // The 0.15em at L74 is in a CSS class for the brand name
  // Replace only the wordmark-related 0.15em (in CSS for brand/logo text)
  // Looking at the context: this is .aegis-brand or similar class for AEGIS NETWORK
  const replaced = content.replace(
    /letter-spacing:\s*0\.15em;/g,
    (match, offset) => {
      // Check surrounding context to determine if this is wordmark-related
      const context = content.substring(Math.max(0, offset - 200), offset + 200);
      if (context.includes('brand') || context.includes('logo') || context.includes('title') ||
          context.includes('AEGIS') || context.includes('aegis')) {
        return 'letter-spacing: 0.06em; word-spacing: 0.2em;';
      }
      return match; // Keep non-wordmark 0.15em as-is
    }
  );

  if (replaced !== content) {
    fs.writeFileSync(f, replaced, 'utf8');
    log(f, 'Email signature: 0.15em → 0.06em + word-spacing for wordmark');
  }
}

// ═══════════════════════════════════════════════════════════════════
// 5. SVG LOCKUP WORD SPACING (move NETWORK x position)
// ═══════════════════════════════════════════════════════════════════
console.log('\n▸ 5. SVG lockup word spacing...\n');

const svgLockups = [
  'aegis-logo-fond-sombre.svg',
  'aegis-logo-fond-clair.svg',
];

const svgDirs = [
  path.join(DELIVERY, '01_LOGOS', 'svg'),
  path.join(DELIVERY, '05_PRINT_ASSETS'),
  path.join(DELIVERY, '06_DIGITAL_ASSETS'),
  path.join(DELIVERY, '09_SOURCES', 'logo_sources'),
];

for (const dir of svgDirs) {
  for (const svg of svgLockups) {
    const fp = path.join(dir, svg);
    if (!fs.existsSync(fp)) continue;
    replaceInFile(fp, [
      // Move NETWORK x from 250 to 258 for wider gap
      ['x="250" y="55"', 'x="258" y="55"', 'SVG NETWORK x: 250 → 258 (wider word gap)'],
    ]);
  }
}

// Also update the repo workspace SVGs if they exist in public/ or similar
const repoSvgDir = path.join(REPO, 'public');
if (fs.existsSync(repoSvgDir)) {
  for (const svg of svgLockups) {
    const fp = path.join(repoSvgDir, svg);
    if (fs.existsSync(fp)) {
      replaceInFile(fp, [
        ['x="250" y="55"', 'x="258" y="55"', 'SVG NETWORK x: 250 → 258'],
      ]);
    }
  }
}

// ═══════════════════════════════════════════════════════════════════
// 6. BROCHURE SOURCE (TSX)
// ═══════════════════════════════════════════════════════════════════
console.log('\n▸ 6. Brochure source TSX...\n');

replaceInFile(path.join(DELIVERY, '08_BROCHURE', 'brochure-source-page.tsx'), [
  // L90: header wordmark
  ['letterSpacing: "0.08em", textTransform: "uppercase", lineHeight: 1',
   'letterSpacing: "0.06em", wordSpacing: "0.2em", textTransform: "uppercase", lineHeight: 1',
   'Header wordmark: 0.08em → 0.06em + wordSpacing'],
  // L434: footer wordmark
  ['letterSpacing: "0.08em", textTransform: "uppercase"',
   'letterSpacing: "0.06em", wordSpacing: "0.2em", textTransform: "uppercase"',
   'Footer wordmark: 0.08em → 0.06em + wordSpacing'],
]);

// ═══════════════════════════════════════════════════════════════════
// 7. SYNC: Copy delivery files to 09_SOURCES (business card)
// ═══════════════════════════════════════════════════════════════════
console.log('\n▸ 7. Syncing delivery ↔ sources...\n');

// The delivery business card is now the reference → copy to sources
const bcDelivery = path.join(DELIVERY, '03_BUSINESS_CARD', 'aegis-network-business-card.html');
const bcSource = path.join(DELIVERY, '09_SOURCES', 'brand_identity', 'business-card.html');
if (fs.existsSync(bcDelivery) && fs.existsSync(bcSource)) {
  fs.copyFileSync(bcDelivery, bcSource);
  log(bcSource, 'Synced from delivery (business card is now identical)');
}

// Sync brand-identity.html
const biDelivery = path.join(DELIVERY, '02_BRAND_MANUAL', 'aegis-network-brand-identity.html');
const biSource = path.join(DELIVERY, '09_SOURCES', 'brand_identity', 'brand-identity.html');
if (fs.existsSync(biDelivery) && fs.existsSync(biSource)) {
  fs.copyFileSync(biDelivery, biSource);
  log(biSource, 'Synced from delivery (brand-identity is now identical)');
}

// Sync email signatures
const esDelivery = path.join(DELIVERY, '04_EMAIL_SIGNATURE', 'aegis-network-email-signatures.html');
const esSource = path.join(DELIVERY, '09_SOURCES', 'brand_identity', 'email-signature.html');
if (fs.existsSync(esDelivery) && fs.existsSync(esSource)) {
  fs.copyFileSync(esDelivery, esSource);
  log(esSource, 'Synced from delivery (email signatures is now identical)');
}

// ═══════════════════════════════════════════════════════════════════
// 8. DESIGNER PACKAGE SYNC
// ═══════════════════════════════════════════════════════════════════
console.log('\n▸ 8. Updating designer package copies...\n');

const DESIGNER = 'C:\\Users\\Ludovic\\Documents\\AEGIS_NETWORK_DESIGNER';
if (fs.existsSync(DESIGNER)) {
  // Update SVGs in designer package
  const designerSvgDir = path.join(DESIGNER, '00_MASTER_VECTOR', 'svg');
  for (const svg of svgLockups) {
    const srcSvg = path.join(DELIVERY, '01_LOGOS', 'svg', svg);
    const destSvg = path.join(designerSvgDir, svg);
    if (fs.existsSync(srcSvg) && fs.existsSync(destSvg)) {
      fs.copyFileSync(srcSvg, destSvg);
      log(destSvg, 'Synced SVG from delivery');
    }
  }

  // Update archive HTML files
  const archiveDir = path.join(DESIGNER, '04_ARCHIVE_REFERENCE');
  const archiveSync = [
    [path.join(DELIVERY, '02_BRAND_MANUAL', 'aegis-network-brand-identity.html'), 'brand-identity.html'],
    [path.join(DELIVERY, '02_BRAND_MANUAL', 'aegis-network-brand-identity.md'), 'brand-identity.md'],
    [path.join(DELIVERY, '03_BUSINESS_CARD', 'aegis-network-business-card.html'), 'business-card.html'],
    [path.join(DELIVERY, '04_EMAIL_SIGNATURE', 'aegis-network-email-signatures.html'), 'email-signatures.html'],
    [path.join(DELIVERY, '08_BROCHURE', 'brochure-source-page.tsx'), 'brochure-source-page.tsx'],
  ];
  for (const [src, destName] of archiveSync) {
    const dest = path.join(archiveDir, destName);
    if (fs.existsSync(src) && fs.existsSync(archiveDir)) {
      fs.copyFileSync(src, dest);
      log(dest, `Synced ${destName}`);
    }
  }
}

// ═══════════════════════════════════════════════════════════════════
// REPORT
// ═══════════════════════════════════════════════════════════════════
console.log('\n╔══════════════════════════════════════════════════════╗');
console.log('║  ✓ Tracking coherence fix complete                   ║');
console.log('╚══════════════════════════════════════════════════════╝');
console.log(`\nTotal changes: ${changeLog.length}`);
console.log('\nChange log:');
for (const c of changeLog) {
  console.log(`  ${c.file}`);
  console.log(`    → ${c.description}`);
}
