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

---

## Workflows (Recipes)

The plugin provides autonomous agents that combine Glean's cross-source enterprise intelligence with local development context.

### 🔍 PR Review Prep

Get full enterprise context before reviewing a pull request.

```
"Prepare me to review this PR"
"What context do I need for PR #123?"
```

The agent will:
1. Fetch the PR details and diff
2. Find related RFCs and design docs
3. Search Slack discussions about this work
4. Identify stakeholders and downstream impact
5. Surface historical issues in this code area
6. Generate a prep doc with review focus areas

**Uniquely Glean:** Connects code changes to enterprise decisions, discussions, and stakeholders.

---

### 📬 What Did I Miss? (Catch-Up)

Quickly catch up after being away.

```
"What did I miss last week?"
"Catch me up - I was on PTO for 2 weeks"
"What happened while I was out?"
```

The agent will:
1. Synthesize across Slack, meetings, docs, and email
2. Find action items assigned to you
3. Surface decisions affecting your work
4. Identify questions waiting for your input
5. Generate a prioritized catch-up report

**Uniquely Glean:** Cross-source synthesis that no single tool can provide.

---

### ✍️ Help Me Write This RFC

Get research assistance for writing technical proposals.

```
"Help me write an RFC for migrating to OAuth 2.0"
"I need to draft a design doc for the new billing system"
```

The agent will:
1. Find your company's RFC template
2. Analyze similar past RFCs for structure and style
3. Research the current system state
4. Find related discussions and prior decisions
5. Identify stakeholders and reviewers
6. Generate a well-researched draft

**Uniquely Glean:** Grounds your RFC in company history, patterns, and stakeholder knowledge.

---

### 🔬 RFC Verification

Compare a design document to its actual implementation.

```
"Verify this RFC against the implementation"
"Check if we implemented everything in the spec"
[paste RFC URL]
```

The agent will:
1. Fetch and parse the RFC from Glean
2. Extract requirements and specifications
3. Search the local codebase for implementations
4. Generate a completeness report with gaps

**Uniquely Glean:** Bridges enterprise documentation with codebase reality.

---

### 🧠 Expertise Finder

Find who *actually* knows about a topic - not just by title.

```
"Who really knows about Kubernetes at our company?"
"Find an expert on the payment system"
"Who's the go-to person for authentication?"
```

The agent will:
1. Search code contributions in this area
2. Find documentation authors
3. Identify meeting participants and discussion leaders
4. Cross-reference to find true experts (not just titles)
5. Rank by actual activity and engagement

**Uniquely Glean:** Infers expertise from real activity across code, docs, and conversations.

---

### 👥 Stakeholder Discovery

Find who needs to be involved in a change.

```
"Who should I talk to about changing the auth flow?"
"Find stakeholders for the database migration"
```

The agent will:
1. Identify code owners and contributors
2. Find documentation authors
3. Map downstream dependencies
4. Generate a stakeholder engagement plan

---

### 📅 Meeting Prep

Prepare for an upcoming meeting with full context.

```
"Prepare me for my meeting with Sarah"
"Get ready for the quarterly planning meeting"
```

The agent will:
1. Find past instances of this meeting
2. Extract decisions and open action items
3. Gather related recent documents
4. Generate a prep doc with talking points

---

### 🚀 Team Onboarding

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

---

### 🔎 Decision Trail

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

---

## Commands

| Command | Description |
|---------|-------------|
| `/glean-setup` | Configure Glean MCP server connection |
| `/glean-status` | Check connection status |
| `/glean-search <query>` | Quick enterprise search |

---

## What Makes This Uniquely Glean?

Glean provides **cross-source intelligence** that no single tool offers:

| Source | What Glean Sees |
|--------|-----------------|
| **Documents** | Confluence, Notion, Google Docs, SharePoint |
| **Code** | GitHub, GitLab, internal repos |
| **Communication** | Slack, email threads |
| **Meetings** | Calendar, transcripts, recordings |
| **People** | Org structure, teams, activity |

This plugin combines that enterprise context with Claude Code's local development tools to create workflows that bridge **company knowledge** and **your codebase**.

---

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
