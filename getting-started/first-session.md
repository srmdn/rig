# Your First Session

You've installed OpenCode and oMO. Now let's use them. This walkthrough covers opening a project, asking a question, and seeing the agent pipeline in action.

## Open a project

Navigate to any project directory and launch OpenCode:

```bash
cd ~/Developer/projects/my-project
opencode
```

The TUI opens. You'll see a chat interface with a prompt at the bottom and a sidebar showing session history.

::: tip
If this is your first time in the project, oMO may prompt you to create a `CLAUDE.md` or `AGENTS.md` file. Accept — these files give agents context about your project's stack, conventions, and rules. You can edit them later.
:::

## Ask a question

Let's start simple. Type a question about your codebase:

```
What does the main entry point do?
```

Press Enter. Here's what happens behind the scenes:

1. **OpenCode receives your message** and routes it through oMO's pipeline.
2. **Sisyphus** (the executor agent) picks up the task. It reads your project files, finds the entry point, and explains what it does.
3. The response appears in the TUI.

This is a straightforward query — no planning step needed. Sisyphus handles it directly.

## Try a bigger task

Now let's give the pipeline something that benefits from planning. Type:

```
/start-work
```

This invokes oMO's `/start-work` command, which triggers the full pipeline:

1. **Prometheus** (the planner) breaks your task into a structured plan with clear steps.
2. **Atlas** (the orchestrator) assigns each step to the right agent.
3. **Sisyphus** (the executor) carries out the work — reading files, writing code, running commands.
4. **Oracle** (the consultant) reviews the output and flags issues.

You'll see the pipeline in action as each agent contributes. The TUI shows which agent is currently active and what it's doing.

## Use a skill

oMO ships with skills you can invoke with slash commands. Try one:

```
/diagnose
```

The `/diagnose` skill starts a structured debugging loop: reproduce → minimize → hypothesize → instrument → fix → regression-test. It's designed for when something is broken and you need a disciplined approach to finding the root cause.

Other useful skills for beginners:

| Command | What it does |
|---------|-------------|
| `/start-work` | Start a structured work session from a Prometheus plan |
| `/diagnose` | Debug a bug with a disciplined loop |
| `/grill-me` | Stress-test your design decisions through interview |
| `/zoom-out` | Get broader context about how code fits together |
| `/tdd` | Test-driven development with red-green-refactor |

See [Built-in Skills](/skills/built-in) for the full list.

## Project convention files

As you work, you'll notice oMO references two files in your project root:

- **`CLAUDE.md`**: instructions for Claude Code sessions. Covers your stack, coding conventions, and rules.
- **`AGENTS.md`**: instructions for OpenCode agents. Similar content, formatted for the agent pipeline.

These files are how oMO gives agents project context without you re-pasting it every session. You can edit them directly — they're plain Markdown.

A minimal `AGENTS.md` might look like:

```markdown
# My Project

## Stack
- Language: TypeScript
- Framework: Astro
- Runtime: Bun

## Rules
- Always run `bun test` before committing
- Use conventional commits
- Never commit .env files
```

::: info
For full configuration details, see [Config (oh-my-openagent.json)](/reference/config).
:::

## Session workflow

Here's a typical session flow with oMO:

1. **Open your project**: `cd` into the repo and run `opencode`.
2. **Describe your task**: type what you want to do, or use a slash command like `/start-work`.
3. **Review the plan**: if the pipeline activates, Prometheus presents a plan. Read it. Approve or adjust.
4. **Watch execution**: Sisyphus works through the steps. You can intervene at any point.
5. **Verify the result**: check the changes, run tests, make sure everything works.
6. **Commit**: when you're satisfied, commit the changes. OpenCode can help with commit messages too.

## Tips for beginners

- **Be specific**: "Add a dark mode toggle to the settings page" works better than "make it look better."
- **Use slash commands**: they encode best practices. `/diagnose` for bugs, `/tdd` for features, `/grill-me` for design review.
- **Check the plan before execution**: when Prometheus presents a plan, read it. You can ask for changes before Sisyphus starts coding.
- **Iterate**: if the first result isn't right, say so. The agent adjusts. You don't need to start a new session.
- **Commit often**: after each successful step, commit. This gives you rollback points and keeps diffs small.

## Where to go next

- [The oMO Pipeline](/pipeline/) — understand how Prometheus, Atlas, and Sisyphus divide labor.
- [Skills Ecosystem](/skills/) — explore all available skills and learn to create your own.
- [Playbooks](/playbooks/) — follow real workflows for starting projects, adding features, and debugging.
- [Reference](/reference/) — deep-dive into configuration, model selection, and agent settings.
