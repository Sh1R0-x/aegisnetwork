# AGENTS.md

## MCP à privilégier

- Utiliser `context7` en premier pour toute documentation technique récente, versionnée ou potentiellement changeante.
- Utiliser `playwright` pour les smoke tests navigateur, les parcours simples et les vérifications UI de base.
- Utiliser `chrome-devtools` pour le debug front ciblé : console, réseau, layout, performance.
- Utiliser `github` uniquement si le dépôt est réellement relié à GitHub et que la tâche porte sur des PR, issues, reviews ou Actions.

## Règles

- Si `context7` peut fournir la documentation récente, ne pas improviser de mémoire.
- Rester minimal et pragmatique. Pas de serveur MCP ajouté sans besoin concret.
- Ne pas dupliquer dans le repo un MCP déjà fourni nativement par l'environnement.
- Ne pas utiliser les MCP globaux non pertinents pour ce repo (`figma`, `herd`, `laravel-boost`, `iconify-icons`, `svgl-logos`) sauf demande explicite.
