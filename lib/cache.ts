import { redis } from "@/lib/upstash";
import { logger } from "@/lib/logger";

export async function getSite(slug: string) {
  const cached = await redis.get<string>(`site:${slug}`);

  logger.info(`[cache] get site:${slug} hit=${Boolean(cached)}`);

  return cached;
}

export async function setSite(slug: string, data: string, plan: string) {
  const ttl = plan === "premium" ? 86400 : 7200;

  await redis.set(`site:${slug}`, data, { ex: ttl });
  logger.info(`[cache] set site:${slug} ttl=${ttl}`);
}

export async function invalidateSite(slug: string) {
  await redis.del(`site:${slug}`);
  logger.info(`[cache] invalidated site:${slug}`);
}
