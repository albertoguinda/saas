import { act, renderHook } from "@testing-library/react";

import useScheduler from "@/lib/premium/schedulers/useScheduler";

test("manages slots and blocking", () => {
  const { result } = renderHook(() =>
    useScheduler({
      startTime: "09:00",
      endTime: "11:00",
      blockedSlots: ["09:30"],
      intervalMinutes: 30,
    }),
  );

  expect(result.current.availableSlots).toEqual([
    "09:00",
    "09:30",
    "10:00",
    "10:30",
  ]);
  expect(result.current.isSlotBlocked("09:30")).toBe(true);

  act(() => {
    result.current.setBlockedSlot("10:00", true);
  });
  expect(result.current.isSlotBlocked("10:00")).toBe(true);

  act(() => {
    result.current.resetScheduler();
  });
  expect(result.current.isSlotBlocked("09:30")).toBe(true);
  expect(result.current.isSlotBlocked("10:00")).toBe(false);
});
