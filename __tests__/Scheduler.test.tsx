import { fireEvent, render, screen } from "@testing-library/react";

import { SchedulerWidget } from "@/components/premium/schedulers";

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key.split(".").pop(),
}));

test("renders slots and toggles", () => {
  render(<SchedulerWidget endHour="10:00" startHour="09:00" />);
  const button = screen.getByRole("button", { name: "09:00" });

  expect(button).toHaveAttribute("aria-pressed", "false");
  fireEvent.click(button);
  expect(button).toHaveAttribute("aria-pressed", "true");
});
