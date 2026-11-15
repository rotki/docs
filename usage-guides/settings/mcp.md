---
description: Configure rotki's MCP service, privacy level, and bearer-token access.
---

# MCP Settings

Configure the local Model Context Protocol (MCP) service that AI assistants use to access rotki. For client-specific connection instructions, see the general [MCP guide](/usage-guides/mcp).

## Subscription requirement

MCP is a [premium](/premium/) feature and needs the Basic tier or higher. On the Free and Supporter tiers `Settings > MCP` shows an upgrade notice in place of the service controls, and the MCP tools return a `premium_required` error.

If the page instead says that lifecycle controls are unavailable, MCP is not manageable in that deployment. The packaged desktop app, and a Docker deployment configured with session authentication, can start and stop the service. A plain web build cannot, and neither can a Docker deployment started without `ROTKI_SESSION_KEY`: that deployment exposes no control surface, and because bearer tokens are minted from the session store it has no way to authenticate an MCP client either.

## Start the MCP service

1. In rotki, open `Settings > MCP`.
2. Select a privacy mode, described below.
3. Click `Start server`. The settings page shows the MCP endpoint and a running status. Copy the endpoint instead of typing it manually. The desktop app normally uses `http://127.0.0.1:4445/mcp`.

You can enable **Start MCP automatically with rotki** if you want the service to start with the desktop app. Stop the service from the same page when you no longer need it.

## Privacy level

The privacy level controls how rotki masks data before it reaches an AI assistant. Changing the level applies without restarting the MCP service, but a connected assistant must reload its analytics data before querying again.

### Balanced (default)

Masks addresses, transaction hashes, group identifiers, unknown fields, and account names you chose yourself. It keeps generated descriptions and the venue name of exchange accounts, which preserves useful context without exposing direct identifiers.

### Strict

Replaces identifiers with session-stable anonymous values so related data can still be grouped. Free text is not sent; the assistant sees only whether it existed.

### Raw

Does not mask anything. Addresses, transaction hashes, account names, and notes are sent exactly as stored in rotki. Choose this only when you explicitly need that information available to the connected assistant.

## Bearer token

Desktop connections use the local loopback endpoint and do not require a bearer token. The **Generate bearer token** button is shown in Docker deployments only.

Docker connections do require a token, and rotki does not create one for you. Click **Generate bearer token** to mint the first one, then reveal it and copy it into your client configuration. Repeat this whenever you need to replace the token; the previous one stops working immediately.

Tokens are tied to your login session and expire. The settings page shows the exact expiry beside the token, which is at most seven days after you logged in. A token is also revoked when you log out or when another login takes over the session. When a client starts failing with `401`, generate a replacement and update the client.

Copy the token only into a private client configuration or environment variable. Do not commit it to version control or add it to a shared project configuration.
