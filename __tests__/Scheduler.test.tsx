import { fireEvent, render, screen } from "@testing-library/react";

import Scheduler from "@/components/premium/schedulers/Scheduler";

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key.split(".").pop(),
}));

test("renders slots and toggles", () => {
  render(<Scheduler endTime="10:00" interval={30} startTime="09:00" />);
  const button = screen.getByRole("button", { name: "09:00" });

  expect(button).toHaveAttribute("aria-pressed", "false");
  fireEvent.click(button);
  expect(button).toHaveAttribute("aria-pressed", "true");
});
