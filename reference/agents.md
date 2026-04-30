# Agent Settings

Configuration options for each oMO agent.

## Sisyphus

The main orchestrator. Controls routing logic and delegation strategy.

```json
{
  "sisyphus": {
    "model": "opencode-go/deepseek-v4-pro",
    "fallback_models": [...]
  }
}
```

## Oracle  

Read-only consultant for architecture and debugging. Expensive to run — use sparingly.

```json
{
  "oracle": {
    "model": "opencode-go/deepseek-v4-pro",
    "fallback_models": [...]
  }
}
```

**When Oracle fires automatically:** After 2+ failed fix attempts on the same bug.

## Explore

Codebase search agent. Runs background searches for code patterns.

```json
{
  "explore": {
    "model": "opencode-go/minimax-m2.7",
    "fallback_models": [...]
  }
}
```

## Librarian

External reference agent. Searches GitHub, documentation, web for library usage.

```json
{
  "librarian": {
    "model": "opencode-go/minimax-m2.7",
    "fallback_models": [...]
  }
}
```

## Prometheus

Creates structured work plans. Invoked by `/start-work`.

```json
{
  "prometheus": {
    "model": "opencode-go/deepseek-v4-pro",
    "fallback_models": [...]
  }
}
```

## Atlas

Reads plans and coordinates execution. Invoked automatically after Prometheus.

```json
{
  "atlas": {
    "model": "opencode-go/deepseek-v4-pro",
    "fallback_models": [...]
  }
}
```

## Metis & Momus

Pre-planning analysis and plan review. Advisory roles.

```json
{
  "metis": {
    "model": "opencode-go/deepseek-v4-pro",
    "fallback_models": [...]
  },
  "momus": {
    "model": "opencode-go/glm-5.1",
    "fallback_models": [...]
  }
}
```
