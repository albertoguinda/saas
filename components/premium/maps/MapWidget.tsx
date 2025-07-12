"use client";

import type { LatLngExpression } from "leaflet";

import { useTheme } from "next-themes";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import L from "leaflet";
import clsx from "clsx";
import { useEffect } from "react";

export interface MapRoute {
  positions: LatLngExpression[];
  color?: string;
}

export interface MapMarker {
  position: LatLngExpression;
  label?: string;
}

interface MapWidgetProps {
  center?: LatLngExpression;
  zoom?: number;
  routes?: MapRoute[];
  markers?: MapMarker[];
  theme?: "light" | "dark";
  className?: string;
}

const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  shadowSize: [41, 41],
  shadowAnchor: [12, 41],
});

export default function MapWidget({
  center = [40.4168, -3.7038],
  zoom = 13,
  routes = [],
  markers = [],
  theme,
  className,
}: MapWidgetProps) {
  const { resolvedTheme } = useTheme();
  const current = theme || resolvedTheme;

  useEffect(() => {
    // CSS import moved to _app
  }, []);

  const tileUrl = process.env.NEXT_PUBLIC_MAP_STYLE
    ? `${process.env.NEXT_PUBLIC_MAP_STYLE}{z}/{x}/{y}.png?access_token=${process.env.NEXT_PUBLIC_MAP_TOKEN}`
    : current === "dark"
      ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

  return (
    <MapContainer
      center={center}
      className={clsx("h-96 w-full rounded", className)}
      zoom={zoom}
    >
      <TileLayer url={tileUrl} />
      <MarkerClusterGroup>
        {markers.map((m, i) => (
          <Marker key={i} icon={defaultIcon} position={m.position}>
            {m.label && <Popup>{m.label}</Popup>}
          </Marker>
        ))}
      </MarkerClusterGroup>
      {routes.map((r, i) => (
        <Polyline
          key={i}
          pathOptions={{ color: r.color || "blue" }}
          positions={r.positions}
        />
      ))}
    </MapContainer>
  );
}
