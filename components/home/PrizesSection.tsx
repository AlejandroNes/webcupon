"use client";

import { useState } from "react";
import Image from "next/image";
import { Award, Eye, Images } from "lucide-react";
import { FEATURED_PRIZES } from "@/data/prizes";
import { PrizeDetailModal } from "@/components/home/PrizeDetailModal";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { Prize } from "@/types";

export function PrizesSection() {
  const [selectedPrize, setSelectedPrize] = useState<Prize | null>(null);

  return (
    <section id="premios" className="py-14 sm:py-18">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-8 sm:space-y-10">
        <Reveal>
          <SectionHeader
            title="Premios que te van a encantar"
            description="Explora las fotografías, características y detalles de nuestros premios principales."
          />
        </Reveal>

        {/* Mobile horizontal carousel / Tablet & Desktop grid */}
        <Reveal delayMs={80}>
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory -mx-4 px-4 pb-3 sm:mx-0 sm:px-0 sm:pb-0 sm:overflow-visible sm:grid sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {FEATURED_PRIZES.map((prize) => (
            <article
              key={prize.id}
              className="group shrink-0 w-[82%] max-w-[320px] snap-center sm:w-auto sm:max-w-none flex flex-col overflow-hidden rounded-3xl bg-white border border-[#6C3AE8]/12 shadow-sm shadow-[#171126]/5 transition-all duration-300 active:scale-[0.99] hover:-translate-y-1.5 hover:shadow-xl hover:shadow-[#6C3AE8]/12"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F8F7FC]">
                <Image
                  src={prize.image}
                  alt={prize.imageAlt}
                  fill
                  sizes="(max-width: 640px) 82vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                  <Badge variant="primary">
                    <Award className="h-3 w-3" aria-hidden="true" />
                    {prize.badge}
                  </Badge>
                  {prize.gallery.length > 1 && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#171126]/65 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-xs">
                      <Images className="h-3 w-3" aria-hidden="true" />
                      {prize.gallery.length} fotos
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-1 flex-col justify-between p-5 sm:p-6 space-y-5">
                <div className="space-y-2">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#6C3AE8]">
                    {prize.category}
                  </p>
                  <h3 className="text-xl font-bold text-[#171126]">
                    {prize.name}
                  </h3>
                  <p className="text-sm text-[#171126]/70 leading-relaxed">
                    {prize.shortDescription}
                  </p>
                </div>

                <Button
                  variant="secondary"
                  fullWidth
                  onClick={() => setSelectedPrize(prize)}
                >
                  <Eye className="h-4 w-4" aria-hidden="true" />
                  Ver premio
                </Button>
              </div>
            </article>
          ))}
          </div>
        </Reveal>
      </div>

      <PrizeDetailModal
        key={selectedPrize?.id ?? "closed"}
        prize={selectedPrize}
        onClose={() => setSelectedPrize(null)}
      />
    </section>
  );
}
