import { render } from "@testing-library/react";

import MapWidget from "@/components/premium/maps/MapWidget";

jest.mock("react-leaflet", () => {
  function MapContainer({ children }: { children: React.ReactNode }) {
    return <div className="leaflet-container">{children}</div>;
  }
  function TileLayer() {
    return null;
  }
  function Marker({ children }: { children: React.ReactNode }) {
    return <div>{children}</div>;
  }
  function Popup({ children }: { children: React.ReactNode }) {
    return <div>{children}</div>;
  }
  function Polyline() {
    return null;
  }

  return { MapContainer, TileLayer, Marker, Popup, Polyline };
});

jest.mock("react-leaflet-cluster", () => {
  function Cluster({ children }: { children: React.ReactNode }) {
    return <div>{children}</div>;
  }

  return Cluster;
});

jest.mock("leaflet", () => ({ icon: () => ({}) }));

jest.mock("next-themes", () => ({
  useTheme: () => ({ resolvedTheme: "light" }),
}));

test("renders map container", () => {
  const { container } = render(
    <MapWidget markers={[{ position: [0, 0], label: "A" }]} />,
  );

  expect(container.querySelector(".leaflet-container")).toBeInTheDocument();
});
