---
name: meeting-context
description: Use when the user asks about meetings, meeting history, decisions made in meetings, action items from discussions, or what was discussed. Triggers on phrases like "what was decided", "meeting about", "action items from", "what happened in the meeting", "meeting notes", "transcript", "who attended", or when needing context from past conversations and discussions.
---

# Meeting Context via Glean

When users need information from meetings - past discussions, decisions, action items, or transcripts - use Glean's meeting lookup.

## Tool Naming

See the `glean-tools-guide` skill for Glean MCP tool naming conventions. Tools follow the pattern `mcp__glean_[server-name]__[tool]` where the server name is dynamic. Use whatever Glean server is available in your tool list.

## When This Applies

Use this approach when users ask:
- "What was decided in the [topic] meeting?"
- "What action items came out of [meeting]?"
- "When did we discuss [topic]?"
- "What meetings did I miss [time period]?"
- "Who attended [meeting]?"
- "What was said about [topic] in recent meetings?"

## Primary Tool

Use the Glean `meeting_lookup` tool with natural language queries.

## Query Syntax

**Important**: meeting_lookup works best with natural language queries. Date filter syntax does NOT work reliably.

```
# By topic and time (natural language)
meeting_lookup "quarterly planning last week"

# With specific participants
meeting_lookup "standup with John Smith"
meeting_lookup "participants:\"John Smith\" topic:\"standup\""

# Get transcript content
meeting_lookup "team sync last week extract_transcript:\"true\""

# Today's meetings
meeting_lookup "my meetings today"

# Past week
meeting_lookup "meetings past week"
```

## Date Filtering

**Use natural language for dates:**
- "last week", "past 2 weeks", "yesterday", "today", "tomorrow"
- "meetings since Monday", "standups this month"

**Inline date filters do NOT work reliably:**
- `after:now-1w` - Date math is ignored
- `after:YYYY-MM-DD` - ISO dates return no results
- `after:yesterday` - Simple keywords don't work as filter values

**Filters that do work:**
- `participants:"name"` - Filter by attendees
- `topic:"subject"` - Filter by meeting topic
- `extract_transcript:"true"` - Include transcript content

## When to Extract Transcripts

Add `extract_transcript:"true"` when you need:
- Specific quotes or statements
- Detailed discussion content
- Action item context
- Decision rationale

Skip transcripts for:
- Just listing meetings
- Checking attendees
- Quick time/date lookup

## What to Extract from Meetings

When analyzing meeting content, focus on:
1. **Decisions made** - What was agreed? By whom?
2. **Action items** - Tasks assigned, owners, deadlines
3. **Open questions** - Unresolved items
4. **Key discussion points** - Important debates or context

## Relationship to Commands

For comprehensive meeting workflows, suggest:
- `/glean:meeting-prep <meeting>` - Prepare for an upcoming meeting
- `/glean:catch-up <period>` - Catch up on missed meetings and more
