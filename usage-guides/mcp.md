---
description: Use rotki's Model Context Protocol (MCP) service with ChatGPT, Claude Code, and OpenCode.
---

# MCP

rotki's Model Context Protocol (MCP) service lets compatible AI assistants use selected rotki data and tools. Start by configuring the service, privacy level, and, when needed, authentication in [MCP Settings](/usage-guides/settings/mcp).

> [!IMPORTANT]
> MCP requires a [rotki premium subscription](/premium/) on the Basic tier or higher. On the Free and Supporter tiers the MCP settings show an upgrade notice instead of the service controls, and every MCP tool except `info` returns a `premium_required` error.

> [!IMPORTANT]
> MCP can share data from your rotki installation with the AI client you connect. Choose a privacy level that matches your use case and only connect clients and services you trust.

## Before you connect

1. Open `Settings > MCP` in rotki and start the service.
2. Copy the endpoint displayed in the settings. The desktop app normally uses `http://127.0.0.1:4445/mcp`.
3. If you use Docker, click **Generate bearer token** in rotki's MCP settings and copy both the endpoint and the token it produces. No token exists until you generate one, and the desktop app does not need one.

## Connect Claude Code

With the rotki desktop app and MCP service running, add the local HTTP server to your Claude Code user configuration:

```shell
claude mcp add --scope user --transport http rotki http://127.0.0.1:4445/mcp
```

For Docker, replace the URL with the endpoint shown in rotki and add its bearer token:

```shell
claude mcp add --scope user --transport http rotki http://ROTKI_HOST/mcp \
  --header "Authorization: Bearer YOUR_ROTKI_MCP_TOKEN"
```

Run `claude mcp list` to confirm that the server is connected. In a Claude Code session, `/mcp` also shows the available MCP servers and their status. See the [Claude Code MCP documentation](https://docs.anthropic.com/en/docs/claude-code/mcp) for alternative scopes and connection options.

## Connect OpenCode

Add the following remote server to your global or project `opencode.json` configuration. The desktop connection does not need authentication:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "servers": {
      "rotki": {
        "type": "remote",
        "url": "http://127.0.0.1:4445/mcp"
      }
    }
  }
}
```

For Docker, use the endpoint displayed in rotki and provide the bearer token through an environment variable:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "servers": {
      "rotki": {
        "type": "remote",
        "url": "http://ROTKI_HOST/mcp",
        "oauth": false,
        "headers": {
          "Authorization": "Bearer {env:ROTKI_MCP_TOKEN}"
        }
      }
    }
  }
}
```

Set `ROTKI_MCP_TOKEN` in the environment where you run OpenCode, then use `opencode mcp list` to check the connection. OpenCode connects configured servers automatically. For configuration locations and other options, see the [OpenCode MCP server documentation](https://opencode.ai/v2/docs/mcp-servers).

## Connect ChatGPT

ChatGPT cannot connect directly to a local `127.0.0.1` MCP server. Use an [OpenAI Secure MCP Tunnel](https://developers.openai.com/api/docs/guides/secure-mcp-tunnels) to keep the rotki endpoint private while making it available to ChatGPT.

1. Start rotki's MCP service and copy its endpoint from `Settings > MCP`.
2. In [OpenAI Platform tunnel settings](https://platform.openai.com/settings/organization/tunnels), create a tunnel and note its `tunnel_id`.
3. On the computer that can reach the rotki endpoint, install OpenAI's `tunnel-client`, set its runtime API key, and create a profile. Replace the placeholders with your values:

   ```shell
   export CONTROL_PLANE_API_KEY="sk-..."

   tunnel-client init \
     --profile rotki \
     --tunnel-id tunnel_YOUR_TUNNEL_ID \
     --mcp-server-url http://127.0.0.1:4445/mcp
   tunnel-client doctor --profile rotki --explain
   tunnel-client run --profile rotki
   ```

   Keep `tunnel-client run` running while you use the connection.

4. In the [ChatGPT app](https://chatgpt.com/), open `Settings > Plugins > MCP`. Add an MCP connection, choose **Tunnel** as the connection type, and select the tunnel you created. Scan the tools, save the connection, then enable it in a new chat.

ChatGPT currently uses this flow on the web, not by directly connecting to a local endpoint. See OpenAI's [Secure MCP Tunnel guide](https://developers.openai.com/api/docs/guides/secure-mcp-tunnels) for tunnel setup and access requirements.

## Troubleshooting

- Confirm that rotki shows the service as running before configuring a client.
- If `Settings > MCP` shows an upgrade notice instead of a start button, your subscription tier does not include MCP. See the note at the top of this page.
- Use the exact endpoint copied from rotki. In particular, use `127.0.0.1` rather than `localhost` when connecting to the desktop service.
- For Docker, a client that suddenly returns `401` usually has an expired token. Tokens last at most seven days from login; generate a new one and update the client configuration. Do the same after any deliberate rotation.
- For ChatGPT, run `tunnel-client doctor --profile rotki --explain` and make sure `tunnel-client run --profile rotki` is still active before testing the connection.
