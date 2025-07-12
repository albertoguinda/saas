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
