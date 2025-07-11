import { readFileSync, readdirSync, statSync } from "fs";
import { join, resolve } from "path";

/** Recursively collect .ts and .tsx files from a directory. */
function walk(dir: string): string[] {
  const files: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stats = statSync(full);
    if (stats.isDirectory()) files.push(...walk(full));
    else if (full.endsWith(".ts") || full.endsWith(".tsx")) files.push(full);
  }
  return files;
}

/** Extract translation keys used via t('key') in a file. */
function extractKeys(file: string): string[] {
  const content = readFileSync(file, "utf8");
  const regex = /\bt\(["'`]([^"'`]+)["'`]\)/g;
  const keys: string[] = [];
  let match: RegExpExecArray | null;
  while ((match = regex.exec(content))) {
    keys.push(match[1]);
  }
  return keys;
}

function main() {
  const codeDirs = ["app", "pages", "components"];
  const usedKeys = new Set<string>();
  for (const dir of codeDirs) {
    for (const file of walk(resolve(dir))) {
      extractKeys(file).forEach((k) => usedKeys.add(k));
    }
  }

  const messagesDir = resolve("messages");
  const locales = readdirSync(messagesDir).filter((f) => f.endsWith(".json"));
  let hasMissing = false;

  for (const locale of locales) {
    const data = JSON.parse(
      readFileSync(join(messagesDir, locale), "utf8"),
    ) as Record<string, string>;
    const keys = Object.keys(data);
    const missing = Array.from(usedKeys).filter((k) => !keys.includes(k));
    const unused = keys.filter((k) => !usedKeys.has(k));

    if (missing.length) {
      console.log(`\nMissing keys in ${locale}:`, missing.join(", "));
      hasMissing = true;
    }
    if (unused.length) {
      console.log(`\nUnused keys in ${locale}:`, unused.join(", "));
    }
  }

  if (hasMissing) process.exitCode = 1;
  else console.log("\nAll translation keys are in use and present.");
}

main();
