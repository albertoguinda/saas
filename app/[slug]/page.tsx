import { notFound } from "next/navigation";
import dbConnect from "@/lib/dbConnect";
import Site from "@/lib/models/site";
import Landing, { SiteDoc } from "@/components/landing/Landing";

interface PageProps {
  params: { slug: string };
}

export default async function PublicSite({ params }: PageProps) {
  // ⚠️ Capturamos el slug ANTES de cualquier await:
  const { slug } = params;

  await dbConnect();
  const site = await Site.findOne({ slug }).lean();

  if (!site) notFound();

  return <Landing site={site as unknown as SiteDoc} />;
}
