export interface Service {
  id: string;
  name: string;
  category: 'half-day' | 'full-day' | 'add-on' | 'free';
  duration: string;
  price: number;
  priceSuffix?: string; // e.g. "From", "per hour"
  description: string;
  popularSpaces?: string[];
}

export interface BeforeAfterItem {
  id: string;
  title: string;
  spaceType: string;
  description: string;
  beforeImage: string;
  afterImage: string;
}

export interface Testimonial {
  id: string;
  author: string;
  location: string;
  rating: number;
  text: string;
  tag?: string; // e.g. "ADHD-friendly", "Kitchen Edit", "Pantry Reset"
}

export interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  serviceId: string;
  customService?: string;
  neurodiverseFocused: boolean;
  details: string;
  date: string;
  status: 'New' | 'Contacted' | 'Booked';
}

export interface SiteSettings {
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  aboutTitle: string;
  aboutText1: string;
  aboutText2: string;
  aboutQuote: string;
  contactPhone: string;
  contactEmail: string;
  contactInstagram: string;
  contactWhatsapp: string;
  locationArea: string;
}
