/**
 * Seed MongoDB with the scraped dataset (clears + re-inserts each collection).
 * Requires MONGODB_URI in the environment (.env.local).
 * Run:  npm run db:seed
 */
import "./load-env";
import mongoose from "mongoose";

import { connectDB } from "../lib/mongodb";
import { models } from "../lib/models";
import { dataset } from "../lib/dataset";

async function main() {
  if (!process.env.MONGODB_URI) {
    console.error("✗ MONGODB_URI is not set. Add it to .env.local first.");
    process.exit(1);
  }

  await connectDB();
  console.log("Connected to MongoDB.");

  for (const [name, model] of Object.entries(models)) {
    const records = dataset[name as keyof typeof dataset] ?? [];
    await model.deleteMany({});
    if (records.length) await model.insertMany(records, { ordered: false });
    console.log(`✓ ${name.padEnd(20)} seeded ${records.length} documents`);
  }

  await mongoose.disconnect();
  console.log("\nDone. Database seeded and connection closed.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
