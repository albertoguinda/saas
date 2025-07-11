const get = jest.fn();
const set = jest.fn();
const del = jest.fn();

jest.mock("@/lib/upstash", () => ({ redis: { get, set, del } }));

import { getSite, setSite, invalidateSite } from "@/lib/cache";

beforeEach(() => {
  get.mockReset();
  set.mockReset();
  del.mockReset();
});

test("setSite uses premium TTL", async () => {
  await setSite("s", "{}", "premium");
  expect(set).toHaveBeenCalledWith("site:s", "{}", { ex: 86400 });
});

test("setSite uses free TTL", async () => {
  await setSite("s", "{}", "free");
  expect(set).toHaveBeenCalledWith("site:s", "{}", { ex: 7200 });
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
