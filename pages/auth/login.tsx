import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";

import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Card } from "@heroui/card"; // Solo Card, hijos directos
import { Alert } from "@heroui/alert";

import AuthLayout from "@/layouts/auth";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      redirect: false,
      email: form.email,
      password: form.password,
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
          <Alert color="danger" className="mb-2">
            {error}
          </Alert>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="alberto@gmail.com" // USUARIO PRUEBA
            value={form.email}
            onChange={handleChange}
            required
          />
          <Input
            label="Contraseña"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="••••••••" // EJEMPLO GENERICO
            value={form.password}
            onChange={handleChange}
            required
          />
          <Button type="submit" isLoading={loading} className="w-full">
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
