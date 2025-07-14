import { useEffect, useState } from "react";

export interface MockSensorOptions {
  sensorType: "humidity" | "temperature" | "light" | (string & {});
  updateMode?: "stream" | "poll";
  intervalMs?: number;
}

export default function useMockSensorData({
  sensorType,
  updateMode = "stream",
  intervalMs,
}: MockSensorOptions) {
  const [value, setValue] = useState<number | null>(null);

  useEffect(() => {
    const genValue = () => {
      switch (sensorType) {
        case "humidity":
          return 40 + Math.random() * 40;
        case "light":
          return Math.random() * 1000;
        default:
          return 15 + Math.random() * 10;
      }
    };

    const ms = intervalMs ?? (updateMode === "poll" ? 5000 : 1000);
    const id = setInterval(() => setValue(genValue()), ms);

    return () => clearInterval(id);
  }, [sensorType, updateMode, intervalMs]);

  return { value };
}
