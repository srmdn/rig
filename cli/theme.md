# omo-kit theme

Theme management for OpenCode. Validate existing themes or generate new ones from base colors.

## Usage

```bash
# Validate a theme file
bunx omo-kit theme validate ./my-theme.json

# Generate a new theme interactively
bunx omo-kit theme generate
```

## theme validate

Checks that a theme JSON file follows the OpenCode theme schema:

- Has `$schema`, `name`, `type`, and `colors` keys
- `type` is `dark` or `light`
- All required color tokens present
- Color values are valid hex or ANSI codes

## theme generate

Interactive theme builder. Provide base colors — get a complete theme file.

```
$ bunx omo-kit theme generate

? Theme name: nord-frost
? Background color: #2E3440
? Foreground color: #D8DEE9
? Accent color: #88C0D0

✔ Generated: nord-frost.json
  Type: dark (auto-detected)
  Colors: 24 tokens

Install: copy to ~/.config/opencode/themes/
```

The generator auto-detects light vs dark from background brightness and derives all required tokens (selection, comments, errors, warnings, etc.) from your base colors.

::: tip
Use `omo-kit theme validate` on any theme before installing to catch missing tokens.
:::
