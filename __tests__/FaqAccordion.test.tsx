import { render, screen, fireEvent } from "@testing-library/react";

import FaqAccordion from "@/components/premium/FaqAccordion";

test("toggles answers", () => {
  render(<FaqAccordion />);
  const question = screen.getByText("How does it work?");

  fireEvent.click(question);
  expect(screen.getByText("Just sign up and start.")).toBeInTheDocument();
});
