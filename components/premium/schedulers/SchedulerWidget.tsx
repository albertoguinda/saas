"use client";

import clsx from "clsx";
import { Button } from "@heroui/button";
import { Card } from "@heroui/card";
import { useTranslations } from "next-intl";

import useScheduler from "@/lib/premium/schedulers/useScheduler";

export interface SchedulerWidgetProps {
  startHour: string;
  endHour: string;
  initialBlocks?: string[];
  onChange?: (data: { selected: string | null; blocks: string[] }) => void;
}

export default function SchedulerWidget({
  startHour,
  endHour,
  initialBlocks,
  onChange,
}: SchedulerWidgetProps) {
  const {
    slots,
    selectedSlot,
    selectSlot,
    isSlotBlocked,
    blockSlot,
    resetSchedule,
    blockedSlots,
  } = useScheduler({
    startTime: startHour,
    endTime: endHour,
    blockedSlots: initialBlocks,
    onSelectSlot: (slot) =>
      onChange?.({ selected: slot, blocks: blockedSlots }),
    onChangeBlocks: (blocks) => onChange?.({ selected: selectedSlot, blocks }),
  });
  const t = useTranslations("scheduler");

  return (
    <Card className="flex flex-col gap-4 p-4">
      <h2 className="text-xl font-semibold">{t("title")}</h2>
      <div className="grid grid-cols-4 gap-2">
        {slots.map((slot) => (
          <div key={slot} className="flex flex-col items-center gap-1">
            <button
              aria-pressed={selectedSlot === slot}
              className={clsx(
                "w-full rounded-md p-2 text-sm",
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
            {!isSlotBlocked(slot) && (
              <button
                className="text-xs text-red-600 hover:underline"
                type="button"
                onClick={() => blockSlot(slot)}
              >
                {t("block")}
              </button>
            )}
          </div>
        ))}
      </div>
      <Button size="sm" onClick={resetSchedule}>
        {t("reset")}
      </Button>
    </Card>
  );
}
