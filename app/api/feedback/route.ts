import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import Feedback from "@/lib/models/feedback";
import { withValidationRoute } from "@/lib/middlewares/withValidation";
import { feedbackSchema, type FeedbackInput } from "@/lib/validations/feedback";

async function handler(request: NextRequest & { body: FeedbackInput }) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const { message } = request.body;

  await dbConnect();
  await Feedback.create({ userId: session.user.id, message });

  return NextResponse.json({ ok: true });
}

export const POST = withValidationRoute(handler, feedbackSchema);
