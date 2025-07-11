import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import Domain from "@/lib/models/domain";

async function handler(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  await dbConnect();

  if (req.method === "GET") {
    const domains = await Domain.find({ userId: session.user.id });

    return NextResponse.json({ domains });
  }

  if (req.method === "POST") {
    let json: unknown;

    try {
      json = await req.json();
    } catch {
      return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
    }

    const { name } = json as { name?: string };

    if (!name) {
      return NextResponse.json({ error: "Dominio requerido" }, { status: 400 });
    }

    const domain = await Domain.create({ userId: session.user.id, name });

    return NextResponse.json({ domain });
  }

  return NextResponse.json({ error: "Método no soportado" }, { status: 405 });
}

export async function GET(req: NextRequest) {
  return handler(req);
}

export async function POST(req: NextRequest) {
  return handler(req);
}
