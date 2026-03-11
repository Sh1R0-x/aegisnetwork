# CLAUDE.md — Règles projet Aegis Network

## Identité

- Site vitrine one-page pour Aegis Network
- Cible : entreprises, professionnels
- Activité : fournisseur d'accès internet et téléphonie pro haute-performance
- Design source : généré et mis à jour via **Google Stitch** (dossier `stitch/`)

## MCP

- Priorité : `context7`, `playwright`, `chrome-devtools`
- `context7` : documentation technique récente et versionnée ; si l'info peut venir de là, ne pas improviser
- `playwright` : smoke tests navigateur, parcours simples, vérifications UI de base
- `chrome-devtools` : debug console, réseau, layout, performance
- `github` : optionnel, seulement si le besoin concerne réellement GitHub
- Rester simple et pragmatique ; ne pas multiplier les MCP sans raison
- Ne pas ajouter de nouveau MCP sans justification claire

## Stack technique

- **React 19** + **TypeScript**
- **Tailwind CSS 4** (via plugin Vite)
- **Framer Motion** (`motion` package) pour les animations
- **Lucide React** pour les icônes
- **Vite 6** comme bundler de dev et de build
- **Inter** (Google Fonts) comme typographie principale
- Build : `npm run build` → dossier `dist/`
- Hébergement : le dossier `dist/` est déployé sur OVH Starter

## Structure

```
index.html          ← point d'entrée Vite (dev)
src/
  main.tsx          ← bootstrap React
  App.tsx           ← composant racine, toutes les sections
  index.css         ← Tailwind + custom CSS (animations, glass, glow)
  components/       ← composants réutilisables (AegisLogo, etc.)
public/
  favicon.svg       ← favicon
  img/              ← images locales (Unsplash downloads)
stitch/             ← source Google Stitch (référence design, lecture seule)
docs/               ← documentation technique
```

## Style de code

- Composants React fonctionnels (pas de classes)
- TypeScript strict, pas d'`any` explicite
- Tailwind utility-first, custom properties dans `@theme` (index.css)
- Indentation : 2 espaces
- Encoding : UTF-8, LF
- Code lisible, pas de minification manuelle

## Charte graphique (source : design-guidelines.md)

- **Optical Blue** : `#3b82f6` — couleur primaire, accents, glows
- **Deep Background** : `#020617` — fond principal (slate-950)
- **Accent Violet** : `#7c3aed` — couleur secondaire, dégradés
- **Tracking logo** : `0.15em` pour "AEGIS NETWORK"
- **Tracking baseline** : `0.25em` pour "High-Performance Connectivity"
- **Typo titres** : Inter Black (900), tracking-tighter
- **Effets** : glassmorphism, premium-glow, glow-button, fiber beams, float
- **Ton visuel** : premium, technologique, sobre, pas cyberpunk

## Copywriting

- Français, ton professionnel et rassurant
- Phrases courtes, concrètes, orientées résultat
- Pas de jargon inutile, pas de promesses vides
- Pas de superlatifs gratuits ("le meilleur", "n°1", "révolutionnaire")
- Axes : performance, fiabilité, connectivité, productivité, accompagnement
- Ne jamais inventer d'informations légales, d'adresse ou de téléphone

## Interdictions

- Ne pas ajouter de pages supplémentaires (one-page)
- Ne pas ajouter de CMS ou de formulaire backend fonctionnel
- Ne pas ajouter de cookie banner sans besoin réel
- Ne pas ajouter d'analytics sans validation explicite
- Ne pas modifier le dossier `stitch/` (lecture seule, source Stitch)
- Ne pas ajouter de dépendances lourdes sans justification

## Workflow Google Stitch

- Les mises à jour design viennent de Google Stitch → dossier `stitch/`
- Pour intégrer une update Stitch : comparer `stitch/src/` avec `src/`, appliquer les deltas
- `stitch/design-guidelines.md` est la référence graphique à jour
- Ne jamais modifier `stitch/` directement — c'est une copie de la source Stitch

## Workflow de collaboration (Claude / Copilot / Codex)

- Toujours travailler depuis la racine du repo (`c:\Dev\Aegisnetwork`)
- Toujours lire la doc projet (`CLAUDE.md`, `README.md`, `AGENTS.md`) avant modification
- Toujours vérifier `git status` avant toute intervention
- Ne pas modifier de fichiers en dehors du repo
- Mettre à jour la documentation après tout changement structurant
- Privilégier des patchs minimaux et ciblés
- Signaler clairement les hypothèses prises
- Laisser le repo dans un état compréhensible pour l'outil suivant
- GitHub (`main`) est la source de vérité — toujours push après modification
