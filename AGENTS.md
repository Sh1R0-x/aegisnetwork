# AGENTS.md

## Références à lire

- Lire `README.md`, `CLAUDE.md` et `docs/WORKFLOW_COLLABORATION.md` avant toute modification structurante.

## MCP à privilégier

- Utiliser `context7` en premier pour toute documentation technique récente, versionnée ou potentiellement changeante.
- `playwright` et `chrome-devtools` sont configurés dans `.mcp.json` mais ne sont pas nécessaires au workflow courant.
- Ne pas ajouter de MCP sans justification claire et gain concret immédiat.

## Règles d'exécution

- Toujours partir de la racine réelle du repo : `C:\Dev\Aegisnetwork`.
- Vérifier `git status --short --branch` avant d'agir.
- Rester strictement dans ce dépôt ; aucun fichier hors scope ou hors repo.
- Travailler par patchs minimaux et ciblés ; pas de refonte implicite.
- Stack : React 19 + TypeScript + Tailwind CSS 4 + Vite 6, build statique déployé sur OVH Starter.
- Mettre à jour la documentation après tout changement structurant.
- Signaler clairement les hypothèses et points non vérifiés.
- Rendre chaque changement compréhensible pour l'agent suivant.
- GitHub `origin/main` reste la source de vérité.
- Si `context7` peut fournir la documentation récente, ne pas improviser de mémoire.
- Rester minimal et pragmatique. Pas de serveur MCP ajouté sans besoin concret.
- Ne pas dupliquer dans le repo un MCP déjà fourni nativement par l'environnement.
- Ne pas utiliser les MCP globaux non pertinents pour ce repo (`figma`, `herd`, `laravel-boost`, `iconify-icons`, `svgl-logos`) sauf demande explicite.

## Reprise du projet par un agent

1. Lire `CLAUDE.md`, `README.md`, `AGENTS.md` et `docs/WORKFLOW_COLLABORATION.md`
2. `git status --short --branch` pour vérifier l'état du repo
3. `npm run lint` pour vérifier la cohérence TypeScript
4. Identifier les fichiers impactés avant toute modification
5. Travailler par patchs minimaux, vérifier le build après chaque bloc
6. Mettre à jour la doc si le changement est structurant
7. `npm run build` + `git add -A` + `git commit` + `git push origin main`

## Sources de vérité

- `CLAUDE.md` : règles projet, stack, charte, contacts
- `design-guidelines.md` : charte graphique détaillée
- `stitch/` : source design Google Stitch (lecture seule)
- GitHub `origin/main` : état de référence du code
