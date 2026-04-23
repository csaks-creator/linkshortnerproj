---
description: This file describes the rules for using UI components in the project.
---

# UI Components — shadcn/ui

**All UI elements in this app use shadcn/ui exclusively. Never create custom UI components from scratch.**

---

## Rules

- **Always** use a shadcn/ui component if one exists for the use case.
- **Never** build custom buttons, inputs, dialogs, cards, badges, or other common UI primitives.
- Install new shadcn components via the CLI before using them:

```bash
npx shadcn@latest add <component-name>
```

- Imported components come from `@/components/ui/<component-name>`.

## Usage Pattern

```tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Example() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Title</CardTitle>
      </CardHeader>
      <CardContent>
        <Input placeholder="Enter value" />
        <Button>Submit</Button>
      </CardContent>
    </Card>
  );
}
```

## Class Merging

Use `cn()` from `@/lib/utils` when conditionally applying Tailwind classes alongside shadcn components — never inline string concatenation.

```tsx
import { cn } from "@/lib/utils";

<Button className={cn("mt-4", isActive && "bg-primary")}>Click</Button>
```

## Available Components

Check `components/ui/` for already-installed components before running `shadcn add`. Do not duplicate existing components.
