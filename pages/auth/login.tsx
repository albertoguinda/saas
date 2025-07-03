import { useState } from "react";
import { signIn } from "next-auth/react";
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
  loginSchema,
  type LoginData,
} from "@/lib/validations/auth";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });
  const [apiError, setApiError] = useState("");
  const router = useRouter();

  const onSubmit = async (data: LoginData) => {
    setApiError("");
    const res = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (res?.error) {
      setApiError("Email o contraseña incorrectos");
      return;
    }

    router.push("/dashboard");
  };

  return (
    <AuthLayout>
      <Card className="w-full max-w-md mx-auto shadow-2xl flex flex-col gap-6 p-8">
        <h1 className="text-xl font-semibold text-center">Iniciar sesión</h1>
        {apiError && (
          <Alert color="danger" className="mb-2">
            {apiError}
          </Alert>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
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
            autoComplete="current-password"
            placeholder="••••••••"
            {...register("password")}
          />
          {errors.password && (
            <FormAlert color="danger">{errors.password.message}</FormAlert>
          )}
          <Button type="submit" isLoading={isSubmitting} className="w-full">
            Entrar
          </Button>
        </form>
        <p className="text-center text-sm text-default-500">
          ¿No tienes cuenta?{" "}
          <Link href="/auth/register" className="text-blue-600 hover:underline">
            Regístrate aquí
          </Link>
        </p>
      </Card>
    </AuthLayout>
  );
}
