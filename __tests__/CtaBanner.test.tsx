import { render, screen } from "@testing-library/react";

import CtaBanner from "@/components/premium/CtaBanner";

test("renders CTA text and button", () => {
  render(<CtaBanner button="Go" href="/start" text="Join now" />);
  expect(screen.getByText("Join now")).toBeInTheDocument();
  expect(screen.getByText("Go")).toBeInTheDocument();
});
