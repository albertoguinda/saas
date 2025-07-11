import { logger } from "@/lib/logger";

export async function generateContent(prompt: string) {
  if (!process.env.DATAFAST_API_KEY) {
    return "Texto generado de ejemplo";
  }

  try {
    const res = await fetch("https://api.datafast.ai/v1/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.DATAFAST_API_KEY}`,
      },
      body: JSON.stringify({ prompt }),
    });

    if (!res.ok) throw new Error(`DataFast error ${res.status}`);

    const json = (await res.json()) as { content?: string };

    return json.content || "";
  } catch (err) {
    logger.error(err);

    return "Texto generado de ejemplo";
  }
}
