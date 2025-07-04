// pages/api/projects/[id]/generate.ts
import type { NextApiRequest, NextApiResponse } from "next";

import { getServerSession } from "next-auth/next";

import dbConnect from "@/lib/dbConnect";
import Site from "@/lib/models/site";
import Event from "@/lib/models/event";
import { authOptions } from "@/lib/auth";
import { logger } from "@/lib/logger";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await dbConnect();
  const session = await getServerSession(req, res, authOptions);

  if (!session?.user?.id) {
    return res.status(401).json({ error: "No autenticado" });
  }

  const id = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id;

  if (!id || typeof id !== "string") {
    return res.status(400).json({ error: "ID inválido" });
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);

    return res.status(405).json({ error: "Método no soportado" });
  }

  try {
    const { title, slug, template, color, font } = req.body as {
      title?: string;
      slug?: string;
      template?: string;
      color?: string;
      font?: string;
    };

    if (!title || typeof title !== "string" || !title.trim()) {
      return res.status(400).json({ error: "Título requerido" });
    }

    if (!slug || typeof slug !== "string" || !/^[a-z0-9-]+$/.test(slug)) {
      return res.status(400).json({ error: "Slug inválido" });
    }

    if (template !== "one-page" && template !== "blog") {
      return res.status(400).json({ error: "Plantilla inválida" });
    }
    if (color !== "indigo" && color !== "emerald" && color !== "rose") {
      return res.status(400).json({ error: "Color inválido" });
    }
    if (font !== "sans" && font !== "serif" && font !== "mono") {
      return res.status(400).json({ error: "Fuente inválida" });
    }

    const existing = await Site.findOne({ slug });

    if (existing && existing._id.toString() !== id) {
      return res.status(400).json({ error: "Slug ya existe" });
    }

    const site = await Site.findOne({ _id: id, userId: session.user.id });

    if (!site) return res.status(404).json({ error: "Proyecto no encontrado" });

    site.title = title.trim();
    site.slug = slug;
    site.structure = { template, color, font };
    await site.save();

    try {
      await Event.create({ userId: session.user.id, event: "wizard_completed" });
    } catch (err) {
      logger.error(err);
    }

    return res.status(200).json({ site });
  } catch (err) {
    logger.error(err);

    return res.status(500).json({ error: "Error al generar el sitio" });
  }
}
