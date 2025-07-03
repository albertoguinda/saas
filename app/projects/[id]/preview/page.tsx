import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import Site from "@/lib/models/site";
import Landing, { SiteDoc } from "@/components/landing/Landing";

interface PreviewPageProps {
  params: { id: string };
}

export default async function PreviewPage({ params }: PreviewPageProps) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/login");

  await dbConnect();
  const site = await Site.findById(params.id).lean();
  if (!site || site.userId !== session.user.id) {
    redirect("/dashboard");
  }

  const plainSite = site as unknown as SiteDoc;

  return <Landing site={plainSite} />;
}
