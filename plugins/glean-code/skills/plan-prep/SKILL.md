---
name: plan-prep
description: Use when the user wants to prepare for plan mode by gathering enterprise context. Triggers on "plan with glean", "prep for plan", "research before planning", "plan prep", or when starting strategic/architectural planning work.
---

# Planning Preparation via Glean

When users need to enter plan mode but want enterprise context first, use Glean to research design docs, similar implementations, stakeholders, and related systems.

## When This Applies

Use plan prep when users:
- Want to research before entering plan mode
- Are planning architectural or strategic changes
- Need to understand related systems before designing
- Want to identify stakeholders and code owners early
- Phrase it as: "plan with glean", "prep for plan", "research before planning", "plan prep"

## BE SKEPTICAL

Filter aggressively for relevant, current information.

**Freshness Test**
- ✅ CURRENT: Updated in past 6 months
- ⚠️ AGING: 6-12 months old
- ❌ STALE: 12+ months old

**Relevance Test**
- ✅ RELEVANT: Directly applies to the planned work
- ⚠️ RELATED: Similar context but different use case
- ❌ TANGENTIAL: Keyword match only

**Authority Test**
- ✅ OFFICIAL: Approved RFCs, design docs, official docs
- ⚠️ INFORMAL: Team wiki, notes
- ❌ OUTDATED: Rejected proposals, abandoned work

**Quality over quantity**: 3-4 high-quality findings beat 10 weak ones.

## Key Differentiator

**Local tools only see your current repo.** The plan-prep workflow searches your entire organization for:
- Design docs and architectural decisions
- Similar implementations and code patterns
- Code owners and stakeholders
- Related systems and dependencies

This gives you enterprise context for better planning decisions.

## Tool Selection

| Research Need | Glean Tool |
|---------------|-----------|
| Find design docs, RFCs, architecture | `search` |
| Find similar code implementations | `code_search` |
| Find code owners and stakeholders | `code_search` + `employee_search` |
| Find related/dependent systems | `code_search` |
| Read full document content | `read_document` |

## Workflow: Plan Preparation

1. **Design & Architecture Research**: `search "[task] architecture OR design doc OR RFC"`
2. **Code Patterns & Implementations**: `code_search "[related components]"` for similar solutions
3. **Stakeholders & Owners**: `code_search "[relevant systems] updated:past_month"` + `employee_search`
4. **Related Systems**: `code_search` for upstream/downstream components
5. **Synthesize Findings**: Organize by category, vet for relevance
6. **Present Summary**: Clear sources and citations for verification

## Output Format

The plan-prep command returns structured research organized as:

- **Design & Architecture**: RFCs, design decisions, architectural patterns
- **Implementations & Patterns**: Code examples, similar solutions, proven approaches
- **Stakeholders & Ownership**: Key people, teams, code owners
- **Related Systems**: Upstream/downstream dependencies and integrations
- **Key Insights**: Synthesized findings and critical context

All with clear source citations so you can verify and dig deeper.

## Next Steps

After reviewing the research:
- User can enter plan mode with fresh enterprise context
- Plan generation is informed by organizational knowledge
- Better architectural decisions from cross-repo visibility
- All sources cited for verification

## Relationship to Commands

Use `/glean-code:plan-prep <task description>` to start the planning preparation workflow.

## Related Commands

- `/glean-code:codebase-context [system]` - Get architectural context about a specific system
- `/glean-code:code-owners [component]` - Identify code owners and maintainers
- `/glean-code:similar-code [pattern]` - Find similar implementations across repos
- `/glean-code:find-examples [API/pattern]` - Find usage examples
