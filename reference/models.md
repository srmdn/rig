# Model Selection

How to choose models for different agent roles.

## Model Tiers

| Tier | Example Models | Token Cost | Best For |
|---|---|---|---|
| Premium | deepseek-v4-pro, claude-sonnet-4 | $$ | Architecture, debugging, complex code |
| Medium | glm-5.1, minimax-m2.7 | $ | Exploration, research, moderate tasks |
| Free | minimax-m2.5-free, big-pickle | Free | Quick fixes, formatting, simple changes |

## Fallback Chains

If a model is unavailable or rate-limited, the agent falls through the chain:

```json
{
  "model": "opencode-go/deepseek-v4-pro",
  "fallback_models": [
    { "model": "opencode-go/glm-5.1" },
    { "model": "opencode-go/minimax-m2.7" },
    { "model": "opencode-go/minimax-m2.5-free" }
  ]
}
```

## Cost-Optimized Setup

Route more work to free/cheap models:

- `quick` → minimax-m2.5-free
- `writing` → minimax-m2.5-free  
- `explore`, `librarian` → glm-5.1
- `sisyphus-junior` → minimax-m2.7

This keeps premium models reserved for where they add the most value.

## Quality-Optimized Setup

Use premium models across the board for the best output quality. Higher token cost but fewer iterations and better results.
