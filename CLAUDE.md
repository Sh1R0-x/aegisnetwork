# CLAUDE.md — Règles projet Aegis Network

## Identité

- Site vitrine one-page pour Aegis Network
- Cible : TPE et PME, dirigeants et responsables IT
- Activité : **conseil, audit et optimisation** en infrastructures IT et télécommunications
- Design source : généré et mis à jour via **Google Stitch** (dossier `stitch/`)

## Positionnement métier

Aegis Network est un **consultant / accompagnateur / chef de projet IT** indépendant.

**Ce qu'Aegis fait :**
- Auditer l'infrastructure IT et télécom existante
- Identifier les surcoûts et les sous-performances
- Comparer les offres du marché et faire jouer la concurrence
- Conseiller les meilleures options adaptées au contexte client
- Renégocier ou challenger les contrats en place
- Piloter les changements techniques (migration, déploiement)
- Suivre la performance et ajuster dans le temps

**Ce qu'Aegis ne fait PAS :**
- Fournir directement l'accès internet ou la fibre
- Opérer un réseau télécom
- Vendre des abonnements ou des équipements
- Garantir des SLA opérateur en son nom propre
- Héberger des infrastructures

**Axe central du site :** optimisation + pilotage + gains économiques + gains de productivité

## MCP

- **Seul MCP utilisé** : `context7` — documentation technique récente et versionnée
- `playwright` et `chrome-devtools` restent configurés dans `.mcp.json` mais ne sont pas nécessaires au workflow courant
- Ne pas ajouter de nouveau MCP sans justification claire et gain concret immédiat
- Si `context7` peut fournir l'info, ne pas improviser de mémoire

## Stack technique

- **React 19** + **TypeScript**
- **Tailwind CSS 4** (via plugin Vite)
- **Framer Motion** (`motion` package) pour les animations
- **Lucide React** pour les icônes
- **Vite 6** comme bundler de dev et de build
- **Inter** (Google Fonts) comme typographie principale
- Build : `npm run build` → dossier `dist/`
- Hébergement : `dist/` est versionné et déployé sur OVH Starter via `.htaccess` (réécriture vers `dist/`)

## Structure

```
index.html          ← point d'entrée Vite (dev)
.htaccess           ← réécriture Apache pour servir dist/ sur OVH
src/
  main.tsx          ← bootstrap React
  App.tsx           ← composant racine, toutes les sections
  index.css         ← Tailwind + custom CSS (animations, glass, glow)
  components/       ← composants réutilisables (AegisLogo, etc.)
public/
  favicon.svg       ← favicon
  img/              ← images locales (Unsplash downloads)
dist/               ← build de production (versionné, déployé sur OVH)
stitch/             ← source Google Stitch (référence design, lecture seule)
docs/               ← documentation technique
```

## Sections du site (App.tsx)

Navbar → Hero → Stats → Solutions → VoIPSection → OptimisationSection → CTASection → ContactSection → Footer (+ LegalModal)

La section BrandBook a été supprimée.

## Informations de contact

- Téléphone : 07 81 43 81 23
- Email : contact@aegisnetwork.fr
- Localisation : Lyon, France

Ne jamais modifier ces informations sans validation explicite.

## Style de code

- Composants React fonctionnels (pas de classes)
- TypeScript strict, pas d'`any` explicite
- Tailwind utility-first, custom properties dans `@theme` (index.css)
- Navigation via `scrollToSection()` (pas de `<a href="#">` natif)
- Indentation : 2 espaces
- Encoding : UTF-8, LF
- Code lisible, pas de minification manuelle

## Charte graphique (source : design-guidelines.md)

- **Optical Blue** : `#3b82f6` — couleur primaire, accents, glows
- **Deep Background** : `#020617` — fond principal (slate-950)
- **Accent Violet** : `#7c3aed` — couleur secondaire, dégradés
- **Tracking logo** : `0.15em` pour "AEGIS NETWORK"
- **Tracking baseline** : `0.25em` pour "Conseil & Optimisation IT"
- **Typo titres** : Inter Black (900), tracking-tighter
- **Effets** : glassmorphism, premium-glow, glow-button, fiber beams, float
- **Ton visuel** : premium, technologique, sobre, pas cyberpunk

## Copywriting

- Français, ton professionnel et rassurant
- Phrases courtes, concrètes, orientées résultat
- Pas de jargon inutile, pas de promesses vides
- Pas de superlatifs gratuits ("le meilleur", "n°1", "révolutionnaire")
- Axes : optimisation, pilotage, réduction des coûts, productivité, accompagnement
- Aegis Network est présenté comme consultant/chef de projet, jamais comme opérateur ou fournisseur
- Ne jamais inventer d'informations légales, d'adresse ou de téléphone

## Mentions légales

- Intégrées dans une modal accessible depuis le footer
- Composant `LegalModal` dans `App.tsx`
- Placeholders `TODO:` pour les données non confirmées (SIRET, forme juridique, directeur de publication)
- Hébergeur OVH documenté avec adresse réelle
- Pas de politique de confidentialité séparée tant qu'aucun cookie/analytics n'est actif

## Interdictions

- Ne pas ajouter de pages supplémentaires (one-page)
- Ne pas ajouter de CMS ou de formulaire backend fonctionnel
- Ne pas ajouter de cookie banner sans besoin réel
- Ne pas ajouter d'analytics sans validation explicite
- Ne pas modifier le dossier `stitch/` (lecture seule, source Stitch)
- Ne pas ajouter de dépendances lourdes sans justification

## Stratégie de navigation

- Navigation JS sans hash URL : `scrollToSection()` avec `scrollIntoView({ behavior: 'smooth' })`
- Section active détectée via `IntersectionObserver` (rootMargin: `-80px 0px -50% 0px`)
- `scroll-padding-top: 5rem` en CSS pour compenser le header fixe
- Liens `<a href="#section">` conservés pour la sémantique mais neutralisés par `preventDefault()`

## Animations

- Framer Motion pour les entrées en viewport (`whileInView`, `initial`)
- Stagger délay sur les listes de features (0.1–0.15s)
- Hero : fond animé CSS pur (orbes gradient en dérive lente, grille tech, fiber beams premium)
- Hero float : amplitude réduite (8px / 8s) pour confort visuel
- Hero éléments overlay : pulsation douce (6s) + rotation lente (30s)
- CSS keyframes pour fiber beams, float, pulse-slow, hero-glow-drift, stat-highlight
- CountUp : durée 1000ms avec glow bleu à la complétion (`stat-highlight`)
- `prefers-reduced-motion` respecté (désactive toutes les animations CSS)

## Images

- Stockées localement dans `public/img/` (copies Unsplash)
- Référencées en `/img/filename.jfif` (pas de CDN externe)
- `loading="lazy"` sur toutes les images sauf Hero

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
