export interface PrizeGalleryItem {
  src: string;
  alt: string;
  caption?: string;
}

export interface Prize {
  id: string;
  name: string;
  category: string;
  shortDescription: string;
  detailsDescription: string;
  badge: string;
  image: string;
  imageAlt: string;
  gallery: PrizeGalleryItem[];
  highlights: string[];
  estimatedValueLabel: string;
}

export interface Plan {
  id: string;
  name: string;
  shortName: string;
  price: string;
  unitPrice: number;
  participationsPerUnit: number;
  participationsLabel: string;
  description: string;
  benefits: string[];
  recommended?: boolean;
  badge?: string;
}

export interface Winner {
  id: string;
  name: string;
  city: string;
  prizeWon: string;
  exampleDate: string;
  image: string;
  imageAlt: string;
  isDemo: true;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export type NavSectionId =
  | "inicio"
  | "premios"
  | "participar"
  | "ganadores"
  | "informacion";

export interface ParticipationFormValues {
  fullName: string;
  whatsapp: string;
  city: string;
  email?: string;
}

export interface ParticipationRequest {
  plan: Plan;
  quantity: number;
  unitPrice: number;
  total: number;
  participant: ParticipationFormValues;
}
