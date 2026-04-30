# Built-in Skills

Built-in skills ship with every OpenCode + oMO installation. No setup, no configuration, no install step. They're available from your first session.

## git-master

**Trigger:** Any git operation — commits, rebases, squash, history search, blame, bisect.

`git-master` wraps all git operations with atomic commit discipline, safe rebase/squash workflows, and history-aware search. It prevents common git mistakes (force-pushing to main, losing uncommitted work) and structures commits for readability.

When to use it:

- Committing changes with meaningful messages
- Interactive rebase workflows (but not via `-i` — it uses non-interactive equivalents)
- Finding when something was introduced (`git log -S`, `git blame`)
- Squashing commits safely

```typescript
// Sisyphus automatically loads git-master for git operations
task(category="quick", load_skills=["git-master"], prompt="Commit the auth changes")
```

## review-work

**Trigger:** After completing any significant implementation. Say "review my work", "review changes", "QA my work", or "verify implementation".

`review-work` launches 5 parallel background sub-agents, each with a specific review lens:

| Sub-agent | Role |
|---|---|
| Oracle (goal/constraint) | Verifies implementation matches stated goals |
| Oracle (code quality) | Checks for code smells, dead code, poor patterns |
| Oracle (security) | Scans for vulnerabilities, secret leaks, unsafe patterns |
| Hands-on QA | Actually runs tests, checks builds, verifies behavior |
| Context miner | Gathers context from GitHub, git history, Slack, Notion |

All 5 must pass for the review to pass. If any fails, the review surfaces the specific issue.

```typescript
// After implementing a feature
task(category="unspecified-high", load_skills=["review-work"], prompt="Review the auth module changes")
```

## ai-slop-remover

**Trigger:** When you want to clean up AI-generated code smells. Operates on a single file at a time — for multiple files, run in parallel.

`ai-slop-remover` identifies and removes common AI-generated code patterns while preserving functionality:

- Unnecessary comments that restate what the code does
- Overly defensive null checks that the type system already handles
- Redundant variable declarations
- Overly verbose error handling that obscures the happy path
- Generic naming that adds no clarity

```typescript
// Clean up a specific file
task(category="quick", load_skills=["ai-slop-remover"], prompt="Remove AI slop from src/auth/handlers.ts")
```

## frontend-ui-ux

**Trigger:** Building any web UI — components, pages, layouts, dashboards, landing pages.

`frontend-ui-ux` applies design-first principles to frontend work. It enforces:

- Metric-based design rules (not vibes)
- Strict component architecture
- CSS hardware acceleration
- Balanced design engineering (no over-engineering, no under-styling)

This skill overrides the default LLM tendency toward generic, template-looking UI.

```typescript
// Build a dashboard component
task(category="visual-engineering", load_skills=["frontend-ui-ux"], prompt="Build a user analytics dashboard with charts")
```

## Disabling Built-in Skills

If a built-in skill conflicts with your workflow, disable it in your oMO config:

```json
{
  "disabled_skills": ["playwright", "agent-browser"]
}
```

Note: `playwright` and `agent-browser` are also built-in skills that can be disabled. The `disabled_skills` array accepts any skill name — built-in or plugin.
