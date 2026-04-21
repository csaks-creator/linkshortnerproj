# Authentication — Clerk

**All authentication in this app is handled exclusively by Clerk (`@clerk/nextjs`). No other auth libraries, custom sessions, JWTs, or manual credential checks are permitted.**

---

## Protected Routes

`/dashboard` is a protected route. Users who are not signed in must not be able to access it.

Enforce this in `middleware.ts` using `clerkMiddleware`:

```ts
// middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/", "/sign-in(.*)", "/sign-up(.*)"]);

export default clerkMiddleware(async (auth, request) => {
  const { userId } = await auth();

  // Redirect signed-in users away from the homepage to /dashboard
  if (userId && request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Protect all non-public routes
  if (!isPublicRoute(request)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
```

## Homepage Redirect Rule

- **Signed-out user visits `/`** → show homepage normally.
- **Signed-in user visits `/`** → redirect to `/dashboard`.

This redirect is handled in the middleware above. Do not add a separate redirect inside `app/page.tsx`.

## Sign In / Sign Up — Always Modal

Clerk's sign-in and sign-up flows must **always open as a modal**. Never redirect to a dedicated `/sign-in` or `/sign-up` page.

Use `<SignInButton mode="modal">` and `<SignUpButton mode="modal">`:

```tsx
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

<SignedOut>
  <SignInButton mode="modal">
    <button>Sign In</button>
  </SignInButton>
  <SignUpButton mode="modal">
    <button>Sign Up</button>
  </SignUpButton>
</SignedOut>
<SignedIn>
  <UserButton />
</SignedIn>
```

Do **not** create `app/sign-in/` or `app/sign-up/` route folders. Do **not** use `<SignIn />` or `<SignUp />` as full-page components.

## Reading the Current User

Always get the authenticated user on the server via `auth()` from `@clerk/nextjs/server`. Never trust a `userId` supplied by the client.

```ts
// Server Component or Server Action
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const { userId } = await auth();
if (!userId) redirect("/");
```

In Client Components use the `useAuth()` or `useUser()` hooks for display purposes only — never for access control.

## Rules Summary

| Rule | Requirement |
|---|---|
| Auth library | Clerk only — no exceptions |
| `/dashboard` access | Requires authenticated session |
| Signed-in user on `/` | Redirect to `/dashboard` |
| Sign-in / sign-up UI | Modal only (`mode="modal"`) |
| User ID source | Always `auth()` on server |
