import React, { useState } from 'react';
import { STORE_LOCATION } from '../data/jewelleryData';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';
import { ContactFormData } from '../types';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    phone: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-12 sm:py-16 px-6 sm:px-12 bg-[#0D0906] relative overflow-hidden border-t border-gold-500/15">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <span className="text-[11px] font-mono tracking-[0.4em] text-gold-400 uppercase block mb-2">
            FLAGSHIP SHOWROOM & CONSULTATION
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-light text-white tracking-wide mb-2.5">
            {STORE_LOCATION.title}
          </h2>
          <p className="font-cormorant italic text-base sm:text-lg text-champagne-200/80">
            {STORE_LOCATION.body}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* Showroom Information Card */}
          <div className="lg:col-span-5 bg-espresso-950/80 p-6 sm:p-8 rounded-3xl border border-gold-500/20 space-y-6 shadow-2xl">
            <div>
              <h3 className="font-serif text-2xl text-white font-light mb-2">
                Chennai Flagship Showroom
              </h3>
              <p className="text-xs sm:text-sm text-white/60 font-light">
                Private viewing salons, bridal styling suites, and custom design consultation desks.
              </p>
            </div>

            <div className="space-y-5 text-xs sm:text-sm font-light">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-espresso-900 border border-gold-500/20 text-gold-400 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-white/40 block text-[10px] font-mono uppercase">ADDRESS</span>
                  <span className="text-white">{STORE_LOCATION.address}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-espresso-900 border border-gold-500/20 text-gold-400 shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-white/40 block text-[10px] font-mono uppercase">TELEPHONE</span>
                  <a href={`tel:${STORE_LOCATION.phone}`} className="text-champagne-200 hover:text-gold-300 transition-colors">
                    {STORE_LOCATION.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-espresso-900 border border-gold-500/20 text-gold-400 shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-white/40 block text-[10px] font-mono uppercase">DIRECT EMAIL</span>
                  <a href={`mailto:${STORE_LOCATION.email}`} className="text-champagne-200 hover:text-gold-300 transition-colors">
                    {STORE_LOCATION.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-espresso-900 border border-gold-500/20 text-gold-400 shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-white/40 block text-[10px] font-mono uppercase">SHOWROOM HOURS</span>
                  <span className="text-white">{STORE_LOCATION.hours}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 text-xs font-mono text-gold-400/80">
              BIS Hallmarked | 100% Certified Natural Gemstones
            </div>
          </div>

          {/* Contact Inquiry Form */}
          <div className="lg:col-span-7 bg-espresso-950/80 p-6 sm:p-8 rounded-3xl border border-gold-500/25 shadow-2xl">
            <h3 className="font-serif text-2xl text-white font-light mb-2">
              Send Us a Message
            </h3>
            <p className="text-xs sm:text-sm text-white/60 font-light mb-6">
              Fill out the form below and our Senior Design Consultant will get in touch within 2 business hours.
            </p>

            {submitted ? (
              <div className="text-center py-12 space-y-4 animate-fadeIn">
                <div className="w-14 h-14 rounded-full bg-gold-500/20 border border-gold-400 text-gold-300 mx-auto flex items-center justify-center shadow-gold-glow">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="font-serif text-2xl text-white">Message Received</h4>
                <p className="text-xs sm:text-sm text-white/60 max-w-md mx-auto">
                  Thank you for reaching out to Bizjewellery. Our team will contact you promptly at {formData.email || formData.phone}.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="gold-glow-btn px-6 py-2.5 rounded-full text-xs font-mono uppercase tracking-widest text-champagne-100"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-widest text-gold-400 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Priya Sundaram"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full bg-espresso-900 border border-gold-500/25 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-gold-400"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-widest text-gold-400 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-espresso-900 border border-gold-500/25 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-gold-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-gold-400 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-espresso-900 border border-gold-500/25 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-gold-400"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-gold-400 mb-2">
                    Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about the piece you are looking for (e.g. bridal set, ring sizing, or custom commission)..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-espresso-900 border border-gold-500/25 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-gold-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full gold-glow-btn py-4 rounded-full text-xs font-mono uppercase tracking-[0.25em] text-champagne-100 font-bold flex items-center justify-center gap-2 shadow-2xl"
                >
                  <Send className="w-4 h-4 text-gold-400" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
