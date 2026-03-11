# MCP

## Retenu

- `context7` : documentation technique récente, versionnée, prioritaire.
- `playwright` : smoke tests navigateur, parcours simples, vérifications UI de base.
- `chrome-devtools` : console, réseau, layout, performance.
- `github` : optionnel, à activer seulement si le workflow GitHub est réellement utilisé.

## Écarté

- `figma`, `iconify-icons`, `svgl-logos` : hors besoin immédiat.
- `herd`, `laravel-boost` : hors stack de ce repo.
- Tout autre MCP : pas de justification projet à ce stade.

## État actuel

- `Codex` : `context7`, `playwright` et `chrome-devtools` sont déjà actifs nativement dans l'environnement.
- Versions testées ici : `@upstash/context7-mcp@2.1.1`, `@playwright/mcp@0.0.68`, `chrome-devtools-mcp@0.19.0`.
- `Claude` : la CLI n'est pas installée ici ; le repo fournit une `.mcp.json` projet prête à l'emploi.
- `GitHub MCP` : non activé par défaut pour éviter une config inutile tant que le repo n'est pas branché sur un workflow GitHub réel.

## Vérification

- `codex mcp list`
- `codex mcp get context7`
- `claude mcp list`

## Installation si nécessaire

Codex :

```powershell
codex mcp add context7 -- npx -y @upstash/context7-mcp@2.1.1
codex mcp add playwright -- npx -y @playwright/mcp@0.0.68
codex mcp add chrome-devtools -- npx -y chrome-devtools-mcp@0.19.0
```

Claude :

- Le repo versionne déjà `.mcp.json`.
- À la première ouverture du projet, approuver les serveurs projet dans Claude.

GitHub MCP optionnel :

```powershell
codex mcp add github --url https://api.githubcopilot.com/mcp/
codex mcp login github
```

```powershell
claude mcp add --scope user --transport http github https://api.githubcopilot.com/mcp/
```

## Tests réalisés ici

- `Context7` : résolution d'une librairie (`/vercel/next.js`) puis requête de documentation réussie.
- `Playwright MCP` : navigation `http://localhost:4173/` et snapshot réussis.
- `chrome-devtools-mcp` : ouverture `http://localhost:4173/`, snapshot OK, console vide, requêtes réseau OK.
- `.mcp.json` : syntaxe JSON validée localement ; exécution non testée faute de CLI `Claude`.

## Manuel restant

- Installer `Claude` si vous voulez exécuter la `.mcp.json` localement.
- Terminer l'authentification OAuth si `GitHub MCP` est activé.
