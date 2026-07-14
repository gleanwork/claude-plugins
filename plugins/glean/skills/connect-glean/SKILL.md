---
name: connect-glean
description: Help the user connect a Glean MCP server so the Glean skills have tools to call — use when setting up Glean for the first time, adding another Glean server, checking whether Glean is connected, or troubleshooting missing Glean tools. Trigger phrases include "set up Glean", "connect Glean", "configure Glean MCP", "add a Glean server", "is Glean connected", "check Glean status", "Glean isn't working", "no Glean tools", "the Glean tools aren't showing up", "I installed the Glean plugin but nothing happens". Don't use it for actual enterprise queries once connected (use the using-glean skill); this skill only sets up and verifies the connection.
---

# Connect Glean

The Glean plugin ships skills but **does not bundle an MCP server** — the skills
call whatever Glean MCP tools the host exposes. If no Glean MCP server is
connected, the skills have nothing to call. This skill connects one, or verifies
and troubleshoots an existing connection. Follow the section for the user's host.

## When this applies

- **First-time setup** — the Glean plugin is installed but no Glean tools appear.
- **Adding another server** — e.g. a second backend or a code-search server.
- **Status / troubleshooting** — "is Glean connected?", "no Glean tools showing".

## What you need first (all hosts)

Gather these once, then apply them in the host-specific step:

1. **Server URL** — the Glean backend, found at
   <https://app.glean.com/admin/about-glean>. Looks like
   `https://acme-be.glean.com` or `https://be-4f5226e2.glean.com`.
2. **Server name** — organization-specific, from the user's Glean admin. Often
   `default`.
3. **Friendly name** — what to call it in the host. Use `glean` for a single
   server, or `glean-<server-name>` when adding several (e.g. `glean-default`,
   `glean-code`).

The MCP endpoint is always `<server-url>/mcp/<server-name>`. It is a **remote
HTTP** server and uses OAuth — there is no API key to paste. Follow the
host-specific authentication and reload steps below.

## Claude Code

Run:

```bash
claude mcp add <friendly-name> <server-url>/mcp/<server-name> --transport http --scope user
```

Verify with `claude mcp list` (look for a `glean.com/mcp` URL). Restart Claude
Code; authenticate on first use.

## Codex

Run:

```bash
codex mcp add <friendly-name> --url <server-url>/mcp/<server-name>
codex mcp login <friendly-name>
```

Complete the browser OAuth flow, then verify with `codex mcp list` (look for a
`glean.com/mcp` URL). Start a new Codex task so the MCP tools are available.

## Cursor

Add an entry to `~/.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "<friendly-name>": {
      "url": "<server-url>/mcp/<server-name>"
    }
  }
}
```

Restart Cursor; authenticate via OAuth on first use.

## Other hosts

Any MCP-capable host can use Glean: register `<server-url>/mcp/<server-name>` as
a **remote HTTP** MCP server in that host's MCP configuration, then restart and
authenticate on first use. Consult the host's own MCP setup docs for where its
config lives and the exact field names.

## Checking status / troubleshooting "no Glean tools"

If the Glean skills run but report missing tools, the host has no usable Glean
MCP server in the current session or task:

1. Confirm a server is configured: use `claude mcp list` in Claude Code,
   `codex mcp list` in Codex, or inspect the host's MCP config for a
   `glean.com/mcp` URL.
2. If none is configured, run the host setup above.
3. If Codex is configured but not authenticated, run
   `codex mcp login <friendly-name>`, then start a new task.
4. In other hosts, restart the host and trigger OAuth by running any Glean tool
   once.

## Glean developer docs server (separate, optional)

The `glean-dev-docs` plugin uses a **different, public** server — no URL, server
name, or auth needed:

- **Claude Code:**
  `claude mcp add glean-dev-docs https://developers.glean.com/mcp --transport http --scope user`
- **Codex:**
  `codex mcp add glean-dev-docs --url https://developers.glean.com/mcp`, then
  start a new task.
- **Other hosts:** register `https://developers.glean.com/mcp` as a remote HTTP
  MCP server (no OAuth required).

## Related skills

- **using-glean** — once connected, drives enterprise search, Q&A, and synthesis.
