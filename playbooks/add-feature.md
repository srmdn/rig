# Add a Feature

**Goal:** Add a feature to an existing project using direct Sisyphus interaction.

## When This Fits

The project already exists. You're adding a feature, not starting from scratch. You know the codebase structure. The change is significant but scoped.

## The Flow

1. **Describe the feature** to Sisyphus
2. Sisyphus explores the relevant code, finds patterns
3. Sisyphus delegates implementation to category agents
4. Verify the result

## Example

```
User: "Add password reset to my auth system"

Sisyphus:
  - Fires explore agents to find existing auth middleware, models, routes
  - Delegates implementation:
    - reset-token model → quick agent
    - reset email sending → deep agent
    - reset route + handler → deep agent
    - tests → deep agent (with tdd skill)
  - Verifies build, diagnostics, tests
  - Done
```

## Key Decisions

- **Use /start-work?** If the feature is complex enough that you want a formal plan first. For most features, direct Sisyphus is enough.
- **Pre-align?** If the feature is ambiguous, run /grill-me first to clarify intent.
