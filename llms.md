# Using LLMs

rotki's documentation is available in LLM-friendly formats to help developers and AI agents integrate with rotki faster.

## Available Endpoints

| Endpoint                        | Description                                                        |
| ------------------------------- | ------------------------------------------------------------------ |
| [llms.txt](/llms.txt)           | Curated index of all pages with one-line descriptions. Start here. |
| [llms-full.txt](/llms-full.txt) | All pages in clean markdown, organized by section.                 |

Each documentation page also has an individual `.md` version available for LLMs (use the "Copy page for LLMs" button on any page).

## Which file should I use?

- **Quick lookup** — Use `llms.txt` to find the right page, then fetch it individually.
- **Full context** — Use `llms-full.txt` for complete documentation in a single file. Best for comprehensive context.

## Using with AI Code Editors

### Cursor

Add the following URL to **Cursor Settings > Features > Docs**:

```
https://docs.rotki.com/llms-full.txt
```

### Claude Code

To give Claude Code access to the rotki documentation, you can fetch it directly:

```bash
curl -s https://docs.rotki.com/llms-full.txt
```

Or reference specific pages:

```bash
curl -s https://docs.rotki.com/usage-guides.md
```

### Other Tools

Any tool that supports the [llms.txt standard](https://llmstxt.org/) can consume rotki's documentation. Point it to `https://docs.rotki.com/llms.txt` as the entry point.
