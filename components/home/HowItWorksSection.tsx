import { BadgeCheck, Layers, SendHorizontal } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";

const STEPS = [
  {
    number: "01",
    title: "Elige tu plan",
    description:
      "Compara entre el Plan Básico y el Plan Premium según la cantidad de participaciones que prefieras.",
    icon: Layers,
  },
  {
    number: "02",
    title: "Solicita tu participación",
    description:
      "Selecciona tu opción favorita de manera rápida y clara desde cualquier dispositivo móvil.",
    icon: SendHorizontal,
  },
  {
    number: "03",
    title: "Confirma y recibe tus participaciones",
    description:
      "Completa el flujo de confirmación para recibir tus participaciones y seguir los sorteos.",
    icon: BadgeCheck,
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-10">
        <Reveal>
          <SectionHeader
            eyebrow="Así de simple"
            title="Cómo participar"
            description="Tres pasos pensados para brindarte una experiencia ágil, clara y directa."
          />
        </Reveal>

        <div className="grid gap-4 sm:gap-5 md:grid-cols-3">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <Reveal key={step.number} delayMs={index * 90}>
                <div className="relative h-full rounded-3xl bg-white p-6 border border-[#6C3AE8]/10 shadow-sm shadow-[#171126]/5 transition-all duration-300 active:scale-[0.99] hover:-translate-y-1 hover:shadow-lg hover:shadow-[#6C3AE8]/10">
                <div className="flex items-center justify-between mb-5">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#6C3AE8]/15 to-[#8B65F5]/20 text-[#5424BD]">
                    <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <span className="text-3xl font-extrabold tracking-tight text-[#6C3AE8]/20">
                    {step.number}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#171126] mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-[#171126]/70 leading-relaxed">
                  {step.description}
                </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
