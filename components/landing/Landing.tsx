import { Card } from "@heroui/card";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { Check, Layout, ImageIcon } from "lucide-react";

import { title as titleStyle, subtitle } from "@/components/primitives";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

const POSTS = [
  { title: "Primer post", desc: "Lorem ipsum dolor sit amet." },
  { title: "Segundo post", desc: "Consectetur adipiscing elit." },
  { title: "Tercer post", desc: "Sed do eiusmod tempor." },
];

export interface SiteDoc {
  _id: string;
  userId: string;
  slug: string;
  title: string;
  structure: {
    template?: string;
    color?: string;
    font?: string;
  };
}

export interface LandingProps {
  site: SiteDoc;
}

const FEATURES = [
  {
    icon: Layout,
    title: "features.responsive.title",
    desc: "features.responsive.desc",
  },
  {
    icon: ImageIcon,
    title: "features.images.title",
    desc: "features.images.desc",
  },
  {
    icon: Check,
    title: "features.seo.title",
    desc: "features.seo.desc",
  },
];

export default function Landing({ site }: LandingProps) {
  const t = useTranslations("landing");
  const template = site.structure?.template ?? "default";
  const color = site.structure?.color ?? "indigo";
  const font = site.structure?.font ?? "sans";
  const COLOR_CLASSES: Record<string, string> = {
    indigo: "text-indigo-600",
    emerald: "text-emerald-600",
    rose: "text-rose-600",
  };
  const FONT_CLASSES: Record<string, string> = {
    serif: "font-serif",
    mono: "font-mono",
    sans: "",
  };

  const Hero = (
    <section className="py-24 text-center">
      <h1
        className={cn(
          titleStyle({ size: "lg" }),
          "mb-4",
          COLOR_CLASSES[color],
          FONT_CLASSES[font],
        )}
      >
        {site.title}
      </h1>
      <p className={cn(subtitle(), "mx-auto max-w-xl mb-8")}>{t("tagline")}</p>
      <Button as={Link} color="primary" href="/auth/login">
        {t("start")}
      </Button>
    </section>
  );

  const Features = (
    <section className="py-16 bg-default-50">
      <div className="container mx-auto grid gap-8 md:grid-cols-3">
        {FEATURES.map(({ icon: Icon, title, desc }) => (
          <Card
            key={title}
            className="p-6 flex flex-col items-center text-center gap-2"
          >
            <Icon className={cn("w-8 h-8", COLOR_CLASSES[color])} />
            <h3 className="font-semibold">{t(title)}</h3>
            <p className="text-sm text-default-500">{t(desc)}</p>
          </Card>
        ))}
      </div>
    </section>
  );

  const BlogPosts = (
    <section className="py-16">
      <div className="container mx-auto">
        <h2 className="text-center text-xl font-semibold mb-8">
          {t("latest")}
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {POSTS.map(({ title, desc }) => (
            <Card key={title} className="p-6 flex flex-col gap-2">
              <h3 className="font-semibold">{title}</h3>
              <p className="text-sm text-default-500">{desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );

  return (
    <div className="flex flex-col min-h-screen">
      {Hero}
      {Features}
      {template === "blog" && BlogPosts}
      <footer className="mt-auto py-6 text-center text-sm text-default-500 border-t">
        &copy; {new Date().getFullYear()}{" "}
        <Link isExternal href="https://www.heroui.com">
          SaaS Web Builder
        </Link>
      </footer>
    </div>
  );
}
