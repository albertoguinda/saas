// pages/api/sites/[id].ts
import type { NextApiRequest, NextApiResponse } from "next";

import { getServerSession } from "next-auth";

import dbConnect from "@/lib/dbConnect";
import Site from "@/lib/models/site";
import { authOptions } from "@/lib/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await dbConnect();
  const session = await getServerSession(req, res, authOptions);

  // Solo autenticados pueden operar
  if (!session?.user?.email) {
    return res.status(401).json({ error: "No autenticado" });
  }

  // Valida que `id` sea string (Next a veces lo da como string[])
  const id = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id;

  if (!id || typeof id !== "string") {
    return res.status(400).json({ error: "ID inválido" });
  }

  // PATCH: Actualiza título y/o estructura
  if (req.method === "PATCH") {
    try {
      const { title, structure } = req.body as {
        title?: string;
        structure?: any;
      };
      // Busca el proyecto del usuario
      const site = await Site.findOne({ _id: id, userId: session.user.id });

      if (!site)
        return res.status(404).json({ error: "Proyecto no encontrado" });

      // Validación: el título, si lo envían, no puede ser vacío
      if (title !== undefined) {
        if (typeof title !== "string" || !title.trim()) {
          return res.status(400).json({ error: "Título inválido" });
        }
        site.title = title.trim();
      }
      if (structure !== undefined) {
        site.structure = structure; // valida la estructura según tu modelo
      }

      await site.save();

      return res.status(200).json({ site });
    } catch (err) {
      if (process.env.NODE_ENV !== "production") {
        // eslint-disable-next-line no-console
        console.error(err);
      }

      return res.status(500).json({ error: "Error actualizando el proyecto" });
    }
  }

  // DELETE: Elimina proyecto si es del usuario
  if (req.method === "DELETE") {
    try {
      const site = await Site.findOne({ _id: id, userId: session.user.id });

      if (!site)
        return res.status(404).json({ error: "Proyecto no encontrado" });
      await site.deleteOne();

      return res.status(200).json({ ok: true, message: "Proyecto eliminado" });
    } catch (err) {
      if (process.env.NODE_ENV !== "production") {
        // eslint-disable-next-line no-console
        console.error(err);
      }

      return res.status(500).json({ error: "Error al borrar el proyecto" });
    }
  }

  // Otros métodos no permitidos
  res.setHeader("Allow", ["PATCH", "DELETE"]);

  return res.status(405).json({ error: "Método no soportado" });
}

/*
  - PATCH: Edición de título y estructura, con validación básica.
  - DELETE: Solo borra si el proyecto es del usuario autenticado.
  - Protegido por sesión NextAuth.
  - Valida el parámetro id y los inputs.
  - Preparado para escalar campos y validaciones.
*/
