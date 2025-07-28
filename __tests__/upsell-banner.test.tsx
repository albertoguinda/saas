import { render, screen } from "@testing-library/react";

import UpsellBanner from "@/components/UpsellBanner";

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key.split(".").pop(),
}));

test("renders upsell banner", () => {
  render(<UpsellBanner />);
  expect(screen.getByText("title")).toBeInTheDocument();
  expect(screen.getByRole("button")).toBeInTheDocument();
});
