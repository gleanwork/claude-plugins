# Glean Claude Code Plugins

Official Glean plugins for [Claude Code](https://claude.com/claude-code), enabling enterprise knowledge integration directly in your development workflow.

## Installation

### Step 1: Add the Glean Marketplace

```bash
claude plugin marketplace add https://github.com/gleanwork/claude-plugins
```

### Step 2: Install the Plugin

```bash
claude plugin install glean
```

### Step 3: Configure Your Glean MCP Server

```bash
/glean:mcp-setup
```

This will guide you through connecting to your Glean instance. You'll need:

- Your **Glean instance name** (e.g., `acme` if your URL is `https://acme-be.glean.com`)
- Your **server name** (provided by your Glean administrator)

Run `/glean:mcp-setup` multiple times to add multiple servers.

---

## Commands

All workflows are accessible via slash commands for easy discoverability. Type `/glean:` to see all available commands.

### `/glean:catch-up` - What Did I Miss?

Quickly catch up after being away.

```
/glean:catch-up last week
/glean:catch-up since Monday
/glean:catch-up 2 weeks
```

The command will:

1. Synthesize across Slack, meetings, docs, and email
2. Find action items assigned to you
3. Surface decisions affecting your work
4. Identify questions waiting for your input
5. Generate a prioritized catch-up report

**Uniquely Glean:** Cross-source synthesis that no single tool can provide.

---

### `/glean:meeting-prep` - Meeting Preparation

Prepare for an upcoming meeting with full context.

```
/glean:meeting-prep quarterly planning
/glean:meeting-prep 1:1 with Sarah
```

The command will:

1. Find past instances of this meeting
2. Extract decisions and open action items
3. Gather related recent documents
4. Generate a prep doc with talking points

---

### `/glean:find-expert` - Expertise Finder

Find who _actually_ knows about a topic - not just by title.

```
/glean:find-expert Kubernetes
/glean:find-expert payment system
/glean:find-expert authentication
```

The command will:

1. Search code contributions in this area
2. Find documentation authors
3. Identify meeting participants and discussion leaders
4. Cross-reference to find true experts (not just titles)
5. Rank by actual activity and engagement

**Uniquely Glean:** Infers expertise from real activity across code, docs, and conversations.

---

### `/glean:stakeholders` - Stakeholder Discovery

Find who needs to be involved in a change.

```
/glean:stakeholders changing the auth flow
/glean:stakeholders database migration
```

The command will:

1. Identify code owners and contributors
2. Find documentation authors
3. Map downstream dependencies
4. Generate a stakeholder engagement plan

---

### `/glean:onboarding` - Team Onboarding

Get up to speed on a new team or project.

```
/glean:onboarding payments team
/glean:onboarding authentication service
```

The command will:

1. Find key people and leadership
2. Gather essential documentation
3. Identify current priorities
4. Generate a personalized onboarding guide

---

### `/glean:verify-rfc` - RFC Verification

Compare a design document to its actual implementation.

```
/glean:verify-rfc https://docs.company.com/rfc/123
/glean:verify-rfc OAuth migration spec
```

The command will:

1. Fetch and parse the RFC from Glean
2. Extract requirements and specifications
3. Search the local codebase for implementations
4. Generate a completeness report with gaps

**Uniquely Glean:** Bridges enterprise documentation with codebase reality.

---

### Utility Commands

| Command                 | Description                           |
| ----------------------- | ------------------------------------- |
| `/glean:mcp-setup`      | Configure Glean MCP server connection |
| `/glean:status`         | Check connection status               |
| `/glean:search <query>` | Quick enterprise search               |

---

## Requirements

- [Claude Code](https://claude.com/claude-code) (latest version)
- A Glean account with MCP access
- Your Glean MCP server URL (format: `https://[instance]-be.glean.com/mcp/[server-name]`)

## Support

- [Glean MCP Documentation](https://docs.glean.com/mcp)
- [Glean Support](https://help.glean.com)
- [GitHub Issues](https://github.com/gleanwork/claude-plugins/issues)

## License

MIT License - see [LICENSE](LICENSE) for details.
