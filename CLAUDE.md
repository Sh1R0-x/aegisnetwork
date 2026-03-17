# CLAUDE.md — Règles projet Aegis Network

## Identité

- Site vitrine one-page pour Aegis Network
- Cible : TPE et PME, dirigeants et responsables IT
- Activité : **conseil, audit et optimisation** en infrastructures IT et télécommunications
- Les sources design externes et les livrables brand vivent dans `C:\Users\Ludovic\Documents\AEGIS NETWORK`

## Positionnement métier

Aegis Network est un **consultant / accompagnateur / chef de projet IT** indépendant.

**Ce qu'Aegis fait :**
- Auditer l'infrastructure IT et télécom existante
- Identifier les surcoûts et les sous-performances
- Comparer les offres du marché et faire jouer la concurrence
- Conseiller les meilleures options adaptées au contexte client
- Renégocier ou challenger les contrats en place
- Piloter les changements techniques (migration, déploiement)
- Suivre la performance et ajuster dans le temps

**Ce qu'Aegis ne fait PAS :**
- Fournir directement l'accès internet ou la fibre
- Opérer un réseau télécom
- Vendre des abonnements ou des équipements
- Garantir des SLA opérateur en son nom propre
- Héberger des infrastructures

**Axe central du site :** optimisation + pilotage + gains économiques + gains de productivité

## MCP

- **Seul MCP utilisé** : `context7` — documentation technique récente et versionnée
- `playwright` et `chrome-devtools` restent configurés dans `.mcp.json` mais ne sont pas nécessaires au workflow courant
- Ne pas ajouter de nouveau MCP sans justification claire et gain concret immédiat
- Si `context7` peut fournir l'info, ne pas improviser de mémoire

## Stack technique

- **React 19** + **TypeScript**
- **Tailwind CSS 4** (via plugin Vite)
- **Framer Motion** (`motion` package) pour les animations
- **Lucide React** pour les icônes
- **Vite 6** comme bundler de dev et de build
- **Inter** (Google Fonts) comme typographie principale
- Build : `npm run build` → dossier `dist/`
- Hébergement : `dist/` est versionné et déployé sur OVH Starter via `.htaccess` (réécriture vers `dist/`)
- **Serveur API** : Express + Nodemailer (envoi SMTP via OVH)
- Runtime serveur : `tsx` (exécution TypeScript directe)

## Structure

```
index.html          ← point d'entrée Vite (dev) + preload hero
.htaccess           ← réécriture Apache pour servir dist/ sur OVH
.env.example        ← variables d'environnement (SMTP, serveur)
src/
  main.tsx          ← bootstrap React
  App.tsx           ← composant racine, ~1950 lignes, toutes les sections
  index.css         ← Tailwind @theme + 15 keyframes + classes custom
  components/       ← composants réutilisables (AegisLogo, etc.)
server/
  index.ts          ← Point d'entrée Express (API + static serving)
  tsconfig.json     ← Config TypeScript serveur (séparée du frontend)
  lib/
    mailer.ts       ← Transporter Nodemailer + envoi SMTP
    templates.ts    ← Templates HTML/texte des e-mails
    validation.ts   ← Validation et sanitisation serveur
  routes/
    contact.ts      ← Route POST /api/contact
public/
  favicon.svg       ← favicon (shield Aegis)
  img/              ← images optimisées (WebP, compressées)
dist/               ← build de production (versionné, déployé sur OVH)
docs/               ← documentation technique
.claude/rules/      ← règles pour agents IA
```

## Sections du site (App.tsx)

Navbar → Hero → GainBlock → DiagnosticExpress → CostControl → TimeLoss → RootCause → WhyAegis → ImpactCalculator → EvolutionConseil → FAQSection → CTASection → ContactSection → Footer

Flux narratif : gains concrets → diagnostic express → coûts → temps perdu → diagnostic de fond → légitimité/approche → simulateur → évolution → FAQ → CTA → contact

### DiagnosticExpress

Module interactif en 3 phases : intro → quiz (5 questions) → résultat (score /100, 3 axes, alertes, priorité).
Scoring : A=20, B=14, C=7, D=0. Niveaux : Environnement IT bien tenu (80+), Base correcte encore perfectible (60–79), Fonctionnement trop subi (40–59), Environnement IT à risque (0–39).
Export PDF via `exportDiagPDF()` (HTML + print). CTA résultat → scroll vers contact.
Zéro mention sécurité/cyber - uniquement performance, maîtrise, contraintes, pilotage.

