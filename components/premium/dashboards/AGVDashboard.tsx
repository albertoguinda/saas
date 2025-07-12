import { useEffect, useState } from "react";
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
import { Card } from "@heroui/card";

import useWebSocket from "@/components/hooks/useWebSocket";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
);

export interface AgvData {
  timestamp: number;
  speed: number;
  battery: number;
}

export interface AGVDashboardProps {
  wsUrl?: string;
  refreshInterval?: number;
}

export default function AGVDashboard({
  wsUrl = "",
  refreshInterval = 1000,
}: AGVDashboardProps) {
  const { data } = useWebSocket<AgvData>({ url: wsUrl });
  const [history, setHistory] = useState<AgvData[]>([]);

  useEffect(() => {
    if (data) {
      setHistory((h) => [...h.slice(-19), data]);
    }
  }, [data]);

  useEffect(() => {
    if (wsUrl) return undefined;
    const id = setInterval(() => {
      const point: AgvData = {
        timestamp: Date.now(),
        speed: Math.random() * 100,
        battery: 50 + Math.random() * 50,
      };

      setHistory((h) => [...h.slice(-19), point]);
    }, refreshInterval);

    return () => clearInterval(id);
  }, [wsUrl, refreshInterval]);

  const chartData = {
    labels: history.map((d) => new Date(d.timestamp).toLocaleTimeString()),
    datasets: [
      {
        label: "Speed",
        data: history.map((d) => d.speed),
        borderColor: "#6366f1",
        backgroundColor: "rgba(99,102,241,0.5)",
      },
      {
        label: "Battery",
        data: history.map((d) => d.battery),
        borderColor: "#16a34a",
        backgroundColor: "rgba(16,185,129,0.5)",
      },
    ],
  };

  return (
    <Card className="p-6 flex flex-col gap-4">
      <h2 className="text-xl font-semibold">AGV Dashboard</h2>
      <Line data={chartData} />
    </Card>
  );
}
