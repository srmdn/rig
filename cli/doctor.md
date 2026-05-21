# omo-kit doctor

Config health checker. Scans your OMO and OpenCode config files for errors, warnings, and stale references.

## Usage

```bash
bunx omo-kit doctor
```

## What it checks

| Check | Severity |
|---|---|
| JSON syntax validity | Error |
| `provider` vs `providers` key | Error |
| Non-existent theme names | Warning |
| Legacy `oh-my-opencode.json` filename | Warning |
| Missing required keys in agent config | Error |
| Broken/aspirational repo references | Warning |

## Example output

```
$ bunx omo-kit doctor

~/.config/opencode/opencode.json ........... ✓ OK
~/.config/opencode/oh-my-openagent.json .... ✓ OK
~/.config/opencode/tui.json ................ ✓ OK

./opencode.json ............................ ✓ OK
./oh-my-openagent.json ..................... ⚠ WARN
  → Line 12: agent "librarian" has no fallback_models
./CLAUDE.md ................................ ✓ OK
./AGENTS.md ................................ ✓ OK

1 warning found. Configs usable but could be improved.
```

## Exit codes

- `0` — All clean
- `1` — Errors or warnings found
