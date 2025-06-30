import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/lib/models/user";

// POST /api/auth/register
export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json();
    if (!email || !password || !name) {
      return NextResponse.json({ error: "Faltan datos" }, { status: 400 });
    }

    await dbConnect();

    // Comprueba si existe ya el usuario
    const exists = await User.findOne({ email });
    if (exists) {
      return NextResponse.json({ error: "El email ya está registrado" }, { status: 409 });
    }

    // Crea y guarda el usuario (hash por middleware)
    const user = new User({ email, password, name, plan: "free" });
    await user.save();

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Error de servidor" }, { status: 500 });
  }
}
