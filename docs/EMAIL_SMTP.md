# Configuration Email SMTP — Aegis Network

> Dernière mise à jour : 13 mars 2026

## Vue d'ensemble

Le formulaire de contact envoie les données via `POST /api/contact` à un serveur Express/Node.js qui utilise Nodemailer pour envoyer les e-mails via le SMTP OVH.

**Deux e-mails sont envoyés à chaque soumission :**
1. **Notification interne** → `contact@aegisnetwork.fr` (From: `website@aegisnetwork.fr`, Reply-To: email du visiteur)
2. **Accusé de réception** → email du visiteur (From: `website@aegisnetwork.fr`, Reply-To: `contact@aegisnetwork.fr`)

**Authentification SMTP :** `contact@aegisnetwork.fr` (boîte OVH MX Plan réelle).
**Adresse d'expédition visible (From) :** `website@aegisnetwork.fr` (alias/redirection configuré côté OVH).

## Configuration rapide

### 1. Copier les variables d'environnement

```bash
cp .env.example .env
```

### 2. Renseigner le mot de passe SMTP

Définir la variable d'environnement `SMTP_PASS` **uniquement côté serveur** (jamais dans le code, jamais dans `.env.example`) :

```bash
# Fichier .env local (développement)
SMTP_PASS=votre_mot_de_passe_smtp

# Ou en variable d'environnement système (production)
export SMTP_PASS=votre_mot_de_passe_smtp
```

C'est le mot de passe de la boîte `contact@aegisnetwork.fr` configurée chez OVH (espace client OVH → Emails → Gérer le mot de passe).

### 3. Démarrer le serveur

```bash
# Développement (avec rechargement automatique)
npm run server:dev

# Production
npm run server
```

Le serveur écoute sur le port 3001 par défaut. Au démarrage, il vérifie la connexion SMTP et affiche le résultat dans la console.

## Variables d'environnement

| Variable | Valeur par défaut | Description |
|---|---|---|
| `SMTP_HOST` | `smtp.mail.ovh.net` | Serveur SMTP OVH |
| `SMTP_PORT` | `465` | Port SMTP (SSL) |
| `SMTP_SECURE` | `true` | Connexion SSL/TLS |
| `SMTP_USER` | `contact@aegisnetwork.fr` | Identifiant SMTP (boîte réelle) |
| `SMTP_PASS` | *(absent — à définir en env serveur)* | Mot de passe SMTP (**ne jamais commiter**) |
| `CONTACT_TO` | `contact@aegisnetwork.fr` | Destinataire des notifications |
| `CONTACT_FROM_NAME` | `AEGIS NETWORK` | Nom d'expéditeur affiché |
| `CONTACT_FROM_EMAIL` | `website@aegisnetwork.fr` | Adresse From visible (alias) |
| `PORT` | `3001` | Port du serveur API |
| `CORS_ORIGIN` | `http://localhost:3000` | Une ou plusieurs origines CORS autorisées, séparées par des virgules |
| `VITE_CONTACT_API_BASE` | *(vide)* | URL de l'API de production si le frontend n'appelle pas `/api/*` en same-origin |

### OVH Email Pro

Le projet est configuré pour une offre **OVH MX Plan** (confirmé). Si l'offre devait migrer vers Email Pro, modifier le host :

```
SMTP_HOST=pro1.mail.ovh.net
```

### Alias `website@aegisnetwork.fr`

L'adresse `website@aegisnetwork.fr` est utilisée comme adresse d'expédition visible (From). Elle doit être configurée comme **alias ou redirection** vers `contact@aegisnetwork.fr` dans l'espace client OVH :

1. Espace client OVH → Emails → `aegisnetwork.fr`
2. Créer une redirection : `website@aegisnetwork.fr` → `contact@aegisnetwork.fr`
3. Cela permet à OVH d'accepter l'envoi avec ce From via le compte SMTP `contact@`

**Sans cet alias, les mails risquent d'être rejetés par le serveur SMTP OVH.**

## Architecture serveur

```
server/
  index.ts           ← Point d'entrée Express
  tsconfig.json      ← Config TypeScript (séparée du frontend)
  lib/
    mailer.ts        ← Transporter Nodemailer + fonctions d'envoi
    templates.ts     ← Templates HTML + texte brut des e-mails
    validation.ts    ← Validation et sanitisation des données
  routes/
    contact.ts       ← Route POST /api/contact
```

### Flux de la requête

