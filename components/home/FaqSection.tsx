"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FAQ_ITEMS } from "@/data/faqs";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cn } from "@/lib/utils";

export function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0]?.id ?? null);

  const toggleItem = (id: string) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <section id="informacion" className="py-14 sm:py-18">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 space-y-10">
        <Reveal>
          <SectionHeader
            eyebrow="Información útil"
            title="Preguntas frecuentes"
            description="Resuelve tus dudas principales sobre el funcionamiento de Premiazo."
          />
        </Reveal>

        <Reveal delayMs={80}>
          <div className="space-y-3">
          {FAQ_ITEMS.map((item) => {
            const isOpen = openId === item.id;
            const panelId = `faq-panel-${item.id}`;
            const buttonId = `faq-button-${item.id}`;

            return (
              <div
                key={item.id}
                className={cn(
                  "overflow-hidden rounded-3xl bg-white border transition-all duration-200",
                  isOpen
                    ? "border-[#6C3AE8]/30 shadow-md shadow-[#6C3AE8]/8"
                    : "border-[#6C3AE8]/10 shadow-xs"
                )}
              >
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleItem(item.id)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 sm:px-6 sm:py-5 text-left cursor-pointer"
                  >
                    <span className="text-base sm:text-lg font-semibold text-[#171126]">
                      {item.question}
                    </span>
                    <span
                      className={cn(
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-200",
                        isOpen
                          ? "bg-[#6C3AE8] text-white rotate-180"
                          : "bg-[#F8F7FC] text-[#5424BD]"
                      )}
                    >
                      <ChevronDown className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </button>
                </h3>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={cn(
                    "grid transition-all duration-200 ease-out",
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 sm:px-6 sm:pb-6 text-sm sm:text-base text-[#171126]/75 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
