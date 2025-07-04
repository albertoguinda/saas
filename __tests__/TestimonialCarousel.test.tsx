import { render, screen, fireEvent } from "@testing-library/react";

import TestimonialCarousel from "@/components/premium/TestimonialCarousel";

test("cycles testimonials", () => {
  render(<TestimonialCarousel />);
  expect(screen.getByText(/Great tool/)).toBeInTheDocument();
  fireEvent.click(screen.getByText("Next"));
  expect(screen.getByText(/Amazing support/)).toBeInTheDocument();
});
