# Déploiement OVH Starter — Aegis Network

## Objectif

Déployer le frontend statique buildé dans `dist/` sur OVH Starter, sans build côté hébergeur.

Le dépôt versionne volontairement `dist/` et conserve `.htaccess` à la racine pour :

- forcer HTTPS
- servir le contenu depuis `dist/`

## Prérequis

- Node.js 18+ en local
- accès OVH au dossier web (`www/`) ou à la synchronisation Git/FTP

## Build local

```bash
npm install
npm run build
```

Le build produit :

- `dist/index.html`
- `dist/assets/index-*.js`
- `dist/assets/index-*.css`
- `dist/favicon.svg`
- `dist/img/*.webp`

## Déploiement du statique

### Via Git

1. exécuter `npm run build`
2. committer `dist/` avec le reste du dépôt
3. pousser sur `origin/main`
4. déclencher la synchronisation OVH si nécessaire

### Via FTP ou File Manager

1. exécuter `npm run build`
2. envoyer `.htaccess` à la racine du dossier web
3. envoyer le dossier `dist/`
4. vérifier que les URLs publiques pointent bien sur le même domaine final

## Structure attendue

```text
www/
|-- .htaccess
`-- dist/
    |-- index.html
    |-- favicon.svg
    |-- assets/
    `-- img/
```

## Limitation importante

OVH Starter ne sait servir que des fichiers statiques. Il ne peut pas exécuter l'API Express du dépôt.

Le code frontend appelle actuellement `/api/contact` en same-origin. En conséquence :

- le site statique seul fonctionne pour l'affichage
- le formulaire de contact ne fonctionne pas sur un simple dépôt OVH Starter sans routage API complémentaire

## Scénarios de production cohérents

### 1. Hébergement Node.js unique

Le backend Express sert `dist/` et `/api/contact` sur le même domaine.

C'est le montage le plus simple avec l'état actuel du code.

### 2. OVH Starter + reverse proxy same-origin

Le site statique reste sur OVH Starter, mais `/api/*` est proxyfié sur le même domaine vers un backend Node.js séparé.

Ce scénario exige un routage infra supplémentaire hors de ce dépôt.

### 3. OVH Starter seul

Non suffisant si le formulaire doit rester opérationnel.

## Vérifications après déploiement

- [ ] la page d'accueil charge sans erreur
- [ ] `dist/assets/*` est bien servi en production
- [ ] les images `dist/img/*.webp` sont accessibles
- [ ] le favicon apparaît
- [ ] la redirection HTTP vers HTTPS fonctionne
- [ ] la navigation one-page fonctionne
- [ ] le responsive mobile et desktop reste correct
- [ ] le formulaire est testé dans le scénario d'hébergement réellement retenu

## À retenir

- OVH Starter couvre le site statique
- le formulaire exige un backend Node.js accessible en production
- sans reverse proxy same-origin ou hébergement Node unique, `/api/contact` restera indisponible

Voir [docs/EMAIL_SMTP.md](docs/EMAIL_SMTP.md) pour la configuration du backend mail et [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) pour la structure technique du projet.