```
[Formulaire React]
  → POST /api/contact (JSON)
  → Rate limiter (5 req / 15 min / IP)
  → Validation + sanitisation
  → Vérification honeypot
  → Envoi notification interne (Nodemailer → SMTP OVH)
  → Envoi accusé de réception (Nodemailer → SMTP OVH)
  → Réponse JSON { success: true }
```

## Protections anti-abus

| Protection | Détail |
|---|---|
| **Rate limiting** | 5 requêtes max par IP toutes les 15 minutes (`express-rate-limit`) |
| **Honeypot** | Champ caché `_honeypot` — si rempli, la soumission est ignorée silencieusement |
| **Validation serveur** | Tous les champs validés et sanitisés côté serveur |
| **Taille limitée** | Body JSON limité à 16 KB |
| **Timeouts SMTP** | Connection: 10s, Greeting: 10s, Socket: 15s |

## Sécurité du mot de passe SMTP

### Règles strictes

- `SMTP_PASS` est le **vrai mot de passe** de la boîte `contact@aegisnetwork.fr`
- Il ne doit **jamais** être :
  - hardcodé dans le code source
  - présent dans `.env.example`
  - exposé côté client / navigateur
  - loggé dans la console ou les fichiers de log
  - commité dans le repo Git
- Il doit **toujours** être stocké en variable d'environnement serveur uniquement

### Pourquoi on ne peut pas hasher le mot de passe SMTP

Contrairement à un mot de passe utilisateur stocké en base de données, le mot de passe SMTP **ne peut pas être hashé**. L'application doit présenter le mot de passe en clair au serveur SMTP OVH pour s'authentifier (protocole SMTP AUTH). Il n'existe pas d'alternative type token ou clé API sur OVH MX Plan.

**Recommandations :**
- Utiliser un **mot de passe fort et unique** pour la boîte `contact@aegisnetwork.fr`
- Ne pas réutiliser ce mot de passe ailleurs
- Le changer périodiquement (espace client OVH → Emails → Gérer le mot de passe)
- Si l'hébergement le permet, utiliser des secrets managés (ex. : variables d'environnement chiffrées sur Render, Railway, etc.)

## Templates d'e-mail

Les templates sont dans `server/lib/templates.ts`. Chaque template existe en version HTML et texte brut.

### Modifier le contenu

Les textes sont centralisés et faciles à modifier :
- `buildInternalNotification()` — notification interne
- `buildAcknowledgment()` — accusé de réception au visiteur

Structure de chaque template :
- `subject` : objet du mail
- `text` : version texte brut
- `html` : version HTML (inline styles pour compatibilité email)

## Développement local

En dev, deux processus tournent en parallèle :

```bash
# Terminal 1 : Vite dev server (frontend)
npm run dev          # → http://localhost:3000

# Terminal 2 : Express API server
npm run server:dev   # → http://localhost:3001
```

Le `vite.config.ts` contient un proxy qui redirige `/api/*` vers le serveur Express, donc le frontend appelle `/api/contact` sans se soucier du port.

En production statique, deux options restent valides :

- laisser le frontend appeler `/api/contact` si un reverse proxy same-origin existe
- définir `VITE_CONTACT_API_BASE` puis rebuild le frontend si l'API est exposée sur une URL distincte

### Test local e-mail

1. Copier `.env.example` → `.env` et renseigner `SMTP_PASS`
2. Lancer `npm run server:dev` (terminal 2)
3. Lancer `npm run dev` (terminal 1)
4. Ouvrir http://localhost:3000, scroller jusqu'au formulaire de contact
5. Remplir et soumettre le formulaire
6. Vérifier dans la console serveur : `[Contact] Email sent`
7. Vérifier la boîte `contact@aegisnetwork.fr` : notification reçue
8. Vérifier la boîte du visiteur : accusé de réception reçu
9. Vérifier que le From affiché est `AEGIS NETWORK <website@aegisnetwork.fr>`
10. Vérifier que le Reply-To de la notification interne = email du visiteur
11. Vérifier que le Reply-To de l'accusé = `contact@aegisnetwork.fr`

## Déploiement en production

### Compatibilité hébergement

> **OVH Starter ne supporte pas Node.js.** L'hébergement actuel (OVH Starter) sert uniquement des fichiers statiques via Apache. Le serveur Express/Nodemailer nécessite un environnement Node.js. **Le backend ne peut pas tourner sur OVH Starter.**

**Options viables :**

| Option | Description |
|---|---|
| **OVH VPS** | VPS OVH avec Node.js installé — Express sert API + statique |
| **Render / Railway** | PaaS Node.js gratuit ou peu coûteux — API séparée |
| **VPS tiers** | N'importe quel VPS Linux avec Node.js 18+ |

