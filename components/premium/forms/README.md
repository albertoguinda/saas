# BookingForm

Advanced booking form with validation, theming and i18n.

## Props

- `services` (`Service[]`): options for the service select including price.
- `onSubmit` (`(data: BookingInput) => Promise<void>`): called on successful submit.
- `className` (`string`): optional wrapper class.
- `dateFormat` (`string`): placeholder for the date input (default `DD/MM/YYYY`).
- `validationSchema` (`Yup.ObjectSchema`): custom form validation.
- `enableCoupons` (`boolean`): show coupon field.
- `themeColor` (`string`): color passed to the submit button.

`Service` has `{ id: string; name: string; price: number }` and `BookingInput` matches the form fields.

## Example

```tsx
import { BookingForm } from "@/components/premium/forms";

<BookingForm
  services={[{ id: "cut", name: "Hair Cut", price: 20 }]}
  onSubmit={(data) => console.log(data)}
  enableCoupons
  themeColor="secondary"
/>;
```
