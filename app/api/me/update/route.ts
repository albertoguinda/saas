import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import dbConnect from "@/lib/dbConnect";
import User from "@/lib/models/user";
import { authOptions } from "@/lib/auth";
import { logger } from "@/lib/logger";

export async function PATCH(request: NextRequest) {
  await dbConnect();
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const user = await User.findOne({ email: session.user.email });

    if (!user) {
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
    }

    const { name, password, avatar } = body as {
      name?: string;
      password?: string;
      avatar?: string;
    };

    if (typeof name === "string" && name.trim()) {
      user.name = name.trim();
    }

    if (typeof password === "string" && password.length >= 6) {
      user.password = password;
    }

    if (typeof avatar === "string" && avatar.length > 0 && avatar.length <= 4) {
      user.avatar = avatar;
    }

    await user.save();
    const userObj = user.toObject();
    delete userObj.password;

    return NextResponse.json({ user: userObj });
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      logger.error("[API] Error actualizando perfil:", err);
    }
    return NextResponse.json({ error: "Error actualizando perfil" }, { status: 500 });
  }
}
