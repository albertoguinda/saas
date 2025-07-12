import { getServerSession } from "next-auth";
import JSZip from "jszip";

import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import User from "@/lib/models/user";
import Site from "@/lib/models/site";
import { logger } from "@/lib/logger";

export const POST = async (req: Request) => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return new Response(JSON.stringify({ error: "No autenticado" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  let form: FormData;

  try {
    form = await req.formData();
  } catch {
    return new Response(JSON.stringify({ error: "Formato inválido" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const file = form.get("file") as Blob | null;

  if (!file) {
    return new Response(JSON.stringify({ error: "Archivo inválido" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  await dbConnect();

  let data: any = {};

  try {
    const buf = Buffer.from(await file.arrayBuffer());

    if (file.type === "application/zip") {
      const zip = await JSZip.loadAsync(buf);
      const content = await zip.file("backup.json")?.async("string");

      if (content) data = JSON.parse(content);
    } else {
      data = JSON.parse(buf.toString());
    }
  } catch {
    return new Response(JSON.stringify({ error: "No válido" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (data.user?._id !== session.user.id) {
    return new Response(JSON.stringify({ error: "Datos inválidos" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  await User.updateOne({ _id: session.user.id }, data.user);
  await Site.deleteMany({ userId: session.user.id });
  if (Array.isArray(data.sites) && data.sites.length) {
    await Site.insertMany(
      data.sites.map((s: any) => ({ ...s, userId: session.user.id })),
    );
  }

  logger.info("Backup restaurado para", session.user.id);

  return new Response(JSON.stringify({ ok: true }), {
    headers: { "Content-Type": "application/json" },
  });
};
