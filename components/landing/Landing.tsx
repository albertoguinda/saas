import { Card } from "@heroui/card";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { title as titleStyle, subtitle } from "@/components/primitives";
import { Check, Layout, ImageIcon } from "lucide-react";
import clsx from "clsx";

export interface SiteDoc {
  _id: string;
  userId: string;
  slug: string;
  title: string;
  structure: { template?: string };
}

export interface LandingProps {
  site: SiteDoc;
}

const FEATURES = [
  { icon: Layout, title: "Diseño responsivo", desc: "Se adapta a cualquier pantalla." },
  { icon: ImageIcon, title: "Imágenes optimizadas", desc: "Carga rápida y calidad." },
  { icon: Check, title: "SEO básico", desc: "Estructura lista para buscadores." },
];

export default function Landing({ site }: LandingProps) {
  const template = site.structure?.template ?? "default";

  const Hero = (
    <section className="py-20 text-center">
      <h1 className={clsx(titleStyle({ size: "lg" }), "mb-4")}>{site.title}</h1>
      <p className={clsx(subtitle(), "mx-auto max-w-xl")}>Tu web generada al instante.</p>
    </section>
  );

  const Features = (
    <section className="py-16 bg-default-50">
      <div className="container mx-auto grid gap-8 md:grid-cols-3">
        {FEATURES.map(({ icon: Icon, title, desc }) => (
          <Card key={title} className="p-6 flex flex-col items-center text-center gap-2">
            <Icon className="w-8 h-8 text-primary" />
            <h3 className="font-semibold">{title}</h3>
            <p className="text-sm text-default-500">{desc}</p>
          </Card>
        ))}
      </div>
    </section>
  );

  const CTA = (
    <section className="py-20 text-center">
      <Button as={Link} href="/dashboard" color="primary">
        Volver al dashboard
      </Button>
    </section>
  );

  if (template === "blog") {
    return (
      <div className="flex flex-col">
        {Hero}
        {CTA}
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {Hero}
      {Features}
      {CTA}
    </div>
  );
}
