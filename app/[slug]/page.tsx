// app/[slug]/page.tsx
import { notFound } from "next/navigation";

import dbConnect from "@/lib/dbConnect";
import Site from "@/lib/models/site";
import User from "@/lib/models/user";
import { getSite, setSite } from "@/lib/cache";
import Landing, { SiteDoc } from "@/components/landing/Landing";

export default async function PublicSite({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const cached = await getSite(slug);

  if (cached) {
    return <Landing site={JSON.parse(cached) as SiteDoc} />;
  }

  await dbConnect();
  const site = (await Site.findOne({ slug }).lean()) as SiteDoc | null;

  if (!site) notFound();

  const user = await User.findById(site.userId).lean();
  const plan = user?.plan || "free";

  await setSite(slug, JSON.stringify(site), plan);

  return <Landing site={site} />;
}
