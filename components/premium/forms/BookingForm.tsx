"use client";

import type * as Yup from "yup";

import clsx from "clsx";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Alert } from "@heroui/alert";
import { useTranslations } from "next-intl";
import * as yup from "yup";

export interface Service {
  id: string;
  name: string;
  price: number;
}

export interface BookingInput {
  name: string;
  email: string;
  serviceId: string;
  date: string;
  notes?: string;
  coupon?: string;
}

export interface BookingFormProps {
  services: Service[];
  onSubmit: (data: BookingInput) => Promise<void>;
  className?: string;
  dateFormat?: string;
  validationSchema?: Yup.ObjectSchema<any>;
  enableCoupons?: boolean;
  themeColor?: string;
}

export default function BookingForm({
  services,
  onSubmit,
  className,
  dateFormat = "DD/MM/YYYY",
  validationSchema,
  enableCoupons = false,
  themeColor = "primary",
}: BookingFormProps) {
  const t = useTranslations("booking");

  const schema =
    validationSchema ||
    yup.object({
      name: yup.string().required(t("nameRequired")),
      email: yup.string().email(t("emailInvalid")).required(t("emailInvalid")),
      serviceId: yup.string().required(t("serviceRequired")),
      date: yup.string().required(t("dateRequired")),
      notes: yup.string().optional(),
      coupon: yup.string().optional(),
    });

  type Schema = yup.InferType<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Schema>({
    resolver: yupResolver(schema),
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const submit = async (data: Schema) => {
    setLoading(true);
    setError("");
    setSuccess(false);
    try {
      await onSubmit(data);
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
              {s.name} - {s.price.toFixed(2)}
            </option>
          ))}
        </select>
      </div>
      {errors.serviceId && (
        <p className="text-sm text-red-600 dark:text-red-400">
          {errors.serviceId.message}
        </p>
      )}
      <Input
        label={t("date") + ` (${dateFormat})`}
        type="datetime-local"
        {...register("date")}
      />
      {errors.date && (
        <p className="text-sm text-red-600 dark:text-red-400">
          {errors.date.message}
        </p>
      )}
      {enableCoupons && <Input label={t("coupon")} {...register("coupon")} />}
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
        color={themeColor}
        isLoading={loading}
        type="submit"
      >
        {t("submit")}
      </Button>
    </form>
  );
}
