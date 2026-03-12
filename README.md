# Aegis Network

Site vitrine one-page pour Aegis Network — conseil, audit et optimisation en infrastructures IT et télécommunications pour TPE et PME.

> **Source de vérité** : GitHub `Sh1R0-x/aegisnetwork`, branche `main`.

## Stack technique

- **React 19** + **TypeScript**
- **Tailwind CSS 4** (plugin Vite)
- **Framer Motion** (`motion`) pour les animations
- **Lucide React** pour les icônes
- **Vite 6** comme bundler
- **Inter** (Google Fonts) comme typographie principale
- Design source : **Google Stitch** (dossier `stitch/`)

## Structure du repo

```
index.html              Point d'entrée Vite (dev) + preload hero
.htaccess              Réécriture Apache (dist/ + HTTPS)
src/
  main.tsx              Bootstrap React (StrictMode)
  App.tsx               Composant racine (~1950 lignes, toutes les sections)
  index.css             Tailwind @theme + 15 keyframes + classes custom
  components/           Composants réutilisables
    AegisLogo.tsx       Logo SVG animé (gradient + nœuds réseau)
public/
  favicon.svg           Favicon (shield Aegis)
  img/                  5 images locales (copies Unsplash)
dist/                   Build de production (versionné, déployé sur OVH)
brand/                  Assets de marque (logo, carte de visite, flyer, brochure)
stitch/                 Source Google Stitch (lecture seule)
  design-guidelines.md  Charte graphique de référence
  elements/Elements.tsx UI Kit Stitch
docs/                   Documentation technique
.claude/rules/          Règles pour assistants IA
```

## Démarrage rapide

```bash
npm install
npm run dev
```

Le site est accessible sur `http://localhost:3000`.

## Build pour production

```bash
npm run build
```

Le dossier `dist/` contient le site statique prêt à déployer sur OVH Starter.

## Déploiement OVH Starter

Le dépôt contient les sources et le dossier `dist/` (build). Le `.htaccess` redirige les requêtes vers `dist/` et force HTTPS.

```bash
npm run build              # Génère dist/
git add -A && git commit && git push origin main
```

Ensuite déclencher le déploiement OVH (sync du repo). Voir [docs/DEPLOYMENT_OVH_STARTER.md](docs/DEPLOYMENT_OVH_STARTER.md).

## Prévisualiser le build

```bash
npm run preview
```

## Vérifier le workspace

```powershell
code c:\Dev\Aegisnetwork
git rev-parse --show-toplevel   # doit retourner C:/Dev/Aegisnetwork
git status --short --branch
git remote -v                   # doit pointer vers Sh1R0-x/aegisnetwork.git
```

## Modifier le site

1. Lire `CLAUDE.md` et `design-guidelines.md` avant toute modification
2. `git status --short --branch`
3. Modifier les fichiers dans `src/`
4. Tester avec `npm run dev`
5. `npm run build`
6. `git add -A && git commit -m "Description" && git push origin main`

## Workflow Google Stitch

Les mises à jour design viennent de Google Stitch → dossier `stitch/`. Pour intégrer une update : comparer `stitch/src/` avec `src/`, appliquer les deltas. Ne jamais modifier `stitch/` directement.

## Documentation

| Document | Contenu |
|----------|---------|
| [CLAUDE.md](CLAUDE.md) | Règles projet, identité, contraintes |
| [AGENTS.md](AGENTS.md) | Règles d'exécution pour agents IA |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | Architecture technique détaillée |
| [docs/DEPLOYMENT_OVH_STARTER.md](docs/DEPLOYMENT_OVH_STARTER.md) | Guide de déploiement OVH |
| [docs/WORKFLOW_COLLABORATION.md](docs/WORKFLOW_COLLABORATION.md) | Workflow multi-agents |
| [docs/MCP.md](docs/MCP.md) | Serveurs MCP configurés |
| [design-guidelines.md](design-guidelines.md) | Charte graphique complète |


