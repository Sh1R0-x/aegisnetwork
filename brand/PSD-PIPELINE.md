# Pipeline PSD — Aegis Network

## État actuel

Le pipeline historique basé sur `ag-psd` n'est **pas** suffisamment fiable pour livrer des PSD de travail Photoshop stables :

- avertissement Photoshop à l'édition des textes ;
- rendu texte recalculé différemment à l'ouverture ;
- structure parfois incomplète selon les exports ;
- sorties écrites hors repo dans `~/Documents/...`, donc peu reproductibles ;
- script principal `brand/build-psd-pro.mjs` en contradiction avec l'objectif "PSD vraiment exploitables".

La **business card** utilise désormais un pipeline **Photoshop natif** via JSX + automatisation COM PowerShell.

## Source de vérité

Ordre à appliquer en cas de conflit :

1. `CLAUDE.md`
2. `README.md`
3. `AEGIS_NETWORK_BASE_REFERENTIEL_V3.md`
4. `design-guidelines.md`
5. `brand/brand-identity.md`
6. previews HTML du dossier `brand/`

Références publiques actuelles pour les supports :

- Téléphone : `04 82 53 26 99`
- Email : `contact@aegisnetwork.fr`
- Site : `https://aegisnetwork.fr/`
- Localisation éditoriale : `Lyon, France`

## Pipeline autorisé

### Business card

Commande :

```bash
cd C:\Dev\Aegisnetwork
node brand/build-business-card-photoshop.mjs
```

Entrées :

- `brand/business-card.html` : preview visuel de référence
- `brand/business-card.config.json` : contenu métier et coordonnées
- `brand/assets/*.svg` : logos sources
- `brand/photoshop/build-business-card.jsx` : construction Photoshop native

Sorties :

- `brand/.generated/business-card/psd/business-card-recto.psd`
- `brand/.generated/business-card/psd/business-card-recto-alt.psd`
- `brand/.generated/business-card/psd/business-card-verso.psd`
- `brand/.generated/business-card/psd/business-card-recto.png`
- `brand/.generated/business-card/psd/business-card-recto-alt.png`
- `brand/.generated/business-card/psd/business-card-verso.png`

## Pourquoi ce pipeline est retenu

Il contourne la limite principale de `ag-psd` : les calques texte sont créés par Photoshop lui-même.

Conséquences :

- textes réellement éditables dans Photoshop ;
- plus d'avertissement structurel lié à la réécriture du texte par `ag-psd` ;
- résolution native `300 PPI` ;
- groupes et calques nommés lisiblement ;
- génération reproductible dans le repo ;
- vérification possible via PNG exportés depuis Photoshop.

## Ce qui reste en legacy

Scripts encore présents pour audit ou génération ancienne :

- `brand/build-psd-pro.mjs`
- `brand/build-psd-v2.mjs`
- `brand/build-designer-package.mjs`
- `brand/archive/rebuild-psds.py`
- `brand/apply-tracking-fix.mjs`
- `brand/verify-psds.mjs`
- `brand/deep-diagnose.mjs`
- `brand/diagnose-psd.mjs`
- `brand/verify-psd-layers.mjs`

Règle :

- ne pas les considérer comme source de vérité pour des PSD de travail ;
- ne pas régénérer les business cards avec ces scripts ;
- les conserver seulement pour audit, comparaison ou migration progressive des autres supports.

## Vérification obligatoire

Après chaque génération business card :

1. vérifier que les 3 PSD et les 3 PNG ont été régénérés dans `brand/.generated/business-card/psd/` ;
2. ouvrir les PNG exportés et comparer avec `brand/business-card.html` ;
3. ouvrir au moins `business-card-recto.psd` dans Photoshop ;
4. confirmer :
   - texte visible immédiatement ;
   - texte éditable sans warning anormal ;
   - groupes `Fond`, `Logo`, `Identite`, `Contact` ;
   - pas de calque vide parasite ;
   - logo et icônes présents ;
   - coordonnées publiques à jour.

## Limites connues

- Les textes sont natifs Photoshop, mais les logos, icônes et effets de fond sont actuellement importés en calques raster séparés.
- Si un besoin impose des logos / icônes 100% vectoriels ou des Smart Objects Illustrator, il faudra une étape de production supplémentaire côté Adobe.
- Le pipeline Photoshop natif est aujourd'hui implémenté pour la business card uniquement ; les autres supports restent à migrer.
- L'automatisation repose sur Photoshop installé localement avec support COM Windows.

## Outils et dépendances

Nécessaires :

- `Photoshop` installé localement ;
- `PowerShell` avec COM Adobe Photoshop ;
- dépendances Node déjà présentes : `sharp`, `@napi-rs/canvas`.

Non nécessaires à ce stade :

- nouveau MCP ;
- nouvelle librairie PSD ;
- Playwright ou Chrome DevTools dans la génération elle-même.

Playwright peut rester utile uniquement pour comparer un preview HTML à un export PNG pendant les contrôles.
