import { render, screen } from "@testing-library/react";

import PricingTable from "@/components/premium/PricingTable";

test("renders pricing plans", () => {
  render(<PricingTable />);
  expect(screen.getByText("Pro")).toBeInTheDocument();
  expect(screen.getByText("$29")).toBeInTheDocument();
});
