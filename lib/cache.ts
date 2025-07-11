import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export async function getSite(slug: string) {
  return redis.get<string>(`site:${slug}`);
}

export async function setSite(slug: string, data: string, plan: string) {
  const ttl = plan === "premium" ? 86400 : 300;

  await redis.set(`site:${slug}`, data, { ex: ttl });
}

export async function invalidateSite(slug: string) {
  await redis.del(`site:${slug}`);
}
