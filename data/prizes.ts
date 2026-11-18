import type { Prize } from "@/types";

export const FEATURED_PRIZES: Prize[] = [
  {
    id: "moto-deportiva",
    name: "Motocicleta deportiva",
    category: "Movilidad",
    shortDescription:
      "Diseño aerodinámico, motor de alto rendimiento y presencia imponente para recorrer la ciudad.",
    detailsDescription:
      "Pensada para quienes buscan adrenalina y estilo en cada trayecto. Combina estética deportiva de líneas agresivas con iluminación LED de alta visibilidad y tablero digital multifunción.",
    badge: "Premio mayor",
    image: "/images/prize-moto.jpg",
    imageAlt: "Motocicleta deportiva moderna en estudio",
    gallery: [
      {
        src: "/images/prize-moto.jpg",
        alt: "Motocicleta deportiva vista lateral en estudio claro",
        caption: "Vista de estudio — Edición deportiva",
      },
      {
        src: "/images/hero-moto.jpg",
        alt: "Motocicleta deportiva vista tres cuartos en estudio oscuro",
        caption: "Vista frontal — Iluminación y carenado",
      },
    ],
    estimatedValueLabel: "Premio mayor",
    highlights: [
      "Estilo deportivo de última generación",
      "Iluminación full LED y tablero digital",
      "Incluye casco de seguridad certificado",
    ],
  },
  {
    id: "smart-tv-55",
    name: "Smart TV de 55 pulgadas",
    category: "Entretenimiento",
    shortDescription:
      "Resolución 4K UHD con colores vibrantes, bordes ultradelgados y sonido envolvente para tu hogar.",
    detailsDescription:
      "Transforma tu sala en un cine en casa con imágenes 4K de alto rango dinámico, sistema inteligente para tus aplicaciones favoritas y un diseño ultradelgado que se adapta a cualquier ambiente.",
    badge: "Premio destacado",
    image: "/images/prize-tv.jpg",
    imageAlt: "Smart TV de 55 pulgadas 4K en estudio",
    gallery: [
      {
        src: "/images/prize-tv.jpg",
        alt: "Smart TV de 55 pulgadas 4K UHD en estudio",
        caption: "Pantalla 55 pulgadas 4K UHD",
      },
    ],
    estimatedValueLabel: "Entretenimiento en casa",
    highlights: [
      "Pantalla de 55 pulgadas con resolución 4K",
      "Acceso directo a plataformas de streaming",
      "Diseño minimalista sin marcos",
    ],
  },
  {
    id: "smartphone-pro",
    name: "Smartphone de última generación",
    category: "Tecnología",
    shortDescription:
      "Cámara profesional, pantalla fluida de alta tasa de refresco y batería de larga duración.",
    detailsDescription:
      "Potencia y elegancia en la palma de tu mano. Captura fotografías nítidas en cualquier condición de luz, disfruta de una pantalla OLED fluida y mantente conectado todo el día.",
    badge: "Premio destacado",
    image: "/images/prize-phone.jpg",
    imageAlt: "Smartphone de última generación en estudio",
    gallery: [
      {
        src: "/images/prize-phone.jpg",
        alt: "Smartphone de última generación en acabado titanio",
        caption: "Acabado premium y pantalla OLED",
      },
    ],
    estimatedValueLabel: "Tecnología portátil",
    highlights: [
      "Sistema avanzado de triple cámara",
      "Pantalla OLED de alto brillo",
      "Carga rápida y acabado premium",
    ],
  },
];
