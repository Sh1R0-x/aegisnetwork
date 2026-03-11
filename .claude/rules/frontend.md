# Règles frontend — Aegis Network

## React & TypeScript

- Composants fonctionnels uniquement (pas de classes)
- TypeScript strict, pas d'`any` explicite
- Imports nommés pour les icônes Lucide et les hooks
- Composants dans `src/components/` s'ils sont réutilisables
- Si un composant est spécifique à une section, il reste dans `App.tsx`

## Tailwind CSS

- Utility-first, classes Tailwind directement sur les éléments
- Custom properties dans `@theme` (fichier `src/index.css`)
- Pas de `!important` sauf cas extrême documenté
- Responsive via les préfixes `md:` et `lg:` (mobile-first)
- Classes custom : `glass-card`, `premium-glow`, `glow-button`

## Animations (Framer Motion)

- Package `motion` (import depuis `motion/react`)
- Entrées : `initial={{ opacity: 0, y: 20 }}` → `whileInView={{ opacity: 1, y: 0 }}`
- `viewport={{ once: true }}` pour les animations au scroll
- CSS keyframes pour les effets continus (fiber beams, float, pulse)
- Respecter `prefers-reduced-motion` pour les animations CSS

## Charte graphique

- Optical Blue `#3b82f6` — primaire
- Deep Background `#020617` — fond (slate-950)
- Accent Violet `#7c3aed` — secondaire
- Tracking logo : `0.15em`
- Tracking baseline : `0.25em`
- Titres : Inter Black (900), `tracking-tighter`
- Icônes : Lucide React uniquement

## Performance

- Images : `loading="lazy"`, `referrerPolicy="no-referrer"` pour Unsplash
- Google Fonts en `display=swap`
- Pas de requête API côté client
- Build optimisé via Vite (`npm run build`)

## Accessibilité minimum

- Contrastes AA sur tous les textes
- Navigation clavier fonctionnelle
- `alt` sur toutes les images
- `aria-label` sur les éléments de navigation
