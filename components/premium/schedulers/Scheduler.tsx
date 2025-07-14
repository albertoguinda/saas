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
  const { slots, isSlotBlocked, selectSlot, selectedSlot, resetSchedule } =
    useScheduler(props);
  const t = useTranslations("scheduler");

  return (
    <Card className="flex flex-col gap-4 p-4">
      <h2 className="text-xl font-semibold">{t("title")}</h2>
      <div className="grid grid-cols-4 gap-2">
        {slots.map((slot) => (
          <button
            key={slot}
            aria-pressed={selectedSlot === slot}
            className={clsx(
              "rounded-md p-2 text-sm",
              isSlotBlocked(slot)
                ? "cursor-not-allowed bg-gray-400 text-white dark:bg-gray-600"
                : selectedSlot === slot
                  ? "bg-blue-500 text-white dark:bg-blue-600"
                  : "bg-green-500 text-white dark:bg-green-600 hover:bg-green-600 dark:hover:bg-green-700",
            )}
            disabled={isSlotBlocked(slot)}
            title={isSlotBlocked(slot) ? t("unavailable") : undefined}
            type="button"
            onClick={() => selectSlot(slot)}
          >
            {slot}
          </button>
        ))}
      </div>
      <Button size="sm" onClick={resetSchedule}>
        {t("reset")}
      </Button>
    </Card>
  );
}
