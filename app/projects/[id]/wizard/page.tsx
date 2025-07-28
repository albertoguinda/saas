"use client";

import React, { useState } from "react";
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
    video: z.string().optional(),
  });

  type Schema = z.infer<typeof schema>;
  const [apiError, setApiError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
  } = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      slug: "",
      template: "one-page",
      color: "indigo",
      font: "sans",
      video: "",
    },
  });
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const onSubmit = async (data: Schema) => {
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

  const handleAi = async () => {
    setAiLoading(true);
    try {
      const res = await fetch("/api/ia", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: "landing" }),
      });
      const json = await res.json();

      if (!res.ok) {
        const msg = json.error || t("ai.error");

        notifyError(msg);

        return;
      }

      setValue("title", json.content);
      notifySuccess(t("ai.success"));
    } catch {
      notifyError(t("ai.error"));
    } finally {
      setAiLoading(false);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;
    setUploading(true);
    try {
      const form = new FormData();

      form.append("file", file);
      const res = await fetch("/api/videos", { method: "POST", body: form });
      const json = await res.json();

      if (!res.ok) {
        notifyError(json.error || "Upload error");

        return;
      }
      setValue("video", json.playbackId);
      notifySuccess("Video uploaded");
    } catch {
      notifyError("Upload error");
    } finally {
      setUploading(false);
    }
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
          <Button
            className="w-full"
            color="secondary"
            isLoading={aiLoading}
            type="button"
            onClick={handleAi}
          >
            {t("ai")}
          </Button>
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
          <div>
            <label className="mb-1 font-medium text-sm" htmlFor="video">
              {t("form.video")}
            </label>
            <input
              accept="video/*"
              className="w-full"
              id="video"
              type="file"
              onChange={handleUpload}
            />
            {uploading && (
              <FormAlert color="warning">{t("video.uploading")}</FormAlert>
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
