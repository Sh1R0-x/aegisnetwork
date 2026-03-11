# Workflow de collaboration — Claude / Copilot Chat / Codex

## Principe

Un seul repo, un seul workspace, une seule branche principale (`main`).
GitHub est la source de vérité. Tous les outils travaillent sur le même dépôt.

## Avant toute intervention

1. **Vérifier le workspace** — le terminal doit pointer sur `c:\Dev\Aegisnetwork`
2. **Lire `git status`** — repérer les fichiers modifiés, non suivis ou en conflit
3. **Lire la doc projet** — `CLAUDE.md`, `README.md`, `AGENTS.md` en priorité
4. **Relire les derniers fichiers modifiés** si un autre outil est passé avant

## Pendant l'intervention

- Travailler uniquement dans le repo (pas de fichiers hors `c:\Dev\Aegisnetwork`)
- Privilégier des patchs minimaux et ciblés
- Ne pas introduire de dépendance, de build, ou de stack incompatible OVH Starter
- Documenter les changements structurants (mettre à jour la doc si nécessaire)
- Signaler clairement les hypothèses prises

## Après l'intervention

- Vérifier `git status` — tout fichier modifié doit être prêt à commit
- Laisser le repo dans un état propre et compréhensible
- Le prochain outil (Claude, Copilot, Codex, humain) doit pouvoir reprendre sans ambiguïté

## Commit & push

```bash
git add .
git commit -m "Description courte et claire"
git push origin main
```

Chaque modification poussée sur `main` est automatiquement déployée sur OVH.

## Règles pour éviter les dérives

| Règle | Raison |
|-------|--------|
| 1 repo unique | Pas de confusion de dossier entre outils |
| 1 branche `main` | Simplicité, déploiement direct sur OVH |
| Pas de fichier hors repo | Copilot et Codex ne voient que le workspace |
| Lire avant d'écrire | Éviter les régressions et doublons |
| Patchs minimaux | Réduire le risque de casse |
| Doc à jour | Le prochain agent doit comprendre l'état du projet |
| Pas de build tooling | Le site doit rester déployable sans étape de build |

## Qui fait quoi

| Outil | Usage principal |
|-------|-----------------|
| **VS Code** | Édition directe, preview Live Server, terminal Git |
| **Copilot Chat** | Modifications ciblées, refactoring, questions sur le code |
| **Claude** | Modifications structurantes, documentation, audit |
| **Codex** | Tâches automatisées, génération, tests MCP |
| **Git / GitHub** | Versioning, source de vérité, déploiement OVH |
