"use client";

import Image from "next/image";
import { ArrowDownRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { scrollToSection } from "@/lib/utils";

export function HeroSection() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-gradient-to-t from-[#8B65F5] via-[#5424BD] to-[#3E1799] text-white"
    >
      {/* Subtle decorative radial lights */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-28 -right-24 h-80 w-80 rounded-full bg-white/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-[#171126]/30 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-4 pt-24 pb-10 sm:px-6 sm:pt-28 sm:pb-14 lg:pt-30 lg:pb-16">
        <div className="grid items-center gap-6 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-5">
          {/* 1. Title */}
          <div className="lg:col-span-6 lg:col-start-1 text-center lg:text-left animate-fade-up">
            <h1 className="text-3xl sm:text-4xl lg:text-[3.25rem] font-extrabold tracking-tight leading-[1.08]">
              ¡Tu próximo gran premio puede estar más cerca!
            </h1>
          </div>

          {/* 2. Protagonist motorcycle visual (after title on mobile, right column on desktop) */}
          <div
            className="lg:col-span-6 lg:col-start-7 lg:row-start-1 lg:row-span-3 animate-fade-up"
            style={{ animationDelay: "100ms" }}
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
              </div>
            </div>
          </div>

          {/* 3. Description */}
          <div
            className="lg:col-span-6 lg:col-start-1 text-center lg:text-left animate-fade-up"
            style={{ animationDelay: "140ms" }}
          >
            <p className="text-base sm:text-lg text-white/85 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Descubre increíbles premios, participa y vive la emoción de ganar.
            </p>
          </div>

          {/* 4. CTA buttons (only "Participar desde $50 USD" on mobile) */}
          <div
            className="lg:col-span-6 lg:col-start-1 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 animate-fade-up"
            style={{ animationDelay: "180ms" }}
          >
            <div className="hidden sm:block">
              <Button
                variant="white"
                size="lg"
                onClick={() => scrollToSection("premios")}
              >
                Descubrir premios
                <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
            <button
              type="button"
              onClick={() => scrollToSection("participar")}
              className="w-full sm:w-auto inline-flex h-12 items-center justify-center rounded-2xl bg-white text-[#5424BD] shadow-lg shadow-[#171126]/15 hover:bg-[#F8F7FC] sm:border sm:border-white/30 sm:bg-white/10 sm:text-white sm:shadow-none sm:backdrop-blur-sm sm:hover:bg-white/20 px-6 text-sm sm:text-sm font-semibold transition-all active:scale-[0.98] cursor-pointer"
            >
              Participar desde $50 USD
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
