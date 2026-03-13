# Architecture — Aegis Network

> Dernière mise à jour : 12 mars 2026

## Stack technique

| Couche        | Technologie                        | Version  |
| ------------- | ---------------------------------- | -------- |
| Framework     | React + TypeScript                 | 19       |
| Styling       | Tailwind CSS (plugin Vite)         | 4        |
| Animations    | Framer Motion (`motion/react`)     | 12       |
| Icônes        | Lucide React                       | —        |
| Bundler       | Vite                               | 6        |
| Typographie   | Inter (Google Fonts)               | —        |
| Hébergement   | OVH Starter (dossier `dist/`)      | —        |
| Serveur API   | Express + Nodemailer (SMTP OVH)    | —        |
| Runtime srv   | tsx (TypeScript direct)             | 4        |

## Structure du projet

```
index.html              ← Point d'entrée Vite (dev) + preload hero
.htaccess              ← Réécriture Apache (dist/ + HTTPS)
.env.example           ← Variables d'environnement (SMTP, serveur)
src/
  main.tsx              ← Bootstrap React (StrictMode)
  App.tsx               ← Composant racine — ~1950 lignes, toutes les sections
  index.css             ← Tailwind @theme + 15 keyframes + classes custom
  components/
    AegisLogo.tsx       ← Logo SVG animé (gradient + nœuds réseau)
server/
  index.ts              ← Point d'entrée Express (API + static serving)
  tsconfig.json         ← Config TypeScript serveur (séparée du frontend)
  lib/
    mailer.ts           ← Transporter Nodemailer + envoi SMTP
    templates.ts        ← Templates HTML/texte des e-mails
    validation.ts       ← Validation et sanitisation serveur
  routes/
    contact.ts          ← Route POST /api/contact
public/
  favicon.svg           ← Favicon Aegis (shield)
  img/                  ← 5 images locales (copies Unsplash, .jfif)
dist/                   ← Build de production (versionné, déployé)
stitch/                 ← Source Google Stitch (référence design, lecture seule)
  elements/Elements.tsx ← UI Kit Stitch (BentoGrid, ROICalculator, etc.)
  design-guidelines.md  ← Charte graphique de référence
brand/                  ← Assets de marque (logo, carte de visite, flyer, brochure)
docs/                   ← Documentation technique
.claude/rules/          ← Règles pour agents IA (content.md, frontend.md)
```

---

## Sections de App.tsx — Carte complète

Le site est **one-page**. Toutes les sections sont dans `src/App.tsx` (~1950 lignes).

| # | Composant | Lignes | ID ancre | Rôle |
|---|-----------|--------|----------|------|
| 1 | `FiberBeams` | 37–43 | — | Fond animé fibre optique (CSS keyframes) |
| 2 | `Navbar` | 45–175 | — | Navigation fixe, section active (IntersectionObserver), menu mobile |
| 3 | `Hero` | 177–376 | `hero` | Accroche + image + 3 KPI cards flottantes + 2 CTA |
| 4 | `GainBlock` | 378–450 | `gains` | « Ce que vous allez y gagner » — 6 bénéfices en grille |
| 5 | `CostControl` | 452–548 | `couts` | Enjeux coûts : contrats, surcoûts, stat BEREC |
| 6 | `TimeLoss` | 550–633 | `temps` | Temps perdu : SAV, coordination, pannes, stats sourcées |
| 7 | `RootCause` | 635–724 | `diagnostic` | « On colmate, rarement on diagnostique » — causes vs symptômes |
| 8 | `WhyAegis` | 726–821 | `approche` | Légitimité : indépendance, objectivité + citation fondateur |
| 9 | `CalcSlider` | 823–841 | — | Sous-composant slider pour simulateur |
| 10 | `CalcResult` | 843–849 | — | Sous-composant ligne de résultat |
| 11 | `ImpactCalculator` | 851–1047 | `simulateur` | Simulateur interactif 3 curseurs + résultats |
| 12 | `EvolutionConseil` | 1049–1112 | `evolution` | Accompagnement durable : revue, veille, pilotage |
| 13 | `DiagnosticExpress` | 1275–1544 | `diag` | Diagnostic interactif 5 questions, scoring /100 |
| 14 | `CTASection` | 1546–1571 | `cta` | Appel à l'action : échange gratuit, zone, visio |
| 15 | `ContactSection` | 1573–1913 | `contact` | Formulaire dual-mode + pré-remplissage diagnostic |
| 16 | `LegalModal` | 1915–1966 | — | Mentions légales (modal depuis footer) |
| 17 | `Footer` | 1968–2000 | — | Pied de page + lien mentions |
| 18 | `App` | 2002–2027 | — | Composant racine, gestion d'état globale |

