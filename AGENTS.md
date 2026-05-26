# AGENTS.md — Rig

## What this is

Docs site (VitePress) + CLI toolkit (Bun) for OpenCode and oh-my-openagent.
Deployed to GitHub Pages at `srmdn.github.io/rig`.

## Structure

- `*.md` at root — VitePress docs pages, rendered from repo root
- `.vitepress/` — VitePress config, theme, dist output
- `cli/src/` — omo-kit CLI: `init`, `doctor`, `theme` commands (Bun)
- `cli/src/templates/` — stack-specific scaffolding (CLAUDE.md, AGENTS.md, profile.json per stack)
- `cli/src/commands/` — one file per CLI command

## Commands

- `pnpm dev` — docs dev server (localhost:5173)
- `pnpm build` — build docs to `.vitepress/dist/`
- `pnpm lint` — markdownlint all .md files
- `pnpm check` — lint + build
- `bun run cli/src/index.ts <cmd>` — run CLI locally

## Conventions

- Docs pages use VitePress frontmatter and standard markdown
- CLI uses Bun native APIs, no frameworks
- New stack templates: drop directory in `cli/src/templates/`, auto-discovered by `init`
- CLI commands live in `cli/src/commands/`, one file per command
- No new dependencies without approval
- Docs edits via PR, not direct push to master
- Run `pnpm check` before committing
