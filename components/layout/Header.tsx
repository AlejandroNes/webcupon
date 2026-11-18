"use client";

import { useEffect, useState } from "react";
import { Trophy } from "lucide-react";
import { WhatsAppSupportModal } from "@/components/support/WhatsAppSupportModal";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { cn, scrollToSection } from "@/lib/utils";
import type { NavSectionId } from "@/types";

const NAV_LINKS: Array<{ id: NavSectionId; label: string }> = [
  { id: "inicio", label: "Inicio" },
  { id: "premios", label: "Premios" },
  { id: "participar", label: "Participar" },
  { id: "ganadores", label: "Ganadores" },
  { id: "informacion", label: "Información" },
];

export function Header() {
  const [supportOpen, setSupportOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigate = (id: NavSectionId) => {
    scrollToSection(id);
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 w-full transition-all duration-300",
          isScrolled
            ? "bg-white/95 backdrop-blur-md border-b border-[#6C3AE8]/10 shadow-sm shadow-[#171126]/5"
            : "bg-transparent border-b border-transparent"
        )}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          {/* Logo adapted to header background */}
          <button
            type="button"
            onClick={() => handleNavigate("inicio")}
            className="flex items-center gap-2.5 text-left cursor-pointer group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6C3AE8] rounded-xl"
            aria-label="Ir al inicio de Premiazo"
          >
            <span
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-105",
                isScrolled
                  ? "bg-gradient-to-br from-[#6C3AE8] to-[#5424BD] text-white shadow-sm shadow-[#6C3AE8]/30"
                  : "bg-white text-[#5424BD] shadow-md shadow-[#171126]/20"
              )}
            >
              <Trophy className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
            </span>
            <span
              className={cn(
                "text-xl font-extrabold tracking-tight transition-colors duration-300",
                isScrolled ? "text-[#171126]" : "text-white"
              )}
            >
              Premiazo
            </span>
          </button>

          {/* Desktop navigation */}
          <nav
            aria-label="Navegación principal"
            className={cn(
              "hidden md:flex items-center gap-1 rounded-full p-1 border transition-all duration-300",
              isScrolled
                ? "bg-[#F8F7FC] border-[#6C3AE8]/10"
                : "bg-white/12 border-white/20 backdrop-blur-md"
            )}
          >
            {NAV_LINKS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavigate(item.id)}
                className={cn(
                  "rounded-full px-4 py-1.5 text-sm font-medium transition-all cursor-pointer",
                  isScrolled
                    ? "text-[#171126]/80 hover:bg-white hover:text-[#6C3AE8] hover:shadow-xs"
                    : "text-white/90 hover:bg-white/20 hover:text-white"
                )}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* WhatsApp info assistant button */}
          <button
            type="button"
            onClick={() => setSupportOpen(true)}
            className={cn(
              "relative inline-flex h-10 items-center gap-2 rounded-full px-3.5 text-xs sm:text-sm font-semibold transition-all duration-300 active:scale-95 cursor-pointer",
              isScrolled
                ? "bg-gradient-to-r from-[#6C3AE8] to-[#5424BD] text-white shadow-sm shadow-[#6C3AE8]/25 hover:brightness-110"
                : "bg-white text-[#5424BD] shadow-md shadow-[#171126]/20 hover:bg-[#F8F7FC]"
            )}
            aria-label="Abrir asistente de información por WhatsApp"
          >
            <span className="relative flex h-5 w-5 items-center justify-center">
              <WhatsAppIcon className="h-4 w-4" />
              <span
                aria-hidden="true"
                className={cn(
                  "absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-emerald-400 ring-2 transition-all duration-300",
                  isScrolled ? "ring-[#6C3AE8]" : "ring-white"
                )}
              />
            </span>
            <span>Info</span>
          </button>
        </div>
      </header>

      <WhatsAppSupportModal
        open={supportOpen}
        onClose={() => setSupportOpen(false)}
      />
    </>
  );
}
