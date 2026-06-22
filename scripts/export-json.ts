/**
 * Export every scraped collection to data/json/*.json (+ a combined all.json).
 * Run:  npm run export:json
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

import { dataset } from "../lib/dataset";

const OUT_DIR = join(process.cwd(), "data", "json");

function main() {
  mkdirSync(OUT_DIR, { recursive: true });

  let totalRecords = 0;
  for (const [name, records] of Object.entries(dataset)) {
    const file = join(OUT_DIR, `${name}.json`);
    writeFileSync(file, JSON.stringify(records, null, 2), "utf8");
    totalRecords += records.length;
    console.log(`✓ ${name.padEnd(20)} ${records.length} records -> ${file}`);
  }

  // Combined dump with light metadata.
  const all = {
    generatedAt: new Date().toISOString(),
    counts: Object.fromEntries(
      Object.entries(dataset).map(([k, v]) => [k, v.length])
    ),
    data: dataset,
  };
  writeFileSync(join(OUT_DIR, "all.json"), JSON.stringify(all, null, 2), "utf8");

  console.log(
    `\nDone. ${Object.keys(dataset).length} collections, ${totalRecords} records -> data/json/`
  );
}

main();
