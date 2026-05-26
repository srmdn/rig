# omo-kit CLI

The companion CLI for Rig. Generates configs, validates them, and manages themes — so you don't write JSON by hand.

## Install

```bash
bun install -g omo-kit
```

Source: [github.com/srmdn/omo-kit](https://github.com/srmdn/omo-kit)

## Commands

| Command | What it does |
|---|---|
| [`init`](/cli/init) | Interactive config generator. Pick your stack, models, budget — get working JSON files. |
| [`doctor`](/cli/doctor) | Scans config files for errors, warnings, and stale references. |
| [`theme`](/cli/theme) | Validate existing themes or generate new ones from base colors. |
| `setup` | One-command OMO install (coming soon). |

## Quickstart

```bash
# Generate a full OMO + OpenCode workspace
bunx omo-kit init

# Check existing configs for problems
bunx omo-kit doctor

# Create a custom theme
bunx omo-kit theme generate
```
