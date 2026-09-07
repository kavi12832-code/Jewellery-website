export interface StoryBeat {
  id: string;
  range: [number, number]; // scroll range [start, end] from 0 to 1
  tagline: string;
  headline: string;
  subtitle: string;
  body: string[];
  specs?: { label: string; value: string }[];
  alignment: 'center' | 'left' | 'right';
  badge?: string;
  gemstoneHighlight?: boolean;
}

export interface JewelleryPiece {
  id: string;
  name: string;
  frenchName: string;
  category: string;
  price: string;
  gemstone: string;
  carat: string;
  metal: string;
  description: string;
  story: string;
  image: string;
  specs: {
    cut: string;
    clarity: string;
    color: string;
    origin: string;
    craftingHours: number;
  };
  features: string[];
}

export interface CategoryItem {
  id: string;
  title: string;
  description: string;
  tag: string;
  icon: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  location: string;
}

export interface WhyChoosePillar {
  title: string;
  description: string;
  icon: string;
}

export interface CraftPillar {
  step: string;
  title: string;
  frenchTitle: string;
  subtitle: string;
  description: string;
  details: string[];
  metric: string;
  metricLabel: string;
  icon: string;
}

export interface BoutiqueLocation {
  city: string;
  address: string;
  district: string;
  country: string;
  hours: string;
  concierge: string;
  phone: string;
}

export interface BookingFormData {
  salutation: string;
  fullName: string;
  email: string;
  phone: string;
  boutique: string;
  preferredDate: string;
  preferredTime: string;
  collectionInterest: string;
  champagnePreference: string;
  notes: string;
}

export interface ContactFormData {
  fullName: string;
  phone: string;
  email: string;
  message: string;
}
