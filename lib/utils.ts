import type { NavSectionId } from "@/types";

export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

export function scrollToSection(sectionId: NavSectionId | string): void {
  if (typeof document === "undefined") return;
  const element = document.getElementById(sectionId);
  if (!element) return;

  element.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}
