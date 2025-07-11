import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import Event from "@/lib/models/event";

async function handler(_req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  await dbConnect();

  const visits = await Event.countDocuments({
    userId: session.user.id,
    event: "page_view",
  });

  return NextResponse.json({ visits });
}

export async function GET(req: NextRequest) {
  return handler(req);
}
