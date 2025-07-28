import { render, screen, waitFor } from "@testing-library/react";

import PremiumAnalyticsPage from "@/pages/dashboard/analytics-premium";

jest.mock("react-chartjs-2", () => ({ Line: () => <div>chart</div> }));

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key.split(".").pop(),
}));

global.fetch = jest
  .fn()
  .mockResolvedValue({ json: async () => ({ pageViews: [], logs: [] }) });

test("loads premium analytics", async () => {
  render(<PremiumAnalyticsPage />);

  await waitFor(() => {
    expect(screen.getByText("chart")).toBeInTheDocument();
  });
  expect(fetch).toHaveBeenCalled();
});
