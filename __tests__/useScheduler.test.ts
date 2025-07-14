import { act, renderHook } from "@testing-library/react";

import useScheduler from "@/lib/premium/schedulers/useScheduler";

test("manages slots and selection", () => {
  const { result } = renderHook(() =>
    useScheduler({
      startTime: "09:00",
      endTime: "11:00",
      blockedSlots: [{ start: "09:30", end: "10:00" }],
      interval: 30,
    }),
  );

  expect(result.current.slots).toEqual(["09:00", "09:30", "10:00", "10:30"]);
  expect(result.current.isSlotBlocked("09:30")).toBe(true);

  act(() => {
    result.current.selectSlot("10:00");
  });
  expect(result.current.selectedSlot).toBe("10:00");

  act(() => {
    result.current.reset();
  });
  expect(result.current.selectedSlot).toBe(null);
});
