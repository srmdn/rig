# Create Your Own Skills

Anyone can write a skill. The `write-a-skill` tool scaffolds the structure, and the SKILL.md format is designed for progressive disclosure  --  agents see the description first, then load full instructions on demand.

## Using write-a-skill

The easiest way to create a skill:

```
/write-a-skill
```

This launches an interactive process that:

1. **Gathers requirements**  --  What task/domain does the skill cover? What specific use cases? Does it need executable scripts or just instructions?
2. **Drafts the skill**  --  Creates SKILL.md with concise instructions, plus additional reference files if needed
3. **Reviews with you**  --  Presents the draft and asks if anything is missing or unclear

## Skill Structure

A skill is a directory containing at minimum a `SKILL.md` file:

```
my-skill/
├── SKILL.md           # Main instructions (required)
├── REFERENCE.md       # Detailed docs (optional)
├── EXAMPLES.md        # Usage examples (optional)
└── scripts/           # Utility scripts (optional)
    └── helper.js
```

### SKILL.md Format

Every SKILL.md has two parts: frontmatter and body.

```md
---
name: my-skill
description: What the skill does. Use when [specific triggers].
---

# My Skill

## Quick start

[Minimal working example  --  what the agent does first]

## Workflows

[Step-by-step processes with checklists for complex tasks]

## Advanced features

[Link to separate files: See REFERENCE.md]
```

### The Description Is Critical

The `description` field is **the only thing your agent sees** when deciding which skill to load. It's surfaced in the system prompt alongside all other installed skills. Your agent reads these descriptions and picks the relevant skill based on the user's request.

Good descriptions follow this pattern:

```
What it does. Use when [specific triggers].
```

**Good:**

```
Extract text and tables from PDF files, fill forms, merge documents.
Use when working with PDF files or when user mentions PDFs, forms, or document extraction.
```

**Bad:**

```
Helps with documents.
```

The bad example gives your agent no way to distinguish this from other document skills.

Description requirements:

- Max 1024 characters
- Write in third person
- First sentence: what it does
- Second sentence: "Use when [specific triggers]"

## Progressive Disclosure

Skills use progressive disclosure to manage context. The agent sees:

1. **Description**  --  Always visible in the system prompt. Short, trigger-focused.
2. **SKILL.md body**  --  Loaded when the skill is activated. The full workflow.
3. **Reference files**  --  Loaded only when the agent needs deeper detail.

This means your SKILL.md should be concise (under 100 lines). Split into separate files when:

- SKILL.md exceeds 100 lines
- Content has distinct domains
- Advanced features are rarely needed

## When to Add Scripts

Add utility scripts to your skill when:

- The operation is deterministic (validation, formatting, scaffolding)
- The same code would be generated repeatedly
- Errors need explicit handling

Scripts save tokens and improve reliability compared to generated code. They're part of the skill's bundled resources  --  the agent can call them without regenerating them each time.

## Where to Install Skills

```
~/.config/opencode/skills/          # Global (all projects)
  └── my-skill/
      └── SKILL.md

.project/.opencode/skills/          # Project-level (this repo only)
  └── project-skill/
      └── SKILL.md
```

Project-level skills override global skills with the same name. Both override built-in skills.

## Publishing to the Community

To share your skill with others:

1. **GitHub repository**  --  Create a repo with your skill directory structure
2. **SKILL.md as entry point**  --  The root SKILL.md is what agents load
3. **README for humans**  --  Include installation instructions for manual setup
4. **Reference docs**  --  Bundle any EXAMPLES.md, REFERENCE.md, or scripts

Users install by cloning or copying your skill directory into their `.opencode/skills/` folder.

### Skill Naming Conventions

- Use kebab-case: `my-skill`, not `mySkill` or `My Skill`
- Be specific: `rails-migration-safety`, not `rails`
- Include the domain: `python-type-checker`, not `type-checker`

### Example: A Minimal Skill

```md
---
name: commit-convention
description: Enforce conventional commit messages. Use when committing changes, writing commit messages, or user mentions "conventional commits" or "commit convention".
---

# Commit Convention

## Quick start

When the user asks to commit, enforce conventional commit format:

## Rules

1. Format: `type(scope): description`
2. Types: feat, fix, docs, style, refactor, test, chore
3. Scope is optional but encouraged
4. Description is lowercase, no period at the end
5. Body (if needed) explains what and why, not how

## Examples

- `feat(auth): add email verification`
- `fix(payments): handle null discount code`
- `docs(api): update endpoint descriptions`
```

This is a complete, working skill. No scripts, no reference files  --  just clear instructions that reshape how the agent handles commits.

## Composing Custom Skills with Categories

Custom skills compose with oMO categories just like built-in and plugin skills:

```typescript
// Custom skill on a premium model
task(category="deep", load_skills=["my-custom-skill"], prompt="...")

// Custom skill on a quick model
task(category="quick", load_skills=["my-custom-skill"], prompt="...")
```

The category determines execution. The skill determines domain knowledge. They're independent axes.
