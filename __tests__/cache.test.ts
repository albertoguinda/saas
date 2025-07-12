const get = jest.fn();
const set = jest.fn();
const del = jest.fn();

jest.mock("@/lib/upstash", () => ({ redis: { get, set, del } }));

import {
  getSite,
  setSite,
  invalidateSite,
  getUserSites,
  setUserSites,
  invalidateUserSites,
} from "@/lib/cache";

beforeEach(() => {
  get.mockReset();
  set.mockReset();
  del.mockReset();
});

test("setSite uses constant TTL", async () => {
  await setSite("s", "{}");
  expect(set).toHaveBeenCalledWith("site:s", "{}", { ex: 3600 });
});

test("getSite calls redis.get", async () => {
  get.mockResolvedValue("d");
  const res = await getSite("s");

  expect(res).toBe("d");
  expect(get).toHaveBeenCalledWith("site:s");
});

test("invalidateSite calls redis.del", async () => {
  await invalidateSite("s");
  expect(del).toHaveBeenCalledWith("site:s");
});

test("setUserSites uses panel TTL", async () => {
  await setUserSites("u", "[]");
  expect(set).toHaveBeenCalledWith("user-sites:u", "[]", { ex: 600 });
});

test("getUserSites calls redis.get", async () => {
  get.mockResolvedValue("[]");
  const res = await getUserSites("u");

  expect(get).toHaveBeenCalledWith("user-sites:u");
  expect(res).toBe("[]");
});

test("invalidateUserSites calls redis.del", async () => {
  await invalidateUserSites("u");
  expect(del).toHaveBeenCalledWith("user-sites:u");
});