**Flux narratif :** Gains concrets → Coûts → Temps perdu → Diagnostic de fond → Légitimité → Simulateur → Évolution → Diagnostic Express interactif → CTA → Contact → Footer

### Données et fonctions utilitaires (entre EvolutionConseil et DiagnosticExpress)

| Élément | Lignes | Rôle |
|---------|--------|------|
| `DIAG_QUESTIONS` | 1114–1155 | Tableau const de 5 questions avec 4 options chacune |
| `DiagResult` (interface) | 1157–1164 | Type du résultat de diagnostic |
| `computeResult()` | 1166–1244 | Calcul du score, axes, alertes et interprétation |
| `exportDiagPDF()` | 1246–1273 | Export PDF du résultat (HTML + print) |

---

## Hero — Structure détaillée

### Layout
- Grille asymétrique : `md:grid-cols-[1fr_0.8fr]`, `lg:grid-cols-[1.1fr_0.9fr]`
- Colonne image masquée en mobile (`hidden md:block`)

### Colonne gauche (texte)
- Tag animé « Conseil & Optimisation IT » avec dot ping
- Titre : « Reprenez le contrôle, devenez plus performant. » — `text-4xl md:text-5xl lg:text-7xl`
  - « contrôle » en gradient `blue-400 → blue-600 → violet-500`
  - « performant » en gradient `violet-400 → blue-400`
  - `<br>` entre les deux segments en `lg:`
- Nom de marque « AEGIS NETWORK » en majuscules dans le body text
- Sous-titre `text-lg text-slate-400`, `max-w-xl`
- **Deux CTA :**
  - Primaire : `glow-button` « Demander un diagnostic gratuit » → scroll vers `#diag`
  - Secondaire : outline « Voir vos gains concrets » → scroll vers `#gains`
- Entrées Framer Motion en cascade : delay 0 → 0.15 → 0.3 → 0.45

### Colonne droite (image + KPI)
- Conteneur hauteur fixe : `h-[400px] md:h-[450px] lg:h-[550px]`
- Image `photo-1551703599-6b3e8379aa8c.jfif` en absolute + `object-cover opacity-60`
- Deux overlays : gradient directionnel + vignette radiale
- **3 cartes KPI flottantes** positionnées en absolute :

| Carte | Position | Icône | Valeur | Entrée Framer |
|-------|----------|-------|--------|---------------|
| Réduction Coûts | haut-gauche | TrendingDown | -30% | `x: -20` |
| Efficacité Réseau | bas-droite | Zap (emerald) | +45% | `x: 20` |
| Audit de Performance | centre | Search | badge glow | `scale: 0.9` |

### KPI cards — effets visuels
- `.hero-kpi-card` : shimmer via `::after` (keyframe `kpi-sweep`, 6s, GPU composité)
- `.audit-scan-card` : scan vertical via `::after` (keyframe `audit-scan`, 5s)
- Glass effect : `bg-slate-900/80 backdrop-blur-xl border-white/10`
- Float CSS (`animate-float`) : amplitude 8px / 8s, delays échelonnés (0s, 1.5s, 3s)
- Progress bars : Framer Motion one-shot

### Fond animé
- 3 orbes ambient (`blur-[120px]`, blue + violet) avec drift CSS lent (20–25s)
- Grille tech (`.hero-grid`) à opacity 2%
- 3 fiber beams premium (2 horizontaux, 1 vertical) — keyframes CSS

### Performance Hero
- Image hero : `fetchPriority="high"` + `<link rel="preload">` dans `index.html`
- Animations continues (float, shimmer, glows) : CSS keyframes = GPU composité
- Entrées one-shot : Framer Motion (JS) — une seule exécution
- `prefers-reduced-motion` : toutes les animations CSS désactivées

