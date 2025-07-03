import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/lib/models/user";
import { withValidationRoute } from "@/lib/middlewares/withValidation";
import { registerSchema, type RegisterInput } from "@/lib/validations/auth";

// POST /api/auth/register
async function handler(request: NextRequest & { body: RegisterInput }) {
  try {
    const { email, password, name } = request.body;

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

export const POST = withValidationRoute(handler, registerSchema);
