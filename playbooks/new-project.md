# Start a New Project

**Goal:** Go from idea to working project structure using the full oMO pipeline.

## Prerequisites

- OpenCode CLI installed
- oh-my-openagent installed
- A GitHub account (for creating repos)

## Step 1: Frame the Idea

Before invoking the pipeline, have a clear description of what you want to build. The more specific, the better Prometheus can plan.

**Good:** "Build a Go REST API for a bookmark manager with SQLite storage, add tag support, JWT auth"

**Bad:** "Build a bookmark app"

## Step 2: Invoke /start-work

```bash
/start-work "Build a Go REST API for a bookmark manager with SQLite storage..."
```

This triggers the pipeline:

1. **Prometheus** examines your request, explores the codebase (if any), and produces a structured plan saved to `.sisyphus/plans/bookmark-api.md`
2. **Atlas** picks up the plan and delegates tasks to Sisyphus category agents
3. **Sisyphus agents** execute each task in parallel where possible, with Atlas verifying results

## Step 3: Watch the Pipeline

Prometheus will produce a plan with:

- Task breakdown (todo items)
- Parallelization opportunities
- Verification criteria

Atlas will then execute tasks one by one, keeping you updated. You can pause and ask questions at any point.

## Step 4: Verify

After Atlas completes, you'll have:

- Project structure initialized
- Core implementation done
- Tests written
- Build passing

Run it yourself to verify:

```bash
cd your-project
go build ./...
go test ./...
```

## When NOT to Use /start-work

For small changes or questions, just talk to Sisyphus directly:

```
"Add a comment to the calculateTotal function"
"What does this config setting do?"
```

The pipeline is for significant new work. Day-to-day, Sisyphus handles everything.
