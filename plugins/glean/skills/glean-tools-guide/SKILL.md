---
name: glean-tools-guide
description: Use when Glean MCP tools are available and you need guidance on which tool to use, how to format queries, or best practices for enterprise search. This skill provides tool selection logic and query optimization for Glean integrations. Auto-triggers when mcp__glean tools are being considered.
---

# Glean Tools Selection Guide

This skill provides guidance on selecting and using Glean MCP tools effectively.

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
| `read_document` | Full content | Reading complete document by URL |
| `chat` | AI synthesis | Complex analysis across sources |

## Tool Selection Decision Tree

```
User question about...
├── People, "who", org chart → employee_search
├── Meetings, decisions, action items → meeting_lookup
├── Emails, attachments → gmail_search
├── Internal code, commits → code_search
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

### Common Filters (most tools)
- `owner:"name"` - Created by person
- `from:"name"` - Updated/commented by person
- `updated:past_week` - Recent updates
- `after:YYYY-MM-DD` - After date
- `before:YYYY-MM-DD` - Before date

### Employee-Specific Filters
- `reportsto:"manager"` - Direct reports
- `startafter:YYYY-MM-DD` - Hired after date
- `roletype:"manager"` - By role type

### Meeting-Specific Filters
- `participants:"name"` - Attendees
- `topic:"subject"` - Meeting subject
- `extract_transcript:"true"` - Include content

### Gmail-Specific Filters
- `to:"recipient"` - Sent to
- `has:attachment` - Has attachments
- `label:INBOX` - By folder
- `is:unread` - By status

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
