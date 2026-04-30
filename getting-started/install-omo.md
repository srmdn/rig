# Installing oh-my-openagent (oMO)

oh-my-openagent (oMO) is a configuration layer and skill ecosystem that sits on top of OpenCode. It adds structure, conventions, and a multi-agent pipeline so you can do more with less prompting.

## What oMO adds

OpenCode on its own is a single-agent chat interface. You type a prompt, the agent responds. That works, but it has limits:

- **No planning step**  --  the agent jumps straight into code without thinking through the approach.
- **No specialization**  --  one agent does everything, even tasks that benefit from focused expertise.
- **No project conventions**  --  every session starts from scratch unless you manually paste context.

oMO solves this by layering on:

- **The agent pipeline**  --  a structured flow where Prometheus plans, Atlas orchestrates, and Sisyphus executes. Each agent has a defined role. See [The oMO Pipeline](/pipeline/) for the full breakdown.
- **Skills**  --  reusable prompt templates and workflows you can invoke with slash commands (e.g., `/tdd`, `/diagnose`, `/grill-me`). See [Skills Ecosystem](/skills/).
- **Project conventions**  --  `CLAUDE.md` and `AGENTS.md` files that tell agents about your stack, rules, and preferences. No more pasting context every session.
- **Category agents**  --  specialized sub-agents for visual engineering, documentation, exploration, and more. See [Category Agents](/pipeline/categories).

## Prerequisites

- **OpenCode** installed and working  --  see [Install OpenCode](/getting-started/install-opencode) if you haven't yet.
- **Git**  --  oMO is installed by cloning its repository.
- **Node.js** 18+  --  some skills and tooling depend on it.

## Install oMO

### 1. Clone the repository

```bash
git clone https://github.com/srmdn/oh-my-openagent.git ~/.config/opencode/install
```

This clones oMO into OpenCode's config directory at `~/.config/opencode/install/`. OpenCode automatically picks up configurations from this location.

### 2. Run the installer

```bash
cd ~/.config/opencode/install
./install.sh
```

The installer does three things:

1. **Links configuration files**  --  connects oMO's `oh-my-openagent.json` to OpenCode's config so the pipeline and agents are recognized.
2. **Installs default skills**  --  copies the built-in skill set into `~/.config/opencode/skills/`.
3. **Creates project templates**  --  sets up default `CLAUDE.md` and `AGENTS.md` templates you can customize per project.

### 3. Verify the installation

Open any project and start OpenCode:

```bash
cd ~/Developer/projects/my-project
opencode
```

Inside the TUI, type:

```
/help
```

You should see oMO's slash commands listed alongside OpenCode's built-in ones. Commands like `/start-work`, `/diagnose`, and `/grill-me` come from oMO.

You can also check that the pipeline agents are loaded:

```
/agents
```

This should list Prometheus, Atlas, Sisyphus, and Oracle among the available agents.

## What got installed where

After installation, you'll find files in these locations:

| Path | What it is |
|------|-----------|
| `~/.config/opencode/install/` | oMO repository (the source) |
| `~/.config/opencode/config.json` | OpenCode config, now referencing oMO's pipeline |
| `~/.config/opencode/skills/` | Installed skill definitions |
| `~/.config/opencode/install/agents/` | Agent definitions (Prometheus, Atlas, etc.) |

In your project repos, oMO may create or update:

| File | What it is |
|------|-----------|
| `CLAUDE.md` | Project instructions for Claude Code |
| `AGENTS.md` | Project instructions for OpenCode agents |

These project-level files are optional but recommended. They tell agents about your stack, conventions, and rules so every session starts with context.

## Updating oMO

Pull the latest changes and re-run the installer:

```bash
cd ~/.config/opencode/install
git pull
./install.sh
```

The installer is idempotent  --  running it again won't overwrite your customizations unless the upstream defaults have changed.

::: warning
If you've customized `oh-my-openagent.json` or skill files, check for conflicts after updating. The installer preserves local changes where possible, but major version bumps may require manual merging.
:::

## Next step

With both OpenCode and oMO installed, you're ready for [Your First Session](/getting-started/first-session)  --  where you'll open a project, ask Sisyphus a question, and see the pipeline in action.
