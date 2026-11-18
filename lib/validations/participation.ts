import { z } from "zod";

/**
 * Normaliza un número de teléfono removiendo espacios, guiones y paréntesis.
 */
export function normalizePhoneInput(value: string): string {
  return value.replace(/[\s\-()]/g, "");
}

/**
 * Valida números de WhatsApp internacionales (entre 7 y 15 dígitos, con prefijo + opcional).
 */
const INTERNATIONAL_PHONE_REGEX = /^\+?\d{7,15}$/;

export const participationSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(3, "Ingresa tu nombre completo (mínimo 3 caracteres).")
    .max(80, "El nombre no puede superar los 80 caracteres."),
  whatsapp: z
    .string()
    .trim()
    .min(1, "El número de WhatsApp es obligatorio.")
    .refine(
      (value) => INTERNATIONAL_PHONE_REGEX.test(normalizePhoneInput(value)),
      {
        message:
          "Ingresa un número de WhatsApp válido (entre 7 y 15 dígitos, con código de país si aplica).",
      }
    ),
  city: z
    .string()
    .trim()
    .min(2, "Ingresa tu ciudad (mínimo 2 caracteres).")
    .max(60, "La ciudad no puede superar los 60 caracteres."),
  email: z
    .string()
    .trim()
    .email("Ingresa un correo electrónico válido.")
    .optional()
    .or(z.literal("")),
});

export type ParticipationSchemaValues = z.infer<typeof participationSchema>;
