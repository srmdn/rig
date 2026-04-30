# Category Agents

Category agents are specialized workers that [Sisyphus](/pipeline/sisyphus) delegates implementation work to. Each category is optimized for a different type of task. Sisyphus picks the right category automatically, but you can also specify one explicitly.

## The Six Categories

### `quick`

**Optimized for:** Small, fast tasks that don't need deep reasoning.

- Adding a comment
- Renaming a variable
- Fixing a typo
- Updating a config value
- One-line changes

```
"Add a TODO comment to the login handler"
→ Sisyphus delegates to quick
```

### `deep`

**Optimized for:** Multi-step implementation with verification at each step.

- Adding a new feature
- Implementing a CRUD endpoint
- Writing tests alongside code
- Refactoring a module

```
"Add password reset to the auth system"
→ Sisyphus delegates to deep
→ deep implements model, route, handler, tests
→ deep verifies build + tests at each step
```

### `ultrabrain`

**Optimized for:** Complex reasoning that requires deep analysis.

- Architecture decisions
- Algorithm design
- Performance optimization
- Complex data transformations
- Debugging subtle concurrency issues

```
"Optimize this O(n²) algorithm to O(n log n)"
→ Sisyphus delegates to ultrabrain
```

### `visual-engineering`

**Optimized for:** UI/UX implementation with design quality enforcement.

- Building components
- Implementing layouts
- Responsive design
- CSS animations and transitions
- Design system implementation

```
"Build a responsive dashboard layout with a sidebar and main content area"
→ Sisyphus delegates to visual-engineering
→ visual-engineering enforces design rules, hardware-accelerated CSS, component architecture
```

### `artistry`

**Optimized for:** Creative work that needs taste and polish.

- Landing page design
- Visual polish and refinement
- Creative copy
- Brand-aligned styling

```
"Make this landing page look professional and distinctive"
→ Sisyphus delegates to artistry
```

### `writing`

**Optimized for:** Documentation, articles, and prose.

- README files
- API documentation
- Blog posts
- Code comments (when substantial)
- Changelog entries

```
"Write a README for this project"
→ Sisyphus delegates to writing
```

## How Categories + Skills Compose

Categories and skills work together. A category determines *how* the agent works (its optimization), and a skill determines *what* it knows (its domain expertise).

```
task(category="deep", load_skills=["tdd"])
→ deep agent with TDD expertise
→ Follows red-green-refactor loop

task(category="visual-engineering", load_skills=["frontend-design"])
→ visual-engineering agent with frontend design expertise
→ Enforces design quality rules

task(category="writing", load_skills=["docs-writer"])
→ writing agent with documentation expertise
→ Follows documentation conventions
```

### Composition Examples

| Task | Category | Skill | Why |
|------|----------|-------|-----|
| Add TDD feature | `deep` | `tdd` | Multi-step + test-first methodology |
| Build dashboard UI | `visual-engineering` | `frontend-design` | UI work + design quality |
| Write API docs | `writing` | `docs-writer` | Prose + documentation conventions |
| Fix auth bug | `deep` | `diagnose` | Multi-step + structured debugging |
| Refactor with domain language | `deep` | `grill-with-docs` | Multi-step + domain alignment |

## How Sisyphus Picks Categories

When you give Sisyphus a task, it automatically selects the right category:

1. **Small, obvious change** → `quick`
2. **Multi-step implementation** → `deep`
3. **Needs deep reasoning** → `ultrabrain`
4. **UI/UX work** → `visual-engineering`
5. **Creative/polish work** → `artistry`
6. **Documentation/prose** → `writing`

You can override the automatic selection by specifying a category explicitly, but most of the time the automatic routing works well.

## Category Agents in the Pipeline

During `/start-work`, [Atlas](/pipeline/atlas) assigns categories to each task from the [Prometheus](/pipeline/prometheus) plan:

```
Plan: Bookmark API
│
├── Task 1: Project scaffold → quick
├── Task 2: SQLite models → deep
├── Task 3: Auth middleware → deep
├── Task 4: CRUD handlers → deep
└── Task 5: Integration tests → deep (with tdd skill)
```

Atlas reads the task description and assigns the category that best matches the work required.

## See Also

- [Sisyphus: Executor](/pipeline/sisyphus) — How Sisyphus routes to categories
- [Atlas: Orchestrator](/pipeline/atlas) — How Atlas assigns categories in the pipeline
- [Skills Ecosystem](/skills/) — Available skills and how they compose with categories
- [Add a Feature](/playbooks/add-feature) — Category delegation in practice
