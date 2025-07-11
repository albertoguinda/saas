import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";

import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import Site from "@/lib/models/site";
import Landing, { SiteDoc } from "@/components/landing/Landing";

interface PreviewPageProps {
  params: { id: string };
}

export default async function PreviewPage({ params }: PreviewPageProps) {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/401");

  await dbConnect();
  const site = await Site.findById(params.id).lean();

  if (!site || site.userId !== session.user.id) {
    redirect("/dashboard");
  }

  const plainSite = site as unknown as SiteDoc;

  return (
    <div className="relative">
      <div className="fixed top-0 inset-x-0 z-50 bg-primary text-primary-foreground py-2 text-center flex items-center justify-center gap-2 text-sm">
        <span>Vista previa —</span>
        <Button
          as={Link}
          color="primary"
          href="/dashboard"
          size="sm"
          variant="flat"
        >
          Volver al dashboard
        </Button>
      </div>
      <div className="pt-12">
        <Landing site={plainSite} />
      </div>
    </div>
  );
}
