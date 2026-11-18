"use client";

import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Bot,
  CheckCircle2,
  Phone,
  Send,
  User,
  X,
} from "lucide-react";
import { useForm, useWatch } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { cn } from "@/lib/utils";
import {
  SUPPORT_TOPICS,
  supportSchema,
  type SupportSchemaValues,
} from "@/lib/validations/support";
import { buildSupportWhatsAppMessage, buildWhatsAppUrl } from "@/lib/whatsapp";

interface WhatsAppSupportModalProps {
  open: boolean;
  onClose: () => void;
}

export function WhatsAppSupportModal({
  open,
  onClose,
}: WhatsAppSupportModalProps) {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors, dirtyFields },
  } = useForm<SupportSchemaValues>({
    resolver: zodResolver(supportSchema),
    mode: "onTouched",
    defaultValues: {
      fullName: "",
      whatsapp: "",
      topic: SUPPORT_TOPICS[0],
      message: "",
    },
  });

  const selectedTopic = useWatch({ control, name: "topic" });

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  const onSubmit = (values: SupportSchemaValues) => {
    const text = buildSupportWhatsAppMessage(values);
    const url = buildWhatsAppUrl(text);
    window.open(url, "_blank", "noopener,noreferrer");
    reset();
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="support-bot-title"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-[#171126]/65 backdrop-blur-xs p-0 sm:p-4"
      onClick={onClose}
    >
      <div
        className="animate-sheet-up w-full sm:max-w-md max-h-[92dvh] overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-white shadow-2xl border border-[#6C3AE8]/15"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Bot chat header */}
        <div className="sticky top-0 z-10 bg-gradient-to-r from-[#5424BD] via-[#6C3AE8] to-[#8B65F5] px-5 py-4 text-white rounded-t-3xl">
          <div className="flex justify-center pb-2.5 sm:hidden" aria-hidden="true">
            <span className="h-1.5 w-12 rounded-full bg-white/30" />
          </div>

          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
                <Bot className="h-6 w-6 text-white" aria-hidden="true" />
                <span
                  aria-hidden="true"
                  className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-[#6C3AE8] bg-emerald-400"
                />
              </div>
              <div>
                <h3 id="support-bot-title" className="text-base font-bold leading-tight">
                  Asistente Premiazo
                </h3>
                <p className="text-xs text-white/85 flex items-center gap-1.5">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-300" />
                  Consultas sobre sorteos e información
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar asistente de información"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25 active:scale-95 cursor-pointer"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Chat body */}
        <div className="p-5 space-y-4">
          {/* Bot welcome bubble */}
          <div className="flex items-start gap-2.5">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#6C3AE8]/12 text-[#5424BD]">
              <Bot className="h-4 w-4" aria-hidden="true" />
            </span>
            <div className="rounded-2xl rounded-tl-sm bg-[#F8F7FC] border border-[#6C3AE8]/10 px-4 py-3 text-sm text-[#171126]/85 leading-relaxed">
              ¡Hola! Soy el asistente de información de{" "}
              <strong className="text-[#5424BD]">Premiazo</strong>. ¿Sobre qué
              tema importante o sorteo te gustaría consultar con el
              administrador?
            </div>
          </div>

          {/* Topic quick-reply chips */}
          <div className="pl-9 space-y-2">
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#171126]/55">
              Elige un tema de consulta
            </p>
            <div className="flex flex-wrap gap-2">
              {SUPPORT_TOPICS.map((topic) => {
                const isSelected = selectedTopic === topic;
                return (
                  <button
                    key={topic}
                    type="button"
                    onClick={() =>
                      setValue("topic", topic, { shouldValidate: true })
                    }
                    className={cn(
                      "rounded-full px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer active:scale-95",
                      isSelected
                        ? "bg-[#6C3AE8] text-white shadow-xs shadow-[#6C3AE8]/25"
                        : "bg-[#F8F7FC] text-[#5424BD] border border-[#6C3AE8]/15 hover:bg-[#6C3AE8]/10"
                    )}
                  >
                    {topic}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Second bot bubble */}
          <div className="flex items-start gap-2.5">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#6C3AE8]/12 text-[#5424BD]">
              <Bot className="h-4 w-4" aria-hidden="true" />
            </span>
            <div className="rounded-2xl rounded-tl-sm bg-[#F8F7FC] border border-[#6C3AE8]/10 px-4 py-2.5 text-xs sm:text-sm text-[#171126]/80">
              Completa tus datos para enviarte directo al chat con el
              administrador:
            </div>
          </div>

          {/* Compact form */}
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-3 pt-1">
            <div className="space-y-1">
              <label
                htmlFor="support-fullName"
                className="block text-xs font-semibold text-[#171126]/75"
              >
                Tu nombre <span className="text-[#6C3AE8]">*</span>
              </label>
              <div className="relative">
                <User
                  className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6C3AE8]/70"
                  aria-hidden="true"
                />
                <input
                  id="support-fullName"
                  type="text"
                  placeholder="Ej. Andrea López"
                  aria-invalid={Boolean(errors.fullName)}
                  className={cn(
                    "h-11 w-full rounded-2xl border bg-[#F8F7FC] pl-10 pr-10 text-sm text-[#171126] placeholder:text-[#171126]/40 focus:bg-white focus:outline-none focus:ring-2",
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

            <div className="space-y-1">
              <label
                htmlFor="support-whatsapp"
                className="block text-xs font-semibold text-[#171126]/75"
              >
                Tu número de WhatsApp <span className="text-[#6C3AE8]">*</span>
              </label>
              <div className="relative">
                <Phone
                  className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6C3AE8]/70"
                  aria-hidden="true"
                />
                <input
                  id="support-whatsapp"
                  type="tel"
                  inputMode="tel"
                  placeholder="Ej. +591 70000000"
                  aria-invalid={Boolean(errors.whatsapp)}
                  className={cn(
                    "h-11 w-full rounded-2xl border bg-[#F8F7FC] pl-10 pr-10 text-sm text-[#171126] placeholder:text-[#171126]/40 focus:bg-white focus:outline-none focus:ring-2",
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

            <div className="space-y-1">
              <label
                htmlFor="support-message"
                className="block text-xs font-semibold text-[#171126]/75"
              >
                Tu consulta sobre sorteos{" "}
                <span className="text-[#6C3AE8]">*</span>
              </label>
              <textarea
                id="support-message"
                rows={2}
                placeholder="Escribe tu pregunta sobre fechas, premios o reglas del sorteo..."
                aria-invalid={Boolean(errors.message)}
                className={cn(
                  "w-full rounded-2xl border bg-[#F8F7FC] p-3 text-sm text-[#171126] placeholder:text-[#171126]/40 focus:bg-white focus:outline-none focus:ring-2 resize-none",
                  errors.message
                    ? "border-red-400 focus:ring-red-200"
                    : "border-[#6C3AE8]/15 focus:border-[#6C3AE8] focus:ring-[#6C3AE8]/20"
                )}
                {...register("message")}
              />
              {errors.message && (
                <p role="alert" className="text-xs font-medium text-red-600">
                  {errors.message.message}
                </p>
              )}
            </div>

            <Button type="submit" variant="primary" size="lg" fullWidth>
              <WhatsAppIcon className="h-4 w-4" />
              Contactar al administrador
              <Send className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
