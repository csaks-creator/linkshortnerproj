import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getLinksByUserId } from "@/data/links";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function DashboardPage() {
  const { userId } = await auth();
  if (!userId) redirect("/");

  const userLinks = await getLinksByUserId(userId);

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-6 pb-20 pt-14 sm:px-10">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Your Links</h1>
        <Badge variant="secondary">
          {userLinks.length} link{userLinks.length !== 1 ? "s" : ""}
        </Badge>
      </div>

      {userLinks.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <p className="text-lg font-medium text-foreground">No links yet</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Create your first short link to get started.
            </p>
          </CardContent>
        </Card>
      ) : (
        <ul className="flex flex-col gap-3">
          {userLinks.map((link) => (
            <li key={link.id}>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center justify-between gap-4 text-base">
                    <span className="font-mono text-sm font-semibold text-foreground">
                      /{link.shortCode}
                    </span>
                    <Badge variant="outline" className="shrink-0 text-xs">
                      {new Date(link.createdAt).toLocaleDateString()}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="truncate text-sm text-muted-foreground hover:text-foreground hover:underline"
                  >
                    {link.url}
                  </a>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
