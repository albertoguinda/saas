import { getServerSession } from "next-auth";
import JSZip from "jszip";

import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import User from "@/lib/models/user";
import Site from "@/lib/models/site";
import { logger } from "@/lib/logger";

export const POST = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return new Response(JSON.stringify({ error: "No autenticado" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  await dbConnect();

  const user = await User.findById(session.user.id);
  const sites = await Site.find({ userId: session.user.id });

  const zip = new JSZip();

  zip.file("backup.json", JSON.stringify({ user, sites }, null, 2));

  const content = await zip.generateAsync({ type: "nodebuffer" });

  logger.info("Backup generado para", session.user.id);

  return new Response(content, {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": "attachment; filename=backup.zip",
    },
  });
};
