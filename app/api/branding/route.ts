import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import Branding from "@/lib/models/branding";

async function handler(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  await dbConnect();

  if (req.method === "GET") {
    const branding = await Branding.findOne({ userId: session.user.id });

    return NextResponse.json({ branding });
  }

  if (req.method === "PATCH") {
    let json: unknown;

    try {
      json = await req.json();
    } catch {
      return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
    }

    const { logo, favicon, color, font } = json as Record<string, string>;

    const branding = await Branding.findOneAndUpdate(
      { userId: session.user.id },
      { logo, favicon, color, font },
      { upsert: true, new: true },
    );

    return NextResponse.json({ branding });
  }

  return NextResponse.json({ error: "Método no soportado" }, { status: 405 });
}

export async function GET(req: NextRequest) {
  return handler(req);
}

export async function PATCH(req: NextRequest) {
  return handler(req);
}
