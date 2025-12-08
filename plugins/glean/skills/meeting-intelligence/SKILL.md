---
name: Meeting Intelligence
description: This skill should be used when the user asks about "meetings", "meeting notes", "what was discussed", "meeting transcript", "prepare for meeting", "meeting with", "calendar", "what did we decide", "action items from meeting", or needs to find, analyze, or prepare for meetings using Glean's meeting lookup and transcript extraction capabilities.
version: 1.0.0
---

# Meeting Intelligence with Glean

This skill provides guidance for finding meetings, extracting insights from transcripts, and preparing for upcoming meetings.

## Core Tool

- **meeting_lookup** - Search meetings and extract transcripts

## Meeting Search Syntax

### Date Filters

**Relative dates:**
- `after:today` - Upcoming meetings (today forward)
- `before:now` - Past meetings (up to now)
- `after:yesterday` - Yesterday and forward

**Date math (no spaces):**
- `now-1w` - One week ago
- `now-2w` - Two weeks ago
- `today+1d` - Tomorrow
- `yesterday-1d` - Two days ago

Units: `d` (days), `w` (weeks), `M` (months), `y` (years)

**Absolute dates:**
- `after:2024-10-07`
- `before:2024-10-09`

**IMPORTANT - Full Day Coverage:**
Date ranges are non-inclusive. To include all meetings on a specific date, add buffer:
- To get all meetings on Oct 8: `after:2024-10-07 before:2024-10-09`
- NOT `after:2024-10-08 before:2024-10-09` (returns nothing)

### Other Filters

- `participants:"John Smith"` - Meetings with specific attendee
- `topic:"standup"` - Meetings with subject containing text
- `extract_transcript:"true"` - Include meeting content/transcript

## Common Queries

**Today's meetings:**
```
meeting_lookup "after:yesterday before:tomorrow"
```

**Tomorrow's meetings:**
```
meeting_lookup "after:today before:tomorrow+1d"
```

**Yesterday's meetings:**
```
meeting_lookup "before:today after:yesterday-1d"
```

**Last week's meetings:**
```
meeting_lookup "after:now-1w before:now"
```

**Meetings with a specific person:**
```
meeting_lookup "participants:\"John Smith\" after:now-2w before:now"
```

**Standups from last week:**
```
meeting_lookup "after:now-1w before:now topic:\"standup\""
```

**Get transcript for analysis:**
```
meeting_lookup "participants:\"John Smith\" after:now-1w before:now extract_transcript:\"true\""
```

## Meeting Preparation Workflow

When user wants to prepare for an upcoming meeting:

### Step 1: Find the Upcoming Meeting
```
meeting_lookup "after:now before:tomorrow+1d topic:\"[meeting name]\""
```

### Step 2: Review Previous Instances
```
meeting_lookup "topic:\"[meeting name]\" after:now-1M before:now extract_transcript:\"true\""
```

### Step 3: Search Related Documents
```
search "[topic] updated:past_month"
```

### Step 4: Synthesize Preparation Notes
Combine insights from:
- Previous meeting decisions and action items
- Recent document updates
- Open questions from past discussions

## Transcript Analysis

When analyzing meeting transcripts, extract:

1. **Key Decisions Made**
   - What was decided?
   - Who made the decision?
   - What was the rationale?

2. **Action Items**
   - What needs to be done?
   - Who is responsible?
   - What's the deadline?

3. **Open Questions**
   - What was left unresolved?
   - What needs follow-up?

4. **Discussion Summary**
   - Main topics covered
   - Different viewpoints expressed
   - Consensus reached

## Best Practices

1. **Always add buffer for date ranges** - Non-inclusive boundaries trip people up
2. **Use extract_transcript for analysis** - Without it, you only get metadata
3. **Check multiple past instances** - Look at last 3-4 meetings for recurring topics
4. **Combine with document search** - Meeting discussions often reference docs

## Additional Resources

For extended meeting patterns, see:
- **`references/meeting-patterns.md`** - Complex scenarios and advanced queries
