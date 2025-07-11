import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import GeneratedContent from "@/lib/models/generatedContent";
import { generateContent } from "@/lib/ia";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  let json: { prompt?: string };

  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const { prompt } = json;

  if (!prompt || typeof prompt !== "string") {
    return NextResponse.json({ error: "Prompt requerido" }, { status: 400 });
  }

  const content = await generateContent(prompt);

  await dbConnect();
  await GeneratedContent.create({
    userId: session.user.id,
    prompt,
    content,
  });

  return NextResponse.json({ content });
}
