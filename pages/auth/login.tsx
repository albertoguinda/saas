import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Card } from "@heroui/card"; // Solo Card, hijos directos
import { Alert, FormAlert } from "@heroui/alert";

import AuthLayout from "@/layouts/auth";
import { loginSchema, type LoginInput } from "@/lib/validations/auth";
import { notifyError } from "@/lib/notifications";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });
  const [loading, setLoading] = useState(false);
  const t = useTranslations();
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
      const msg = t("login.invalid");

      setError(msg);
      notifyError(msg);

      return;
    }

    router.push("/dashboard");
  };

  return (
    <AuthLayout>
      <Card className="w-full max-w-md mx-auto shadow-2xl flex flex-col gap-6 p-8">
        <h1 className="text-xl font-semibold text-center">
          {t("login.title")}
        </h1>
        {error && (
          <Alert className="mb-2" color="danger" role="alert">
            {error}
          </Alert>
        )}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <Input
            autoComplete="email"
            inputMode="email"
            label={t("login.email")}
            placeholder="alberto@gmail.com" // USUARIO PRUEBA
            type="email"
            {...register("email")}
          />
          {errors.email && (
            <FormAlert color="danger">{errors.email.message}</FormAlert>
          )}
          <Input
            autoComplete="current-password"
            label={t("login.password")}
            placeholder="••••••••" // EJEMPLO GENERICO
            type="password"
            {...register("password")}
          />
          {errors.password && (
            <FormAlert color="danger">{errors.password.message}</FormAlert>
          )}
          <Button className="w-full" isLoading={loading} type="submit">
            {t("login.submit")}
          </Button>
        </form>
        <p className="text-center text-sm text-default-500">
          {t("register.login")}{" "}
          <Link className="text-blue-600 hover:underline" href="/auth/register">
            {t("login.register")}
          </Link>
        </p>
      </Card>
    </AuthLayout>
  );
}
