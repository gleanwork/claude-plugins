---
description: Configure a Glean MCP server connection
allowed-tools: [Bash, AskUserQuestion]
---

# Glean MCP Server Setup

Help the user configure a Glean MCP server for Claude Code. This command can be run multiple times to add multiple servers.

## Setup Flow

Guide the user through these steps interactively using AskUserQuestion:

### Step 1: Get Instance Name

Ask the user for their Glean instance name. Explain that if their Glean URL is `https://acme.glean.com`, their instance name is `acme`.

### Step 2: Get Server Name

Ask the user for the server name they want to connect to. Explain that their Glean administrator should have provided this. Common examples include `default`, but server names are organization-specific.

### Step 3: Get Friendly Name

Ask what friendly name to use for this server in Claude Code. Suggest:
- `glean` if this is their only server
- `glean-[server-name]` if adding multiple (e.g., `glean-default`, `glean-code`)

### Step 4: Configure MCP Server

Once you have all three values, construct and run the command:

```bash
claude mcp add [friendly-name] https://[instance]-be.glean.com/mcp/[server-name] --transport http --scope user
```

### Step 5: Confirm Success

After running the command:
1. Confirm the server was added successfully
2. Remind the user to restart Claude Code to activate the new server
3. Explain that they'll be prompted to authenticate on first use (OAuth)
4. Offer to run `/glean:mcp-setup` again if they want to add another server

## Important Notes

- The URL format is: `https://[instance]-be.glean.com/mcp/[server-name]`
- The `-be` suffix is required (it's the backend endpoint)
- Transport must be `http` (Glean MCP is a remote server)
- Scope should be `user` for personal configuration
- Claude Code handles OAuth authentication automatically on first tool use