---

## DiagnosticExpress — Logique complète

### Phases (3)

1. **Intro** (lignes ~1373–1398) : badge, titre, description, 3 badges informatifs, CTA « Lancer le diagnostic »
2. **Quiz** (lignes ~1399–1466) : 5 questions une par une, grille 2×2, barre de progression
3. **Résultat** (lignes ~1467–1544) : score /100, niveau, 3 axes, alertes, priorité, CTAs

### Scoring

| Réponse | Points |
|---------|--------|
| A (meilleure) | 20 |
| B | 14 |
| C | 7 |
| D (pire) | 0 |

**Total possible :** 100 points (5 questions × 20 max)

### Niveaux

| Score | Niveau | Couleur |
|-------|--------|---------|
| 80–100 | Environnement bien tenu | Emerald |
| 60–79 | Base correcte, encore perfectible | Blue |
| 40–59 | Fonctionnement trop subi | Amber |
| 0–39 | Environnement à risque | Rose |

### Thèmes des questions
1. Adaptation de l'environnement à l'activité
2. Temps perdu (réseau, téléphonie, outils)
3. Relation prestataires (clarté, rapidité)
4. Challenge des contrats et services
5. Impact d'un incident sur l'activité

### Calcul du résultat (`computeResult()`, lignes 1166–1244)

1. **Score brut** : somme des points sélectionnés
2. **Points d'attention** (max 2 affichés) :
   - Q2 + Q3 ≤ 14 → alerte frictions/lenteurs
   - Q4 ≤ 7 → alerte contrats non challengés
   - Q5 ≤ 7 → alerte exposition opérationnelle
   - Q1 ≤ 7 → alerte environnement inadapté
3. **3 axes** (normalisés 0–100) :
   - **Pilotage** = (Q1 + Q4) / 40 × 100 → seuil « Bien cadré / À consolider / Fragile / Critique »
   - **Fluidité opérationnelle** = (Q2 + Q3) / 40 × 100
   - **Maîtrise des risques** = Q5 / 20 × 100
4. **Interprétation textuelle** selon le niveau

### Export PDF (`exportDiagPDF()`, lignes 1246–1273)
- Génère un HTML inline avec SVG score circle, axes barres, alertes, priorité
- Couleur dynamique selon le score
- Ouvre une nouvelle fenêtre → `window.print()`
- Contenu : header Aegis, score, axes, alertes, priorité, footer

### UX du quiz
- Barre de progression animée (gradient blue→violet)
- `AnimatePresence` pour transitions entre questions (slide horizontal)
- Cards réponse : `border-2`, état sélectionné blue glow + `CheckCircle`
- Résultat : score circulaire coloré, cards warning/danger, priorité blue

### Contrainte métier
- Zéro mention sécurité/cyber — uniquement performance, maîtrise, frictions, pilotage
- CTA résultat → formulaire contact (pas de lead capture indépendante)

---

## Formulaire de contact — Logique complète

### Dual-mode (lignes ~1573–1913)

Le formulaire propose deux modes interchangeables via des tabs :
- **« Être rappelé »** (callback) : téléphone + email uniquement
- **« Nous contacter »** (message) : nom, entreprise, email, message (textarea)

Le mode actif est géré par `useState<'callback' | 'message'>`, synchronisé avec le parent.

### Champs par mode

| Champ | Callback | Message |
|-------|----------|---------|
| Téléphone | ✅ | ❌ |
| Nom complet | ❌ | ✅ |
| Entreprise | ❌ | ✅ |
| Email | ✅ | ✅ |
| Message | ❌ | ✅ (textarea) |

### Pré-remplissage après diagnostic

Quand `diagResult` change (via `useEffect`) :
1. Le mode passe automatiquement à `'message'`
2. Le champ `message` est pré-rempli avec un résumé structuré :
   ```
   Diagnostic Express — Score : X/100
   Niveau : [niveau]
   Axes : Pilotage ([detail]) · Fluidité ([detail]) · Maîtrise ([detail])
   Points d'attention : [point1] · [point2]
   Priorité : [texte priorité]
   ---
   ```
3. Un **banner** bleu apparaît sous les tabs : « Diagnostic complété — Score : X/100 »

