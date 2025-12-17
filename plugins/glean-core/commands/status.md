---
description: Check Glean MCP server connection status
allowed-tools: [Bash]
---

# Glean Connection Status

Check the status of configured Glean MCP servers.

## Steps

### 1. List Configured MCP Servers

Run:
```bash
claude mcp list
```

### 2. Analyze Results

Look for any servers with URLs matching `glean.com/mcp` in the output.

### 3. Report Status

**If Glean servers are found:**
- List each Glean server by name
- Show the URL for each
- Confirm they are configured for HTTP transport

**If no Glean servers are found:**
- Inform the user that no Glean MCP servers are configured
- Suggest running `/glean-core:mcp-setup` to configure one
- Provide a brief explanation of what Glean MCP enables

### 4. Test Connectivity (Optional)

If the user wants to verify the connection is working, suggest they try a simple search. Remind them that on first use, they'll be prompted to authenticate via OAuth.

## Example Output Format

```
Glean MCP Status:

Configured Servers:
  - glean: https://acme-be.glean.com/mcp/default (http)
  - glean-code: https://acme-be.glean.com/mcp/code-search (http)

Status: Ready (authentication will be prompted on first use)
```

Or if none configured:

```
Glean MCP Status:

No Glean MCP servers configured.

Run /glean-core:mcp-setup to configure a Glean MCP server.
```
