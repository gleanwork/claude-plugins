# `outlook_search` — Outlook / Microsoft 365 email

Search the user's Outlook mailbox: messages, threads, attachments. The Microsoft 365 counterpart to `gmail_search`. Requires the user's org to be on M365.

## When to use

- "Find the email about X" — content/subject search
- "What did Alice send me about the budget?" — sender + topic
- "Find that report I got from finance" — attachment lookup

**Don't** use for:
- Gmail / Google Workspace email — use `gmail_search`
- Calendar invites as content — use `meeting_lookup`

## Picking the right tool

If the user has only one of `gmail_search` / `outlook_search` available in the active tool inventory, use that one. If both are available — rare, usually means the org is mid-migration — ask the user which mailbox they want to search, or default to the one that matches their `me` email.

## Parameters

| Parameter | Type | Notes |
|---|---|---|
| `query` | string (required) | Keywords + inline filters. |

## Inline filters

The filter vocabulary largely parallels `gmail_search`:

| Filter | Example | Meaning |
|---|---|---|
| `from:` | `from:"alice@company.com"` or `from:me` | Sender |
| `to:` | `to:"bob@company.com"` or `to:me` | Recipient |
| `subject:` | `subject:"quarterly review"` | Subject line |
| `has:` | `has:attachment` | Attachment presence |
| `after:` / `before:` | `after:2025-01-15` | YYYY-MM-DD |

Differences from `gmail_search`:
- No `label:` taxonomy — Outlook uses folders. The standard folders (Inbox, Sent, Deleted) are searched by default.
- No Gmail-specific `is:starred` / `is:snoozed`. `is:unread` and `is:read` typically work; verify against the live tool list before relying on others.

## Examples

```
outlook_search(query="quarterly review subject:\"Q4 planning\" after:2025-09-01")
outlook_search(query="from:\"finance@company.com\" has:attachment")
outlook_search(query="from:me to:\"alice@company.com\" budget")
outlook_search(query="contract has:attachment")
```

## Pitfalls

- **Don't assume Gmail filter vocabulary 1:1.** Verify by trying the bare query first if a filter returns unexpected empty results.
- **Quote multi-word values.**
- **Empty results may mean no access** to a shared mailbox.

## Typical follow-up

Use `read_document` with the URL of an interesting result to read the full message.
