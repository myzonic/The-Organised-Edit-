import { Service, BeforeAfterItem, Testimonial, SiteSettings, Enquiry } from './types';

export const initialServices: Service[] = [
  {
    id: 'wardrobe-edit',
    name: 'The Wardrobe Edit',
    category: 'half-day',
    duration: 'Half Day (Up to 4 Hours)',
    price: 395,
    description: 'Perfect for wardrobes that no longer work for your lifestyle. We edit down your garments, reorganise your layout, and help you find joy in dressing again.'
  },
  {
    id: 'home-reset',
    name: 'The Home Reset',
    category: 'half-day',
    duration: 'Half Day (Up to 4 Hours)',
    price: 495,
    description: 'Transform one area of your home with practical, logical systems that last. We establish simple habits and sorting frameworks.',
    popularSpaces: ['Kitchen', 'Utility', 'Playroom', 'Home Office', 'Understairs Storage']
  },
  {
    id: 'calm-home-reset',
    name: 'The Calm Home Reset',
    category: 'full-day',
    duration: 'Full Day (Up to 7 Hours)',
    price: 795,
    description: 'Designed for busy family homes. Practical systems to reduce everyday overwhelm, bring calm to daily routines, and establish clear storage zones.'
  },
  {
    id: 'lifestyle-edit',
    name: 'The Lifestyle Edit',
    category: 'full-day',
    duration: 'Full Day (Up to 7 Hours)',
    price: 995,
    description: 'Our signature service. A complete master-class reset of your home and wardrobe. Perfect for a fresh slate and lifestyle transformation.'
  },
  {
    id: 'moving-edit',
    name: 'The Moving Edit',
    category: 'full-day',
    duration: '1-2 Day Package',
    price: 1500,
    priceSuffix: 'From',
    description: 'Expert support for moving house. From selective decluttering prior to the move, to unpacking and styling your new space beautifully on arrival.'
  },
  {
    id: 'discovery-call',
    name: 'Complimentary Discovery Call',
    category: 'free',
    duration: '15-Minute Consultation',
    price: 0,
    description: 'No obligation, just a friendly, judgment-free phone chat to discuss your spaces, routines, and how we can best support your family.'
  },
  {
    id: 'personal-shopping',
    name: 'Personal Shopping',
    category: 'add-on',
    duration: 'Hourly Service',
    price: 75,
    priceSuffix: 'per hour',
    description: 'For sourcing wardrobe gaps, specific storage containers, high-quality baskets, and beautiful home styling accessories.'
  },
  {
    id: 'seasonal-refresh',
    name: 'Seasonal Refresh',
    category: 'add-on',
    duration: '2-Hour Visit',
    price: 195,
    description: 'A quick maintenance session to keep your systems running smoothly, adjust storage for new seasons, and reset complex zones.'
  },
  {
    id: 'virtual-consultation',
    name: 'Virtual Consultation',
    category: 'add-on',
    duration: '90-Minute Online Session',
    price: 95,
    description: 'Comprehensive online consultation with detailed floorplan layouts, storage lists, and personalized system recommendations.'
  }
];

export const initialBeforeAfterItems: BeforeAfterItem[] = [
  {
    id: 'pantry-transformation',
    title: 'The Kitchen Pantry Masterclass',
    spaceType: 'Pantry & Food Dry Storage',
    description: 'A busy family pantry reorganized into clear, accessible categories with uniform glass decanted containers and sturdy wicker baskets.',
    beforeImage: 'https://images.unsplash.com/photo-1595341595378-fc7fa2d3bbfe?auto=format&fit=crop&q=80&w=800',
    afterImage: 'pantry_shelves' // Will resolve to the generated image path
  },
  {
    id: 'closet-reset',
    title: 'Seasonal Wardrobe Styling',
    spaceType: 'Main Bedroom Walk-in Wardrobe',
    description: 'We grouped clothing by type and color on uniform wooden hangers, decluttered unworn pieces, and styled open shelves with accessible storage bins.',
    beforeImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800',
    afterImage: 'closet_hero' // Will resolve to the generated image path
  },
  {
    id: 'playroom-sorting',
    title: 'Sensory-Friendly Playroom Reset',
    spaceType: 'Children\'s Playroom',
    description: 'Organised toys into low-height, child-friendly soft containers with visual photo-labels to aid easy clean-up and reduce sensory overwhelm.',
    beforeImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800',
    afterImage: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=800'
  }
];

