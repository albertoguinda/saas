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
    const { avatar } = (await request.json()) as { avatar?: string };

    if (!avatar || typeof avatar !== "string") {
      return NextResponse.json({ error: "Avatar no válido" }, { status: 400 });
    }

    const user = await User.findOneAndUpdate(
      { email: session.user.email },
      { avatar },
      { new: true },
    );

    if (!user) {
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
    }

    return NextResponse.json({ ok: true, avatar: user.avatar });
  } catch (err) {
    logger.error(err);
    return NextResponse.json({ error: "Error actualizando avatar" }, { status: 500 });
  }
}
