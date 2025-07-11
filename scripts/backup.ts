import "dotenv/config";
import fs from "fs/promises";

import dbConnect from "../lib/dbConnect";
import Site from "../lib/models/site";

async function main() {
  await dbConnect();

  const sites = await Site.find().lean();

  await fs.writeFile("backup.json", JSON.stringify({ sites }, null, 2));

  console.log("✅ Backup guardado en backup.json");
}

main().catch((err) => {
  console.error("Error de backup:", err);
});
