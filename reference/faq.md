# FAQ

## General

### What is the difference between OpenCode and oMO?

OpenCode is the AI coding CLI. oMO (oh-my-openagent) is an agent orchestration layer on top of OpenCode that provides a multi-agent pipeline (Prometheus → Atlas → Sisyphus) with specialized sub-agents and category-based task delegation.

### Do I need oMO?

No  --  OpenCode works great on its own. oMO adds planning, delegation, and verification for larger projects. Try OpenCode first, add oMO when you want the pipeline.

## Pipeline

### When does the pipeline fire?

Only when you type `/start-work`. Normal conversation does not trigger it  --  Sisyphus handles those directly.

### Can I skip Prometheus and go straight to Atlas?

Yes. If you already have a plan at `.sisyphus/plans/your-plan.md`, Atlas can read it directly.

### Can I stop the pipeline mid-execution?

Yes. Just tell Sisyphus to stop or change direction at any point.

## Skills

### What's the difference between a skill and a category?

A **skill** is a set of instructions injected into the agent (like `tdd` injects red-green-refactor rules). A **category** is an execution profile with a tuned model (like `visual-engineering` uses a premium model optimized for UI work). They compose: a task can use both a category AND a skill.

### Do I need Matt Pocock's skills?

They're optional. They add structured engineering processes (grilling sessions, TDD loops, backlog triage) that complement oMO's execution pipeline. Worth trying `/grill-me` and `/grill-with-docs` at minimum.

### How do I create my own skill?

Use `/write-a-skill` and follow the SKILL.md format. Publish it to the community if it's useful to others.

## Models

### Which model should I use?

Start with the defaults. oMO ships with sensible model assignments. Tune if you notice quality issues with specific task types, or if you want to reduce costs by routing simple work to free models.

### What if a model is down?

The fallback chain kicks in automatically. Each agent tries its primary model, then falls through the list.
