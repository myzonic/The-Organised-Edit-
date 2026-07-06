import React, { useState } from 'react';
import { Service, Enquiry } from '../types';
import { Send, Heart, CheckCircle } from 'lucide-react';

interface ContactFormProps {
  services: Service[];
  onAddEnquiry: (enquiry: Enquiry) => void;
}

export default function ContactForm({ services, onAddEnquiry }: ContactFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceId, setServiceId] = useState(services[0]?.id || 'calm-home-reset');
  const [neurodiverseFocused, setNeurodiverseFocused] = useState(false);
  const [details, setDetails] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) return;

    setIsSubmitting(true);

    // Simulate small, smooth network delay for premium feel
    setTimeout(() => {
      const newEnquiry: Enquiry = {
        id: `enq-${Date.now()}`,
        name,
        email,
        phone,
        serviceId,
        neurodiverseFocused,
        details,
        date: new Date().toISOString(),
        status: 'New'
      };

      onAddEnquiry(newEnquiry);
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Reset form states
      setName('');
      setEmail('');
      setPhone('');
      setServiceId(services[0]?.id || 'calm-home-reset');
      setNeurodiverseFocused(false);
      setDetails('');
    }, 1000);
  };

  return (
    <div id="contact-form-container" className="bg-[#F4F1EC] p-8 md:p-12 rounded-3xl border border-[#E6DED4] shadow-sm max-w-2xl mx-auto">
      {isSubmitted ? (
        <div className="text-center py-10 space-y-4 animate-fade-in">
          <div className="w-16 h-16 bg-[#A5AEA0]/20 rounded-full flex items-center justify-center mx-auto text-[#A5AEA0]">
            <CheckCircle className="w-10 h-10 stroke-[1.5]" />
          </div>
          <h3 className="font-serif text-3xl text-[#2B2B2B]">Thank you so much</h3>
          <p className="font-body text-[#555] text-sm max-w-md mx-auto leading-relaxed">
            We've received your enquiry. We understand how big of a step reaching out can be, especially when feeling overwhelmed. Beth or Danielle will get in touch with you personally within 24 hours for a friendly, judgement-free chat.
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="mt-4 px-6 py-2 border.5 border-[#A89A8A] text-[#A89A8A] hover:bg-white rounded-full font-sans text-xs tracking-wider uppercase font-medium transition-colors"
          >
            Submit Another Enquiry
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-center space-y-2 mb-4">
            <h3 className="font-serif text-3xl text-[#2B2B2B] tracking-tight">Let's Create A Home That Works</h3>
            <p className="font-body text-[#555] text-sm max-w-md mx-auto leading-relaxed">
              Ready to feel a little lighter? Tell us a bit about yourself, and we'll create a tailored plan to bring peaceful systems into your family life.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label htmlFor="client-name" className="text-[10px] uppercase font-sans tracking-widest text-[#A89A8A] font-semibold block">
                Your Name
              </label>
              <input
                id="client-name"
                type="text"
                required
                placeholder="Bethany Smith"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white border border-[#E6DED4] rounded-xl px-4 py-3 text-sm font-sans focus:outline-hidden focus:border-[#A89A8A] focus:ring-1 focus:ring-[#A89A8A] transition-all placeholder:text-[#555]/30 text-[#2B2B2B]"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="client-phone" className="text-[10px] uppercase font-sans tracking-widest text-[#A89A8A] font-semibold block">
                Phone Number
              </label>
              <input
                id="client-phone"
                type="tel"
                required
                placeholder="07712 345678"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-white border border-[#E6DED4] rounded-xl px-4 py-3 text-sm font-sans focus:outline-hidden focus:border-[#A89A8A] focus:ring-1 focus:ring-[#A89A8A] transition-all placeholder:text-[#555]/30 text-[#2B2B2B]"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label htmlFor="client-email" className="text-[10px] uppercase font-sans tracking-widest text-[#A89A8A] font-semibold block">
              Email Address
            </label>
            <input
              id="client-email"
              type="email"
              required
              placeholder="hello@ourfamily.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white border border-[#E6DED4] rounded-xl px-4 py-3 text-sm font-sans focus:outline-hidden focus:border-[#A89A8A] focus:ring-1 focus:ring-[#A89A8A] transition-all placeholder:text-[#555]/30 text-[#2B2B2B]"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="preferred-service" className="text-[10px] uppercase font-sans tracking-widest text-[#A89A8A] font-semibold block">
              Which service are you interested in?
            </label>
            <select
              id="preferred-service"
              value={serviceId}
              onChange={(e) => setServiceId(e.target.value)}
              className="w-full bg-white border border-[#E6DED4] rounded-xl px-4 py-3 text-sm font-sans focus:outline-hidden focus:border-[#A89A8A] transition-all text-[#2B2B2B]"
            >
              {services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.name} {service.price > 0 ? `(£${service.price})` : '(Free)'}
                </option>
              ))}
            </select>
          </div>

          {/* Special Neurodiversity Friendly Checkbox Block */}
          <div className="bg-white/65 border border-[#E6DED4] rounded-2xl p-5 space-y-3">
            <label className="flex items-start gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={neurodiverseFocused}
                onChange={(e) => setNeurodiverseFocused(e.target.checked)}
                className="mt-1 accent-[#A5AEA0] h-4 w-4 border-[#E6DED4] rounded-sm"
              />
              <div className="space-y-0.5">
                <span className="font-sans font-bold text-xs uppercase tracking-wider text-[#2B2B2B] flex items-center gap-1.5">
                  <Heart className="w-4 h-4 text-[#A5AEA0] fill-current" />
                  Request Neurodivergent & Family accommodations
                </span>
                <span className="block font-body text-xs text-[#555] leading-relaxed">
                  Tick this box if your household supports ADHD, autism, or other cognitive styles. We will apply customized systems (e.g. clear low-sensory storage, executive function helpers, quiet/gentle appointments, or special photo labeling).
                </span>
              </div>
            </label>
            
            {neurodiverseFocused && (
              <div className="pl-7 animate-fade-in space-y-1.5">
                <span className="text-[10px] uppercase font-sans tracking-wider text-[#A89A8A] font-medium block">
                  Accommodation details or preferences (Optional)
                </span>
                <p className="text-[11px] font-sans text-stone-500 italic">
                  Let us know what labeling styles (e.g. photo vs text), visibility preferences (e.g. translucent containers to aid recall), or session pacing you find helpful.
                </p>
              </div>
            )}
          </div>

          <div className="space-y-1">
            <label htmlFor="enquiry-notes" className="text-[10px] uppercase font-sans tracking-widest text-[#A89A8A] font-semibold block">
              Tell us about your spaces and household
            </label>
            <textarea
              id="enquiry-notes"
              rows={4}
              placeholder="e.g. Our kitchen pantry has become a bottleneck for mornings, or we are moving to Altrincham and need pre-pack sorting..."
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="w-full bg-white border border-[#E6DED4] rounded-xl px-4 py-3 text-sm font-body focus:outline-hidden focus:border-[#A89A8A] focus:ring-1 focus:ring-[#A89A8A] transition-all placeholder:text-[#555]/30 text-[#2B2B2B] leading-relaxed"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-4 bg-[#2B2B2B] text-[#F4F1EC] hover:bg-[#A89A8A] transition-all rounded-full font-sans text-xs tracking-widest uppercase font-semibold flex items-center justify-center gap-2 shadow-xs cursor-pointer ${
              isSubmitting ? 'opacity-85 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                <span>Request Discovery Consultation</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
