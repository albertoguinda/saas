import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Card } from "@heroui/card";
import { Alert, FormAlert } from "@heroui/alert";

import AuthLayout from "@/layouts/auth";
import {
  registerSchema,
  type RegisterData,
} from "@/lib/validations/auth";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
  });
  const [apiError, setApiError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: RegisterData) => {
    setApiError("");
    setSuccess(false);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) {
      setApiError(result.error || "Error al registrar");
      return;
    }

    setSuccess(true);
    setTimeout(() => {
      router.push("/auth/login");
    }, 1500);
  };

  return (
    <AuthLayout>
      <Card className="w-full max-w-md mx-auto shadow-2xl flex flex-col gap-6 p-8">
        <h1 className="text-xl font-semibold text-center">Crear cuenta gratuita</h1>
        {apiError && (
          <Alert color="danger" className="mb-2">
            {apiError}
          </Alert>
        )}
        {success && (
          <Alert color="success" className="mb-2">
            Usuario creado correctamente. Redirigiendo...
          </Alert>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Input
            label="Nombre"
            type="text"
            autoComplete="name"
            placeholder="Tu nombre"
            {...register("name")}
          />
          {errors.name && (
            <FormAlert color="danger">{errors.name.message}</FormAlert>
          )}
          <Input
            label="Email"
            type="email"
            autoComplete="email"
            placeholder="alberto@gmail.com"
            {...register("email")}
          />
          {errors.email && (
            <FormAlert color="danger">{errors.email.message}</FormAlert>
          )}
          <Input
            label="Contraseña"
            type="password"
            autoComplete="new-password"
            placeholder="••••••••"
            {...register("password")}
          />
          {errors.password && (
            <FormAlert color="danger">{errors.password.message}</FormAlert>
          )}
          <Button type="submit" isLoading={isSubmitting} className="w-full">
            Registrarse gratis
          </Button>
        </form>
        <p className="text-center text-sm text-default-500">
          ¿Ya tienes cuenta?{" "}
          <Link href="/auth/login" className="text-blue-600 hover:underline">
            Inicia sesión aquí
          </Link>
        </p>
      </Card>
    </AuthLayout>
  );
}
