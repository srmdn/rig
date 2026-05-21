# omo-kit init

Interactive config generator. Answer a few questions — get a complete OMO + OpenCode workspace.

## Usage

```bash
bunx omo-kit init
```

## What it asks

1. **Stack** — Go, Node, Astro, or Generic. Determines `CLAUDE.md` and `AGENTS.md` conventions.
2. **Model providers** — Which providers you have API access to (opencode-go, anthropic, openai, github-copilot, gemini).
3. **Orchestrator model** — Primary model for Sisyphus, Oracle, Prometheus.
4. **Budget** — Generous (premium models everywhere), Frugal (premium for orchestrator, free for subagents), Free-only (all free-tier models).

## What it generates

| File | What |
|---|---|
| `opencode.json` | Provider config, model selections, theme, autoupdate |
| `oh-my-openagent.json` | Agent model chains, category routing, thinking budgets |
| `tui.json` | Theme selection |
| `CLAUDE.md` | Stack-specific project conventions for Claude Code |
| `AGENTS.md` | Stack-specific project conventions for OpenCode agents |

## Example session

```
$ bunx omo-kit init

? Stack: Go
? Model providers: opencode-go, github-copilot
? Primary orchestrator model: deepseek-v4-pro
? Budget: Frugal

✔ Generated:
  • opencode.json
  • oh-my-openagent.json
  • tui.json
  • CLAUDE.md
  • AGENTS.md

✔ Ready. Start with: opencode
  Docs: https://github.com/srmdn/rig/tree/main/cli
```

## After init

```bash
opencode
```

OMO reads `CLAUDE.md` and `AGENTS.md` automatically. Your agents now know your stack conventions without pasting context.

::: tip
Run `bunx omo-kit doctor` to validate the generated configs.
:::
