# Images

Ce dossier accueillera les ressources visuelles du site :

- Logo Aegis Network (quand disponible)
- Illustrations / icônes personnalisées
- Images d'arrière-plan éventuelles

## Formats recommandés

| Usage | Format | Raison |
|-------|--------|--------|
| Logo | SVG | Léger, scalable, net sur tous écrans |
| Photos | WebP + fallback JPG | Compression optimale |
| Icônes | SVG inline ou fichier SVG | Pas de dépendance externe |

## Conventions de nommage

- Tout en minuscules
- Tirets pour séparer les mots : `hero-background.webp`
- Préfixer par usage : `logo-`, `icon-`, `bg-`, `photo-`

## Optimisation

Avant de commit une image :
1. Compresser (TinyPNG, Squoosh, etc.)
2. Dimensions adaptées (pas de 4000px pour un affichage 400px)
3. Poids cible : < 100 Ko par image, < 30 Ko pour les icônes
