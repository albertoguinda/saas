"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card } from "@heroui/card";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Alert, FormAlert } from "@heroui/alert";
import { toast } from "@heroui/toast";

import { track } from "@/lib/track";

const schema = z.object({
  title: z.string().min(3, "Mínimo 3 caracteres"),
  slug: z.string().regex(/^[a-z0-9-]+$/, "Solo minúsculas, números y guiones"),
  template: z.enum(["one-page", "blog"]),
  color: z.enum(["indigo", "emerald", "rose"]).default("indigo"),
  font: z.enum(["sans", "serif", "mono"]).default("sans"),
});

type FormData = z.infer<typeof schema>;

export default function WizardPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const [apiError, setApiError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      slug: "",
      template: "one-page",
      color: "indigo",
      font: "sans",
    },
  });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: FormData) => {
    setApiError("");
    // Verifica unicidad del slug
    try {
      const check = await fetch(`/api/sites?slug=${data.slug}`);
      const checkJson = await check.json();

      if (checkJson.exists) {
        setError("slug", { type: "manual", message: "Slug ya existe" });

        return;
      }
    } catch {
      setError("slug", {
        type: "manual",
        message: "No se pudo verificar el slug",
      });

      return;
    }

    setLoading(true);
    const { id } = await params;
    const res = await fetch(`/api/projects/${id}/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = await res.json();

    setLoading(false);
    if (!res.ok) {
      setApiError(json.error || "Error al generar el sitio");

      return;
    }

    toast.success("Sitio generado");
    track("wizard_completed");
    router.push(`/projects/${id}/preview`);
  };

  return (
    <div className="max-w-lg mx-auto py-12">
      <Card className="p-8 flex flex-col gap-6">
        <h1 className="text-2xl font-bold">Crear sitio</h1>
        {apiError && (
          <Alert color="danger" role="alert">
            {apiError}
          </Alert>
        )}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <Input label="Título" {...register("title")} />
          {errors.title && (
            <FormAlert color="danger">{errors.title.message}</FormAlert>
          )}
          <Input inputMode="text" label="Slug" {...register("slug")} />
          {errors.slug && (
            <FormAlert color="danger">{errors.slug.message}</FormAlert>
          )}
          <div>
            <label className="mb-1 font-medium text-sm" htmlFor="template">
              Plantilla
            </label>
            <select
              id="template"
              {...register("template")}
              className="w-full p-2 rounded-md border"
            >
              <option value="one-page">One Page</option>
              <option value="blog">Blog</option>
            </select>
            {errors.template && (
              <FormAlert color="danger">{errors.template.message}</FormAlert>
            )}
          </div>
          <div>
            <label className="mb-1 font-medium text-sm" htmlFor="color">
              Color principal
            </label>
            <select
              id="color"
              {...register("color")}
              className="w-full p-2 rounded-md border"
            >
              <option value="indigo">Indigo</option>
              <option value="emerald">Emerald</option>
              <option value="rose">Rose</option>
            </select>
            {errors.color && (
              <FormAlert color="danger">{errors.color.message}</FormAlert>
            )}
          </div>
          <div>
            <label className="mb-1 font-medium text-sm" htmlFor="font">
              Fuente
            </label>
            <select
              id="font"
              {...register("font")}
              className="w-full p-2 rounded-md border"
            >
              <option value="sans">Sans</option>
              <option value="serif">Serif</option>
              <option value="mono">Mono</option>
            </select>
            {errors.font && (
              <FormAlert color="danger">{errors.font.message}</FormAlert>
            )}
          </div>
          <Button className="w-full" isLoading={loading} type="submit">
            Generar sitio
          </Button>
        </form>
      </Card>
    </div>
  );
}
