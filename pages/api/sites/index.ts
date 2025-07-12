// pages/api/sites/index.ts
import type { NextApiRequest, NextApiResponse } from "next";

import { getServerSession } from "next-auth/next";

import dbConnect from "@/lib/dbConnect";
import Site from "@/lib/models/site";
import { authOptions } from "@/lib/auth";
import { withAuthPlan } from "@/lib/middlewares/withAuthPlan";
import { logger } from "@/lib/logger";
import { FREE_PROJECT_LIMIT } from "@/config/constants";
import { createBackup } from "@/lib/backups";
import { getUserSites, setUserSites, invalidateUserSites } from "@/lib/cache";

// Solo autenticados pueden acceder a sus proyectos
async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  const session = await getServerSession(req, res, authOptions);

  // GET: Listar proyectos o verificar un slug
  if (req.method === "GET") {
    try {
      const slug = Array.isArray(req.query.slug)
        ? req.query.slug[0]
        : req.query.slug;

      if (slug) {
        if (typeof slug !== "string" || !slug.trim()) {
          return res.status(400).json({ error: "Slug inválido" });
        }

        const exists = await Site.exists({ slug });

        return res.status(200).json({ exists: Boolean(exists) });
      }

      const cached = await getUserSites(session.user.id);

      if (cached) {
        return res.status(200).json({ sites: JSON.parse(cached) });
      }

      const sites = await Site.find({ userId: session.user.id }).sort({
        createdAt: -1,
      });

      try {
        await setUserSites(session.user.id, JSON.stringify(sites));
      } catch (err) {
        logger.warn("[cache] set user sites failed", err);
      }

      return res.status(200).json({ sites });
    } catch (err) {
      logger.error(err);

      return res.status(500).json({ error: "Error al cargar los proyectos" });
    }
  }

  // POST: Crear nuevo proyecto (limitando por plan FREE)
  if (req.method === "POST") {
    try {
      const { title } = req.body as { title?: string };

      if (!title || typeof title !== "string" || !title.trim()) {
        return res.status(400).json({ error: "Título obligatorio" });
      }

      // Límite de proyectos para plan FREE
      const count = await Site.countDocuments({ userId: session.user.id });

      if (session.user.plan === "free" && count >= FREE_PROJECT_LIMIT) {
        return res
          .status(403)
          .json({ error: "Límite de proyectos alcanzado para tu plan" });
      }

      // Genera un slug único básico (ajusta si quieres evitar colisiones)
      const slug =
        title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, "") +
        "-" +
        Math.random().toString(36).substring(2, 6);

      // Crea el proyecto
      const site = await Site.create({
        userId: session.user.id,
        title: title.trim(),
        slug,
        structure: {},
      });

      await createBackup(session.user.id, "auto");

      try {
        await invalidateUserSites(session.user.id);
      } catch (err) {
        logger.warn("[cache] invalidate user sites failed", err);
      }

      return res.status(201).json({ site });
    } catch (err) {
      logger.error(err);

      return res.status(500).json({ error: "Error al crear el proyecto" });
    }
  }

  // Métodos no soportados
  res.setHeader("Allow", ["GET", "POST"]);

  return res.status(405).json({ error: "Método no soportado" });
}

/*
  - GET: Devuelve todos los proyectos del usuario autenticado.
  - POST: Crea un nuevo proyecto (limitado a 1 en plan FREE).
  - Validación de inputs y errores claros.
  - Slug único sencillo, mejora si necesitas SEO.
  - Protegido por sesión NextAuth.
*/

export default withAuthPlan(handler, "FREE");