### ContactSection (formulaire dual-mode)

Deux modes : « Être rappelé » (callback : téléphone + email) / « Nous contacter » (message : nom, entreprise, email, message).
Pré-remplissage automatique du message après diagnostic (résumé structuré).
Soumission via `POST /api/contact` (serveur Express + Nodemailer).
Double envoi : notification interne à contact@aegisnetwork.fr + accusé de réception au visiteur.
Protection anti-spam : honeypot + rate limiting (5 req / 15 min par IP).
États gérés : loading (`submitting`), erreur (`submitError`), succès (`submitted`).

### FAQSection

5 questions/réponses en accordion animé (Framer Motion).
Questions alignées sur le positionnement : différenciation vs prestataire classique, cible TPE-PME, coût audit, gains concrets, zone d'intervention.
Structured data FAQPage JSON-LD dupliquée dans `index.html` pour indexation Google.

### Flèches de guidage (arrows)

Flèches SVG rouges animées, visibles desktop uniquement après diagnostic.
Positionnement **element-anchored** : chaque flèche est dans un wrapper `<div className="relative">` autour de sa cible.
- Arrow 1 : `top-[68%] -translate-y-1/2` sur le grid nom/entreprise (message) ou le champ téléphone (callback)
- Arrow 2 : `top-1/2 -translate-y-1/2` sur le bouton submit
- Offset horizontal : `-left-20 sm:-left-[5.5rem]` (padding card 56px + marge)
- SVG IDs distincts (`gf`/`ag1`, `gf2`/`ag2`) pour éviter les conflits
- Animation : `motion.div` pulsation horizontale `x: [0, 6, 0]` (1.6s, infini)

## Informations de contact

- Téléphone : 04 82 53 26 99
- Email : contact@aegisnetwork.fr
- Localisation : Lyon, France

Ne jamais modifier ces informations sans validation explicite.

## Style de code

- Composants React fonctionnels (pas de classes)
- TypeScript strict, pas d'`any` explicite
- Tailwind utility-first, custom properties dans `@theme` (index.css)
- Navigation via ancres sémantiques (`href="#section"`) + interception JS via `scrollToSection()`
- Indentation : 2 espaces
- Encoding : UTF-8, LF
- Code lisible, pas de minification manuelle

## Charte graphique

Source de vérité :

- `C:\Users\Ludovic\Documents\AEGIS NETWORK\00_INDEX_ET_DOCS\REFERENTIELS\design-guidelines.md`

- **Optical Blue** : `#3b82f6` — couleur primaire, accents, glows
- **Deep Background** : `#020617` — fond principal (slate-950)
- **Accent Violet** : `#7c3aed` — couleur secondaire, dégradés
- **Tracking logo** : `0.06em` pour "AEGIS NETWORK" (+ word-spacing 0.2em) (navbar + footer)
- **Tracking baseline** : `0.25em` pour "Conseil & Optimisation IT" (text-slate-300)
- **Typo titres** : Inter Black (900), tracking-tighter
- **Effets** : glassmorphism, premium-glow, glow-button, fiber beams, float
- **Ton visuel** : premium, technologique, sobre, pas cyberpunk

## Copywriting

- Français, ton professionnel et rassurant
- Phrases courtes, concrètes, orientées résultat
- Pas de jargon inutile, pas de promesses vides
- Pas de superlatifs gratuits ("le meilleur", "n°1", "révolutionnaire")
- Axes : optimisation, pilotage, réduction des coûts, productivité, accompagnement
- Aegis Network est présenté comme consultant/chef de projet, jamais comme opérateur ou fournisseur
- Ne jamais inventer d'informations légales, d'adresse ou de téléphone

## SEO

- **Title** : `Conseil & optimisation IT pour PME à Lyon | Aegis Network`
- **Meta description** : focus TPE-PME Lyon, réduction coûts IT/télécom, pilotage prestataires, audit et accompagnement pragmatiques
- **Canonical** : `https://aegisnetwork.fr/`
- **Open Graph** : og:title, og:description, og:url, og:type, og:locale, og:site_name
- **Structured data** (JSON-LD dans `index.html`) :
  - `ProfessionalService` : identité, services, zone géographique, contact
  - `FAQPage` : 5 questions/réponses alignées positionnement
- **robots.txt** + **sitemap.xml** dans `public/`
- **Un seul H1** (hero) — H2 orientés intentions SEO business
- **FAQ** : section accordion avec 5 questions (différenciation, cible, coût, gains, zone)

