import { useMemo } from "react";

export interface UseSchedulerProps {
  startTime?: string;
  endTime?: string;
  blockedSlots?: string[];
}

function toMinutes(time: string) {
  const [h, m] = time.split(":").map(Number);

  return h * 60 + m;
}

function format(minutes: number) {
  const h = Math.floor(minutes / 60)
    .toString()
    .padStart(2, "0");
  const m = (minutes % 60).toString().padStart(2, "0");

  return `${h}:${m}`;
}

export function useScheduler({
  startTime = "09:00",
  endTime = "17:00",
  blockedSlots = [],
}: UseSchedulerProps = {}) {
  return useMemo(() => {
    const slots: string[] = [];
    const start = toMinutes(startTime);
    const end = toMinutes(endTime);

    for (let t = start; t <= end; t += 30) {
      const value = format(t);

      if (!blockedSlots.includes(value)) slots.push(value);
    }

    return slots;
  }, [startTime, endTime, blockedSlots]);
}
