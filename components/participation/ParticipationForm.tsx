"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, CheckCircle2, Mail, MapPin, Phone, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import {
  participationSchema,
  type ParticipationSchemaValues,
} from "@/lib/validations/participation";
import type { ParticipationFormValues } from "@/types";

interface ParticipationFormProps {
  defaultValues?: ParticipationFormValues;
  onSubmitValid: (values: ParticipationFormValues) => void;
}

export function ParticipationForm({
  defaultValues,
  onSubmitValid,
}: ParticipationFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm<ParticipationSchemaValues>({
    resolver: zodResolver(participationSchema),
    mode: "onTouched",
    defaultValues: {
      fullName: defaultValues?.fullName ?? "",
      whatsapp: defaultValues?.whatsapp ?? "",
      city: defaultValues?.city ?? "",
      email: defaultValues?.email ?? "",
    },
  });

  const onSubmit = (data: ParticipationSchemaValues) => {
    onSubmitValid({
      fullName: data.fullName.trim(),
      whatsapp: data.whatsapp.trim(),
      city: data.city.trim(),
      email: data.email?.trim() || undefined,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-4"
    >
      {/* Nombre completo */}
      <div className="space-y-1.5">
        <label
          htmlFor="participation-fullName"
          className="block text-xs font-semibold uppercase tracking-wide text-[#171126]/75"
        >
          Nombre completo <span className="text-[#6C3AE8]">*</span>
        </label>
        <div className="relative">
          <User
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6C3AE8]/70"
            aria-hidden="true"
          />
          <input
            id="participation-fullName"
            type="text"
            autoComplete="name"
            placeholder="Ej. Carlos Mendoza"
            aria-invalid={Boolean(errors.fullName)}
            className={cn(
              "h-12 w-full rounded-2xl border bg-[#F8F7FC] pl-10 pr-10 text-sm text-[#171126] placeholder:text-[#171126]/40 transition-all focus:bg-white focus:outline-none focus:ring-2",
              errors.fullName
                ? "border-red-400 focus:ring-red-200"
                : "border-[#6C3AE8]/15 focus:border-[#6C3AE8] focus:ring-[#6C3AE8]/20"
            )}
            {...register("fullName")}
          />
          {dirtyFields.fullName && !errors.fullName && (
            <CheckCircle2
              className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6C3AE8]"
              aria-hidden="true"
            />
          )}
        </div>
        {errors.fullName && (
          <p role="alert" className="text-xs font-medium text-red-600">
            {errors.fullName.message}
          </p>
        )}
      </div>

      {/* Número de WhatsApp */}
      <div className="space-y-1.5">
        <label
          htmlFor="participation-whatsapp"
          className="block text-xs font-semibold uppercase tracking-wide text-[#171126]/75"
        >
          Número de WhatsApp <span className="text-[#6C3AE8]">*</span>
        </label>
        <div className="relative">
          <Phone
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6C3AE8]/70"
            aria-hidden="true"
          />
          <input
            id="participation-whatsapp"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="Ej. +1 555 010 0000"
            aria-invalid={Boolean(errors.whatsapp)}
            className={cn(
              "h-12 w-full rounded-2xl border bg-[#F8F7FC] pl-10 pr-10 text-sm text-[#171126] placeholder:text-[#171126]/40 transition-all focus:bg-white focus:outline-none focus:ring-2",
              errors.whatsapp
                ? "border-red-400 focus:ring-red-200"
                : "border-[#6C3AE8]/15 focus:border-[#6C3AE8] focus:ring-[#6C3AE8]/20"
            )}
            {...register("whatsapp")}
          />
          {dirtyFields.whatsapp && !errors.whatsapp && (
            <CheckCircle2
              className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6C3AE8]"
              aria-hidden="true"
            />
          )}
        </div>
        {errors.whatsapp && (
          <p role="alert" className="text-xs font-medium text-red-600">
            {errors.whatsapp.message}
          </p>
        )}
      </div>

      {/* Ciudad */}
      <div className="space-y-1.5">
        <label
          htmlFor="participation-city"
          className="block text-xs font-semibold uppercase tracking-wide text-[#171126]/75"
        >
          Ciudad <span className="text-[#6C3AE8]">*</span>
        </label>
        <div className="relative">
          <MapPin
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6C3AE8]/70"
            aria-hidden="true"
          />
          <input
            id="participation-city"
            type="text"
            autoComplete="address-level2"
            placeholder="Ingresa tu ciudad"
            aria-invalid={Boolean(errors.city)}
            className={cn(
              "h-12 w-full rounded-2xl border bg-[#F8F7FC] pl-10 pr-10 text-sm text-[#171126] placeholder:text-[#171126]/40 transition-all focus:bg-white focus:outline-none focus:ring-2",
              errors.city
                ? "border-red-400 focus:ring-red-200"
                : "border-[#6C3AE8]/15 focus:border-[#6C3AE8] focus:ring-[#6C3AE8]/20"
            )}
            {...register("city")}
          />
          {dirtyFields.city && !errors.city && (
            <CheckCircle2
              className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6C3AE8]"
              aria-hidden="true"
            />
          )}
        </div>
        {errors.city && (
          <p role="alert" className="text-xs font-medium text-red-600">
            {errors.city.message}
          </p>
        )}
      </div>

      {/* Correo electrónico (opcional) */}
      <div className="space-y-1.5">
        <label
          htmlFor="participation-email"
          className="block text-xs font-semibold uppercase tracking-wide text-[#171126]/75"
        >
          Correo electrónico{" "}
          <span className="font-normal lowercase text-[#171126]/50">
            (opcional)
          </span>
        </label>
        <div className="relative">
          <Mail
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6C3AE8]/70"
            aria-hidden="true"
          />
          <input
            id="participation-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="nombre@correo.com"
            aria-invalid={Boolean(errors.email)}
            className={cn(
              "h-12 w-full rounded-2xl border bg-[#F8F7FC] pl-10 pr-4 text-sm text-[#171126] placeholder:text-[#171126]/40 transition-all focus:bg-white focus:outline-none focus:ring-2",
              errors.email
                ? "border-red-400 focus:ring-red-200"
                : "border-[#6C3AE8]/15 focus:border-[#6C3AE8] focus:ring-[#6C3AE8]/20"
            )}
            {...register("email")}
          />
        </div>
        {errors.email && (
          <p role="alert" className="text-xs font-medium text-red-600">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="pt-2">
        <Button type="submit" variant="primary" size="lg" fullWidth>
          Revisar solicitud
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Button>
      </div>
    </form>
  );
}
