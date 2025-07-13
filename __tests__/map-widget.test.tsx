import { render, screen } from "@testing-library/react";

import MapWidget from "@/components/premium/MapWidget";

jest.mock("react-leaflet", () => {
  function MapContainer({ children }: { children: React.ReactNode }) {
    return <div>{children}</div>;
  }

  function TileLayer() {
    return <div>tile</div>;
  }

  function Marker({ children }: { children?: React.ReactNode }) {
    return <div>marker{children}</div>;
  }

  function Popup({ children }: { children?: React.ReactNode }) {
    return <div>{children}</div>;
  }

  return { MapContainer, TileLayer, Marker, Popup };
});

jest.mock("react-leaflet-cluster", () => {
  function MarkerClusterGroup({ children }: { children: React.ReactNode }) {
    return <div>{children}</div>;
  }

  return MarkerClusterGroup;
});

jest.mock("next-themes", () => ({
  useTheme: () => ({ resolvedTheme: "light" }),
}));

test("renders map with markers", () => {
  render(<MapWidget points={[{ position: [0, 0], label: "A" }]} />);
  expect(screen.getByText("A")).toBeInTheDocument();
});
