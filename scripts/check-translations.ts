import { readFileSync } from "fs";
import { resolve } from "path";

const en = JSON.parse(
  readFileSync(resolve("messages/en.json"), "utf8"),
) as Record<string, string>;
const es = JSON.parse(
  readFileSync(resolve("messages/es.json"), "utf8"),
) as Record<string, string>;

const enKeys = Object.keys(en);
const esKeys = Object.keys(es);

const missingInEs = enKeys.filter((k) => !esKeys.includes(k));
const missingInEn = esKeys.filter((k) => !enKeys.includes(k));

if (missingInEs.length || missingInEn.length) {
  console.log("Missing keys:");
  if (missingInEs.length)
    console.log("\n→ es.json lacks:", missingInEs.join(", "));
  if (missingInEn.length)
    console.log("\n→ en.json lacks:", missingInEn.join(", "));
  process.exitCode = 1;
} else {
  console.log("All translation keys are synchronized.");
}
