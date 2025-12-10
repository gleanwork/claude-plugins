# Glean Claude Code Plugins

![Experimental](https://img.shields.io/badge/Experimental-D8FD49?style=flat-square&logo=data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMzIgMzIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0yNC4zMDA2IDIuOTU0MjdMMjAuNzY1NiAwLjE5OTk1MUwxNy45MDI4IDMuOTk1MjdDMTMuNTY1MyAxLjkzNDk1IDguMjMwMTkgMy4wODQzOSA1LjE5Mzk0IDcuMDA5ODNDMS42NTg4OCAxMS41NjQyIDIuNDgzIDE4LjExMzggNy4wMzczOCAyMS42NDg5QzguNzcyMzggMjIuOTkzNSAxMC43ODkzIDIzLjcwOTIgMTIuODI3OSAyMy44MTc3QzE2LjE0NjEgMjQuMDEyOCAxOS41MDc3IDIyLjYyNDggMjEuNjc2NSAxOS44MDU1QzI0LjczNDQgMTUuODggMjQuNTE3NSAxMC40MTQ4IDIxLjQ1OTYgNi43Mjc4OUwyNC4zMDA2IDIuOTU0MjdaTTE4LjExOTcgMTcuMDUxMkMxNi4xMDI4IDE5LjYzMiAxMi4zNzI1IDIwLjEwOTEgOS43NzAwMSAxOC4wOTIyQzcuMTg5MTkgMTYuMDc1MiA2LjcxMjA3IDEyLjMyMzMgOC43MjkwMSA5Ljc0MjQ2QzkuNzA0OTQgOC40ODQ1OCAxMS4xMTQ2IDcuNjgyMTQgMTIuNjc2MSA3LjQ4Njk2QzEzLjA0NDggNy40NDM1OCAxMy40MTM1IDcuNDIxOSAxMy43ODIyIDcuNDQzNThDMTQuOTc1IDcuNTA4NjUgMTYuMTI0NCA3Ljk0MjM5IDE3LjA3ODcgOC42Nzk3N0MxOS42NTk1IDEwLjcxODQgMjAuMTM2NiAxNC40NzAzIDE4LjExOTcgMTcuMDUxMloiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0yNC41MTc2IDIxLjY5MjJDMjMuOTMyIDIyLjQ1MTMgMjMuMjgxNCAyMy4xMjM2IDIyLjU2NTcgMjMuNzUyNUMyMS44NzE3IDI0LjMzODEgMjEuMTEyNyAyNC44ODAzIDIwLjMxMDIgMjUuMzM1N0MxOS41Mjk1IDI1Ljc2OTUgMTguNjgzNyAyNi4xMzgyIDE3LjgzNzggMjYuNDIwMUMxNi45OTIgMjYuNzAyIDE2LjEwMjggMjYuODk3MiAxNS4yMTM3IDI3LjAwNTdDMTQuMzI0NSAyNy4xMTQxIDEzLjQzNTMgMjcuMTU3NSAxMi41MjQ0IDI3LjA5MjRDMTEuNjEzNSAyNy4wMjczIDEwLjcyNDMgMjYuODc1NSA5Ljg1Njg0IDI2LjY1ODdMOS42NjE2NSAyNy4zNzQzTDguNzcyNDYgMzAuOTk2MkM5LjkwMDIxIDMxLjI5OTggMTEuMDQ5NyAzMS40NzMzIDEyLjIyMDggMzEuNTZDMTIuMjY0MiAzMS41NiAxMi4zMjkyIDMxLjU2IDEyLjM3MjYgMzEuNTZDMTMuNTAwMyAzMS42MjUxIDE0LjY0OTggMzEuNTgxNyAxNS43NTU4IDMxLjQ1MTZDMTYuOTI3IDMxLjI5OTggMTguMDk4MSAzMS4wMzk1IDE5LjIyNTggMzAuNjcwOEMyMC4zNTM2IDMwLjMwMjIgMjEuNDU5NyAyOS44MjUgMjIuNTAwNyAyOS4yMzk1QzIzLjU2MzQgMjguNjUzOSAyNC41NjEgMjcuOTM4MiAyNS40OTM1IDI3LjE1NzVDMjYuNDQ3OCAyNi4zNTUgMjcuMzE1MyAyNS40NDQyIDI4LjA3NDQgMjQuNDQ2NUMyOC4xODI4IDI0LjMxNjQgMjguMjY5NSAyNC4xNjQ2IDI4LjM3OCAyNC4wMTI4TDI0Ljc3NzkgMjEuMzQ1MkMyNC42Njk0IDIxLjQ1MzcgMjQuNjA0NCAyMS41ODM4IDI0LjUxNzYgMjEuNjkyMloiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPg==&labelColor=343CED)

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

## Releasing

To release a new version:

```bash
npm run release -- patch   # 0.6.0 → 0.6.1
npm run release -- minor   # 0.6.0 → 0.7.0
npm run release -- major   # 0.6.0 → 1.0.0
```

This will:
1. Bump version in `package.json`, `.claude-plugin/marketplace.json`, and `plugins/glean/.claude-plugin/plugin.json`
2. Create a commit and git tag
3. Push to the remote repository

Preview changes without executing:
```bash
npm run release -- --dry-run
```

## Support

- [Glean MCP Documentation](https://docs.glean.com/mcp)
- [Glean Support](https://help.glean.com)
- [GitHub Issues](https://github.com/gleanwork/claude-plugins/issues)

## License

MIT License - see [LICENSE](LICENSE) for details.
