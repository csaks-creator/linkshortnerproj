import Link from "next/link";
import { Button } from "@/components/ui/button";

const features = [
  {
    title: "Create short links in seconds",
    description:
      "Turn long URLs into clean, shareable links your audience can remember.",
  },
  {
    title: "Track link performance",
    description:
      "Get clear visibility into clicks so you can understand what is working.",
  },
  {
    title: "Manage everything in one dashboard",
    description:
      "Keep all of your links organized and update destinations whenever you need.",
  },
];

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-6 pb-20 pt-14 sm:px-10">
      <section className="mx-auto flex w-full max-w-3xl flex-col items-center gap-6 text-center">
        <p className="text-sm font-medium text-muted-foreground">LinkShortner</p>
        <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          Shorten links, share faster, and measure results.
        </h1>
        <p className="max-w-2xl text-lg text-muted-foreground">
          LinkShortner helps you create branded short links and monitor engagement from one simple workspace.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button size="lg" asChild>
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
        </div>
      </section>

      <section className="mt-16 grid gap-6 md:grid-cols-3">
        {features.map((feature) => (
          <article
            key={feature.title}
            className="rounded-lg border border-border/70 bg-card/40 p-6"
          >
            <h2 className="text-lg font-semibold text-foreground">{feature.title}</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{feature.description}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
