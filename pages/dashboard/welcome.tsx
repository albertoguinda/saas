import { Card } from "@heroui/card";
import { Button } from "@heroui/button";
import { Alert } from "@heroui/alert";
import { useRouter } from "next/router";
import { User } from "lucide-react";
import { useSession } from "next-auth/react";

export default function WelcomeDashboard() {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <div className="max-w-2xl mx-auto py-16">
      <Card className="flex flex-col items-center gap-8 p-10 shadow-2xl">
        <div className="flex flex-col items-center gap-2">
          <User className="w-12 h-12 text-primary mb-2" />
          <h1 className="text-3xl font-bold">
            ¡Bienvenido{session?.user?.name ? `, ${session.user.name}` : ""}!
          </h1>
          <p className="text-default-500 text-center">
            Ya tienes acceso al plan{" "}
            <span className="font-semibold text-green-600">FREE</span>.<br />
            Puedes crear hasta <b>1 proyecto</b> y acceder a tu panel personal.
            <br />
            ¿Listo para empezar?
          </p>
        </div>
        <div className="flex gap-4 mt-4">
          <Button
            color="primary"
            size="lg"
            onClick={() => router.push("/dashboard/projects")}
          >
            Crear mi primer proyecto
          </Button>
          <Button
            variant="bordered"
            onClick={() => router.push("/dashboard/profile")}
          >
            Ver mi perfil
          </Button>
        </div>
        <Alert className="mt-6" color="primary">
          Puedes mejorar tu plan en cualquier momento para desbloquear más
          proyectos y ventajas.
        </Alert>
      </Card>
    </div>
  );
}
