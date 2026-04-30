# Debug a Bug

**Goal:** Find and fix a bug using the oMO diagnosis pipeline.

## The Flow

1. **Reproduce** — Describe the bug to Sisyphus with steps to reproduce
2. **Diagnose** — Sisyphus fires explore agents to find relevant code, uses /diagnose skill for structured debugging
3. **Fix** — Sisyphus delegates the fix to a category agent, verifies with tests
4. **Regression test** — Verify the fix doesn't break anything else

## Example

```
User: "Login is broken — I get a 500 error when submitting credentials"

Sisyphus:
  - Explores auth middleware, login handler, error handling
  - Reproduces the issue by reading the code path
  - Identifies: token generation fails for users with empty profiles
  - Fixes: adds null check before generating token
  - Verifies: adds test for empty profile case, runs full test suite
  - Done
```

## When to Involve Oracle

Sisyphus consults Oracle automatically after 2 failed fix attempts. Oracle is a read-only high-IQ consultant that analyzes the problem from a fresh perspective.

You can also request Oracle directly:

```
"Consult Oracle: why does our WebSocket keep disconnecting under load?"
```
