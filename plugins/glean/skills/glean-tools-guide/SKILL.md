---
name: glean-tools-guide
description: Use when Glean MCP tools are available and you need guidance on which tool to use, how to format queries, or best practices for enterprise search. This skill provides tool selection logic and query optimization for Glean integrations. Auto-triggers when mcp__glean tools are being considered.
---

# Glean Tools Selection Guide

This skill provides guidance on selecting and using Glean MCP tools effectively.

## Skills vs Agents vs Commands

This plugin uses three component types:
- **Skills** (like this one): Auto-triggered guidance that helps Claude select the right tools
- **Agents** (e.g., `enterprise-searcher`): Autonomous workers spawned for complex multi-step tasks
- **Commands** (e.g., `/glean:search`): User-triggered structured workflows

Skills provide knowledge; agents do work; commands orchestrate workflows.

## Tool Naming Convention

Glean MCP tools follow the pattern:
```
mcp__glean_[server-name]__[tool]
```

Where `[server-name]` is dynamic and configured per user (e.g., `default`, `production`, `acme`). The tool suffix is always consistent. When invoking tools, use whatever Glean server is available in your tool list.

## Available Tools Overview

| Tool Suffix | Purpose | Use When |
|-------------|---------|----------|
| `search` | Document discovery | Finding docs, wikis, policies, specs |
| `employee_search` | People lookup | Finding people, org chart, teams |
| `meeting_lookup` | Meeting search | Finding meetings, transcripts, decisions |
| `gmail_search` | Email search | Finding emails, attachments |
| `code_search` | Code discovery | Finding internal code, commits |
| `user_activity` | Activity feed | Finding your recent actions and interactions |
| `read_document` | Full content | Reading complete document by URL |
| `chat` | AI synthesis | Complex analysis across sources |

## Tool Selection Decision Tree

```
User question about...
├── People, "who", org chart → employee_search
├── Meetings, decisions, action items → meeting_lookup
├── Emails, attachments → gmail_search
├── Internal code, commits → code_search
├── "My activity", "what have I done", recent actions → user_activity
├── Documents, policies, specs → search
├── Need full document content → read_document (with URL)
└── Complex multi-source analysis → chat
```

## Critical Rules

### 1. Never Use Regular Search for People
```
# WRONG
search "John Smith"

# CORRECT
employee_search "John Smith"
```

### 2. Search → Read Workflow
When users need document details:
1. First: `search` to find documents
2. Then: `read_document` with URL from results

### 3. Use Chat for Synthesis
When the question requires reasoning across multiple sources:
```
chat "What are our authentication best practices based on recent RFCs and security policies?"
```

## Query Filter Reference

### Document Search Filters (search)

**Person Filters:**
- `owner:"person name"` or `owner:me` - Filter by document creator/modifier
- `from:"person name"` or `from:me` - Filter by user who created/modified/commented

**Date Filters:**
- `updated:today|yesterday|past_week|past_month|past_year` - Filter by update date
- `updated:"March"|"January"` - Filter by month name
- `after:"YYYY-MM-DD"` - Documents created after date (no future dates)
- `before:"YYYY-MM-DD"` - Documents created before date

**Source Filters:**
- `app:confluence|github|drive|slack|jira` - Filter by application/datasource
- `channel:"channel-name"` - Slack channel (only when explicitly requested)
- `type:pdf|document|presentation` - Filter by document type

**Result Control:**
- `num_results:N` - Specify number (use exact number or `max` for exhaustive lists)

### Code Search Filters (code_search)

**Person Filters:**
- `owner:"person name"` or `owner:me` - Filter by commit creator
- `from:"person name"` or `from:me` - Filter by code file/commit updater

**Date Filters:**
- `updated:today|yesterday|past_week|past_month|past_year` - Filter by update date
- `after:"YYYY-MM-DD"` - Commits/files changed after date
- `before:"YYYY-MM-DD"` - Commits/files changed before date

**Repository Filters:**
- `repo:platform|frontend|backend` - Filter by repository name
- `path:services/auth|components/ui` - Filter by file path
- `lang:go|python|javascript|typescript` - Filter by programming language

### Employee Search Filters (employee_search)

- `reportsto:"manager name"` - Find direct reports (NOT for finding who someone reports to)
- `startafter:YYYY-MM-DD` - People who started after date
- `startbefore:YYYY-MM-DD` - People who started before date
- `roletype:"individual contributor"|"manager"` - Filter by role type
- `sortby:hire_date_ascending|hire_date_descending|most_reports` - Sort results

### Meeting Lookup Filters (meeting_lookup)

- `participants:"name"` - Filter by attendees
- `topic:"subject"` - Filter by meeting subject/title
- `after:today|now-1w|YYYY-MM-DD` - Meetings after date
- `before:now|tomorrow+1d|YYYY-MM-DD` - Meetings before date
- `extract_transcript:"true"` - Include meeting content/transcript

**Date math:** `now-1w`, `today-1d`, `yesterday+1M` (no spaces, use d/w/M/y)

### Gmail Search Filters (gmail_search)

- `from:"person"|"email@domain.com"|"me"` - Filter by sender
- `to:"person"|"email@domain.com"|"me"` - Filter by recipient
- `subject:"text"` - Filter by subject line
- `has:attachment|document|spreadsheet|presentation` - Filter by attachment type
- `is:important|starred|read|unread|snoozed` - Filter by email status
- `label:INBOX|SENT|TRASH|DRAFT|SPAM` - Filter by folder/label
- `after:YYYY-MM-DD` / `before:YYYY-MM-DD` - Date range

### User Activity Parameters (user_activity)

The `user_activity` tool uses date range parameters (not query filters):
- `start_date` - Start date in YYYY-MM-DD format (inclusive, required)
- `end_date` - End date in YYYY-MM-DD format (exclusive, required)

Use for: standup notes, weekly summaries, 1:1 prep, finding documents you touched but forgot.

## Filter Best Practices

**When to Use Date Filters:**
- Use `updated:` for relative timeframes ("last week", "past month")
- Use `after:`/`before:` for date ranges ("between Jan and March", "since 2024")
- Avoid date filters for "latest" or "recent" without specific timeframe

**Person Filter Guidelines:**
- Use quotes for multi-word names: `from:"John Smith"`
- Use `owner:` for document creators, `from:` for broader involvement
- Use `me` when user refers to themselves

**Search Strategy:**
- Start broad, then narrow with filters if too many results
- Combine filters strategically: person + timeframe + source
- Use `num_results:` for exhaustive searches ("all", "each", "every")

**Common Pitfalls:**
- Don't use `after:` with future dates
- Channel filters only work for Slack (`channel:` + `app:slack`)
- Code search `repo:` and `path:` filters need exact matches
- Quote multi-word filter values: `channel:"platform-alerts"`

## Best Practices

1. **Cite sources**: Always include URLs so users can verify
2. **Start broad, then narrow**: Use filters to refine if too many results
3. **Combine signals**: For expertise, check code + docs + meetings
4. **Respect permissions**: Results are filtered by user access
5. **Note when empty**: No results is useful information

## Related Commands

Point users to structured workflows when appropriate:
- `/glean:search` - Quick search
- `/glean:find-expert` - Expertise discovery
- `/glean:catch-up` - Return from time off
- `/glean:meeting-prep` - Meeting preparation
- `/glean:stakeholders` - Stakeholder mapping
- `/glean:onboarding` - Team onboarding
- `/glean:verify-rfc` - Spec verification
