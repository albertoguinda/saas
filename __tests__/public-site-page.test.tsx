import PublicSite from "@/app/[slug]/page";
import { getSite, setSite } from "@/lib/cache";
jest.mock("@/components/landing/Landing", () => ({
  __esModule: true,
  default: jest.fn(() => <div>landing</div>),
}));
jest.mock("@/lib/cache", () => ({
  getSite: jest.fn(),
  setSite: jest.fn(),
}));
jest.mock("next/navigation", () => ({
  notFound: jest.fn(),
}));

jest.mock("@/lib/dbConnect", () => jest.fn());

jest.mock("@/lib/models/site", () => ({
  __esModule: true,
  default: {
    findOne: () => ({
      lean: () => ({
        _id: "2",
        userId: "u",
        slug: "demo",
        title: "Demo",
        structure: {},
      }),
    }),
  },
}));

jest.mock("@/lib/models/user", () => ({
  __esModule: true,
  default: { findById: () => ({ lean: () => ({ plan: "free" }) }) },
}));

describe("PublicSite page", () => {
  afterEach(() => {
    process.env.NODE_ENV = "test";
    jest.clearAllMocks();
  });
  test("returns site from cache", async () => {
    getSite.mockResolvedValue(
      JSON.stringify({
        _id: "1",
        userId: "u",
        slug: "s",
        title: "t",
        structure: {},
      }),
    );

    const el = await PublicSite({ params: { slug: "s" } });

    expect(el.props.site).toEqual({
      _id: "1",
      userId: "u",
      slug: "s",
      title: "t",
      structure: {},
    });
    expect(setSite).not.toHaveBeenCalled();
  });

  test("uses mock when db fails", async () => {
    getSite.mockResolvedValue(null);
    const dbConnect = require("@/lib/dbConnect");

    dbConnect.mockImplementation(() => {
      throw new Error("fail");
    });

    process.env.NODE_ENV = "development";

    const el = await PublicSite({ params: { slug: "demo" } });

    expect(el.props.site.title).toBe("Demo site");
  });
});
