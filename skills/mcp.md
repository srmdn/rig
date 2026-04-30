# MCP Integration

Model Context Protocol (MCP) servers extend agents with external tools that go beyond code — browser automation, database access, filesystem operations, web search, and more.

## What Is MCP?

MCP is an open protocol that lets agents connect to external tool servers. An MCP server exposes tools, resources, and prompts that an agent can call during a session. Think of it as a plugin system for agent capabilities — but instead of injecting instructions, it injects live tools.

The key difference from skills: **skills inject knowledge and workflows**. **MCP servers inject live tools**. They're complementary.

## Built-in MCP Servers

oMO ships with three MCP servers always available:

| Server | What It Does |
|---|---|
| **Exa (websearch)** | Web search with clean, ready-to-use content. Finds current information, news, facts, people, companies. |
| **Context7** | Queries up-to-date documentation and code examples for any library or framework. Resolves library IDs, then fetches docs. |
| **Grep.app** | Searches real-world code across over a million public GitHub repositories. Finds production patterns and usage examples. |

These are always on. No configuration needed.

## Skill-Embedded MCPs

The real power: **skills can carry their own MCP servers**. This is an oMO innovation that solves the context bloat problem.

Without skill-embedded MCPs, every MCP server you connect stays in context for the entire session, consuming your context budget whether you use it or not. With skill-embedded MCPs:

1. The MCP server spins up **on-demand** when the skill is loaded
2. It's **scoped** to the task the skill is handling
3. It **shuts down** when the skill's task is done
4. Your context window **stays clean**

```typescript
// A skill with an embedded MCP
// When this skill loads, its MCP server starts
// When the skill finishes, the MCP server stops
task(category="visual-engineering", load_skills=["frontend-design"], prompt="...")
```

## Connecting External MCP Servers

You can connect any MCP-compatible server to your agent. Common integrations:

### Playwright (Browser Automation)

```json
{
  "mcps": {
    "playwright": {
      "command": "npx",
      "args": ["@anthropic/mcp-playwright"]
    }
  }
}
```

Enables browser automation: navigate pages, click elements, fill forms, take screenshots, extract content. Useful for E2E testing, web scraping, and visual verification.

### Filesystem (Extended File Access)

```json
{
  "mcps": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/allowed/dir"]
    }
  }
}
```

Grants the agent access to directories outside the project root. Useful for cross-project operations, accessing shared assets, or working with system files.

### Database (Direct Query Access)

```json
{
  "mcps": {
    "sqlite": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sqlite", "--db-path", "/path/to/db.sqlite"]
    }
  }
}
```

Lets the agent query databases directly. Useful for debugging data issues, verifying migrations, and exploring schemas.

### GitHub (Extended Repository Operations)

```json
{
  "mcps": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "${GITHUB_TOKEN}"
      }
    }
  }
}
```

Extends beyond the built-in `gh` CLI with richer repository operations, issue management, and PR workflows.

## MCP vs Skills

| Aspect | Skills | MCP Servers |
|---|---|---|
| **What they add** | Knowledge, workflows, instructions | Live tools and data access |
| **Context cost** | Loaded on-demand, released after task | Persistent while connected |
| **Scope** | Domain-specific (TDD, debugging, etc.) | Tool-specific (browser, DB, etc.) |
| **Composition** | Skills can embed MCP servers | MCP servers can be standalone |
| **Creation** | Write a SKILL.md | Implement the MCP protocol |

They compose: a skill like `frontend-design` can embed a Playwright MCP server for visual verification, loading it only when the skill is active and releasing it when done.

## Disabling MCP Servers

To disable a built-in MCP server:

```json
{
  "disabled_mcps": ["playwright", "browser"]
}
```

This prevents the server from starting, even if it's referenced by a skill. Use this when a server conflicts with your environment or you don't need its capabilities.
