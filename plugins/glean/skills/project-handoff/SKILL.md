---
name: project-handoff
description: Generate a comprehensive handoff document so someone new can take over a project — current state, key people, essential knowledge, open items, and a first-30-days plan. Use when the user is handing off a project (trigger phrases include "generate a handoff", "hand off this project", "create a handoff doc", "I'm going on PTO / leaving / changing teams and need to document", "help someone take over") rather than a quick status read (use project-awareness for that).
---

# Project Handoff

Generate a comprehensive handoff document so someone new can take over a
project. Gather everything they'd need: current state, the people who matter,
tribal knowledge, open items, and a concrete ramp-up plan.

Determine the project from the user's request. If no project is clear, ask
which project they mean before proceeding.

This is the heavyweight counterpart to the **project-awareness** skill (quick
status reads). Use that one if the user just wants current status.

## Tools

This skill drives the standard Glean MCP tools. If the host exposes the
`project-synthesizer` agent, use it for project research. Otherwise delegate to
a suitable research subagent when subagents are available, or gather the same
material directly. For the param shape and pitfalls of `search`, `chat`,
`meeting_lookup`, and `employee_search`, see the using-glean reference at
`using-glean/reference/`. If no Glean tools are visible, point the user to the
**connect-glean** skill.

## Core Principles

- **Complete context**: include everything needed to take over
- **Actionable items**: clear next steps and open items
- **Tribal knowledge**: capture what's not in docs
- **Be skeptical**: not every doc found is relevant to a handoff
- **Quality over quantity**: focus on what the new owner actually needs

## Phase 1: Gather current context

Understand the project's current state.

1. Ask the user for handoff context:
   - Their role on the project (Owner/Lead, Contributor, Advisor/Stakeholder)
   - What's driving the handoff (new role/team, PTO coverage, reorg, leaving)
2. Use `project-synthesizer` when available; otherwise delegate to a suitable
   research subagent if possible, or gather the material directly. Cover
   documentation, people and their roles, recent meetings and decisions, and
   current status / open items.

## Phase 2: Gather undocumented knowledge

Capture tribal knowledge not in formal docs. Ask the current owner:

- "What's the #1 thing someone taking over needs to know?"
- "What are the biggest risks or gotchas?"
- "What relationships are critical to maintain?"
- "What recurring tasks or ceremonies exist?"
- "What access/permissions are needed?"
- "What decisions are pending?"

## Phase 3: Identify open items

1. Search for open work: `search "[project] TODO OR action item OR blocked OR in progress"`
2. Check recent commitments: `meeting_lookup "[project]"` over the past ~2 weeks (extract transcript)
3. Synthesize: `chat "What are the open action items, pending decisions, and blockers for [project]?"`
4. Categorize: Immediate (1-2 weeks), Upcoming (next month), Future (backlog).

## Phase 4: Vet all content (CRITICAL)

Filter to what's genuinely needed — be skeptical.

**Handoff relevance** — ✅ essential / 📚 reference / ❌ skip (historical, tangential)
**Currency** — ✅ current / ⚠️ aging (note it) / ❌ stale (exclude)
**Actionability** — ✅ action needed / 📋 awareness only / ❌ FYI

For each person: are they still relevant, what's the real relationship, why
would the new owner need them? For each open item: is it actually still open,
is it the new owner's responsibility, what's the real urgency?

## Phase 5: Generate the handoff document

```markdown
# Project Handoff: [Project Name]

**Prepared by**: [Current owner]
**Date**: [Today's date]
**Reason for handoff**: [From Phase 1]

## Content Quality
| Category | Items Found | Included | Reason for Filtering |
|----------|-------------|----------|----------------------|
| Documents | [X] | [Y] | [Z] historical/tangential |
| People | [X] | [Y] | [Z] no longer relevant |
| Open Items | [X] | [Y] | [Z] already resolved |

## Executive Summary
[3-4 paragraphs: what the project is, where it stands, critical context for success, most important next steps]

## Project Overview
### What This Project Is
[Purpose and scope]
### Why It Exists
[Business context, problem being solved]
### Current Status
| Attribute | Value |
|-----------|-------|
| **Phase** | [Planning/In Progress/Launch Prep/etc.] |
| **Health** | [Green/Yellow/Red] - [Why] |
| **% Complete** | [Estimate] |
| **Target Date** | [Date] |

## People & Relationships (Vetted)
### Key Contacts (must maintain these relationships)
| Person | Role | Relationship | How to Engage | Why Critical |
|--------|------|--------------|---------------|--------------|
| [Name] | [Role] | [Critical/Important] | [Best approach] | [Specific reason] |
### Stakeholders to Keep Updated
- [Name/Group] - [What they care about] - [How often]
### Not Included
| Person | Reason |
|--------|--------|
| [Name] | Historical involvement only |

## Essential Knowledge
### The #1 Thing to Know
[Critical context from current owner — from Phase 2]
### Key Decisions Made (that still matter)
| Decision | When | Why | Implications |
|----------|------|-----|--------------|
| [Decision] | [Date] | [Rationale] | [What this means for new owner] |
### Risks & Gotchas
| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| [Risk] | H/M/L | H/M/L | [How to handle] |
### What's Not Documented
[Tribal knowledge that only exists in people's heads]

## Documentation Guide (Vetted)
### Must-Read Docs (in order)
1. **[Doc Title]** ([link]) — why essential, ~[X] min, last updated [date]
### Reference When Needed
- **[Doc Title]** — [when you'd need it]
### Skipped Documents
| Doc | Reason |
|-----|--------|
| [Title] | Historical — superseded by [other doc] |
### Where Things Live
| Resource | Location | Access Needed |
|----------|----------|---------------|
| [Code] | [Repo link] | [Permissions] |

## Open Items (Vetted)
### Immediate (Next 2 Weeks)
| Item | Status | Deadline | What To Do | Notes |
|------|--------|----------|------------|-------|
| [Item] | [Status] | [Date] | [Specific action] | [Context] |
### Pending Decisions
| Decision | Options | Who Decides | Deadline |
|----------|---------|-------------|----------|
| [Decision] | [A, B, C] | [Person] | [Date] |
### Blockers
| Blocker | Impact | Who Can Unblock |
|---------|--------|-----------------|
| [Blocker] | [Impact] | [Person] |

## Operations
### Recurring Tasks
| Task | Frequency | When | How |
|------|-----------|------|-----|
| [Task] | [Weekly/etc.] | [Day/time] | [Instructions] |
### Meetings to Attend
| Meeting | Frequency | Purpose | Your Role |
|---------|-----------|---------|-----------|
| [Meeting] | [Frequency] | [Purpose] | [What to do] |
### Access & Permissions Needed
- [ ] [System/tool] — request from [person/team]

## First 30 Days
### Week 1: Orientation
- [ ] Read essential docs (above)
- [ ] Meet with [key contact]
- [ ] Get access to [systems]
### Week 2: Immersion
- [ ] Take ownership of [first item]
- [ ] Attend [key meeting]
### Week 3-4: Transition
- [ ] Lead [responsibility]
- [ ] Make decision on [pending item]

## Questions?
Contact [current owner] until [date]. After that, [backup person].
```

## Troubleshooting

- **Sparse information**: lean on the Phase 2 tribal-knowledge questions, mark
  gaps clearly, and don't pad with marginally relevant docs.
- **Owner unavailable**: generate from available documentation, mark
  "Needs Input" on sections requiring owner knowledge, and note limitations at
  the top.

## Related Skills

- **project-awareness** — quick status read (lighter weight)
- **onboarding** — get up to speed on a team or area
