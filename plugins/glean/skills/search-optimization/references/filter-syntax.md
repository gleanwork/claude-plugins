# Glean Search Filter Syntax Reference

Complete reference for all Glean search filters.

## Person Filters

### `owner:`
Documents created by a specific person.

```
owner:"John Smith"           # By full name
owner:"john@company.com"     # By email
owner:me                     # By current user (no quotes)
```

### `from:`
Documents updated, commented on, or created by a person.

```
from:"Jane Doe"              # Broader than owner - includes edits/comments
from:me                      # Current user's activity
```

## Date Filters

### `updated:`
Documents updated on or after a relative date.

```
updated:today                # Updated today
updated:yesterday            # Updated yesterday
updated:past_week            # Last 7 days
updated:past_2_weeks         # Last 14 days
updated:past_month           # Last 30 days
updated:March                # Updated in March (current year)
```

### `after:` and `before:`
Absolute date boundaries.

```
after:2024-01-15             # Created after Jan 15, 2024
before:2024-12-31            # Created before Dec 31, 2024
after:2024-01-01 before:2024-03-31   # Q1 2024 only
```

**Important:** Never use future dates with `after:`. The search will fail or return no results.

## Source Filters

### `app:`
Filter by source application.

Common values:
- `app:confluence` - Atlassian Confluence
- `app:github` - GitHub repositories and issues
- `app:drive` or `app:gdrive` - Google Drive
- `app:slack` - Slack messages
- `app:jira` - Jira tickets
- `app:notion` - Notion pages
- `app:sharepoint` - SharePoint

```
app:confluence project roadmap
app:github README
```

### `channel:`
Slack channel filter. **Only use when user explicitly asks about a Slack channel.**

```
channel:"engineering"
channel:"product-updates"
```

### `type:`
Document type filter.

```
type:pdf
type:document
type:presentation
type:spreadsheet
```

## Result Control

### `num_results:`
Control the number of results returned.

```
num_results:5                # Return only 5 results
num_results:10               # Return 10 results
num_results:0                # Return exhaustive list (use sparingly)
```

## Combining Filters

Filters use AND logic by default.

```
# Documents by John updated this week
owner:"John Smith" updated:past_week

# Confluence docs from Q1 2024
app:confluence after:2024-01-01 before:2024-04-01

# Recent API docs in GitHub
app:github API documentation updated:past_month
```

## Edge Cases

### Names with Special Characters
Always quote names with spaces or special characters:
```
owner:"Mary O'Connor"
from:"José García"
```

### Escaping Quotes
For names with quotes, use single quotes or escape:
```
owner:'John "Johnny" Smith'
```

### Empty Results
If search returns no results:
1. Remove the most restrictive filter
2. Try synonyms for keywords
3. Expand date range
4. Check spelling of names
