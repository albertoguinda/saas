import { render, screen } from "@testing-library/react";

import PlanBadge from "@/components/PlanBadge";

describe("PlanBadge component", () => {
  it("shows Free by default", () => {
    render(<PlanBadge />);
    expect(screen.getByText(/free/i)).toBeInTheDocument();
  });

  it("shows given plan", () => {
    render(<PlanBadge plan="pro" />);
    expect(screen.getByText(/pro/i)).toBeInTheDocument();
  });
});
