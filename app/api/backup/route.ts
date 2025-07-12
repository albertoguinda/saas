import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { createBackup, listBackups } from "@/lib/backups";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const backups = await listBackups(session.user.id);

  return NextResponse.json({ backups });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const auto = req.nextUrl.searchParams.get("auto") === "1";
  const backup = await createBackup(session.user.id, auto ? "auto" : "manual");

  if (req.headers.get("accept") === "application/zip") {
    return new Response(backup.data, {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename=${backup._id}.zip`,
      },
    });
  }

  return NextResponse.json({ backup });
}

export async function OPTIONS() {
  return NextResponse.json({ ok: true });
}
