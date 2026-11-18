"use client";

import { useState } from "react";
import { Trophy, X } from "lucide-react";

type LegalDoc = "terms" | "privacy" | null;

export function Footer() {
  const [openLegal, setOpenLegal] = useState<LegalDoc>(null);

  return (
    <footer className="bg-[#171126] text-white pt-10 pb-28 md:py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-5 text-center md:flex-row md:text-left">
          {/* Compact brand */}
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-[#6C3AE8] to-[#8B65F5] text-white">
              <Trophy className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-extrabold tracking-tight">
                Premiazo
              </span>
              <span className="text-xs text-white/55">
                Promociones y sorteos
              </span>
            </div>
          </div>

          {/* Legal links & copyright */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5 text-xs text-white/60">
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setOpenLegal("terms")}
                className="hover:text-white underline-offset-4 hover:underline cursor-pointer"
              >
                Términos y condiciones
              </button>
              <button
                type="button"
                onClick={() => setOpenLegal("privacy")}
                className="hover:text-white underline-offset-4 hover:underline cursor-pointer"
              >
                Política de privacidad
              </button>
            </div>
            <span className="hidden sm:inline text-white/25" aria-hidden="true">
              •
            </span>
            <p>© 2026 Premiazo</p>
          </div>
        </div>
      </div>

      {/* Legal info modal */}
      {openLegal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="legal-modal-title"
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-[#171126]/65 backdrop-blur-xs p-0 sm:p-4"
          onClick={() => setOpenLegal(null)}
        >
          <div
            className="animate-sheet-up w-full sm:max-w-lg rounded-t-3xl sm:rounded-3xl bg-white p-6 text-[#171126] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 pb-3 border-b border-[#6C3AE8]/10">
              <h4 id="legal-modal-title" className="text-lg font-bold">
                {openLegal === "terms"
                  ? "Términos y condiciones"
                  : "Política de privacidad"}
              </h4>
              <button
                type="button"
                onClick={() => setOpenLegal(null)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F8F7FC] text-[#171126] hover:bg-[#6C3AE8]/10 cursor-pointer"
                aria-label="Cerrar"
              >
                <X className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
              </button>
            </div>
            <div className="mt-4 space-y-3 text-sm text-[#171126]/75 leading-relaxed">
              {openLegal === "terms" ? (
                <>
                  <p>
                    Al solicitar tu participación en Premiazo, seleccionas el
                    plan de tu preferencia y envías tu solicitud a través de
                    WhatsApp.
                  </p>
                  <p>
                    Toda participación queda sujeta a la verificación del pago y
                    confirmación por parte del administrador antes del cierre de
                    cada campaña.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    Los datos ingresados en el formulario (nombre, teléfono,
                    ciudad y correo opcional) se utilizan únicamente para
                    generar tu mensaje de solicitud hacia WhatsApp.
                  </p>
                  <p>
                    Premiazo protege tu privacidad y no comparte tu información
                    con terceros ajenos a la gestión de tu participación.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
