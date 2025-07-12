import { render, screen } from "@testing-library/react";

import Landing from "@/components/landing/Landing";

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

describe("Landing", () => {
  test("shows fallback message when title missing", () => {
    render(
      <Landing
        site={{ _id: "1", userId: "u", slug: "s", title: "", structure: {} }}
      />,
    );

    expect(screen.getByText("notFound.desc")).toBeInTheDocument();
  });
});
