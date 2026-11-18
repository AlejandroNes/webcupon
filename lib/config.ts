/**
 * Configuración centralizada de WhatsApp para Premiazo.
 */
export const WHATSAPP_CONFIG = {
  countryCode: "591",
  localNumber: "57122006",
  isDemo: false,
  displayNumber: "+591 57122006",
} as const;

/**
 * Retorna el número internacional limpio (solo dígitos) listo para enlaces https://wa.me/.
 */
export function getOfficialWhatsAppNumber(): string {
  return `${WHATSAPP_CONFIG.countryCode}${WHATSAPP_CONFIG.localNumber}`.replace(
    /\D/g,
    ""
  );
}
