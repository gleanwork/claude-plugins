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

## What's included

### Skills

- **`find-expert`** — Auto-triggers on "who knows about", "expert on", "go-to person for", "who has worked on". Invokable as `/glean-people:find-expert <topic>`.
- **`stakeholders`** — Auto-triggers on "who needs to know", "stakeholders for", "who should I loop in", "who needs to approve". Invokable as `/glean-people:stakeholders <change>`.

### Agent

- **people-finder** — Finds people by role, expertise, activity, or organizational relationships.

## Example usage

```bash
# Find experts
/glean-people:find-expert Kubernetes
/glean-people:find-expert billing system

# Identify stakeholders
/glean-people:stakeholders migrating auth to OAuth
/glean-people:stakeholders deprecating the legacy API

# Skills auto-trigger on natural-language asks
"Who works on the payments team?"
"Who should I talk to about the billing module?"
```

## How it works

The skills combine multiple signals to find the right people:
- **Employee search** — official roles and org structure
- **Code contributions** — who's actively coding in an area
- **Document authorship** — who wrote the design docs
- **Meeting participation** — who's in relevant discussions

## Support

- Documentation: https://docs.glean.com/mcp
- Issues: https://github.com/gleanwork/claude-plugins/issues
