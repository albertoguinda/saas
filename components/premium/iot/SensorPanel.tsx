import { useEffect, useMemo } from "react";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

import { useMqtt } from "@/lib/hooks/useMqtt";
import { useInfluxQuery } from "@/lib/hooks/useInfluxQuery";

export interface SensorPanelProps {
  sensorType: string;
  updateMode?: "realtime" | "history";
}

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
);

export default function SensorPanel({
  sensorType,
  updateMode = "realtime",
}: SensorPanelProps) {
  const message = useMqtt({
    url: "wss://test.mosquitto.org:8081",
    topic: sensorType,
  });
  const history = useInfluxQuery({
    url: process.env.NEXT_PUBLIC_INFLUX_URL || "",
    token: process.env.NEXT_PUBLIC_INFLUX_TOKEN || "",
    org: process.env.NEXT_PUBLIC_INFLUX_ORG || "",
    query: `from(bucket: \"sensors\") |> range(start: -1h) |> filter(fn: (r) => r._measurement == \"${sensorType}\")`,
  });

  const data = useMemo(() => {
    const labels: string[] = [];
    const values: number[] = [];

    if (updateMode === "realtime" && message) {
      labels.push(new Date().toLocaleTimeString());
      values.push(Number(message));
    }

    if (updateMode === "history") {
      history.forEach((row) => {
        labels.push(String(row._time));
        values.push(Number(row._value));
      });
    }

    return {
      labels,
      datasets: [
        {
          label: sensorType,
          data: values,
          fill: false,
          backgroundColor: "#6366f1",
          borderColor: "#6366f1",
        },
      ],
    };
  }, [sensorType, updateMode, message, history]);

  useEffect(() => {
    // placeholder effect to re-render on new messages
  }, [message]);

  return <Line data={data} />;
}
