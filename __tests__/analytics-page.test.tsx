import { render, screen, waitFor, fireEvent } from "@testing-library/react";

import AnalyticsPage from "@/pages/dashboard/analytics";

jest.mock("react-chartjs-2", () => ({
  Bar: () => <div>chart</div>,
}));

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key.split(".").pop(),
}));

global.fetch = jest.fn().mockResolvedValue({
  json: async () => ({ visits: 1, upgrades: 2, wizard: 3 }),
});

test("loads data and renders chart", async () => {
  render(<AnalyticsPage />);

  await waitFor(() => {
    expect(screen.getByText("chart")).toBeInTheDocument();
  });
  expect(fetch).toHaveBeenCalled();

  fireEvent.change(screen.getByRole("combobox"), {
    target: { value: "week" },
  });
  await waitFor(() => expect(fetch).toHaveBeenCalledTimes(2));
});
