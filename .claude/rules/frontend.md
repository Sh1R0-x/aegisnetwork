# Règles frontend — Aegis Network

## HTML

- Toujours utiliser des balises sémantiques
- Attributs `lang="fr"` sur `<html>`
- Attributs `alt` sur toutes les images
- Navigation avec `aria-label`
- Liens d'ancrage internes pour le one-page (`#section`)

## CSS

- Organisation : reset → variables → base → composants → sections → responsive
- Nommage : classes descriptives en kebab-case (`.hero-cta`, `.benefit-card`)
- Pas de `!important` sauf cas extrême documenté
- Custom properties pour toutes les couleurs et espacements récurrents
- Media queries en `max-width` (mobile-first implicite via clamp/grid)

## JS

- Vanilla uniquement, pas de jQuery, pas de librairie
- IIFE pour éviter les globales
- `"use strict"`
- `addEventListener` avec `{ passive: true }` pour scroll/touch
- IntersectionObserver pour les animations d'apparition (avec fallback)

## Performance

- Pas de framework CSS (Bootstrap, Tailwind, etc.)
- Google Fonts en `display=swap`
- Images futures en WebP avec fallback
- Pas de requête API côté client
- Poids cible : < 150 Ko total (hors fonts)

## Accessibilité minimum

- Contrastes AA sur tous les textes
- Navigation clavier fonctionnelle
- `aria-expanded` sur le menu mobile
- `focus-visible` stylé
- `.sr-only` pour les labels masqués visuellement
