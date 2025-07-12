"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { FormAlert } from "@heroui/alert";
import * as yup from "yup";

import { useScheduler } from "@/lib/premium/schedulers/scheduler";

export const bookingSchema = yup.object({
  name: yup.string().required("Nombre requerido"),
  email: yup.string().email("Email inválido").required("Email requerido"),
  date: yup.string().required("Fecha requerida"),
  time: yup.string().required("Hora requerida"),
  coupon: yup.string().optional(),
  card: yup.string().optional(),
});

export type BookingInput = yup.InferType<typeof bookingSchema>;

interface BookingFormProps {
  onSubmit: (data: BookingInput) => Promise<void> | void;
  startTime?: string;
  endTime?: string;
  blockedSlots?: string[];
  pro?: boolean;
}

export default function BookingForm({
  onSubmit,
  startTime,
  endTime,
  blockedSlots,
  pro = false,
}: BookingFormProps) {
  const slots = useScheduler({ startTime, endTime, blockedSlots });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingInput>({ resolver: yupResolver(bookingSchema) });
  const submit = handleSubmit((data) => onSubmit(data));

  return (
    <form className="flex flex-col gap-4" onSubmit={submit}>
      <Input label="Nombre" {...register("name")} />
      {errors.name && (
        <FormAlert color="danger">{errors.name.message}</FormAlert>
      )}
      <Input label="Email" type="email" {...register("email")} />
      {errors.email && (
        <FormAlert color="danger">{errors.email.message}</FormAlert>
      )}
      <Input label="Fecha" type="date" {...register("date")} />
      {errors.date && (
        <FormAlert color="danger">{errors.date.message}</FormAlert>
      )}
      <div>
        <label className="mb-1 font-medium text-sm" htmlFor="time">
          Hora
        </label>
        <select
          className="w-full p-2 rounded border"
          id="time"
          {...register("time")}
        >
          <option value="">Selecciona hora</option>
          {slots.map((slot) => (
            <option key={slot} value={slot}>
              {slot}
            </option>
          ))}
        </select>
      </div>
      {errors.time && (
        <FormAlert color="danger">{errors.time.message}</FormAlert>
      )}
      {pro && (
        <>
          <Input label="Cupón" {...register("coupon")} />
          <Input label="Tarjeta" {...register("card")} />
        </>
      )}
      <Button color="primary" type="submit">
        Reservar
      </Button>
    </form>
  );
}
