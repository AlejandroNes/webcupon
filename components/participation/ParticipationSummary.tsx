"use client";

import { AlertCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { WHATSAPP_CONFIG } from "@/lib/config";
import type { ParticipationRequest } from "@/types";

interface ParticipationSummaryProps {
  request: ParticipationRequest;
  onEdit: () => void;
  onContinueWhatsApp: () => void;
}

export function ParticipationSummary({
  request,
  onEdit,
  onContinueWhatsApp,
}: ParticipationSummaryProps) {
  const { participant, plan, quantity, unitPrice, total } = request;
  const quantityLabel = quantity === 1 ? "participación" : "participaciones";

  return (
    <div className="space-y-4">
      {/* Resumen de datos y solicitud */}
      <div className="rounded-2xl border border-[#6C3AE8]/15 bg-[#F8F7FC] p-4 space-y-3">
        <div className="flex items-center justify-between border-b border-[#6C3AE8]/10 pb-2.5">
          <span className="text-xs font-bold uppercase tracking-wider text-[#6C3AE8]">
            Resumen de solicitud
          </span>
          <span className="text-xs font-medium text-[#171126]/60">
            {plan.name}
          </span>
        </div>

        <dl className="space-y-2 text-sm">
          <div className="flex items-center justify-between gap-3">
            <dt className="text-[#171126]/65">Participante</dt>
            <dd className="font-semibold text-[#171126] text-right">
              {participant.fullName}
            </dd>
          </div>
          <div className="flex items-center justify-between gap-3">
            <dt className="text-[#171126]/65">Teléfono</dt>
            <dd className="font-semibold text-[#171126] text-right">
              {participant.whatsapp}
            </dd>
          </div>
          <div className="flex items-center justify-between gap-3">
            <dt className="text-[#171126]/65">Ciudad</dt>
            <dd className="font-semibold text-[#171126] text-right">
              {participant.city}
            </dd>
          </div>
          {participant.email && (
            <div className="flex items-center justify-between gap-3">
              <dt className="text-[#171126]/65">Correo</dt>
              <dd className="font-medium text-[#171126] text-right truncate max-w-[200px]">
                {participant.email}
              </dd>
            </div>
          )}

          <div className="my-2 border-t border-[#6C3AE8]/10 pt-2 space-y-2">
            <div className="flex items-center justify-between gap-3">
              <dt className="text-[#171126]/65">Plan seleccionado</dt>
              <dd className="font-semibold text-[#5424BD]">
                {plan.shortName}
              </dd>
            </div>
            <div className="flex items-center justify-between gap-3">
              <dt className="text-[#171126]/65">Cantidad</dt>
              <dd className="font-semibold text-[#171126]">
                {quantity} {quantityLabel}
              </dd>
            </div>
            <div className="flex items-center justify-between gap-3">
              <dt className="text-[#171126]/65">Precio unitario</dt>
              <dd className="font-semibold text-[#171126]">
                ${unitPrice} USD
              </dd>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 border-t border-[#6C3AE8]/15 pt-2.5">
            <dt className="text-base font-bold text-[#171126]">Total</dt>
            <dd className="text-xl font-extrabold text-[#6C3AE8]">
              ${total} USD
            </dd>
          </div>
        </dl>
      </div>

      {/* Aviso obligatorio */}
      <div className="flex items-start gap-2.5 rounded-2xl border border-[#6C3AE8]/20 bg-[#6C3AE8]/8 p-3.5 text-xs leading-relaxed text-[#171126]/85">
        <AlertCircle
          className="mt-0.5 h-4 w-4 shrink-0 text-[#6C3AE8]"
          aria-hidden="true"
        />
        <div className="space-y-1">
          <p>
            Tu solicitud será enviada por WhatsApp. La participación quedará
            pendiente hasta que el administrador verifique el pago y confirme tu
            registro.
          </p>
          {WHATSAPP_CONFIG.isDemo && (
            <p className="text-[11px] font-medium text-[#5424BD]">
              Canal configurado: {WHATSAPP_CONFIG.displayNumber}
            </p>
          )}
        </div>
      </div>

      {/* Acciones */}
      <div className="flex flex-col-reverse sm:flex-row gap-2.5 pt-1">
        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={onEdit}
          className="sm:w-auto"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Editar datos
        </Button>
        <Button
          type="button"
          variant="primary"
          size="lg"
          fullWidth
          onClick={onContinueWhatsApp}
        >
          <WhatsAppIcon className="h-4 w-4" />
          Continuar por WhatsApp
        </Button>
      </div>
    </div>
  );
}
