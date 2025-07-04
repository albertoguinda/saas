import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import dbConnect from "@/lib/dbConnect";
import Site from "@/lib/models/site";
import Event from "@/lib/models/event";
import { authOptions } from "@/lib/auth";
import { logger } from "@/lib/logger";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const { id } = params;
  if (!id) {
    return NextResponse.json({ error: "ID inválido" }, { status: 400 });
  }

  try {
    const { title, slug, template, color, font } = (await req.json()) as {
      title?: string;
      slug?: string;
      template?: string;
      color?: string;
      font?: string;
    };

    if (!title || typeof title !== "string" || !title.trim()) {
      return NextResponse.json({ error: "Título requerido" }, { status: 400 });
    }

    if (!slug || typeof slug !== "string" || !/^[a-z0-9-]+$/.test(slug)) {
      return NextResponse.json({ error: "Slug inválido" }, { status: 400 });
    }

    if (template !== "one-page" && template !== "blog") {
      return NextResponse.json({ error: "Plantilla inválida" }, { status: 400 });
    }
    if (color !== "indigo" && color !== "emerald" && color !== "rose") {
      return NextResponse.json({ error: "Color inválido" }, { status: 400 });
    }
    if (font !== "sans" && font !== "serif" && font !== "mono") {
      return NextResponse.json({ error: "Fuente inválida" }, { status: 400 });
    }

    const existing = await Site.findOne({ slug });
    if (existing && existing._id.toString() !== id) {
      return NextResponse.json({ error: "Slug ya existe" }, { status: 400 });
    }

    const site = await Site.findOne({ _id: id, userId: session.user.id });
    if (!site) {
      return NextResponse.json({ error: "Proyecto no encontrado" }, { status: 404 });
    }

    site.title = title.trim();
    site.slug = slug;
    site.structure = { template, color, font };
    await site.save();

    try {
      await Event.create({ userId: session.user.id, event: "wizard_completed" });
    } catch (err) {
      logger.error(err);
    }

    return NextResponse.json({ site });
  } catch (err) {
    logger.error(err);
    return NextResponse.json({ error: "Error al generar el sitio" }, { status: 500 });
  }
}
