---
name: confidence-signals
description: Use when you need to communicate the reliability, freshness, or authority of information from Glean. Triggers when presenting search results, when data might be stale, when sources have different authority levels, when the user should verify information, or when you're uncertain about completeness of results.
---

# Confidence Signals

When presenting information from Glean, communicate the reliability, freshness, and authority of your sources clearly.

## When This Applies

Use these patterns when:
- Presenting search results that may be outdated
- Information comes from sources with different authority levels
- Results are incomplete or may have gaps
- The user should verify before acting
- Multiple sources have conflicting information
- You're making inferences beyond what sources explicitly state

---

## Part 1: Vetting & Filtering (Before Presenting)

**Be skeptical.** Not everything Glean returns should be presented. Better to return 3 high-quality results than 10 unvetted mentions.

### Vetting Criteria

Before including ANY result, evaluate:

**1. Relevance Test**
- Does this actually answer the question, or just contain matching keywords?
- Is this about the same thing or just similar terminology?
- ❌ REJECT: Tangential mentions, keyword coincidences, unrelated contexts

**2. Authority Test**
- 📗 **Official**: RFCs, approved specs, policies, CODEOWNERS → Include
- 📙 **Semi-official**: Team wikis, project docs → Include with note
- 📕 **Informal**: Slack discussions, drafts, personal notes → Include only if no official sources exist
- ❌ REJECT: Clearly superseded or deprecated content

**3. Recency Test**
- ✅ **Current** (<3 months): Include with confidence
- ⚠️ **Aging** (3-12 months): Include with staleness warning
- ❌ **Stale** (12+ months): Only include if no alternatives, with strong warning
- Ask: "Would this still be true today?"

**4. Expertise Test (for people recommendations)**
- Did they actually do significant work, or just mentioned it once?
- Are they still in a relevant role?
- Do multiple signals confirm expertise?
- ❌ REJECT: Single mentions, departed employees, outdated ownership

### "Nothing Found" Is Valid

If vetting eliminates all candidates, say so clearly:

```markdown
No high-quality results found for [topic].

**This could mean:**
- The topic is new or undocumented
- Different terminology is used internally
- Access restrictions limit visibility
- This genuinely doesn't exist

**Suggested next steps:**
- Try alternative terms: [suggestions]
- Ask in [relevant Slack channel]
- Check with [likely team]
```

Never pad results with low-quality matches to avoid saying "nothing found."

---

## Part 2: Confidence Dimensions (When Presenting)

### 1. Freshness

How recently was this information updated?

| Freshness | Indicator | Implication |
|-----------|-----------|-------------|
| Current | Updated within past week | High confidence |
| Recent | Updated within past month | Good confidence |
| Older | Updated 1-6 months ago | Verify if critical |
| Stale | Updated 6+ months ago | Likely outdated |
| Unknown | No update date available | Treat with caution |

**How to express:**
- "As of [date]..."
- "Last updated [timeframe]..."
- "Note: This doc hasn't been updated since [date]"
- Include "(updated [date])" in source citations

### 2. Source Authority

How authoritative is this source?

| Authority | Examples | Confidence |
|-----------|----------|------------|
| Official | RFCs, approved specs, policies | High |
| Semi-official | Team wikis, shared docs | Medium-High |
| Discussion | Slack threads, meeting notes | Medium |
| Personal | Individual docs, drafts | Lower |
| AI-generated | Chat synthesis | Verify claims |

**How to express:**
- "According to the official [doc type]..."
- "From team documentation (may be informal)..."
- "Based on Slack discussion (not formally documented)..."
- "From meeting notes (verify if critical)..."

### 3. Completeness

How complete is this information?

| Completeness | Situation | Action |
|--------------|-----------|--------|
| Comprehensive | Multiple sources confirm | High confidence |
| Partial | Some aspects found, gaps exist | Note gaps |
| Limited | Few results, may miss context | Suggest verification |
| Inference | Synthesized from indirect sources | Clearly state |

**How to express:**
- "Based on comprehensive documentation..."
- "Found partial information - gaps in [area]"
- "Limited results found - suggest checking with [person/team]"
- "Inferred from related documents (not explicitly stated)..."

### 4. Corroboration

Do multiple sources agree?

| Corroboration | Situation | Confidence |
|---------------|-----------|------------|
| Strongly corroborated | 3+ sources agree | Very high |
| Corroborated | 2 sources agree | High |
| Single source | Only one source found | Medium |
| Conflicting | Sources disagree | Note conflict |

**How to express:**
- "Confirmed across multiple sources..."
- "Single source - recommend verification"
- "Note: Sources conflict on this point..."

---

## Signal Templates

### For Search Results

```markdown
**[Title]** ([link])
- Updated: [date] ([freshness assessment])
- Source: [authority level]
- Relevance: [why this matches]
```

### For Synthesized Answers

```markdown
## [Answer]

**Confidence**: [High/Medium/Low]
- Based on [X] sources
- Most recent: [date]
- [Any caveats]

**Sources**:
- [Source 1] - [authority], updated [date]
- [Source 2] - [authority], updated [date]
```

### For Uncertain Information

```markdown
## [Topic]

**What I Found**: [Information]

**Caveats**:
- [ ] Source is [X] months old - verify currency
- [ ] Based on single source - seek corroboration
- [ ] Inferred, not explicitly stated
- [ ] Conflicts with [other source]

**Suggested Verification**: Contact [person] or check [source]
```

### For Conflicts

```markdown
## [Topic] - Conflicting Information

| Aspect | Source A | Source B | Assessment |
|--------|----------|----------|------------|
| [Item] | [Says X] | [Says Y] | [Which is likely correct] |

**Recommendation**: Verify with [authoritative source/person]
```

---

## Common Patterns

### Pattern: Stale Documentation
```
Note: This documentation was last updated [X months ago].
The information may be outdated - verify with [team/person]
if making decisions based on this.
```

### Pattern: Informal Source
```
This comes from [Slack/meeting notes] rather than formal
documentation. Consider documenting this officially if it's
important knowledge to preserve.
```

### Pattern: AI-Synthesized
```
This answer was synthesized by Glean's AI across multiple
sources. For critical decisions, verify the underlying
documents directly: [links]
```

### Pattern: Incomplete Results
```
I found [X] relevant results, but there may be additional
information in [other sources/systems]. This represents
what's accessible through Glean with your current permissions.
```

### Pattern: Strong Confidence
```
This is well-documented with multiple corroborating sources:
- Official spec: [link]
- Recent meeting confirmation: [link]
- Implementation: [link]

High confidence in this answer.
```

---

## When to Emphasize Confidence

Always note confidence when:
- User will make a decision based on the information
- Information is time-sensitive
- Sources are from informal channels
- Only one source was found
- The topic involves policy, security, or compliance
- You're synthesizing rather than directly quoting

## Relationship to Other Skills

This skill works with:
- `synthesis-patterns` - When combining multiple sources
- `glean-tools-guide` - For understanding source types
- `enterprise-search` - When presenting search results
