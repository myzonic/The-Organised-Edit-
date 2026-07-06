import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  Inbox, 
  Briefcase, 
  Image as ImageIcon, 
  MessageSquare, 
  Plus, 
  Trash2, 
  Check, 
  RotateCcw, 
  X, 
  User, 
  Mail, 
  Phone, 
  Calendar,
  AlertCircle,
  Eye,
  Heart
} from 'lucide-react';
import { Service, BeforeAfterItem, Testimonial, SiteSettings, Enquiry } from '../types';

interface CmsDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  services: Service[];
  setServices: React.Dispatch<React.SetStateAction<Service[]>>;
  beforeAfterItems: BeforeAfterItem[];
  setBeforeAfterItems: React.Dispatch<React.SetStateAction<BeforeAfterItem[]>>;
  testimonials: Testimonial[];
  setTestimonials: React.Dispatch<React.SetStateAction<Testimonial[]>>;
  settings: SiteSettings;
  setSettings: React.Dispatch<React.SetStateAction<SiteSettings>>;
  enquiries: Enquiry[];
  setEnquiries: React.Dispatch<React.SetStateAction<Enquiry[]>>;
  onResetDefaults: () => void;
}

type TabType = 'enquiries' | 'settings' | 'services' | 'gallery' | 'testimonials';

