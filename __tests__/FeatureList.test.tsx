import { render, screen } from "@testing-library/react";

import FeatureList from "@/components/premium/FeatureList";

test("shows features", () => {
  render(<FeatureList features={["A", "B"]} />);
  expect(screen.getByText("A")).toBeInTheDocument();
});
