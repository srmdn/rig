# FAQ

## General

### What is the difference between OpenCode and oMO?

OpenCode is the AI coding CLI — sessions, context, language models. oMO (oh-my-openagent) is an orchestration layer on top that adds a multi-agent pipeline (Prometheus → Atlas → Sisyphus), category-based task delegation, and a skills ecosystem. OpenCode runs the agents. oMO tells them how to coordinate.

### Do I need oMO?

No. OpenCode works great on its own. oMO adds planning, delegation, and verification for larger projects. Try OpenCode first, add oMO when you want the pipeline.

### Does oMO work on Linux and Windows?

Yes. oMO is a configuration layer, not a binary. As long as OpenCode runs on your machine, oMO works. The install steps use standard paths (`~/.opencode/` or `%APPDATA%\opencode\` on Windows). On Linux, replace any `brew` commands in guides with your package manager or the npm/source install method.

### What if my project doesn't have a CLAUDE.md or AGENTS.md?

oMO still works — it just won't have project-specific context. Sisyphus explores the codebase to build its own understanding. Add a `CLAUDE.md` (for Claude Code sessions) or `AGENTS.md` (for OpenCode/Codex sessions) when you want consistent conventions across sessions: stack, test commands, naming rules, anything an agent should always know.

---

## Pipeline

### When does the pipeline fire?

Only when you type `/start-work`. Normal conversation doesn't trigger it — Sisyphus handles those directly. If you just say "add a login endpoint," Sisyphus does it without involving Prometheus or Atlas.

### Can I skip Prometheus and go straight to Atlas?

Yes. If you already have a plan at `.sisyphus/plans/your-plan.md`, Atlas can read it directly. Useful when you've written the plan yourself or want to reuse one from a previous session.

### Can I stop the pipeline mid-execution?

Yes. Tell Sisyphus to stop at any point:

```
"Stop — I want to change the approach before you continue"
"Pause after Task 3 and wait for me to review"
```

Atlas will halt. In-progress tasks finish first; queued tasks don't start.

### What if build verification fails during the pipeline?

Atlas catches the failure and tries to fix it. If it fails twice, it stops and asks you. You can:
- Give Atlas more context about why it failed
- Skip verification for that task and continue
- Stop the pipeline and debug manually

### What happens if I run /start-work on an existing codebase?

Prometheus reads the existing code before planning. It discovers your stack, conventions, and structure, then plans around them — it won't scaffold from scratch if there's already a project. This makes `/start-work` safe to use for large new features on existing projects too.

---

## Skills

### What's the difference between a skill and a category?

A **skill** injects domain instructions into an agent — `tdd` adds red-green-refactor rules, `diagnose` adds structured debugging steps. A **category** is an execution profile with a specific model — `visual-engineering` uses a premium UI-tuned model, `quick` uses a fast free model. They're independent axes that compose: `task(category="deep", load_skills=["tdd"])` gives you a strong model that follows TDD.

### How do I disable a skill or MCP?

Add it to the `disabled_skills` or `disabled_mcps` list in `oh-my-openagent.json`:

```json
{
  "disabled_skills": ["ai-slop-remover"],
  "disabled_mcps": ["playwright"]
}
```

Disabled skills won't load even if an agent tries to use them. Disabled MCPs won't start even if a skill references them.

### Do I need Matt Pocock's skills?

They're optional. They add structured engineering processes — grilling sessions, TDD loops, backlog triage, architecture reviews. Worth trying `/grill-me` and `/tdd` at minimum. See [Matt Pocock Skills](/skills/matt-pocock) for the full list.

### How do I create my own skill?

Use `/write-a-skill` and follow the SKILL.md format. The most important part is the `description` field — it's how agents decide whether to load your skill. See [Create Your Own](/skills/create) for the full guide.

### Which skill should I use for a code review?

Use `/review-work` for a general review of what was just implemented. Use `/grill-me` before implementation to align on intent. Use `/improve-codebase-architecture` when you want a broader architectural assessment. These are sequential, not interchangeable: grill → implement → review.

---

## Models

### Which model should I use?

Start with the defaults. oMO ships with sensible category-to-model assignments. Tune only if you notice quality issues with a specific task type, or if you want to reduce costs by routing simple work to free models. See [Model Selection](/reference/models).

### How do I know which model is being used for a task?

Sisyphus reports the category and skill for each delegated task. The category tells you the model tier. To see the exact model string, check the `categories` section of your `oh-my-openagent.json` for that category.

### What if a model is down?

The fallback chain kicks in automatically. Each category tries its primary model first, then falls through the list in order. You don't need to do anything. If all models in the chain fail, the agent stops and tells you.

### Can I use a different AI provider?

oMO uses whatever models OpenCode supports. Model strings in the config follow the `opencode-go/<model-name>` format for models available through OpenCode's model routing. Check OpenCode's documentation for the current list of supported providers and model strings.

---

## Troubleshooting

### Sisyphus picked the wrong category for my task — how do I fix it?

You can override category selection explicitly:

```
"Handle this with the visual-engineering category"
"Use ultrabrain for this — the default picked quick and it's not enough"
```

If it keeps picking the wrong category for a specific task type, add explicit routing notes to your `CLAUDE.md` or `AGENTS.md`: `"All auth-related tasks use the deep category."` Sisyphus reads these files at session start.

### An agent keeps making the same mistake — what do I do?

Add a rule to `CLAUDE.md` / `AGENTS.md` so every session starts with the constraint:

```
## Rules
- Never use any ORM — raw SQL only via database/sql
- Always check errors explicitly, no _ assignment for errors
```

For one-off corrections, just tell Sisyphus mid-session. For recurring mistakes, put it in the project file.

### A skill isn't loading — how do I debug it?

1. Check the skill is in the right directory (`~/.opencode/skills/` or the project's `skills/` folder)
2. Check the SKILL.md frontmatter is valid — `name`, `description`, and `type` are required
3. Check the skill isn't in `disabled_skills` in your config
4. Try loading it explicitly: `"Load the [skill-name] skill and use it for this task"`
