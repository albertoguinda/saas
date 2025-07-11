import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

async function handler(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  if (req.method !== "POST") {
    return NextResponse.json({ error: "Método no soportado" }, { status: 405 });
  }

  const { siteId } = await req.json();

  if (typeof siteId !== "string") {
    return NextResponse.json({ error: "ID inválido" }, { status: 400 });
  }

  // TODO: implement incremental static export and zip
  return NextResponse.json({ ok: true });
}

export async function POST(req: NextRequest) {
  return handler(req);
}
