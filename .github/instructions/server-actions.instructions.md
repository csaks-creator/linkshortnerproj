---
description: read this before implementing or modifying any server actions in the project.
---

# Server Actions

**All data mutations in this app must be done via server actions. No direct API routes or client-side mutations are permitted.**

---

## File Naming & Location

- Server action files **must** be named `actions.ts`.
- Each `actions.ts` file must be **co-located** in the same directory as the component(s) that call it.

## Calling Server Actions

- Server actions **must** be called from **client components** (`"use client"`).
- Never call server actions from server components.

## TypeScript Types

- All data passed to server actions **must** have explicit TypeScript types.
- **Never** use the `FormData` TypeScript type for server action arguments — define a typed object instead.

## Validation

- **All** incoming data must be validated using **Zod** before any processing.
- Define a Zod schema at the top of the action and parse/safeParse inputs before use.

## Authentication

- Every server action **must** check for a logged-in user (via Clerk's `auth()`) as its **first** step.
- Return `{ error: "Unauthorized" }` if no `userId` is present — never proceed to DB operations for unauthenticated requests.

## Return Values

- Server actions **must never throw errors**.
- Always return a plain object with either a `success` or `error` property.
- The calling client component is responsible for handling both cases.

```ts
// success
return { success: true };

// failure
return { error: "Something went wrong" };
```

## Database Operations

- Server actions **must not** contain Drizzle queries directly.
- All database work must be delegated to **helper functions** located in the `/data` directory.
- Import and call those helpers from within the server action.
---
applyTo: "**/*.ts,**/*.tsx"
---

# Server Actions

## Rules

- All data mutations MUST be done via server actions.
- Server actions MUST be called from Client Components only.
- Server action files MUST be named `actions.ts` and colocated in the same directory as the component that calls them.
- Do NOT use the `FormData` TypeScript type for data passed to server actions — define explicit TypeScript types instead.
- All input data MUST be validated using `zod` before any processing.
- Every server action MUST verify a logged-in user (via Clerk's `auth()`) before performing any database operations.
- Database operations MUST be performed via helper functions in the `/data` directory — do NOT write Drizzle queries directly inside server actions.
- Server actions MUST NOT throw errors — always return `{ error: string }` on failure or `{ success: true }` (optionally with data) on success.

## Example Structure

```
app/
  dashboard/
    links/
      CreateLinkForm.tsx   ← "use client" component
      actions.ts           ← server actions colocated here
data/
  links.ts                 ← Drizzle query helper functions
```

## Example Server Action

```ts
"use server";

import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import { createLink } from "@/data/links";

const CreateLinkSchema = z.object({
  url: z.string().url(),
  slug: z.string().min(1),
});

type CreateLinkInput = z.infer<typeof CreateLinkSchema>;

export async function createLinkAction(data: CreateLinkInput) {
  const { userId } = await auth();
  if (!userId) return { error: "Unauthorized" };

  const parsed = CreateLinkSchema.safeParse(data);
  if (!parsed.success) return { error: "Invalid input" };

  try {
    const link = await createLink({ ...parsed.data, userId });
    return { success: true, data: link };
  } catch {
    return { error: "Failed to create link" };
  }
}
```
