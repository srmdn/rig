# Sisyphus  --  Executor

Sisyphus is the default agent. When you open a conversation, you're talking to Sisyphus. It handles most tasks directly and delegates to specialist agents when needed.

## What Sisyphus Does

- **Answers questions** about your codebase
- **Makes code changes**  --  from one-liners to multi-file features
- **Routes to specialists**  --  delegates to the right agent for the job
- **Verifies its work**  --  runs build, tests, and diagnostics after changes

## Smart Routing

Sisyphus doesn't do everything itself. When a task calls for specialized capabilities, it delegates:

```
You: "Add password reset to my auth system"

Sisyphus:
  1. Fires explore agents to find existing auth code
  2. Delegates implementation to category agents:
     - reset-token model → quick
     - reset email sending → deep
     - reset route + handler → deep
     - tests → deep (with tdd skill)
  3. Verifies build, diagnostics, tests
  4. Done
```

### Specialist Agents

| Agent | When Sisyphus delegates to it |
|-------|------------------------------|
| **explore** | Searching the codebase, finding patterns, locating files |
| **Oracle** | Architecture decisions, hard debugging (after 2+ failed attempts) |
| **librarian** | Looking up documentation, API references, library usage |
| **Category agents** | Implementation work (see [Categories](/pipeline/categories)) |

## The Entry Point for Everything

Sisyphus is your starting point for every interaction:

```
"Fix the login bug"
→ Sisyphus explores, diagnoses, fixes

"What does this middleware do?"
→ Sisyphus answers directly

"Refactor the user service"
→ Sisyphus delegates to category agents

/start-work "Build a new API"
→ Sisyphus hands off to Prometheus → Atlas pipeline
```

## When Sisyphus Handles Things Directly

Most of the time, Sisyphus handles your request without the full pipeline:

- **Small changes**  --  Add a comment, rename a variable, fix a typo
- **Bug fixes**  --  Reproduce, diagnose, fix, verify
- **Questions**  --  "What does this function do?", "Where is the auth middleware?"
- **Single-feature additions**  --  "Add password reset" (see [Add a Feature](/playbooks/add-feature))

## When Sisyphus Escalates

Sisyphus automatically escalates in two situations:

### 1. To Oracle (after 2+ failed fix attempts)

If Sisyphus tries to fix something and fails twice, it consults [Oracle](/pipeline/oracle) for a fresh perspective.

```
Sisyphus tries fix #1 → tests fail
Sisyphus tries fix #2 → tests fail
Sisyphus consults Oracle → Oracle analyzes the problem
Sisyphus applies Oracle's recommendation → tests pass
```

You can also request Oracle directly:

```
"Consult Oracle: why does our WebSocket keep disconnecting under load?"
```

### 2. To the Pipeline (when you use /start-work)

When you invoke `/start-work`, Sisyphus steps aside and the Prometheus → Atlas pipeline takes over. Sisyphus still does the implementation work, but under Atlas's orchestration.

## Skills

Sisyphus can load skills that modify its behavior for specific tasks. Skills are loaded via the `load_skills` parameter:

```
"Add password reset with TDD"
→ Sisyphus loads the tdd skill and follows red-green-refactor
```

See the [Skills Ecosystem](/skills/) for available skills and how to create your own.

## See Also

- [Oracle  --  Consultant](/pipeline/oracle)  --  When and how Oracle gets involved
- [Category Agents](/pipeline/categories)  --  What each category is optimized for
- [Add a Feature](/playbooks/add-feature)  --  Direct Sisyphus workflow
- [Debug a Bug](/playbooks/debug)  --  Sisyphus + Oracle for hard bugs
