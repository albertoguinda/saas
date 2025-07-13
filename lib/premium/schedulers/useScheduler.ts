import { useCallback, useMemo, useState } from "react";

export interface UseSchedulerOptions {
  startTime: string;
  endTime: string;
  blockedSlots?: string[];
  intervalMinutes?: number;
}

export interface UseScheduler {
  availableSlots: string[];
  blockedSlots: string[];
  isSlotBlocked: (slot: string) => boolean;
  setBlockedSlot: (slot: string, blocked: boolean) => void;
  resetScheduler: () => void;
}

function timeStringToMinutes(time: string) {
  const [h, m] = time.split(":").map(Number);

  return h * 60 + m;
}

function minutesToTimeString(total: number) {
  const h = Math.floor(total / 60)
    .toString()
    .padStart(2, "0");
  const m = (total % 60).toString().padStart(2, "0");

  return `${h}:${m}`;
}

export default function useScheduler({
  startTime,
  endTime,
  blockedSlots: initialBlocked = [],
  intervalMinutes = 30,
}: UseSchedulerOptions): UseScheduler {
  const [blockedSlots, setBlocked] = useState<string[]>(initialBlocked);

  const availableSlots = useMemo(() => {
    const start = timeStringToMinutes(startTime);
    const end = timeStringToMinutes(endTime);
    const slots: string[] = [];

    for (let t = start; t < end; t += intervalMinutes) {
      slots.push(minutesToTimeString(t));
    }

    return slots;
  }, [startTime, endTime, intervalMinutes]);

  const isSlotBlocked = useCallback(
    (slot: string) => blockedSlots.includes(slot),
    [blockedSlots],
  );

  const setBlockedSlot = useCallback((slot: string, blocked: boolean) => {
    setBlocked((prev) => {
      if (blocked) {
        return prev.includes(slot) ? prev : [...prev, slot];
      }

      return prev.filter((s) => s !== slot);
    });
  }, []);

  const resetScheduler = useCallback(
    () => setBlocked(initialBlocked),
    [initialBlocked],
  );

  return {
    availableSlots,
    blockedSlots,
    isSlotBlocked,
    setBlockedSlot,
    resetScheduler,
  };
}
