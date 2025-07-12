import { Redis } from "@upstash/redis";

import { logger } from "@/lib/logger";

let redis: any;

if (
  process.env.UPSTASH_REDIS_REST_URL &&
  process.env.UPSTASH_REDIS_REST_TOKEN
) {
  redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });
} else {
  logger.warn("⚠️ Upstash vars no definidas, se usa cache en memoria");
  const store = new Map<string, string>();

  redis = {
    get: async (key: string) => store.get(key) ?? null,
    set: async (key: string, value: string) => {
      store.set(key, value);
    },
    del: async (key: string) => {
      store.delete(key);
    },
    incr: async (key: string) => {
      const val = (Number(store.get(key)) || 0) + 1;

      store.set(key, String(val));

      return val;
    },
    expire: async () => {},
  };
}

export { redis };
