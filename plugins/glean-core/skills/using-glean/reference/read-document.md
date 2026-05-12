# `read_document` — fetch full content by URL

Retrieve the complete content of one or more URLs (internal Glean-indexed resources or public web pages). The natural follow-up to `search`, `code_search`, `gmail_search`, etc., when you have a URL and need the body.

## When to use

- After `search` returns a candidate document and you need to quote, summarize, or analyze it
- The user provides a Glean URL or any other URL and asks "what does this say?"
- You need full content rather than the short excerpt search returns
- Reading multiple related documents in one call

**Don't** use for:
- Discovery without a URL — use `search` (or the appropriate per-source tool) first
- Repeatedly re-reading the same URL — results are deterministic; cache mentally

## Parameters

| Parameter | Type | Notes |
|---|---|---|
| `urls` | string array (required) | One or more URLs. Pass them all in a single call rather than one call per URL. |
| `mode` | enum | Omit for default structured/text response. Set to `"raw_bytes"` to retrieve original bytes (recommended for `.xlsx` and other formats where extracted text loses structure). |

## When to use `raw_bytes`

For Office 365 spreadsheets (`.xlsx`), the structured-text response collapses formulas, formatting, and grid structure. Try `mode: "raw_bytes"` first to get the native file. If `raw_bytes` fails, retry without `mode` to fall back to text extraction.

For most documents (Confluence pages, Google Docs, web pages), the default extracted text is what you want.

## Examples

```
read_document(urls=["https://company.glean.com/doc/abc123"])
read_document(urls=[
  "https://company.glean.com/doc/abc123",
  "https://company.glean.com/doc/def456"
])
read_document(urls=["https://drive.google.com/file/d/.../view"], mode="raw_bytes")
```

## Pitfalls

- **One call, multiple URLs.** Don't issue four `read_document` calls for four URLs — one call with the array is faster and shares the same auth.
- **All-or-nothing.** Empty response means the URL was inaccessible (auth, access, deleted, never existed). Empty doesn't mean "doesn't exist on the platform."
- **No retries with variations.** If the URL fails, trying the same URL with different casing or query params won't help. Re-issue your `search` if needed.
- **Public URLs work.** `read_document` will fetch external pages too — useful when an internal doc references a vendor's docs page.

## Typical follow-up

After `read_document`, you have content to quote / summarize / cite. Apply [vetting.md](vetting.md) before presenting freshness-sensitive material.
