# `gmail_search` — Gmail / Google Workspace email

Search the user's Gmail inbox: messages, threads, attachments, labels. Requires the user's org to be on Google Workspace.

## When to use

- "Find the email about X" — content/subject search
- "What did Alice send me about the budget?" — sender + topic
- "Find that PDF I got from finance" — attachment lookup
- "Unread important emails" — status filters

**Don't** use for:
- Outlook / Microsoft 365 email — use `outlook_search`
- Calendar invites as content — use `meeting_lookup`
- Slack DMs — use `search` with `app:slack`

## Parameters

| Parameter | Type | Notes |
|---|---|---|
| `query` | string (required) | Keywords + inline filters (see below). |

## Inline filters

| Filter | Example | Meaning |
|---|---|---|
| `from:` | `from:"alice@company.com"` or `from:me` | Sender |
| `to:` | `to:"bob@company.com"` or `to:me` | Recipient |
| `subject:` | `subject:"quarterly review"` | Subject line text |
| `has:` | `has:attachment` | `attachment`, `document`, `spreadsheet`, `presentation` |
| `is:` | `is:unread` | `important`, `starred`, `read`, `unread`, `snoozed` |
| `label:` | `label:SENT` | `INBOX`, `SENT`, `TRASH`, `DRAFT`, `SPAM` (uppercase) |
| `after:` / `before:` | `after:2025-01-15` | YYYY-MM-DD |

Filters combine with AND. For conversations between two people, use both `from:X` and `to:Y`.

## Examples

```
gmail_search(query="quarterly review subject:\"Q4 planning\" after:2025-09-01")
gmail_search(query="from:\"finance@company.com\" has:spreadsheet")
gmail_search(query="from:me to:\"alice@company.com\" budget")
gmail_search(query="is:unread is:important")
gmail_search(query="contract has:attachment label:INBOX")
```

## Pitfalls

- **Labels are uppercase.** `label:inbox` returns nothing; use `label:INBOX`.
- **Quote multi-word values.** `subject:"design review"` not `subject:design review`.
- **"From me" and "to me" are valid.** Use the bare token `me` rather than the user's email.
- **Empty results may mean no access** to a shared mailbox or label, not that the email doesn't exist.

## Typical follow-up

Use `read_document` with the URL of an interesting result to read the full message. For threads spanning email + meeting + doc, see [synthesis.md](synthesis.md).
