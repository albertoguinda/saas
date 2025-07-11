import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { useTranslations } from "next-intl";
import { Card } from "@heroui/card";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function AnalyticsPage() {
  const t = useTranslations("analytics");
  const [period, setPeriod] = useState("day");
  const [data, setData] = useState({ visits: 0, upgrades: 0, wizard: 0 });

  useEffect(() => {
    fetch(`/api/analytics?period=${period}`)
      .then((r) => r.json())
      .then((d) => setData(d))
      .catch(() => {});
  }, [period]);

  const chartData = {
    labels: [t("visits"), t("upgrades"), t("wizard")],
    datasets: [
      {
        label: t("events"),
        data: [data.visits, data.upgrades, data.wizard],
        backgroundColor: "#6366f1",
      },
    ],
  };

  return (
    <div className="max-w-xl mx-auto py-12">
      <Card className="p-6 flex flex-col gap-4">
        <h1 className="text-2xl font-bold">{t("title")}</h1>
        <select
          className="border p-2 rounded"
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
        >
          <option value="day">{t("day")}</option>
          <option value="week">{t("week")}</option>
          <option value="month">{t("month")}</option>
        </select>
        <Bar data={chartData} />
      </Card>
    </div>
  );
}
