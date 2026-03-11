# Prochaines étapes — Aegis Network

## Priorité haute (avant ou juste après le lancement)

### Contenu à compléter

- [ ] Confirmer l'email de contact définitif (`contact@aegisnetwork.fr` ou autre)
- [ ] Rédiger et intégrer les mentions légales (obligatoire pour un site pro en France)
- [ ] Ajouter une politique de confidentialité si des données sont collectées (formulaire futur, analytics)

### Identité visuelle

- [ ] Intégrer le logo final (SVG recommandé) en remplacement du texte dans la navbar
- [ ] Mettre à jour le `favicon.svg` avec le logo définitif
- [ ] Valider ou ajuster la palette violet avec la direction artistique finale
- [ ] Ajouter les éventuels visuels / illustrations dans `assets/img/`

### SEO de base

- [ ] Ajouter les balises Open Graph (`og:title`, `og:description`, `og:image`)
- [ ] Ajouter les balises Twitter Card
- [ ] Créer un `robots.txt` (autoriser l'indexation)
- [ ] Créer un `sitemap.xml` minimal
- [ ] Vérifier le bon fonctionnement sur Google Search Console

## Priorité moyenne (amélioration continue)

### Fonctionnalités

- [ ] Ajouter un formulaire de contact (service tiers type Formspree, ou backend léger)
- [ ] Ajouter un numéro de téléphone si pertinent
- [ ] Envisager un chat simple (Crisp, tawk.to) si besoin de réactivité

### Performance & technique

- [ ] Auditer avec Lighthouse (cible : 90+ sur les 4 axes)
- [ ] Optimiser les images futures (WebP, lazy loading)
- [ ] Envisager un service worker pour le cache offline (optionnel)

### Analytics

- [ ] Choisir une solution d'analytics respectueuse (Plausible, Matomo, ou GA4 avec consentement)
- [ ] Intégrer le script uniquement après validation
- [ ] Ajouter le bandeau de consentement cookies si nécessaire

## Priorité basse (évolutions futures)

- [ ] Ajouter des témoignages clients (quand disponibles)
- [ ] Ajouter une section FAQ si des questions reviennent fréquemment
- [ ] Envisager une version anglaise si la clientèle le justifie
- [ ] Évaluer le besoin d'un blog ou d'une section actualités
- [ ] Considérer un passage à un générateur statique (Hugo, 11ty) si le contenu se complexifie

## Ce qu'il ne faut PAS faire à court terme

- Ne pas ajouter de CMS
- Ne pas migrer vers un framework JS
- Ne pas ajouter de base de données
- Ne pas complexifier l'hébergement
- Garder le site en une seule page tant que le besoin n'évolue pas
