"use client";

import Image from "next/image";
import { ArrowDownRight, Gift, ShieldCheck, Smartphone, Trophy, Tv } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { scrollToSection } from "@/lib/utils";

const HERO_PRIZE_PILLS = [
  { label: "Moto deportiva", icon: Gift },
  { label: 'Smart TV 55"', icon: Tv },
  { label: "Smartphone Pro", icon: Smartphone },
];

export function HeroSection() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-gradient-to-br from-[#3E1799] via-[#5424BD] to-[#8B65F5] text-white"
    >
      {/* Subtle decorative radial lights */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-28 -right-24 h-80 w-80 rounded-full bg-white/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-[#171126]/30 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-4 pt-24 pb-10 sm:px-6 sm:pt-28 sm:pb-14 lg:pt-30 lg:pb-16">
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Copy column */}
          <div className="lg:col-span-6 space-y-5 text-center lg:text-left animate-fade-up">
            <Badge variant="light" className="mx-auto lg:mx-0">
              <Trophy className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
              Grandes premios te esperan
            </Badge>

            <h1 className="text-3xl sm:text-4xl lg:text-[3.25rem] font-extrabold tracking-tight leading-[1.08]">
              ¡Tu próximo gran premio puede estar más cerca!
            </h1>

            <p className="text-base sm:text-lg text-white/85 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Descubre increíbles premios, participa y vive la emoción de ganar.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-1">
              <Button
                variant="white"
                size="lg"
                onClick={() => scrollToSection("premios")}
                className="w-full sm:w-auto"
              >
                Descubrir premios
                <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
              </Button>
              <button
                type="button"
                onClick={() => scrollToSection("participar")}
                className="w-full sm:w-auto inline-flex h-12 items-center justify-center rounded-2xl border border-white/30 bg-white/10 px-6 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20 active:scale-[0.98] cursor-pointer"
              >
                Participar desde $50 USD
              </button>
            </div>

            {/* Interactive prize preview chips */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-2">
              {HERO_PRIZE_PILLS.map((pill) => {
                const Icon = pill.icon;
                return (
                  <button
                    key={pill.label}
                    type="button"
                    onClick={() => scrollToSection("premios")}
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#171126]/25 border border-white/10 px-3.5 py-1.5 text-xs font-medium text-white/95 backdrop-blur-sm transition-colors hover:bg-white/20 cursor-pointer"
                  >
                    <Icon className="h-3.5 w-3.5 text-[#F8F7FC]" aria-hidden="true" />
                    {pill.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Protagonist motorcycle visual */}
          <div
            className="lg:col-span-6 animate-fade-up"
            style={{ animationDelay: "120ms" }}
          >
            <div className="relative mx-auto max-w-lg">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-white/20 bg-[#171126]/35 shadow-2xl shadow-[#171126]/40">
                <Image
                  src="/images/hero-moto.jpg"
                  alt="Motocicleta deportiva protagonista de Premiazo"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 560px"
                  className="object-cover object-center"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[#171126]/70 via-transparent to-transparent"
                />

                {/* Top right subtle app pill */}
                <div className="absolute top-3 right-3 hidden sm:inline-flex items-center gap-1.5 rounded-full bg-[#171126]/65 border border-white/15 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-md">
                  <ShieldCheck className="h-3.5 w-3.5 text-[#8B65F5]" aria-hidden="true" />
                  Experiencia Premiazo
                </div>

                {/* App-style floating highlight badge */}
                <div className="animate-float-slow absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 flex items-center justify-between gap-3 rounded-2xl bg-white/95 px-4 py-3 text-[#171126] shadow-lg backdrop-blur-md">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-[#6C3AE8]">
                      Premio principal
                    </p>
                    <p className="text-sm sm:text-base font-bold leading-tight">
                      Motocicleta deportiva
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => scrollToSection("premios")}
                    className="rounded-xl bg-[#6C3AE8]/12 px-3 py-1.5 text-xs font-bold text-[#5424BD] transition-colors hover:bg-[#6C3AE8]/20 cursor-pointer"
                  >
                    Ver detalle
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