### Soumission
- `handleSubmit()` construit un payload structuré (type, champs, diagnostic si présent)
- Actuellement : `console.log()` + fallback `mailto:` avec subject et body pré-remplis
- `TODO:` remplacer par un vrai endpoint backend
- Après soumission : `submitted = true` → affiche un message de confirmation avec `CheckCircle`

### Layout
- Grid `lg:grid-cols-2` : colonne gauche (infos contact + badges), colonne droite (formulaire glass-card)
- Badges contextuels : « Premier échange gratuit », « Lyon · Ain · Isère », « Disponible en visio »
- Informations : téléphone (06 52 95 00 10), email, localisation Lyon

---

## Flèches de guidage — Système complet

### Objectif
Guider visuellement l'utilisateur vers le formulaire après un diagnostic. Les flèches SVG rouges pointent vers les champs clés pour inciter à remplir le formulaire.

### Conditions d'affichage
- `diagResult !== null` (diagnostic complété)
- `!submitted` (formulaire pas encore envoyé)
- Desktop uniquement (`hidden md:block`)

### Architecture (element-anchored positioning)

Les flèches sont **ancrées directement aux éléments cibles** via des wrappers `<div className="relative">`. Cela garantit un alignement correct quel que soit le viewport, le zoom ou le DPI.

**Ancienne approche (supprimée) :** positionnement absolu au niveau de la glass-card (`top-[27%]`, `bottom-[7.2rem]`) — fragile, imprécis selon les conditions d'affichage.

**Approche actuelle :**

| Flèche | Mode | Cible | Wrapper parent | Positionnement |
|--------|------|-------|----------------|----------------|
| Arrow 1 | message | Grille Nom/Entreprise | `div.relative` autour du `grid md:grid-cols-2` | `top-[68%] -translate-y-1/2` |
| Arrow 1 | callback | Champ téléphone | `div.relative` autour du `div.space-y-3` | `top-[68%] -translate-y-1/2` |
| Arrow 2 | les deux | Bouton « Envoyer » | `div.relative` autour du `<button>` | `top-1/2 -translate-y-1/2` |

### Calcul des offsets

- **Vertical Arrow 1** (`top-[68%]`) : la structure label (20px) + gap (12px) + input (56px) = 88px. Centre input ≈ 60px → 60/88 ≈ 68%
- **Vertical Arrow 2** (`top-1/2`) : wrapper ne contient que le bouton → 50% = centre exact
- **Horizontal** : `-left-20 sm:-left-[5.5rem]` = padding card (56px) + offset bord (-24px/-32px) = 80px / 88px

### SVG
- Taille : `width="36" height="28"`
- Filtre : ombre colorée (`<filter id="gf">` / `<filter id="gf2">`)
- Gradient : rouge `#FF5A5A → #FF2D2D` (`<linearGradient id="ag1">` / `<linearGradient id="ag2">`)
- Les IDs sont distincts pour éviter les conflits SVG

### Animation
- `motion.div` avec `animate={{ x: [0, 6, 0] }}` — pulsation horizontale
- Duration : 1.6s, repeat Infinity
- Delays d'entrée : Arrow 1 = 0.4s, Arrow 2 = 0.7s

### Précision mesurée (Playwright, mars 2026)
- Arrow 1 vs champ : **+2px** (toutes largeurs)
- Arrow 2 vs bouton : **0px** (toutes largeurs)
- Testé à 768px, 850px et 1280px — résultats identiques

---

## CTA et ancres

### CTAs principaux

| CTA | Section | Cible | Action |
|-----|---------|-------|--------|
| « Demander un diagnostic gratuit » | Hero | `#diag` | scroll vers DiagnosticExpress |
| « Voir vos gains concrets » | Hero | `#gains` | scroll vers GainBlock |
| « Simuler votre impact » | plusieurs | `#simulateur` | scroll vers ImpactCalculator |
| « Échanger sur vos résultats » | DiagResult | `#contact` | scroll + mode callback |
| « Prendre rendez-vous » | CTASection | `#contact` | scroll vers ContactSection |
| « Contactez-nous » | Navbar | `#contact` | scroll vers ContactSection |

