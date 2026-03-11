# Brand — Aegis Network

Dossier contenant l'identité visuelle, les assets de marque et les livrables de communication.

## Structure

```
brand/
  README.md                   ← Ce fichier
  brand-identity.html         ← Charte graphique complète (HTML, exportable PDF)
  brand-identity.md           ← Version markdown de référence
  business-card.html          ← Carte de visite (preview + print-ready)
  email-signature.html        ← Signature email (Outlook/Gmail compatible)
  assets/
    logo-icon-gradient.svg    ← Icône principale (gradient bleu→violet)
    logo-icon-blue.svg        ← Icône monochrome Aegis Blue
    logo-icon-white.svg       ← Icône blanche (fonds colorés/sombres)
    logo-icon-dark.svg        ← Icône sombre (fonds clairs/impression)
    logo-icon-clean.svg       ← Icône épurée sans nodes (petites tailles)
```

## Utilisation

### Charte graphique

Ouvrir `brand-identity.html` dans un navigateur pour la consulter. Pour exporter en PDF :
- Chrome → Imprimer (Ctrl+P) → Destination : PDF → Marges : aucune → Couleurs d'arrière-plan : activé

La version `brand-identity.md` sert de référence texte rapide.

### Carte de visite

Ouvrir `business-card.html` dans un navigateur pour la preview. Deux versions proposées :
- **Principale** : accent vertical gradient à gauche
- **Alternative** : accent horizontal en bandeau haut

Pour l'impression, exporter vers un logiciel vectoriel (Figma, Illustrator) en respectant les specs :
- Format : 85 × 55 mm + 3mm bleed + 5mm safe zone
- Papier recommandé : couché mat 350g/m²
- Finition optionnelle : pelliculage soft-touch + vernis sélectif

### Signature email

Ouvrir `email-signature.html` dans un navigateur. Deux versions :
- **Principale** : avec bloc logo, séparateur, baseline de marque
- **Compacte** : nom + titre + contact sur deux colonnes

Pour intégrer dans Outlook :
1. Ouvrir le fichier dans Chrome
2. Sélectionner la signature dans le cadre blanc
3. Copier (Ctrl+C)
4. Outlook → Fichier → Options → Courrier → Signatures → Coller

### Logos SVG

Les fichiers `assets/logo-icon-*.svg` sont des SVG autonomes, utilisables directement dans :
- Figma / Illustrator / Sketch
- Documents HTML / CSS
- Impressions vectorielles

Pour le site web, le composant React `src/components/AegisLogo.tsx` reste la version de référence (avec animations).

## Notes

- Les couleurs CMYK sont des approximations. Pour un tirage offset professionnel, faire valider les couleurs sur un nuancier Pantone.
- La police Inter est chargée depuis Google Fonts pour le web. Pour les documents Office, utiliser Segoe UI ou Arial comme substitut.
- Les coordonnées utilisées (téléphone, email, localisation) sont celles du site public.
