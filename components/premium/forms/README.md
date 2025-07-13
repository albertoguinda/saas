# BookingForm

Advanced booking form with validation and i18n.

## Props

- `services` (`Service[]`): options for the service select.
- `onSubmit` (`(data: BookingInput) => Promise<void>`): called on successful submit.
- `className` (`string`): optional wrapper class.

`Service` has `{ id: string; name: string }` and `BookingInput` matches the form fields.

## Example

```tsx
import { BookingForm } from "@/components/premium/forms";

<BookingForm
  services={[{ id: "cut", name: "Hair Cut" }]}
  onSubmit={(data) => console.log(data)}
/>;
```
