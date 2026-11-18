"use client";

import { useEffect, useState } from "react";
import { Gift, Home, Info, Ticket, Trophy } from "lucide-react";
import { cn, scrollToSection } from "@/lib/utils";
import type { NavSectionId } from "@/types";

interface NavItem {
  id: NavSectionId;
  label: string;
  icon: typeof Home;
}

const BOTTOM_NAV_ITEMS: NavItem[] = [
  { id: "inicio", label: "Inicio", icon: Home },
  { id: "premios", label: "Premios", icon: Gift },
  { id: "participar", label: "Participar", icon: Ticket },
  { id: "ganadores", label: "Ganadores", icon: Trophy },
  { id: "informacion", label: "Información", icon: Info },
];

export function BottomNav() {
  const [activeSection, setActiveSection] = useState<NavSectionId>("inicio");

  useEffect(() => {
    const sections = BOTTOM_NAV_ITEMS.map((item) =>
      document.getElementById(item.id)
    ).filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          setActiveSection(visible[0].target.id as NavSectionId);
        }
      },
      {
        rootMargin: "-25% 0px -45% 0px",
        threshold: [0.1, 0.35, 0.6],
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const handleSelect = (id: NavSectionId) => {
    setActiveSection(id);
    scrollToSection(id);
  };

  return (
    <nav
      aria-label="Navegación inferior móvil"
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/95 backdrop-blur-md rounded-t-3xl border-t border-[#6C3AE8]/12 shadow-[0_-8px_30px_rgba(23,17,38,0.09)] pb-[env(safe-area-inset-bottom)]"
    >
      <div className="mx-auto flex max-w-md items-center justify-around px-2 py-1.5">
        {BOTTOM_NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleSelect(item.id)}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "relative flex min-h-[52px] min-w-[60px] flex-col items-center justify-center gap-1 rounded-2xl px-2.5 py-1.5 transition-all duration-200 cursor-pointer active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6C3AE8]",
                isActive
                  ? "text-[#6C3AE8]"
                  : "text-[#171126]/60 hover:text-[#171126]"
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "absolute -top-1.5 h-1 rounded-full bg-[#6C3AE8] transition-all duration-200",
                  isActive ? "w-6 opacity-100" : "w-0 opacity-0"
                )}
              />
              <span
                className={cn(
                  "flex h-8 w-10 items-center justify-center rounded-xl transition-colors duration-200",
                  isActive ? "bg-[#6C3AE8]/14" : "bg-transparent"
                )}
              >
                <Icon
                  strokeWidth={isActive ? 2.1 : 1.75}
                  className={cn(
                    "h-5 w-5 transition-transform duration-200",
                    isActive && "scale-105"
                  )}
                  aria-hidden="true"
                />
              </span>
              <span
                className={cn(
                  "text-[11px] leading-none transition-colors",
                  isActive ? "font-bold text-[#5424BD]" : "font-medium"
                )}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
