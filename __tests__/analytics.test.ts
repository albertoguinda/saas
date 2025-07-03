import { track } from "@/lib/analytics";

beforeEach(() => {
  global.fetch = jest.fn().mockResolvedValue({ ok: true }) as any;
});

test("track posts event with page and meta", async () => {
  const pathname = window.location.pathname;

  await track("upgrade_click", { plan: "pro" });

  expect(fetch).toHaveBeenCalledWith(
    "/api/track",
    expect.objectContaining({
      method: "POST",
      headers: { "Content-Type": "application/json" },
    }),
  );

  const body = JSON.parse((fetch as jest.Mock).mock.calls[0][1].body);
  expect(body).toEqual({
    event: "upgrade_click",
    page: pathname,
    meta: { plan: "pro" },
  });
});
