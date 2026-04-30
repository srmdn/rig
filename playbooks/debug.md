# Debug a Bug

**Goal:** Reproduce, diagnose, and fix a bug with Sisyphus — with Oracle as a fallback for hard cases.

---

## Step 1: Write a Good Bug Report

Don't just say "it's broken." Give Sisyphus what it needs to find the bug fast.

**Weak:**

```
"Login is broken"
```

**Strong:**

```
"Login returns 500 when submitting credentials. Happens only for users
who signed up before 2024-03-01 — newer accounts work fine.
The error shows in logs as: 'nil pointer dereference in token.Generate'.
Reproduces 100% with user id=42 in the dev database."
```

Good bug reports include:
- **What broke** — the visible symptom (error message, wrong output, crash)
- **When it breaks** — the exact condition that triggers it
- **What works** — the contrast case, if one exists
- **Where to look** — the log line, the endpoint, the function name

---

## Step 2: Sisyphus Explores

Sisyphus reads your description and starts exploring — not guessing. It follows the call stack, reads the relevant code, and maps the path:

```
[Sisyphus] Reproducing: login 500 for pre-2024-03-01 users
[Sisyphus] Exploring: internal/auth/login.go, internal/models/user.go
[Sisyphus] Tracing: handler → auth.Login() → token.Generate()
[Sisyphus] Reading: token.Generate() source...
[Sisyphus] Found: user.Profile is nil for legacy users
           (Profile column added in migration 20240301_add_user_profile.sql,
            no backfill was run for existing users)
           token.Generate() dereferences user.Profile.DisplayName without nil check
```

Sisyphus reports the root cause before touching a line of code.

---

## Step 3: The /diagnose Skill

If Sisyphus loads the `/diagnose` skill (automatically for unclear bugs, or when you ask), you get a structured diagnosis before any fix is applied:

```
=== Diagnosis Report ===
Bug: Nil pointer dereference in token.Generate()
Root cause: user.Profile is nil for accounts created before 2024-03-01

Affected scope:
  - All users with created_at < 2024-03-01
  - Estimated ~1,200 users in production

Proposed fix:
  1. Add nil check in token.Generate() before accessing Profile fields
  2. Backfill empty Profile rows for legacy users (separate migration)
  3. Add test: login with nil Profile should succeed

Risk: Low — nil check is additive, backfill is idempotent
```

Read this before approving. If the diagnosis is wrong, correct it now:

```
"The backfill is too risky right now — skip it, just fix the nil check"
"The root cause is wrong — Profile is set but DisplayName is empty, not nil"
```

---

## Step 4: Fix and Verify

Once the diagnosis is correct:

```
"Fix it"
```

Or be specific about scope:

```
"Fix the nil check only. Leave the backfill for a separate PR."
```

Sisyphus delegates the fix and verifies:

```
[Sisyphus] Delegating fix to deep agent...
[deep] Adding nil check in token.Generate()...
[deep] Adding test: TestLoginWithNilProfile...
[deep] Running test suite...
[deep] Tests: ✓ (52 passed, 1 new)
[deep] Build: ✓
[Sisyphus] Done.
```

---

## Step 5: Verify Yourself

Always verify against the original reproduction case:

```bash
# The broken case — should now return 200 + token
curl -X POST http://localhost:8080/login \
  -d '{"email":"legacy@example.com","password":"correct-password"}'

# Regression: new users still work
curl -X POST http://localhost:8080/login \
  -d '{"email":"new@example.com","password":"correct-password"}'

# Test suite
go test ./internal/auth/... -v
```

Also review the diff:

```bash
git diff --stat
git diff internal/auth/
```

A good bug fix touches the minimum code. If the diff is large, ask Sisyphus to explain why.

---

## When to Involve Oracle

Sisyphus escalates to [Oracle](/pipeline/oracle) automatically after 2 failed fix attempts. You can also call Oracle directly for hard bugs:

```
"Consult Oracle: why does our WebSocket connection drop under load after ~2 minutes?"
```

Oracle analyzes the problem without writing code, then hands a recommendation back to Sisyphus:

```
[Oracle] Analyzing: WebSocket disconnect under load after ~2 minutes
[Oracle] Reading: connection pool config, timeout settings, nginx config
[Oracle] Finding: nginx proxy_read_timeout defaults to 60s. Under load,
         idle connections hit the timeout. Your keepalive ping interval
         is 120s — longer than the nginx timeout.
[Oracle] Recommendation: reduce ping interval to 45s OR increase
         proxy_read_timeout to 300s in nginx. Prefer the ping interval
         change — safer, no nginx restart required.
[Sisyphus] Applying Oracle recommendation...
```

Reach for Oracle when:
- Sisyphus has tried and failed twice
- The bug involves infrastructure, concurrency, or network behavior
- You want a second opinion before a risky fix
- The root cause is outside application code (nginx, database config, OS)
