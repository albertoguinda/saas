import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import dbConnect from "@/lib/dbConnect";
import Site from "@/lib/models/site";
import { authOptions } from "@/lib/auth";
import { logger } from "@/lib/logger";
import { FREE_PROJECT_LIMIT } from "@/config/constants";

export async function GET(req: NextRequest) {
  await dbConnect();
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  try {
    const slug = req.nextUrl.searchParams.get("slug");
    if (slug) {
      if (!slug.trim()) {
        return NextResponse.json({ error: "Slug inválido" }, { status: 400 });
      }
      const exists = await Site.exists({ slug });
      return NextResponse.json({ exists: Boolean(exists) });
    }

    const sites = await Site.find({ userId: session.user.id }).sort({ createdAt: -1 });
    return NextResponse.json({ sites });
  } catch (err) {
    logger.error(err);
    return NextResponse.json({ error: "Error al cargar los proyectos" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  await dbConnect();
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  try {
    const { title } = (await req.json()) as { title?: string };
    if (!title || typeof title !== "string" || !title.trim()) {
      return NextResponse.json({ error: "Título obligatorio" }, { status: 400 });
    }

    const count = await Site.countDocuments({ userId: session.user.id });
    if (session.user.plan === "free" && count >= FREE_PROJECT_LIMIT) {
      return NextResponse.json(
        { error: "Límite de proyectos alcanzado para tu plan" },
        { status: 403 },
      );
    }

    const slug =
      title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "") +
      "-" +
      Math.random().toString(36).substring(2, 6);

    const site = await Site.create({
      userId: session.user.id,
      title: title.trim(),
      slug,
      structure: {},
    });

    return NextResponse.json({ site }, { status: 201 });
  } catch (err) {
    logger.error(err);
    return NextResponse.json({ error: "Error al crear el proyecto" }, { status: 500 });
  }
}
