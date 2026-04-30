# Oracle — Consultant

Oracle is a read-only, high-IQ consultant. It doesn't write code — it analyzes problems, identifies root causes, and recommends approaches. Think of Oracle as the senior engineer you pull into a room when you're stuck.

## What Oracle Does

- **Architecture analysis** — Evaluates tradeoffs between approaches
- **Root cause diagnosis** — Finds the underlying cause of persistent bugs
- **Security review** — Identifies vulnerabilities and recommends mitigations
- **Multi-system reasoning** — Reasons about interactions between services, databases, and APIs

Oracle is **read-only**. It examines your codebase, reads logs, and analyzes patterns, but it never makes changes. It returns its analysis to [Sisyphus](/pipeline/sisyphus), which then implements the fix.

## When to Consult Oracle

### Automatic: After 2+ Failed Fix Attempts

Sisyphus automatically consults Oracle when it's stuck:

```
Sisyphus tries fix #1 → tests fail
Sisyphus tries fix #2 → tests fail
→ Oracle is consulted automatically
→ Oracle analyzes the problem from scratch
→ Sisyphus applies Oracle's recommendation
```

This prevents Sisyphus from going in circles. Oracle brings a fresh perspective.

### Manual: When You Need Expert Analysis

You can request Oracle directly:

```
"Consult Oracle: should we use WebSockets or SSE for real-time updates?"
"Consult Oracle: why does our database connection pool keep exhausting?"
"Consult Oracle: is this auth flow secure enough for production?"
```

### Good Reasons to Use Oracle

- **You've tried fixing something twice and it's still broken** — Oracle sees the problem differently
- **Architecture decisions with long-term impact** — Oracle evaluates tradeoffs
- **Security concerns** — Oracle reviews for vulnerabilities without the pressure to ship
- **Multi-system tradeoffs** — Oracle reasons about interactions across services
- **Performance regressions** — Oracle identifies bottlenecks that aren't obvious

### When NOT to Use Oracle

- **Simple bugs** — Sisyphus can handle straightforward fixes
- **First attempt at a problem** — Try Sisyphus first, escalate to Oracle only after failing
- **Implementation questions** — "How do I sort an array?" doesn't need Oracle
- **Quick code reviews** — Sisyphus can review code for style and correctness

## How Oracle Works

```
You: "Consult Oracle: why does our WebSocket keep disconnecting under load?"

Sisyphus:
  1. Delegates to Oracle
  2. Oracle (read-only):
     - Explores WebSocket handler code
     - Examines connection lifecycle
     - Checks error handling and timeouts
     - Analyzes load patterns
  3. Oracle returns analysis:
     "Root cause: The heartbeat interval (30s) exceeds the load balancer's
      idle timeout (25s). Under load, the LB kills connections before the
      heartbeat can keep them alive. Fix: reduce heartbeat to 15s or
      configure the LB idle timeout to 60s."
  4. Sisyphus implements the fix
  5. Sisyphus verifies with tests
```

Oracle's value is in the analysis, not the implementation. It gives Sisyphus (and you) the understanding needed to fix the problem correctly.

## Oracle vs Sisyphus

| | Oracle | Sisyphus |
|---|--------|-----------|
| **Reads code** | Yes | Yes |
| **Writes code** | No | Yes |
| **Makes changes** | No | Yes |
| **Runs commands** | No | Yes |
| **Best for** | Analysis, diagnosis, tradeoffs | Implementation, fixes, features |

## See Also

- [Sisyphus — Executor](/pipeline/sisyphus) — The agent that implements Oracle's recommendations
- [Debug a Bug](/playbooks/debug) — Playbook showing Oracle escalation in practice
- [Category Agents](/pipeline/categories) — The agents that do implementation work
