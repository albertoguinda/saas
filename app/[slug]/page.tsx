// app/[slug]/page.tsx
import { notFound } from "next/navigation";

import dbConnect from "@/lib/dbConnect";
import Site from "@/lib/models/site";
import Landing, { SiteDoc } from "@/components/landing/Landing";

interface PageProps {
  params: { slug: string };
}

export default async function PublicSite({ params }: PageProps) {
  const { slug } = params;

  await dbConnect();
  const site = (await Site.findOne({ slug }).lean()) as SiteDoc | null;

  if (!site) notFound();

  return <Landing site={site} />;
}
