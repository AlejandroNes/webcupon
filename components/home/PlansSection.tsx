"use client";

import { useState } from "react";
import { ArrowRight, Check, Crown, Info, Tag, Ticket, X } from "lucide-react";
import { PARTICIPATION_PLANS } from "@/data/plans";
import { ParticipationModal } from "@/components/participation/ParticipationModal";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cn } from "@/lib/utils";
import type { Plan } from "@/types";

export function PlansSection() {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [showPendingNotice, setShowPendingNotice] = useState(false);

  const handleOpenPlan = (plan: Plan) => {
    setSelectedPlan(plan);
  };

  const handleWhatsAppOpened = () => {
    setShowPendingNotice(true);
  };

  return (
    <section id="participar" className="py-14 sm:py-18">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-8 sm:space-y-10">
        <Reveal>
          <SectionHeader
            eyebrow="Planes de participación"
            title="Elige cómo quieres participar"
            description="Compara los planes disponibles, personaliza tu cantidad y envía tu solicitud directamente por WhatsApp."
          />
        </Reveal>

        {/* Compact visual comparison strip */}
        <div className="mx-auto flex max-w-2xl flex-wrap items-center justify-center gap-2 rounded-2xl bg-white border border-[#6C3AE8]/12 px-4 py-2.5 text-xs font-medium text-[#171126]/75 shadow-xs">
          <Tag className="h-4 w-4 text-[#6C3AE8]" aria-hidden="true" />
          <span>
            <strong className="text-[#171126]">Plan Básico:</strong> 5
            participaciones ($50 USD)
          </span>
          <span aria-hidden="true" className="text-[#6C3AE8]/35">
            •
          </span>
          <span>
            <strong className="text-[#5424BD]">Plan Premium:</strong> 15
            participaciones ($100 USD — 3x oportunidades)
          </span>
        </div>

        {showPendingNotice && (
          <div
            role="status"
            aria-live="polite"
            className="mx-auto flex max-w-4xl items-start justify-between gap-3 rounded-2xl border border-[#6C3AE8]/25 bg-white px-4 py-3.5 text-sm text-[#171126] shadow-sm shadow-[#6C3AE8]/10"
          >
            <div className="flex items-start gap-2.5">
              <Info
                className="mt-0.5 h-5 w-5 shrink-0 text-[#6C3AE8]"
                aria-hidden="true"
              />
              <p className="leading-relaxed">
                Recuerda que enviar tu solicitud no confirma automáticamente tu
                participación. El administrador deberá verificar tu pago.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowPendingNotice(false)}
              aria-label="Cerrar aviso informativo"
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#F8F7FC] text-[#171126]/65 hover:bg-[#6C3AE8]/10 hover:text-[#171126] cursor-pointer"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        )}

        <Reveal delayMs={80}>
          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2 items-stretch">
          {PARTICIPATION_PLANS.map((plan) => {
            const isRecommended = Boolean(plan.recommended);

            return (
              <article
                key={plan.id}
                className={cn(
                  "relative flex flex-col justify-between rounded-3xl p-6 sm:p-8 transition-all duration-300 active:scale-[0.99]",
                  isRecommended
                    ? "animate-glow-soft bg-gradient-to-br from-[#5424BD] via-[#6C3AE8] to-[#8B65F5] text-white shadow-xl shadow-[#6C3AE8]/25 ring-2 ring-[#6C3AE8]/30 md:-translate-y-1"
                    : "bg-white text-[#171126] border border-[#6C3AE8]/12 shadow-sm shadow-[#171126]/5 hover:border-[#6C3AE8]/30 hover:shadow-md"
                )}
              >
                <div className="space-y-5">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={cn(
                        "text-xs font-extrabold uppercase tracking-widest",
                        isRecommended ? "text-white/85" : "text-[#6C3AE8]"
                      )}
                    >
                      {plan.name}
                    </span>
                    {plan.badge && (
                      <Badge variant="light">
                        <Crown className="h-3.5 w-3.5" aria-hidden="true" />
                        {plan.badge}
                      </Badge>
                    )}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl sm:text-5xl font-extrabold tracking-tight">
                        {plan.price}
                      </span>
                      <span
                        className={cn(
                          "text-xs font-medium",
                          isRecommended ? "text-white/75" : "text-[#171126]/55"
                        )}
                      >
                        / por participación
                      </span>
                    </div>

                    <div
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold mt-2",
                        isRecommended
                          ? "bg-white/15 text-white"
                          : "bg-[#6C3AE8]/10 text-[#5424BD]"
                      )}
                    >
                      <Ticket className="h-3.5 w-3.5" aria-hidden="true" />
                      {plan.participationsLabel}
                    </div>
                  </div>

                  <p
                    className={cn(
                      "text-sm leading-relaxed",
                      isRecommended ? "text-white/85" : "text-[#171126]/70"
                    )}
                  >
                    {plan.description}
                  </p>

                  <ul className="space-y-3 pt-2">
                    {plan.benefits.map((benefit) => (
                      <li
                        key={benefit}
                        className="flex items-start gap-2.5 text-sm"
                      >
                        <span
                          className={cn(
                            "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
                            isRecommended
                              ? "bg-white/20 text-white"
                              : "bg-[#6C3AE8]/12 text-[#5424BD]"
                          )}
                        >
                          <Check className="h-3 w-3" aria-hidden="true" />
                        </span>
                        <span
                          className={
                            isRecommended ? "text-white/95" : "text-[#171126]/85"
                          }
                        >
                          {benefit}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-8">
                  <Button
                    variant={isRecommended ? "white" : "primary"}
                    size="lg"
                    fullWidth
                    onClick={() => handleOpenPlan(plan)}
                    aria-label={`Quiero participar con ${plan.name}`}
                  >
                    Quiero participar
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </div>
              </article>
            );
          })}
          </div>
        </Reveal>
      </div>

      <ParticipationModal
        key={selectedPlan?.id ?? "closed"}
        plan={selectedPlan}
        onClose={() => setSelectedPlan(null)}
        onWhatsAppOpened={handleWhatsAppOpened}
      />
    </section>
  );
}
