---
name: Code Context
description: This skill should be used when the user asks about "internal code", "company code", "where is this implemented internally", "who wrote this code", "code in [repo]", "find usage of", "internal implementation", or needs to search company code repositories and combine internal code search with local development context using Glean's code search capabilities.
version: 1.0.0
---

# Code Context with Glean

This skill bridges Glean's enterprise code search with local codebase understanding, enabling discovery of internal implementations, patterns, and ownership.

## Core Tool

- **code_search** - Search internal code repositories

## Code Search Syntax

### Person Filters

- `owner:"person name"` - Commits created by a person
- `from:"person name"` - Code updated/commented on by a person
- `owner:me` / `from:me` - Current user's code

### Date Filters

- `updated:today` - Changed today
- `updated:past_week` - Changed in last 7 days
- `updated:past_month` - Changed in last 30 days
- `after:YYYY-MM-DD` - Changes after date
- `before:YYYY-MM-DD` - Changes before date

### Repository/Path Filters (availability varies by org)

Some organizations configure additional filters:
- `repo:platform` - Specific repository
- `path:services/auth` - Specific path
- `lang:go` - Programming language

## Common Queries

**Find a function or class:**
```
code_search "AuthService"
code_search "func handleRequest"
```

**Find by author:**
```
code_search "owner:\"Sarah Chen\" authentication"
```

**Find recent changes:**
```
code_search "payment validation updated:past_week"
```

**Find implementations:**
```
code_search "interface UserRepository"
code_search "implements PaymentGateway"
```

## Workflow Patterns

### Pattern 1: Find Internal Implementation

When user asks "where is [feature] implemented internally?":

1. **Search for the core component:**
   ```
   code_search "[feature name] [likely class/function]"
   ```

2. **Find related files:**
   ```
   code_search "[feature name] config OR setup"
   ```

3. **Identify the owner for questions:**
   ```
   code_search "owner:* [feature name]"
   ```

### Pattern 2: Understand Code Ownership

When user needs to know who to ask about code:

1. **Find recent contributors:**
   ```
   code_search "[file or component] updated:past_month"
   ```

2. **Look at commit authors in results**

3. **Find the subject matter expert:**
   ```
   employee_search "[author name from results]"
   ```

### Pattern 3: Cross-Repository Investigation

When tracing a feature across repos:

1. **Frontend implementation:**
   ```
   code_search "[feature] component OR view"
   ```

2. **Backend implementation:**
   ```
   code_search "[feature] handler OR service OR controller"
   ```

3. **API contract:**
   ```
   code_search "[feature] API OR endpoint OR route"
   ```

4. **Compare patterns and integration points**

### Pattern 4: Finding Usage Examples

When user needs to see how something is used:

1. **Find imports/includes:**
   ```
   code_search "import [package or module]"
   ```

2. **Find instantiations:**
   ```
   code_search "new [ClassName]"
   code_search "[FunctionName]("
   ```

3. **Find configurations:**
   ```
   code_search "[feature] config"
   ```

## Bridging Internal and Local Code

### Understanding Local Code Origins

When working on local code that connects to internal systems:

1. **Find internal API clients:**
   ```
   code_search "[service name] client"
   ```

2. **Find internal SDK usage:**
   ```
   code_search "[SDK name] example"
   ```

3. **Find similar implementations in other repos:**
   ```
   code_search "[pattern from local code]"
   ```

### Implementing Based on Internal Patterns

When implementing something that should match internal standards:

1. **Search for existing patterns:**
   ```
   code_search "[pattern type] example"
   ```

2. **Analyze the internal approach**

3. **Apply consistent patterns locally**

### Debugging with Enterprise Context

When a local error might be related to internal code:

1. **Search for error messages:**
   ```
   code_search "[error message or class]"
   ```

2. **Find related issues:**
   ```
   code_search "[error type] fix OR resolved updated:past_month"
   ```

3. **Check if others encountered the same issue**

## Best Practices

1. **Start specific** - Include likely class/function names
2. **Use author filter** - When you know who might have written it
3. **Check recency** - `updated:past_week` shows active code
4. **Combine with local tools** - Use Glean results to inform local exploration
5. **Look at test files** - Often show usage patterns

## Common Mistakes to Avoid

- Don't assume repo structure - it varies by organization
- Don't forget internal code might use different patterns than open source
- Don't skip finding the author - they can provide context faster than reading

## Additional Resources

For extended code search patterns, see:
- **`references/code-search-patterns.md`** - Advanced patterns and language-specific tips
