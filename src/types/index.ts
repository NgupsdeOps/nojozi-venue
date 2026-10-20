export interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
  priceText: string;
}

export interface Extra {
  id: string;
  title: string;
  description: string;
  priceText: string;
}

export interface Review {
  id: string;
  author: string;
  comment: string;
  rating: number;
  date: string;
  approved: boolean;
}

export interface QuoteFormData {
  eventType: string;
  eventDate: string;
  guestCount: number;
  selectedExtras: string[];
  fullName: string;
  email: string;
  phone: string;
  notes?: string;
}