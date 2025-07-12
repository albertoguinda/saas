// components/Stepper.tsx
import type { ReactNode } from "react";

import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

export interface Step {
  label: ReactNode;
}

export interface StepperProps {
  steps: Step[];
  current: number;
}

export default function Stepper({ steps, current }: StepperProps) {
  const pct = Math.min((current / Math.max(steps.length - 1, 1)) * 100, 100);

  return (
    <div>
      <ol aria-label="progress" className="flex justify-between mb-3">
        {steps.map((step, i) => (
          <li
            key={i}
            aria-current={i === current}
            className={cn(
              "flex items-center gap-2 text-sm",
              i < current
                ? "text-success"
                : i === current
                  ? "font-semibold"
                  : "text-default-500",
            )}
          >
            <span
              className={cn(
                "w-6 h-6 rounded-full border flex items-center justify-center",
                i < current ? "bg-success text-white border-success" : "",
              )}
            >
              {i < current ? <Check size={14} /> : i + 1}
            </span>
            {step.label}
          </li>
        ))}
      </ol>
      <div className="h-1 w-full rounded bg-default-200">
        <div className="h-1 rounded bg-primary" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
