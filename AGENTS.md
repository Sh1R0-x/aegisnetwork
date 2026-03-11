# AGENTS.md

## Références à lire

- Lire `README.md`, `CLAUDE.md` et `docs/WORKFLOW_COLLABORATION.md` avant toute modification structurante.

## MCP à privilégier

- Utiliser `context7` en premier pour toute documentation technique récente, versionnée ou potentiellement changeante.
- Utiliser `playwright` pour les smoke tests navigateur, les parcours simples et les vérifications UI de base.
- Utiliser `chrome-devtools` pour le debug front ciblé : console, réseau, layout, performance.
- Utiliser `github` uniquement si le dépôt est réellement relié à GitHub et que la tâche porte sur des PR, issues, reviews ou Actions.

## Règles d'exécution

- Toujours partir de la racine réelle du repo : `C:\Dev\Aegisnetwork`.
- Vérifier `git status --short --branch` avant d'agir.
- Rester strictement dans ce dépôt ; aucun fichier hors scope ou hors repo.
- Travailler par patchs minimaux et ciblés ; pas de refonte implicite.
- Conserver une stack statique compatible OVH Starter : HTML, CSS, JS vanilla, sans SSR, CMS, DB ni runtime Node côté hébergement.
- Mettre à jour la documentation après tout changement structurant.
- Signaler clairement les hypothèses et points non vérifiés.
- Rendre chaque changement compréhensible pour l'agent suivant.
- GitHub `origin/main` reste la source de vérité.
- Si `context7` peut fournir la documentation récente, ne pas improviser de mémoire.
- Rester minimal et pragmatique. Pas de serveur MCP ajouté sans besoin concret.
- Ne pas dupliquer dans le repo un MCP déjà fourni nativement par l'environnement.
- Ne pas utiliser les MCP globaux non pertinents pour ce repo (`figma`, `herd`, `laravel-boost`, `iconify-icons`, `svgl-logos`) sauf demande explicite.
