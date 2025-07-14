"use client";

import { useEffect, useState } from "react";
import { Card } from "@heroui/card";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Droplet, Thermometer, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";

import useMockSensorData from "@/components/hooks/useMockSensorData";

export type SensorType = "humidity" | "temperature" | "light" | (string & {});
export interface SensorPanelProps {
  sensorType: SensorType;
  updateMode?: "poll" | "stream";
  unit?: string;
  onData?: (data: number) => void;
  onAlert?: (value: number) => void;
  maxThreshold?: number;
  minThreshold?: number;
  criticalColor?: string;
}

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
);

const ICONS = {
  humidity: Droplet,
  temperature: Thermometer,
  light: Sun,
};

export default function SensorPanel({
  sensorType,
  updateMode = "stream",
  unit = "",
  onData,
  onAlert,
  maxThreshold,
  minThreshold,
  criticalColor = "#ef4444",
}: SensorPanelProps) {
  const t = useTranslations("sensor");
  const { resolvedTheme } = useTheme();
  const dark = resolvedTheme === "dark";
  const { value } = useMockSensorData({ sensorType, updateMode });
  const [history, setHistory] = useState<number[]>([]);

  useEffect(() => {
    if (value == null) return;
    setHistory((h) => [...h.slice(-19), value]);
    onData?.(value);
    if (
      (maxThreshold && value > maxThreshold) ||
      (minThreshold && value < minThreshold)
    ) {
      onAlert?.(value);
    }
  }, [value, maxThreshold, minThreshold, onAlert, onData]);

  const Icon = ICONS[sensorType];
  const data = {
    labels: history.map((_, i) => i.toString()),
    datasets: [
      {
        label: t(sensorType),
        data: history,
        borderColor: dark ? "#60a5fa" : "#2563eb",
        backgroundColor: "rgba(96,165,250,0.5)",
      },
    ],
  };

  const inAlert =
    (maxThreshold && value > maxThreshold) ||
    (minThreshold && value < minThreshold);

  return (
    <Card className="flex flex-col gap-4 p-4">
      <div className="flex items-center gap-2">
        <Icon className="h-5 w-5" />
        <span className="font-medium">
          {t(sensorType)}: {value?.toFixed(1)} {unit}
        </span>
      </div>
      <Line data={data} />
      {inAlert ? (
        <p className="text-sm" style={{ color: criticalColor }}>
          {t("alert")}
        </p>
      ) : null}
    </Card>
  );
}
