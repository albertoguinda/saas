import { NextRequest, NextResponse } from "next/server";

import dbConnect from "@/lib/dbConnect";
import ConfirmationToken from "@/lib/models/confirmationToken";
import User from "@/lib/models/user";
import { logger } from "@/lib/logger";

export async function GET(
  _req: NextRequest,
  { params }: { params: { token: string } },
) {
  try {
    await dbConnect();
    const tokenDoc = await ConfirmationToken.findOne({ token: params.token });

    if (!tokenDoc || tokenDoc.used || tokenDoc.expiresAt < new Date()) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    await User.updateOne({ _id: tokenDoc.userId }, { emailVerified: true });
    tokenDoc.used = true;
    await tokenDoc.save();

    return NextResponse.json({ ok: true });
  } catch (err) {
    logger.error(err);

    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
