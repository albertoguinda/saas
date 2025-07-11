import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { invalidateSite } from "@/lib/cache";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  let json: { slug?: string };

  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const { slug } = json;

  if (!slug || typeof slug !== "string") {
    return NextResponse.json({ error: "Slug requerido" }, { status: 400 });
  }

  await invalidateSite(slug);

  return NextResponse.json({ ok: true });
}
