# Atlas: Orchestrator

Atlas is the orchestration agent. It reads the plan that [Prometheus](/pipeline/prometheus) created and coordinates execution across [Sisyphus](/pipeline/sisyphus) category agents. Atlas verifies every step before moving to the next.

## What Atlas Does

1. **Reads the plan** from `.sisyphus/plans/*.md`
2. **Delegates each task** to the appropriate Sisyphus category agent
3. **Verifies each step**: runs build, tests, lint, and diagnostics
4. **Manages dependencies**: won't start Task 3 until Task 2 passes verification
5. **Runs independent tasks in parallel** where the plan allows

## How It Coordinates

Atlas follows the dependency graph from the plan. Here's what that looks like in practice:

```
Plan: Bookmark API
│
├── Task 1: Project scaffold
│   └── Atlas delegates to Sisyphus (quick category)
│   └── Verify: go build ./... ✓
│
├── Task 2: SQLite models (depends on Task 1)
│   └── Atlas delegates to Sisyphus (deep category)
│   └── Verify: go test ./models/... ✓
│
├── Task 3: Auth middleware (depends on Task 2)
│   └── Atlas delegates to Sisyphus (deep category)
│   └── Verify: go test ./middleware/... ✓
│
├── Task 4: CRUD handlers (depends on Task 2, Task 3)
│   └── Atlas delegates to Sisyphus (deep category)
│   └── Verify: go test ./handlers/... ✓
│
└── Task 5: Integration tests (depends on Task 4)
    └── Atlas delegates to Sisyphus (deep category)
    └── Verify: go test ./... ✓
```

### Parallel Execution

When the plan marks tasks as independent, Atlas runs them concurrently:

```
Task 2a: SQLite models ──┐
                         ├──► Both complete, then Task 3 starts
Task 2b: Config loading ──┘
```

Atlas waits for all parallel tasks to pass verification before proceeding to dependent tasks.

## Verification at Every Step

After each task, Atlas runs verification:

1. **Build**: Does the project compile?
2. **Tests**: Do existing tests still pass?
3. **Lint**: Does the code pass linting?
4. **Diagnostics**: Are there type errors or warnings?

If verification fails, Atlas:

- Reports the failure
- Asks the category agent to fix the issue
- Re-verifies before proceeding

## When Atlas Runs

Atlas runs automatically after [Prometheus](/pipeline/prometheus) creates a plan. You don't invoke Atlas directly — it's part of the `/start-work` pipeline.

```
/start-work "Build a bookmark API"
  → Prometheus creates plan
  → Atlas orchestrates execution
  → Sisyphus agents implement
```

## Interacting with Atlas

You can intervene during orchestration:

- **Pause**: Ask a question or request clarification at any point
- **Edit the plan**: Modify `.sisyphus/plans/*.md` and Atlas will pick up changes
- **Skip a task**: Tell Atlas to skip a task and move to the next
- **Retry**: Ask Atlas to retry a failed task with different parameters

## See Also

- [Prometheus: Planner](/pipeline/prometheus) — Creates the plans Atlas executes
- [Sisyphus: Executor](/pipeline/sisyphus) — The agents Atlas delegates to
- [Category Agents](/pipeline/categories) — What each category agent is optimized for
- [Start a New Project](/playbooks/new-project) — Full walkthrough showing Atlas in action
