// app/[slug]/page.tsx
import { notFound } from "next/navigation";

import dbConnect from "@/lib/dbConnect";
import Site from "@/lib/models/site";
import Landing, { SiteDoc } from "@/components/landing/Landing";

export default async function PublicSite({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  await dbConnect();
  const site = (await Site.findOne({ slug }).lean()) as SiteDoc | null;

  if (!site) notFound();

  return <Landing site={site} />;
}
