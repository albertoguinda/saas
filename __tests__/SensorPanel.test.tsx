import { render, screen } from "@testing-library/react";

import SensorPanel from "@/components/premium/iot/SensorPanel";

jest.mock("@/lib/hooks/useMqtt", () => ({
  useMqtt: () => "42",
}));

jest.mock("@/lib/hooks/useInfluxQuery", () => ({
  useInfluxQuery: () => [
    { _time: "t1", _value: 1 },
    { _time: "t2", _value: 2 },
  ],
}));

jest.mock("react-chartjs-2", () => ({
  Line: () => <div>chart</div>,
}));

describe("SensorPanel", () => {
  test("renders chart", () => {
    render(<SensorPanel sensorType="temp" updateMode="history" />);
    expect(screen.getByText("chart")).toBeInTheDocument();
  });
});
