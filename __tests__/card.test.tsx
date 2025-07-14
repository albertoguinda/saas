import { render, screen } from "@testing-library/react";
import { Star } from "lucide-react";

import Card from "@/components/premium/ui/Card";

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key.split(".").pop(),
}));

test("renders card", () => {
  render(<Card desc="desc" icon={Star} title="Feat" />);
  expect(screen.getByText("Feat")).toBeInTheDocument();
  expect(screen.getByText("desc")).toBeInTheDocument();
});
