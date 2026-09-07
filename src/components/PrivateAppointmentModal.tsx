import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, CheckCircle2, Shield, User, Mail, Phone, ArrowRight } from 'lucide-react';
import { BOUTIQUES } from '../data/jewelleryData';
import { BookingFormData } from '../types';
import confetti from 'canvas-confetti';

interface PrivateAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivateAppointmentModal: React.FC<PrivateAppointmentModalProps> = ({
  isOpen,
  onClose
}) => {
  const [formData, setFormData] = useState<BookingFormData>({
    salutation: 'Ms.',
    fullName: '',
    email: '',
    phone: '',
    boutique: 'Chennai — 123 Anna Salai',
    preferredDate: '',
    preferredTime: '14:00',
    collectionInterest: 'Bridal & Gold Collection',
    champagnePreference: 'Artisanal Tea & Refreshment Service',
    notes: ''
  });

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [bookingRef, setBookingRef] = useState<string>('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = `BIZ-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingRef(ref);
    setIsSubmitted(true);

    // Luxury gold confetti burst
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#C9A227', '#E8C9A0', '#FFFFFF', '#7A1F2B']
      });
    } catch {
      // fallback if canvas-confetti fails
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-fadeIn">
      {/* Modal Container */}
      <div className="relative w-full max-w-2xl bg-espresso-950 rounded-3xl border border-gold-500/35 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 sm:p-8 border-b border-gold-500/15 bg-espresso-900/40">
          <div>
            <span className="text-[10px] font-mono tracking-[0.4em] text-gold-400 uppercase block">
              BIZJEWELLERY · PRIVATE SALON
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-white font-light mt-1">
              Book a Private Viewing
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close booking modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {isSubmitted ? (
            /* Confirmation Screen */
            <div className="text-center py-10 space-y-6 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-gold-500/20 border border-gold-400 text-gold-300 mx-auto flex items-center justify-center shadow-gold-glow">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-mono text-gold-400 tracking-widest uppercase block mb-1">
                  APPOINTMENT RESERVED
                </span>
                <h4 className="font-serif text-2xl sm:text-3xl text-white font-light">
                  We look forward to welcoming you.
                </h4>
                <p className="font-mono text-sm text-champagne-300 mt-2">
                  CONFIRMATION DOSSIER: <span className="font-bold text-white">{bookingRef}</span>
                </p>
              </div>

              <div className="bg-espresso-900/80 p-6 rounded-2xl border border-gold-500/20 text-left text-xs font-mono space-y-3 max-w-md mx-auto">
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-white/40">GUEST:</span>
                  <span className="text-white">{formData.salutation} {formData.fullName}</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-white/40">SALON:</span>
                  <span className="text-champagne-200">{formData.boutique}</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-white/40">DATE & TIME:</span>
                  <span className="text-gold-300">{formData.preferredDate || 'Next Available'} at {formData.preferredTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/40">CONSULTATION:</span>
                  <span className="text-white">{formData.collectionInterest}</span>
                </div>
              </div>

              <p className="text-xs text-white/50 max-w-sm mx-auto font-light">
                Our Senior Salon Concierge will contact you via phone within 2 hours to confirm personalized appointment details.
              </p>

              <button
                onClick={handleReset}
                className="gold-glow-btn px-8 py-3 rounded-full text-xs font-mono uppercase tracking-widest text-champagne-100"
              >
                Return to Experience
              </button>
            </div>
          ) : (
            /* Booking Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Salutation & Name */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-gold-400 mb-2">
                    Salutation
                  </label>
                  <select
                    value={formData.salutation}
                    onChange={(e) => setFormData({ ...formData, salutation: e.target.value })}
                    className="w-full bg-espresso-900 border border-gold-500/25 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-400"
                  >
                    <option value="Ms.">Ms.</option>
                    <option value="Mrs.">Mrs.</option>
                    <option value="Mr.">Mr.</option>
                    <option value="Dr.">Dr.</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-gold-400 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ananya Raman"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-espresso-900 border border-gold-500/25 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-gold-400"
                  />
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-gold-400 mb-2">
                    Direct Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="concierge@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-espresso-900 border border-gold-500/25 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-gold-400"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-gold-400 mb-2">
                    Telephone (with Country Code) *
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

              {/* Salon Selection */}
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-widest text-gold-400 mb-2">
                  Select Showroom Location *
                </label>
                <select
                  value={formData.boutique}
                  onChange={(e) => setFormData({ ...formData, boutique: e.target.value })}
                  className="w-full bg-espresso-900 border border-gold-500/25 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-400"
                >
                  {BOUTIQUES.map((b) => (
                    <option key={b.city} value={`${b.city} — ${b.address}`}>
                      {b.city} ({b.district}) — {b.address}
                    </option>
                  ))}
                </select>
              </div>

              {/* Preferred Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-gold-400 mb-2">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full bg-espresso-900 border border-gold-500/25 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-400"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-gold-400 mb-2">
                    Preferred Time
                  </label>
                  <select
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    className="w-full bg-espresso-900 border border-gold-500/25 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-400"
                  >
                    <option value="11:00">11:00 Morning Salon</option>
                    <option value="14:00">14:00 Afternoon Salon</option>
                    <option value="16:30">16:30 Sunset Salon</option>
                    <option value="18:30">18:30 Evening Private Viewing</option>
                  </select>
                </div>
              </div>

              {/* Collection Interest */}
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-widest text-gold-400 mb-2">
                  Collection / Jewellery Type of Interest
                </label>
                <select
                  value={formData.collectionInterest}
                  onChange={(e) => setFormData({ ...formData, collectionInterest: e.target.value })}
                  className="w-full bg-espresso-900 border border-gold-500/25 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-400"
                >
                  <option value="Bridal & Gold Collection">Bridal & Gold Collection</option>
                  <option value="Diamond Necklaces & Chokers">Diamond Necklaces & Chokers</option>
                  <option value="Heritage Temple Jewellery">Heritage Temple Jewellery</option>
                  <option value="Custom Bespoke Commission">Custom Bespoke Commission</option>
                </select>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-widest text-gold-400 mb-2">
                  Bespoke Inquiries / Notes
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Looking for a bridal choker set or custom ring sizing..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-espresso-900 border border-gold-500/25 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-gold-400"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full gold-glow-btn py-4 rounded-full text-xs font-mono uppercase tracking-[0.25em] text-champagne-100 font-bold shadow-2xl flex items-center justify-center gap-2"
                >
                  <span>Request Private Viewing Reservation</span>
                  <ArrowRight className="w-4 h-4 text-gold-400" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
