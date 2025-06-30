import { Card } from "@heroui/card";

export default function DocsPage() {
  return (
    <div className="max-w-3xl mx-auto py-16">
      <h1 className="text-3xl font-bold mb-8 text-center">Documentación</h1>
      <Card className="p-8">
        <ul className="list-disc list-inside space-y-4 text-default-700">
          <li>
            <b>¿Cómo crear mi primer proyecto?</b><br />
            Ve a la sección &quot;Proyectos&quot; y pulsa &quot;Nuevo proyecto&quot;. Completa el formulario y ¡listo!
          </li>
          <li>
            <b>¿Cómo actualizo mi perfil?</b><br />
            En la sección &quot;Perfil&quot; puedes cambiar tus datos personales y tu contraseña.
          </li>
          <li>
            <b>¿Qué limitaciones tiene el plan free?</b><br />
            Puedes tener 1 proyecto y acceso a las funciones básicas.
          </li>
          <li>
            <b>¿Cómo mejoro mi plan?</b><br />
            En la sección &quot;Precios&quot; puedes ver las opciones de upgrade (Próximamente).
          </li>
        </ul>
      </Card>
    </div>
  );
}
