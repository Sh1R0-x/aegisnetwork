# CLAUDE.md — Règles projet Aegis Network

## Identité

- Site vitrine one-page pour Aegis Network
- Cible : dirigeants TPE/PME
- Activité : infrastructure et sécurité IT

## MCP

- Priorité : `context7`, `playwright`, `chrome-devtools`
- `context7` : documentation technique récente et versionnée ; si l'info peut venir de là, ne pas improviser
- `playwright` : smoke tests navigateur, parcours simples, vérifications UI de base
- `chrome-devtools` : debug console, réseau, layout, performance
- `github` : optionnel, seulement si le besoin concerne réellement GitHub
- Rester simple et pragmatique ; ne pas multiplier les MCP sans raison
- Ne pas ajouter de nouveau MCP sans justification claire

## Contraintes techniques absolues

- **Statique uniquement** : HTML + CSS + JS vanilla
- **Pas de build** : pas de npm, Vite, Webpack, PostCSS, Sass en prod
- **Pas de framework** : pas de React, Vue, Next, Nuxt, Astro
- **Pas de Node.js côté serveur**
- **Pas de base de données**
- **Pas de Docker**
- **Hébergement OVH Starter** : le dossier racine sert `index.html` directement
- **Zéro dépendance npm** dans le repo

## Structure

```
index.html          ← page unique, point d'entrée
assets/css/         ← feuilles de style
assets/js/          ← scripts vanilla
assets/img/         ← images (futures)
favicon.svg         ← favicon SVG
docs/               ← documentation technique
```

## Style de code

- HTML sémantique (`<header>`, `<main>`, `<section>`, `<footer>`)
- CSS custom properties pour la palette (pas de valeurs magiques)
- JS en IIFE, `"use strict"`, pas de `var` global
- Indentation : 2 espaces
- Encoding : UTF-8, LF
- Pas de minification manuelle — le code reste lisible

## Copywriting

- Français, ton professionnel et rassurant
- Phrases courtes, concrètes, orientées résultat
- Pas de jargon inutile, pas de promesses vides
- Pas de superlatifs gratuits ("le meilleur", "n°1", "révolutionnaire")
- Axes : sécurité, fiabilité, optimisation, réduction des coûts, accompagnement humain
- Ne jamais inventer d'informations légales, d'adresse ou de téléphone

## Design

- Palette principale : violet (`#7c3aed` → `#4c1d95`)
- Neutres : gris zinc
- Responsive mobile-first testé à 320px, 768px, 1024px+
- Pas d'animations lourdes — respecter `prefers-reduced-motion`
- Typographie : Inter (Google Fonts), fallback system-ui

## Interdictions

- Ne pas ajouter de pages supplémentaires (one-page)
- Ne pas ajouter de CMS ou de formulaire backend
- Ne pas ajouter de cookie banner sans besoin réel
- Ne pas ajouter d'analytics sans validation explicite
- Ne pas utiliser de CDN pour des frameworks JS

## Workflow de collaboration (Claude / Copilot / Codex)

- Toujours travailler depuis la racine du repo (`c:\Dev\Aegisnetwork`)
- Toujours lire la doc projet (`CLAUDE.md`, `README.md`, `AGENTS.md`) avant modification
- Toujours vérifier `git status` avant toute intervention
- Ne pas modifier de fichiers en dehors du repo
- Ne pas introduire de stack incompatible OVH Starter
- Mettre à jour la documentation après tout changement structurant
- Privilégier des patchs minimaux et ciblés
- Signaler clairement les hypothèses prises
- Laisser le repo dans un état compréhensible pour l'outil suivant
- GitHub (`main`) est la source de vérité — toujours push après modification
