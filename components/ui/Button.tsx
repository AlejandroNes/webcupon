import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "white" | "outline";
  size?: "md" | "lg";
  fullWidth?: boolean;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  className,
  type = "button",
  ...props
}: ButtonProps) {
  const variants = {
    primary:
      "bg-gradient-to-r from-[#6C3AE8] to-[#5424BD] text-white shadow-md shadow-[#6C3AE8]/25 hover:brightness-110 active:scale-[0.98]",
    secondary:
      "bg-[#6C3AE8]/10 text-[#5424BD] hover:bg-[#6C3AE8]/15 active:scale-[0.98]",
    white:
      "bg-white text-[#5424BD] shadow-lg shadow-[#171126]/15 hover:bg-[#F8F7FC] active:scale-[0.98]",
    outline:
      "border border-[#6C3AE8]/25 bg-white text-[#171126] hover:border-[#6C3AE8] hover:text-[#6C3AE8] active:scale-[0.98]",
  };

  const sizes = {
    md: "h-11 px-5 text-sm rounded-2xl",
    lg: "h-12 px-6 text-base rounded-2xl",
  };

  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6C3AE8] disabled:opacity-50",
        variants[variant],
        sizes[size],
        fullWidth && "w-full",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
