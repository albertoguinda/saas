"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useTranslations } from "next-intl";
import { Card } from "@heroui/card";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Alert, FormAlert } from "@heroui/alert";

import { notifyError, notifySuccess } from "@/lib/notifications";
import { track } from "@/lib/track";

export default function WizardPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const t = useTranslations("wizard");
  const schema = z.object({
    title: z.string().min(3, t("validation.title.min")),
    slug: z.string().regex(/^[a-z0-9-]+$/, t("validation.slug.pattern")),
    template: z.enum(["one-page", "blog"]),
    color: z.enum(["indigo", "emerald", "rose"]).default("indigo"),
    font: z.enum(["sans", "serif", "mono"]).default("sans"),
  });

  type Schema = z.infer<typeof schema>;
  const [apiError, setApiError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<Schema>({
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
        const msg = t("slug.exists");

        setError("slug", { type: "manual", message: msg });
        notifyError(msg);

        return;
      }
    } catch {
      const msg = t("slug.check");

      setError("slug", {
        type: "manual",
        message: msg,
      });
      notifyError(msg);

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
      const msg = json.error || t("error");

      setApiError(msg);
      notifyError(msg);

      return;
    }

    notifySuccess(t("success"));
    track("wizard_completed");
    router.push(`/projects/${id}/preview`);
  };

  return (
    <div className="max-w-lg mx-auto py-12">
      <Card className="p-8 flex flex-col gap-6">
        <h1 className="text-2xl font-bold">{t("title")}</h1>
        {apiError && (
          <Alert color="danger" role="alert">
            {apiError}
          </Alert>
        )}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <Input label={t("form.title")} {...register("title")} />
          {errors.title && (
            <FormAlert color="danger">{errors.title.message}</FormAlert>
          )}
          <Input
            inputMode="text"
            label={t("form.slug")}
            {...register("slug")}
          />
          {errors.slug && (
            <FormAlert color="danger">{errors.slug.message}</FormAlert>
          )}
          <div>
            <label className="mb-1 font-medium text-sm" htmlFor="template">
              {t("form.template")}
            </label>
            <select
              id="template"
              {...register("template")}
              className="w-full p-2 rounded-md border"
            >
              <option value="one-page">{t("option.template.one-page")}</option>
              <option value="blog">{t("option.template.blog")}</option>
            </select>
            {errors.template && (
              <FormAlert color="danger">{errors.template.message}</FormAlert>
            )}
          </div>
          <div>
            <label className="mb-1 font-medium text-sm" htmlFor="color">
              {t("form.color")}
            </label>
            <select
              id="color"
              {...register("color")}
              className="w-full p-2 rounded-md border"
            >
              <option value="indigo">{t("option.color.indigo")}</option>
              <option value="emerald">{t("option.color.emerald")}</option>
              <option value="rose">{t("option.color.rose")}</option>
            </select>
            {errors.color && (
              <FormAlert color="danger">{errors.color.message}</FormAlert>
            )}
          </div>
          <div>
            <label className="mb-1 font-medium text-sm" htmlFor="font">
              {t("form.font")}
            </label>
            <select
              id="font"
              {...register("font")}
              className="w-full p-2 rounded-md border"
            >
              <option value="sans">{t("option.font.sans")}</option>
              <option value="serif">{t("option.font.serif")}</option>
              <option value="mono">{t("option.font.mono")}</option>
            </select>
            {errors.font && (
              <FormAlert color="danger">{errors.font.message}</FormAlert>
            )}
          </div>
          <Button className="w-full" isLoading={loading} type="submit">
            {t("submit")}
          </Button>
        </form>
      </Card>
    </div>
  );
}
