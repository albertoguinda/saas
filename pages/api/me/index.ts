// pages/api/me/index.ts
import type { NextApiRequest, NextApiResponse } from "next";

import { getServerSession } from "next-auth/next";

import dbConnect from "@/lib/dbConnect";
import User from "@/lib/models/user";
import { authOptions } from "@/lib/auth";

// Devuelve los datos del usuario autenticado
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await dbConnect();
  const session = await getServerSession(req, res, authOptions);

  if (!session?.user?.id) {
    return res.status(401).json({ error: "No autenticado" });
  }

  if (req.method === "GET") {
    try {
      const user = await User.findById(session.user.id).select(
        "name email plan createdAt",
      );

      if (!user)
        return res.status(404).json({ error: "Usuario no encontrado" });

      return res.status(200).json({ user });
    } catch {
      return res.status(500).json({ error: "Error al cargar perfil" });
    }
  }

  res.setHeader("Allow", ["GET"]);

  return res.status(405).json({ error: "Método no soportado" });
}

/*
  - Devuelve name, email, plan y fecha de creación del usuario autenticado.
  - Protección por sesión.
*/
