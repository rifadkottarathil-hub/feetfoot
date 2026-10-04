import { readFileSync } from "fs";
import { config } from "dotenv";
import { Client } from "pg";

config({ path: ".env.local" });

const file = process.argv[2];
if (!file) {
  console.error("Usage: node scripts/run-migration.mjs <path-to-sql-file>");
  process.exit(1);
}

if (!process.env.SUPABASE_DB_URL) {
  console.error("SUPABASE_DB_URL is not set in .env.local");
  process.exit(1);
}

const sql = readFileSync(file, "utf8");

const client = new Client({
  connectionString: process.env.SUPABASE_DB_URL,
  ssl: { rejectUnauthorized: false },
});

await client.connect();
console.log(`Connected. Running ${file} ...`);
try {
  await client.query(sql);
  console.log("Migration applied successfully.");
} finally {
  await client.end();
}
