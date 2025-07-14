import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { BookingForm } from "@/components/premium/forms";

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key.split(".").pop(),
}));

jest.mock("@heroui/ripple", () => ({
  __esModule: true,
  Ripple: ({ children }: any) => <>{children}</>,
  useRipple: () => ({ onPress: jest.fn(), onClear: jest.fn(), ripples: [] }),
}));

test("renders services", () => {
  render(
    <BookingForm
      services={[{ id: "1", name: "Cut", price: 10 }]}
      onSubmit={jest.fn()}
    />,
  );
  expect(screen.getByText(/Cut/)).toBeInTheDocument();
});

test("shows validation errors", async () => {
  render(
    <BookingForm
      services={[{ id: "1", name: "Cut", price: 10 }]}
      onSubmit={jest.fn()}
    />,
  );
  fireEvent.click(screen.getByRole("button", { name: /submit/i }));
  await waitFor(() => {
    expect(screen.getByText("nameRequired")).toBeInTheDocument();
  });
});

test("renders coupon field", () => {
  render(
    <BookingForm
      enableCoupons
      services={[{ id: "1", name: "Cut", price: 10 }]}
      onSubmit={jest.fn()}
    />,
  );
  expect(screen.getByLabelText("coupon")).toBeInTheDocument();
});

test("successful submit", async () => {
  const submit = jest.fn().mockResolvedValue(undefined);

  render(
    <BookingForm
      services={[{ id: "1", name: "Cut", price: 10 }]}
      onSubmit={submit}
    />,
  );
  fireEvent.change(screen.getByLabelText("name"), {
    target: { value: "Ada" },
  });
  fireEvent.change(screen.getByLabelText("email"), {
    target: { value: "ada@example.com" },
  });
  fireEvent.change(screen.getByLabelText("service"), {
    target: { value: "1" },
  });
  fireEvent.change(screen.getByLabelText(/date/i), {
    target: { value: "2025-07-13T10:00" },
  });
  fireEvent.click(screen.getByRole("button", { name: /submit/i }));
  await waitFor(() => {
    expect(submit).toHaveBeenCalled();
  });
  expect(await screen.findByText("success")).toBeInTheDocument();
});

test("submit error", async () => {
  const submit = jest.fn().mockRejectedValue(new Error("fail"));

  render(
    <BookingForm
      services={[{ id: "1", name: "Cut", price: 10 }]}
      onSubmit={submit}
    />,
  );
  fireEvent.change(screen.getByLabelText("name"), {
    target: { value: "Ada" },
  });
  fireEvent.change(screen.getByLabelText("email"), {
    target: { value: "ada@example.com" },
  });
  fireEvent.change(screen.getByLabelText("service"), {
    target: { value: "1" },
  });
  fireEvent.change(screen.getByLabelText(/date/i), {
    target: { value: "2025-07-13T10:00" },
  });
  fireEvent.click(screen.getByRole("button", { name: /submit/i }));
  await waitFor(() => {
    expect(submit).toHaveBeenCalled();
  });
  expect(await screen.findByText("fail")).toBeInTheDocument();
});