## Mentions légales

- Page statique dédiée : `public/mentions-legales/index.html`
- Lien footer vers `/mentions-legales/`
- Hébergeur OVH documenté avec adresse réelle
- Pas de politique de confidentialité séparée tant qu'aucun cookie/analytics n'est actif

## Interdictions

- Ne pas ajouter de pages supplémentaires hors besoin légal ou technique strict
- Ne pas ajouter de CMS ou de formulaire backend fonctionnel
- Ne pas ajouter de cookie banner sans besoin réel
- Ne pas ajouter d'analytics sans validation explicite
- Ne pas réintroduire de dossier `brand/` ou `stitch/` dans ce repo
- Ne pas ajouter de dépendances lourdes sans justification

## Stratégie de navigation

- Navigation par ancres sémantiques (`href="#..."`) interceptées par `scrollToSection()`
- Section active détectée via `IntersectionObserver` (rootMargin: `-80px 0px -50% 0px`)
- `scroll-padding-top: 5rem` en CSS pour compenser le header fixe
- Les ancres gardent une cible HTML lisible pour le crawl et les no-JS snapshots

## Animations

- Framer Motion pour les entrées en viewport (`whileInView`, `initial`)
- Stagger délay sur les listes de features (0.1–0.15s)
- Hero : fond animé CSS pur (orbes gradient en dérive lente, grille tech, fiber beams premium)
- Hero float : amplitude réduite (8px / 8s) pour confort visuel, delays échelonnés (0s, 1.5s, 3s)
- Hero KPI cards : entrées directionnelles Framer Motion (x:-20 gauche, x:20 droite, scale centre)
- Hero KPI shimmer : CSS `.hero-kpi-card::after` avec keyframe `kpi-sweep` (6s, GPU composité)
- Hero badge Audit : CSS `.audit-scan-card::after` avec keyframe `audit-scan` (5s, scan vertical subtil)
- CSS keyframes pour fiber beams, float, pulse-slow, hero-glow-drift, kpi-sweep, audit-scan
- `prefers-reduced-motion` respecté (désactive toutes les animations CSS dont `.hero-kpi-card::after`, `.audit-scan-card::after`)

## Statistiques et sources

- **Chiffres sourcés** (France Num 2025, BEREC 2022, SDI 2023, Cybermalveillance 2025) intégrés dans CostControl, TimeLoss et ImpactCalculator
- **ImpactCalculator** : 3 curseurs (heures/semaine en gestion IT, coût horaire interne, budget IT mensuel), layout 2 colonnes, hypothèse 20 % d'économie contrats
- Ne jamais présenter une hypothèse du simulateur comme un fait sourcé

## Références design externes

- Les snapshots Google Stitch et anciennes sources design sont archivés hors repo dans `C:\Users\Ludovic\Documents\AEGIS NETWORK\99_ARCHIVE_A_VERIFIER`
- Le point d'entrée officiel pour les chemins et règles designer est `C:\Users\Ludovic\Documents\AEGIS NETWORK\00_INDEX_ET_DOCS\PATHS_AND_RULES.md`

## Images

- Stockées localement dans `public/img/` (WebP, compressées depuis Unsplash)
- Référencées en `/img/filename.webp` (pas de CDN externe)
- Image hero : preload + decode-gated fade-in (`heroReady` state)
- `loading="lazy"` sur toutes les images sauf Hero

## Workflow design externe

- Les mises à jour design et supports brand sont stockés hors repo dans `C:\Users\Ludovic\Documents\AEGIS NETWORK`
- Pour intégrer une update design au site : comparer la source externe au code `src/`, puis appliquer les deltas dans le repo
- Les archives Stitch sont conservées dans `99_ARCHIVE_A_VERIFIER\STITCH_SITE_SOURCE`

## Workflow de collaboration (Claude / Copilot / Codex)

- Toujours travailler depuis la racine du repo (`c:\Dev\Aegisnetwork`)
- Toujours lire la doc projet (`CLAUDE.md`, `README.md`, `AGENTS.md`) avant modification
- Toujours vérifier `git status` avant toute intervention
- Ne modifier des fichiers hors repo que si la tâche vise explicitement `C:\Users\Ludovic\Documents\AEGIS NETWORK`
- Mettre à jour la documentation après tout changement structurant
- Privilégier des patchs minimaux et ciblés
- Signaler clairement les hypothèses prises
- Laisser le repo dans un état compréhensible pour l'outil suivant
- GitHub (`main`) est la source de vérité — toujours push après modification
