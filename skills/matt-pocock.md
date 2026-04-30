# Matt Pocock Skills

Matt Pocock's engineering skills are the most established plugin skill set for OpenCode. They provide structured workflows for the entire software development lifecycle  --  from planning and alignment through debugging, testing, and architecture improvement.

These are **plugin skills**, not built-in. They need to be installed and configured per-repo.

## Installation

### Per-Repo Setup

Before using most of Matt's engineering skills, run the setup skill:

```
/setup-matt-pocock-skills
```

This is a **per-repo configuration step**, not a per-agent step. It:

1. Detects your backlog backend (GitHub Issues, local markdown, or other)
2. Maps your triage label vocabulary to the skill's expected labels
3. Locates your domain docs (`CONTEXT.md`, `docs/adr/`)
4. Writes an `## Agent skills` block to your `CLAUDE.md` or `AGENTS.md`
5. Creates `docs/agents/` with config files for backlog, triage labels, and domain docs

Skills like `to-issues`, `triage`, `to-prd`, `diagnose`, `tdd`, `improve-codebase-architecture`, and `zoom-out` all read from these config files. Without setup, they'll prompt you to run it.

### Global Install

To make the skills available across all projects:

```bash
# Skills are installed to your global skills directory
~/.config/opencode/skills/
```

Or per-project:

```bash
# Project-level skills override global
.project/.opencode/skills/
```

## Skills by Use Case

### Pre-Implementation Alignment

Before writing code, use these skills to align on what you're building.

#### `/grill-me`

Interviews you relentlessly about a plan or design until reaching shared understanding. Walks down each branch of the decision tree, resolving dependencies one-by-one. For each question, provides a recommended answer.

**When to use:** You have a rough plan and want to stress-test it before committing. You want to find gaps in your thinking.

```
/grill-me I'm thinking of adding a real-time collaboration feature using WebSockets
```

#### `/grill-with-docs`

Same as `/grill-me`, but also challenges your plan against the existing domain model. Reads `CONTEXT.md` and ADRs to check for terminology conflicts and architectural contradictions. Updates documentation inline as decisions crystallize.

**When to use:** You're planning work on an existing codebase with documented architecture decisions. You want to ensure new work respects past decisions.

```
/grill-with-docs I want to add an event-sourced order system
```

#### `/zoom-out`

Gives a higher-level perspective on a section of code you're unfamiliar with. Maps all relevant modules and callers using the project's domain glossary vocabulary.

**When to use:** You're lost in the weeds. You need to understand how a module fits into the bigger picture before making changes.

```
/zoom-out I don't understand how the payment module connects to the order system
```

### Debugging

#### `/diagnose`

Structured diagnosis loop for hard bugs and performance regressions. Follows a strict phase sequence: Reproduce → Minimise → Hypothesise → Instrument → Fix → Regression-test.

**When to use:** Something is broken, throwing, failing, or regressing. You need discipline, not guessing.

```
/diagnose The auth middleware is returning 403 for valid tokens
```

The skill's core insight: **building a feedback loop is the skill**. Everything else is mechanical. If you have a fast, deterministic pass/fail signal, you'll find the cause. If you don't, no amount of staring at code will save you.

### Testing

#### `/tdd`

Test-driven development with red-green-refactor loop. Enforces vertical slices (one test → one implementation → repeat), not horizontal slices (all tests first, then all implementation).

**When to use:** Building features or fixing bugs with test-first discipline. Mentioning "red-green-refactor" or asking for integration tests.

```
/tdd Add user registration with email verification
```

Key principle: tests verify behavior through public interfaces, not implementation details. Good tests survive refactors because they describe *what* the system does, not *how*.

### Backlog Management

#### `/triage`

Moves issues through a state machine driven by triage roles. Processes incoming bugs and feature requests, applies labels, and prepares issues for AFK (autonomous) agents or human implementation.

**When to use:** Creating issues, reviewing incoming bugs, preparing issues for autonomous agents, managing issue workflow.

```
/triage There are 5 new issues in the backlog
```

Five canonical states: `needs-triage` → `needs-info` → `ready-for-agent` or `ready-for-human` or `wontfix`.

#### `/to-issues`

Breaks a plan, spec, or PRD into independently-grabbable issues using tracer-bullet vertical slices. Each issue is a thin vertical slice that cuts through all integration layers end-to-end.

**When to use:** Converting a plan into implementation tickets, breaking down work into issues.

```
/to-issues Here's the PRD for the notification system
```

#### `/to-prd`

Turns the current conversation context into a Product Requirements Document and publishes it to the project backlog. Does not interview the user  --  synthesizes what's already known.

**When to use:** Creating a PRD from an existing conversation. You've already discussed the feature and want to formalize it.

```
/to-prd
```

### Architecture

#### `/improve-codebase-architecture`

Surfaces architectural friction and proposes deepening opportunities  --  refactors that turn shallow modules into deep ones. Informed by the project's domain language (`CONTEXT.md`) and past decisions (`docs/adr/`).

**When to use:** Improving architecture, finding refactoring opportunities, consolidating tightly-coupled modules, making a codebase more testable and AI-navigable.

```
/improve-codebase-architecture The payment module has too many shallow abstractions
```

Uses a precise vocabulary: module, interface, implementation, depth, seam, adapter, leverage, locality. The **deletion test** is key: imagine deleting the module. If complexity vanishes, it was a pass-through. If complexity reappears across N callers, it was earning its keep.

### Communication

#### `/caveman`

Ultra-compressed communication mode. Cuts token usage ~75% by dropping filler, articles, and pleasantries while keeping full technical accuracy.

**When to use:** You say "caveman mode", "less tokens", "be brief", or invoke `/caveman`.

```
/caveman
```

Once activated, it persists for the entire session. Off only when you say "stop caveman" or "normal mode".

## Composing with Categories

Matt's skills compose naturally with oMO categories:

```typescript
// Deep debugging with structured diagnosis
task(category="deep", load_skills=["diagnose"], prompt="...")

// Architecture review with hard reasoning
task(category="ultrabrain", load_skills=["improve-codebase-architecture"], prompt="...")

// Quick alignment check
task(category="quick", load_skills=["zoom-out"], prompt="...")

// TDD on a premium model
task(category="deep", load_skills=["tdd"], prompt="...")
```

The category determines the model and behavior. The skill determines the workflow. They're independent axes.

## Beyond Matt's Skills

Matt's engineering toolkit is one plugin ecosystem among many. The skills system is open  --  anyone can write and publish skills. See [Create Your Own](/skills/create) for how to build custom skills, and the [MCP Integration](/skills/mcp) page for how external tool servers extend agent capabilities.
