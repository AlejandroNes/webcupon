"use client";

import { useEffect, useState } from "react";
import { Check, Minus, Plus, Ticket, X } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import {
  buildParticipationWhatsAppMessage,
  buildWhatsAppUrl,
} from "@/lib/whatsapp";
import type { ParticipationFormValues, Plan } from "@/types";
import { ParticipationForm } from "./ParticipationForm";
import { ParticipationSummary } from "./ParticipationSummary";

interface ParticipationModalProps {
  plan: Plan | null;
  onClose: () => void;
  onWhatsAppOpened: () => void;
}

const MIN_QUANTITY = 1;
const MAX_QUANTITY = 20;

export function ParticipationModal({
  plan,
  onClose,
  onWhatsAppOpened,
}: ParticipationModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [step, setStep] = useState<"form" | "summary">("form");
  const [formValues, setFormValues] = useState<
    ParticipationFormValues | undefined
  >(undefined);

  useEffect(() => {
    if (!plan) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [plan, onClose]);

  if (!plan) return null;

  const unitPrice = plan.unitPrice;
  const total = unitPrice * quantity;
  const totalTickets = plan.participationsPerUnit * quantity;

  const handleDecrement = () => {
    setQuantity((prev) => Math.max(MIN_QUANTITY, prev - 1));
  };

  const handleIncrement = () => {
    setQuantity((prev) => Math.min(MAX_QUANTITY, prev + 1));
  };

  const handleFormValid = (values: ParticipationFormValues) => {
    setFormValues(values);
    setStep("summary");
  };

  const handleContinueWhatsApp = () => {
    if (!formValues) return;

    const message = buildParticipationWhatsAppMessage({
      plan,
      quantity,
      unitPrice,
      total,
      participant: formValues,
    });
    const url = buildWhatsAppUrl(message);

    window.open(url, "_blank", "noopener,noreferrer");
    onWhatsAppOpened();
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="participation-modal-title"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-[#171126]/60 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="animate-sheet-up w-full sm:max-w-lg max-h-[92dvh] overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-white shadow-2xl border border-[#6C3AE8]/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile bottom-sheet handle */}
        <div className="flex justify-center pt-3 sm:hidden" aria-hidden="true">
          <span className="h-1.5 w-12 rounded-full bg-[#171126]/15" />
        </div>

        {/* Step progress bar */}
        <div className="px-5 pt-3 sm:px-6 sm:pt-4" aria-hidden="true">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#F8F7FC]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#6C3AE8] to-[#8B65F5] transition-all duration-300"
              style={{ width: step === "form" ? "50%" : "100%" }}
            />
          </div>
        </div>

        {/* Header */}
        <div className="flex items-start justify-between gap-4 px-5 pt-4 pb-3 sm:px-6 sm:pt-6 border-b border-[#6C3AE8]/10">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Badge variant="soft">
                <Ticket className="h-3 w-3" aria-hidden="true" />
                {step === "form" ? "Paso 1 de 2" : "Paso 2 de 2"}
              </Badge>
              <span className="text-xs font-semibold text-[#6C3AE8]">
                {plan.name}
              </span>
            </div>
            <h3
              id="participation-modal-title"
              className="text-xl font-bold text-[#171126]"
            >
              {step === "form"
                ? "Completa tu solicitud"
                : "Confirma tu solicitud"}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar ventana de participación"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F8F7FC] text-[#171126] transition-colors hover:bg-[#6C3AE8]/10 active:scale-95 cursor-pointer"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="p-5 sm:p-6 space-y-5">
          {/* Plan summary + quantity selector */}
          <div className="rounded-2xl bg-gradient-to-br from-[#F8F7FC] to-white border border-[#6C3AE8]/15 p-4 space-y-3.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#6C3AE8]">
                  {plan.name}
                </p>
                <p className="text-lg font-extrabold text-[#171126]">
                  ${unitPrice} USD{" "}
                  <span className="text-xs font-medium text-[#171126]/55">
                    por participación
                  </span>
                </p>
              </div>

              {/* Quantity stepper */}
              <div className="flex items-center gap-2 rounded-2xl bg-white p-1 border border-[#6C3AE8]/15 shadow-xs">
                <button
                  type="button"
                  onClick={handleDecrement}
                  disabled={quantity <= MIN_QUANTITY}
                  aria-label="Disminuir cantidad"
                  className="flex h-8 w-8 items-center justify-center rounded-xl text-[#5424BD] transition-colors hover:bg-[#6C3AE8]/10 disabled:opacity-35 cursor-pointer disabled:cursor-not-allowed"
                >
                  <Minus className="h-4 w-4" aria-hidden="true" />
                </button>
                <span
                  aria-live="polite"
                  className="min-w-[2rem] text-center text-sm font-bold text-[#171126]"
                >
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={handleIncrement}
                  disabled={quantity >= MAX_QUANTITY}
                  aria-label="Aumentar cantidad"
                  className="flex h-8 w-8 items-center justify-center rounded-xl text-[#5424BD] transition-colors hover:bg-[#6C3AE8]/10 disabled:opacity-35 cursor-pointer disabled:cursor-not-allowed"
                >
                  <Plus className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Compact benefits */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {plan.benefits.slice(0, 2).map((benefit) => (
                <li
                  key={benefit}
                  className="flex items-center gap-1.5 text-xs text-[#171126]/75"
                >
                  <Check
                    className="h-3.5 w-3.5 shrink-0 text-[#6C3AE8]"
                    aria-hidden="true"
                  />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>

            {/* Live calculation bar */}
            <div className="flex items-center justify-between border-t border-[#6C3AE8]/10 pt-2.5 text-sm">
              <span className="text-[#171126]/70">
                Total ({quantity}{" "}
                {quantity === 1 ? "participación" : "participaciones"} ·{" "}
                {totalTickets} boletos incluidos)
              </span>
              <span className="text-lg font-extrabold text-[#5424BD]">
                ${total} USD
              </span>
            </div>
          </div>

          {/* Step content */}
          {step === "form" ? (
            <ParticipationForm
              defaultValues={formValues}
              onSubmitValid={handleFormValid}
            />
          ) : (
            formValues && (
              <ParticipationSummary
                request={{
                  plan,
                  quantity,
                  unitPrice,
                  total,
                  participant: formValues,
                }}
                onEdit={() => setStep("form")}
                onContinueWhatsApp={handleContinueWhatsApp}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}
