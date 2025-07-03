import { notFound } from "next/navigation";
import dbConnect from "@/lib/dbConnect";
import Site from "@/lib/models/site";
import Landing, { SiteDoc } from "@/components/landing/Landing";

interface PageProps {
  params: { slug: string };
}

export default async function PublicSite({ params }: PageProps) {
  await dbConnect();
  const site = await Site.findOne({ slug: params.slug }).lean();

  if (!site) notFound();

  const plainSite = site as unknown as SiteDoc;

  return <Landing site={plainSite} />;
}
