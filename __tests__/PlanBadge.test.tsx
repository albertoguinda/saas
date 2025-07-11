import { render, screen } from "@testing-library/react";

import PlanBadge from "@/components/PlanBadge";

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key.split(".").pop(),
}));

test("renders plan label", () => {
  render(<PlanBadge plan="pro" />);
  expect(screen.getByText("pro")).toBeInTheDocument();
});

test("shows trial when active", () => {
  render(<PlanBadge plan="free" trialEndsAt={new Date(Date.now() + 1000)} />);
  expect(screen.getByText("trial")).toBeInTheDocument();
});
