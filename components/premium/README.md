# Premium Components

## Price

`Price` formats a numeric string into a localized currency value.

### Props

- `amount` (string): numeric value to display.
- `currencyCode` (string): ISO currency code (default `"USD"`).
- `currencyCodeClassName` (string): additional classes for the currency code span.
- Any other props are passed to the underlying `<p>` element.

### Example

```tsx
import Price from "@/components/premium/Price";

function Example() {
  return <Price amount="19.99" currencyCode="EUR" />;
}
```

## MapWidget

Interactive map with clustering and dark mode support.

Import `leaflet/dist/leaflet.css` once in your app for default styles.

### Props

- `points` (MapPoint[]): list of markers with position `[lat, lng]` and optional label.
- `initialZoom` (number): initial map zoom (default `3`).

### Example

```tsx
import MapWidget from "@/components/premium/MapWidget";

<MapWidget points={[{ position: [51.5, -0.1], label: "London" }]} />;
```

![Demo](../../public/mapwidget.png)

## BookingForm

Advanced booking form with validation and i18n.

### Props

- `services` (`Service[]`): options for the service select.
- `onSubmit` (`(data: BookingInput) => Promise<void>`): called on successful submit.
- `className` (`string`): optional wrapper class.

### Example

```tsx
import { BookingForm } from "@/components/premium/forms";

<BookingForm services={[{ id: "cut", name: "Hair Cut" }]} />;
```

## SchedulerWidget

Schedule management with selectable time slots and the ability to block them.

### Props

- `startHour` (`string`): schedule start in `HH:mm`.
- `endHour` (`string`): schedule end in `HH:mm`.
- `initialBlocks` (`string[]`): initially blocked slots.
- `onChange` (`(data: { selected: string | null; blocks: string[] }) => void`): fired on selection or blocking.

### Example

```tsx
import { SchedulerWidget } from "@/components/premium/schedulers";

<SchedulerWidget startHour="09:00" endHour="17:00" />;
```

## BIMViewer

Interactive 3D viewer for BIM models using Three.js.

### Props

- `modelSrc` (`string`): URL of the model file.
- `controls` (`boolean`): enable orbit controls (default `true`).
- `environment` (`"default" | "night" | "studio"`): lighting preset (default `"default"`).
- `enableVR` (`boolean`): show VR entry button if supported.
- `onLoad` (`() => void`): called when the model is loaded.
- `onError` (`(error: Error) => void`): called on load error.

> For IFC models copy `web-ifc.wasm` from `web-ifc-three` into your `public/` folder.

### Example

```tsx
import { BIMViewer } from "@/components/premium/3d";

<BIMViewer modelSrc="/models/house.glb" environment="studio" />;
```

## SensorPanel

Real-time sensor chart supporting humidity, temperature and light.

### Props

- `sensorType` (`"humidity" | "temp" | "light"`): sensor data type.
- `updateMode` (`"realtime" | "interval"`): update behavior.
- `unit` (`string`): unit label.
- `onAlert` (`(value: number) => void`): called when thresholds exceeded.
- `maxThreshold` (`number`): optional max value for alerts.
- `minThreshold` (`number`): optional min value for alerts.

### Example

```tsx
import SensorPanel from "@/components/premium/iot/SensorPanel";

<SensorPanel sensorType="temp" updateMode="realtime" unit="°C" />;
```
