# MCP

## Retenu

- `context7` : documentation technique récente, versionnée, prioritaire. Seul MCP nécessaire au workflow courant.

## Configurés mais non nécessaires

- `playwright` : disponible dans `.mcp.json` si besoin de tests E2E, mais pas utilisé actuellement.
- `chrome-devtools` : disponible dans `.mcp.json` si besoin de debug automatisé, mais le debug F12 manuel suffit.

## Écarté

- `github` : non activé, pas de workflow GitHub Actions/PR actif.
- `figma`, `iconify-icons`, `svgl-logos` : hors besoin.
- `herd`, `laravel-boost` : hors stack.

## Configuration

Le fichier `.mcp.json` à la racine du repo contient la config des 3 serveurs (context7, playwright, chrome-devtools). Seul context7 est utilisé en pratique.

## Manuel restant

- Installer `Claude` si vous voulez exécuter la `.mcp.json` localement.
- Terminer l'authentification OAuth si `GitHub MCP` est activé.
