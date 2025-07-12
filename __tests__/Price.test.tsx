import { render, screen } from "@testing-library/react";

import Price from "@/components/premium/Price";

test("renders formatted price", () => {
  render(<Price amount="9.5" currencyCode="EUR" />);
  expect(screen.getByText("EUR", { exact: false })).toBeInTheDocument();
});
