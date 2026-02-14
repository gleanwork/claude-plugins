---
name: code-exploration
description: Use when the user asks about internal code, implementations, patterns across repositories, or needs to understand how something is built. Triggers on "how is X implemented", "where is the code for", "find the implementation of", "what repos contain", "who wrote the code for", or code architecture questions about internal systems.
---

# Cross-Repository Code Exploration via Glean

When users need to understand code across internal repositories—beyond the local codebase—use Glean's code search to explore the entire organization's code.

## Tool Naming

See the `glean-tools-guide` skill for Glean MCP tool naming conventions. Tools follow the pattern `mcp__glean_[server-name]__[tool]` where the server name is dynamic.

## When This Applies

Use Glean code search when users ask about:
- How something is implemented (in other repos)
- Where the code for a system/service lives
- Who has been working on a codebase
- Similar implementations across the org
- Examples of how to use an internal API/library
- Code patterns used by other teams

## BE SKEPTICAL

Not every code result is worth presenting.

**Quality Test**
- Is this good code to reference?
- ✅ GOOD: Clean, tested, actively maintained
- ⚠️ ACCEPTABLE: Works but has caveats
- ❌ POOR: Hacky, deprecated, abandoned

**Recency Test**
- Is this code maintained?
- ✅ ACTIVE: Commits in past 3 months
- ⚠️ SLOWING: 3-12 months since last commit
- ❌ STALE: 12+ months - likely outdated patterns

**Relevance Test**
- Does this actually answer the question?
- ✅ RELEVANT: Directly addresses what was asked
- ⚠️ RELATED: Similar but different context
- ❌ TANGENTIAL: Keyword match only

**Filter Out**:
- Code in `/deprecated/`, `/old/`, `/legacy/` paths
- Abandoned repositories
- Prototype/experimental code
- Code with extensive TODO/FIXME comments

**Quality over quantity**: 3 good examples beat 10 mediocre ones.

## Key Differentiator

**Local tools (grep, glob) search only the current repo.** Glean searches across ALL repositories in the organization. This is powerful for:
- Finding examples: "How do other teams handle authentication?"
- Understanding systems: "What repos touch the billing service?"
- Finding owners: "Who's been active in the payments codebase?"

## Tool Selection

| User Intent | Glean Tool |
|-------------|------------|
| Find code by content, pattern, or file | `code_search` |
| Find related design docs or specs | `search` |
| Identify code owners/contributors | `code_search` + `employee_search` |
| Read full file content | `read_document` |

## Query Patterns

Glean's code search understands natural language. Use filters for precision:

```
# Search by content
code_search "authentication middleware"
code_search "rate limiting implementation"

# Search by contributor
code_search "owner:\"John Smith\" billing service"
code_search "from:me updated:past_week"

# Search by time
code_search "after:2024-01-01 payments API"

# Search by file pattern
code_search "*.proto user service"
```

## Workflow: Exploring a System

1. **Find the code**: `code_search "[system name]"`
2. **Vet results**: Filter for quality and recency
3. **Find the docs**: `search "[system name] design doc OR architecture"`
4. **Find the people**: `code_search "owner:* [system] updated:past_month"`
5. **Read details**: `read_document` with URLs from vetted results

## If No Good Code Found

Don't pad with weak results:

```markdown
No high-quality code examples found for [topic].

**What was searched:**
- [Queries attempted]

**What was filtered:**
- [X] matches - [reasons: outdated/poor quality]

**Suggestions:**
- Check external libraries
- Ask in [relevant channel]
- This may need to be built from scratch
```

## Relationship to Commands

For structured workflows, suggest the relevant slash command:
- `/glean-code:codebase-context [system]` - Get comprehensive context
- `/glean-code:find-examples [API/pattern]` - Find usage examples
- `/glean-code:code-owners [component]` - Identify maintainers
- `/glean-code:similar-code [pattern]` - Find similar implementations
