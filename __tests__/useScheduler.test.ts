import { act, renderHook } from "@testing-library/react";

import useScheduler from "@/lib/premium/schedulers/useScheduler";

test("manages slots and selection", () => {
  const { result } = renderHook(() =>
    useScheduler({
      startTime: "09:00",
      endTime: "11:00",
      blockedSlots: ["09:30"],
      step: 30,
    }),
  );

  expect(result.current.slots).toEqual(["09:00", "09:30", "10:00", "10:30"]);
  expect(result.current.isSlotBlocked("09:30")).toBe(true);
  expect(result.current.getAvailableSlots()).toEqual([
    "09:00",
    "10:00",
    "10:30",
  ]);

  act(() => {
    result.current.selectSlot("10:00");
    result.current.blockSlot("10:30");
  });
  expect(result.current.selectedSlot).toBe("10:00");
  expect(result.current.isSlotBlocked("10:30")).toBe(true);

  act(() => {
    result.current.resetSchedule();
  });
  expect(result.current.selectedSlot).toBe(null);
  expect(result.current.isSlotBlocked("10:30")).toBe(false);
});
