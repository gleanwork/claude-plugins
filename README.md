# Glean Claude Code Plugins

Official Glean plugins for [Claude Code](https://claude.com/claude-code), enabling enterprise knowledge integration directly in your development workflow.

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

After installing, run the setup command to connect to your Glean instance:

```bash
/glean-setup
```

This will guide you through configuring your Glean MCP server connection. You'll need:
- Your **Glean instance name** (e.g., if your Glean URL is `https://acme.glean.com`, your instance is `acme`)
- Your **server name** (provided by your Glean administrator)

You can run `/glean-setup` multiple times to add multiple Glean servers.

## What's Included

### Commands

| Command | Description |
|---------|-------------|
| `/glean-setup` | Interactive MCP server configuration |
| `/glean-status` | Check your Glean connection status |
| `/glean-search <query>` | Quick enterprise knowledge search |

### Skills

The plugin includes skills that automatically activate when relevant:

| Skill | Activates When You... |
|-------|----------------------|
| **Search Optimization** | Search for documents, use filters like `owner:`, `updated:` |
| **Enterprise Onboarding** | Ask about people, teams, processes, or company knowledge |
| **Meeting Intelligence** | Ask about meetings, transcripts, or meeting preparation |
| **Code Context** | Search internal code, find implementations, or identify authors |

### Session Integration

On each Claude Code session start, the plugin:
- Checks if Glean is configured
- Reminds you of available Glean capabilities
- Suggests `/glean-setup` if not yet configured

## Available Glean Tools

Once configured, you'll have access to these Glean tools:

| Tool | Purpose |
|------|---------|
| `search` | Search documents, files, and knowledge base |
| `chat` | Get AI-synthesized answers across sources |
| `employee_search` | Find people, teams, and org structure |
| `meeting_lookup` | Search meetings and extract transcripts |
| `code_search` | Search internal code repositories |
| `gmail_search` | Search Gmail (if configured) |
| `read_document` | Get full content of specific documents |

## Search Examples

```bash
# Quick search
/glean-search quarterly planning 2024

# Search with filters
/glean-search owner:"Jane Doe" project roadmap
/glean-search updated:past_week API documentation

# Find people
"Who works on authentication?"  # Triggers enterprise-onboarding skill

# Find meetings
"What was discussed in yesterday's standup?"  # Triggers meeting-intelligence skill

# Find code
"Where is the payment service implemented?"  # Triggers code-context skill
```

## Authentication

Claude Code handles Glean authentication automatically via OAuth. On first use of any Glean tool, you'll be prompted to authenticate through your browser.

## Requirements

- [Claude Code](https://claude.com/claude-code) (latest version)
- A Glean account with MCP access (contact your Glean administrator)
- Your Glean MCP server URL (format: `https://[instance]-be.glean.com/mcp/[server-name]`)

## Support

- [Glean MCP Documentation](https://docs.glean.com/mcp)
- [Glean Support](https://help.glean.com)
- [GitHub Issues](https://github.com/gleanwork/glean-claude-plugins/issues)

## License

MIT License - see [LICENSE](LICENSE) for details.
