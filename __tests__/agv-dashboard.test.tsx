import { render, screen } from "@testing-library/react";

import AGVDashboard from "@/components/premium/dashboards/AGVDashboard";

jest.mock("react-chartjs-2", () => ({
  Line: () => <div>chart</div>,
}));

jest.mock("@/components/hooks/useWebSocket", () => () => ({
  data: { timestamp: Date.now(), speed: 1, battery: 1 },
  send: jest.fn(),
}));

test("renders AGV dashboard chart", () => {
  render(<AGVDashboard />);
  expect(screen.getByText("chart")).toBeInTheDocument();
});
