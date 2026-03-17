# Déploiement OVH Starter — Aegis Network

## Objectif

Déployer le frontend statique buildé dans `dist/` sur OVH Starter, sans build côté hébergeur.

Le dépôt versionne volontairement `dist/` et conserve `.htaccess` à la racine pour :

- forcer HTTPS
- forcer le host canonique `aegisnetwork.fr`
- rediriger `/index.html` et `/dist/*` vers les URLs publiques
- servir le contenu depuis `dist/`
- poser un cache long sur les assets fingerprintés

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

### 2 bis. OVH Starter + API séparée par URL dédiée

Le site statique reste sur OVH Starter et le frontend appelle une API externe définie via `VITE_CONTACT_API_BASE`.

Ce scénario impose :

1. déployer le backend Express sur un hébergement Node.js
2. définir `CORS_ORIGIN=https://aegisnetwork.fr`
3. définir `VITE_CONTACT_API_BASE=https://votre-api.example`
4. rebuild le frontend puis redéployer `dist/`

### 3. OVH Starter seul

Non suffisant si le formulaire doit rester opérationnel.

## Assets statiques publics (images de signature, etc.)

### Mapping URL ↔ filesystem — comment ça fonctionne

Le `.htaccess` racine contient cette règle de réécriture interne :

```apache
RewriteCond %{REQUEST_URI} !^/dist/
RewriteRule ^(.*)$ /dist/$1 [L]
```

Conséquence : **toute URL publique est servie depuis `www/dist/`**, jamais depuis `www/` directement.

```
URL demandée : https://aegisnetwork.fr/<chemin>
→ Apache réécrit en interne vers : /dist/<chemin>
→ Fichier servi : www/dist/<chemin>
```

**Les fichiers placés dans `www/` mais hors de `www/dist/` ne sont jamais accessibles par URL.**

### Ajouter une image publique statique (ex. signature email)

1. Placer le fichier dans `public/signatures/` dans le repo :
   ```
   public/signatures/aegis-logo-compact-512.png
   ```
2. Lancer `npm run build` — Vite copie `public/` dans `dist/` :
   ```
   dist/signatures/aegis-logo-compact-512.png
   ```
3. Déployer (Git push ou FTP de `dist/`) — le fichier se retrouve à :
   ```
   www/dist/signatures/aegis-logo-compact-512.png
   ```
4. URL publique résultante :
   ```
   https://aegisnetwork.fr/signatures/aegis-logo-compact-512.png
   ```

### Fix immédiat via SFTP (sans rebuild)

Si un fichier doit être accessible immédiatement sans rebuild :

```
Déposer dans : /home/aegisno/www/dist/signatures/<fichier>
```

**Attention :** ce fichier sera écrasé au prochain `npm run build` + déploiement si le fichier source n'est pas aussi dans `public/signatures/`.

### Erreurs fréquentes à éviter

| Emplacement serveur             | URL testée              | Résultat  | Pourquoi                                                                 |
| ------------------------------- | ----------------------- | --------- | ------------------------------------------------------------------------ |
| `www/signatures/image.png`      | `/signatures/image.png` | **404**   | Apache cherche `www/dist/signatures/image.png` (réécrit par `.htaccess`) |
| `www/public/image.png`          | `/public/image.png`     | **404**   | Apache cherche `www/dist/public/image.png`                               |
| `www/image.png`                 | `/image.png`            | **404**   | Apache cherche `www/dist/image.png`                                      |
| `www/dist/signatures/image.png` | `/signatures/image.png` | **200 ✓** | Correct : réécrit vers `www/dist/signatures/image.png`                   |

### Usage dans une signature email HTML

```html
<img
  src="https://aegisnetwork.fr/signatures/aegis-logo-compact-512.png"
  alt="Aegis Network"
  width="120"
  style="display:block;"
/>
```

## Vérifications après déploiement

- [ ] la page d'accueil charge sans erreur
- [ ] `https://www.aegisnetwork.fr/` répond avec un certificat valide puis redirige en 301 vers `https://aegisnetwork.fr/`
- [ ] `/index.html` redirige vers `/`
- [ ] `/dist/` et `/dist/index.html` ne restent plus accessibles en 200
- [ ] `dist/assets/*` est bien servi en production
- [ ] les images `dist/img/*.webp` sont accessibles
- [ ] le favicon apparaît
- [ ] la redirection HTTP vers HTTPS fonctionne
- [ ] la navigation one-page fonctionne
- [ ] le responsive mobile et desktop reste correct
- [ ] le formulaire est testé dans le scénario d'hébergement réellement retenu
- [ ] `/mentions-legales/` répond en 200
- [ ] les images de signature dans `dist/signatures/` sont accessibles publiquement

## Action infra manuelle obligatoire — certificat `www`

Le dépôt peut forcer une redirection canonique propre, mais il ne peut pas réparer un certificat TLS absent. Pour éviter l'erreur navigateur sur `https://www.aegisnetwork.fr/`, il faut côté hébergeur :

1. émettre ou attacher un certificat couvrant `aegisnetwork.fr` et `www.aegisnetwork.fr`
2. laisser ensuite Apache appliquer la redirection 301 vers `https://aegisnetwork.fr/`

Sans ce certificat, le navigateur échoue avant même d'atteindre la redirection.

## À retenir

- OVH Starter couvre le site statique
- le formulaire exige un backend Node.js accessible en production
- sans reverse proxy same-origin ou hébergement Node unique, `/api/contact` restera indisponible

Voir [docs/EMAIL_SMTP.md](docs/EMAIL_SMTP.md) pour la configuration du backend mail et [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) pour la structure technique du projet.
