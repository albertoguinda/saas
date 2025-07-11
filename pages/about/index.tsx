import { Card } from "@heroui/card";

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto py-16">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Sobre SaaS Web Builder
      </h1>
      <Card className="p-8 flex flex-col gap-4">
        <p>
          <b>SaaS Web Builder</b> es una plataforma para crear y gestionar
          proyectos web de forma sencilla, rápida y segura.
        </p>
        <p>
          Proyecto open-source en evolución, orientado a que cualquiera pueda
          lanzar su web sin complicaciones.
        </p>
        <p>
          <b>Stack:</b> Next.js, HeroUI, MongoDB Atlas, Tailwind, y mucho
          cariño.
        </p>
        <p>Contacto y feedback bienvenidos.</p>
      </Card>
    </div>
  );
}
