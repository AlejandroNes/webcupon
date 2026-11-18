import { z } from "zod";
import { normalizePhoneInput } from "./participation";

const INTERNATIONAL_PHONE_REGEX = /^\+?\d{7,15}$/;

export const SUPPORT_TOPICS = [
  "Información de sorteos",
  "Cómo funciona la participación",
  "Dudas sobre premios",
  "Otra consulta importante",
] as const;

export type SupportTopic = (typeof SUPPORT_TOPICS)[number];

export const supportSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(3, "Ingresa tu nombre (mínimo 3 caracteres).")
    .max(80, "El nombre es demasiado largo."),
  whatsapp: z
    .string()
    .trim()
    .min(1, "Tu número de WhatsApp es obligatorio.")
    .refine(
      (value) => INTERNATIONAL_PHONE_REGEX.test(normalizePhoneInput(value)),
      {
        message: "Ingresa un número válido (7 a 15 dígitos).",
      }
    ),
  topic: z.string().min(1, "Selecciona un tema de consulta."),
  message: z
    .string()
    .trim()
    .min(5, "Cuéntanos brevemente tu consulta (mínimo 5 caracteres).")
    .max(300, "La consulta no debe superar los 300 caracteres."),
});

export type SupportSchemaValues = z.infer<typeof supportSchema>;
