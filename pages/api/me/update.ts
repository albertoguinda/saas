// pages/api/me/update.ts

import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import User from "@/lib/models/user";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import bcrypt from "bcryptjs";

/**
 * Endpoint PATCH /api/me/update
 * Permite al usuario autenticado actualizar su perfil (nombre, password, avatar)
 * Solo permite PATCH y requiere sesión activa.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "PATCH") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  await dbConnect();

  // Protege con sesión
  const session = await getServerSession(req, res, authOptions);
  if (!session?.user?.email) {
    return res.status(401).json({ error: "No autenticado" });
  }

  try {
    // Busca el usuario por email
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const { name, password, avatar } = req.body;

    // Actualiza nombre (si llega y es válido)
    if (typeof name === "string" && name.trim()) {
      user.name = name.trim();
    }

    // Actualiza password (opcional, si cumple longitud)
    if (typeof password === "string" && password.length >= 6) {
      user.password = await bcrypt.hash(password, 12);
    }

    // Actualiza avatar (solo si es emoji/string muy corto)
    if (
      typeof avatar === "string" &&
      avatar.length > 0 &&
      avatar.length <= 4
    ) {
      user.avatar = avatar;
    }

    await user.save();

    // Elimina el password antes de devolver el usuario actualizado
    const userObj = user.toObject();
    delete userObj.password;

    return res.status(200).json({ user: userObj });
  } catch (err) {
    // Log detallado solo en desarrollo
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.error("[API] Error actualizando perfil:", err);
    }
    return res.status(500).json({ error: "Error actualizando perfil" });
  }
}

/*
  - Solo PATCH permitido.
  - Solo usuario autenticado.
  - Actualiza: name, password, avatar.
  - Valida entradas.
  - No expone el password.
  - Si extiendes los campos en el futuro (bio, social, etc.), añade más validación.
*/