export const initialTestimonials: Testimonial[] = [
  {
    id: 'review-1',
    author: 'Sarah M.',
    location: 'Altrincham, Manchester',
    rating: 5,
    text: 'As an ADHD mother of three, my house was in constant chaos. Beth and Danielle came in with zero judgment, infinite kindness, and put together simple, intuitive systems that my brain can actually maintain. It has literally changed how our home functions.',
    tag: 'ADHD-Friendly Reset'
  },
  {
    id: 'review-2',
    author: 'Emily & Jack',
    location: 'Didsbury, Manchester',
    rating: 5,
    text: 'We booked the Lifestyle Edit before welcoming our second baby. They transformed our messy spare room into a functional nursery and kitchen utility that brings us so much peace. They used 80% of what we already had, which we loved!',
    tag: 'The Lifestyle Edit'
  },
  {
    id: 'review-3',
    author: 'Claire T.',
    location: 'Hale, Cheshire',
    rating: 5,
    text: 'The Moving Edit was worth every single penny. They packed with precision, decluttered before the transition, and our wardrobes were perfectly set up on day one. Simply outstanding, luxury service.',
    tag: 'The Moving Edit'
  }
];

export const initialSettings: SiteSettings = {
  heroTitle: 'THE ORGANISED EDIT',
  heroSubtitle: 'HOME • STYLE • ORGANISATION',
  heroDescription: 'Beautiful, intuitive systems designed for real family life. Manchester-based home styling and organisation tailored to simplify your routines and create calm, judgement-free spaces, with dedicated support for neurodiverse households.',
  aboutTitle: 'Meet Beth & Danielle',
  aboutText1: 'We\'re Beth and Danielle, professional stylists and organisers with a passion for creating beautiful, functional homes that work for real life. With years of experience in styling and a deep understanding of how our environments affect our everyday, we help busy families edit their spaces, wardrobes and routines so life feels a little lighter and a lot more calm.',
  aboutText2: 'Two stylists. Two mums. One mission. With 20+ years in fashion, style and brand between us, we created The Organised Edit to help families love their homes for real and make space for what matters. We understand the chaotic reality of family routines, which is why our solutions are strictly practical, durable, and styled with high-end aesthetic value.',
  aboutQuote: 'Homes don\'t need to be perfect. They just need to work for you.',
  contactPhone: '07712 345678',
  contactEmail: 'hello@theorganisededit.co.uk',
  contactInstagram: 'theorganisededit',
  contactWhatsapp: '447712345678',
  locationArea: 'Manchester & Surrounding Areas'
};

export const initialEnquiries: Enquiry[] = [
  {
    id: 'enq-1',
    name: 'Rebecca Davies',
    email: 'rebecca@example.com',
    phone: '07812 345678',
    serviceId: 'calm-home-reset',
    neurodiverseFocused: true,
    details: 'Looking to organise our family playroom and kitchen. My son is autistic and gets overwhelmed by visual clutter, so we\'d love toy storage solutions that are closed and calming.',
    date: '2026-07-04T14:30:00.000Z',
    status: 'New'
  },
  {
    id: 'enq-2',
    name: 'James Wilson',
    email: 'james.w@example.com',
    phone: '07987 654321',
    serviceId: 'wardrobe-edit',
    neurodiverseFocused: false,
    details: 'Master bedroom wardrobe is bursting at the seams. Need help purging clothes and setting up a minimalist, color-coded wardrobe.',
    date: '2026-07-05T09:15:00.000Z',
    status: 'Contacted'
  }
];