export default function CmsDashboard({
  isOpen,
  onClose,
  services,
  setServices,
  beforeAfterItems,
  setBeforeAfterItems,
  testimonials,
  setTestimonials,
  settings,
  setSettings,
  enquiries,
  setEnquiries,
  onResetDefaults
}: CmsDashboardProps) {
  const [activeTab, setActiveTab] = useState<TabType>('enquiries');
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);

  // Form states for creating new items
  const [newService, setNewService] = useState<Partial<Service>>({
    name: '',
    category: 'half-day',
    duration: '',
    price: 0,
    description: '',
    priceSuffix: ''
  });

  const [newTestimonial, setNewTestimonial] = useState<Partial<Testimonial>>({
    author: '',
    location: '',
    rating: 5,
    text: '',
    tag: ''
  });

  const [newGalleryItem, setNewGalleryItem] = useState<Partial<BeforeAfterItem>>({
    title: '',
    spaceType: '',
    description: '',
    beforeImage: 'https://images.unsplash.com/photo-1595341595378-fc7fa2d3bbfe?auto=format&fit=crop&q=80&w=800',
    afterImage: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=800'
  });

  if (!isOpen) return null;

  const triggerNotification = (message: string) => {
    setSaveSuccess(message);
    setTimeout(() => {
      setSaveSuccess(null);
    }, 3000);
  };

  // Status updates for Enquiries
  const updateEnquiryStatus = (id: string, newStatus: 'New' | 'Contacted' | 'Booked') => {
    const updated = enquiries.map(enq => 
      enq.id === id ? { ...enq, status: newStatus } : enq
    );
    setEnquiries(updated);
    localStorage.setItem('toe_enquiries', JSON.stringify(updated));
    triggerNotification('Enquiry status updated successfully.');
  };

  const deleteEnquiry = (id: string) => {
    if (window.confirm('Are you sure you want to delete this enquiry?')) {
      const filtered = enquiries.filter(enq => enq.id !== id);
      setEnquiries(filtered);
      localStorage.setItem('toe_enquiries', JSON.stringify(filtered));
      triggerNotification('Enquiry deleted.');
    }
  };

  // General site settings save
  const handleSettingChange = (field: keyof SiteSettings, value: string) => {
    const updatedSettings = { ...settings, [field]: value };
    setSettings(updatedSettings);
    localStorage.setItem('toe_settings', JSON.stringify(updatedSettings));
  };

  // Add a new service
  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newService.name || !newService.duration) return;

    const created: Service = {
      id: `service-${Date.now()}`,
      name: newService.name,
      category: newService.category as any,
      duration: newService.duration,
      price: Number(newService.price) || 0,
      description: newService.description || '',
      priceSuffix: newService.priceSuffix || undefined
    };

    const updated = [...services, created];
    setServices(updated);
    localStorage.setItem('toe_services', JSON.stringify(updated));

    // Reset Form
    setNewService({
      name: '',
      category: 'half-day',
      duration: '',
      price: 0,
      description: '',
      priceSuffix: ''
    });
    triggerNotification('New service package added.');
  };

  const deleteService = (id: string) => {
    if (window.confirm('Are you sure you want to delete this service package?')) {
      const filtered = services.filter(s => s.id !== id);
      setServices(filtered);
      localStorage.setItem('toe_services', JSON.stringify(filtered));
      triggerNotification('Service package removed.');
    }
  };

  // Add testimonial
  const handleAddTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTestimonial.author || !newTestimonial.text) return;

    const created: Testimonial = {
      id: `testi-${Date.now()}`,
      author: newTestimonial.author,
      location: newTestimonial.location || 'Manchester',
      rating: Number(newTestimonial.rating) || 5,
      text: newTestimonial.text,
      tag: newTestimonial.tag || undefined
    };

    const updated = [...testimonials, created];
    setTestimonials(updated);
    localStorage.setItem('toe_testimonials', JSON.stringify(updated));

    setNewTestimonial({
      author: '',
      location: '',
      rating: 5,
      text: '',
      tag: ''
    });
    triggerNotification('Client testimonial published.');
  };

  const deleteTestimonial = (id: string) => {
    const filtered = testimonials.filter(t => t.id !== id);
    setTestimonials(filtered);
    localStorage.setItem('toe_testimonials', JSON.stringify(filtered));
    triggerNotification('Testimonial removed.');
  };

  // Add Gallery Item
  const handleAddGalleryItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGalleryItem.title || !newGalleryItem.spaceType) return;

    const created: BeforeAfterItem = {
      id: `gal-${Date.now()}`,
      title: newGalleryItem.title,
      spaceType: newGalleryItem.spaceType,
      description: newGalleryItem.description || '',
      beforeImage: newGalleryItem.beforeImage || '',
      afterImage: newGalleryItem.afterImage || ''
    };

    const updated = [...beforeAfterItems, created];
    setBeforeAfterItems(updated);
    localStorage.setItem('toe_before_after', JSON.stringify(updated));

    setNewGalleryItem({
      title: '',
      spaceType: '',
      description: '',
      beforeImage: 'https://images.unsplash.com/photo-1595341595378-fc7fa2d3bbfe?auto=format&fit=crop&q=80&w=800',
      afterImage: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=800'
    });
    triggerNotification('Before/after gallery item created.');
  };

  const deleteGalleryItem = (id: string) => {
    const filtered = beforeAfterItems.filter(item => item.id !== id);
    setBeforeAfterItems(filtered);
    localStorage.setItem('toe_before_after', JSON.stringify(filtered));
    triggerNotification('Gallery item removed.');
  };

  const handleGlobalReset = () => {
    if (window.confirm('This will restore all default copy, pricing, services, and clear all custom entries. Continue?')) {
      onResetDefaults();
      triggerNotification('All content restored to factory default.');
    }
  };

  return (
    <div className="fixed inset-0 bg-[#2B2B2B]/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-6xl h-[90vh] flex flex-col overflow-hidden shadow-2xl border border-[#E6DED4]">
        
        {/* Top Header */}
        <div className="bg-[#2B2B2B] text-[#F4F1EC] p-6 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#A89A8A] rounded-lg text-white">
              <SettingsIcon className="w-5 h-5 animate-spin-slow" />
            </div>
            <div>
              <h2 className="font-serif text-xl tracking-wide uppercase">The Organised Edit CMS</h2>
              <p className="text-xs text-[#CFC6BB] font-sans tracking-widest uppercase">Content Management & Booking CRM</p>
            </div>
          </div>
          
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors text-[#CFC6BB] hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Inner Layout with Sidebar and Main Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* CMS Sidebar Navigation */}
          <div className="w-64 bg-[#F4F1EC] border-r border-[#E6DED4] p-4 flex flex-col justify-between shrink-0">
            <nav className="space-y-1">
              <button
                onClick={() => setActiveTab('enquiries')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-sans text-sm font-medium transition-all ${
                  activeTab === 'enquiries' 
                    ? 'bg-[#A89A8A] text-white shadow-xs' 
                    : 'text-[#2B2B2B] hover:bg-[#E6DED4]'
                }`}
              >
                <Inbox className="w-4 h-4" />
                <span>Enquiries</span>
                {enquiries.filter(e => e.status === 'New').length > 0 && (
                  <span className="ml-auto bg-[#A5AEA0] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {enquiries.filter(e => e.status === 'New').length}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-sans text-sm font-medium transition-all ${
                  activeTab === 'settings' 
                    ? 'bg-[#A89A8A] text-white shadow-xs' 
                    : 'text-[#2B2B2B] hover:bg-[#E6DED4]'
                }`}
              >
                <SettingsIcon className="w-4 h-4" />
                <span>Text & Contact info</span>
              </button>

              <button
                onClick={() => setActiveTab('services')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-sans text-sm font-medium transition-all ${
                  activeTab === 'services' 
                    ? 'bg-[#A89A8A] text-white shadow-xs' 
                    : 'text-[#2B2B2B] hover:bg-[#E6DED4]'
                }`}
              >
                <Briefcase className="w-4 h-4" />
                <span>Service Packages</span>
              </button>

              <button
                onClick={() => setActiveTab('gallery')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-sans text-sm font-medium transition-all ${
                  activeTab === 'gallery' 
                    ? 'bg-[#A89A8A] text-white shadow-xs' 
                    : 'text-[#2B2B2B] hover:bg-[#E6DED4]'
                }`}
              >
                <ImageIcon className="w-4 h-4" />
                <span>Before / After Slider</span>
              </button>

              <button
                onClick={() => setActiveTab('testimonials')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-sans text-sm font-medium transition-all ${
                  activeTab === 'testimonials' 
                    ? 'bg-[#A89A8A] text-white shadow-xs' 
                    : 'text-[#2B2B2B] hover:bg-[#E6DED4]'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span>Client Reviews</span>
              </button>
            </nav>

            <div className="pt-4 border-t border-[#E6DED4] space-y-2">
              <button
                onClick={handleGlobalReset}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 border.5 border-[#A89A8A]/40 hover:border-[#A89A8A] text-[#A89A8A] hover:bg-white rounded-xl font-sans text-xs font-medium transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset to Defaults</span>
              </button>
              <p className="text-[10px] font-sans text-center text-[#555]/60">
                All changes instantly persist in the web browser's LocalStorage engine.
              </p>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 overflow-y-auto p-8 relative">
            
            {/* Action Success Banner */}
            {saveSuccess && (
              <div className="absolute top-4 left-8 right-8 bg-[#A5AEA0] text-white p-3 rounded-xl flex items-center gap-2 text-sm shadow-md animate-fade-in z-20">
                <Check className="w-4 h-4" />
                <span>{saveSuccess}</span>
              </div>
            )}

            {/* ENQUIRIES TAB */}
            {activeTab === 'enquiries' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-serif text-[#2B2B2B]">Booking Enquiries</h3>
                    <p className="text-xs text-[#555] font-sans">Manage customer consultation forms and family requests.</p>
                  </div>
                </div>

                {enquiries.length === 0 ? (
                  <div className="text-center py-16 border border-dashed border-[#E6DED4] rounded-2xl bg-[#F4F1EC]/30">
                    <AlertCircle className="w-12 h-12 text-[#A89A8A]/50 mx-auto mb-3" />
                    <h4 className="font-serif text-lg text-[#2B2B2B]">No Enquiries Found</h4>
                    <p className="text-sm text-[#555]/80 font-body max-w-sm mx-auto mt-1">When families fill in the contact form, their requests will appear here instantly!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {enquiries.map((enq) => {
                      const matchedService = services.find(s => s.id === enq.serviceId);
                      return (
                        <div 
                          key={enq.id}
                          className="border border-[#E6DED4] rounded-2xl p-6 hover:shadow-xs transition-shadow bg-white flex flex-col md:flex-row gap-6 justify-between items-start md:items-stretch"
                        >
                          <div className="space-y-3 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="font-serif text-lg text-[#2B2B2B] font-medium">{enq.name}</span>
                              <span className={`text-[10px] font-sans uppercase tracking-widest px-2.5 py-0.5 rounded-full ${
                                enq.status === 'New' 
                                  ? 'bg-amber-100 text-amber-800 border border-amber-200' 
                                  : enq.status === 'Contacted' 
                                  ? 'bg-blue-100 text-blue-800 border border-blue-200' 
                                  : 'bg-green-100 text-green-800 border border-green-200'
                              }`}>
                                {enq.status}
                              </span>
                              {enq.neurodiverseFocused && (
                                <span className="bg-[#A5AEA0]/15 text-[#6c7866] border border-[#A5AEA0]/40 text-[10px] font-sans uppercase tracking-widest px-2.5 py-0.5 rounded-full flex items-center gap-1 font-semibold">
                                  <Heart className="w-3 h-3 fill-current" />
                                  Neurodivergent Support
                                </span>
                              )}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-xs font-sans text-[#555]">
                              <div className="flex items-center gap-1.5">
                                <Mail className="w-3.5 h-3.5 text-[#A89A8A]" />
                                <span>{enq.email}</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <Phone className="w-3.5 h-3.5 text-[#A89A8A]" />
                                <span>{enq.phone}</span>
                              </div>
                              <div className="flex items-center gap-1.5 col-span-2">
                                <Briefcase className="w-3.5 h-3.5 text-[#A89A8A]" />
                                <span>Interest: <strong className="text-[#2B2B2B]">{matchedService ? matchedService.name : enq.customService || 'General Inquiry'}</strong></span>
                              </div>
                              <div className="flex items-center gap-1.5 col-span-2">
                                <Calendar className="w-3.5 h-3.5 text-[#A89A8A]" />
                                <span>Submitted: {new Date(enq.date).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                              </div>
                            </div>

                            <div className="bg-[#F4F1EC] p-3 rounded-xl border border-[#E6DED4]/60 text-xs font-body text-[#2B2B2B] leading-relaxed">
                              <span className="font-sans font-medium uppercase tracking-wider text-[10px] text-[#A89A8A] block mb-1">Enquiry Notes:</span>
                              {enq.details || 'No additional notes provided.'}
                            </div>
                          </div>

                          {/* Quick Actions Panel */}
                          <div className="flex md:flex-col justify-end gap-2 md:w-40 border-t md:border-t-0 md:border-l border-[#E6DED4] pt-4 md:pt-0 md:pl-4 self-stretch justify-center">
                            <span className="hidden md:block text-[10px] uppercase font-sans tracking-widest text-[#A89A8A] text-center mb-1">Actions</span>
                            
                            {enq.status !== 'Contacted' && (
                              <button
                                onClick={() => updateEnquiryStatus(enq.id, 'Contacted')}
                                className="px-3 py-1.5 bg-[#E6DED4] text-[#2B2B2B] hover:bg-[#A89A8A] hover:text-white rounded-lg text-xs font-sans font-medium transition-all"
                              >
                                Mark Contacted
                              </button>
                            )}
                            {enq.status !== 'Booked' && (
                              <button
                                onClick={() => updateEnquiryStatus(enq.id, 'Booked')}
                                className="px-3 py-1.5 bg-[#A5AEA0]/20 text-[#6c7866] hover:bg-[#A5AEA0] hover:text-white rounded-lg text-xs font-sans font-medium transition-all"
                              >
                                Mark Booked
                              </button>
                            )}
                            <button
                              onClick={() => deleteEnquiry(enq.id)}
                              className="px-3 py-1.5 border border-red-200 text-red-600 hover:bg-red-50 rounded-lg text-xs font-sans font-medium transition-all flex items-center justify-center gap-1"
                            >
                              <Trash2 className="w-3 h-3" />
                              <span>Delete</span>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* SETTINGS TAB */}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-serif text-[#2B2B2B]">Website Copy & Brand Settings</h3>
                  <p className="text-xs text-[#555] font-sans">Modify copy text, contact channels, and geographical service banners.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Hero Settings */}
                  <div className="space-y-4 border border-[#E6DED4] rounded-2xl p-6 bg-white">
                    <h4 className="font-serif text-md text-[#2B2B2B] border-b border-[#E6DED4] pb-2 font-medium">Hero Section</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="text-[10px] uppercase font-sans tracking-wider text-[#A89A8A] font-medium block mb-1">Company Name</label>
                        <input 
                          type="text" 
                          value={settings.heroTitle}
                          onChange={(e) => handleSettingChange('heroTitle', e.target.value)}
                          className="w-full border border-[#E6DED4] rounded-xl px-3 py-2 text-sm font-sans focus:outline-hidden focus:border-[#A89A8A]"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase font-sans tracking-wider text-[#A89A8A] font-medium block mb-1">Subheadings (Letterspaced)</label>
                        <input 
                          type="text" 
                          value={settings.heroSubtitle}
                          onChange={(e) => handleSettingChange('heroSubtitle', e.target.value)}
                          className="w-full border border-[#E6DED4] rounded-xl px-3 py-2 text-sm font-sans focus:outline-hidden focus:border-[#A89A8A]"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase font-sans tracking-wider text-[#A89A8A] font-medium block mb-1">Hero Description</label>
                        <textarea 
                          rows={4}
                          value={settings.heroDescription}
                          onChange={(e) => handleSettingChange('heroDescription', e.target.value)}
                          className="w-full border border-[#E6DED4] rounded-xl px-3 py-2 text-sm font-body focus:outline-hidden focus:border-[#A89A8A] leading-relaxed"
                        />
                      </div>
                    </div>
                  </div>

                  {/* About Section */}
                  <div className="space-y-4 border border-[#E6DED4] rounded-2xl p-6 bg-white">
                    <h4 className="font-serif text-md text-[#2B2B2B] border-b border-[#E6DED4] pb-2 font-medium">About Founders (Beth & Danielle)</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="text-[10px] uppercase font-sans tracking-wider text-[#A89A8A] font-medium block mb-1">About Section Title</label>
                        <input 
                          type="text" 
                          value={settings.aboutTitle}
                          onChange={(e) => handleSettingChange('aboutTitle', e.target.value)}
                          className="w-full border border-[#E6DED4] rounded-xl px-3 py-2 text-sm font-sans focus:outline-hidden focus:border-[#A89A8A]"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase font-sans tracking-wider text-[#A89A8A] font-medium block mb-1">First Biography Paragraph</label>
                        <textarea 
                          rows={3}
                          value={settings.aboutText1}
                          onChange={(e) => handleSettingChange('aboutText1', e.target.value)}
                          className="w-full border border-[#E6DED4] rounded-xl px-3 py-2 text-sm font-body focus:outline-hidden focus:border-[#A89A8A] leading-relaxed"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase font-sans tracking-wider text-[#A89A8A] font-medium block mb-1">Second Biography Paragraph</label>
                        <textarea 
                          rows={3}
                          value={settings.aboutText2}
                          onChange={(e) => handleSettingChange('aboutText2', e.target.value)}
                          className="w-full border border-[#E6DED4] rounded-xl px-3 py-2 text-sm font-body focus:outline-hidden focus:border-[#A89A8A] leading-relaxed"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase font-sans tracking-wider text-[#A89A8A] font-medium block mb-1">Inspiring Signature Quote</label>
                        <input 
                          type="text" 
                          value={settings.aboutQuote}
                          onChange={(e) => handleSettingChange('aboutQuote', e.target.value)}
                          className="w-full border border-[#E6DED4] rounded-xl px-3 py-2 text-sm font-body italic focus:outline-hidden focus:border-[#A89A8A]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Contact details */}
                  <div className="space-y-4 border border-[#E6DED4] rounded-2xl p-6 bg-white md:col-span-2">
                    <h4 className="font-serif text-md text-[#2B2B2B] border-b border-[#E6DED4] pb-2 font-medium">Business Location & Social Channels</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      <div>
                        <label className="text-[10px] uppercase font-sans tracking-wider text-[#A89A8A] font-medium block mb-1">Service Region Banner</label>
                        <input 
                          type="text" 
                          value={settings.locationArea}
                          onChange={(e) => handleSettingChange('locationArea', e.target.value)}
                          className="w-full border border-[#E6DED4] rounded-xl px-3 py-2 text-sm font-sans focus:outline-hidden focus:border-[#A89A8A]"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase font-sans tracking-wider text-[#A89A8A] font-medium block mb-1">Contact Phone Number</label>
                        <input 
                          type="text" 
                          value={settings.contactPhone}
                          onChange={(e) => handleSettingChange('contactPhone', e.target.value)}
                          className="w-full border border-[#E6DED4] rounded-xl px-3 py-2 text-sm font-sans focus:outline-hidden focus:border-[#A89A8A]"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase font-sans tracking-wider text-[#A89A8A] font-medium block mb-1">Contact Email Address</label>
                        <input 
                          type="email" 
                          value={settings.contactEmail}
                          onChange={(e) => handleSettingChange('contactEmail', e.target.value)}
                          className="w-full border border-[#E6DED4] rounded-xl px-3 py-2 text-sm font-sans focus:outline-hidden focus:border-[#A89A8A]"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase font-sans tracking-wider text-[#A89A8A] font-medium block mb-1">Instagram Handle (no @)</label>
                        <input 
                          type="text" 
                          value={settings.contactInstagram}
                          onChange={(e) => handleSettingChange('contactInstagram', e.target.value)}
                          className="w-full border border-[#E6DED4] rounded-xl px-3 py-2 text-sm font-sans focus:outline-hidden focus:border-[#A89A8A]"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase font-sans tracking-wider text-[#A89A8A] font-medium block mb-1">WhatsApp International Format (e.g. 447712345678)</label>
                        <input 
                          type="text" 
                          value={settings.contactWhatsapp}
                          onChange={(e) => handleSettingChange('contactWhatsapp', e.target.value)}
                          className="w-full border border-[#E6DED4] rounded-xl px-3 py-2 text-sm font-sans focus:outline-hidden focus:border-[#A89A8A]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SERVICES CMS TAB */}
            {activeTab === 'services' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-serif text-[#2B2B2B]">Service Packages CMS</h3>
                  <p className="text-xs text-[#555] font-sans">Create, edit, or remove the half-day, full-day, or add-on service packages.</p>
                </div>

                {/* Add New Service Form */}
                <form onSubmit={handleAddService} className="border border-[#E6DED4] rounded-2xl p-6 bg-[#F4F1EC]/30 space-y-4">
                  <h4 className="font-serif text-sm text-[#2B2B2B] font-semibold flex items-center gap-1.5">
                    <Plus className="w-4 h-4 text-[#A89A8A]" />
                    <span>Create New Service Package</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-[10px] uppercase font-sans tracking-wider text-[#A89A8A] font-medium block mb-1">Package Name</label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. The Attic Edit"
                        value={newService.name}
                        onChange={(e) => setNewService({...newService, name: e.target.value})}
                        className="w-full border border-[#E6DED4] bg-white rounded-xl px-3 py-2 text-sm font-sans focus:outline-hidden focus:border-[#A89A8A]"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-sans tracking-wider text-[#A89A8A] font-medium block mb-1">Category Group</label>
                      <select 
                        value={newService.category}
                        onChange={(e) => setNewService({...newService, category: e.target.value as any})}
                        className="w-full border border-[#E6DED4] bg-white rounded-xl px-3 py-2 text-sm font-sans focus:outline-hidden focus:border-[#A89A8A]"
                      >
                        <option value="half-day">Half Day Services</option>
                        <option value="full-day">Full Day Services</option>
                        <option value="add-on">Add-on Services</option>
                        <option value="free">Complimentary / Free</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-sans tracking-wider text-[#A89A8A] font-medium block mb-1">Duration & Limits</label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. Half Day (Up to 4 Hours)"
                        value={newService.duration}
                        onChange={(e) => setNewService({...newService, duration: e.target.value})}
                        className="w-full border border-[#E6DED4] bg-white rounded-xl px-3 py-2 text-sm font-sans focus:outline-hidden focus:border-[#A89A8A]"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-sans tracking-wider text-[#A89A8A] font-medium block mb-1">Price (£)</label>
                      <input 
                        type="number" 
                        placeholder="395"
                        value={newService.price || ''}
                        onChange={(e) => setNewService({...newService, price: Number(e.target.value)})}
                        className="w-full border border-[#E6DED4] bg-white rounded-xl px-3 py-2 text-sm font-sans focus:outline-hidden focus:border-[#A89A8A]"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-sans tracking-wider text-[#A89A8A] font-medium block mb-1">Price Prefix/Suffix</label>
                      <input 
                        type="text" 
                        placeholder="e.g. From, per hour"
                        value={newService.priceSuffix}
                        onChange={(e) => setNewService({...newService, priceSuffix: e.target.value})}
                        className="w-full border border-[#E6DED4] bg-white rounded-xl px-3 py-2 text-sm font-sans focus:outline-hidden focus:border-[#A89A8A]"
                      />
                    </div>
                    <div className="sm:col-span-2 md:col-span-3">
                      <label className="text-[10px] uppercase font-sans tracking-wider text-[#A89A8A] font-medium block mb-1">Package Description</label>
                      <textarea 
                        rows={2}
                        placeholder="Describe what is included in this organizing experience..."
                        value={newService.description}
                        onChange={(e) => setNewService({...newService, description: e.target.value})}
                        className="w-full border border-[#E6DED4] bg-white rounded-xl px-3 py-2 text-sm font-body focus:outline-hidden focus:border-[#A89A8A]"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-5 py-2 bg-[#A5AEA0] text-white hover:bg-[#8d9987] rounded-xl text-xs font-sans font-medium transition-colors"
                    >
                      Save Service Package
                    </button>
                  </div>
                </form>

                {/* Services List */}
                <div className="space-y-3">
                  <h4 className="font-serif text-sm text-[#2B2B2B] font-semibold border-b border-[#E6DED4] pb-2">Active Packages ({services.length})</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {services.map((s) => (
                      <div key={s.id} className="border border-[#E6DED4] rounded-xl p-4 bg-white flex justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-serif text-sm font-semibold text-[#2B2B2B]">{s.name}</span>
                            <span className="text-[9px] uppercase font-sans tracking-widest px-2 py-0.5 rounded-full bg-[#F4F1EC] text-[#A89A8A]">
                              {s.category}
                            </span>
                          </div>
                          <p className="text-[11px] font-sans text-[#A89A8A]">{s.duration}</p>
                          <p className="text-xs font-body text-[#555] line-clamp-2">{s.description}</p>
                          <p className="text-xs font-semibold text-[#2B2B2B] pt-1">
                            {s.priceSuffix ? `${s.priceSuffix} ` : ''}£{s.price}
                          </p>
                        </div>
                        <button
                          onClick={() => deleteService(s.id)}
                          className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg self-start transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* GALLERY CMS TAB */}
            {activeTab === 'gallery' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-serif text-[#2B2B2B]">Before & After Slider CMS</h3>
                  <p className="text-xs text-[#555] font-sans">Manage Before/After transformation items displayed in the interactive slider gallery.</p>
                </div>

                {/* Add New Gallery Form */}
                <form onSubmit={handleAddGalleryItem} className="border border-[#E6DED4] rounded-2xl p-6 bg-[#F4F1EC]/30 space-y-4">
                  <h4 className="font-serif text-sm text-[#2B2B2B] font-semibold flex items-center gap-1.5">
                    <Plus className="w-4 h-4 text-[#A89A8A]" />
                    <span>Add New Transformation Case</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] uppercase font-sans tracking-wider text-[#A89A8A] font-medium block mb-1">Project Title</label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. Master Bedroom Sanctuary"
                        value={newGalleryItem.title}
                        onChange={(e) => setNewGalleryItem({...newGalleryItem, title: e.target.value})}
                        className="w-full border border-[#E6DED4] bg-white rounded-xl px-3 py-2 text-sm font-sans focus:outline-hidden focus:border-[#A89A8A]"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-sans tracking-wider text-[#A89A8A] font-medium block mb-1">Space / Area Type</label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. Bedroom Wardrobes, Garage, Pantry"
                        value={newGalleryItem.spaceType}
                        onChange={(e) => setNewGalleryItem({...newGalleryItem, spaceType: e.target.value})}
                        className="w-full border border-[#E6DED4] bg-white rounded-xl px-3 py-2 text-sm font-sans focus:outline-hidden focus:border-[#A89A8A]"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-sans tracking-wider text-[#A89A8A] font-medium block mb-1">Before Image URL</label>
                      <input 
                        type="text" 
                        required
                        value={newGalleryItem.beforeImage}
                        onChange={(e) => setNewGalleryItem({...newGalleryItem, beforeImage: e.target.value})}
                        className="w-full border border-[#E6DED4] bg-white rounded-xl px-3 py-2 text-xs font-mono focus:outline-hidden focus:border-[#A89A8A]"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-sans tracking-wider text-[#A89A8A] font-medium block mb-1">After Image URL</label>
                      <input 
                        type="text" 
                        required
                        value={newGalleryItem.afterImage}
                        onChange={(e) => setNewGalleryItem({...newGalleryItem, afterImage: e.target.value})}
                        className="w-full border border-[#E6DED4] bg-white rounded-xl px-3 py-2 text-xs font-mono focus:outline-hidden focus:border-[#A89A8A]"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-[10px] uppercase font-sans tracking-wider text-[#A89A8A] font-medium block mb-1">Transformation Details (Explain problems & systems applied)</label>
                      <textarea 
                        rows={3}
                        required
                        placeholder="We grouped garments by season, fitted uniform space-saving hangers..."
                        value={newGalleryItem.description}
                        onChange={(e) => setNewGalleryItem({...newGalleryItem, description: e.target.value})}
                        className="w-full border border-[#E6DED4] bg-white rounded-xl px-3 py-2 text-sm font-body focus:outline-hidden focus:border-[#A89A8A]"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-5 py-2 bg-[#A5AEA0] text-white hover:bg-[#8d9987] rounded-xl text-xs font-sans font-medium transition-colors"
                    >
                      Save Gallery Case
                    </button>
                  </div>
                </form>

                {/* Gallery Items Grid */}
                <div className="space-y-3">
                  <h4 className="font-serif text-sm text-[#2B2B2B] font-semibold border-b border-[#E6DED4] pb-2">Currently Featured Projects ({beforeAfterItems.length})</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {beforeAfterItems.map((item) => (
                      <div key={item.id} className="border border-[#E6DED4] rounded-xl overflow-hidden bg-white flex flex-col justify-between">
                        <div className="p-4 space-y-2">
                          <div className="flex justify-between items-start gap-2">
                            <div>
                              <span className="text-[9px] uppercase font-sans tracking-widest text-[#A89A8A] font-medium block">{item.spaceType}</span>
                              <h5 className="font-serif text-md font-semibold text-[#2B2B2B]">{item.title}</h5>
                            </div>
                            <button
                              onClick={() => deleteGalleryItem(item.id)}
                              className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="text-xs font-body text-[#555] line-clamp-3">{item.description}</p>
                        </div>
                        <div className="grid grid-cols-2 h-24 border-t border-[#E6DED4] relative">
                          <div className="overflow-hidden bg-[#F4F1EC] flex items-center justify-center">
                            {item.beforeImage.startsWith('http') ? (
                              <img src={item.beforeImage} alt="Before" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                            ) : (
                              <span className="text-[10px] font-mono text-[#A89A8A]">Local image: {item.beforeImage}</span>
                            )}
                          </div>
                          <div className="overflow-hidden bg-[#F4F1EC] border-l border-[#E6DED4] flex items-center justify-center">
                            {item.afterImage.startsWith('http') ? (
                              <img src={item.afterImage} alt="After" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                            ) : (
                              <span className="text-[10px] font-mono text-[#A89A8A]">Local image: {item.afterImage}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TESTIMONIALS CMS TAB */}
            {activeTab === 'testimonials' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-serif text-[#2B2B2B]">Client Reviews & Testimonials</h3>
                  <p className="text-xs text-[#555] font-sans">Publish or remove review statements and ADHD-friendly support testimonials.</p>
                </div>

                {/* Add Testimonial Form */}
                <form onSubmit={handleAddTestimonial} className="border border-[#E6DED4] rounded-2xl p-6 bg-[#F4F1EC]/30 space-y-4">
                  <h4 className="font-serif text-sm text-[#2B2B2B] font-semibold flex items-center gap-1.5">
                    <Plus className="w-4 h-4 text-[#A89A8A]" />
                    <span>Publish New Testimonial</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-[10px] uppercase font-sans tracking-wider text-[#A89A8A] font-medium block mb-1">Author Name / Family</label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. Sarah M."
                        value={newTestimonial.author}
                        onChange={(e) => setNewTestimonial({...newTestimonial, author: e.target.value})}
                        className="w-full border border-[#E6DED4] bg-white rounded-xl px-3 py-2 text-sm font-sans focus:outline-hidden focus:border-[#A89A8A]"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-sans tracking-wider text-[#A89A8A] font-medium block mb-1">Location / Suburb</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Altrincham, Manchester"
                        value={newTestimonial.location}
                        onChange={(e) => setNewTestimonial({...newTestimonial, location: e.target.value})}
                        className="w-full border border-[#E6DED4] bg-white rounded-xl px-3 py-2 text-sm font-sans focus:outline-hidden focus:border-[#A89A8A]"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-sans tracking-wider text-[#A89A8A] font-medium block mb-1">Service Tag (ADHD, Wardrobe, etc.)</label>
                      <input 
                        type="text" 
                        placeholder="e.g. ADHD-Friendly Reset"
                        value={newTestimonial.tag}
                        onChange={(e) => setNewTestimonial({...newTestimonial, tag: e.target.value})}
                        className="w-full border border-[#E6DED4] bg-white rounded-xl px-3 py-2 text-sm font-sans focus:outline-hidden focus:border-[#A89A8A]"
                      />
                    </div>
                    <div className="sm:col-span-3">
                      <label className="text-[10px] uppercase font-sans tracking-wider text-[#A89A8A] font-medium block mb-1">Review Narrative</label>
                      <textarea 
                        rows={3}
                        required
                        placeholder="They came with zero judgment, infinite kindness, and put together simple, intuitive systems..."
                        value={newTestimonial.text}
                        onChange={(e) => setNewTestimonial({...newTestimonial, text: e.target.value})}
                        className="w-full border border-[#E6DED4] bg-white rounded-xl px-3 py-2 text-sm font-body focus:outline-hidden focus:border-[#A89A8A]"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-5 py-2 bg-[#A5AEA0] text-white hover:bg-[#8d9987] rounded-xl text-xs font-sans font-medium transition-colors"
                    >
                      Publish Testimonial
                    </button>
                  </div>
                </form>

                {/* Testimonials List */}
                <div className="space-y-3">
                  <h4 className="font-serif text-sm text-[#2B2B2B] font-semibold border-b border-[#E6DED4] pb-2">Active Reviews ({testimonials.length})</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {testimonials.map((t) => (
                      <div key={t.id} className="border border-[#E6DED4] rounded-xl p-5 bg-white flex justify-between gap-4">
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2">
                            <span className="font-serif text-sm font-semibold text-[#2B2B2B]">{t.author}</span>
                            <span className="text-[9px] font-sans text-[#555]">{t.location}</span>
                          </div>
                          {t.tag && (
                            <span className="inline-block text-[9px] uppercase font-sans tracking-widest px-2 py-0.5 rounded-full bg-[#A5AEA0]/15 text-[#6c7866] border border-[#A5AEA0]/30 font-semibold">
                              {t.tag}
                            </span>
                          )}
                          <p className="text-xs font-body italic text-[#555] leading-relaxed">"{t.text}"</p>
                        </div>
                        <button
                          onClick={() => deleteTestimonial(t.id)}
                          className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg self-start transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
