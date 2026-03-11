# Déploiement OVH Starter — Aegis Network

## Prérequis

- Node.js 18+ installé localement
- Accès FTP ou File Manager OVH

## Build

```bash
npm install          # Installer les dépendances (1ère fois ou après mise à jour)
npm run build        # Génère le dossier dist/
```

Le dossier `dist/` contient un site statique complet (HTML + JS + CSS bundlés).

## Déploiement

### Via FTP

1. Lancer `npm run build` en local
2. Se connecter au FTP OVH (identifiants dans l'espace client)
3. Uploader le **contenu** de `dist/` à la racine du `www/` OVH
4. Vérifier que `index.html` est bien à la racine de `www/`

### Via GitHub Actions (optionnel)

Si configuré, le workflow peut builder et déployer automatiquement sur push.

## Vérification

Après déploiement, vérifier :

- [ ] La page se charge correctement
- [ ] Les animations fonctionnent
- [ ] Les images s'affichent
- [ ] Le favicon apparaît
- [ ] La navigation par ancres fonctionne
- [ ] Le site est responsive (mobile / tablette / desktop)

## Structure attendue sur OVH

```
www/
  index.html          ← Fichier principal
  assets/
    index-XXXX.js     ← Bundle JS (généré par Vite)
    index-XXXX.css    ← Bundle CSS (généré par Vite)
  favicon.svg
  img/
    photo-*.jfif      ← Images du site
```

## Notes

- OVH Starter sert des fichiers statiques uniquement — pas de Node.js côté serveur
- Le build Vite produit des assets avec hash pour le cache busting
- Pas de `.htaccess` nécessaire pour un SPA one-page sans routeur
