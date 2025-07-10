---
title: "Setting up the Neon MCP with Claude Code"
description: "Quick setup guide for integrating Remote Neon MCP with Claude Code for database access"
date: 2025-07-10
articleType: "snack"
tags: ["mcp", "claude", "neon", "database", "vibe-coding", "vibes"]
---

Want to wire up your Claude Max subscription to pound your Postgres database for a vibe-coding extravaganza? Here's the quick rundown:

## Steps

1. Create a `.mcp.json` file in your project root.

2. Add the Neon MCP configuration:

```json
{
  "mcpServers": {
    "Neon": {
      "command": "npx",
      "args": ["-y", "mcp-remote@latest", "https://mcp.neon.tech/mcp"]
    }
  }
}
```

3. Exit and restart Claude Code to load the MCP server (Ctrl+C or Cmd+C, then run `claude` again)

4. When Claude starts back up again you should be redirected to Neon's MCP OAuth flow. Give the MCP permissions to access your Neon Project.

5. Use Claude to query your Neon database directly. I've found it's helpful to specify the project-id and current branch-id if you use Neon for multiple projects or use dev branches. Helps the MCP skip a couple steps.

### Extra Credit

**Using Cursor?**
If you've already been using MCPs w/ Cursor for an existing project and want to share your mcp tools w/ Claude. Create a symlink between `.cursor/mcp.json` and your new `.mcp.json`.

Before creating the symlink, decide which file should be your "source of truth" and symlink accordingly

e.g. `ln -s .mcp.json .cursor/mcp.json` (makes `.cursor/mcp.json` point to `.mcp.json`)

## Resources

- [Claude Code MCP Documentation](https://docs.anthropic.com/en/docs/claude-code/mcp#project-scope)
- [Neon MCP Documentation](https://neon.com/docs/ai/neon-mcp-server)
- [Cursor MCP Documentation](https://docs.cursor.com/context/mcp)
