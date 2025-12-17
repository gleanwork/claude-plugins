# Glean Meetings

**Meeting intelligence - analyze transcripts, prepare for meetings, and catch up after time off.**

Get more value from your meetings with AI-powered analysis.

## Prerequisites

Requires [glean-core](../glean-core) to be installed first.

## Installation

```bash
claude plugin install glean-core     # if not already installed
claude plugin install glean-meetings
```

## What's Included

### Agent
- **meeting-analyzer** - Extracts decisions, action items, and key discussion points from meetings

### Commands
- `/glean-meetings:meeting-prep <meeting>` - Prepare for an upcoming meeting with context and talking points
- `/glean-meetings:catch-up <time period>` - Catch up on what you missed while away

## Example Usage

```bash
# Prepare for meetings
/glean-meetings:meeting-prep 1:1 with Sarah
/glean-meetings:meeting-prep quarterly planning

# Catch up after time off
/glean-meetings:catch-up last week
/glean-meetings:catch-up since Monday

# The meeting-analyzer agent is automatically triggered
"What was decided in yesterday's standup?"
"What action items came out of the design review?"
```

## Features

- **Meeting Prep** - Get context, attendee info, and suggested talking points
- **Catch-Up** - Summarize what happened while you were away
- **Decision Extraction** - Find decisions made in meetings
- **Action Items** - Track commitments and follow-ups

## Support

- Documentation: https://docs.glean.com/mcp
- Issues: https://github.com/gleanwork/claude-plugins/issues
