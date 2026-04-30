# Refactor with Grill

**Goal:** Refactor code with clear intent and zero misalignment.

## Why Grill First

The #1 failure mode in AI-assisted development: the agent builds something different from what you imagined. A grilling session forces you to articulate your intent before any code is written.

## The Flow

1. **Invoke /grill-me** with your refactoring goal
2. Sisyphus interviews you relentlessly  --  clarifying scope, naming, patterns, edge cases
3. Once aligned, Sisyphus produces a plan
4. Execute the plan with /start-work or direct delegation
5. Verify each step

## Example

```
User: /grill-me "Refactor the user service"

Sisyphus: "What specific problem are you solving? Performance, readability, coupling?"
User: "The UserService is 800 lines and does database queries, email sending, and validation"

Sisyphus: "Should we split into UserStore, UserEmail, UserValidator?"
User: "Yes, and keep UserService as a thin facade"

Sisyphus: "Should existing tests keep passing after each split? Or can we batch the test fixes?"
User: "Keep tests green after each extraction"

Sisyphus: "Naming convention  --  PascalCase files, or kebab-case?"
...
```

## When to Use grill-with-docs Instead

Use `/grill-with-docs` when:

- The project has a `CONTEXT.md` with domain language
- Architecture decisions should be recorded as ADRs
- The refactor involves renaming domain concepts

The docs variant updates `CONTEXT.md` and `docs/adr/` inline as decisions crystallize.
