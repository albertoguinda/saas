import "dotenv/config";
import dbConnect from "../lib/dbConnect";
import Site from "../lib/models/site";
import Legal from "../lib/models/legal";

async function main() {
  await dbConnect();
  const sites = await Site.find();
  const missing: string[] = [];

  for (const site of sites) {
    const count = await Legal.countDocuments({ siteId: site._id });
    if (count < 3) missing.push(site.slug);
  }

  if (missing.length) {
    console.log("Sitios sin legales:", missing.join(", "));
    process.exit(1);
  }

  console.log("Todos los sitios tienen textos legales.");
}

main();
