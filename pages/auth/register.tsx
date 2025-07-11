import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Card } from "@heroui/card";
import { Alert, FormAlert } from "@heroui/alert";
import { useTranslations } from "next-intl";

import AuthLayout from "@/layouts/auth";
import { registerSchema, type RegisterInput } from "@/lib/validations/auth";
import { track } from "@/lib/track";
import { notifyError, notifySuccess } from "@/lib/notifications";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });
  const [loading, setLoading] = useState(false);
  const t = useTranslations();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: RegisterInput) => {
    setLoading(true);
    setError("");
    setSuccess(false);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    setLoading(false);

    if (!res.ok) {
      const msg = result.error || t("register.error");

      setError(msg);
      notifyError(msg);

      return;
    }

    setSuccess(true);
    notifySuccess(t("register.success"));
    track("signup_free");
    setTimeout(() => {
      router.push("/auth/login");
    }, 1500);
  };

  return (
    <AuthLayout>
      <Card className="w-full max-w-md mx-auto shadow-2xl flex flex-col gap-6 p-8">
        <h1 className="text-xl font-semibold text-center">
          {t("register.title")}
        </h1>
        {error && (
          <Alert className="mb-2" color="danger" role="alert">
            {error}
          </Alert>
        )}
        {success && (
          <Alert className="mb-2" color="success" role="alert">
            {t("register.success")}
          </Alert>
        )}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <Input
            autoComplete="name"
            label={t("register.name")}
            placeholder="Tu nombre"
            type="text"
            {...register("name")}
          />
          {errors.name && (
            <FormAlert color="danger">{errors.name.message}</FormAlert>
          )}
          <Input
            autoComplete="email"
            inputMode="email"
            label={t("register.email")}
            placeholder="alberto@gmail.com" // USUARIO DEMO
            type="email"
            {...register("email")}
          />
          {errors.email && (
            <FormAlert color="danger">{errors.email.message}</FormAlert>
          )}
          <Input
            autoComplete="new-password"
            label={t("register.password")}
            placeholder="••••••••" // EJEMPLO GENERICO
            type="password"
            {...register("password")}
          />
          {errors.password && (
            <FormAlert color="danger">{errors.password.message}</FormAlert>
          )}
          <Button className="w-full" isLoading={loading} type="submit">
            {t("register.submit")}
          </Button>
        </form>
        <p className="text-center text-sm text-default-500">
          {t("register.login")}{" "}
          <Link className="text-blue-600 hover:underline" href="/auth/login">
            {t("login.title")}
          </Link>
        </p>
      </Card>
    </AuthLayout>
  );
}
