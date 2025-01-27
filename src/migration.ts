import { sql } from "kysely";
import { db } from "@/lib/db";

async function migrate() {
  await db.schema
    .createTable("messages")
    .addColumn("id", "integer", (col) => col.primaryKey().generatedAlwaysAsIdentity())
    .addColumn("content", "text")
    .addColumn("timestamp", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .execute();
}

migrate()
  .then(() => {
    console.log("Migration successful!");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
