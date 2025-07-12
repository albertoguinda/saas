import { render, screen, fireEvent } from "@testing-library/react";

import BookingForm from "@/components/premium/forms/BookingForm";

jest.mock("@heroui/ripple", () => ({
  __esModule: true,
  Ripple: ({ children }: any) => <>{children}</>,
  useRipple: () => ({ onPress: jest.fn(), onClear: jest.fn(), ripples: [] }),
}));

jest.mock("@heroui/input", () => ({
  Input: ({ label, ...rest }: any) => <input aria-label={label} {...rest} />,
}));
jest.mock("@heroui/button", () => ({
  Button: ({ children, ...rest }: any) => <button {...rest}>{children}</button>,
}));
jest.mock("@heroui/alert", () => ({
  FormAlert: ({ children }: any) => <div role="alert">{children}</div>,
}));

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

function renderForm() {
  return render(<BookingForm onSubmit={jest.fn()} />);
}

describe("BookingForm", () => {
  test("renders inputs", () => {
    renderForm();
    expect(screen.getByLabelText("Nombre")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });

  test("shows errors on empty submit", async () => {
    renderForm();
    fireEvent.click(screen.getByRole("button", { name: /reservar/i }));
    expect(await screen.findAllByRole("alert")).toHaveLength(4);
  });
});
