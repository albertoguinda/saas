import { renderHook } from "@testing-library/react";

import { useScheduler } from "@/lib/premium/schedulers/scheduler";

test("generates slots within range", () => {
  const { result } = renderHook(() =>
    useScheduler({ startTime: "09:00", endTime: "10:00" }),
  );

  expect(result.current).toEqual(["09:00", "09:30", "10:00"]);
});

test("excludes blocked slots", () => {
  const { result } = renderHook(() =>
    useScheduler({
      startTime: "09:00",
      endTime: "10:00",
      blockedSlots: ["09:30"],
    }),
  );

  expect(result.current).toEqual(["09:00", "10:00"]);
});
