// app/[slug]/page.tsx
import { notFound } from "next/navigation";

import dbConnect from "@/lib/dbConnect";
import Site from "@/lib/models/site";
import User from "@/lib/models/user";
import { getSite, setSite } from "@/lib/cache";
import Landing, { SiteDoc } from "@/components/landing/Landing";
import { logger } from "@/lib/logger";

export default async function PublicSite({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  let site: SiteDoc | null = null;
  let fromCache = false;

  try {
    const cached = await getSite(slug);

    if (cached) {
      site = JSON.parse(cached) as SiteDoc;
      fromCache = true;
    }
  } catch (err) {
    logger.warn("[cache] error", err);
  }

  if (!site) {
    try {
      await dbConnect();
      site = (await Site.findOne({ slug }).lean()) as SiteDoc | null;
    } catch (err) {
      logger.warn("[db] connection failed", err);
      if (process.env.NODE_ENV === "development") {
        site = {
          _id: "mock",
          userId: "mock",
          slug,
          title: "Demo site",
          structure: {},
        };
      }
    }
  }

  if (!site || !site.title) notFound();

  if (!fromCache) {
    try {
      const user = await User.findById(site.userId).lean();
      const plan = user?.plan ?? "free";

      await setSite(slug, JSON.stringify(site), plan);
    } catch (err) {
      logger.warn("[cache] set failed", err);
    }
  }

  return <Landing site={site} />;
}
