# Workflow de collaboration — Aegis Network

## Outils

| Outil         | Rôle                                    |
| ------------- | --------------------------------------- |
| VS Code       | Édition, terminal, extensions           |
| GitHub Copilot| Autocomplétion, chat, agent             |
| Claude        | Modifications structurantes, revue      |
| Codex         | Tâches batch, refactoring               |
| Google Stitch | Génération et mise à jour du design     |

## Fichiers de configuration agents

- `CLAUDE.md` — Règles projet pour Claude
- `AGENTS.md` — Règles d'exécution pour tous les agents
- `.claude/rules/frontend.md` — Règles React / Tailwind / Motion
- `.claude/rules/content.md` — Règles de contenu et copywriting
- `.github/copilot-instructions.md` — Instructions Copilot (si présent)

## Workflow quotidien

### Avant toute modification

```bash
git status --short --branch    # Vérifier l'état du repo
npm run lint                   # Vérifier les types TypeScript
```

### Développement

```bash
npm run dev                    # Serveur Vite sur http://localhost:3000
```

### Avant de committer

```bash
npm run build                  # Vérifier que le build passe
git add -A
git commit -m "description concise"
git push origin main
```

## Workflow Stitch (mises à jour design)

1. Exporter depuis Google Stitch → copier dans `stitch/`
2. Comparer `stitch/src/App.tsx` avec `src/App.tsx`
3. Appliquer les changements visuels dans `src/`
4. Vérifier avec `npm run dev`
5. Builder, committer, pousser

## Conventions de commit

- Messages en anglais ou français, concis
- Un commit = un changement logique
- `dist/` est versionné (il contient le build de production déployé sur OVH)
- `node_modules/` n'est jamais commité
- Toujours exécuter `npm run build` avant de committer pour que `dist/` soit à jour

## Règles partagées

- `main` est la branche de production
- GitHub est la source de vérité
- Toujours lire `CLAUDE.md` et `AGENTS.md` avant une modification structurante
- Ne jamais modifier `stitch/` directement
- Mettre à jour la doc après tout changement d'architecture

## Reprise après modifications d'un autre agent

1. `git pull origin main` pour récupérer la dernière version
2. Lire `CLAUDE.md` (sections, contacts, mentions légales, MCP)
3. `npm install` si `package.json` a changé
4. `npm run lint` pour vérifier la cohérence
5. Ne pas refactorer du code existant sans demande explicite
6. Si un doute existe sur un choix précédent, le signaler au lieu de le modifier
