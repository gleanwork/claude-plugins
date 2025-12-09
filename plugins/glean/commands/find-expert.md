---
description: Find someone who truly knows about a topic based on actual activity and contributions
argument-hint: Topic or technology (e.g., "Kubernetes", "billing system")
---

# Find Expert

You are helping someone find people who *actually* know about a topic - not just by org chart, but by real contributions and activity.

## Core Principles

- **Activity over title**: Someone actively contributing beats someone nominally responsible
- **Multiple signals**: Code + docs + discussions = true expertise
- **Use TodoWrite**: Track progress throughout

---

## Phase 1: Understand the Query

**Goal**: Clarify what expertise is needed

Input: $ARGUMENTS

**Actions**:
1. Create todo list with all phases
2. If topic is vague, ask:
   - "Are you looking for someone to answer questions, review code, or make decisions?"
   - "Is this about a specific system/component or a general technology?"

---

## Phase 2: Gather Expertise Signals

**Goal**: Find people with multiple evidence of expertise

**Actions**:
1. Start with Glean chat for a synthesized answer:
   ```
   chat "Who are the experts on [topic] at our company? Consider code contributions, documentation authorship, and meeting participation."
   ```

2. Gather additional signals with direct searches:
   ```
   employee_search "[topic]"
   code_search "[topic] contributors"
   search "[topic] RFC OR design doc"
   ```

3. Cross-reference to find people appearing in multiple sources

---

## Phase 3: Cross-Reference and Rank

**Goal**: Identify people with strongest expertise signals

**Actions**:
1. For each person found, count signals:
   - Code contributions (weight: high)
   - Documentation authorship (weight: high)
   - Meeting participation (weight: medium)
   - Official role (weight: medium)

2. People with multiple signals rank higher
3. Note if expert has moved teams but retains knowledge

---

## Phase 4: Generate Expertise Report

**Goal**: Present ranked experts with contact info

**Actions**:
1. Mark all todos complete
2. Present the report:

```markdown
# Expert Finder: [Topic]

## Top Experts

### 1. [Name] - [Current Role]
**Expertise Signals:**
- [Signal 1 with evidence]
- [Signal 2 with evidence]

**Why they're a good fit:** [Specific evidence]
**Contact:** [email/Slack]

---

### 2. [Name] - [Current Role]
**Expertise Signals:**
- [Signal 1]
- [Signal 2]

**Why they're a good fit:** [Specific evidence]

---

### 3. [Name] - [Current Role]
[Same structure]

---

## Also Consider

### By Official Role
- **[Team]**: Officially owns this area
- **[Person]**: Team lead for [related team]

### Historical Experts
- **[Name]**: Original architect (now on [other team])

## How to Engage

### For Quick Questions
Try [Person] in Slack - responsive on this topic

### For Deep Dives
Set up time with [Person] - has historical context

### For Official Decisions
Loop in [Person] - has sign-off authority
```

---
