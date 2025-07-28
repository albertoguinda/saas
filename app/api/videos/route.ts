import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { uploadVideo } from "@/lib/mux";

async function handler(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  if (req.method !== "POST") {
    return NextResponse.json({ error: "Método no soportado" }, { status: 405 });
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

  try {
    const arrayBuffer = await file.arrayBuffer();
    const playbackId = await uploadVideo(Buffer.from(arrayBuffer), file.name);

    return NextResponse.json({ playbackId });
  } catch {
    return NextResponse.json({ error: "Error subiendo" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  return handler(req);
}
