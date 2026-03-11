# Aegis Network — Site vitrine

Site one-page statique pour Aegis Network. Infrastructure et sécurité IT pour TPE/PME.

> **Source de vérité** : le dépôt GitHub `Sh1R0-x/aegisnetwork`, branche `main`.

## Structure du projet

```
index.html              Page unique du site
favicon.svg             Favicon
assets/
  css/styles.css        Feuille de style
  js/main.js            Script (nav mobile, animations)
  img/                  Images futures
docs/                   Documentation technique
  ARCHITECTURE.md       Architecture et choix techniques
  DEPLOYMENT_OVH_STARTER.md  Guide de déploiement OVH
  CONTENT_STRUCTURE.md  Structure éditoriale
  NEXT_STEPS.md         Améliorations prévues
  WORKFLOW_COLLABORATION.md  Workflow multi-outils
  MCP.md                Serveurs MCP retenus
.claude/rules/          Règles pour assistants IA
.vscode/                Réglages VS Code partagés
CLAUDE.md               Règles globales du projet
AGENTS.md               Règles MCP pour agents IA
.mcp.json               Config MCP projet
```

## Ouvrir le bon dossier dans VS Code

```
code c:\Dev\Aegisnetwork
```

Vérifier qu'on est bien à la racine :
- Le fichier `index.html` doit être visible à la racine de l'explorateur
- Le terminal intégré doit afficher `C:\Dev\Aegisnetwork>`
- `git status` doit fonctionner sans erreur

## Prévisualiser localement

Ouvrir `index.html` directement dans un navigateur, ou lancer un serveur local :

```bash
# Python 3
python -m http.server 8000

# Puis ouvrir http://localhost:8000
```

Ou avec l'extension VS Code **Live Server** : clic droit sur `index.html` → "Open with Live Server".

## Modifier le contenu

Tout le contenu est dans `index.html`. Les textes sont directement dans le HTML, organisés par sections clairement commentées :

- `<!-- ====== HERO ====== -->` — Accroche principale
- `<!-- ====== AVANTAGES ====== -->` — Bénéfices clients
- `<!-- ====== OFFRES ====== -->` — Offres ponctuelle et accompagnement
- `<!-- ====== MÉTHODE ====== -->` — Étapes de travail
- `<!-- ====== CONTACT ====== -->` — Coordonnées et CTA
- `<!-- ====== FOOTER ====== -->` — Pied de page

Pour modifier les couleurs ou le design : éditer les variables CSS dans `assets/css/styles.css` (bloc `:root`).

## Déployer sur OVH Starter

Voir le guide complet : [docs/DEPLOYMENT_OVH_STARTER.md](docs/DEPLOYMENT_OVH_STARTER.md)

En résumé :

```bash
git add .
git commit -m "Description de la modification"
git push origin main
```

OVH tire automatiquement le contenu de la branche `main`.

## Premier push sur main

Le premier push a déjà été effectué. Pour les modifications suivantes :

```bash
git add .
git commit -m "Description courte de la modification"
git push origin main
```

## Contraintes techniques

- **Statique uniquement** : HTML + CSS + JS vanilla
- **Aucun build nécessaire** : pas de npm, Webpack, Vite
- **Aucune dépendance serveur** : pas de Node.js, pas de PHP, pas de DB
- **Compatible OVH Starter** : `index.html` à la racine = le site fonctionne

## Documentation

| Document | Contenu |
|----------|---------|
| [CLAUDE.md](CLAUDE.md) | Règles du projet |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | Architecture et choix techniques |
| [docs/DEPLOYMENT_OVH_STARTER.md](docs/DEPLOYMENT_OVH_STARTER.md) | Guide de déploiement |
| [docs/CONTENT_STRUCTURE.md](docs/CONTENT_STRUCTURE.md) | Structure éditoriale |
| [docs/NEXT_STEPS.md](docs/NEXT_STEPS.md) | Prochaines étapes |
| [docs/WORKFLOW_COLLABORATION.md](docs/WORKFLOW_COLLABORATION.md) | Workflow multi-outils |
| [docs/MCP.md](docs/MCP.md) | Serveurs MCP retenus |
| [AGENTS.md](AGENTS.md) | Règles MCP pour agents IA |
