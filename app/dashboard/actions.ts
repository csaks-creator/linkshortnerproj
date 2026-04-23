"use server";

import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import { createLink, shortCodeExists, shortCodeExistsExcluding, updateLink, deleteLinkByIdAndUserId } from "@/data/links";

const createLinkSchema = z.object({
  url: z.string().url("Please enter a valid URL"),
  shortCode: z
    .string()
    .min(2, "Short code must be at least 2 characters")
    .max(32, "Short code must be at most 32 characters")
    .regex(/^[a-zA-Z0-9_-]+$/, "Only letters, numbers, hyphens, and underscores are allowed")
    .optional(),
});

function generateShortCode(): string {
  return Math.random().toString(36).slice(2, 8);
}

export async function createLinkAction(input: { url: string; shortCode?: string }) {
  const { userId } = await auth();
  if (!userId) return { error: "Unauthorized" };

  const parsed = createLinkSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  let shortCode = parsed.data.shortCode?.trim() || generateShortCode();

  const exists = await shortCodeExists(shortCode);
  if (exists) {
    return { error: "That short code is already taken. Please choose a different one." };
  }

  try {
    const link = await createLink({ userId, url: parsed.data.url, shortCode });
    return { success: true, link };
  } catch {
    return { error: "Failed to create link. Please try again." };
  }
}

const shortCodeRule = z
  .string()
  .min(2, "Short code must be at least 2 characters")
  .max(32, "Short code must be at most 32 characters")
  .regex(/^[a-zA-Z0-9_-]+$/, "Only letters, numbers, hyphens, and underscores are allowed");

const updateLinkSchema = z.object({
  id: z.number().int().positive(),
  url: z.string().url("Please enter a valid URL"),
  shortCode: shortCodeRule,
});

export async function updateLinkAction(input: { id: number; url: string; shortCode: string }) {
  const { userId } = await auth();
  if (!userId) return { error: "Unauthorized" };

  const parsed = updateLinkSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const taken = await shortCodeExistsExcluding(parsed.data.shortCode, parsed.data.id);
  if (taken) {
    return { error: "That short code is already taken. Please choose a different one." };
  }

  try {
    const link = await updateLink({
      id: parsed.data.id,
      userId,
      url: parsed.data.url,
      shortCode: parsed.data.shortCode,
    });
    if (!link) return { error: "Link not found or you do not have permission to edit it." };
    return { success: true, link };
  } catch {
    return { error: "Failed to update link. Please try again." };
  }
}

const deleteLinkSchema = z.object({
  id: z.number().int().positive(),
});

export async function deleteLinkAction(input: { id: number }) {
  const { userId } = await auth();
  if (!userId) return { error: "Unauthorized" };

  const parsed = deleteLinkSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  try {
    await deleteLinkByIdAndUserId({ id: parsed.data.id, userId });
    return { success: true };
  } catch {
    return { error: "Failed to delete link. Please try again." };
  }
}
