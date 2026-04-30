# Skills Ecosystem

Skills are the extension layer that makes your agent actually useful. Without skills, you have a model that can generate text. With skills, you have an agent that can debug, plan, test, review, and ship.

## What Are Skills?

A skill is a packaged set of instructions, workflows, and (optionally) embedded MCP servers that an agent loads on-demand. Skills are not prompts — they carry:

- **Domain-tuned system instructions** that reshape how the agent thinks about a task
- **Step-by-step workflows** with checklists and decision trees
- **Embedded MCP servers** that spin up on-demand, scoped to the task, and shut down when done
- **Bundled resources** like templates, reference docs, and utility scripts

When you invoke a skill (e.g., `/diagnose`), the agent loads the skill's full instructions into context, follows its workflows, and uses any embedded tools. When the task is done, the skill's context is released.

## Skill Types

The skills ecosystem has five distinct sources. Understanding the differences matters:

| Type | Source | Example | Scope |
|---|---|---|---|
| **Built-in** | Ships with OpenCode/oMO | `git-master`, `review-work` | Global, always available |
| **Category** | oMO config profiles | `visual-engineering`, `deep`, `quick` | Task delegation, model routing |
| **Plugin** | Installed from community or custom | Matt Pocock's `tdd`, `diagnose` | Per-repo or global |
| **MCP** | External tool servers | Playwright, filesystem, databases | On-demand, skill-embedded |
| **Community** | Shared configs and skill packs | Published skill repos | Installable, forkable |

### Built-in Skills

Ships with every OpenCode + oMO install. No configuration needed. Includes `git-master` (atomic git operations), `review-work` (post-implementation review), `ai-slop-remover` (code smell cleanup), and `frontend-ui-ux` (design-first UI).

→ [Built-in Skills](/skills/built-in)

### Category System

Categories are not skills in the traditional sense — they're **agent profiles** that map task types to optimized models. When Sisyphus delegates work, it picks a category (not a model). The category determines which model runs, what fallback chain to use, and what behavior to expect.

→ [Category System](/skills/categories)

### Plugin Skills

Installed skills that extend agent capabilities with domain-specific workflows. The most established plugin set is Matt Pocock's engineering toolkit, but the ecosystem is growing. Plugin skills live in `.opencode/skills/*/SKILL.md` (project-level) or `~/.config/opencode/skills/*/SKILL.md` (global).

→ [Matt Pocock Skills](/skills/matt-pocock)

### MCP Integration

Model Context Protocol servers extend agents with external tools — browser automation, database access, filesystem operations, and more. Skills can embed their own MCP servers, keeping context clean.

→ [MCP Integration](/skills/mcp)

### Creating Your Own

Anyone can write a skill. The `write-a-skill` tool scaffolds the structure, and the SKILL.md format is designed for progressive disclosure — agents see the description first, then load full instructions on demand.

→ [Create Your Own](/skills/create)

## How Skills Compose

Skills compose with categories and with each other. The category provides the execution profile (model, behavior); the skill provides the domain instructions:

```
task(category="deep", load_skills=["tdd"], prompt="Add user registration")
```

This fires a `deep` category agent (premium model, thorough behavior) with the `tdd` skill loaded (red-green-refactor workflow). The category and skill are independent — you could run `tdd` on a `quick` category for a small fix, or on `deep` for a full feature.

Common compositions:

| Task | Category | Skill |
|---|---|---|
| Build a React component | `visual-engineering` | `frontend-ui-ux` |
| Debug a production issue | `deep` | `diagnose` |
| Write tests for a feature | `deep` | `tdd` |
| Plan a new project | `ultrabrain` | `grill-with-docs` |
| Quick typo fix | `quick` | — |
| Review your work | `unspecified-high` | `review-work` |

## Skill Discovery

Agents discover skills through their descriptions. Every skill has a `description` field in its frontmatter — this is the only thing the agent sees when deciding which skill to load. Good descriptions include:

1. What the skill does
2. When to trigger it (specific keywords, contexts, file types)

This is why skill descriptions follow the pattern: *"Do X. Use when user says Y, mentions Z, or asks for W."*

## Where Skills Live

```
~/.config/opencode/skills/          # Global skills (all projects)
  └── my-skill/
      └── SKILL.md

.project/.opencode/skills/          # Project-level skills (this repo only)
  └── project-skill/
      └── SKILL.md
```

Project-level skills override global skills with the same name. Both override built-in skills.
