---
name: synthesis-patterns
description: Use when combining information from multiple Glean sources or when needing to synthesize results across documents, meetings, code, and people searches. Triggers on complex queries that span multiple data types, when results seem contradictory, when building comprehensive answers from partial information, or when the user asks for a complete picture of something that requires multiple queries.
---

# Multi-Source Synthesis Patterns

When answering questions that require information from multiple Glean sources, use these patterns to combine and synthesize effectively.

## When This Applies

Use this approach when:
- A question spans documents, meetings, people, and code
- You need to cross-reference information from different sources
- Results from one source need context from another
- Building a comprehensive answer from partial information
- Sources seem to conflict or overlap

## BE SKEPTICAL

When synthesizing across multiple sources, aggressive vetting is essential:

**Source Quality Test**
- Is each source authoritative?
- ✅ INCLUDE: Official docs, code, recent meetings
- ⚠️ CONTEXT: Secondary sources, somewhat dated
- ❌ EXCLUDE: Hearsay, speculation, very old information

**Recency vs Authority**
- When sources disagree on recency, choose wisely:
- ✅ TRUST: Recent information from official source
- ⚠️ CAUTION: Very recent but unofficial vs stale but official
- ❌ AVOID: Treating old info as current just because it's "official"

**Completeness Check**
- Do you have the full picture?
- ✅ INCLUDE: 3+ sources align, comprehensive coverage
- ⚠️ CONTEXT: Limited sources, note gaps explicitly
- ❌ EXCLUDE: Single source for multi-faceted questions

**Conflict Resolution**
- When sources conflict, don't hide it:
- ✅ INCLUDE: Conflict + explanation of which is likely correct
- ❌ EXCLUDE: Picking one source without acknowledging disagreement

**Filter Out**:
- Unattributed claims
- Information older than 3 months (unless structure/architecture)
- Synthesis that glosses over fundamental disagreements
- "I synthesized this" without showing your work

**Say "I don't know"** when:
- Sources are missing or conflicting
- Information is too stale to be reliable
- You lack sufficient data to synthesize confidently

## The Synthesis Framework

### 1. Identify Information Types Needed

Before querying, determine what types of information are needed:

| Information Type | Glean Tool | Use When |
|------------------|------------|----------|
| Official documentation | `search` | Need authoritative specs, policies |
| Real-time context | `meeting_lookup` | Need recent discussions, decisions |
| People/org structure | `employee_search` | Need ownership, expertise |
| Code evidence | `code_search` | Need implementation truth |
| User's own context | `memory`, `user_activity` | Need personalization |
| AI synthesis | `chat` | Need reasoning across sources |

### 2. Query in Optimal Order

**Recommended order for comprehensive synthesis:**

1. **Start broad with `chat`** - Get AI-synthesized overview
2. **Verify with `search`** - Find authoritative documents
3. **Add recency with `meeting_lookup`** - Get latest discussions
4. **Clarify ownership with `employee_search`** - Identify who to ask
5. **Ground in reality with `code_search`** - What's actually implemented

### 3. Cross-Reference Pattern

When you have results from multiple sources, cross-reference:

```markdown
## Finding: [Topic]

### From Documentation
- [What docs say] - Source: [doc title] ([link])

### From Recent Meetings
- [What was discussed] - Source: [meeting date]

### From Code
- [What's implemented] - Source: [file/repo]

### Synthesis
Based on these sources: [Your synthesized answer]

### Confidence
- Documentation: [Current/Stale/Missing]
- Meeting Context: [Recent/Old/None]
- Code Evidence: [Present/Partial/None]
```

### 4. Handle Conflicts

When sources disagree:

```markdown
## Conflicting Information Detected

| Topic | Source A Says | Source B Says |
|-------|---------------|---------------|
| [Topic] | [Claim from doc] | [Claim from meeting] |

**Most Likely Truth**: [Your assessment based on recency, authority]

**Recommendation**: Verify with [person/source]
```

## Synthesis Patterns by Use Case

### Pattern: "What is X?"

1. `chat` - Get overview
2. `search` - Find official definition
3. `employee_search` - Find owner to verify
4. Synthesize: Combine AI overview + official doc + owner context

### Pattern: "Who should I talk to about X?"

1. `employee_search` - Find by role
2. `code_search` - Find by code activity
3. `search` - Find by doc authorship
4. Synthesize: Rank by multiple signal strength

### Pattern: "What's the status of X?"

1. `chat` - Get current status summary
2. `meeting_lookup` - Find recent discussions
3. `search` - Find tracking docs (Jira, etc.)
4. Synthesize: Combine with recency weighting

### Pattern: "How do we do X?"

1. `search` - Find process docs
2. `code_search` - Find implementation
3. `meeting_lookup` - Find recent changes
4. Synthesize: Doc process + code reality + recent updates

## Output Best Practices

1. **Cite every source** - Include links for all claims
2. **Note recency** - When was this information last updated?
3. **Flag uncertainty** - Be clear about gaps
4. **Suggest verification** - Point to people who can confirm
5. **Acknowledge conflicts** - Don't hide disagreements

## Example Synthesis Output

```markdown
## [Question/Topic]

### Answer
[Direct answer to the question]

### Supporting Evidence

| Source | What It Says | Last Updated |
|--------|--------------|--------------|
| [Doc Title] | [Key info] | [Date] |
| [Meeting] | [Key info] | [Date] |
| [Code/Repo] | [Key info] | [Date] |

### Confidence Assessment
- **Overall Confidence**: [High/Medium/Low]
- **Data Freshness**: [Current/Mostly current/Some stale]
- **Source Agreement**: [Strong/Partial/Conflicting]

### Gaps & Recommendations
- [What's missing or uncertain]
- [Who to verify with if critical]
```

## Relationship to Other Skills

This skill works with:
- `glean-tools-guide` - For tool selection
- `confidence-signals` - For noting data quality
- `enterprise-search` - For document searches
- `meeting-context` - For meeting queries
- `people-lookup` - For people queries
