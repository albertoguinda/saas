import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import User from "@/lib/models/user";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// Permite que el usuario suba o actualice su avatar (base64 o URL)
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  const session = await getServerSession(req, res, authOptions);

  if (!session?.user?.email) {
    return res.status(401).json({ error: "No autenticado" });
  }

  if (req.method !== "PATCH") {
    return res.status(405).json({ error: "Método no soportado" });
  }

  try {
    const { avatar } = req.body;
    if (!avatar || typeof avatar !== "string") {
      return res.status(400).json({ error: "Avatar no válido" });
    }

    // Busca y actualiza el avatar del usuario autenticado
    const user = await User.findOneAndUpdate(
      { email: session.user.email },
      { avatar },
      { new: true }
    );

    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

    return res.status(200).json({ ok: true, avatar: user.avatar });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error actualizando avatar" });
  }
}

/*
  - Solo PATCH soportado.
  - Espera { avatar: "base64_o_url" } en el body.
  - Protegido por sesión (solo el usuario puede actualizar su propio avatar).
  - Responde con el avatar actualizado o error.
*/
