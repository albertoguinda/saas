import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import Site from "@/lib/models/site";
import { uploadImage } from "@/lib/storage";
import { invalidateSite } from "@/lib/cache";

export const POST = async (
  req: NextRequest,
  { params }: { params: { id: string } },
) => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  await dbConnect();
  const site = await Site.findOne({ _id: params.id, userId: session.user.id });

  if (!site) {
    return NextResponse.json(
      { error: "Proyecto no encontrado" },
      { status: 404 },
    );
  }

  let form: FormData;

  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: "Formato inválido" }, { status: 400 });
  }

  const file = form.get("file");
  const type = form.get("type") as string;

  const validTypes = ["logo", "favicon", "cover"];
  const validMime = [
    "image/png",
    "image/jpeg",
    "image/svg+xml",
    "image/x-icon",
  ];

  if (
    !(file instanceof Blob) ||
    !validTypes.includes(type) ||
    !validMime.includes(file.type)
  ) {
    return NextResponse.json({ error: "Archivo inválido" }, { status: 400 });
  }

  if (file.size > 512 * 1024) {
    return NextResponse.json(
      { error: "Archivo demasiado grande" },
      { status: 400 },
    );
  }

  try {
    const url = await uploadImage(file);

    const branding = site.structure?.branding || {};
    const assets = branding.assets || {};

    assets[type] = { url, type };
    site.structure = { ...site.structure, branding: { ...branding, assets } };
    await site.save();
    await invalidateSite(site.slug);

    return NextResponse.json({ ok: true, url });
  } catch {
    return NextResponse.json({ error: "Error subiendo" }, { status: 500 });
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } },
) => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const type = req.nextUrl.searchParams.get("type") as string;
  const validTypes = ["logo", "favicon", "cover"];

  if (!validTypes.includes(type)) {
    return NextResponse.json({ error: "Tipo inválido" }, { status: 400 });
  }

  await dbConnect();
  const site = await Site.findOne({ _id: params.id, userId: session.user.id });

  if (!site) {
    return NextResponse.json(
      { error: "Proyecto no encontrado" },
      { status: 404 },
    );
  }

  const branding = site.structure?.branding || {};
  const assets = branding.assets || {};

  delete assets[type];
  site.structure = { ...site.structure, branding: { ...branding, assets } };
  await site.save();
  await invalidateSite(site.slug);

  return NextResponse.json({ ok: true });
};
