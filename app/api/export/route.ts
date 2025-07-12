import { exec } from "node:child_process";
import { readFile, unlink } from "node:fs/promises";
import { promisify } from "node:util";

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

async function handler(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  if (req.method !== "POST") {
    return NextResponse.json({ error: "Método no soportado" }, { status: 405 });
  }

  const { siteId } = await req.json();

  if (typeof siteId !== "string") {
    return NextResponse.json({ error: "ID inválido" }, { status: 400 });
  }

  const execAsync = promisify(exec);

  try {
    await execAsync("npm run export:zip");
    const buffer = await readFile("out.zip");

    await unlink("out.zip").catch(() => {});

    return new Response(buffer, {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename=${siteId}.zip`,
      },
    });
  } catch (e) {
    // eslint-disable-next-line no-console -- log error for debugging
    console.error(e);

    return NextResponse.json({ error: "Error generando ZIP" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  return handler(req);
}
