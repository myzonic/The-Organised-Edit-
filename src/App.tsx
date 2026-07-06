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
  Smile,
  Home,
  Shirt,
  Clipboard,
  Package,
  RefreshCw,
  Compass,
  Minimize2,
  Flame,
  Clock,
  Wind,
  Eye,
  ShieldCheck,
  FileText,
  CheckCircle,
  Leaf,
  Trash2,
  Camera
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

export default function App() {
  // State Management - Hydrated from localStorage
  const [services, setServices] = useState<Service[]>([]);
  const [beforeAfterItems, setBeforeAfterItems] = useState<BeforeAfterItem[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [settings, setSettings] = useState<SiteSettings>(initialSettings);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
      <section id="home" className="relative bg-white pt-10 pb-20 md:py-24 border-b border-[#E6DED4]/60 overflow-hidden">
        {/* Mobile Background Image & Elegant High-Contrast Semi-Transparent Overlay */}
        <div className="absolute inset-0 lg:hidden pointer-events-none z-0">
          <img 
            src="/src/assets/images/organized_closet_hero_1783305649580.jpg" 
            alt="Organised Home Background" 
            className="w-full h-full object-cover opacity-90 filter sepia-[0.05] brightness-[1.02]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-[#F4F1EC]/80 backdrop-blur-xs" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
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

      {/* 01. WELCOME & OUR VISION SHOWCASE */}
      <section className="bg-[#F7F6F2] py-16 md:py-24 border-b border-[#E6DED4]/60 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          
          {/* Welcome Slide 02 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 text-left space-y-6 lg:pr-8">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E6DED4]/40 border border-[#E6DED4]/60 text-[#A89A8A] font-sans text-[10px] font-bold uppercase tracking-widest">
                <span>01 / Introduction</span>
              </div>
              <h2 className="font-serif text-3.5xl text-[#2B2B2B] leading-tight tracking-tight uppercase">
                Welcome
              </h2>
              <div className="h-0.5 w-12 bg-[#A3B29A]" />
              <p className="font-body text-[#555] text-sm leading-relaxed">
                This creative direction deck captures the look, feel and experience we are creating for The Organised Edit.
              </p>
              <p className="font-body text-[#555] text-sm leading-relaxed">
                A reference for everything we design, build and share.
              </p>
              <div className="pt-4 flex justify-start">
                <Heart className="w-5 h-5 text-[#A89A8A]/60 stroke-1" />
              </div>
            </div>
            <div className="lg:col-span-7 relative">
              <div className="absolute -inset-2 bg-[#E6DED4]/40 rounded-2xl rotate-1 pointer-events-none" />
              <div className="relative rounded-xl overflow-hidden aspect-[3/4] max-w-sm mx-auto border border-[#E6DED4] shadow-xs">
                <img 
                  src="/src/assets/images/welcome_shelves_1783307210267.jpg" 
                  alt="Elegant arched shelving unit neatly styled with glass jars and woven storage baskets" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute bottom-4 right-4 bg-white/95 text-[10px] font-mono px-2.5 py-1 rounded border border-[#E6DED4]/60 text-[#2B2B2B] font-bold">02</span>
              </div>
            </div>
          </div>

          {/* Our Vision Slide 03 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-8">
            <div className="lg:col-span-7 relative order-2 lg:order-1">
              <div className="absolute -inset-2 bg-[#E6DED4]/40 rounded-2xl -rotate-1 pointer-events-none" />
              <div className="relative rounded-xl overflow-hidden aspect-[3/4] max-w-sm mx-auto border border-[#E6DED4] shadow-xs">
                <img 
                  src="/src/assets/images/vision_kitchen_1783307229646.jpg" 
                  alt="Modern minimalist kitchen counter styled with amber jars and fresh eucalyptus in a vase" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute bottom-4 right-4 bg-white/95 text-[10px] font-mono px-2.5 py-1 rounded border border-[#E6DED4]/60 text-[#2B2B2B] font-bold">03</span>
              </div>
            </div>
            <div className="lg:col-span-5 text-left space-y-6 lg:pl-8 order-1 lg:order-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E6DED4]/40 border border-[#E6DED4]/60 text-[#A89A8A] font-sans text-[10px] font-bold uppercase tracking-widest">
                <span>02 / Purpose</span>
              </div>
              <h2 className="font-serif text-3.5xl text-[#2B2B2B] leading-tight tracking-tight uppercase">
                Our Vision
              </h2>
              <div className="h-0.5 w-12 bg-[#A3B29A]" />
              <p className="font-body text-[#555] text-sm leading-relaxed">
                To create calm, organised homes that are beautiful, practical and easy to maintain.
              </p>
              <p className="font-body text-[#555] text-sm leading-relaxed">
                We help busy families feel less overwhelmed and more in control through thoughtful organisation that works for real life.
              </p>
              <div className="pt-4 flex justify-start">
                <Heart className="w-5 h-5 text-[#A89A8A]/60 stroke-1" />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* MEET BETH & DANIELLE SECTION (Slide 04) */}
      <section id="about" className="bg-white py-16 md:py-24 border-b border-[#E6DED4]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Photos Frame */}
            <div className="lg:col-span-6 relative">
              <div className="absolute -inset-3 bg-[#A89A8A]/10 rounded-3xl rotate-1 pointer-events-none" />
              <div className="relative rounded-2xl overflow-hidden aspect-4/3 border border-[#E6DED4] shadow-sm max-w-lg mx-auto">
                <img 
                  src="/src/assets/images/beth_danielle_founders_1783305671597.jpg" 
                  alt="Beth and Danielle, founders and designers of The Organised Edit" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute bottom-4 right-4 bg-white/95 text-[10px] font-mono px-2.5 py-1 rounded border border-[#E6DED4]/60 text-[#2B2B2B] font-bold">04</span>
              </div>
            </div>

            {/* Biography and Story details */}
            <div className="lg:col-span-6 text-left space-y-6 lg:pl-8">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E6DED4]/40 border border-[#E6DED4]/60 text-[#A89A8A] font-sans text-[10px] font-bold uppercase tracking-widest">
                <span>03 / Meet The Founders</span>
              </div>
              <h2 className="font-serif text-3.5xl text-[#2B2B2B] tracking-tight uppercase">
                {settings.aboutTitle}
              </h2>
              <div className="h-0.5 w-12 bg-[#A3B29A]" />
              
              <p className="font-body text-[#555] text-sm leading-relaxed">
                {settings.aboutText1}
              </p>

              <p className="font-body text-[#555] text-sm leading-relaxed">
                {settings.aboutText2}
              </p>

              <div className="bg-[#F7F6F2] p-5 rounded-xl border border-[#E6DED4] italic font-serif text-[#A89A8A] text-sm relative pl-10">
                <span className="absolute top-3 left-4 text-3xl font-serif leading-none text-[#A89A8A]/30">“</span>
                <p className="leading-relaxed">
                  Two stylists. Two mums. One mission. With 20+ years in fashion, style and brand between us, we created The Organised Edit to help families love their homes for real and make space for what matters. ♡
                </p>
              </div>

              {/* Micro value badges */}
              <div className="grid grid-cols-2 gap-4 text-xs font-sans text-[#2B2B2B] font-medium pt-2">
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
        </div>
      </section>

      {/* 02. OUR VALUES SECTION */}
      <section className="bg-white py-16 md:py-24 border-b border-[#E6DED4]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: Values List */}
            <div className="lg:col-span-6 text-left space-y-8">
              <div className="space-y-3">
                <span className="font-sans text-xs tracking-[0.25em] uppercase text-[#A89A8A] font-bold block">03 / Core Beliefs</span>
                <h2 className="font-serif text-3.5xl text-[#2B2B2B] tracking-tight uppercase">
                  Our Values
                </h2>
                <div className="h-0.5 w-16 bg-[#A3B29A]" />
              </div>

              <div className="space-y-6">
                
                {/* CALM */}
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-[#F4F1EC] border border-[#E6DED4] flex items-center justify-center text-[#A3B29A] shrink-0">
                    <Smile className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-serif text-md text-[#2B2B2B] font-semibold tracking-wide uppercase">Calm</h4>
                    <p className="font-body text-[#555] text-sm">We create peaceful homes and minds</p>
                  </div>
                </div>

                {/* THOUGHTFUL */}
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-[#F4F1EC] border border-[#E6DED4] flex items-center justify-center text-[#A3B29A] shrink-0">
                    <Check className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-serif text-md text-[#2B2B2B] font-semibold tracking-wide uppercase">Thoughtful</h4>
                    <p className="font-body text-[#555] text-sm">We work through every detail</p>
                  </div>
                </div>

                {/* HONEST */}
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-[#F4F1EC] border border-[#E6DED4] flex items-center justify-center text-[#A3B29A] shrink-0">
                    <HelpCircle className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-serif text-md text-[#2B2B2B] font-semibold tracking-wide uppercase">Honest</h4>
                    <p className="font-body text-[#555] text-sm">We keep it real and transparent</p>
                  </div>
                </div>

                {/* KIND */}
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-[#F4F1EC] border border-[#E6DED4] flex items-center justify-center text-[#A3B29A] shrink-0">
                    <Heart className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-serif text-md text-[#2B2B2B] font-semibold tracking-wide uppercase">Kind</h4>
                    <p className="font-body text-[#555] text-sm">We work with empathy and understanding</p>
                  </div>
                </div>

                {/* SUSTAINABLE */}
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-[#F4F1EC] border border-[#E6DED4] flex items-center justify-center text-[#A3B29A] shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-serif text-md text-[#2B2B2B] font-semibold tracking-wide uppercase">Sustainable</h4>
                    <p className="font-body text-[#555] text-sm">We choose better for the planet</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Right: Elegant Vase Image */}
            <div className="lg:col-span-6 relative">
              <div className="absolute -inset-3 bg-[#E6DED4]/30 rounded-3xl rotate-1 pointer-events-none" />
              <div className="relative rounded-2xl overflow-hidden aspect-[3/4] max-w-sm mx-auto border border-[#E6DED4] shadow-sm">
                <img 
                  src="/src/assets/images/values_vase_1783307251210.jpg" 
                  alt="Elegant tall beige ceramic vase filled with delicate branches resting on a rustic table" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute bottom-4 right-4 bg-white/95 text-[10px] font-mono px-2.5 py-1 rounded border border-[#E6DED4]/60 text-[#2B2B2B] font-bold">05</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 03. WHY WE'RE DIFFERENT SECTION */}
      <section className="bg-[#F7F6F2]/60 py-16 md:py-24 border-b border-[#E6DED4]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column Checklist */}
            <div className="lg:col-span-6 text-left space-y-8">
              <div className="space-y-3">
                <span className="font-sans text-xs tracking-[0.25em] uppercase text-[#A89A8A] font-bold block">04 / Our Signature Approach</span>
                <h2 className="font-serif text-3.5xl text-[#2B2B2B] tracking-tight uppercase">
                  Why We're Different
                </h2>
                <div className="h-0.5 w-16 bg-[#A3B29A]" />
              </div>

              <div className="space-y-5">
                {[
                  "Styling expertise meets home organisation",
                  "Neurodiverse & family friendly approach",
                  "Bespoke systems that actually work",
                  "Non-judgemental, supportive & kind",
                  "We create beautiful and functional homes"
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 items-center">
                    <div className="w-6 h-6 rounded-md bg-[#A3B29A]/15 text-[#55634d] flex items-center justify-center shrink-0 border border-[#A3B29A]/20">
                      <Check className="w-4 h-4 stroke-[2.5]" />
                    </div>
                    <span className="font-sans text-stone-700 text-sm font-medium tracking-wide">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column Image */}
            <div className="lg:col-span-6 relative">
              <div className="absolute -inset-3 bg-[#E6DED4]/40 rounded-3xl -rotate-1 pointer-events-none" />
              <div className="relative rounded-2xl overflow-hidden aspect-[3/4] max-w-sm mx-auto border border-[#E6DED4] shadow-sm">
                <img 
                  src="/src/assets/images/organized_closet_hero_1783305649580.jpg" 
                  alt="Beautifully organized walk-in wardrobe with neatly folded clothes and storage boxes" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute bottom-4 right-4 bg-white/95 text-[10px] font-mono px-2.5 py-1 rounded border border-[#E6DED4]/60 text-[#2B2B2B] font-bold">06</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="bg-[#F4F1EC]/40 py-16 md:py-24 border-b border-[#E6DED4]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Slide 07 Style Services Overview Grid */}
          <div className="mb-20 text-center space-y-12">
            <div className="space-y-4 max-w-3xl mx-auto">
              <span className="font-sans text-xs tracking-[0.25em] uppercase text-[#A89A8A] font-bold block">05 / Studio Offerings</span>
              <h2 className="font-serif text-3.5xl text-[#2B2B2B] tracking-tight uppercase">
                Our Services
              </h2>
              <div className="h-0.5 w-16 bg-[#A3B29A] mx-auto" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                { name: "Home Organisation", icon: Home },
                { name: "Wardrobe Editing", icon: Shirt },
                { name: "Kitchen Organisation", icon: Clipboard },
                { name: "Styling & Finishing Touches", icon: Sparkles },
                { name: "Moving Home Support", icon: Package },
                { name: "Declutter & Reset", icon: RefreshCw }
              ].map((serv, index) => {
                const IconComp = serv.icon;
                return (
                  <div key={index} className="bg-white rounded-2xl border border-[#E6DED4]/60 p-6 flex flex-col items-center text-center space-y-4 shadow-2xs hover:border-[#A89A8A]/40 transition-all">
                    <div className="w-12 h-12 rounded-full border border-[#A89A8A]/30 flex items-center justify-center text-[#A89A8A]">
                      <IconComp className="w-5 h-5 stroke-1" />
                    </div>
                    <span className="font-serif text-xs sm:text-sm text-[#2B2B2B] font-semibold tracking-wide uppercase max-w-[150px]">
                      {serv.name}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="max-w-2xl mx-auto bg-white/60 p-5 rounded-xl border border-[#E6DED4]/60 text-center font-serif text-[#A89A8A] text-sm italic">
              "Bespoke solutions for every home, every family, every stage."
            </div>
          </div>

          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="font-sans text-xs tracking-[0.25em] uppercase text-[#A89A8A] font-bold block">Investment & Packages</span>
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

        {/* Bottom copyright */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-[#A89A8A]/20 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[10px] font-sans text-[#CFC6BB]/60 text-center sm:text-left">
            © {new Date().getFullYear()} The Organised Edit. All rights reserved. Registered and operating in Manchester, UK.
          </p>
        </div>
      </footer>

    </div>
  );
}
