# Configuration Reference

The `oh-my-openagent.json` file lives at `~/.config/opencode/oh-my-openagent.json`.

## Structure

```json
{
  "disabled_skills": [],
  "disabled_mcps": [],
  "agents": {},
  "categories": {}
}
```

## Disabled Skills

Skills or MCP servers you don't want active:

```json
{
  "disabled_skills": ["playwright", "agent-browser"],
  "disabled_mcps": ["playwright", "browser"]
}
```

## Agents

Each agent has a primary model and fallback chain:

```json
{
  "agents": {
    "sisyphus": {
      "model": "opencode-go/deepseek-v4-pro",
      "fallback_models": [
        { "model": "opencode-go/glm-5.1" },
        { "model": "opencode-go/minimax-m2.7" }
      ]
    }
  }
}
```

### Agent Types

| Agent | Purpose | Recommended Model Tier |
|---|---|---|
| sisyphus | Main orchestrator, routing | Premium (deepseek-v4-pro, claude-sonnet) |
| oracle | Architecture, hard debugging | Premium (deepseek-v4-pro) |
| explore | Codebase search | Medium (minimax-m2.7, glm-5.1) |
| librarian | External reference search | Medium |
| sisyphus-junior | Task execution | Medium to Free |
| momus | Plan review | Medium |
| metis | Pre-planning analysis | Medium |

## Categories

Categories are execution profiles with tuned models. They're used when Sisyphus delegates tasks:

```json
{
  "categories": {
    "visual-engineering": {
      "model": "opencode-go/deepseek-v4-pro",
      "fallback_models": []
    },
    "deep": {
      "model": "opencode-go/deepseek-v4-pro",
      "fallback_models": []
    },
    "quick": {
      "model": "opencode-go/minimax-m2.5-free",
      "fallback_models": []
    }
  }
}
```

### Recommended Category Model Tiers

| Category | Best For | Model Tier |
|---|---|---|
| visual-engineering | UI, styling, design | Premium |
| ultrabrain | Hard logic, architecture | Premium |
| deep | Thorough autonomous work | Premium |
| artistry | Creative problem-solving | Medium |
| quick | Single-file fixes, typos | Free |
| unspecified-low | Simple misc tasks | Free |
| unspecified-high | Complex misc tasks | Premium |
| writing | Documentation, prose | Free to Medium |

> **Tip:** Save costs by routing simple tasks to free models. Reserve premium models for creative and complex work.
