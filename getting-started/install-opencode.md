# Installing OpenCode

OpenCode is the CLI and TUI that runs your AI coding sessions. Before you can use oMO's pipeline and skills, you need OpenCode installed and working.

## Prerequisites

- **Node.js** 18 or later (for npm install)
- **Go** 1.22 or later (if building from source)
- **Git**  --  OpenCode integrates with your repo history
- A terminal (macOS Terminal, iTerm2, Warp, etc.)

## Install with Homebrew (macOS)

The easiest way to install on macOS:

```bash
brew install opencode-ai/tap/opencode
```

This adds the `opencode` binary to your PATH. Homebrew handles updates too:

```bash
brew upgrade opencode
```

## Install with npm

If you prefer npm or need cross-platform support:

```bash
npm install -g @opencode-ai/opencode
```

Update later with:

```bash
npm update -g @opencode-ai/opencode
```

## Build from source

If you want the latest unreleased changes or prefer to compile yourself:

```bash
git clone https://github.com/opencode-ai/opencode.git
cd opencode
go build -o opencode ./cmd/opencode
```

Then move the binary somewhere on your PATH:

```bash
sudo mv opencode /usr/local/bin/
```

To update, pull the latest changes and rebuild:

```bash
cd opencode
git pull
go build -o opencode ./cmd/opencode
sudo mv opencode /usr/local/bin/
```

## Verify your install

Run:

```bash
opencode --version
```

You should see a version number printed. If you get `command not found`, the binary isn't on your PATH  --  check your shell profile (`~/.zshrc`, `~/.bashrc`) or reinstall.

## First launch

Open a project directory and start OpenCode:

```bash
cd ~/Developer/projects/my-project
opencode
```

The first time you run OpenCode, it will:

1. Create a config directory at `~/.config/opencode/`
2. Prompt you to set up an API key for your chosen model provider (Anthropic, OpenAI, etc.)
3. Open the TUI  --  a terminal-based interface where you chat with your coding agent

::: tip
OpenCode stores sessions, settings, and provider configs under `~/.config/opencode/`. You can inspect or edit these files directly, but most configuration happens through the TUI or through oMO (which we'll set up next).
:::

## What OpenCode gives you

Out of the box, OpenCode provides:

- **A TUI**  --  chat with an AI agent inside your terminal
- **File operations**  --  the agent can read, write, and edit files in your project
- **Shell access**  --  the agent can run commands (with your approval)
- **Session history**  --  conversations are saved and resumable
- **Model selection**  --  switch between providers and models

This is powerful on its own. But when you add oMO, you get a structured multi-agent pipeline, curated skills, and project conventions that make the whole system more reliable and productive.

::: info Next step
Now that OpenCode is running, [install oMO](/getting-started/install-omo) to add the pipeline and skills layer.
:::
