import AGVDashboard from "@/components/premium/dashboards/AGVDashboard";

export default function AGVDashboardDemo() {
  return (
    <div className="max-w-2xl mx-auto py-12">
      <AGVDashboard refreshInterval={1000} />
    </div>
  );
}
