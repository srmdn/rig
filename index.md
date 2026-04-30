# Rig

Community wiki for [OpenCode](https://github.com/opencode-ai/opencode) and [oh-my-openagent](https://github.com/srmdn/oh-my-openagent). Agent pipeline, skills ecosystem, playbooks, and setup guides: everything you need to ship faster with AI tooling.

## What is this?

Two tools, one workflow:

- **OpenCode**: an open-source CLI and TUI that connects you to AI coding agents. It's the runtime: sessions, context, language models.
- **oh-my-openagent (oMO)**: a configuration layer and skill ecosystem on top. Multi-agent pipeline (Prometheus → Atlas → Sisyphus), curated skills, project conventions.

Together they let you code with agents the way senior engineers work: plan first, delegate smart, verify everything.

## Who is this for?

- **Developers new to AI coding tools**: you've heard about vibe coding and want a real workflow.
- **OpenCode users looking to level up**: you've run `opencode` but want the structured pipeline oMO provides.
- **Teams standardizing on AI tooling**: shared configs, project conventions, playbooks everyone can follow.

## Quickstart

1. **[Install OpenCode](/getting-started/install-opencode)**: get the CLI running on your machine.
2. **[Install oMO](/getting-started/install-omo)**: add the pipeline, skills, and conventions.
3. **[Your First Session](/getting-started/first-session)**: open a project, ask a question, see the pipeline.

## Explore

- [The oMO Pipeline](/pipeline/): how Prometheus, Atlas, and Sisyphus work together.
- [Skills Ecosystem](/skills/): built-in skills, categories, Matt Pocock, MCP, DIY.
- [Playbooks](/playbooks/): real workflows for real tasks.
- [Reference](/reference/): deep config docs for `oh-my-openagent.json`, model selection, and more.

## Start here

Every project oMO knows about uses two files in the repo root:

- **`CLAUDE.md`**: project instructions for Claude Code sessions.
- **`AGENTS.md`**: project instructions for Codex / OpenCode agents.

These files tell agents about your stack, conventions, and rules. oMO reads them automatically: you don't need to paste context every session.

[Get started →](/getting-started/)
