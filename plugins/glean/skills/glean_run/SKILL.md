---
name: glean_run
description: Discover and run Glean skills for enterprise app tasks
argument-hint: <task description>
allowed-tools:
  - Read(path="//**/glean-skills-cache/**")
---

# Glean Run

Discover and use Glean skills to help with enterprise app tasks (Jira, Slack,
Google Workspace, Salesforce, etc.) or actions you don't already have a tool for.
Where possible, aim to complete the user's request end-to-end rather than just
listing available skills.

## Authentication

Authentication is handled exclusively by the `setup` tool. If any other tool
returns a response containing `[SETUP_REQUIRED]`, the user needs to
(re-)authenticate via `setup`.

When this happens:
1. Call `setup` (no arguments).
   - If no Server URL is configured, `setup` returns `[SETUP_REQUIRED]` with
     instructions. Relay them, ask the user for their work email, then call
     `setup` again with `email` set to what they provided. 
   - Once a Server URL is configured, `setup` opens the Glean sign-in page in
     the browser and waits for sign-in.
2. Once `setup` returns "Glean setup is complete", retry the original tool
   call.

Do not treat `[SETUP_REQUIRED]` as an error or try to work around it any
other way.

## Step 0: Verify Setup

Call `setup` (with no arguments). If the connection isn't ready, `setup`
returns instructions — follow them and call `setup` again; it guides the whole
flow. Once it returns "Glean setup is complete", proceed to Step 1.

## Step 1: Plan tool usage

A small set of popular tools is directly available, and no discovery is
needed to use them. Discover is complementary and recommended if the
direct tools cannot satisfy the user request end to end.

### Calling `find_skills_and_tools`

If no arguments were provided and the task can't be inferred from conversation
context, ask the user what they'd like to do before proceeding.

Call `find_skills_and_tools` with the task descriptions.

Break the request into small, task-atomic queries — keep only the core action,
dropping the surrounding context (recipients, timing, reasons, constraints) —
and pass each as a separate entry in `queries`.

```
find_skills_and_tools({
  queries: [
    "<atomic sub-task 1>",
    "<atomic sub-task 2>"
  ]
})
```

The response is an XML index of discovered skills with file paths.

You can call `find_skills_and_tools` multiple times — e.g. to discover skills for
individual sub-tasks as you work through a broad request.

## Step 2: Read Skill Instructions

Browse the returned skills and select the one most relevant to the user's
request. Read its `SKILL.md` file for detailed instructions. Skills typically
contain guidance on how to use their tools, but the tools can also be called
as independent units.

## Step 3: Read Tool Schemas

Read each tool's JSON file (e.g. `tools/TOOL_NAME.json`) to get the exact
`server_id`, `name`, and `inputSchema` with parameter names and types.

**Never guess parameter names** - always read the tool JSON file first.

## Step 4: Execute Tools

Call `run_tool` with the `server_id`, `tool_name` (from the `name` field in the
JSON), and `arguments` matching the `inputSchema` exactly.

```
run_tool({
  server_id: "composio/jira-pack",
  tool_name: "jirasearch",
  arguments: { query: "project = PROJ AND status = Open" }
})
```

### Long-form arguments via `file_args`

For long-form content — drafted Slack messages, Confluence pages, doc
bodies, etc. — write the draft to a local file first, then reference it
via `file_args` instead of passing it as a huge inline string. The plugin
reads each file and substitutes its UTF-8 contents into the named key in
`arguments` before calling the remote tool.

```
run_tool({
  server_id: "...",
  tool_name: "slack_post_message",
  arguments: { channel: "C123" },
  file_args: { text: "/tmp/glean-drafts/announce.md" }
})
```

Constraints:
- Paths must be absolute.
- A key in `file_args` must not also appear in `arguments`.
- Each file must be ≤ 5 MB (override via `GLEAN_FILE_ARG_MAX_BYTES`).

## Rules

- Always read tool JSON files before calling `run_tool` - never guess parameters
- If discovery returns no relevant skills, tell the user what was searched
