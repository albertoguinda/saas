import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import dbConnect from "@/lib/dbConnect";
import User from "@/lib/models/user";
import Site from "@/lib/models/site";
import Event from "@/lib/models/event";
import { authOptions } from "@/lib/auth";

export async function GET(_req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email || session.user.email !== process.env.ADMIN_EMAIL) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  await dbConnect();
  const [users, sites, events] = await Promise.all([
    User.countDocuments(),
    Site.countDocuments(),
    Event.countDocuments(),
  ]);

  return NextResponse.json({ users, sites, events });
}
