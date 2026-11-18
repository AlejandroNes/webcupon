"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Images,
  Ticket,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn, scrollToSection } from "@/lib/utils";
import type { Prize } from "@/types";

interface PrizeDetailModalProps {
  prize: Prize | null;
  onClose: () => void;
}

export function PrizeDetailModal({ prize, onClose }: PrizeDetailModalProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    if (!prize) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (prize.gallery.length > 1) {
        if (event.key === "ArrowRight") {
          setActiveImageIndex((prev) => (prev + 1) % prize.gallery.length);
        } else if (event.key === "ArrowLeft") {
          setActiveImageIndex(
            (prev) => (prev - 1 + prize.gallery.length) % prize.gallery.length
          );
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [prize, onClose]);

  if (!prize) return null;

  const gallery = prize.gallery;
  const safeIndex = activeImageIndex < gallery.length ? activeImageIndex : 0;
  const currentImage = gallery[safeIndex] ?? {
    src: prize.image,
    alt: prize.imageAlt,
  };
  const hasMultipleImages = gallery.length > 1;

  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
  };

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % gallery.length);
  };

  const handleParticipateClick = () => {
    onClose();
    scrollToSection("participar");
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="prize-modal-title"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-[#171126]/65 backdrop-blur-xs p-0 sm:p-4"
      onClick={onClose}
    >
      <div
        className="animate-sheet-up w-full sm:max-w-lg max-h-[92dvh] overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-white shadow-2xl border border-[#6C3AE8]/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Gallery viewer */}
        <div className="relative aspect-[16/10] w-full bg-[#F8F7FC] overflow-hidden">
          <Image
            src={currentImage.src}
            alt={currentImage.alt}
            fill
            sizes="(max-width: 640px) 100vw, 512px"
            className="object-cover transition-all duration-300"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#171126]/55 to-transparent"
          />

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar detalle del premio"
            className="absolute top-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-[#171126] shadow-md transition-transform hover:scale-105 active:scale-95 cursor-pointer"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>

          <div className="absolute top-3 left-3 flex items-center gap-2">
            <Badge variant="primary">{prize.badge}</Badge>
            <Badge
              variant="light"
              className="bg-[#171126]/55 border-white/20 text-white"
            >
              {prize.category}
            </Badge>
          </div>

          {hasMultipleImages && (
            <>
              <button
                type="button"
                onClick={handlePrevImage}
                aria-label="Imagen anterior"
                className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#171126] shadow-md transition-transform hover:scale-105 active:scale-95 cursor-pointer"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={handleNextImage}
                aria-label="Siguiente imagen"
                className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#171126] shadow-md transition-transform hover:scale-105 active:scale-95 cursor-pointer"
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>

              <div className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-[#171126]/65 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-xs">
                <Images className="h-3.5 w-3.5" aria-hidden="true" />
                <span>
                  {safeIndex + 1} / {gallery.length}
                </span>
              </div>
            </>
          )}

          {currentImage.caption && (
            <p className="absolute bottom-3 left-3 text-xs font-medium text-white/95 drop-shadow-xs">
              {currentImage.caption}
            </p>
          )}
        </div>

        {/* Thumbnail switcher when multiple images exist */}
        {hasMultipleImages && (
          <div className="flex items-center gap-2 px-5 pt-4 sm:px-6">
            {gallery.map((item, index) => (
              <button
                key={item.src}
                type="button"
                onClick={() => setActiveImageIndex(index)}
                aria-label={`Ver imagen ${index + 1} de ${prize.name}`}
                aria-current={safeIndex === index ? "true" : undefined}
                className={cn(
                  "relative h-12 w-16 overflow-hidden rounded-xl border-2 transition-all cursor-pointer",
                  safeIndex === index
                    ? "border-[#6C3AE8] ring-2 ring-[#6C3AE8]/25"
                    : "border-transparent opacity-65 hover:opacity-100"
                )}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-4">
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#6C3AE8]">
              {prize.estimatedValueLabel}
            </p>
            <h4
              id="prize-modal-title"
              className="text-2xl font-bold text-[#171126]"
            >
              {prize.name}
            </h4>
          </div>

          <p className="text-sm text-[#171126]/80 leading-relaxed">
            {prize.detailsDescription}
          </p>

          <ul className="space-y-2 rounded-2xl bg-[#F8F7FC] p-4 border border-[#6C3AE8]/8">
            {prize.highlights.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2.5 text-sm text-[#171126]/85"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#6C3AE8]/15 text-[#5424BD]">
                  <Check className="h-3 w-3" aria-hidden="true" />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-col-reverse sm:flex-row gap-2.5 pt-1">
            <Button
              variant="outline"
              onClick={onClose}
              className="sm:w-auto"
            >
              Cerrar
            </Button>
            <Button
              variant="primary"
              fullWidth
              onClick={handleParticipateClick}
            >
              <Ticket className="h-4 w-4" aria-hidden="true" />
              Ir a planes de participación
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
