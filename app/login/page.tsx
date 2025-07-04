"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Card } from "@heroui/card"; // Solo Card, hijos directos
import { Alert, FormAlert } from "@heroui/alert";

import AuthLayout from "@/layouts/auth";
import { loginSchema, type LoginInput } from "@/lib/validations/auth";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const onSubmit = async (data: LoginInput) => {
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    setLoading(false);

    if (res?.error) {
      setError("Email o contraseña incorrectos");

      return;
    }

    router.push("/dashboard");
  };

  return (
    <AuthLayout>
      <Card className="w-full max-w-md mx-auto shadow-2xl flex flex-col gap-6 p-8">
        <h1 className="text-xl font-semibold text-center">Iniciar sesión</h1>
        {error && (
          <Alert className="mb-2" color="danger">
            {error}
          </Alert>
        )}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <Input
            autoComplete="email"
            label="Email"
            placeholder="alberto@gmail.com" // USUARIO PRUEBA
            type="email"
            {...register("email")}
          />
          {errors.email && (
            <FormAlert color="danger">{errors.email.message}</FormAlert>
          )}
          <Input
            autoComplete="current-password"
            label="Contraseña"
            placeholder="••••••••" // EJEMPLO GENERICO
            type="password"
            {...register("password")}
          />
          {errors.password && (
            <FormAlert color="danger">{errors.password.message}</FormAlert>
          )}
          <Button className="w-full" isLoading={loading} type="submit">
            Entrar
          </Button>
        </form>
        <p className="text-center text-sm text-default-500">
          ¿No tienes cuenta?{" "}
          <Link className="text-blue-600 hover:underline" href="/register">
            Regístrate aquí
          </Link>
        </p>
      </Card>
    </AuthLayout>
  );
}
