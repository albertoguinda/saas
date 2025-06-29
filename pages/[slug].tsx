// pages/[slug].tsx
import { GetServerSideProps } from "next";
import dbConnect from "@/lib/dbConnect";
import Site from "@/lib/models/site";
import { Card } from "@heroui/card";
import { Alert } from "@heroui/alert";

// Props que recibe la página: site (o null) y error opcional
export default function PublicSite({ site, error }: any) {
  if (error) {
    return (
      <div className="max-w-xl mx-auto py-20">
        <Alert variant="destructive">{error}</Alert>
      </div>
    );
  }

  // Renderiza los datos mínimos del sitio
  return (
    <div className="max-w-2xl mx-auto py-20">
      <Card className="p-10 text-center">
        <h1 className="text-3xl font-bold mb-2">{site.title}</h1>
        <div className="text-default-400 mb-8">
          <span className="text-xs">
            Generado el {new Date(site.createdAt).toLocaleDateString()}
          </span>
        </div>
        {/* Aquí puedes renderizar más: sections, estructura, etc. */}
        <pre className="text-xs bg-default-100 p-4 rounded-lg overflow-x-auto text-left">
          {/* Mostrando la estructura raw por ahora */}
          {JSON.stringify(site.structure, null, 2)}
        </pre>
      </Card>
    </div>
  );
}

// SSR para buscar el sitio por slug en Mongo
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { slug } = ctx.params!;
  await dbConnect();

  try {
    const site = await Site.findOne({ slug });
    if (!site) {
      return { props: { error: "Sitio no encontrado" } };
    }
    // Convierte a objeto plano para evitar errores de serialización
    return { props: { site: JSON.parse(JSON.stringify(site)) } };
  } catch {
    return { props: { error: "Error al buscar el sitio" } };
  }
};

/*
  - Esta página pública está abierta para todos.
  - Renderiza por slug: /plantascare, /miweb, etc.
  - Si no existe, da error.
  - Cuando mejores el generador, aquí se renderizará el contenido real.
*/
