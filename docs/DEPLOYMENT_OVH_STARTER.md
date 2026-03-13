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

### Stratégie actuelle

Le dépôt GitHub contient à la fois les sources et le dossier `dist/` (build de production). Le `.htaccess` à la racine redirige toutes les requêtes vers `dist/`.

Le déploiement consiste à synchroniser le dépôt entier sur OVH. Aucune étape de build côté serveur n'est nécessaire.

### Via Git (recommandé)

1. `npm run build` en local
2. `git add -A && git commit && git push origin main`
3. Déclencher le déploiement depuis OVH (pull ou sync)

### Via FTP

1. Lancer `npm run build` en local
2. Se connecter au FTP OVH
3. Uploader le dépôt complet (incluant `dist/` et `.htaccess`)
4. Vérifier que `.htaccess` est bien à la racine `www/`

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
  .htaccess             ← Réécriture vers dist/ + redirection HTTPS
  dist/
    index.html          ← Fichier principal (buildé)
    assets/
      index-XXXX.js     ← Bundle JS
      index-XXXX.css    ← Bundle CSS
    favicon.svg
    img/
      photo-*.jfif
```

## HTTPS

- Le `.htaccess` inclut une redirection HTTP → HTTPS (301)
- Toutes les URLs externes (fonts, images Unsplash) sont déjà en HTTPS
- Aucun mixed content
- **Action manuelle requise** : activer le certificat SSL/TLS depuis l'espace client OVH

## Notes

- OVH Starter sert des fichiers statiques uniquement — pas de Node.js côté serveur
- Le build Vite produit des assets avec hash pour le cache busting
- Le `.htaccess` gère la réécriture vers `dist/` et la redirection HTTPS

## Serveur API (formulaire de contact)

Le formulaire de contact nécessite un serveur Node.js (Express + Nodemailer) pour l'envoi d'e-mails via SMTP OVH. OVH Starter ne supporte pas Node.js.

**Options de déploiement pour l'API :**

1. **Hébergement Node.js séparé** (Render, Railway, OVH VPS…) : l'API tourne sur un serveur dédié, le site statique reste sur OVH Starter
2. **Migration vers un hébergement Node.js** : Express sert à la fois l'API et les fichiers statiques `dist/`

Voir `docs/EMAIL_SMTP.md` pour la configuration complète du serveur API et de l'envoi SMTP.
