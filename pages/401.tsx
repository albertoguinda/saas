import Link from "next/link";
import { Button } from "@heroui/button";

import DefaultLayout from "@/layouts/default";

export default function UnauthorizedPage() {
  return (
    <DefaultLayout>
      <div className="max-w-lg mx-auto py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">401 - Acceso no autorizado</h1>
        <p className="mb-6">Debes iniciar sesión para continuar.</p>
        <Button as={Link} color="primary" href="/auth/login">
          Ir al login
        </Button>
      </div>
    </DefaultLayout>
  );
}
