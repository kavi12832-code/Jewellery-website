import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Award, Instagram, Facebook, MessageCircle, Check } from 'lucide-react';

export const Footer: React.FC<{ onOpenBooking: () => void }> = ({ onOpenBooking }) => {
  const [newsletterEmail, setNewsletterEmail] = useState<string>('');
  const [newsletterJoined, setNewsletterJoined] = useState<boolean>(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterJoined(true);
    }
  };

  return (
    <footer className="bg-espresso-950 text-white border-t border-gold-500/20 pt-12 sm:pt-14 pb-8 sm:pb-10 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background soft ambient vignette */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gold-500/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-10 sm:space-y-12">
        {/* 5-Column Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10">
          {/* Column 1 — Brand */}
          <div className="space-y-4 lg:col-span-1">
            <h3 className="font-serif text-2xl font-semibold tracking-wider text-white">
              Bizjewellery
            </h3>
            <p className="font-cormorant italic text-base text-champagne-200/90">
              Crafted once. Worn forever.
            </p>
            <p className="text-xs text-white/60 font-light leading-relaxed">
              Synonymous with fine craftsmanship and timeless design since 1990.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2 text-white/60">
              <a href="#" className="p-2 rounded-full bg-espresso-900 border border-white/10 hover:border-gold-400 hover:text-gold-300 transition-colors" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-espresso-900 border border-white/10 hover:border-gold-400 hover:text-gold-300 transition-colors" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-espresso-900 border border-white/10 hover:border-gold-400 hover:text-gold-300 transition-colors" aria-label="WhatsApp">
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2 — Shop */}
          <div className="space-y-3 text-xs font-light">
            <h4 className="font-mono text-xs uppercase tracking-widest text-gold-400 font-semibold mb-3">
              Shop
            </h4>
            <ul className="space-y-2.5 text-white/70">
              <li><Link to="/collections/rings" className="hover:text-champagne-200 transition-colors">360° Solitaires & Rings</Link></li>
              <li><Link to="/collections/necklaces" className="hover:text-champagne-200 transition-colors">360° Royal Necklaces</Link></li>
              <li><Link to="/collections/earrings" className="hover:text-champagne-200 transition-colors">360° Temple Earrings</Link></li>
              <li><Link to="/collections/bangles" className="hover:text-champagne-200 transition-colors">360° Bangles & Kadas</Link></li>
            </ul>
          </div>

          {/* Column 3 — Company */}
          <div className="space-y-3 text-xs font-light">
            <h4 className="font-mono text-xs uppercase tracking-widest text-gold-400 font-semibold mb-3">
              Company
            </h4>
            <ul className="space-y-2.5 text-white/70">
              <li><a href="#about" className="hover:text-champagne-200 transition-colors">Our Story & Heritage</a></li>
              <li><a href="#about" className="hover:text-champagne-200 transition-colors">Artisan Craftsmanship</a></li>
              <li><a href="#contact" className="hover:text-champagne-200 transition-colors">Flagship Showroom</a></li>
            </ul>
          </div>

          {/* Column 4 — Support */}
          <div className="space-y-3 text-xs font-light">
            <h4 className="font-mono text-xs uppercase tracking-widest text-gold-400 font-semibold mb-3">
              Support
            </h4>
            <ul className="space-y-2.5 text-white/70">
              <li><a href="#contact" className="hover:text-champagne-200 transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-champagne-200 transition-colors">FAQs</a></li>
              <li><a href="#" className="hover:text-champagne-200 transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-champagne-200 transition-colors">Track Your Order</a></li>
            </ul>
          </div>

          {/* Column 5 — Newsletter (Stay in the Loop) */}
          <div className="space-y-3 lg:col-span-1">
            <h4 className="font-mono text-xs uppercase tracking-widest text-gold-400 font-semibold mb-2">
              Stay in the Loop
            </h4>
            <p className="text-xs text-white/60 font-light leading-relaxed">
              Be the first to know about new collections, exclusive previews, and private events.
            </p>

            {newsletterJoined ? (
              <div className="flex items-center gap-2 text-xs font-mono text-gold-300 py-3">
                <Check className="w-4 h-4 text-gold-400" />
                <span>Thank you for subscribing to Bizjewellery.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletter} className="space-y-2 mt-3">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full bg-espresso-900 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-gold-400"
                />
                <button
                  type="submit"
                  className="w-full gold-glow-btn py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider text-champagne-100 font-semibold"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 text-xs text-white/40 font-mono text-center sm:text-left">
          <div className="leading-relaxed">
            © 2026 Bizjewellery. All rights reserved. <span className="hidden sm:inline">|</span> <span className="block sm:inline mt-1 sm:mt-0"><span className="hover:text-white cursor-pointer">Privacy Policy</span> | <span className="hover:text-white cursor-pointer">Terms of Service</span></span>
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-4 sm:gap-6 text-[11px]">
            <span className="flex items-center gap-1.5 text-gold-400/90">
              <ShieldCheck className="w-3.5 h-3.5" /> BIS Hallmarked
            </span>
            <span className="flex items-center gap-1.5 text-gold-400/90">
              <Award className="w-3.5 h-3.5" /> 100% Certified Gemstones
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
