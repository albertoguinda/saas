import { useCallback, useMemo, useState } from "react";

export interface BlockedSlot {
  start: string;
  end: string;
}

export interface UseSchedulerOptions {
  startTime: string;
  endTime: string;
  blockedSlots?: BlockedSlot[];
  interval?: number;
  onSelectSlot?: (slot: string | null) => void;
}

export interface UseScheduler {
  slots: string[];
  selectedSlot: string | null;
  isSlotBlocked: (slot: string) => boolean;
  selectSlot: (slot: string) => void;
  reset: () => void;
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
  blockedSlots = [],
  interval = 30,
  onSelectSlot,
}: UseSchedulerOptions): UseScheduler {
  const [selectedSlot, setSelected] = useState<string | null>(null);

  const slots = useMemo(() => {
    const start = timeStringToMinutes(startTime);
    const end = timeStringToMinutes(endTime);
    const list: string[] = [];

    for (let t = start; t < end; t += interval) {
      list.push(minutesToTimeString(t));
    }

    return list;
  }, [startTime, endTime, interval]);

  const isSlotBlocked = useCallback(
    (slot: string) => {
      const minutes = timeStringToMinutes(slot);

      return blockedSlots.some((b) => {
        const start = timeStringToMinutes(b.start);
        const end = timeStringToMinutes(b.end);

        return minutes >= start && minutes < end;
      });
    },
    [blockedSlots],
  );

  const selectSlot = useCallback(
    (slot: string) => {
      if (isSlotBlocked(slot)) return;
      setSelected((prev) => {
        const next = prev === slot ? null : slot;

        onSelectSlot?.(next);

        return next;
      });
    },
    [isSlotBlocked, onSelectSlot],
  );

  const reset = useCallback(() => {
    setSelected(null);
    onSelectSlot?.(null);
  }, [onSelectSlot]);

  return {
    slots,
    selectedSlot,
    isSlotBlocked,
    selectSlot,
    reset,
  };
}
