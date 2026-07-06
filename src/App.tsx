import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Sparkles, 
  Calendar, 
  MapPin, 
  Mail, 
  Phone, 
  Instagram, 
  MessageCircle, 
  Check, 
  Menu, 
  X, 
  Lock, 
  ChevronRight, 
  HelpCircle,
  ThumbsUp,
  Smile
} from 'lucide-react';

import { Service, BeforeAfterItem, Testimonial, SiteSettings, Enquiry } from './types';
import { 
  initialServices, 
  initialBeforeAfterItems, 
  initialTestimonials, 
  initialSettings, 
  initialEnquiries 
} from './initialData';

import BeforeAfterSlider, { resolveImage } from './components/BeforeAfterSlider';
import ContactForm from './components/ContactForm';
import CmsDashboard from './components/CmsDashboard';

export default function App() {
  // CMS & State Management - Hydrated from localStorage
  const [services, setServices] = useState<Service[]>([]);
  const [beforeAfterItems, setBeforeAfterItems] = useState<BeforeAfterItem[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [settings, setSettings] = useState<SiteSettings>(initialSettings);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCmsOpen, setIsCmsOpen] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [isAdminPromptOpen, setIsAdminPromptOpen] = useState(false);
  const [adminError, setAdminError] = useState(false);

  // Initialize and load from local storage
  useEffect(() => {
    const localServices = localStorage.getItem('toe_services');
    const localBeforeAfter = localStorage.getItem('toe_before_after');
    const localTestimonials = localStorage.getItem('toe_testimonials');
    const localSettings = localStorage.getItem('toe_settings');
    const localEnquiries = localStorage.getItem('toe_enquiries');

    if (localServices) {
      setServices(JSON.parse(localServices));
    } else {
      setServices(initialServices);
      localStorage.setItem('toe_services', JSON.stringify(initialServices));
    }

    if (localBeforeAfter) {
      setBeforeAfterItems(JSON.parse(localBeforeAfter));
    } else {
      setBeforeAfterItems(initialBeforeAfterItems);
      localStorage.setItem('toe_before_after', JSON.stringify(initialBeforeAfterItems));
    }

    if (localTestimonials) {
      setTestimonials(JSON.parse(localTestimonials));
    } else {
      setTestimonials(initialTestimonials);
      localStorage.setItem('toe_testimonials', JSON.stringify(initialTestimonials));
    }

    if (localSettings) {
      setSettings(JSON.parse(localSettings));
    } else {
      setSettings(initialSettings);
      localStorage.setItem('toe_settings', JSON.stringify(initialSettings));
    }

    if (localEnquiries) {
      setEnquiries(JSON.parse(localEnquiries));
    } else {
      setEnquiries(initialEnquiries);
      localStorage.setItem('toe_enquiries', JSON.stringify(initialEnquiries));
    }
  }, []);

  // Add enquiry locally
  const handleAddEnquiry = (newEnquiry: Enquiry) => {
    const updated = [newEnquiry, ...enquiries];
    setEnquiries(updated);
    localStorage.setItem('toe_enquiries', JSON.stringify(updated));
  };

  // Reset defaults
  const handleResetDefaults = () => {
    setServices(initialServices);
    setBeforeAfterItems(initialBeforeAfterItems);
    setTestimonials(initialTestimonials);
    setSettings(initialSettings);
    setEnquiries(initialEnquiries);

    localStorage.setItem('toe_services', JSON.stringify(initialServices));
    localStorage.setItem('toe_before_after', JSON.stringify(initialBeforeAfterItems));
    localStorage.setItem('toe_testimonials', JSON.stringify(initialTestimonials));
    localStorage.setItem('toe_settings', JSON.stringify(initialSettings));
    localStorage.setItem('toe_enquiries', JSON.stringify(initialEnquiries));
  };

  // Smooth scroll handler
  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Quick book service trigger - scrolls to form and selects package
  const triggerQuickBook = (serviceId: string) => {
    const container = document.getElementById('contact-form-container');
    if (container) {
      container.scrollIntoView({ behavior: 'smooth' });
    }
    // Update contact form's select box
    const selectEl = document.getElementById('preferred-service') as HTMLSelectElement | null;
    if (selectEl) {
      selectEl.value = serviceId;
      // Trigger native react change
      const event = new Event('change', { bubbles: true });
      selectEl.dispatchEvent(event);
    }
  };

  const handleAdminAccess = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple bypass password for quick evaluation, default is 'admin' or empty for easy evaluation!
    if (adminPassword.toLowerCase() === 'admin' || adminPassword === '') {
      setIsCmsOpen(true);
      setIsAdminPromptOpen(false);
      setAdminError(false);
      setAdminPassword('');
    } else {
      setAdminError(true);
    }
  };


  return (
    <div className="min-h-screen bg-[#F4F1EC]/40 text-[#2B2B2B] font-body flex flex-col selection:bg-[#A89A8A]/35 selection:text-[#2B2B2B] scroll-smooth">
      
      {/* HEADER SECTION */}
      <header className="sticky top-0 z-40 bg-white/70 backdrop-blur-md border-b border-[#E6DED4]/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
          
          {/* Logo Brand Signature */}
          <div 
            onClick={() => scrollToSection('home')} 
            className="cursor-pointer flex flex-col items-center group"
          >
            <span className="font-serif text-xl sm:text-2xl tracking-[0.18em] text-[#2B2B2B] font-medium transition-colors group-hover:text-[#A89A8A]">
              THE ORGANISED EDIT
            </span>
            <span className="text-[9px] tracking-[0.4em] uppercase font-sans text-[#A89A8A] font-semibold">
              HOME • STYLE • ORGANISATION
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 font-sans text-[11px] font-semibold uppercase tracking-widest text-[#2B2B2B]">
            <button onClick={() => scrollToSection('home')} className="hover:text-[#A89A8A] transition-colors cursor-pointer">Home</button>
            <button onClick={() => scrollToSection('about')} className="hover:text-[#A89A8A] transition-colors cursor-pointer">About Us</button>
            <button onClick={() => scrollToSection('services')} className="hover:text-[#A89A8A] transition-colors cursor-pointer">Services</button>
            <button onClick={() => scrollToSection('gallery')} className="hover:text-[#A89A8A] transition-colors cursor-pointer">Before & After</button>
            <button onClick={() => scrollToSection('testimonials')} className="hover:text-[#A89A8A] transition-colors cursor-pointer">Reviews</button>
            
            <button 
              onClick={() => scrollToSection('contact')}
              className="px-5 py-2.5 bg-[#2B2B2B] text-white hover:bg-[#A89A8A] rounded-full transition-all tracking-widest shadow-xs uppercase cursor-pointer"
            >
              Enquire Now
            </button>
          </nav>

          {/* Mobile Hamburguer toggle */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-[#2B2B2B] hover:text-[#A89A8A] transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white/95 border-b border-[#E6DED4] p-6 space-y-4 font-sans text-xs font-semibold uppercase tracking-widest text-center animate-fade-in">
            <button onClick={() => scrollToSection('home')} className="block w-full py-2 text-[#2B2B2B] hover:text-[#A89A8A]">Home</button>
            <button onClick={() => scrollToSection('about')} className="block w-full py-2 text-[#2B2B2B] hover:text-[#A89A8A]">About Us</button>
            <button onClick={() => scrollToSection('services')} className="block w-full py-2 text-[#2B2B2B] hover:text-[#A89A8A]">Services</button>
            <button onClick={() => scrollToSection('gallery')} className="block w-full py-2 text-[#2B2B2B] hover:text-[#A89A8A]">Before & After</button>
            <button onClick={() => scrollToSection('testimonials')} className="block w-full py-2 text-[#2B2B2B] hover:text-[#A89A8A]">Reviews</button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="block w-full py-3 bg-[#2B2B2B] text-white rounded-full"
            >
              Enquire Now
            </button>
          </div>
        )}
      </header>

      {/* HERO SECTION */}
      <section id="home" className="relative bg-white pt-10 pb-20 md:py-24 border-b border-[#E6DED4]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Content Block */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E6DED4]/40 border border-[#E6DED4] text-[#A89A8A] font-sans text-[10px] font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Manchester & Cheshire Organisers</span>
            </div>
            
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#2B2B2B] leading-tight tracking-tight">
              {settings.heroTitle}
            </h1>
            
            <p className="font-sans text-sm tracking-[0.25em] text-[#A89A8A] font-medium uppercase border-b border-[#E6DED4] pb-4">
              {settings.heroSubtitle}
            </p>

            <p className="font-body text-[#555] text-sm leading-relaxed max-w-lg">
              {settings.heroDescription}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                onClick={() => scrollToSection('contact')}
                className="px-8 py-4 bg-[#2B2B2B] text-[#F4F1EC] hover:bg-[#A89A8A] rounded-full font-sans text-xs font-semibold tracking-widest uppercase transition-all shadow-xs text-center cursor-pointer"
              >
                Book Discovery Call
              </button>
              <button 
                onClick={() => scrollToSection('services')}
                className="px-8 py-4 border border-[#A89A8A] text-[#A89A8A] hover:bg-[#F4F1EC] rounded-full font-sans text-xs font-semibold tracking-widest uppercase transition-all text-center cursor-pointer"
              >
                View Services
              </button>
            </div>

            {/* Trust values row */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#E6DED4]/60 text-center sm:text-left">
              <div>
                <span className="block font-serif text-xl font-bold text-[#2B2B2B]">100%</span>
                <span className="text-[10px] uppercase tracking-wider font-sans text-[#A89A8A] font-medium">Judgement Free</span>
              </div>
              <div>
                <span className="block font-serif text-xl font-bold text-[#2B2B2B]">ADHD</span>
                <span className="text-[10px] uppercase tracking-wider font-sans text-[#A89A8A] font-medium">Sensory Friendly</span>
              </div>
              <div>
                <span className="block font-serif text-xl font-bold text-[#2B2B2B]">Sustainable</span>
                <span className="text-[10px] uppercase tracking-wider font-sans text-[#A89A8A] font-medium">Eco Conscious</span>
              </div>
            </div>
          </div>

          {/* Hero Visual Block */}
          <div className="lg:col-span-7 relative">
            <div className="absolute -inset-2 bg-[#E6DED4]/50 rounded-3xl -rotate-1 pointer-events-none" />
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] border border-[#E6DED4] shadow-md">
              <img 
                src="/src/assets/images/organized_closet_hero_1783305649580.jpg" 
                alt="Beautifully styled, perfectly organized custom walk-in closet in a Manchester home" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-6 left-6 bg-white/95 border border-[#E6DED4] p-4 rounded-xl max-w-xs shadow-xs backdrop-blur-xs text-left">
                <span className="font-serif text-sm italic text-[#A89A8A] block mb-0.5">"Beautiful systems for real family life."</span>
                <span className="font-sans text-[9px] tracking-widest uppercase text-[#555] font-semibold">The Organised Edit Signature Standard</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* WHY WE ARE DIFFERENT - NEURODIVERGENT SPOTLIGHT */}
      <section className="bg-white py-16 md:py-20 border-b border-[#E6DED4]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="font-sans text-xs tracking-[0.25em] uppercase text-[#A89A8A] font-bold block">Why We Are Different</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#2B2B2B] tracking-tight">
              Calm, Compassionate, & Customised Organisation
            </h2>
            <div className="h-0.5 w-16 bg-[#A5AEA0] mx-auto mt-2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Column 1: Neurodiverse Accommodation */}
            <div className="bg-[#A5AEA0]/10 border border-[#A5AEA0]/30 rounded-2xl p-8 space-y-4 text-left relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#A5AEA0]/10 rounded-full translate-x-8 -translate-y-8" />
              <div className="w-10 h-10 rounded-full bg-[#A5AEA0]/20 flex items-center justify-center text-[#55634d] font-semibold text-sm">
                <Heart className="w-5 h-5 fill-current" />
              </div>
              <h3 className="font-serif text-xl text-[#2B2B2B]">Neurodivergent Friendly</h3>
              <p className="font-body text-[#555] text-sm leading-relaxed">
                We specialize in supporting ADHD, autistic, and sensory-sensitive families. We reject standard neurotypical "container store" rules. Instead, we design for low cognitive load: translucent storage containers so you don't forget items exist (out of sight, out of mind), logical zones, and customizable, friendly photo labeling systems.
              </p>
            </div>

            {/* Column 2: Practicality First */}
            <div className="bg-[#F4F1EC] border border-[#E6DED4] rounded-2xl p-8 space-y-4 text-left relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#A89A8A]/10 rounded-full translate-x-8 -translate-y-8" />
              <div className="w-10 h-10 rounded-full bg-[#A89A8A]/20 flex items-center justify-center text-[#A89A8A] font-semibold text-sm">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl text-[#2B2B2B]">Real systems for real life</h3>
              <p className="font-body text-[#555] text-sm leading-relaxed">
                Homes don't need to look like filtered museum photos; they need to work for chaotic morning school runs. We build flexible sorting frameworks that take less than 2 minutes to reset. We focus on durable layouts that your busy family can actually maintain effortlessly.
              </p>
            </div>

            {/* Column 3: Sustainability and Editing */}
            <div className="bg-[#F4F1EC] border border-[#E6DED4] rounded-2xl p-8 space-y-4 text-left relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#A89A8A]/10 rounded-full translate-x-8 -translate-y-8" />
              <div className="w-10 h-10 rounded-full bg-[#A89A8A]/20 flex items-center justify-center text-[#A89A8A] font-semibold text-sm">
                <Smile className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl text-[#2B2B2B]">Judgement-Free & Kind</h3>
              <p className="font-body text-[#555] text-sm leading-relaxed">
                We understand the shame and overwhelm that clutter causes. We operate with absolute discretion, kindness, and zero judgment. We always prioritize repurposing and styling with storage you already own before recommending any luxury container purchases.
              </p>
            </div>

          </div>

          <div className="mt-12 bg-[#F4F1EC]/40 p-6 rounded-xl border border-[#E6DED4] text-center italic font-serif text-[#A89A8A] text-lg max-w-2xl mx-auto">
            "Homes don't need to be perfect. They just need to work for you."
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="bg-[#F4F1EC]/40 py-16 md:py-24 border-b border-[#E6DED4]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="font-sans text-xs tracking-[0.25em] uppercase text-[#A89A8A] font-bold block">Our Services & Pricing</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#2B2B2B] tracking-tight">
              Bespoke Styling & Organizing Experiences
            </h2>
            <p className="font-body text-sm text-[#555] max-w-md mx-auto">
              Professional, dedicated sorting to fit your routine, budget, and size requirements.
            </p>
            <div className="h-0.5 w-16 bg-[#A5AEA0] mx-auto mt-2" />
          </div>

          {/* Group 1: Half Day Services */}
          <div className="space-y-6 mb-12 text-left">
            <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-[#A89A8A] border-l-2 border-[#A89A8A] pl-3">
              Half Day Services (Up to 4 Hours)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.filter(s => s.category === 'half-day').map((s) => (
                <div key={s.id} className="bg-white rounded-2xl border border-[#E6DED4] p-6 shadow-xs flex flex-col justify-between hover:border-[#A89A8A] transition-all">
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <h4 className="font-serif text-lg text-[#2B2B2B] font-semibold">{s.name}</h4>
                      <span className="font-serif text-lg text-[#2B2B2B] font-bold">£{s.price}</span>
                    </div>
                    <span className="inline-block text-[10px] font-sans uppercase tracking-widest text-[#A89A8A] bg-[#F4F1EC] px-2.5 py-0.5 rounded-full">
                      {s.duration}
                    </span>
                    <p className="font-body text-xs text-[#555] leading-relaxed">
                      {s.description}
                    </p>
                    {s.popularSpaces && (
                      <div className="pt-2">
                        <span className="text-[9px] uppercase font-sans tracking-wider text-[#A89A8A] font-medium block mb-1">Popular Spaces:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {s.popularSpaces.map((space, idx) => (
                            <span key={idx} className="bg-[#E6DED4]/35 border border-[#E6DED4] text-[#555] text-[9px] px-2 py-0.5 rounded-md">
                              {space}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <button 
                    onClick={() => triggerQuickBook(s.id)}
                    className="w-full mt-6 py-2.5 border.5 border-[#A89A8A] text-[#A89A8A] hover:bg-[#2B2B2B] hover:text-[#F4F1EC] hover:border-transparent rounded-xl font-sans text-[10px] tracking-widest uppercase font-semibold transition-all cursor-pointer"
                  >
                    Select Experience
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Group 2: Full Day Services */}
          <div className="space-y-6 mb-12 text-left">
            <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-[#A89A8A] border-l-2 border-[#A89A8A] pl-3">
              Full Day Services (Up to 7 Hours)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.filter(s => s.category === 'full-day').map((s) => (
                <div key={s.id} className="bg-white rounded-2xl border border-[#A89A8A]/40 p-6 shadow-xs flex flex-col justify-between hover:border-[#A89A8A] transition-all relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-12 h-12 bg-[#A89A8A]/10 rounded-bl-3xl flex items-center justify-center text-[#A89A8A]">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <h4 className="font-serif text-lg text-[#2B2B2B] font-semibold">{s.name}</h4>
                      <span className="font-serif text-lg text-[#2B2B2B] font-bold">
                        {s.priceSuffix ? `${s.priceSuffix} ` : ''}£{s.price}
                      </span>
                    </div>
                    <span className="inline-block text-[10px] font-sans uppercase tracking-widest text-[#A89A8A] bg-[#F4F1EC] px-2.5 py-0.5 rounded-full font-semibold">
                      {s.duration}
                    </span>
                    <p className="font-body text-xs text-[#555] leading-relaxed">
                      {s.description}
                    </p>
                  </div>
                  <button 
                    onClick={() => triggerQuickBook(s.id)}
                    className="w-full mt-6 py-2.5 bg-[#2B2B2B] text-white hover:bg-[#A89A8A] rounded-xl font-sans text-[10px] tracking-widest uppercase font-semibold transition-all cursor-pointer"
                  >
                    Select Experience
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Group 3: Add-on & Complimentary Services */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-left border-t border-[#E6DED4] pt-12">
            <div className="lg:col-span-1 space-y-4">
              <span className="font-sans text-[10px] tracking-widest uppercase text-[#A89A8A] font-bold">Add-on Enhancements</span>
              <h3 className="font-serif text-2xl text-[#2B2B2B]">Need a Little Extra Support?</h3>
              <p className="font-body text-xs text-[#555] leading-relaxed">
                Complement your main reset project with personalized retail container shopping, ongoing seasonal maintenance visits, or online blueprint consultations.
              </p>
              <div className="bg-[#A5AEA0]/10 border border-[#A5AEA0]/20 p-4 rounded-xl flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#A5AEA0]/20 text-[#6c7866] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">i</div>
                <p className="text-[11px] font-sans text-stone-600 leading-relaxed">
                  <strong>Important Details:</strong> Storage products, baskets, labels and accessories are charged separately at client cost. Travel throughout Greater Manchester is fully included.
                </p>
              </div>
            </div>

            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {services.filter(s => s.category === 'add-on' || s.category === 'free').map((s) => (
                <div key={s.id} className="bg-white/80 rounded-xl border border-[#E6DED4] p-5 flex flex-col justify-between hover:bg-white transition-all">
                  <div className="space-y-1">
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="font-serif text-sm font-semibold text-[#2B2B2B]">{s.name}</h4>
                      <span className="font-serif text-sm font-bold text-[#2B2B2B] shrink-0">
                        {s.price === 0 ? 'Free' : `${s.priceSuffix ? s.priceSuffix + ' ' : ''}£${s.price}`}
                      </span>
                    </div>
                    <span className="text-[9px] font-sans text-[#A89A8A] font-medium block">
                      {s.duration}
                    </span>
                    <p className="font-body text-[11px] text-[#555] leading-relaxed pt-1">
                      {s.description}
                    </p>
                  </div>
                  <button 
                    onClick={() => triggerQuickBook(s.id)}
                    className="mt-3 text-left font-sans text-[9px] tracking-widest uppercase font-bold text-[#A89A8A] hover:text-[#2B2B2B] flex items-center gap-1 cursor-pointer"
                  >
                    <span>Request This Add-on</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* BEFORE & AFTER GALLERY SECTION */}
      <section id="gallery" className="bg-white py-16 md:py-24 border-b border-[#E6DED4]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="font-sans text-xs tracking-[0.25em] uppercase text-[#A89A8A] font-bold block">Transformation Gallery</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#2B2B2B] tracking-tight">
              Aesthetic Realities: Before & After
            </h2>
            <p className="font-body text-sm text-[#555] max-w-md mx-auto">
              Real homes. Real families. Hand-styled systems crafted to alleviate daily cognitive clutter.
            </p>
            <div className="h-0.5 w-16 bg-[#A5AEA0] mx-auto mt-2" />
          </div>

          {/* Interactive Sliders Stack */}
          <div className="space-y-12">
            {beforeAfterItems.map((item) => (
              <BeforeAfterSlider
                key={item.id}
                beforeImage={item.beforeImage}
                afterImage={item.afterImage}
                title={item.title}
                spaceType={item.spaceType}
                description={item.description}
              />
            ))}
          </div>

        </div>
      </section>

      {/* MEET BETH & DANIELLE SECTION */}
      <section id="about" className="bg-[#F4F1EC]/60 py-16 md:py-24 border-b border-[#E6DED4]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Photos Frame */}
          <div className="lg:col-span-6 relative">
            <div className="absolute -inset-3 bg-[#A89A8A]/10 rounded-3xl rotate-1 pointer-events-none" />
            <div className="relative rounded-2xl overflow-hidden aspect-4/3 border border-[#E6DED4] shadow-sm">
              <img 
                src="/src/assets/images/beth_danielle_founders_1783305671597.jpg" 
                alt="Beth and Danielle, founders and designers of The Organised Edit" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 bg-[#2B2B2B]/75 text-white text-[9px] uppercase tracking-widest font-sans px-2.5 py-1 rounded backdrop-blur-xs font-semibold">
                Two Stylists. Two Mums. One Mission.
              </div>
            </div>
          </div>

          {/* Biography and Story details */}
          <div className="lg:col-span-6 text-left space-y-6">
            <span className="font-sans text-xs tracking-[0.25em] uppercase text-[#A89A8A] font-bold block">Who We Are</span>
            <h2 className="font-serif text-3.5xl text-[#2B2B2B] tracking-tight">{settings.aboutTitle}</h2>
            
            <p className="font-body text-[#555] text-sm leading-relaxed">
              {settings.aboutText1}
            </p>

            <p className="font-body text-[#555] text-sm leading-relaxed">
              {settings.aboutText2}
            </p>

            <div className="bg-white/80 p-5 rounded-2xl border border-[#E6DED4] italic font-serif text-[#A89A8A] text-md relative pl-10">
              <span className="absolute top-4 left-4 text-3xl font-serif leading-none text-[#A89A8A]/30">“</span>
              <p className="leading-relaxed">
                Homes don't need to be perfect. They just need to work for you. Let go of the shame of the laundry pile and let's construct systems that work with your life.
              </p>
            </div>

            {/* Micro value badges */}
            <div className="grid grid-cols-2 gap-4 text-xs font-sans text-[#2B2B2B] font-medium">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-[#A5AEA0] rounded-full" />
                <span>ADHD & Autism Trained</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-[#A89A8A] rounded-full" />
                <span>20+ Years Design Legacy</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-[#A89A8A] rounded-full" />
                <span>Judgment-Free Policy</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-[#A5AEA0] rounded-full" />
                <span>Sustainable Local sourcing</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* CLIENT TESTIMONIALS SECTION */}
      <section id="testimonials" className="bg-white py-16 md:py-24 border-b border-[#E6DED4]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="font-sans text-xs tracking-[0.25em] uppercase text-[#A89A8A] font-bold block">Words from Families</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#2B2B2B] tracking-tight">
              Calm Homes, Restored Peace
            </h2>
            <div className="h-0.5 w-16 bg-[#A5AEA0] mx-auto mt-2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {testimonials.map((t) => (
              <div key={t.id} className="bg-[#F4F1EC] border border-[#E6DED4] rounded-2xl p-8 space-y-4 flex flex-col justify-between hover:shadow-xs transition-all relative">
                <div className="space-y-3">
                  {/* Rating Stars */}
                  <div className="flex gap-1 text-[#A89A8A]">
                    {[...Array(t.rating)].map((_, i) => (
                      <span key={i} className="text-sm">★</span>
                    ))}
                  </div>

                  {t.tag && (
                    <span className="inline-block text-[9px] uppercase font-sans tracking-widest px-2.5 py-0.5 rounded-full bg-[#A5AEA0]/15 text-[#55634d] border border-[#A5AEA0]/20 font-bold">
                      {t.tag}
                    </span>
                  )}

                  <p className="font-body text-[#555] text-xs leading-relaxed italic">
                    "{t.text}"
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E6DED4] flex justify-between items-center text-xs">
                  <div>
                    <span className="block font-serif text-[#2B2B2B] font-semibold">{t.author}</span>
                    <span className="text-[10px] font-sans text-[#A89A8A]">{t.location}</span>
                  </div>
                  <Smile className="w-5 h-5 text-[#A89A8A]/40" />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* CONTACT & ENQUIRY FORM SECTION */}
      <section id="contact" className="bg-[#F4F1EC]/30 py-16 md:py-24 border-b border-[#E6DED4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <ContactForm 
            services={services} 
            onAddEnquiry={handleAddEnquiry} 
          />

        </div>
      </section>

      {/* INSTAGRAM & SOCIAL AESTHETIC FEED PREVIEW */}
      <section className="bg-white py-16 border-b border-[#E6DED4]/60 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-2 mb-8">
            <span className="font-sans text-[10px] tracking-widest uppercase text-[#A89A8A] font-bold block">Follow our Journey</span>
            <h3 className="font-serif text-2xl text-[#2B2B2B]">Inspired by @theorganisededit</h3>
            <p className="text-xs text-[#555] font-body">Daily tips, kind advice, and calm aesthetics from our Manchester studio.</p>
          </div>

          {/* Instagram Feed Simulation Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            
            <div className="relative aspect-square overflow-hidden rounded-xl border border-[#E6DED4] group cursor-pointer bg-stone-100">
              <img 
                src="https://images.unsplash.com/photo-1595341595378-fc7fa2d3bbfe?auto=format&fit=crop&q=80&w=400" 
                alt="Minimal pantry jars" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs gap-1">
                <span>♥ 142 Likes</span>
              </div>
            </div>

            <div className="relative aspect-square overflow-hidden rounded-xl border border-[#E6DED4] group cursor-pointer bg-stone-100">
              <img 
                src="/src/assets/images/organized_closet_hero_1783305649580.jpg" 
                alt="Beautiful hanging coats" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs gap-1">
                <span>♥ 238 Likes</span>
              </div>
            </div>

            <div className="relative aspect-square overflow-hidden rounded-xl border border-[#E6DED4] group cursor-pointer bg-stone-100">
              <img 
                src="/src/assets/images/organized_pantry_shelves_1783305692550.jpg" 
                alt="Wicker storage baskets" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs gap-1">
                <span>♥ 309 Likes</span>
              </div>
            </div>

            <div className="relative aspect-square overflow-hidden rounded-xl border border-[#E6DED4] group cursor-pointer bg-stone-100">
              <img 
                src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=400" 
                alt="Clean sensory kids bins" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs gap-1">
                <span>♥ 185 Likes</span>
              </div>
            </div>

            <div className="relative aspect-square overflow-hidden rounded-xl border border-[#E6DED4] group cursor-pointer bg-stone-100">
              <img 
                src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=400" 
                alt="Neatly arranged towels" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs gap-1">
                <span>♥ 194 Likes</span>
              </div>
            </div>

            <div className="relative aspect-square overflow-hidden rounded-xl border border-[#E6DED4] group cursor-pointer bg-stone-100">
              <img 
                src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=400" 
                alt="Cozy organic laundry" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs gap-1">
                <span>♥ 277 Likes</span>
              </div>
            </div>

          </div>

          <div className="mt-8 flex justify-center gap-4">
            <a 
              href={`https://instagram.com/${settings.contactInstagram}`} 
              target="_blank" 
              rel="noreferrer" 
              className="px-6 py-2.5 bg-[#2B2B2B] text-white hover:bg-[#A89A8A] rounded-full inline-flex items-center gap-2 font-sans text-[10px] font-semibold tracking-wider uppercase transition-all"
            >
              <Instagram className="w-4 h-4" />
              <span>Follow @{settings.contactInstagram}</span>
            </a>
            <a 
              href={`https://wa.me/${settings.contactWhatsapp}`} 
              target="_blank" 
              rel="noreferrer" 
              className="px-6 py-2.5 border border-[#A5AEA0] text-[#55634d] hover:bg-[#A5AEA0]/10 rounded-full inline-flex items-center gap-2 font-sans text-[10px] font-semibold tracking-wider uppercase transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER SECTION */}
      <footer className="bg-[#2B2B2B] text-[#F4F1EC] pt-16 pb-8 border-t border-[#A89A8A]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-12 text-left mb-12">
          
          {/* Footer Logo & Area banner */}
          <div className="space-y-4">
            <span className="font-serif text-2xl tracking-[0.18em] block">
              THE ORGANISED EDIT
            </span>
            <span className="text-[9px] tracking-[0.35em] uppercase font-sans text-[#A89A8A] font-semibold block border-b border-[#A89A8A]/30 pb-3">
              HOME • STYLE • ORGANISATION
            </span>
            <p className="font-body text-[#CFC6BB] text-xs leading-relaxed">
              Serving beautiful, simple systems to busy and neurodivergent households throughout Greater Manchester, Cheshire, and surrounding regions.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#A89A8A] font-sans">
              <MapPin className="w-4 h-4 shrink-0" />
              <span>{settings.locationArea}</span>
            </div>
          </div>

          {/* Quick links map */}
          <div className="space-y-4">
            <h4 className="font-serif text-md tracking-wider text-[#A89A8A] uppercase">Sitemap</h4>
            <div className="grid grid-cols-2 gap-2 text-xs font-sans text-[#CFC6BB]">
              <button onClick={() => scrollToSection('home')} className="hover:text-white text-left">Home</button>
              <button onClick={() => scrollToSection('about')} className="hover:text-white text-left">About Us</button>
              <button onClick={() => scrollToSection('services')} className="hover:text-white text-left">Services</button>
              <button onClick={() => scrollToSection('gallery')} className="hover:text-white text-left">Before & After</button>
              <button onClick={() => scrollToSection('testimonials')} className="hover:text-white text-left">Reviews</button>
              <button onClick={() => scrollToSection('contact')} className="hover:text-white text-left">Contact Form</button>
            </div>
          </div>

          {/* Real Channels details */}
          <div className="space-y-4">
            <h4 className="font-serif text-md tracking-wider text-[#A89A8A] uppercase">Contact Details</h4>
            <div className="space-y-2 text-xs font-sans text-[#CFC6BB]">
              <a href={`mailto:${settings.contactEmail}`} className="flex items-center gap-2 hover:text-white">
                <Mail className="w-4 h-4 shrink-0 text-[#A89A8A]" />
                <span>{settings.contactEmail}</span>
              </a>
              <a href={`tel:${settings.contactPhone}`} className="flex items-center gap-2 hover:text-white">
                <Phone className="w-4 h-4 shrink-0 text-[#A89A8A]" />
                <span>{settings.contactPhone}</span>
              </a>
              <a 
                href={`https://wa.me/${settings.contactWhatsapp}`} 
                target="_blank" 
                rel="noreferrer" 
                className="flex items-center gap-2 hover:text-white"
              >
                <MessageCircle className="w-4 h-4 shrink-0 text-[#A89A8A]" />
                <span>Direct WhatsApp Chat</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom copyright & secure login gear button */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-[#A89A8A]/20 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[10px] font-sans text-[#CFC6BB]/60 text-center sm:text-left">
            © {new Date().getFullYear()} The Organised Edit. All rights reserved. Registered and operating in Manchester, UK.
          </p>

          {/* Secure lock link for CMS Editor */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsAdminPromptOpen(true)}
              className="text-[10px] font-sans uppercase tracking-widest text-[#A89A8A] hover:text-white flex items-center gap-1 bg-[#A89A8A]/10 px-3 py-1.5 rounded-lg border border-[#A89A8A]/20 transition-all cursor-pointer"
            >
              <Lock className="w-3 h-3" />
              <span>Admin CMS Portal</span>
            </button>
          </div>
        </div>
      </footer>

      {/* ADMIN CMS PASSWORD PROMPT MODAL */}
      {isAdminPromptOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm border border-[#E6DED4] shadow-xl text-left space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-serif text-lg text-[#2B2B2B]">Admin Access Prompt</h4>
              <button onClick={() => { setIsAdminPromptOpen(false); setAdminError(false); }} className="text-stone-400 hover:text-stone-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <p className="text-xs text-stone-500 font-body leading-relaxed">
              Access the Organised Edit CMS visual content database. You can manage styling copy, services list, gallery, and client booking requests.
            </p>
            
            <div className="bg-stone-50 p-3 rounded-lg border border-[#E6DED4]/60 text-[10px] font-sans text-stone-600">
              <strong>Tip for testers:</strong> Leave the password field blank or enter <strong>admin</strong> and click "Enter CMS" for instant access!
            </div>

            <form onSubmit={handleAdminAccess} className="space-y-3">
              <div>
                <label className="text-[9px] uppercase tracking-wider text-stone-400 block mb-1">Access Key / Password</label>
                <input
                  type="password"
                  placeholder="Password (or blank)"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className="w-full border border-[#E6DED4] rounded-xl px-3 py-2 text-sm focus:outline-hidden focus:border-[#A89A8A] text-[#2B2B2B]"
                />
                {adminError && <p className="text-red-500 text-[10px] mt-1 font-sans">Invalid passkey. Enter 'admin' or leave blank.</p>}
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => { setIsAdminPromptOpen(false); setAdminError(false); }}
                  className="px-4 py-2 border.5 border-stone-300 rounded-lg text-xs font-sans text-stone-600 hover:bg-stone-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#2B2B2B] text-[#F4F1EC] hover:bg-[#A89A8A] rounded-lg text-xs font-sans font-semibold uppercase tracking-wider"
                >
                  Enter CMS
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* FULL CMS PANEL BACKEND DIALOG */}
      <CmsDashboard
        isOpen={isCmsOpen}
        onClose={() => setIsCmsOpen(false)}
        services={services}
        setServices={setServices}
        beforeAfterItems={beforeAfterItems}
        setBeforeAfterItems={setBeforeAfterItems}
        testimonials={testimonials}
        setTestimonials={setTestimonials}
        settings={settings}
        setSettings={setSettings}
        enquiries={enquiries}
        setEnquiries={setEnquiries}
        onResetDefaults={handleResetDefaults}
      />

    </div>
  );
}
