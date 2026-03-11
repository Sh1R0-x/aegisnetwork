# CLAUDE.md — Règles projet Aegis Network

## Identité

- Site vitrine one-page pour Aegis Network
- Cible : dirigeants TPE/PME
- Activité : infrastructure et sécurité IT

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