### Système de navigation
- **Fonction `scrollToSection(id)`** : `document.getElementById(id).scrollIntoView({ behavior: 'smooth' })`
- **Pas de hash dans l'URL** : `preventDefault()` sur tous les `<a href="#">`
- **Section active** : `IntersectionObserver` avec `rootMargin: '-80px 0px -50% 0px'`
- **Scroll offset** : `scroll-padding-top: 5rem` (CSS) pour compenser le header fixe de 80px

---

## Responsive / Mobile

### Breakpoints Tailwind utilisés

| Breakpoint | Pixel | Usage principal |
|-----------|-------|-----------------|
| `sm` | 640px | CTA navbar visible, ajustements mineurs |
| `md` | 768px | Passage desktop : nav desktop, Hero image+KPI, grilles 2 colonnes, flèches de guidage |
| `lg` | 1024px | Tailles pleines, grilles 3 colonnes, titres `text-7xl` |

### Décisions responsive clés

| Composant | Mobile (< 768px) | Desktop (≥ 768px) |
|-----------|-------------------|-------------------|
| Navbar | Burger menu + overlay plein écran | Navigation horizontale + CTA |
| Hero | Texte seul, pas d'image/KPI | Image + 3 KPI cards flottantes |
| GainBlock | 1 colonne | 2 colonnes (sm), 3 colonnes (lg) |
| ImpactCalculator | Sliders + résultats empilés | 2 colonnes côte à côte |
| ContactSection | Formulaire pleine largeur | 2 colonnes (infos + formulaire) |
| Flèches de guidage | **Masquées** (`hidden md:block`) | Visibles si diagnostic complété |
| Hero CTA | Empilés verticalement | Côte à côte |

### Mobile menu
- Burger button avec animation Framer Motion (rotation)
- Overlay plein écran avec backdrop blur
- Navigation par `scrollToSection()` + fermeture automatique
- `overflow: hidden` sur body quand ouvert

---

## Choix UX/UI importants

### Design system
- **Ton visuel** : premium, technologique, sobre — pas cyberpunk
- **Glassmorphism** (`.glass-card`) : `bg-slate-900/40 backdrop-blur-xl border-white/10 shadow-2xl`
- **Glow effects** : ombres bleues/violettes subtiles, pas de néon agressif
- **Typographie** : Inter (Google Fonts), titres en weight 900 + `tracking-tighter`

### Couleurs

| Nom | Hex | Usage |
|-----|-----|-------|
| Optical Blue | `#3b82f6` | Primaire, accents, glows |
| Deep Background | `#020617` | Fond (slate-950) |
| Accent Violet | `#7c3aed` | Secondaire, dégradés |
| Emerald | `#34d399` | Positif (scores hauts, gains) |
| Amber | `#fbbf24` | Attention (scores moyens) |
| Rose | `#fb7185` | Négatif (scores bas, alertes) |

### Animations
- **Entrées en viewport** : `initial={{ opacity: 0, y: 20 }}` → `whileInView={{ opacity: 1, y: 0 }}` avec stagger
- **viewport={{ once: true }}** : les animations ne se rejouent pas au re-scroll
- **Transitions continues** : toutes en CSS keyframes (GPU composité)
- **Reduced motion** : `prefers-reduced-motion: reduce` désactive toutes les animations CSS

### Accessibilité
- Contrastes AA sur tous les textes
- Navigation clavier fonctionnelle
- `alt` sur toutes les images
- `aria-label` sur les éléments de navigation

---

## Gestion d'état

### Niveau App (composant racine)

```typescript
const [diagResult, setDiagResult] = useState<DiagResult | null>(null);  // Résultat du diagnostic
const [contactMode, setContactMode] = useState<'callback' | 'message'>('callback');  // Mode formulaire
```

**Handlers :**
- `handleDiagComplete(result)` → stocke le résultat du diagnostic
- `handleContactFromDiag()` → switch en mode callback + scroll vers contact

### Niveau Navbar

```typescript
const [activeSection, setActiveSection] = useState('');  // Section visible
const [mobileOpen, setMobileOpen] = useState(false);      // Menu mobile
```

### Niveau ImpactCalculator

```typescript
const [hoursPerWeek, setHoursPerWeek] = useState(4);
const [hourlyRate, setHourlyRate] = useState(45);
const [monthlyBudget, setMonthlyBudget] = useState(1500);
const [showSources, setShowSources] = useState(false);
```

