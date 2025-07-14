import { Layout, Rocket, ImageIcon } from "lucide-react";

import DefaultLayout from "@/layouts/default";
import { Banner, Card } from "@/components/premium/ui";

export default function DemoLandingPage() {
  return (
    <DefaultLayout>
      <div className="space-y-16 py-20">
        <Banner
          animationType="slide"
          ctaHref="/"
          ctaText="Start"
          imageSrc="/banner.png"
          subtitle="Build pages in seconds"
          title="SaaS Builder"
        />
        <div className="container mx-auto grid gap-8 md:grid-cols-3">
          <Card desc="Fits any screen" icon={Layout} title="Responsive" />
          <Card desc="Showcase your work" icon={ImageIcon} title="Images" />
          <Card desc="Deploy fast" icon={Rocket} title="Launch" />
        </div>
      </div>
    </DefaultLayout>
  );
}
