---
name: Enterprise Onboarding
description: This skill should be used when the user is "new to the company", asks "who works on", "who should I talk to about", "who is the expert on", "what is our process for", "company policies", "team structure", "org chart", "find people", or needs help discovering people, teams, processes, and company knowledge as a new or existing employee exploring the organization.
version: 1.0.0
---

# Enterprise Onboarding with Glean

This skill helps employees discover company knowledge, find the right people, understand organizational structure, and learn company processes.

## Core Tools

- **chat** - Synthesize information across multiple sources (best for broad questions)
- **search** - Find specific documents and policies
- **employee_search** - Find people, teams, and org structure
- **read_document** - Get full document content

## Discovery Workflows

### Finding People

**Who works on a topic:**
```
employee_search "engineering manager authentication"
employee_search "product manager payments"
```

**Team structure and reports:**
```
employee_search "reportsto:\"Jane Doe\""     # Jane's direct reports
employee_search "engineering department"     # People in engineering
```

**New hires in an area:**
```
employee_search "engineering startafter:2024-01-01"
employee_search "roletype:\"manager\" startafter:2024-06-01"
```

**Sorting results:**
```
employee_search "engineering sortby:hire_date_descending"  # Newest first
employee_search "product sortby:most_reports"              # Most senior first
```

### Understanding Processes

**Process discovery workflow:**
1. Start with `chat`: "What is our process for [topic]?"
2. Review the synthesized answer for document references
3. Use `read_document` to get full details from cited sources
4. Follow up with `search "[topic] process updated:past_month"` for recent updates

### Finding Policies

**Policy lookup workflow:**
1. `search "[policy topic] app:confluence"` - Find policy documents
2. `read_document` the most relevant result
3. Extract key requirements and guidelines
4. Note the last updated date for freshness

### Organizational Questions

**Who to contact:**
1. `employee_search "[topic area]"` - Find relevant people
2. Look for managers or senior individual contributors
3. Check their areas of responsibility

**Reporting structure:**
```
employee_search "reportsto:\"CEO Name\""         # Executive team
employee_search "reportsto:\"VP Engineering\""   # Engineering leadership
```

## Onboarding Checklist Patterns

### Week 1 Questions
- "Who should I talk to about [my project area]?"
- "What are our coding standards?"
- "Where is the new employee documentation?"
- "How do I set up my development environment?"

**Approach:** Use `chat` for broad questions, then `search` + `read_document` for specifics.

### Week 2-4 Questions
- "What are the key architectural decisions?"
- "Who are the subject matter experts for [system]?"
- "What are our team rituals and meetings?"
- "What's the history behind [decision]?"

**Approach:** Combine `employee_search` for people discovery with `search` for documentation.

## Best Practices

1. **Start with chat** for broad understanding - it synthesizes across sources
2. **Follow with search** for specific documents you need to reference
3. **Use employee_search** for people and team questions - don't use regular search
4. **Read before citing** - always get full document content before quoting
5. **Check dates** - note when documents were last updated for freshness

## Common Mistakes to Avoid

- Don't use regular `search` for finding people - use `employee_search`
- Don't assume org structure - verify with `reportsto:` queries
- Don't skip `read_document` when citing policies - snippets may be incomplete

## Additional Resources

For detailed discovery workflows and examples, see:
- **`references/discovery-workflows.md`** - Extended patterns for common scenarios
