# Meeting Patterns Reference

Advanced meeting lookup patterns for complex scenarios.

## Date Range Patterns

### Specific Time Windows

**This week (Monday to now):**
```
meeting_lookup "after:now-1w before:now"
```

**Last month:**
```
meeting_lookup "after:now-1M before:now"
```

**Specific quarter (Q1 2024):**
```
meeting_lookup "after:2023-12-31 before:2024-04-01"
```

### Working with "Today"

**All of today (including past and upcoming):**
```
meeting_lookup "after:yesterday before:tomorrow"
```

**Rest of today (from now forward):**
```
meeting_lookup "after:now before:tomorrow"
```

**This morning only (approximate):**
```
meeting_lookup "after:yesterday before:now"
```

## Participant Patterns

### Finding Meetings with Specific People

**With one person:**
```
meeting_lookup "participants:\"John Smith\" after:now-2w before:now"
```

**With multiple people (AND logic):**
```
meeting_lookup "participants:\"John Smith\" participants:\"Jane Doe\" after:now-1M before:now"
```

### Team Meetings

**Find regular team syncs:**
```
meeting_lookup "topic:\"[team name] sync\" after:now-1M before:now"
```

**1:1s with a specific person:**
```
meeting_lookup "participants:\"John Smith\" topic:\"1:1\" after:now-1M before:now"
```

## Topic-Based Patterns

### Recurring Meeting Types

**All standups:**
```
meeting_lookup "topic:\"standup\" after:now-2w before:now"
```

**Sprint planning:**
```
meeting_lookup "topic:\"sprint planning\" after:now-1M before:now"
```

**Retrospectives:**
```
meeting_lookup "topic:\"retro\" after:now-1M before:now"
```

### Project-Specific Meetings

**All meetings for a project:**
```
meeting_lookup "topic:\"[project name]\" after:now-1M before:now extract_transcript:\"true\""
```

## Transcript Analysis Patterns

### Decision Tracking

When looking for decisions, search transcripts for:
- "We decided..."
- "Let's go with..."
- "The plan is..."
- "Action item:"

**Query with transcript:**
```
meeting_lookup "topic:\"[project]\" after:now-2w before:now extract_transcript:\"true\""
```

Then analyze the transcript text for decision language.

### Action Item Extraction

Common action item patterns in transcripts:
- "[Name] will..."
- "TODO:"
- "Action:"
- "By [date]..."
- "Follow up on..."

### Meeting Summary Generation

For generating meeting summaries:

1. **Get the transcript:**
   ```
   meeting_lookup "after:[date] before:[date+1d] topic:\"[meeting]\" extract_transcript:\"true\""
   ```

2. **Structure the summary:**
   - Attendees
   - Topics discussed
   - Decisions made
   - Action items
   - Next steps

## Preparation Patterns

### Before a Recurring Meeting

1. **Find last 3 instances:**
   ```
   meeting_lookup "topic:\"[meeting name]\" after:now-3M before:now extract_transcript:\"true\""
   ```

2. **Find related docs updated since last meeting:**
   ```
   search "[topic] updated:past_[time since last meeting]"
   ```

### Before a First-Time Meeting

1. **Find the organizer:**
   ```
   employee_search "[organizer name]"
   ```

2. **Find related previous meetings:**
   ```
   meeting_lookup "participants:\"[organizer]\" topic:\"[likely topic]\" after:now-1M before:now"
   ```

3. **Search for context documents:**
   ```
   search "[meeting topic] app:confluence"
   ```

## Edge Cases

### No Results?

If a meeting query returns nothing:
1. **Expand the date range** - Maybe it was longer ago
2. **Simplify the topic** - Use fewer keywords
3. **Try participant filter** - Search by who was there
4. **Check date buffer** - Remember non-inclusive ranges

### Too Many Results?

If a query returns too many meetings:
1. **Add date constraints** - Narrow the time window
2. **Add topic filter** - Be more specific
3. **Add participant** - Filter by attendee
