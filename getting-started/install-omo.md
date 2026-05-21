# Installing oh-my-openagent (oMO)

oh-my-openagent (oMO) is a configuration layer and skill ecosystem that sits on top of OpenCode. It adds a multi-agent pipeline (Prometheus → Atlas → Sisyphus), category-based model routing, and 50+ lifecycle hooks.

## Prerequisites

- **OpenCode** installed and working — see [Install OpenCode](/getting-started/install-opencode) if you haven't yet.
- **Bun** — OMO runs on Bun. `curl -fsSL https://bun.sh/install | bash` if needed.

## Install

```bash
bunx oh-my-openagent install
```

Or via OpenCode's built-in plugin manager:

```bash
opencode plugin oh-my-openagent
```

Both do the same thing: register the plugin, install default skills, and create agent pipeline config.

::: tip Quick setup
Prefer a guided experience? Use `omo-kit` (bundled with Rig):

```bash
bunx omo-kit setup
```

Interactive prompts generate your `oh-my-openagent.json` with model chains, thinking budgets, and category routing — validated before save. [Learn more →](/reference/config)
:::

## Verify

Open any project and start OpenCode:

```bash
cd ~/Developer/projects/my-project
opencode
```

Inside the TUI, type `/help`. You should see oMO slash commands (`/start-work`, `/diagnose`, `/grill-me`) listed alongside OpenCode built-ins.

Check agents are loaded:

```
/agents
```

Should list Prometheus, Atlas, Sisyphus, Oracle, and subagents.

## What got installed

| Path | What |
|---|---|
| `~/.config/opencode/oh-my-openagent.json` | Agent and category model routing |
| `~/.config/opencode/plugins/` | OMO plugin registration |
| `~/.config/opencode/skills/` | Built-in skill definitions |

Project-level files oMO reads automatically:

| File | Purpose |
|---|---|
| `CLAUDE.md` | Project conventions for Claude Code sessions |
| `AGENTS.md` | Project conventions for OpenCode agents |

## Updating

```bash
bunx oh-my-openagent install
```

The installer is idempotent — re-running won't overwrite customizations unless upstream defaults have changed.

## Next

[Your First Session →](/getting-started/first-session)
