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
