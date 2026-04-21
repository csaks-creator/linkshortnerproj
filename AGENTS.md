<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# Coding Standards for LLM Agents

Before writing any code for this project, you MUST read the relevant instruction file(s) from the `doc/` directory listed below. Each file is the authoritative reference for its domain.
THIS IS A HARD REQUIREMENT: ALWAYS read the relevant file in `doc/` BEFORE generating ANY code.
Do not generate, modify, or suggest code until you have checked the applicable instruction file(s) in `doc/`.

| File | Covers |
|---|---|
| [doc/auth.md](doc/auth.md) | Clerk-only auth, protected routes, homepage redirect, modal sign-in/sign-up |
| [doc/ui-components.md](doc/ui-components.md) | shadcn/ui-only UI components, no custom primitives, installation, usage patterns |



## Quick Rules

- Always use the `@/` path alias — never relative `../` imports across domain boundaries.
- Default to Server Components; add `"use client"` only when necessary.
- All auth checks use Clerk's `auth()` on the server — never trust client-supplied user IDs.
- All DB access goes through `db` from `@/db` using the Drizzle query builder.
- All class merging uses `cn()` from `@/lib/utils`.
- Never hard-code secrets or credentials.