Valeurs calculées (pas de state) : `hoursPerMonth`, `timeSavingMonth`, `contractSavingMonth`, `totalMonthly`, `totalAnnual`

### Niveau DiagnosticExpress

```typescript
const [step, setStep] = useState<'intro' | 'quiz' | 'result'>('intro');
const [currentIndex, setCurrentIndex] = useState(0);
const [answers, setAnswers] = useState<Record<number, { id: string; score: number }>>({});
const [result, setResult] = useState<DiagResult | null>(null);
```

### Niveau ContactSection

```typescript
const [mode, setMode] = useState<'callback' | 'message'>(contactMode);
const [formData, setFormData] = useState({ name: '', company: '', email: '', phone: '', message: '' });
const [submitted, setSubmitted] = useState(false);
```

**Effects :**
- Sync du `contactMode` parent vers le state local `mode`
- Pré-remplissage du `formData.message` quand `diagResult` change

---

## CSS custom (index.css)

### Variables @theme
```css
--font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
--color-background-deep: #020617;
--color-surface-glass: rgba(15, 23, 42, 0.6);
--color-optical-blue: #38bdf8;
--color-accent-violet: #7c3aed;
```

### Classes custom

| Classe | Usage |
|--------|-------|
| `.glass-card` | Cartes semi-transparentes avec blur |
| `.premium-glow` | Ombre bleue diffuse |
| `.glow-button` | Bouton avec ombre + hover scale |
| `.fiber-beam` / `.fiber-beam-v` | Traits lumineux horizontaux/verticaux |
| `.hero-kpi-card` | Carte KPI avec shimmer `::after` |
| `.audit-scan-card` | Carte audit avec scan vertical `::after` |
| `.gain-card` | Carte bénéfice avec shimmer + hover |
| `.cause-card` | Carte cause avec hover lift |
| `.diagnostic-container` | Conteneur diagnostic avec overlay gradient |
| `.calc-slider` | Slider custom pour simulateur |

### Keyframes CSS

| Keyframe | Durée | Usage |
|----------|-------|-------|
| `fiber-move-h` | 10s | Fiber beams horizontaux |
| `fiber-move-v` | 15s | Fiber beams verticaux |
| `pulse-slow` | 4s | Pulsation lente d'opacité |
| `float` | 8s | Flottement KPI cards (8px) |
| `hero-glow-drift-1/2/3` | 15–25s | Dérive des orbes ambient |
| `shimmer-sweep` | 8s | Shimmer sur gain-cards |
| `kpi-sweep` | 6s | Shimmer sur KPI cards |
| `audit-scan` | 5s | Scan ligne sur audit card |

---

## Dépendances et assets

### Dépendances npm (production)

| Package | Usage |
|---------|-------|
| `react` + `react-dom` | Framework UI |
| `motion` | Animations (import depuis `motion/react`) |
| `lucide-react` | Icônes SVG |

### Dépendances npm (dev)

| Package | Usage |
|---------|-------|
| `vite` | Bundler + serveur dev |
| `@vitejs/plugin-react` | Plugin React pour Vite |
| `typescript` | TypeScript compiler |
| `tailwindcss` + `@tailwindcss/vite` | CSS utility-first |

### Assets locaux

| Fichier | Usage |
|---------|-------|
| `public/img/photo-1551703599-6b3e8379aa8c.jfif` | Hero background |
| `public/img/photo-1544197150-b99a580bb7a8.jfif` | Section approche |
| `public/img/photo-1451187580459-43490279c0fa.jfif` | Disponible |
| `public/img/photo-1516321318423-f06f85e504b3.jfif` | Disponible |
| `public/img/photo-1550751827-4bd374c3f58b.jfif` | Disponible |
| `public/favicon.svg` | Favicon shield Aegis |

### Ressources externes (CDN)
- Google Fonts : Inter (weights 300–900) via `<link>` dans `index.html`

---

## Points à surveiller

