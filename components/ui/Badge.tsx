import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: ReactNode;
  variant?: "primary" | "soft" | "light" | "demo";
  className?: string;
}

export function Badge({
  children,
  variant = "soft",
  className,
}: BadgeProps) {
  const variants = {
    primary:
      "bg-gradient-to-r from-[#6C3AE8] to-[#8B65F5] text-white shadow-sm shadow-[#6C3AE8]/25",
    soft: "bg-[#6C3AE8]/10 text-[#5424BD] border border-[#6C3AE8]/15",
    light: "bg-white/15 text-white border border-white/25 backdrop-blur-md",
    demo: "bg-[#171126]/5 text-[#171126]/70 border border-[#171126]/10",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold tracking-wide",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
