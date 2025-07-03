// pages/dashboard/index.tsx
import { Card } from "@heroui/card";
import { Button } from "@heroui/button";
import { Alert } from "@heroui/alert";
import { useSession } from "next-auth/react";
import PlanBadge from "@/components/PlanBadge";
import { useRouter } from "next/router";
import { LayoutDashboard, User, Zap } from "lucide-react";
import { useState, useEffect } from "react";

export default function DashboardHome() {
  const { data: session } = useSession();
  const router = useRouter();

  const [projectsCount, setProjectsCount] = useState(0);
  const projectLimit = 1;

  useEffect(() => {
    fetch("/api/sites")
      .then((res) => res.json())
      .then((data) => setProjectsCount(data.sites?.length ?? 0))
      .catch(() => setProjectsCount(0));
  }, []);

  return (
    <div className="max-w-3xl mx-auto py-12">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        {session?.user?.name ? `Hola, ${session.user.name}!` : "Bienvenido a tu Dashboard"}
        {session?.user?.plan && <PlanBadge plan={session.user.plan} />}
      </h1>
      <div className="grid md:grid-cols-2 gap-6">
        {/* Tarjeta Proyectos */}
        <Card className="flex flex-col gap-4 p-6 items-center text-center">
          <LayoutDashboard size={36} className="text-violet-600 mb-1" />
          <span className="font-semibold">Tus proyectos</span>
          <div>
            <span className="text-lg">{projectsCount}</span> / {projectLimit} en plan Free
          </div>
          <Button
            color="primary"
            onClick={() => router.push("/dashboard/projects")}
            className="w-full"
          >
            Ver proyectos
          </Button>
        </Card>

        {/* Tarjeta Perfil */}
        <Card className="flex flex-col gap-4 p-6 items-center text-center">
          <User size={36} className="text-violet-600 mb-1" />
          <span className="font-semibold">Tu perfil</span>
          <div className="text-default-500">Actualiza tu información personal y tu contraseña.</div>
          <Button
            color="secondary"
            variant="bordered"
            onClick={() => router.push("/dashboard/profile")}
            className="w-full"
          >
            Editar perfil
          </Button>
        </Card>
      </div>

      {/* Aviso de límite */}
      {projectsCount >= projectLimit && (
        <div className="mt-8">
          <Alert color="warning" className="inline-block">
            Has alcanzado el máximo de proyectos en el plan Free.
            <Button
              size="sm"
              color="warning"
              variant="light"
              className="ml-2"
              onClick={() => router.push("/pricing")}
              startContent={<Zap />}
            >
              Mejorar plan
            </Button>
          </Alert>
        </div>
      )}

      <div className="mt-10 text-center text-sm text-default-400">
        <Button
          color="default"
          variant="ghost"
          size="sm"
          onClick={() => router.push("/dashboard/welcome")}
        >
          Ir a la bienvenida
        </Button>
      </div>
    </div>
  );
}
