# Add a Feature

**Goal:** Add a scoped feature to an existing project using Sisyphus directly.

## When This Fits

- The project already exists and you know its structure
- The feature is real but scoped — not a whole new service
- You want implementation, not a formal plan document

For large cross-cutting features where you want a written plan first, use [/start-work](/playbooks/new-project) instead.

---

## Step 1: Decide Whether to Align First

Before describing the feature, ask: **is this feature ambiguous?**

If yes — if you're not 100% sure what you want — run `/grill-me` first:

```
/grill-me "Add password reset to the auth system"
```

Sisyphus will interview you until you're both aligned. Then you implement. This takes 5–10 minutes and saves hours of back-and-forth. See the [Refactor with Grill](/playbooks/refactor-grill) playbook for how a grilling session works.

If the feature is clear, skip `/grill-me` and go straight to Step 2.

---

## Step 2: Describe the Feature to Sisyphus

Be specific. Include the surface area, any constraints, and how you'll know it's done.

**Too vague:**

```
"Add password reset"
```

**Better:**

```
"Add password reset to the auth system. Flow: user submits email →
generate a signed reset token (expires 1 hour) → send email with
reset link → user submits new password with token → token consumed.
Use the existing User model and the mailer package we already have."
```

Sisyphus reads your description and starts exploring — finding the auth module, the User model, the mailer package, existing test patterns:

```
[Sisyphus] Exploring auth middleware, models, email package...
[Sisyphus] Found: internal/auth/, internal/models/user.go, pkg/mailer/
[Sisyphus] Mapping existing token patterns...
[Sisyphus] Planning implementation...
```

---

## Step 3: Watch Sisyphus Delegate

Sisyphus breaks the work into tasks and assigns categories automatically:

```
[Sisyphus] Delegating:
  → PasswordResetToken model + migration     [quick]
  → POST /auth/reset-request handler         [deep]
  → Reset email template + mailer call       [deep]
  → POST /auth/reset-confirm handler         [deep]
  → Tests for full reset flow                [deep + tdd skill]
```

- `quick` for the model — straightforward schema addition
- `deep` for the handlers — multi-step with auth logic
- `deep` with `tdd` for tests — red-green-refactor loop

---

## Step 4: Intervene If Needed

You can redirect at any point:

```
"The reset token should be stored in Redis, not the database"
"Use the SendGrid integration in pkg/mailer, not generic SMTP"
"Add a rate limit: max 3 reset requests per email per hour"
```

Sisyphus incorporates the feedback and continues. Mid-task corrections work — you don't need to wait for a task to finish.

---

## Step 5: Verify

When Sisyphus reports done, verify the full flow yourself:

```bash
# Trigger a reset request
curl -X POST http://localhost:8080/auth/reset-request \
  -d '{"email":"user@example.com"}'

# Run tests
go test ./internal/auth/... -v

# Review the diff
git diff --stat
```

Check:
- All new files have tests
- Existing tests still pass
- The reset token expires correctly
- The token can only be used once

---

## Common Patterns

### Frontend feature

```
"Add a collapsible sidebar to the dashboard. Should remember its state
in localStorage. Mobile: hidden by default, toggle with a hamburger button."
```

Sisyphus delegates to `visual-engineering` category, loads the `frontend-ui-ux` skill, and enforces design quality rules automatically.

### API endpoint

```
"Add GET /users/:id/bookmarks — return all bookmarks for a user, paginated
(limit/offset), only accessible to the authenticated user or an admin."
```

Sisyphus explores existing endpoint patterns and auth middleware, then delegates handler + tests to `deep`.

### Background job

```
"Add a nightly job that emails users their weekly bookmark summary.
Use the existing cron setup in cmd/worker/."
```

Sisyphus finds the cron setup and existing email templates, delegates to `deep`, adds tests with mocked time and mailer.

---

## When to Use /start-work Instead

Use [/start-work](/playbooks/new-project) when:
- The feature touches 5+ files across multiple packages
- You want a written, reviewable plan before any code is written
- The feature has unclear dependencies that need mapping first
- You're adding a whole subsystem (auth from scratch, a new service, a full data pipeline)
