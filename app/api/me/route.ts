import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import dbConnect from "@/lib/dbConnect";
import User from "@/lib/models/user";
import { authOptions } from "@/lib/auth";

export async function GET(_req: NextRequest) {
  await dbConnect();
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  try {
    const user = await User.findById(session.user.id).select(
      "name email plan createdAt",
    );
    if (!user) {
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
    }
    return NextResponse.json({ user });
  } catch {
    return NextResponse.json({ error: "Error al cargar perfil" }, { status: 500 });
  }
}
