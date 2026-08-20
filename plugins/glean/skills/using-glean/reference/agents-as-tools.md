# Glean platform agents as MCP tools

Beyond the built-in tools (`search`, `chat`, `employee_search`, …), the user's Glean instance may expose **Glean platform agents** as additional MCP tools. These are custom agents an organization has built — they automate company-specific workflows like running standard reports, applying internal taxonomies, or driving multi-step analyses against the org's data.

The set of agent tools is **org-specific and dynamic**: it varies by deployment and can change between sessions. This file teaches the recognition + introspection + invocation pattern; it does not enumerate specific agents.

## Recognizing them

Glean agent tools appear alongside the built-in ones in the active tool inventory. They typically:

- Have names that aren't on the built-in list (`search`, `chat`, `read_document`, `code_search`, `employee_search`, `gmail_search`, `outlook_search`, `meeting_lookup`, `user_activity`, `memory`, `memory_schema`, `knowledge_graph_query`, `knowledge_graph_schema`)
- Carry org-specific names (e.g., `qbr_summarizer`, `customer_health_check`, `sales_brief`)
- Have descriptions describing a workflow, not a primitive query operation

If you see a Glean tool whose name and description don't match the built-in set, treat it as a platform agent.

## Introspecting before invoking

Don't call an unfamiliar agent tool blind. Before invoking:

1. **Read its description.** The MCP tool description is the agent's authored contract — what it does, what input it expects.
2. **Read its parameter schema.** The tool's JSON schema shows required inputs, types, and any enum values.
3. **Compare against the user's request.** If the agent description plausibly matches what the user wants, prefer it over hand-rolling the same workflow with the primitives. If it doesn't match, fall back to the built-in tools.

If the user's Glean instance also exposes a generic agent-listing or agent-running tool (commonly `glean-agents` style), use that to enumerate options before picking one.

## Invocation

Call the agent like any MCP tool: pass parameters per its schema, read the response. Agents typically:

- Return structured JSON (often a longer-form synthesis, not a list of records)
- Run longer than a primitive call — expect more latency
- May internally call other Glean tools — don't double up by also calling those primitives yourself

## When to prefer an agent over primitives

- A custom workflow exists for the exact task the user asked for ("run our standard QBR summary")
- The agent encodes org-specific rules (taxonomies, thresholds, formatting) you'd otherwise have to guess
- The user references the agent by name

## When to prefer primitives

- The user's question is a basic retrieval that the built-in tools handle directly
- You've inspected the agent and its scope is broader / different than what's needed
- An agent run errors or returns nothing — fall back to primitives

## Pitfalls

- **Don't infer behavior from the name.** `customer_health_check` could mean many things; read the description.
- **Don't chain agents speculatively.** If one agent's output doesn't directly feed another's input schema, don't pipe them.
- **Empty / error responses don't mean the data isn't there.** The agent may have authorization scoping different from the user's primitive-tool access. Try a primitive query before reporting "not found".
