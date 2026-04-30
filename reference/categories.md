# Category Settings

Categories are agent profiles optimized for specific types of work. Each category maps to a model and can load skills.

## Available Categories

| Category | Domain | Model Rec |
|---|---|---|
| visual-engineering | UI, styling, animation | Premium |
| ultrabrain | Hard logic, architecture | Premium |
| deep | Thorough autonomous work | Premium |
| artistry | Creative problem-solving | Medium |
| quick | Single-file fixes, typos | Free |
| unspecified-low | Simple misc tasks | Free |
| unspecified-high | Complex misc tasks | Premium |
| writing | Documentation, prose | Free |

## How Categories Work

When Sisyphus delegates a task, it selects a category based on the task's domain:

```typescript
// Visual work → visual-engineering
task(category="visual-engineering", load_skills=["frontend-ui-ux"], prompt="...")

// Trivial fix → quick  
task(category="quick", load_skills=[], prompt="...")

// Complex autonomous work → deep
task(category="deep", load_skills=["tdd"], prompt="...")
```

## Category + Skill Composition

Categories and skills compose. The category provides the execution profile (model, behavior), while skills inject domain-specific instructions:

| Task | Category | Skill |
|---|---|---|
| Build a React component | visual-engineering | frontend-ui-ux |
| Write documentation | writing | docs-writer |
| Debug a bug | deep | diagnose |
| Refactor with TDD | deep | tdd |

## Configuration

```json
{
  "categories": {
    "visual-engineering": {
      "model": "opencode-go/deepseek-v4-pro",
      "fallback_models": [
        {"model": "opencode-go/glm-5.1"},
        {"model": "opencode-go/minimax-m2.7"}
      ]
    }
  }
}
```

Each category can have independent fallback chains.
