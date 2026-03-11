# Déploiement sur OVH Starter

## Principe

Le site Aegis Network est **100 % statique**. Il n'y a aucun build, aucune dépendance serveur. OVH Starter sert directement les fichiers du dépôt Git.

## Prérequis

- Un hébergement OVH Starter actif
- Un dépôt GitHub contenant le code (branche `main`)
- L'association Git configurée dans l'espace client OVH

## Configuration OVH

1. Connectez-vous à l'[espace client OVH](https://www.ovh.com/manager/)
2. Allez dans **Web Cloud → Hébergements → votre hébergement**
3. Section **Multisite** : vérifiez que le domaine pointe vers le bon dossier racine
4. Le `index.html` doit être à la **racine du dossier déployé**

## Liaison avec GitHub

OVH Starter peut se lier à un dépôt Git pour déployer automatiquement :

1. Dans l'espace client, section **Multisite** ou **FTP/SSH**
2. Associez le dépôt GitHub `https://github.com/Sh1R0-x/aegisnetwork.git`
3. Branche : `main`
4. Dossier cible : racine (`/`) ou le dossier configuré dans Multisite

Après chaque push sur `main`, OVH tire les fichiers automatiquement.

## Premier déploiement

```bash
# Depuis le dossier du projet
git init
git add .
git commit -m "Initial commit — site vitrine Aegis Network"
git remote add origin https://github.com/Sh1R0-x/aegisnetwork.git
git branch -M main
git push -u origin main
```

> **Important** : La branche `main` doit contenir des fichiers réels (pas un repo vide) pour qu'OVH puisse déployer. C'est ce premier push qui résout l'erreur OVH actuelle.

## Mise à jour du site

```bash
# Modifier les fichiers localement, puis :
git add .
git commit -m "Description de la modification"
git push
```

OVH redéploie automatiquement après le push.

## Vérification

Après le push :

1. Attendez 1-2 minutes que OVH synchronise
2. Visitez votre domaine dans un navigateur
3. Vérifiez que le site s'affiche correctement
4. Testez sur mobile
5. Vérifiez la console navigateur (F12) : aucune erreur 404 ne doit apparaître

## Structure attendue côté OVH

```
/ (racine hébergement)
├── index.html
├── favicon.svg
└── assets/
    ├── css/styles.css
    ├── js/main.js
    └── img/
```

Les fichiers `docs/`, `.claude/`, `README.md`, `CLAUDE.md`, `.editorconfig` et `.gitignore` seront présents sur le serveur mais ne sont pas servis — ce n'est pas un problème.

## Dépannage

| Problème | Solution |
|----------|----------|
| Page blanche | Vérifier que `index.html` est à la racine |
| Erreur 404 sur CSS/JS | Vérifier les chemins relatifs dans `index.html` |
| Ancien contenu affiché | Vider le cache navigateur (Ctrl+Shift+R) |
| OVH affiche une erreur | Vérifier que la branche `main` contient des fichiers |
