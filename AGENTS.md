<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know 

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

## Quick Rules

- Always use the `@/` path alias — never relative `../` imports across domain boundaries.
- Default to Server Components; add `"use client"` only when necessary.
- All auth checks use Clerk's `auth()` on the server — never trust client-supplied user IDs.
- All DB access goes through `db` from `@/db` using the Drizzle query builder.
- All class merging uses `cn()` from `@/lib/utils`.
- Never hard-code secrets or credentials.
- All data mutations use server actions (`actions.ts`, co-located with the calling component). See `.github/instructions/server-actions.instructions.md`.
