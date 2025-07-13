"use client";

import clsx from "clsx";
import { Button } from "@heroui/button";
import { Card } from "@heroui/card";
import { useTranslations } from "next-intl";

import useScheduler, {
  UseSchedulerOptions,
} from "@/lib/premium/schedulers/useScheduler";

export interface SchedulerProps extends UseSchedulerOptions {}

export default function Scheduler(props: SchedulerProps) {
  const { availableSlots, isSlotBlocked, setBlockedSlot, resetScheduler } =
    useScheduler(props);
  const t = useTranslations("scheduler");

  return (
    <Card className="flex flex-col gap-4 p-4">
      <h2 className="text-xl font-semibold">{t("title")}</h2>
      <div className="grid grid-cols-4 gap-2">
        {availableSlots.map((slot) => (
          <button
            key={slot}
            aria-pressed={isSlotBlocked(slot)}
            className={clsx(
              "rounded-md p-2 text-sm",
              isSlotBlocked(slot)
                ? "bg-red-500 text-white dark:bg-red-600"
                : "bg-green-500 text-white dark:bg-green-600",
            )}
            type="button"
            onClick={() => setBlockedSlot(slot, !isSlotBlocked(slot))}
          >
            {slot}
          </button>
        ))}
      </div>
      <Button size="sm" onClick={resetScheduler}>
        {t("reset")}
      </Button>
    </Card>
  );
}
