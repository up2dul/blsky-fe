"use server";

import { db } from "@/lib/db";

export async function getMessages() {
  return await db.selectFrom("messages").selectAll().execute();
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
