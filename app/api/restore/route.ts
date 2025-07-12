import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { restoreBackup } from "@/lib/backups";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  let json: { id?: string };

  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  if (!json.id) {
    return NextResponse.json({ error: "ID requerido" }, { status: 400 });
  }

  const ok = await restoreBackup(session.user.id, json.id);

  if (!ok) {
    return NextResponse.json({ error: "No válido" }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
