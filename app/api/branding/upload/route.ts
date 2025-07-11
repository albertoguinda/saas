import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import Branding from "@/lib/models/branding";
import { uploadImage } from "@/lib/storage";
import { invalidateSite } from "@/lib/cache";

/**
 * Upload branding image (logo or favicon) and store URL.
 */

export const POST = async (req: NextRequest) => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  let form: FormData;

  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: "Formato inválido" }, { status: 400 });
  }

  const file = form.get("file");
  const type = form.get("type") as string;

  if (!(file instanceof Blob) || (type !== "logo" && type !== "favicon")) {
    return NextResponse.json({ error: "Archivo inválido" }, { status: 400 });
  }
  if (file.size > 2 * 1024 * 1024) {
    return NextResponse.json(
      { error: "Archivo demasiado grande" },
      { status: 400 },
    );
  }

  try {
    const url = await uploadImage(file);

    await dbConnect();
    await Branding.findOneAndUpdate(
      { userId: session.user.id },
      { [type]: url },
      { upsert: true },
    );

    const { default: Site } = await import("@/lib/models/site");
    const sites = await Site.find({ userId: session.user.id });

    await Promise.all(sites.map((s) => invalidateSite(s.slug)));

    return NextResponse.json({ ok: true, url });
  } catch {
    return NextResponse.json({ error: "Error subiendo" }, { status: 500 });
  }
};
