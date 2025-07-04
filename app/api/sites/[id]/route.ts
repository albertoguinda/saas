import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import dbConnect from "@/lib/dbConnect";
import Site from "@/lib/models/site";
import { authOptions } from "@/lib/auth";
import { logger } from "@/lib/logger";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const { id } = params;
  if (!id) {
    return NextResponse.json({ error: "ID inválido" }, { status: 400 });
  }

  try {
    const body = await req.json();
    const { title, structure } = body as { title?: string; structure?: any };
    const site = await Site.findOne({ _id: id, userId: session.user.id });

    if (!site) {
      return NextResponse.json({ error: "Proyecto no encontrado" }, { status: 404 });
    }

    if (title !== undefined) {
      if (typeof title !== "string" || !title.trim()) {
        return NextResponse.json({ error: "Título inválido" }, { status: 400 });
      }
      site.title = title.trim();
    }

    if (structure !== undefined) {
      site.structure = structure;
    }

    await site.save();

    return NextResponse.json({ site });
  } catch (err) {
    logger.error(err);
    return NextResponse.json({ error: "Error actualizando el proyecto" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const { id } = params;
  if (!id) {
    return NextResponse.json({ error: "ID inválido" }, { status: 400 });
  }

  try {
    const site = await Site.findOne({ _id: id, userId: session.user.id });
    if (!site) {
      return NextResponse.json({ error: "Proyecto no encontrado" }, { status: 404 });
    }
    await site.deleteOne();
    return NextResponse.json({ ok: true, message: "Proyecto eliminado" });
  } catch (err) {
    logger.error(err);
    return NextResponse.json({ error: "Error al borrar el proyecto" }, { status: 500 });
  }
}
