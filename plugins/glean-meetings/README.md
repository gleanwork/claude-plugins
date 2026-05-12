# Glean Meetings

**Meeting intelligence — analyze transcripts, prepare for meetings, and catch up after time off.**

Get more value from your meetings with AI-powered analysis.

## Prerequisites

Requires [glean-core](../glean-core) to be installed first.

## Installation

```bash
claude plugin install glean-core     # if not already installed
claude plugin install glean-meetings
```

## What's included

### Skills

- **`meeting-prep`** — Auto-triggers on "prep for my meeting", "context for the [meeting]", "1:1 prep with", "what should I know before". Invokable as `/glean-meetings:meeting-prep <meeting>`.
- **`catch-up`** — Auto-triggers on "what did I miss", "catch me up", "I'm back from PTO", "summarize while I was away". Invokable as `/glean-meetings:catch-up <time period>`.

### Agent

- **meeting-analyzer** — Extracts decisions, action items, and key discussion points from meetings.

## Example usage

```bash
# Prepare for meetings
/glean-meetings:meeting-prep 1:1 with Sarah
/glean-meetings:meeting-prep quarterly planning

# Catch up after time off
/glean-meetings:catch-up last week
/glean-meetings:catch-up since Monday

# Skills auto-trigger on natural-language asks
"What was decided in yesterday's standup?"
"What action items came out of the design review?"
```

## Features

- **Meeting prep** — get context, attendee info, and suggested talking points
- **Catch-up** — summarize what happened while you were away
- **Decision extraction** — find decisions made in meetings
- **Action items** — track commitments and follow-ups

## Support

- Documentation: https://docs.glean.com/mcp
- Issues: https://github.com/gleanwork/claude-plugins/issues
