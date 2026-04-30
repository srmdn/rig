# Start a New Project

**Goal:** Go from idea to working project structure using the full oMO pipeline.

## Prerequisites

- OpenCode CLI installed and running
- oh-my-openagent configured (`oh-my-openagent.json` in place)
- A clear idea of what you want to build

---

## Step 1: Frame the Idea

Prometheus plans from your description. The more specific you are, the better the plan.

**Too vague:**

```
"Build a bookmark app"
```

**Good — specific enough to plan against:**

```
"Build a Go REST API for a bookmark manager with SQLite storage,
tag support, and JWT auth. Needs CRUD for bookmarks and tags,
search by tag, and a /health endpoint."
```

What makes a good description:
- The language/stack (Go, TypeScript, Python...)
- The storage layer (SQLite, Postgres, Redis...)
- The surface area (REST API, CLI, web app, library...)
- Any non-obvious requirements (auth, search, rate limiting...)

You don't need to be exhaustive. Prometheus will ask for clarification if something is ambiguous.

---

## Step 2: Invoke /start-work

Open your project directory (empty or existing) and run:

```
/start-work "Build a Go REST API for a bookmark manager with SQLite storage, tag support, and JWT auth"
```

Prometheus activates. It explores the current directory — if it's empty, it starts fresh. If code already exists, it reads your patterns and conventions before planning.

You'll see Prometheus working:

```
[Prometheus] Reading project structure...
[Prometheus] No existing codebase — starting from scratch.
[Prometheus] Decomposing goal into tasks...
[Prometheus] Identifying parallelization opportunities...
[Prometheus] Writing plan to .sisyphus/plans/bookmark-api.md
[Prometheus] Done. Handing to Atlas.
```

---

## Step 3: Review the Plan

Before Atlas starts executing, read the plan. Prometheus saves it to `.sisyphus/plans/`:

```markdown
# Plan: Bookmark API

## Goal
Go REST API for bookmark management with SQLite, JWT auth, tag support, search.

## Tasks

### Task 1: Project scaffold
- Initialize Go module (`go mod init`)
- Directory structure: cmd/, internal/, db/
- No dependencies
- Verify: `go build ./...`

### Task 2: SQLite models
- Bookmark, Tag, User models via modernc.org/sqlite
- Migration files in db/migrations/
- Depends on: Task 1
- Verify: `go test ./internal/models/...`

### Task 3: JWT auth middleware
- Login/signup handlers, JWT issue + validate
- Depends on: Task 2
- Verify: `go test ./internal/auth/...`

### Task 4: Bookmark CRUD handlers
- POST /bookmarks, GET /bookmarks, GET /bookmarks/:id, DELETE /bookmarks/:id
- Tag assignment on create/update
- Depends on: Task 2, Task 3
- Verify: integration tests

### Task 5: Tag CRUD + search
- POST /tags, GET /tags
- GET /bookmarks?tag=go → filtered results
- Depends on: Task 4
- Verify: integration tests

### Task 6: Health endpoint + final wiring
- GET /health, main router setup
- Depends on: Task 4, Task 5
- Verify: `go build ./...` + full test suite

## Parallelization
- Tasks 1 → 2 → 3 → (4 + 5 in parallel) → 6
```

**If the plan is wrong, say so now** — before Atlas starts:

```
"The plan looks good but use Postgres not SQLite — update the plan"
"Skip JWT auth for now, we'll add it later"
"Add a rate limiting middleware between Task 3 and 4"
```

Sisyphus will revise the plan. This is the cheapest point to course-correct.

---

## Step 4: Atlas Executes

Once you confirm (or don't object), Atlas picks up the plan and delegates tasks to category agents:

```
[Atlas] Starting execution of bookmark-api.md
[Atlas] Task 1 → quick agent (project scaffold)
[quick] Initializing Go module...
[quick] Creating directory structure...
[quick] Done. Build: ✓

[Atlas] Task 2 → deep agent (SQLite models)
[deep] Implementing Bookmark, Tag, User models...
[deep] Writing migration files...
[deep] Done. Tests: ✓ (12 passed)

[Atlas] Task 3 → deep agent (JWT auth middleware)
[deep] Implementing login/signup handlers...
[deep] Done. Tests: ✓ (8 passed)

[Atlas] Tasks 4 + 5 → running in parallel
[deep] CRUD handlers...              [deep] Tag endpoints + search...
[deep] Done. Tests: ✓                [deep] Done. Tests: ✓

[Atlas] Task 6 → quick agent (health endpoint + wiring)
[quick] Done. Build: ✓

[Atlas] All tasks complete. Full test suite: ✓ (47 passed)
```

You can redirect at any point mid-run:

```
"Stop — the CRUD handlers are using the wrong response format, fix it"
"Add pagination to GET /bookmarks before continuing"
```

Atlas handles mid-run corrections without losing progress on completed tasks.

---

## Step 5: Verify Yourself

After Atlas finishes, verify it with your own hands:

```bash
go build ./...
go test ./...
```

Then try the golden path manually:

```bash
# Register and get a token
curl -X POST http://localhost:8080/signup \
  -d '{"email":"a@b.com","password":"pw"}'
export TOKEN="..."

# Create a bookmark with tags
curl -X POST http://localhost:8080/bookmarks \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"url":"https://go.dev","title":"Go","tags":["go","lang"]}'

# Search by tag
curl "http://localhost:8080/bookmarks?tag=go" \
  -H "Authorization: Bearer $TOKEN"
```

---

## When NOT to Use /start-work

For small changes or questions, just talk to Sisyphus directly:

```
"Add a /version endpoint that returns the build timestamp"
"Rename UserModel to User across the codebase"
```

Reserve `/start-work` for: new projects, major features, or anything that benefits from a written plan with verification steps. Day-to-day work goes straight to Sisyphus.
