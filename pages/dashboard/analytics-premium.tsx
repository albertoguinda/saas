import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useTranslations } from "next-intl";
import { Card } from "@heroui/card";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
);

interface ViewData {
  _id: string;
  count: number;
}
interface Log {
  event: string;
  page?: string;
  createdAt: string;
}

export default function PremiumAnalyticsPage() {
  const t = useTranslations("analyticsPremium");
  const [data, setData] = useState<{ pageViews: ViewData[]; logs: Log[] }>({
    pageViews: [],
    logs: [],
  });

  useEffect(() => {
    fetch("/api/analytics/premium")
      .then((r) => r.json())
      .then((d) => setData(d))
      .catch(() => {});
  }, []);

  const labels = data.pageViews.map((d) => d._id);
  const chartData = {
    labels,
    datasets: [
      {
        label: t("pageViews"),
        data: data.pageViews.map((d) => d.count),
        borderColor: "#6366f1",
        backgroundColor: "#6366f1",
      },
    ],
  };

  return (
    <div className="max-w-2xl mx-auto py-12">
      <Card className="p-6 flex flex-col gap-4">
        <h1 className="text-2xl font-bold">{t("title")}</h1>
        <Line data={chartData} />
        <ul className="mt-4 text-sm">
          {data.logs.map((log, idx) => (
            <li
              key={idx}
            >{`${log.event} – ${log.page ?? "-"} – ${new Date(log.createdAt).toLocaleDateString()}`}</li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
