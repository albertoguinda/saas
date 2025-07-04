import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import User from "@/lib/models/user";
import { uploadAvatar } from "@/lib/storage";

export const POST = async (req: NextRequest) => {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: "Formato inválido" }, { status: 400 });
  }

  const file = form.get("file");
  if (!(file instanceof Blob)) {
    return NextResponse.json({ error: "Archivo inválido" }, { status: 400 });
  }
  if (file.size > 2 * 1024 * 1024) {
    return NextResponse.json({ error: "Archivo demasiado grande" }, { status: 400 });
  }

  try {
    const url = await uploadAvatar(file);
    await dbConnect();
    const user = await User.findOneAndUpdate(
      { email: session.user.email },
      { avatar: url },
      { new: true }
    );
    if (!user) {
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
    }
    return NextResponse.json({ ok: true, avatar: user.avatar });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Error subiendo avatar" }, { status: 500 });
  }
};
