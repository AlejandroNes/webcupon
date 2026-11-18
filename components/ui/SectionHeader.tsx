import { Badge } from "./Badge";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  centered = true,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "space-y-2.5",
        centered ? "text-center max-w-2xl mx-auto" : "text-left",
        className
      )}
    >
      {eyebrow && <Badge variant="soft">{eyebrow}</Badge>}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#171126]">
        {title}
      </h2>
      {description && (
        <p className="text-sm sm:text-base text-[#171126]/70 leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