Tant que le backend n'est pas déployé sur un hébergement Node.js, le formulaire de contact ne pourra pas envoyer d'e-mails en production.

### Option 1 : Node.js server (recommandé)

Le serveur Express sert à la fois l'API et les fichiers statiques `dist/` :

```bash
npm run build        # Build le frontend
npm run server       # Démarre Express (API + static)
```

Nécessite un hébergement Node.js (OVH VPS, Render, Railway, etc.).

**Variable à ajuster en production :**
```
CORS_ORIGIN=https://aegisnetwork.fr
PORT=3001  # ou 80/443 selon la config
```

Le serveur expose aussi `GET /api/health` pour vérifier le branchement backend sans envoyer d'e-mail.

### Option 2 : API séparée

Le site statique reste sur OVH Starter, l'API est hébergée séparément :
1. Déployer `dist/` sur OVH Starter (comme avant)
2. Déployer `server/` sur un hébergement Node.js
3. Définir `CORS_ORIGIN=https://aegisnetwork.fr`
4. Définir `VITE_CONTACT_API_BASE=https://votre-api.example` puis rebuild le frontend

**Important :** dans cette configuration, ajuster `CORS_ORIGIN` pour autoriser le domaine du site.

## Délivrabilité — Configuration DNS à vérifier

Pour que les e-mails envoyés depuis `contact@aegisnetwork.fr` arrivent bien en boîte de réception (et pas en spam), vérifier les enregistrements DNS suivants dans l'espace client OVH :

### SPF (Sender Policy Framework)

Vérifier qu'un enregistrement TXT SPF existe pour `aegisnetwork.fr` et inclut les serveurs OVH :

```
v=spf1 include:mx.ovh.com ~all
```

### DKIM (DomainKeys Identified Mail)

- OVH active généralement DKIM automatiquement sur MX Plan et Email Pro
- Vérifier dans l'espace client OVH → Emails → Domaine → DKIM
- Un enregistrement CNAME ou TXT DKIM doit exister dans la zone DNS

### DMARC

Optionnel mais recommandé. Ajouter un enregistrement TXT sur `_dmarc.aegisnetwork.fr` :

```
v=DMARC1; p=none; rua=mailto:contact@aegisnetwork.fr
```

(`p=none` en observation, passer à `p=quarantine` une fois validé)

### Vérification

Utiliser un outil comme [mail-tester.com](https://www.mail-tester.com/) pour vérifier le score de délivrabilité après la mise en place.

**Important :** ces enregistrements DNS se configurent dans l'espace client OVH (zone DNS du domaine). Ils ne sont pas gérés par le code du projet.

## IMAP (lecture des mails — non implémenté)

Si besoin futur de lire les e-mails reçus depuis l'application :
- **IMAP host (MX Plan)** : `ssl0.ovh.net` (port 993, SSL)
- **IMAP host (Email Pro)** : `pro1.mail.ovh.net` (port 993, SSL)
- Librairie Node.js : `imapflow` ou `imap-simple`
- Ce n'est pas implémenté actuellement — uniquement l'envoi (SMTP) est en place.

## Rollback

En cas de problème, le rollback est simple :
1. Arrêter le serveur Express
2. Revert vers le commit précédent : `git revert HEAD`
3. `npm run build` pour reconstruire le frontend
4. Le site redevient statique avec le formulaire `mailto:` d'origine

## Checklist de mise en production

- [ ] Alias `website@aegisnetwork.fr` → `contact@aegisnetwork.fr` créé côté OVH
- [ ] `SMTP_PASS` défini en variable d'environnement sur le serveur de production
- [ ] `CORS_ORIGIN` ajusté au domaine de production (ex. `https://aegisnetwork.fr`)
- [ ] `VITE_CONTACT_API_BASE` défini puis rebuildé si l'API n'est pas same-origin
- [ ] Backend déployé sur un hébergement Node.js (pas OVH Starter)
- [ ] Test d'envoi via le formulaire : notification interne reçue
- [ ] Test d'envoi via le formulaire : accusé de réception reçu par le visiteur
- [ ] Vérifier le From visible : `AEGIS NETWORK <website@aegisnetwork.fr>`
- [ ] Vérifier le Reply-To sur la notification : email du visiteur
- [ ] Vérifier le Reply-To sur l'accusé : `contact@aegisnetwork.fr`
- [ ] Vérifier le score délivrabilité via [mail-tester.com](https://www.mail-tester.com/)
- [ ] Enregistrements DNS (SPF, DKIM, DMARC) validés
- [ ] Rate limiting fonctionnel (5 req / 15 min / IP)
