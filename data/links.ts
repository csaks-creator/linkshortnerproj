import { and, desc, eq, ne } from "drizzle-orm";
import db from "@/db";
import { links } from "@/db/schema";

export async function getLinksByUserId(userId: string) {
  return db
    .select()
    .from(links)
    .where(eq(links.userId, userId))
    .orderBy(desc(links.updatedAt));
}

export async function createLink({
  userId,
  url,
  shortCode,
}: {
  userId: string;
  url: string;
  shortCode: string;
}) {
  const [link] = await db
    .insert(links)
    .values({ userId, url, shortCode })
    .returning();
  return link;
}

export async function getLinkByShortCode(shortCode: string) {
  const [link] = await db
    .select()
    .from(links)
    .where(eq(links.shortCode, shortCode))
    .limit(1);
  return link ?? null;
}

export async function shortCodeExists(shortCode: string): Promise<boolean> {
  const [row] = await db
    .select({ id: links.id })
    .from(links)
    .where(eq(links.shortCode, shortCode))
    .limit(1);
  return !!row;
}

export async function shortCodeExistsExcluding(
  shortCode: string,
  excludeId: number,
): Promise<boolean> {
  const [row] = await db
    .select({ id: links.id })
    .from(links)
    .where(and(eq(links.shortCode, shortCode), ne(links.id, excludeId)))
    .limit(1);
  return !!row;
}

export async function updateLink({
  id,
  userId,
  url,
  shortCode,
}: {
  id: number;
  userId: string;
  url: string;
  shortCode: string;
}) {
  const [link] = await db
    .update(links)
    .set({ url, shortCode, updatedAt: new Date() })
    .where(and(eq(links.id, id), eq(links.userId, userId)))
    .returning();
  return link;
}

export async function deleteLinkByIdAndUserId({
  id,
  userId,
}: {
  id: number;
  userId: string;
}) {
  await db
    .delete(links)
    .where(and(eq(links.id, id), eq(links.userId, userId)));
}
