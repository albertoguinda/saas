// scripts/reset.ts - uses dbConnect.ts
import "dotenv/config";
import mongoose from "mongoose";
import dbConnect from "../lib/dbConnect";
import { logger } from "@/lib/logger";

async function main() {
  await dbConnect();

  await mongoose.connection.db.dropDatabase();

  console.log("✅ Base de datos borrada");
  mongoose.connection.close();
}

main().catch((err) => {
  logger.error(err);
  mongoose.connection.close();
});
