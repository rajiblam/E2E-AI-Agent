# MCP Jira setup

This workspace includes a Jira MCP server configuration in [.vscode/mcp.json](.vscode/mcp.json).

## Required environment variables
Set these before using the server:

```bash
export ATLASSIAN_URL="https://your-company.atlassian.net"
export ATLASSIAN_USERNAME="your.email@company.com"
export ATLASSIAN_API_TOKEN="your-jira-api-token"
export ATLASSIAN_EMAIL="your.email@company.com"
```

## Notes
- The MCP server expects a Jira-compatible Atlassian environment.
- If your organization uses a different Atlassian host or authentication method, update the values in [.vscode/mcp.json](.vscode/mcp.json) accordingly.
