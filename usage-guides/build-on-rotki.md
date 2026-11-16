---
description: Use rotki as a local data layer for AI agents and scripts through MCP or the REST API.
---

# Build on rotki

rotki can be the local data layer for your own finance tools. It handles the work of collecting and normalizing data from blockchains, exchanges, banks, and imported files, while your agent, script, or dashboard runs against the rotki instance you control.

For an overview of what you can build, see [Local finance data for AI agents](https://rotki.com/features/local-finance-data-for-ai-agents?utm_source=docs&utm_medium=referral&utm_campaign=build_on_rotki).

## Choose an interface

| Interface | Use it for                                                                | Endpoint | Access                                                                   |
| --------- | ------------------------------------------------------------------------- | -------- | ------------------------------------------------------------------------ |
| MCP       | AI agents that need to discover and analyze your financial data           | `/mcp`   | Read-only, privacy-filtered, and requires a Basic or higher subscription |
| REST API  | Scripts, dashboards, and integrations that need specific rotki operations | `/api/1` | Includes read and write operations; normal plan limits apply             |

Use MCP when the consumer is an agent. Its tools explain the available schema and let the agent query a temporary, privacy-filtered SQLite dataset without modifying rotki.

Use the REST API when your code needs predictable endpoints or operations that MCP does not expose. The complete endpoint reference is maintained in [`docs/api.rst`](https://github.com/rotki/rotki/blob/develop/docs/api.rst) in the rotki repository.

## Run rotki headlessly

The official Docker image runs the web interface and backend without the desktop application:

```sh
docker run -d --name rotki \
    -p 8084:80 \
    -v $HOME/.rotki/data:/data \
    -v $HOME/.rotki/logs:/logs \
    rotki/rotki:latest
```

Open `http://localhost:8084` to create or sign in to an account. Your API base URL is then `http://localhost:8084/api/1`.

Before allowing another machine to reach the container, follow the [Docker and self-hosting guide](/requirement-and-installation/docker). It covers persistent storage, session authentication, TLS, and authenticated reverse proxies. Never expose rotki's own port directly to the public internet.

## Authentication

Authentication depends on the interface and how rotki is running:

- **Desktop MCP:** the loopback endpoint, normally `http://127.0.0.1:4445/mcp`, does not require a token.
- **Docker MCP:** start Docker with `ROTKI_SESSION_KEY`, sign in, then generate a bearer token in `Settings > MCP`. The token is tied to that login session and expires no later than seven days after login. See [MCP Settings](/usage-guides/settings/mcp#bearer-token).
- **Desktop REST API:** the backend listens locally, normally at `http://127.0.0.1:4242/api/1`, and has no separate HTTP token.
- **Docker REST API:** without `ROTKI_SESSION_KEY`, the API is open to anything that can reach the published port. With a session key, sign-in issues an `HttpOnly` cookie that subsequent API requests must send. Read [Session authentication](/requirement-and-installation/docker#session-authentication) before using the API outside the local machine.

The MCP bearer token does not authenticate REST API requests, and the Docker session cookie is not a substitute for TLS or an authenticating reverse proxy.

## Discover the MCP data model

MCP exposes analytics data as tables rather than exposing rotki's internal databases. An agent should use the schema tools in this order:

1. Call `refresh_analytics_data` to load a privacy-filtered snapshot. By default it loads `history_events`.
2. Call `list_tables` to see which tables are loaded, which are loaded by default, all available tables, and the active privacy mode.
3. Call `describe_table` with a table name before writing SQL. It returns the columns, SQLite types, null rates, row count, common values for enum-like columns, and source metadata.
4. Call `query_sql` with a read-only SQLite `SELECT` or `WITH` query.

Two tables are currently available:

| Table            | Contents                                                                     | Loading behavior                                     |
| ---------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------- |
| `history_events` | Normalized financial events from rotki's supported data sources              | Loaded by default; can be restricted to a time range |
| `balances`       | Current assets and liabilities, including their value and share of net value | Opt-in because refreshing balances can be slow       |

The columns returned by `describe_table` are the schema the agent should trust. They can vary with the loaded options and privacy mode. Outside raw mode, identifiers are replaced with session-local hashes and free text is redacted or omitted. Read [MCP Settings](/usage-guides/settings/mcp#privacy-level) for the differences between balanced, strict, and raw modes.

For client configuration and troubleshooting, continue with the [MCP guide](/usage-guides/mcp).
