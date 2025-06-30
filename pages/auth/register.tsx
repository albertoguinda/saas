import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Card } from "@heroui/card";
import { Alert } from "@heroui/alert";

import AuthLayout from "@/layouts/auth";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error || "Error al registrar");
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
        {error && (
          <Alert color="danger" className="mb-2">
            {error}
          </Alert>
        )}
        {success && (
          <Alert color="success" className="mb-2">
            Usuario creado correctamente. Redirigiendo...
          </Alert>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Nombre"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Tu nombre"
            value={form.name}
            onChange={handleChange}
            required
          />
          <Input
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="alberto@gmail.com" // USUARIO DEMO
            value={form.email}
            onChange={handleChange}
            required
          />
          <Input
            label="Contraseña"
            name="password"
            type="password"
            autoComplete="new-password"
            placeholder="123456" // PASS DEMO
            value={form.password}
            onChange={handleChange}
            required
            minLength={6}
          />
          <Button type="submit" isLoading={loading} className="w-full">
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
