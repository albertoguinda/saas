import { useEffect, useState } from "react";

export interface MockSensorOptions {
  sensorType: "humidity" | "temp" | "light";
  updateMode: "realtime" | "interval";
  intervalMs?: number;
}

export default function useMockSensorData({
  sensorType,
  updateMode,
  intervalMs = 1000,
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

    if (updateMode === "realtime") {
      const id = setInterval(() => setValue(genValue()), intervalMs);

      return () => clearInterval(id);
    }
    // interval mode emits once
    setValue(genValue());
  }, [sensorType, updateMode, intervalMs]);

  return { value };
}
