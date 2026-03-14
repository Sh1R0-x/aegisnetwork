# Assets Design Externes

## Règle

Le repo `C:\Dev\Aegisnetwork` ne contient plus les livrables designer.

Tous les éléments suivants vivent désormais dans :

- `C:\Users\Ludovic\Documents\AEGIS NETWORK`

Cela couvre notamment :

- PSD et PSB
- previews HTML de supports
- exports PNG/PDF designer
- sources vectorielles hors runtime
- snapshots Google Stitch
- pipelines Photoshop / scripts designer
- archives et versions obsolètes

## Point d'entrée

Lire en priorité :

- `C:\Users\Ludovic\Documents\AEGIS NETWORK\00_INDEX_ET_DOCS\PATHS_AND_RULES.md`
- `C:\Users\Ludovic\Documents\AEGIS NETWORK\00_INDEX_ET_DOCS\DELIVERY_INDEX.md`
- `C:\Users\Ludovic\Documents\AEGIS NETWORK\00_INDEX_ET_DOCS\MIGRATION_LOG.md`

## Impact pour le repo site

Le repo doit rester limité à :

- code frontend
- backend Express/Nodemailer
- assets runtime réellement servis au site
- documentation technique du site
- configuration et déploiement

## Interdit dans ce repo

- recréer `brand/`
- recréer `stitch/`
- commiter des PSD, PSB, AI, exports PDF designer
- remettre des sources HTML de supports imprimés dans le dépôt site
