# Getting Started

Welcome to **Rig**: the community wiki for [OpenCode](https://github.com/opencode-ai/opencode) and [oh-my-openagent](https://github.com/srmdn/oh-my-openagent) (oMO).

If you're new to AI-assisted coding, or just new to this toolchain, you're in the right place. This section walks you through everything you need to go from zero to productive.

## What is this site?

Rig is a community-maintained knowledge base. It covers:

- **OpenCode**: an open-source CLI and TUI that connects you to AI coding agents. Think of it as the runtime: it runs your sessions, manages context, and talks to language models.
- **oh-my-openagent (oMO)**: a configuration layer and skill ecosystem that sits on top of OpenCode. oMO adds a multi-agent pipeline (Prometheus → Atlas → Sisyphus), curated skills, and project conventions so you can do more with less prompting.

OpenCode is the engine. oMO is the turbocharger.

## Who is this for?

- **Developers new to AI coding tools**: you've heard about vibe coding and want to try it with a real workflow, not just chat.
- **OpenCode users looking to level up**: you've run `opencode` but want the structured pipeline and skills that oMO provides.
- **Teams standardizing on AI tooling**: you want shared configs, project conventions, and playbooks everyone can follow.

## How to use this guide

The Getting Started section is four pages, each self-contained:

1. **[Install OpenCode](/getting-started/install-opencode)**: get the CLI running on your machine.
2. **[Install oMO](/getting-started/install-omo)**: add the pipeline, skills, and conventions on top.
3. **[Your First Session](/getting-started/first-session)**: open a project, ask a question, and see the agent pipeline in action.

Once you're up and running, explore the rest of the wiki:

- [The oMO Pipeline](/pipeline/) — how Prometheus, Atlas, and Sisyphus work together.
- [Skills Ecosystem](/skills/) — built-in skills, categories, and creating your own.
- [Playbooks](/playbooks/) — real workflows for real tasks.
- [Reference](/reference/) — deep configuration docs for `oh-my-openagent.json`, model selection, and more.

## A note on conventions

Throughout this wiki you'll see references to two project files:

- **`CLAUDE.md`**: project instructions for Claude Code. Lives in your repo root.
- **`AGENTS.md`**: project instructions for Codex / OpenCode agents. Also lives in your repo root.

These files tell agents about your project's stack, conventions, and rules. oMO uses them automatically. You don't need to create them by hand — the installer sets up sensible defaults, and you can customize them later.

::: tip
If you already have OpenCode installed and just want oMO, skip ahead to [Install oMO](/getting-started/install-omo).
:::