### Fragilités connues
1. **App.tsx monolithique** (~1950 lignes) : toutes les sections dans un seul fichier. Refactorer en fichiers séparés si le projet grossit.
2. **Soumission formulaire** : actuellement `console.log()` + `mailto:`. Nécessite un vrai backend ou service tiers (Formspree, etc.).
3. **Pas d'analytics** : aucun tracking en place. À ajouter si besoin avec consentement cookie.
4. **Mentions légales incomplètes** : placeholders `TODO:` pour SIRET, forme juridique, directeur de publication.
5. **Images Unsplash** : stockées localement. Vérifier les licences si usage commercial.
6. **dist/ versionné** : choix délibéré pour OVH Starter (pas de CI/CD), mais alourdit le repo.

### Limites techniques
- **Pas de SSR/SSG** : React client-side uniquement → SEO limité au HTML initial de `index.html`
- **Pas de routeur** : one-page, pas de pages multiples possibles sans ajout de react-router
- **Pas de backend** : aucun stockage de données, aucun formulaire fonctionnel côté serveur
- **Pas de tests** : aucun test unitaire ou E2E automatisé dans le projet
- **Tailwind CSS 4** : version récente, certaines syntaxes diffèrent de v3 (ex: `@theme` au lieu de `theme.extend`)

### Flèches de guidage — points d'attention
- Les SVG utilisent des `id` uniques (`gf`, `ag1`, `gf2`, `ag2`). Si des SVG supplémentaires sont ajoutés, éviter les conflits d'ID.
- Le `top-[68%]` de Arrow 1 est calculé pour la structure label + space-y-3 + input h-14. Si la hauteur des champs change, recalculer.
- Les flèches overflow du wrapper `relative` : la glass-card ne doit pas avoir `overflow: hidden` (vérifié, ce n'est pas le cas).

---

## Étapes de reprise pour un futur intervenant

### 1. Lire la documentation
```
CLAUDE.md          → Règles projet, identité, contraintes
AGENTS.md          → Règles d'exécution pour agents IA
docs/ARCHITECTURE.md  → Ce fichier
design-guidelines.md  → Charte graphique détaillée
```

### 2. Vérifier l'état du repo
```bash
cd c:\Dev\Aegisnetwork
git status --short --branch
git log --oneline -5
```

### 3. Installer et vérifier le build
```bash
npm install
npm run build      # doit passer sans erreur (tsc + vite)
npm run dev        # serveur dev sur http://localhost:3000
```

### 4. Identifier les fichiers à modifier
- `src/App.tsx` : 99% du code fonctionnel du site
- `src/index.css` : styles custom et animations
- `src/components/AegisLogo.tsx` : logo SVG
- `index.html` : preload, meta, fonts

### 5. Faire des modifications
- Travailler par patchs minimaux et ciblés
- Tester avec `npm run dev` après chaque changement
- Vérifier le build : `npm run build`
- Ne pas toucher à `stitch/` (lecture seule, source design)

### 6. Committer et déployer
```bash
npm run build
git add -A
git commit -m "description concise du changement"
git push origin main
```

### 7. Points de vigilance
- Respecter `prefers-reduced-motion` pour toute nouvelle animation CSS
- Garder le ton éditorial (voir `.claude/rules/content.md`)
- Ne jamais inventer d'informations légales, d'adresse ou de téléphone
- Ne pas ajouter de dépendances lourdes sans justification
- Ne pas ajouter de pages (one-page uniquement)

---

## Build & Déploiement

```bash
npm run build      # tsc --noEmit && vite build → dist/
```

**Taille du build** (mars 2026) : ~108 kB CSS + ~408 kB JS (gzip : ~16 + ~124 = ~140 kB total)

Le dossier `dist/` est un site statique. Le `.htaccess` redirige les requêtes Apache vers `dist/` et force HTTPS.

Voir [DEPLOYMENT_OVH_STARTER.md](DEPLOYMENT_OVH_STARTER.md) pour le guide de déploiement complet.

---

## Workflow Stitch

Google Stitch génère les mises à jour design dans `stitch/`. Pour intégrer :

1. Comparer `stitch/src/` avec `src/`
2. Appliquer les deltas manuellement
3. Ne jamais modifier `stitch/` directement
4. `stitch/design-guidelines.md` est la référence graphique
5. `stitch/elements/Elements.tsx` contient des composants UI réutilisables (lecture seule)
