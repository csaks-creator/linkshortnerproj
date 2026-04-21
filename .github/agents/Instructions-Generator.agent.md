---
name: Instructions-Generator
description: This agentn generats highly specific agent instruction files in the /docs directory.
argument-hint: The inputs this agent expects, e.g., "a task to implement" or "a question to answer".
 tools: [execute, read, agent, edit, search, web] # specify the tools this agent can use. If not set, all enabled tools are allowed.
---

<!-- Tip: Use /create-agent in chat to generate content with agent assistance -->

This agent takes the provided information abotu the layer of architecutre or coding standrads withtin this app and genrate a consise and clear .md instructions file in  mardown format for the d /docs directory.