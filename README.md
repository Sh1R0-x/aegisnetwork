# Aegis Network

Site vitrine one-page haute-performance pour Aegis Network — fournisseur d'accès internet et de téléphonie professionnelle.

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
index.html              Point d'entrée Vite (dev)
src/
  main.tsx              Bootstrap React
  App.tsx               Composant racine (toutes les sections)
  index.css             Tailwind + CSS custom (animations, glass, glow)
  components/           Composants réutilisables
    AegisLogo.tsx       Logo SVG animé
public/
  favicon.svg           Favicon
  img/                  Images locales (Unsplash)
stitch/                 Source Google Stitch (lecture seule)
  design-guidelines.md  Charte graphique de référence
docs/                   Documentation technique
.claude/rules/          Règles pour assistants IA
.vscode/                Réglages VS Code partagés
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

Le contenu du dossier `dist/` (généré par `npm run build`) doit être poussé ou copié à la racine de l'hébergement OVH. Voir [docs/DEPLOYMENT_OVH_STARTER.md](docs/DEPLOYMENT_OVH_STARTER.md).

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
5. `git add . && git commit -m "Description" && git push origin main`

## Workflow Google Stitch

Les mises à jour design viennent de Google Stitch → dossier `stitch/`. Pour intégrer une update : comparer `stitch/src/` avec `src/`, appliquer les deltas. Ne jamais modifier `stitch/` directement.

## Documentation

| Document | Contenu |
|----------|---------|
| [CLAUDE.md](CLAUDE.md) | Règles du projet |
| [AGENTS.md](AGENTS.md) | Règles d'exécution pour agents IA |
| [design-guidelines.md](design-guidelines.md) | Charte graphique complète |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | Architecture et choix techniques |
| [docs/DEPLOYMENT_OVH_STARTER.md](docs/DEPLOYMENT_OVH_STARTER.md) | Guide de déploiement |
| [docs/WORKFLOW_COLLABORATION.md](docs/WORKFLOW_COLLABORATION.md) | Workflow multi-outils |
| [docs/NEXT_STEPS.md](docs/NEXT_STEPS.md) | Prochaines étapes |

## Documentation utile

- [AGENTS.md](AGENTS.md) : règles d'exécution pour agents et MCP
- [CLAUDE.md](CLAUDE.md) : contraintes projet et style
- [docs/WORKFLOW_COLLABORATION.md](docs/WORKFLOW_COLLABORATION.md) : workflow commun entre outils
- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) : choix techniques
- [docs/DEPLOYMENT_OVH_STARTER.md](docs/DEPLOYMENT_OVH_STARTER.md) : déploiement OVH
