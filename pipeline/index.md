# The oMO Pipeline

oh-my-openagent (oMO) uses a multi-agent pipeline to turn your intent into working code. Three agents  --  **Prometheus**, **Atlas**, and **Sisyphus**  --  each handle a different stage. A fourth, **Oracle**, is a read-only consultant you can call in when you're stuck.

## The Flow

```
  You type /start-work "Build a bookmark API with auth"
       │
       ▼
  ┌──────────┐
  │Prometheus │  Creates a structured plan
  │ (Planner) │  Saves to .sisyphus/plans/*.md
  └────┬─────┘
       │
       ▼
  ┌──────────┐
  │   Atlas   │  Reads the plan, delegates tasks
  │(Orchestr.)│  Verifies each step
  └────┬─────┘
       │
       ▼
  ┌──────────┐
  │ Sisyphus  │  Executes tasks via category agents
  │ (Executor)│  Routes to specialists automatically
  └──────────┘
       │
       ├──► explore (search codebase)
       ├──► oracle (architecture/debugging)
       ├──► librarian (docs & references)
       └──► category agents (implementation)
              ├── visual-engineering
              ├── deep
              ├── ultrabrain
              ├── artistry
              ├── quick
              └── writing
```

## Two Modes of Operation

The most important thing to understand: **the pipeline only fires when you use `/start-work`**. The rest of the time, you're talking directly to Sisyphus.

### Pipeline mode (`/start-work`)

For significant new work  --  new projects, major features, multi-step refactors. You describe what you want, and the full pipeline runs:

1. **Prometheus** creates a plan
2. **Atlas** orchestrates execution
3. **Sisyphus** (and category agents) implement

### Direct mode (default)

For everything else  --  quick fixes, questions, small changes, debugging. You talk to Sisyphus, and it handles things directly or delegates as needed.

```
"Add a comment to the calculateTotal function"
→ Sisyphus handles it directly

"What does this config setting do?"
→ Sisyphus answers directly

"Fix the login bug"
→ Sisyphus explores, diagnoses, fixes  --  no pipeline needed
```

## Decision Tree

```
Is this significant new work (new project, major feature, large refactor)?
│
├── YES → Use /start-work
│          Prometheus plans, Atlas orchestrates, Sisyphus executes
│
└── NO → Talk to Sisyphus directly
         │
         ├── Need to clarify intent first?
         │   └── YES → Use /grill-me or /grill-with-docs
         │
         ├── Stuck after 2+ failed fix attempts?
         │   └── YES → Consult Oracle
         │
         └── Just do it
             └── Sisyphus routes to the right agent
```

## The Agents

| Agent | Role | Trigger | Output |
|-------|------|---------|--------|
| [Prometheus](/pipeline/prometheus) | Planner | `/start-work` | `.sisyphus/plans/*.md` |
| [Atlas](/pipeline/atlas) | Orchestrator | Automatic (after Prometheus) | Delegation to category agents |
| [Sisyphus](/pipeline/sisyphus) | Executor | Always (your default agent) | Code changes, answers |
| [Oracle](/pipeline/oracle) | Consultant | Manual or auto (2+ failures) | Analysis, recommendations |

## Category Agents

Sisyphus delegates implementation work to category agents based on the task type. See [Category Agents](/pipeline/categories) for the full breakdown.

| Category | Optimized for |
|----------|--------------|
| `quick` | Small, fast tasks  --  comments, renames, one-liners |
| `deep` | Multi-step implementation with verification |
| `ultrabrain` | Complex reasoning  --  architecture, algorithms |
| `visual-engineering` | UI/UX with design quality enforcement |
| `artistry` | Creative work  --  copy, design, polish |
| `writing` | Documentation, articles, prose |

## Real-World Examples

See the [Playbooks](/playbooks/) for step-by-step walkthroughs:

- [Start a New Project](/playbooks/new-project)  --  Full pipeline with `/start-work`
- [Add a Feature](/playbooks/add-feature)  --  Direct Sisyphus delegation
- [Debug a Bug](/playbooks/debug)  --  Sisyphus + Oracle for hard bugs
- [Refactor with Grill](/playbooks/refactor-grill)  --  Clarify before you code
