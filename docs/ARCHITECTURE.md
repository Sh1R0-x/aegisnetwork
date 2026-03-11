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
| `CountUp`              | Compteur animé (utilitaire)                  |
| `FiberBeams`           | Fond animé fibre optique (CSS keyframes)     |
| `Navbar`               | Navigation fixe avec section active auto (IntersectionObserver) |
| `Hero`                 | Accroche principale + CTA + fond animé premium  |
| `Stats`                | 3 KPI animés (débit, uptime, support)        |
| `Solutions`            | Grille 2 colonnes : Internet fibre & VoIP    |
| `VoIPSection`          | Détail téléphonie pro                        |
| `InfrastructureSection`| Détail infrastructure réseau                 |
| `CTASection`           | Appel à l'action intermédiaire               |
| `ContactSection`       | Formulaire de contact (front-only)           |
| `LegalModal`           | Mentions légales (modal depuis le footer)     |
| `Footer`               | Pied de page + ouverture mentions légales     |

## Conventions

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
