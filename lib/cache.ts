import { redis } from "@/lib/upstash";
import { logger } from "@/lib/logger";
import { PANEL_CACHE_TTL, SITE_CACHE_TTL } from "@/config/constants";

export async function getSite(slug: string) {
  const cached = await redis.get<string>(`site:${slug}`);

  logger.info(`[cache] get site:${slug} hit=${Boolean(cached)}`);

  return cached;
}

export async function setSite(slug: string, data: string) {
  await redis.set(`site:${slug}`, data, { ex: SITE_CACHE_TTL });
  logger.info(`[cache] set site:${slug} ttl=${SITE_CACHE_TTL}`);
}

export async function invalidateSite(slug: string) {
  await redis.del(`site:${slug}`);
  logger.info(`[cache] invalidated site:${slug}`);
}

export async function getUserSites(userId: string) {
  const cached = await redis.get<string>(`user-sites:${userId}`);

  logger.info(`[cache] get user-sites:${userId} hit=${Boolean(cached)}`);

  return cached;
}

export async function setUserSites(userId: string, data: string) {
  await redis.set(`user-sites:${userId}`, data, { ex: PANEL_CACHE_TTL });
  logger.info(`[cache] set user-sites:${userId} ttl=${PANEL_CACHE_TTL}`);
}

export async function invalidateUserSites(userId: string) {
  await redis.del(`user-sites:${userId}`);
  logger.info(`[cache] invalidated user-sites:${userId}`);
}
