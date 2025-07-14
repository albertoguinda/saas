import { render, screen } from "@testing-library/react";

import Banner from "@/components/premium/ui/Banner";

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key.split(".").pop(),
}));

test("renders banner", () => {
  render(<Banner ctaHref="#" ctaText="Go" subtitle="World" title="Hello" />);
  expect(screen.getByText("Hello")).toBeInTheDocument();
  expect(screen.getByText("World")).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /Go/ })).toBeInTheDocument();
});
