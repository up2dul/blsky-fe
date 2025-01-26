"use server";

import type { Message } from "@/lib/types";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

export async function getMessages() {
  return (await sql`SELECT * FROM message`) as Message[];
}

export async function addMessage(message: string) {
  await sql`INSERT INTO message (content) VALUES (${message})`;
}
