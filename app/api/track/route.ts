import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  try {
    const { event } = (await request.json()) as { event?: string };
    if (!event) {
      return NextResponse.json({ error: "Evento requerido" }, { status: 400 });
    }

    console.log("Tracking:", event, session.user.id);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }
}
