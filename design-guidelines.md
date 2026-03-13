# AEGIS NETWORK - Design Guidelines & Developer Handoff

This document provides the technical and design specifications for the AEGIS NETWORK web application. Use this as a reference for implementation, maintenance, or further development.

## 1. Visual Identity & Branding

### Logo
- **Component**: `AegisLogo.tsx`
- **Design**: Custom SVG with a "photon node" structure.
- **Effects**:
  - `radialGradient` for the core glow.
  - `filter: drop-shadow` for the outer aura.
  - Animated nodes using `motion` (pulsing opacity and scale).
- **Tracking (Letter Spacing)**: `0.06em` for the main title "AEGIS NETWORK" (with `word-spacing: 0.2em` for increased inter-word gap).
- **Tagline**: "Conseil & Optimisation IT" with `0.25em` tracking.

### Typography
- **Primary Font**: **Inter** (Sans-serif).
- **Headings**: `font-black` (Weight 900) with `tracking-tighter` or custom tracking.
- **Body**: `font-medium` (Weight 500) or `font-normal` (Weight 400).
- **Micro-labels**: `uppercase`, `tracking-widest`, `font-bold`.

### Color Palette
| Name | Hex Code | Tailwind Class | Usage |
| :--- | :--- | :--- | :--- |
| **Optical Blue** | `#3b82f6` | `text-blue-500` / `bg-blue-500` | Primary brand color, accents, glows. |
| **Deep Background** | `#020617` | `bg-slate-950` | Main background color. |
| **Accent Violet** | `#7c3aed` | `bg-violet-600` | Secondary brand color, gradients. |
| **Slate Text** | `#94a3b8` | `text-slate-400` | Secondary text, descriptions. |
| **White** | `#ffffff` | `text-white` | Primary text, high contrast. |

---

## 2. Visual Effects & Animations

### Motion Library
The app uses `motion/react` (Framer Motion) for all animations.

- **Entrance Animations**: Most sections use `initial={{ opacity: 0, y: 20 }}` and `whileInView={{ opacity: 1, y: 0 }}`.
- **Floating Effect**: The Hero image uses a custom `animate-float` CSS animation (defined in `index.css`).
- **Fiber Beams**: Background "data beams" are implemented in the `FiberBeams` component using CSS keyframes (`fiber-h` and `fiber-v`).
- **Glow Effects**:
  - `premium-glow`: A custom utility for subtle border glows.
  - `glow-button`: A gradient-based button with a hover scale and shadow intensity increase.

---

## 3. Image Assets & Mapping

All images are sourced from Unsplash for high-quality professional visuals.

| Section | Usage | Unsplash URL | Description |
| :--- | :--- | :--- | :--- |
| **Hero** | Main Visual | [Link](https://images.unsplash.com/photo-1551703599-6b3e8379aa8c) | Abstract Fiber Optic Technology. |
| **VoIP** | Background | [Link](https://images.unsplash.com/photo-1550751827-4bd374c3f58b) | Network/Data Visualization (Mix-blend-screen). |
| **VoIP** | Feature Card | [Link](https://images.unsplash.com/photo-1516321318423-f06f85e504b3) | Professional using digital tools. |
| **Infrastructure** | Server Room | [Link](https://images.unsplash.com/photo-1544197150-b99a580bb7a8) | Modern Server Room/Data Center. |
| **Infrastructure** | Satellite | [Link](https://images.unsplash.com/photo-1451187580459-43490279c0fa) | Global Connectivity/Satellite. |

---

## 4. Layout & Components

### Navigation Bar
- **Height**: `h-24` (96px).
- **Behavior**: `fixed`, `backdrop-blur-md`, `bg-background-deep/80`.
- **Links**: Balanced at `text-base` (16px) with `font-bold`.

### Glassmorphism
- **Class**: `glass-card`.
- **Properties**: Semi-transparent background, subtle border (`border-white/10`), and `backdrop-blur`.

### Footer
- **Consistency**: Matches the Navbar's typography and tracking.
- **Year**: Hardcoded to `2026` for current relevance.

---

## 5. Developer Notes (Claude)
- **Tailwind CSS**: The project relies heavily on Tailwind utility classes.
- **Lucide Icons**: All icons are from the `lucide-react` library.
- **Responsive Design**: Mobile-first approach using Tailwind's `md:` and `lg:` prefixes.
- **Performance**: Images use `referrerPolicy="no-referrer"` and `loading="lazy"` (where applicable) for optimal loading.
