import type { LatLngExpression } from "leaflet";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { useTheme } from "next-themes";

export interface MapPoint {
  position: [number, number];
  label?: string;
}

export interface MapWidgetProps {
  points: MapPoint[];
  initialZoom?: number;
}

export default function MapWidget({ points, initialZoom = 3 }: MapWidgetProps) {
  const { resolvedTheme } = useTheme();
  const dark = resolvedTheme === "dark";

  return (
    <MapContainer center={[0, 0]} className="h-72 w-full" zoom={initialZoom}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url={
          dark
            ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        }
      />
      <MarkerClusterGroup chunkedLoading>
        {points.map(({ position, label }) => (
          <Marker key={position.join()} position={position as LatLngExpression}>
            {label ? <Popup>{label}</Popup> : null}
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
}
