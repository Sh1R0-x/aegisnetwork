# Architecture — Aegis Network

## Stack

| Couche        | Technologie                        |
| ------------- | ---------------------------------- |
| Framework     | React 19 + TypeScript              |
| Styling       | Tailwind CSS 4 (plugin Vite)       |
| Animations    | Framer Motion (`motion` v12)       |
| Icônes        | Lucide React                       |
| Bundler       | Vite 6                             |
| Typographie   | Inter (Google Fonts)               |
| Hébergement   | OVH Starter (dossier `dist/`)      |

## Structure du projet

```
index.html              ← Point d'entrée Vite (dev)
.htaccess              ← Réécriture Apache (dist/ + HTTPS)
src/
  main.tsx              ← Bootstrap React (StrictMode)
  App.tsx               ← Composant racine, toutes les sections
  index.css             ← Tailwind @theme + animations custom
  components/
    AegisLogo.tsx       ← Logo SVG animé (gradient + nodes)
public/
  favicon.svg           ← Favicon Aegis
  img/                  ← Images locales (Unsplash downloads)
dist/                   ← Build de production (versionné)
stitch/                 ← Source Google Stitch (lecture seule)
docs/                   ← Documentation technique
.claude/rules/          ← Règles pour agents IA
```

## Sections de App.tsx

Le site est one-page. Toutes les sections sont dans `App.tsx` :

| Composant              | Rôle                                         |
| ---------------------- | -------------------------------------------- |
| `FiberBeams`           | Fond animé fibre optique (CSS keyframes)     |
| `Navbar`               | Navigation fixe avec section active auto (IntersectionObserver) |
| `Hero`                 | Accroche « reprendre le contrôle » + image + KPI cards flottantes + CTA |
| `GainBlock`            | « Ce que vous allez y gagner » — 6 bénéfices concrets en grille |
| `CostControl`          | Enjeux coûts : contrats, mise en concurrence, surcoûts + stat BEREC |
| `TimeLoss`             | Temps perdu en gestion IT : SAV, coordination, pannes + stats sourcées |
| `RootCause`            | « On colmate, rarement on diagnostique » — causes vs symptômes |
| `WhyAegis`             | Légitimité : indépendance, objectivité, interlocuteur unique + citation fondateur |
| `ImpactCalculator`     | Simulateur 4 curseurs : heures/semaine, part récupérable, coût horaire, budget IT |
| `CalcSlider`           | Sous-composant slider pour le simulateur      |
| `CalcResult`           | Sous-composant ligne de résultat              |
| `EvolutionConseil`     | Accompagnement durable : revue, veille, pilotage évolutions |
| `DiagnosticExpress`    | Diagnostic interactif : 5 questions, scoring /100, résultat avec points d'attention + priorité |
| `CTASection`           | Appel à l'action : premier échange gratuit, déplacements Lyon/Ain/Isère, visio |
| `ContactSection`       | Formulaire de contact + badges (gratuit, zone, visio) |
| `LegalModal`           | Mentions légales (modal depuis le footer)     |
| `Footer`               | Pied de page + ouverture mentions légales     |

## Conventions

### Hero — Structure détaillée

Le Hero est un composant critique du site. Voici sa structure complète :

**Layout :**
- Grille asymétrique : `md:grid-cols-[1fr_0.8fr]`, `lg:grid-cols-[1.1fr_0.9fr]`
- Plus d'espace texte à gauche, image+KPI à droite
- Colonne image masquée en mobile (`hidden md:block`)

**Colonne gauche (texte) :**
- Tag animé « Conseil & Optimisation IT » avec dot ping
- Titre « Reprenez le contrôle, devenez plus performant. » — `text-4xl md:text-5xl lg:text-7xl`
  - « contrôle » en gradient `blue-400 → blue-600 → violet-500`
  - « performant » en gradient `violet-400 → blue-400`
  - Line break `<br>` entre les deux parties en `lg:`
