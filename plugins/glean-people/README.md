# Glean People

**Find experts, understand org structure, and identify stakeholders.**

Discover the right people based on expertise, activity, or organizational context.

## Prerequisites

Requires [glean-core](../glean-core) to be installed first.

## Installation

```bash
claude plugin install glean-core   # if not already installed
claude plugin install glean-people
```

## What's Included

### Agent
- **people-finder** - Finds people by role, expertise, activity, or organizational relationships

### Commands
- `/glean-people:find-expert <topic>` - Find domain experts based on actual activity
- `/glean-people:stakeholders <change>` - Identify stakeholders for a change or project

## Example Usage

```bash
# Find experts
/glean-people:find-expert Kubernetes
/glean-people:find-expert billing system

# Identify stakeholders
/glean-people:stakeholders migrating auth to OAuth
/glean-people:stakeholders deprecating the legacy API

# The people-finder agent is automatically triggered
"Who works on the payments team?"
"Who should I talk to about the billing module?"
```

## How It Works

This plugin combines multiple signals to find the right people:
- **Employee search** - Official roles and org structure
- **Code contributions** - Who's actively coding in an area
- **Document authorship** - Who wrote the design docs
- **Meeting participation** - Who's in relevant discussions

## Support

- Documentation: https://docs.glean.com/mcp
- Issues: https://github.com/gleanwork/claude-plugins/issues
