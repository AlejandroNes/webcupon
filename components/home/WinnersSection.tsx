import Image from "next/image";
import { Calendar, ChevronRight, MapPin, Trophy } from "lucide-react";
import { DEMO_WINNERS } from "@/data/winners";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function WinnersSection() {
  return (
    <section id="ganadores" className="py-14 sm:py-18">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-8">
        <Reveal>
          <SectionHeader
            eyebrow="Galería de ganadores"
            title="Nuestros ganadores"
            description="Conoce a quienes ya vivieron la emoción de recibir sus premios."
          />
        </Reveal>

        <div className="flex items-center justify-end gap-1 text-xs font-semibold text-[#6C3AE8] sm:hidden -mb-4">
          <span>Desliza para ver más</span>
          <ChevronRight className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
        </div>

        {/* Mobile horizontal carousel / Tablet & Desktop grid */}
        <Reveal delayMs={80}>
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory -mx-4 px-4 pb-3 sm:mx-0 sm:px-0 sm:pb-0 sm:overflow-visible sm:grid sm:gap-5 sm:grid-cols-2 lg:grid-cols-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {DEMO_WINNERS.map((winner) => (
            <article
              key={winner.id}
              className="group shrink-0 w-[82%] max-w-[320px] snap-center sm:w-auto sm:max-w-none overflow-hidden rounded-3xl bg-white border border-[#6C3AE8]/12 shadow-sm shadow-[#171126]/5 transition-all duration-300 active:scale-[0.99] hover:-translate-y-1 hover:shadow-xl hover:shadow-[#6C3AE8]/10"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F8F7FC]">
                <Image
                  src={winner.image}
                  alt={winner.imageAlt}
                  fill
                  sizes="(max-width: 640px) 82vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#171126]/45 to-transparent"
                />
                <div className="absolute bottom-3 left-3">
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-[#171126] backdrop-blur-xs">
                    <MapPin className="h-3 w-3 text-[#6C3AE8]" aria-hidden="true" />
                    {winner.city}
                  </span>
                </div>
              </div>

              <div className="p-5 space-y-3">
                <h3 className="text-lg font-bold text-[#171126]">
                  {winner.name}
                </h3>

                <div className="rounded-2xl bg-[#F8F7FC] p-3.5 space-y-1.5 border border-[#6C3AE8]/10">
                  <p className="flex items-center gap-2 text-sm font-semibold text-[#5424BD]">
                    <Trophy className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>{winner.prizeWon}</span>
                  </p>
                  <p className="flex items-center gap-2 text-xs text-[#171126]/65">
                    <Calendar className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    <span>{winner.exampleDate}</span>
                  </p>
                </div>
              </div>
            </article>
          ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
