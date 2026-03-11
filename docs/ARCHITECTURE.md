# Architecture — Aegis Network

## Arborescence

```
aegisnetwork/
├── index.html              ← Page unique du site (point d'entrée OVH)
├── favicon.svg             ← Favicon SVG violet avec initiale "A"
├── assets/
│   ├── css/
│   │   └── styles.css      ← Feuille de style unique
│   ├── js/
│   │   └── main.js         ← Script vanilla (nav mobile, animations)
│   └── img/
│       └── README.md       ← Conventions pour les images futures
├── docs/
│   ├── ARCHITECTURE.md     ← Ce fichier
│   ├── DEPLOYMENT_OVH_STARTER.md
│   ├── CONTENT_STRUCTURE.md
│   └── NEXT_STEPS.md
├── .claude/
│   └── rules/
│       ├── frontend.md     ← Règles techniques front-end
│       └── content.md      ← Règles éditoriales
├── CLAUDE.md               ← Règles globales du projet
├── README.md               ← Documentation d'entrée
├── .gitignore
└── .editorconfig
```

## Rôle de chaque fichier

| Fichier | Rôle |
|---------|------|
| `index.html` | Page unique servie par OVH. Contient tout le HTML du site one-page. |
| `assets/css/styles.css` | Styles complets : reset, variables, composants, responsive. |
| `assets/js/main.js` | JS minimal : menu mobile, shadow header au scroll, animations fade-in. |
| `favicon.svg` | Favicon vectoriel léger, fonctionne sur tous les navigateurs modernes. |
| `CLAUDE.md` | Règles de projet pour les assistants IA (contraintes, style, interdictions). |
| `.claude/rules/` | Règles spécialisées (frontend, contenu) pour guider les modifications. |
| `docs/` | Documentation technique et éditoriale pour les contributeurs. |

## Logique des sections HTML

L'`index.html` est découpé en sections sémantiques dans cet ordre :

1. **Header** — Navigation fixe avec liens d'ancrage + menu hamburger mobile
2. **Hero** — Accroche principale, positionnement, CTA
3. **Avantages** — 4 cartes de bénéfices concrets pour le dirigeant
4. **Offres** — 2 cartes : intervention ponctuelle vs accompagnement
5. **Méthode** — 3 étapes : analyse → action → suivi
6. **Contact** — Email + invitation à échanger
7. **Footer** — Copyright + espace pour mentions légales futures

## Choix techniques et justifications

| Choix | Raison |
|-------|--------|
| HTML/CSS/JS statique | Compatibilité OVH Starter, pas de build, déploiement immédiat |
| Pas de framework CSS | Réduction du poids, contrôle total, pas de classes inutiles |
| CSS custom properties | Palette centralisée, facile à modifier pour la DA finale |
| `clamp()` pour les tailles | Typographie fluide sans media queries multiples |
| CSS Grid `auto-fit` | Grilles responsive sans breakpoints rigides |
| IntersectionObserver | Animations légères, natif, pas de librairie |
| Google Fonts (Inter) | Seule dépendance externe, chargée en `display=swap` |
| Favicon SVG | Un seul fichier, léger, scalable, supporté partout sauf IE |
| IIFE en JS | Pas de pollution globale, compatible ES5+ |
| `prefers-reduced-motion` | Accessibilité : désactive les animations si l'utilisateur le demande |
