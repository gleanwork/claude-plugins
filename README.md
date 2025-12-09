# Glean Claude Code Plugins

Official Glean plugins for [Claude Code](https://claude.com/claude-code), enabling enterprise knowledge integration directly in your development workflow.

**Think of Glean tools as ingredients. This plugin provides the recipes.**

## Installation

### Step 1: Add the Glean Marketplace

```bash
/plugin add-marketplace glean https://github.com/gleanwork/glean-claude-plugins
```

### Step 2: Install the Plugin

```bash
/plugin install glean
```

### Step 3: Configure Your Glean MCP Server

```bash
/glean-setup
```

This will guide you through connecting to your Glean instance. You'll need:
- Your **Glean instance name** (e.g., `acme` if your URL is `https://acme.glean.com`)
- Your **server name** (provided by your Glean administrator)

Run `/glean-setup` multiple times to add multiple servers.

## Workflows (Recipes)

The plugin provides autonomous agents that combine Glean tools with local development context to accomplish complex workflows.

### RFC Verification

Compare a design document to its implementation and identify gaps.

```
"Verify this RFC against the implementation"
"Check if the design doc matches the code"
[paste RFC URL]
```

The agent will:
1. Fetch the RFC from Glean
2. Extract requirements and specifications
3. Search the local codebase for implementations
4. Generate a completeness report with gaps

### Meeting Prep

Prepare for an upcoming meeting with full context.

```
"Prepare me for my meeting with Sarah"
"Get ready for the quarterly planning meeting"
```

The agent will:
1. Find past instances of the meeting
2. Extract decisions and open action items
3. Gather related recent documents
4. Generate a prep doc with talking points

### Team Onboarding

Get up to speed on a new team or project.

```
"I'm new to the payments team"
"Onboard me to the authentication service"
```

The agent will:
1. Find key people and leadership
2. Gather essential documentation
3. Identify current priorities
4. Generate a personalized onboarding guide

### Stakeholder Discovery

Find the right people to involve in a change.

```
"Who should I talk to about changing the auth flow?"
"Find stakeholders for the database migration"
```

The agent will:
1. Identify code owners and contributors
2. Find documentation authors
3. Map downstream dependencies
4. Generate a stakeholder engagement plan

### Decision Trail

Understand why something was built a certain way.

```
"Why do we use Redis instead of Memcached?"
"What's the history behind the auth architecture?"
```

The skill will:
1. Search for design documents and RFCs
2. Find relevant meeting discussions
3. Identify the decision makers
4. Explain the rationale and alternatives considered

## Commands

| Command | Description |
|---------|-------------|
| `/glean-setup` | Configure Glean MCP server connection |
| `/glean-status` | Check connection status |
| `/glean-search <query>` | Quick enterprise search |

## How It Works

Glean provides access to your company's knowledge:
- **Documents**: Confluence, Notion, Google Docs, etc.
- **People**: Org structure, teams, expertise
- **Meetings**: Calendar, transcripts, recordings
- **Code**: Internal repositories and commits
- **Communication**: Slack, email (if configured)

This plugin combines those capabilities with Claude Code's local development tools to create powerful workflows that bridge enterprise knowledge and your codebase.

## Authentication

Claude Code handles Glean authentication automatically via OAuth. On first use, you'll be prompted to authenticate through your browser.

## Requirements

- [Claude Code](https://claude.com/claude-code) (latest version)
- A Glean account with MCP access
- Your Glean MCP server URL (format: `https://[instance]-be.glean.com/mcp/[server-name]`)

## Support

- [Glean MCP Documentation](https://docs.glean.com/mcp)
- [Glean Support](https://help.glean.com)
- [GitHub Issues](https://github.com/gleanwork/glean-claude-plugins/issues)

## License

MIT License - see [LICENSE](LICENSE) for details.
