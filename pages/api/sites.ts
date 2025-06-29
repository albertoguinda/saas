// pages/api/sites.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import dbConnect from "@/lib/dbConnect";
import Site from "@/lib/models/site";
import User from "@/lib/models/user";
import { authOptions } from "./auth/[...nextauth]"; // Ajusta si tienes tu config en otro archivo

// Limite de proyectos para FREE (puedes moverlo a config)
const FREE_PROJECT_LIMIT = 1;

// Utilidad para generar slugs simples
function slugify(str: string) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Conecta con la base de datos (evita múltiples conexiones)
  await dbConnect();

  // Verifica sesión
  const session = await getServerSession(req, res, authOptions);
  if (!session || !session.user?.email)
    return res.status(401).json({ error: "No autenticado" });

  // Busca usuario actual
  const user = await User.findOne({ email: session.user.email });
  if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

  // Maneja métodos HTTP
  switch (req.method) {
    case "GET": {
      // Devuelve todos los sitios del usuario
      const sites = await Site.find({ userId: user._id }).sort({ createdAt: -1 });
      return res.status(200).json({ sites });
    }

    case "POST": {
      // Limita a 1 proyecto si es FREE
      const count = await Site.countDocuments({ userId: user._id });
      if (user.plan === "free" && count >= FREE_PROJECT_LIMIT)
        return res
          .status(403)
          .json({ error: "Límite alcanzado en el plan gratuito" });

      const { title, slug, structure } = req.body;
      if (!title)
        return res.status(400).json({ error: "El título es obligatorio" });

      // Slug único por usuario
      const finalSlug = slug
        ? slugify(slug)
        : slugify(title) + "-" + Math.random().toString(36).slice(2, 7);

      // Verifica que no exista ya un sitio con ese slug para ese usuario
      const exists = await Site.findOne({ userId: user._id, slug: finalSlug });
      if (exists)
        return res.status(409).json({ error: "El slug ya existe" });

      // Crea el sitio
      const site = await Site.create({
        userId: user._id,
        title,
        slug: finalSlug,
        structure: structure || {},
      });

      return res.status(201).json({ site });
    }

    default:
      return res.status(405).json({ error: "Método no permitido" });
  }
}
