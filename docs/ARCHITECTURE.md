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
src/
  main.tsx              ← Bootstrap React (StrictMode)
  App.tsx               ← Composant racine, toutes les sections
  index.css             ← Tailwind @theme + animations custom
  components/
    AegisLogo.tsx       ← Logo SVG animé (gradient + nodes)
public/
  favicon.svg           ← Favicon Aegis
  img/                  ← Images locales (Unsplash downloads)
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
| `Navbar`               | Navigation fixe avec logo et liens ancres    |
| `Hero`                 | Accroche principale + CTA                    |
| `Stats`                | 3 KPI animés (débit, uptime, support)        |
| `Solutions`            | Grille 2 colonnes : Internet fibre & VoIP    |
| `VoIPSection`          | Détail téléphonie pro                        |
| `InfrastructureSection`| Détail infrastructure réseau                 |
| `CTASection`           | Appel à l'action intermédiaire               |
| `ContactSection`       | Formulaire de contact (front-only)           |
| `BrandBook`            | Showcase charte graphique (couleurs, typo)   |
| `Footer`               | Pied de page avec liens et mentions          |

## Conventions

- **Un composant = une section** dans `App.tsx` (pas de fichier séparé sauf si réutilisable)
- **Composants réutilisables** dans `src/components/` (ex: `AegisLogo`)
- **Animations d'entrée** : `initial={{ opacity: 0, y: 20 }}` → `whileInView={{ opacity: 1, y: 0 }}`
- **CSS custom** : glassmorphism (`.glass-card`), glow (`.premium-glow`, `.glow-button`), fiber beams
- **Responsive** : mobile-first avec `md:` et `lg:`

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
