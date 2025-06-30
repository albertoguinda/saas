// pages/api/sites/index.ts
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import Site from "@/lib/models/site";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

// Solo autenticados pueden acceder a sus proyectos
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  const session = await getServerSession(req, res, authOptions);

  if (!session?.user?.id) {
    return res.status(401).json({ error: "No autenticado" });
  }

  // GET: Listar proyectos del usuario
  if (req.method === "GET") {
    try {
      const sites = await Site.find({ userId: session.user.id }).sort({ createdAt: -1 });
      return res.status(200).json({ sites });
    } catch (err) {
      console.error(err);
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

      // Límite de 1 proyecto en plan FREE (ajusta según plan del usuario)
      const count = await Site.countDocuments({ userId: session.user.id });
      if (count >= 1) {
        return res.status(403).json({ error: "Límite de proyectos alcanzado para tu plan" });
      }

      // Genera un slug único básico (ajusta si quieres evitar colisiones)
      const slug = (
        title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, "") +
        "-" +
        Math.random().toString(36).substring(2, 6)
      );

      // Crea el proyecto
      const site = await Site.create({
        userId: session.user.id,
        title: title.trim(),
        slug,
        structure: {},
      });

      return res.status(201).json({ site });
    } catch (err) {
      console.error(err);
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
