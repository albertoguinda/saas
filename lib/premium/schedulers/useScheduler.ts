import { useCallback, useEffect, useMemo, useState } from "react";

export interface UseSchedulerOptions {
  startTime: string;
  endTime: string;
  blockedSlots?: string[];
  step?: number;
  onSelectSlot?: (slot: string | null) => void;
  onChangeBlocks?: (blocks: string[]) => void;
}

export interface UseScheduler {
  slots: string[];
  selectedSlot: string | null;
  blockedSlots: string[];
  isSlotBlocked: (slot: string) => boolean;
  selectSlot: (slot: string) => void;
  getAvailableSlots: () => string[];
  blockSlot: (slot: string) => void;
  resetSchedule: () => void;
}

function toMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);

  return h * 60 + m;
}

function toTimeString(total: number): string {
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
  step = 30,
  onSelectSlot,
  onChangeBlocks,
}: UseSchedulerOptions): UseScheduler {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [blocks, setBlocks] = useState<string[]>(blockedSlots);

  useEffect(() => {
    onChangeBlocks?.(blocks);
  }, [blocks, onChangeBlocks]);

  const slots = useMemo(() => {
    const start = toMinutes(startTime);
    const end = toMinutes(endTime);
    const list: string[] = [];

    for (let t = start; t < end; t += step) {
      list.push(toTimeString(t));
    }

    return list;
  }, [startTime, endTime, step]);

  const isSlotBlocked = useCallback(
    (slot: string) => blocks.includes(slot),
    [blocks],
  );

  const selectSlot = useCallback(
    (slot: string) => {
      if (isSlotBlocked(slot)) return;
      setSelectedSlot((prev) => {
        const next = prev === slot ? null : slot;

        onSelectSlot?.(next);

        return next;
      });
    },
    [isSlotBlocked, onSelectSlot],
  );

  const getAvailableSlots = useCallback(
    () => slots.filter((s) => !isSlotBlocked(s)),
    [slots, isSlotBlocked],
  );

  const blockSlot = useCallback((slot: string) => {
    setBlocks((prev) => (prev.includes(slot) ? prev : [...prev, slot]));
  }, []);

  const resetSchedule = useCallback(() => {
    setSelectedSlot(null);
    setBlocks(blockedSlots);
    onSelectSlot?.(null);
  }, [blockedSlots, onSelectSlot]);

  return {
    slots,
    selectedSlot,
    blockedSlots: blocks,
    isSlotBlocked,
    selectSlot,
    getAvailableSlots,
    blockSlot,
    resetSchedule,
  };
}
