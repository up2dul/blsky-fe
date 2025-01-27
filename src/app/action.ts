"use server";

import { db } from "@/lib/db";
import type { Message } from "@/lib/types";

export async function getMessages() {
  return await db.selectFrom("messages").selectAll().execute() as Message[];
}

export async function addMessage(message: string) {
  await db
    .insertInto("messages")
    .columns(["content"])
    .values({ content: message })
    .executeTakeFirst();
}

export async function deleteAllMessages() {
  await db.deleteFrom("messages").executeTakeFirst();
}
