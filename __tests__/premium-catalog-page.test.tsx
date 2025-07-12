import { render, screen, waitFor } from "@testing-library/react";

import PremiumCatalogPage from "@/pages/dashboard/premium-catalog";
jest.mock("@/components/premium/3d/BIMViewer", () => ({
  __esModule: true,
  default: function MockViewer() {
    return <div>viewer</div>;
  },
}));

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key.split(".").pop(),
}));

jest.mock("next-auth/react", () => ({
  useSession: () => ({ data: { user: { plan: "free" } } }),
}));

global.fetch = jest.fn().mockResolvedValue({
  json: async () => ({
    templates: [
      {
        name: "Template 1",
        description: "desc",
        image: "url",
        tags: ["blog"],
        type: "blog",
        model: "",
      },
    ],
  }),
});

test("renders catalog items", async () => {
  render(<PremiumCatalogPage />);

  await waitFor(() => {
    expect(screen.getByText("Template 1")).toBeInTheDocument();
  });

  expect(fetch).toHaveBeenCalled();
});
