"use client";

import clsx from "clsx";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Alert } from "@heroui/alert";
import { useTranslations } from "next-intl";
import * as z from "zod";

export interface Service {
  id: string;
  name: string;
}

export interface BookingInput {
  name: string;
  email: string;
  serviceId: string;
  date: string;
  notes?: string;
}

export interface BookingFormProps {
  services: Service[];
  onSubmit?: (data: BookingInput) => Promise<void>;
  className?: string;
}

export default function BookingForm({
  services,
  onSubmit,
  className,
}: BookingFormProps) {
  const t = useTranslations("booking");
  const schema = z.object({
    name: z.string().min(1, t("nameRequired")),
    email: z.string().email(t("emailInvalid")),
    serviceId: z.string().min(1, t("serviceRequired")),
    date: z.string().min(1, t("dateRequired")),
    notes: z.string().optional(),
  });

  type Schema = z.infer<typeof schema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Schema>({
    resolver: zodResolver(schema),
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const submit = async (data: Schema) => {
    setLoading(true);
    setError("");
    setSuccess(false);
    try {
      if (onSubmit) await onSubmit(data);
      setSuccess(true);
      reset();
    } catch (err) {
      setError((err as Error).message || t("error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className={clsx("space-y-4", className)}
      onSubmit={handleSubmit(submit)}
    >
      {error && (
        <Alert color="danger" role="alert">
          {error}
        </Alert>
      )}
      {success && (
        <Alert color="success" role="alert">
          {t("success")}
        </Alert>
      )}
      <Input label={t("name")} {...register("name")} />
      {errors.name && (
        <p className="text-sm text-red-600 dark:text-red-400">
          {errors.name.message}
        </p>
      )}
      <Input inputMode="email" label={t("email")} {...register("email")} />
      {errors.email && (
        <p className="text-sm text-red-600 dark:text-red-400">
          {errors.email.message}
        </p>
      )}
      <div>
        <label className="mb-1 block text-sm font-medium" htmlFor="service">
          {t("service")}
        </label>
        <select
          className="w-full rounded-md border bg-white p-2 dark:bg-neutral-900"
          id="service"
          {...register("serviceId")}
        >
          <option value="">{t("servicePlaceholder")}</option>
          {services.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
      </div>
      {errors.serviceId && (
        <p className="text-sm text-red-600 dark:text-red-400">
          {errors.serviceId.message}
        </p>
      )}
      <Input label={t("date")} type="datetime-local" {...register("date")} />
      {errors.date && (
        <p className="text-sm text-red-600 dark:text-red-400">
          {errors.date.message}
        </p>
      )}
      <div>
        <label className="mb-1 block text-sm font-medium" htmlFor="notes">
          {t("notes")}
        </label>
        <textarea
          className="w-full rounded-md border bg-white p-2 dark:bg-neutral-900"
          id="notes"
          {...register("notes")}
        />
      </div>
      <Button
        className="w-full"
        color="primary"
        isLoading={loading}
        type="submit"
      >
        {t("submit")}
      </Button>
    </form>
  );
}
