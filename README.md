# Aegis Network

Site vitrine one-page d'Aegis Network, dédié au conseil, à l'audit et à l'optimisation des infrastructures IT et télécom pour TPE et PME.

`main` est la branche de production et `origin/main` la référence du dépôt.

## Périmètre du dépôt

Ce dépôt contient uniquement ce qui est nécessaire au site et à son déploiement :

- `src/` : application React 19 + TypeScript
- `server/` : API Express `POST /api/contact`
- `public/` : assets strictement utilisés par le site en production
- `dist/` : build de production versionné
- `docs/` : documentation technique du site

Les livrables de marque, PSD, supports imprimés, sources Google Stitch, previews et pipelines designer ne vivent plus dans ce repo.

## Ressources design externes

Le dossier officiel pour tous les éléments brand/design/livrables est :

- `C:\Users\Ludovic\Documents\AEGIS NETWORK`

Le point d'entrée documentaire à utiliser est :

- `C:\Users\Ludovic\Documents\AEGIS NETWORK\00_INDEX_ET_DOCS\PATHS_AND_RULES.md`

Le repo ne doit plus contenir :

- PSD, PSB, AI, exports designer
- previews HTML de supports non runtime
- anciens packages `brand/` ou `stitch/`
- archives graphiques et snapshots Google Stitch

## Stack

- React 19
- TypeScript 5
- Tailwind CSS 4
- Vite 6
- Motion
- Lucide React
- Express 4
- Nodemailer

## Démarrage local

```bash
npm install
npm run dev
```

Le site de développement est servi sur `http://localhost:3000`.

Lancer l'API locale si le formulaire doit être testé :

```bash
npm run server:dev
```

L'API écoute sur `http://localhost:3001`. En développement, Vite proxifie `/api/*` vers ce serveur.

## Vérifications locales

```bash
npm run lint
npm run build
```

- `npm run lint` vérifie la cohérence TypeScript du frontend
- `npm run build` génère `dist/` et valide le build de production

## Déploiement

Le dépôt versionne volontairement `dist/` car le site statique est synchronisé vers l'hébergement OVH Starter. Le `.htaccess` :

- force l'URL canonique `https://aegisnetwork.fr/`
- redirige `/index.html` et `/dist/*` vers leurs URLs publiques
- sert les fichiers depuis `dist/`
- applique un cache long sur les assets fingerprintés, mais pas sur les HTML/XML/TXT

Point important : le frontend appelle par défaut `/api/contact` en same-origin. Si l'API est hébergée séparément, le build peut être pointé vers elle via `VITE_CONTACT_API_BASE`.

Deux modes de production sont cohérents avec l'état actuel du code :

1. un hébergement Node.js qui sert à la fois `dist/` et l'API Express
2. un site statique sur OVH Starter avec :
   - soit un reverse proxy same-origin pour `/api/*` vers un backend Node.js séparé
   - soit un backend Node.js séparé exposé sur une autre URL et référencé via `VITE_CONTACT_API_BASE`

Sans l'un de ces deux montages, le site s'affiche mais le formulaire ne peut pas envoyer d'e-mails.

## Variables d'environnement

Le dépôt fournit un exemple dans [`.env.example`](.env.example).

Règles à respecter :

- ne jamais commiter de `.env`
- ne jamais commiter `SMTP_PASS`
- garder les secrets uniquement côté serveur
- définir `VITE_CONTACT_API_BASE` uniquement si l'API de production n'est pas same-origin

## Structure utile

```text
.
|-- .htaccess
|-- public/
|-- src/
|-- server/
|-- dist/
`-- docs/
```

## Documentation

- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) : vue technique détaillée
- [docs/DEPLOYMENT_OVH_STARTER.md](docs/DEPLOYMENT_OVH_STARTER.md) : déploiement du statique sur OVH Starter
- [docs/EMAIL_SMTP.md](docs/EMAIL_SMTP.md) : configuration du backend mail et contraintes SMTP
- [docs/EXTERNAL_DESIGN_ASSETS.md](docs/EXTERNAL_DESIGN_ASSETS.md) : emplacement officiel des assets design externes
