import { promises as dns } from "node:dns";

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import Domain from "@/lib/models/domain";
import { domainSchema, verifySchema } from "@/lib/validations/domain";

const CNAME = process.env.CNAME_DOMAIN || "app.example.com";

async function verifyCname(name: string) {
  try {
    const records = await dns.resolveCname(name);

    return records.includes(CNAME);
  } catch {
    return false;
  }
}

export async function GET(_req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  await dbConnect();
  const domains = await Domain.find({ userId: session.user.id });

  return NextResponse.json({ domains });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  await dbConnect();

  let json: unknown;

  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const parsed = domainSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0].message },
      { status: 400 },
    );
  }

  const { name, siteId } = parsed.data;

  const existing = await Domain.findOne({ name });

  if (existing) {
    return NextResponse.json({ error: "Dominio en uso" }, { status: 409 });
  }

  const valid = await verifyCname(name);
  const status = valid ? "active" : "pending";

  const domain = await Domain.create({
    userId: session.user.id,
    siteId,
    name,
    status,
  });

  return NextResponse.json({ domain, valid });
}

export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  await dbConnect();

  let json: unknown;

  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const parsed = verifySchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0].message },
      { status: 400 },
    );
  }

  const { id } = parsed.data;

  const domain = await Domain.findOne({ _id: id, userId: session.user.id });

  if (!domain) {
    return NextResponse.json(
      { error: "Dominio no encontrado" },
      { status: 404 },
    );
  }

  const valid = await verifyCname(domain.name);

  domain.status = valid ? "active" : "pending";
  await domain.save();

  return NextResponse.json({ domain, valid });
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  await dbConnect();

  let json: unknown;

  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const parsed = verifySchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0].message },
      { status: 400 },
    );
  }

  const { id } = parsed.data;

  await Domain.deleteOne({ _id: id, userId: session.user.id });

  return NextResponse.json({ ok: true });
}
