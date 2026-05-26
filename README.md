# Rig

Community wiki and CLI toolkit for [OpenCode](https://github.com/anomalyco/opencode) and [oh-my-openagent](https://github.com/code-yeongyu/oh-my-openagent). Docs, playbooks, config generator — everything you need to code with agents.

**[srmdn.github.io/rig](https://srmdn.github.io/rig/)**

## What's here

| Section | What |
|---|---|
| **Docs** (VitePress) | Agent pipeline, skills ecosystem, playbooks, reference — the community wiki |
| **omo-kit** (CLI) | Interactive config generator, validator, theme tools — no more hand-editing JSON |

## omo-kit CLI

Generate, validate, and manage your oh-my-openagent configuration without touching JSON.

```bash
# Install (requires Bun)
bun install -g omo-kit
```

Source: [github.com/srmdn/omo-kit](https://github.com/srmdn/omo-kit)

### Commands

```
omo-kit init       Generate oh-my-openagent.json, opencode.json, tui.json,
                  CLAUDE.md, and AGENTS.md interactively
omo-kit doctor     Validate existing config files for common issues
omo-kit theme      Validate or generate OpenCode themes
```

**init** walks you through:
- Stack selection (7 templates: Go, Python, Node, Astro, Rust, Svelte, Generic)
- Model providers
- Orchestrator model
- Budget tier (generous, frugal, free-only)

Stack templates come with agent tuning: back-end stacks (Go, Rust) disable frontend skills and boost thinking budgets; full-stack stacks keep everything enabled.

**doctor** checks 13 issues across your configs — JSON syntax, missing keys, legacy schemas, tab indentation, empty files, and more.

**theme** validates theme files (flat hex or `{dark, light}` object format) and generates new ones interactively.

## Docs site

Built with VitePress. Deployed to GitHub Pages on every push to `master`.

```bash
pnpm install
pnpm dev      # http://localhost:5173
pnpm build    # outputs to .vitepress/dist/
```

## Stack templates

Drop a new directory in `src/templates/` in the [omo-kit repo](https://github.com/srmdn/omo-kit) with `CLAUDE.md`, `AGENTS.md`, and `profile.json` — it's auto-discovered by `init`. No code changes needed.

Templates ship with `profile.json` for agent tuning:
- **Go, Rust**: disable frontend skills/MCPs, oracle thinking 16K tokens
- **Node, Astro, Svelte, Python, Generic**: no restrictions

## Contributing

Docs edits via the "Edit this page" link on each page. New playbooks, skill guides, or stack templates welcome — open a PR.

## License

MIT