- Nom de marque en majuscules dans le body text : « AEGIS NETWORK »
- Sous-titre `text-lg text-slate-400`, max-w-xl
- Deux CTA : `glow-button` « Demander un diagnostic gratuit » + secondaire « Voir vos gains concrets » (→ #gains)
- Entrées Framer Motion en cascade : delay 0 → 0.15 → 0.3 → 0.45

**Colonne droite (image + KPI) :**
- Conteneur avec hauteur fixe : `h-[400px] md:h-[450px] lg:h-[550px]`
- Image `photo-1551703599-6b3e8379aa8c.jfif` en absolute + `object-cover opacity-60`
- Deux overlays : gradient directionnel `from-background-deep/90` + vignette radiale `opacity-70`
- 3 cartes KPI flottantes, positionnées en absolute :
  - **Réduction Coûts** (haut-gauche) : icône TrendingDown, `-30%`, entrée `x: -20`
  - **Efficacité Réseau** (bas-droite) : icône Zap `text-emerald-400`, `+45%`, entrée `x: 20`
  - **Audit de Performance** (centre) : icône Search, badge bleu glow, entrée `scale: 0.9`, scan line CSS (`audit-scan-card`)

**KPI cards :**
- Classe CSS `.hero-kpi-card` pour shimmer (keyframe `kpi-sweep`, 6s, CSS pur)
- Classe CSS `.audit-scan-card` pour effet scan vertical (keyframe `audit-scan`, 5s, CSS pur)
- Glass effect : `bg-slate-900/80 backdrop-blur-xl border-white/10`
- Tailles responsives : padding `p-4 lg:p-5`, largeur `w-40 lg:w-48` / `w-44 lg:w-52`
- Animation float CSS (`animate-float`) avec delays échelonnés (0s, 1.5s, 3s)
- Progress bars animées en Framer Motion (one-shot avec delay)

**Fond animé :**
- 3 orbes ambient (blur-[120px], blue + violet + blue/5) avec drift lent CSS
- Grille tech (`hero-grid`) à opacity 2%
- 3 fiber beams (2 horizontaux, 1 vertical) avec keyframes CSS

**Responsive :**
- Mobile (< 768px) : texte seul, pas d'image/KPI, `text-4xl`
- Tablette (768px+) : image + KPI visibles, tailles réduites, `text-5xl`
- Desktop (1024px+) : tailles pleines, KPI décalées hors image, `text-7xl`

**Performance :**
- Image hero en `fetchPriority="high"` + preload dans index.html
- Animations continues (float, shimmer, glows) : CSS keyframes = GPU composité
- Entrées one-shot : Framer Motion (JS) — se déclenche une seule fois
- `prefers-reduced-motion` : toutes les animations CSS désactivées dont `.hero-kpi-card::after`, `.audit-scan-card::after`

**Fichiers concernés :**
- `src/App.tsx` : composant Hero (~160 lignes)
- `src/index.css` : `@keyframes kpi-sweep`, `@keyframes audit-scan`, `.hero-kpi-card`, `.audit-scan-card`, `@keyframes hero-glow-drift`, float, fiber-beam
- `index.html` : `<link rel="preload">` pour l'image hero
- `stitch/header/app/page.tsx` : référence design (lecture seule)

### DiagnosticExpress — Structure détaillée

Module interactif de diagnostic en 3 phases : intro → quiz → résultat.

**Flow :**
- Phase intro : badge, titre, description, 3 badges (2 min, Gratuit, Résultat immédiat), CTA "Lancer"
- Phase quiz : 5 questions une par une, 4 réponses par question en grille 2×2
- Phase résultat : score /100, niveau, interprétation, points d'attention, priorité, CTAs

**Scoring :**
- A = 20, B = 14, C = 7, D = 0 → total /100
- 80–100 : Bien tenu | 60–79 : Perfectible | 40–59 : Trop subi | 0–39 : À risque
- Points d'attention dynamiques basés sur les réponses faibles (Q2+Q3, Q4, Q5, Q1)

**Thèmes des questions :**
1. Adaptation de l'environnement à l'activité
2. Temps perdu (réseau, téléphonie, outils)
3. Relation prestataires (clarté, rapidité)
4. Challenge des contrats et services
5. Impact d'un incident sur l'activité

**UX :**
- Barre de progression animée (gradient blue→violet)
- AnimatePresence pour transitions entre questions (slide horizontal)
- Cards réponse : border-2, selected state blue glow, CheckCircle
- Résultat : score circulaire coloré par niveau, cards warning/danger, priorité blue

**Contrainte métier :**
- Zéro mention sécurité/cyber — uniquement performance, maîtrise, frictions, pilotage
- Pas de rapport PDF, pas de dashboard, pas de faux KPIs
- CTA résultat → contact (pas de formulaire de lead)

- **Un composant = une section** dans `App.tsx` (pas de fichier séparé sauf si réutilisable)
- **Composants réutilisables** dans `src/components/` (ex: `AegisLogo`)
- **Animations d'entrée** : `initial={{ opacity: 0, y: 20 }}` → `whileInView={{ opacity: 1, y: 0 }}` avec stagger
- **CSS custom** : glassmorphism (`.glass-card`), glow (`.premium-glow`, `.glow-button`), fiber beams, hero animated glows
- **Responsive** : mobile-first avec `md:` et `lg:`

## Navigation

- **Pas de hash dans l'URL** : la navigation utilise `scrollToSection()` (JS `scrollIntoView({ behavior: 'smooth' })`)
- **Section active** : détectée via `IntersectionObserver` dans le composant `Navbar`
- **Scroll offset** : géré par `scroll-padding-top: 5rem` en CSS pour éviter que le header fixe recouvre les sections
- Les liens `<a href="#section">` internes utilisent `onClick` avec `preventDefault()` pour éviter la pollution de l'URL

## Images

- Les images sont stockées localement dans `public/img/` (copies Unsplash)
- Référencées en chemin absolu (`/img/filename.jfif`) dans les composants
- Attribut `loading="lazy"` sur toutes les images hors Hero

## Accessibilité & Performance

- `prefers-reduced-motion` respecté : toutes les animations CSS désactivées
- `scroll-behavior: smooth` via CSS (respecté par les préférences système)
- Build < 410 KB gzip total, pas de requêtes API externes

## Build & Déploiement

```bash
npm run build      # → dist/
```

Le dossier `dist/` est un site statique déployable sur n'importe quel hébergeur (OVH Starter, Netlify, etc.).

## Workflow Stitch

Google Stitch génère les mises à jour design dans `stitch/`. Pour intégrer :

1. Comparer `stitch/src/` avec `src/`
2. Appliquer les deltas manuellement
3. Ne jamais modifier `stitch/` directement
