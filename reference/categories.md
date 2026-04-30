# Category Settings

Categories are agent execution profiles — each one maps to a model tier and fallback chain. They determine *how* a task runs. Skills determine *what* the agent knows.

For the full explanation of how categories work, how Sisyphus routes to them, and the composition matrix, see [Category System](/skills/categories).

---

## Quick Reference

| Category | Domain | Model Tier | Cost |
|---|---|---|---|
| `visual-engineering` | UI, styling, animation, design | Premium | $$$ |
| `ultrabrain` | Hard logic, architecture, deep reasoning | Premium | $$$ |
| `deep` | Thorough autonomous research + execution | Premium | $$$ |
| `artistry` | Creative problem-solving, exploration | Medium | $$ |
| `quick` | Single-file fixes, typos, small edits | Free | $ |
| `unspecified-high` | Complex misc tasks | Premium | $$$ |
| `unspecified-low` | Simple misc tasks | Free | $ |
| `writing` | Documentation, prose, copy | Free | $ |

---

## Configuration

Categories are configured in `oh-my-openagent.json` under the `categories` key. Each entry has a primary model and an ordered fallback chain:

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
    },
    "writing": {
      "model": "opencode-go/minimax-m2.5-free",
      "fallback_models": [
        {"model": "opencode-go/big-pickle"}
      ]
    }
  }
}
```

If the primary model is unavailable or rate-limited, the harness falls through the chain automatically. You don't intervene.

---

## Custom Categories

You can define categories beyond the defaults. A custom category is a named profile with a model and fallback chain:

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

Use it by specifying it in task delegation:

```
task(category="security-audit", load_skills=[], prompt="Audit the auth module for vulnerabilities")
```

---

## See Also

- [Category System](/skills/categories) — full explanation: routing logic, cost implications, composition matrix
- [Agent Settings](/reference/agents) — per-agent model configuration
- [Model Selection](/reference/models) — model tiers and fallback strategy
