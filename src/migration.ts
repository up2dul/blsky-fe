import { sql } from "kysely";
import { db } from "@/lib/db";

async function migrate() {
  await db.schema
    .createTable("message")
    .addColumn("id", "integer", (col) => col.primaryKey())
    .addColumn("content", "text")
    .addColumn("timestamp", "date", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .execute();
}

migrate()
  .then(() => {
    console.log("Migration successful!");
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
