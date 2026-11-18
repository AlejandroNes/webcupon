import { getOfficialWhatsAppNumber } from "@/lib/config";
import type { ParticipationRequest } from "@/types";

/**
 * Genera el texto estructurado y formateado para enviar por WhatsApp.
 */
export function buildParticipationWhatsAppMessage(
  request: ParticipationRequest
): string {
  const { plan, quantity, unitPrice, total, participant } = request;
  const quantityLabel = quantity === 1 ? "participación" : "participaciones";
  const totalTickets = plan.participationsPerUnit * quantity;
  const emailLine = participant.email?.trim()
    ? `\n• Correo: ${participant.email.trim()}`
    : "";

  return [
    "Hola, quiero participar en *Premiazo*.",
    "",
    "*Mis datos:*",
    `• Nombre: ${participant.fullName.trim()}`,
    `• Teléfono: ${participant.whatsapp.trim()}`,
    `• Ciudad: ${participant.city.trim()}${emailLine}`,
    "",
    "*Mi solicitud:*",
    `• Plan: ${plan.shortName}`,
    `• Cantidad: ${quantity} ${quantityLabel} (${totalTickets} boletos incluidos)`,
    `• Precio unitario: $${unitPrice} USD`,
    `• *Total a pagar: $${total} USD*`,
    "",
    "Quedo atento a las instrucciones para realizar el pago y confirmar mi participación.",
  ].join("\n");
}

/**
 * Construye la URL oficial de WhatsApp (https://wa.me/NUMERO?text=MENSAJE_CODIFICADO)
 * utilizando encodeURIComponent.
 */
export function buildWhatsAppUrl(message: string): string {
  const phoneNumber = getOfficialWhatsAppNumber();
  if (!phoneNumber) {
    throw new Error("El número oficial de WhatsApp no está configurado.");
  }

  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
}

export interface SupportWhatsAppPayload {
  fullName: string;
  whatsapp: string;
  topic: string;
  message: string;
}

/**
 * Genera el mensaje de consulta informativa sobre sorteos para el administrador.
 */
export function buildSupportWhatsAppMessage(
  payload: SupportWhatsAppPayload
): string {
  return [
    "Hola, necesito *información* sobre los sorteos en *Premiazo*.",
    "",
    "*Mis datos:*",
    `• Nombre: ${payload.fullName.trim()}`,
    `• Teléfono: ${payload.whatsapp.trim()}`,
    "",
    `*Tema de consulta:* ${payload.topic}`,
    `*Mensaje:* ${payload.message.trim()}`,
  ].join("\n");
}
