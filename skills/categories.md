# Category System

Categories are agent profiles that map task types to optimized models. They're not skills — they're the **execution layer** that determines *how* a task runs. Skills determine *what* the agent knows.

## How Categories Work

When Sisyphus delegates a task, it doesn't pick a model. It picks a **category**. The category maps to a specific model and fallback chain:

```
User: "Debug the auth timeout issue"
  → Sisyphus picks category: deep
    → deep maps to: deepseek-v4-pro (primary)
    → Fallback: glm-5.1 → minimax-m2.7 → minimax-m2.5-free
```

The agent says what *kind* of work it is. The harness picks the right model. You touch nothing.

## Available Categories

| Category | Domain | Typical Model Tier | Cost |
|---|---|---|---|
| `visual-engineering` | Frontend, UI/UX, design, animation | Premium | $$$ |
| `ultrabrain` | Hard logic, architecture decisions, complex reasoning | Premium | $$$ |
| `deep` | Thorough autonomous research + execution | Premium | $$$ |
| `artistry` | Creative problem-solving, exploration | Medium | $$ |
| `quick` | Single-file changes, typos, small fixes | Free | $ |
| `unspecified-low` | Simple misc tasks that don't need a premium model | Free | $ |
| `unspecified-high` | Complex misc tasks that need a premium model | Premium | $$$ |
| `writing` | Documentation, prose, copy | Free | $ |

### When Each Category Fires

- **`visual-engineering`** — Any task involving UI, styling, layout, animation, or visual design. The model is tuned for design taste and CSS expertise.
- **`ultrabrain`** — Architecture decisions, complex algorithmic problems, multi-step reasoning. Routes to the strongest reasoning model available.
- **`deep`** — Autonomous work that requires thorough exploration: debugging, refactoring, research-heavy tasks. The model has room to think deeply.
- **`artistry`** — Creative exploration, brainstorming, alternative approaches. Medium-tier model with creative tendencies.
- **`quick`** — Trivial changes: typos, single-line fixes, small config edits. Uses the fastest available model.
- **`unspecified-low`** — Tasks that don't fit other categories but don't need premium compute.
- **`unspecified-high`** — Tasks that don't fit other categories but need premium compute.
- **`writing`** — Documentation, README files, comments, prose. Uses a model good at natural language.

## Category + Skill Composition

Categories and skills are independent axes. The category provides the execution profile; the skill provides domain instructions:

```typescript
// Visual work with design skill
task(category="visual-engineering", load_skills=["frontend-ui-ux"], prompt="...")

// Deep debugging with diagnosis skill
task(category="deep", load_skills=["diagnose"], prompt="...")

// Quick fix, no skill needed
task(category="quick", load_skills=[], prompt="...")

// Architecture review with deep thinking
task(category="ultrabrain", load_skills=["improve-codebase-architecture"], prompt="...")
```

### Composition Matrix

| Task | Category | Skill | Why |
|---|---|---|---|
| Build a React component | `visual-engineering` | `frontend-ui-ux` | Design-first UI on a visual model |
| Debug a production issue | `deep` | `diagnose` | Thorough exploration with structured diagnosis |
| Write tests for a feature | `deep` | `tdd` | Methodical test-first on a strong model |
| Plan a new project | `ultrabrain` | `grill-with-docs` | Hard reasoning with domain-aware planning |
| Quick typo fix | `quick` | — | Fast model, no skill overhead |
| Review your work | `unspecified-high` | `review-work` | Premium model for thorough review |
| Write documentation | `writing` | `docs-writer` | Prose-optimized model with docs skill |
| Refactor architecture | `deep` | `improve-codebase-architecture` | Deep model with architecture analysis |

## Configuration

Categories are configured in `oh-my-openagent.json`:

```json
{
  "categories": {
    "visual-engineering": {
      "model": "opencode-go/deepseek-v4-pro",
      "fallback_models": [
        {"model": "opencode-go/glm-5.1"},
        {"model": "opencode-go/minimax-m2.7"},
        {"model": "opencode-go/minimax-m2.5-free"}
      ]
    },
    "deep": {
      "model": "opencode-go/deepseek-v4-pro",
      "fallback_models": [
        {"model": "opencode-go/glm-5.1"},
        {"model": "opencode-go/minimax-m2.7"}
      ]
    },
    "quick": {
      "model": "opencode-go/minimax-m2.5-free",
      "fallback_models": [
        {"model": "opencode-go/big-pickle"}
      ]
    }
  }
}
```

Each category has independent fallback chains. If the primary model is unavailable or rate-limited, the next model in the chain takes over automatically.

## Custom Categories

You can define custom categories beyond the defaults. A custom category is just a named profile with a model and fallback chain:

```json
{
  "categories": {
    "security-audit": {
      "model": "opencode-go/deepseek-v4-pro",
      "fallback_models": [
        {"model": "opencode-go/glm-5.1"}
      ]
    }
  }
}
```

Then use it in task delegation:

```typescript
task(category="security-audit", load_skills=[], prompt="Audit the auth module for vulnerabilities")
```

Custom categories let you tune model selection for your specific workflow without modifying the defaults.
