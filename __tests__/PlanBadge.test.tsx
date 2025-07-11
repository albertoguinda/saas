import { render, screen } from "@testing-library/react";

import PlanBadge from "@/components/PlanBadge";

test("renders plan label", () => {
  render(<PlanBadge plan="pro" />);
  expect(screen.getByText("pro")).toBeInTheDocument();
});
