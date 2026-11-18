import type { Plan } from "@/types";

export const PARTICIPATION_PLANS: Plan[] = [
  {
    id: "plan-basico",
    name: "PLAN BÁSICO",
    shortName: "Básico",
    price: "$50 USD",
    unitPrice: 50,
    participationsPerUnit: 5,
    participationsLabel: "5 participaciones incluidas",
    description:
      "Ideal para comenzar a vivir la experiencia Premiazo con acceso a los sorteos destacados.",
    benefits: [
      "5 participaciones para los sorteos vigentes",
      "Acceso completo al catálogo de premios",
      "Confirmación de solicitud vía WhatsApp",
      "Soporte informativo personalizado",
    ],
    recommended: false,
  },
  {
    id: "plan-premium",
    name: "PLAN PREMIUM",
    shortName: "Premium",
    price: "$100 USD",
    unitPrice: 100,
    participationsPerUnit: 15,
    participationsLabel: "15 participaciones incluidas",
    description:
      "Multiplica tus oportunidades y accede a beneficios exclusivos en cada campaña.",
    benefits: [
      "15 participaciones para los sorteos vigentes",
      "Triple oportunidad frente al plan básico",
      "Atención prioritaria en campañas especiales",
      "Acceso anticipado a próximos lanzamientos",
    ],
    recommended: true,
    badge: "Plan recomendado",
  },
];
