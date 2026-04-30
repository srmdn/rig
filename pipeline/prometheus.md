# Prometheus — Planner

Prometheus is the planning agent. It takes your high-level goal and breaks it into a structured, executable plan. It only runs when you invoke `/start-work`.

## What Prometheus Does

1. **Explores the codebase** (if one exists) to understand existing patterns, conventions, and structure
2. **Decomposes your goal** into ordered tasks with dependencies
3. **Identifies parallelization opportunities** — tasks that can run simultaneously
4. **Defines verification criteria** for each task
5. **Saves the plan** to `.sisyphus/plans/<name>.md`

## When It Triggers

Prometheus only runs as part of `/start-work`. It does not activate during normal conversation.

```
/start-work "Build a Go REST API for a bookmark manager with SQLite storage, add tag support, JWT auth"
```

This triggers:

1. Prometheus explores the current directory (or starts fresh if empty)
2. Prometheus writes a plan to `.sisyphus/plans/bookmark-api.md`
3. [Atlas](/pipeline/atlas) picks up the plan and begins orchestration

## What a Plan Looks Like

Plans are saved as markdown files in `.sisyphus/plans/`. A plan contains:

- **Goal** — What you asked for, restated clearly
- **Tasks** — Ordered list of implementation steps, each with:
  - Description
  - Dependencies on other tasks
  - Verification criteria (tests, build, lint)
- **Parallelization hints** — Which tasks can run concurrently

Example structure:

```markdown
# Plan: Bookmark API

## Goal
Build a Go REST API for bookmark management with SQLite, tags, and JWT auth.

## Tasks

### Task 1: Project scaffold
- Initialize Go module, directory structure
- No dependencies
- Verify: `go build ./...`

### Task 2: SQLite models
- Define Bookmark, Tag, User models
- Depends on: Task 1
- Verify: `go test ./models/...`

### Task 3: Auth middleware
- JWT generation and validation
- Depends on: Task 2 (User model)
- Verify: `go test ./middleware/...`

### Task 4: CRUD handlers
- Bookmark and tag CRUD routes
- Depends on: Task 2, Task 3
- Verify: `go test ./handlers/...`

### Task 5: Integration tests
- End-to-end API tests
- Depends on: Task 4
- Verify: `go test ./...`
```

## When to Use Prometheus vs Skip It

### Use `/start-work` (triggers Prometheus) when

- Starting a new project from scratch
- Adding a major feature that touches multiple files
- Doing a large refactor that needs a plan
- You want structured verification at each step

### Skip Prometheus (talk to Sisyphus directly) when

- Making small changes (add a comment, rename a variable)
- Fixing a bug (use the [debug playbook](/playbooks/debug))
- Asking questions about the codebase
- Adding a single, well-scoped feature (use the [add-feature playbook](/playbooks/add-feature))

## Tips

- **Be specific.** The more detail you give `/start-work`, the better the plan. "Build a bookmark API with SQLite and JWT auth" beats "Build a bookmark app."
- **Check the plan.** After Prometheus creates the plan, read through `.sisyphus/plans/*.md` before Atlas starts executing. You can edit the plan or ask for changes.
- **Plans are git-trackable.** The `.sisyphus/plans/` directory is meant to be committed. Plans serve as documentation of what you intended to build.

## See Also

- [Atlas — Orchestrator](/pipeline/atlas) — What happens after the plan is created
- [Sisyphus — Executor](/pipeline/sisyphus) — The agent that does the actual work
- [Start a New Project](/playbooks/new-project) — Full walkthrough with Prometheus
