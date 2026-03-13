# MANIFEST — Aegis Network Designer Package

> Régénéré après correctif pipeline (async onload + static fonts) — `build-psd-pro.mjs`

## Structure du package

```
AEGIS_NETWORK_DESIGNER/
├── 01_PSD_EDITABLE/
│   ├── logos/           ← Logos et éléments décoratifs (8 PSD)
│   └── documents/       ← Cartes, signatures, flyers, brochure (9 PSD)
├── 03_SOURCES_SVG/
│   ├── logos/           ← 6 variantes SVG du symbole Aegis
│   └── icons/           ← 15 icônes Lucide-style SVG
└── MANIFEST.md          ← Ce fichier
```

## PSD — Logos (01_PSD_EDITABLE/logos/)

| Fichier | Taille | Calques | Résolution |
|---------|--------|:---:|:---:|
| logo-master-fond-sombre.psd | 2 801 KB | 7 (3T + 4I) | 72 PPI |
| logo-master-fond-clair.psd | 1 389 KB | 5 (3T + 2I) | 72 PPI |
| symbol-all-variants.psd | 2 307 KB | 5 (0T + 5I) | 72 PPI |
| decorative-elements.psd | 548 KB | 3 (0T + 3I) | 72 PPI |
| lockup-fond-sombre.psd | 473 KB | 6 (3T + 3I) | 72 PPI |
| lockup-fond-clair.psd | 285 KB | 5 (3T + 2I) | 72 PPI |
| monochromes-all.psd | 1 842 KB | 4 (0T + 4I) | 72 PPI |
| wordmark-variants.psd | 310 KB | 10 (6T + 4I) | 72 PPI |

## PSD — Documents (01_PSD_EDITABLE/documents/)

| Fichier | Dimensions | Taille | Calques | Format physique |
|---------|-----------|--------|:---:|:---:|
| business-card-recto.psd | 1075×720 | 262 KB | 17 (6T + 11I) | 91×61 mm @ 300dpi |
| business-card-recto-alt.psd | 1075×720 | 216 KB | 16 (6T + 10I) | 91×61 mm @ 300dpi |
| business-card-verso.psd | 1075×720 | 325 KB | 9 (3T + 6I) | 91×61 mm @ 300dpi |
| email-signature-light.psd | 640×220 | 241 KB | 16 (6T + 10I) | Écran |
| email-signature-dark.psd | 640×220 | 237 KB | 16 (6T + 10I) | Écran |
| flyer-A5.psd | 1748×2480 | 3 698 KB | 67 (31T + 36I) | A5 @ 300dpi |
| flyer-A4.psd | 2480×3508 | 6 276 KB | 67 (31T + 36I) | A4 @ 300dpi |
| brochure-page1.psd | 2480×3508 | 5 638 KB | 71 (37T + 34I) | A4 @ 300dpi |
| brochure-page2.psd | 2480×3508 | 5 771 KB | 60 (30T + 30I) | A4 @ 300dpi |

## SVG — Sources (03_SOURCES_SVG/)

### Logos (6 fichiers)
- `aegis-symbol-gradient.svg` — Symbole complet, dégradé bleu→violet
- `aegis-symbol-white.svg` — Symbole complet, blanc pur
- `aegis-symbol-blue.svg` — Symbole complet, bleu optique
- `aegis-symbol-clean-gradient.svg` — Triangle seul, dégradé
- `aegis-symbol-clean-white.svg` — Triangle seul, blanc
- `aegis-symbol-clean-blue.svg` — Triangle seul, bleu

### Icônes (15 fichiers)
alertTriangle, arrowRight, bolt, chart, checkCircle, clipboard, globe, lock, mail, mapPin, networkGlobe, phone, shieldCheck, trendingUp, users

## Calques texte — Spécifications techniques

- **Format** : Calques texte PSD natifs (éditables dans Photoshop)
- **Aperçu** : Chaque calque contient un rendu pixel pré-calculé (visible immédiatement)
- **Police** : Inter (Medium 500 / SemiBold 600 / Bold 700 / ExtraBold 800 / Black 900)
- **Résolution** : 72 PPI (coordonnées en pixels = points)
- **Anti-aliasing** : Smooth
- **Bornes** : Calculées automatiquement depuis le rendu

## Limites connues

1. **Résolution 72 PPI** : les fichiers print (cartes, flyers, brochure) ont des dimensions en pixels calibrées pour 300 DPI d'impression, mais la résolution PSD est en 72 PPI. Pour imprimer, ajuster la résolution dans Photoshop (Image → Taille de l'image → 300 PPI, sans rééchantillonnage).

2. **Avertissement Photoshop** : "_La modification ou le rendu du calque de texte changera sa disposition_" peut apparaître à la première édition d'un calque texte. L'aperçu pixel ne correspond pas au rendu exact du moteur Photoshop, mais les métadonnées (police, taille, couleur) sont correctes.

3. **Inter-Regular (400)** : non installé en statique. Le poids par défaut est Medium (500).

4. **Polices statiques uniquement** : la police variable Inter (`Inter-VariableFont_opsz,wght.ttf`) est exclue pour éviter les avertissements « représentation de police modifiée » dans Photoshop. Seules les versions statiques (Medium, SemiBold, Bold, ExtraBold, Black) sont utilisées.

5. **Tracking** : le rendu pixel utilise `letterSpacing = tracking × fontSize`. L'écart avec le moteur Photoshop est négligeable.

## Script source

- **Générateur** : `brand/build-psd-pro.mjs`
- **Vérification** : `brand/verify-psds.mjs`
- **Diagnostic avancé** : `brand/deep-diagnose.mjs`
- **Export SVG** : `brand/export-svg-sources.mjs`
- **Archivé** : `brand/archive/rebuild-psds.py` (Python/Pillow, obsolète)
- **Documentation** : `brand/PSD-PIPELINE.md`
