# Refactor with Grill

**Goal:** Refactor code with zero misalignment — use a grilling session to lock in intent before any code moves.

## Why Grill First

The most common failure in AI-assisted refactoring: the agent produces technically correct code that isn't what you wanted. It extracted the right classes but named them wrong. It split the service correctly but lost the invariant you cared about.

A grilling session prevents this. Sisyphus interviews you until your intent is unambiguous — naming, scope, error handling, test strategy, what to preserve. The interview takes 10–15 minutes. It saves hours.

---

## Step 1: Invoke /grill-me

```
/grill-me "Refactor the UserService — it's 800 lines and does too much"
```

Sisyphus reads the code first, then starts the interview. It won't stop until it understands exactly what you want.

---

## Step 2: The Interview

A real grilling session:

```
Sisyphus: "I've read UserService (842 lines). It currently handles:
  - Database queries (CRUD)
  - Email sending (password reset, welcome, digest)
  - Input validation (email format, password strength)
  - Profile image upload (S3)

What's the specific problem — coupling, testability, size, all of the above?"

You: "It's impossible to test in isolation. Every test needs a real
database and S3 connection."

Sisyphus: "So the goal is testability, not just size. Should we extract
interfaces or separate packages?"

You: "Separate packages. I want to be able to mock the database layer."

Sisyphus: "Proposed split:
  - UserStore (database only, interface + concrete impl)
  - UserMailer (email sending, interface + concrete impl)
  - UserValidator (validation rules, pure functions)
  - UserService (thin facade, composes the others)
Does this match your intent?"

You: "Yes, but put S3 upload in a separate UserMedia package too."

Sisyphus: "Four packages then: UserStore, UserMailer, UserValidator,
UserMedia — with UserService as facade. Should UserService own all
public methods, or can callers use the sub-packages directly?"

You: "UserService owns the public API. Sub-packages are internal."

Sisyphus: "File naming: snake_case or PascalCase? Existing code uses snake_case."

You: "Keep snake_case."

Sisyphus: "Test strategy: should all existing tests pass after each
extraction, or can we batch the fixes at the end?"

You: "Tests green after each extraction. No red periods."

Sisyphus: "The email templates are currently inline strings in UserService.
Move them to a templates/ directory or keep inline?"

You: "Move to internal/templates/email/."

Sisyphus: "Got it. Alignment summary:
  Goal: testability via interface boundaries
  Structure: UserStore, UserMailer, UserValidator, UserMedia (all internal)
  Facade: UserService keeps full public API
  Naming: snake_case
  Tests: green after each extraction
  Templates: internal/templates/email/
Proceed?"
```

---

## Step 3: Read the Alignment Summary

Before Sisyphus writes a line of code, it produces the summary above. Read it carefully — this is your last free correction.

If anything is wrong:

```
"The templates should go in internal/templates/email/, not templates/ at root"
"UserMedia should be a public package, not internal"
```

Sisyphus updates the plan. When you confirm, execution starts.

---

## Step 4: Execution

Sisyphus executes as a sequence of atomic steps. Each extraction leaves tests green before the next begins:

```
[Sisyphus] Step 1: Extract UserStore
[deep] Extracting database methods from UserService...
[deep] Creating internal/userstore/store.go + interface.go...
[deep] Updating UserService to inject UserStore via interface...
[deep] Tests: ✓ (47 passed)

[Sisyphus] Step 2: Extract UserMailer
[deep] Extracting email methods...
[deep] Moving templates to internal/templates/email/...
[deep] Tests: ✓ (47 passed)

[Sisyphus] Step 3: Extract UserValidator
[deep] Extracting validation as pure functions...
[deep] Tests: ✓ (47 passed)

[Sisyphus] Step 4: Extract UserMedia
[deep] Extracting S3 upload logic...
[deep] Tests: ✓ (47 passed)

[Sisyphus] Step 5: Slim UserService facade
[deep] UserService now delegates to all four packages...
[deep] Tests: ✓ (47 passed + 12 new interface tests)

[Sisyphus] Done. 59 tests passing.
```

---

## Step 5: Review the Result

```bash
git diff --stat
```

You should see:
- Files added: `internal/userstore/`, `internal/usermailer/`, `internal/uservalidator/`, `internal/usermedia/`, `internal/templates/email/`
- Files changed: `internal/userservice/service.go` — much smaller
- No files deleted (everything moved, not removed)

Read the new `UserService`. It should be thin — method signatures delegating to sub-packages. If it's still 400+ lines, something didn't extract correctly.

---

## When to Use /grill-with-docs Instead

Use `/grill-with-docs` when:
- Your project has a `CONTEXT.md` with domain language (entities, concepts, rules)
- The refactor involves renaming domain concepts (e.g., "Order" → "PurchaseRequest")
- You want decisions recorded as ADRs in `docs/adr/`

The docs variant runs the same interview but updates `CONTEXT.md` inline and writes an ADR for each significant naming or structural decision:

```
/grill-with-docs "Rename Order to PurchaseRequest across the codebase"
→ Sisyphus interviews you on why and what the canonical term means
→ Updates CONTEXT.md with the new domain language
→ Writes docs/adr/0004-rename-order-to-purchaserequest.md
→ Executes the rename with tests green at each step
```
