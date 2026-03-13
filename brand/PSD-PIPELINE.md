# Pipeline PSD — Aegis Network

## Vue d'ensemble

Tous les PSD sont générés par **`brand/build-psd-pro.mjs`** — le seul script autorisé.

Les calques de texte sont **éditables** dans Photoshop (pas rastérisés). Chaque calque texte contient à la fois les métadonnées texte (police, taille, couleur, tracking) ET un aperçu pixel pré-rendu pour affichage immédiat à l'ouverture.

## Prérequis

- **Node.js** 18+
- **Dépendances** : `ag-psd`, `@napi-rs/canvas`, `sharp`
- **Polices** : Inter (Medium, SemiBold, Bold, ExtraBold, Black) installées dans le système

```bash
npm install ag-psd @napi-rs/canvas sharp
```

## Générer les PSD

```bash
cd c:\Dev\Aegisnetwork
node brand/build-psd-pro.mjs
```

**Sortie** : `~/Documents/AEGIS_NETWORK_DESIGNER/01_PSD_EDITABLE/`

## Exporter les SVG sources

```bash
node brand/export-svg-sources.mjs
```

**Sortie** : `~/Documents/AEGIS_NETWORK_DESIGNER/03_SOURCES_SVG/`

## Vérifier les PSD

```bash
node brand/verify-psds.mjs
```

Vérifie pour chaque fichier :
- Taille de fichier substantielle (pixel data présent)
- Nombre et type de calques (texte / image)
- Structure lisible sans erreur

> **Note** : `brand/deep-diagnose.mjs` peut être utilisé pour un diagnostic approfondi calque par calque. Cependant, `readPsd` d'ag-psd a des problèmes de compatibilité avec `@napi-rs/canvas` pour le décodage des pixels — les résultats pixel-level ne sont fiables qu'après vérification dans Photoshop.

## Liste des fichiers générés

### Logos (`01_PSD_EDITABLE/logos/`)
| Fichier | Description |
|---------|-------------|
| `logo-master-fond-sombre.psd` | Logo complet sur fond #020617 |
| `logo-master-fond-clair.psd` | Logo complet sur fond blanc |
| `symbol-all-variants.psd` | Symbole triangle dans 4 variantes (dégradé, blanc, bleu, monochrome) |
| `decorative-elements.psd` | Éléments décoratifs (orbes, grilles, motifs réseau) |

### Documents (`01_PSD_EDITABLE/documents/`)
| Fichier | Dimensions | Description |
|---------|-----------|-------------|
| `business-card-recto.psd` | 1075×720px | Carte de visite recto (version accent gauche) |
| `business-card-recto-alt.psd` | 1075×720px | Version alternative (accent haut) |
| `business-card-verso.psd` | 1075×720px | Carte de visite verso (photo + QR) |
| `email-signature-light.psd` | 640×220px | Signature email fond clair |
| `email-signature-dark.psd` | 640×220px | Signature email fond sombre |
| `flyer-A5.psd` | 1748×2480px | Flyer A5 |
| `flyer-A4.psd` | 2480×3508px | Flyer A4 (format étendu) |
| `brochure-page1.psd` | 2480×3508px | Brochure page 1 — Impact & Bénéfices |
| `brochure-page2.psd` | 2480×3508px | Brochure page 2 — Méthodologie & Cas pratiques |

### SVG Sources (`03_SOURCES_SVG/`)
| Dossier | Contenu |
|---------|---------|
| `logos/` | 6 variantes SVG du symbole Aegis (gradient, blanc, bleu × complet/clean) |
| `icons/` | 15 icônes Lucide-style au format SVG |

## Architecture technique

### Résolution : 72 DPI

Tous les PSD sont en **72 DPI** (1 pt = 1 px). Les coordonnées et tailles de police sont directement en pixels.

Pour l'impression, ajuster la résolution dans Photoshop (Image → Taille de l'image → 300 DPI).

### Calques texte

Chaque calque texte contient :
1. **Métadonnées texte** (`text.text`, `text.style`, `text.transform`) → éditable dans Photoshop
2. **Aperçu pixel** (`canvas`) → visible immédiatement à l'ouverture
3. **Bornes** (`top`, `left`, `bottom`, `right`) → positionnement correct

L'option `invalidateTextLayers` n'est **pas** utilisée (Photoshop recevrait l'instruction d'ignorer notre aperçu).

### Polices

| Poids | Fichier | Usage |
|-------|---------|-------|
| 500 (Medium) | Inter-Medium.ttf | Texte courant |
| 600 (SemiBold) | Inter-SemiBold.ttf | Labels, sous-titres |
| 700 (Bold) | Inter-Bold.ttf | Baselines, accents |
| 800 (ExtraBold) | Inter-ExtraBold.ttf | Titres secondaires |
| 900 (Black) | Inter-Black.ttf | Titres principaux, logo |

> **Important** : Seules les polices **statiques** Inter sont enregistrées. Le fichier variable (`Inter-VariableFont_opsz,wght.ttf`) est **exclu** volontairement : ses axes `opsz` et `wght` provoquent des avertissements « représentation de police modifiée » dans Photoshop.

> **Note** : Inter-Regular (400) n'est pas installé en statique. Le poids par défaut est Medium (500).

## Comportement dans Photoshop

### Ce qui fonctionne
- Texte visible immédiatement à l'ouverture
- Calques texte éditables (double-clic)
- Polices, tailles, couleurs, tracking conformes
- Groupes de calques nommés et organisés
- Éléments décoratifs sur calques séparés

### Avertissement connu
Photoshop peut afficher "_La modification ou le rendu du calque de texte changera sa disposition_" lors de la première édition d'un calque texte. C'est normal — l'aperçu pixel ne correspond pas pixel-pour-pixel au moteur de rendu de Photoshop. Le texte sera recalculé avec les bonnes métadonnées.

### Point critique : chargement asynchrone des images

`@napi-rs/canvas` requiert un `await` sur `image.onload` après `image.src = buffer` avant d'appeler `drawImage`. Sans cet await, les pixels ne sont pas disponibles et le canvas reste transparent. C'est le bug principal qui rendait tous les éléments SVG (logos, icônes, décoratifs) invisibles dans les versions précédentes.

```js
// ✗ BROKEN — pixels non disponibles
const img = new CanvasImage();
img.src = pngBuf;
ctx.drawImage(img, 0, 0); // canvas transparent!

// ✓ CORRECT — await onload
const img = new CanvasImage();
img.src = pngBuf;
await new Promise(r => { img.onload = r; });
ctx.drawImage(img, 0, 0); // pixels présents
```

## Scripts archivés

| Fichier | Statut | Raison |
|---------|--------|--------|
| `brand/archive/rebuild-psds.py` | Archivé | Script Python/Pillow — texte rastérisé uniquement |

## Maintenance

Pour modifier un PSD :
1. Éditer `brand/build-psd-pro.mjs` (section du builder concerné)
2. Régénérer : `node brand/build-psd-pro.mjs`
3. Vérifier : `node brand/verify-psds.mjs`
4. Ouvrir un échantillon dans Photoshop pour vérification visuelle
5. Commit + push
