import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import Legal from "@/lib/models/legal";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  let json: { siteId?: string };

  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const { siteId } = json;

  if (!siteId || typeof siteId !== "string") {
    return NextResponse.json({ error: "ID requerido" }, { status: 400 });
  }

  await dbConnect();
  const docs = await Legal.create([
    {
      userId: session.user.id,
      siteId,
      type: "cookies",
      content: "Texto cookies",
    },
    {
      userId: session.user.id,
      siteId,
      type: "privacy",
      content: "Texto privacidad",
    },
    {
      userId: session.user.id,
      siteId,
      type: "terms",
      content: "Texto términos",
    },
  ]);

  return NextResponse.json({ legal: docs });
}

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const siteId = req.nextUrl.searchParams.get("siteId") || "";

  await dbConnect();
  const docs = await Legal.find({ userId: session.user.id, siteId });

  return NextResponse.json({ legal: docs });
}
