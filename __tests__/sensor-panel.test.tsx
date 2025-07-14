import { render, screen } from "@testing-library/react";

import SensorPanel from "@/components/premium/iot/SensorPanel";
jest.mock("next-themes", () => ({
  useTheme: () => ({ resolvedTheme: "light" }),
}));
jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key.split(".").pop(),
}));

jest.mock("react-chartjs-2", () => ({
  Line: () => <div>chart</div>,
}));

jest.mock("@/components/hooks/useMockSensorData", () => () => ({
  value: 42,
}));

test("renders sensor panel chart and triggers onData", () => {
  const onData = jest.fn();

  render(
    <SensorPanel
      sensorType="temperature"
      updateMode="stream"
      onData={onData}
    />,
  );
  expect(screen.getByText("chart")).toBeInTheDocument();
  expect(onData).toHaveBeenCalledWith(42);
});
