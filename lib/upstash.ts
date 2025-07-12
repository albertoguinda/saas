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
  const store = new Map<string, { value: string; expires: number }>();

  redis = {
    get: async (key: string) => {
      const entry = store.get(key);

      if (!entry) return null;
      if (entry.expires && entry.expires < Date.now()) {
        store.delete(key);

        return null;
      }

      return entry.value;
    },
    set: async (
      key: string,
      value: string,
      opts?: {
        ex?: number;
      },
    ) => {
      const expires = opts?.ex ? Date.now() + opts.ex * 1000 : 0;

      store.set(key, { value, expires });
    },
    del: async (key: string) => {
      store.delete(key);
    },
    incr: async (key: string) => {
      const entry = store.get(key);
      const current = Number(entry?.value) || 0;
      const next = current + 1;

      store.set(key, { value: String(next), expires: entry?.expires || 0 });

      return next;
    },
    expire: async (key: string, seconds: number) => {
      const entry = store.get(key);

      if (entry) {
        entry.expires = Date.now() + seconds * 1000;
        store.set(key, entry);
      }
    },
  };
}

export { redis };
