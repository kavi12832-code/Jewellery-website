import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ChevronRight } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenShowcase?: () => void;
  activeSection?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking
}) => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/', isPage: true },
    { name: 'Collections', path: '/collections', isPage: true },
    { name: 'Bridal', path: '/#about', hash: '#about' },
    { name: 'Heritage', path: '/#about', hash: '#about' },
    { name: 'Contact Us', path: '/#contact', hash: '#contact' }
  ];

  const handleLinkClick = (e: React.MouseEvent, item: { name: string; path: string; isPage?: boolean; hash?: string }) => {
    setMobileMenuOpen(false);

    if (item.isPage) {
      e.preventDefault();
      navigate(item.path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (item.hash) {
      e.preventDefault();
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const target = document.querySelector(item.hash!);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
          }
        }, 150);
      } else {
        const target = document.querySelector(item.hash);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${
          isScrolled
            ? 'bg-espresso-950/90 backdrop-blur-xl border-b border-gold-500/15 py-3.5 shadow-2xl shadow-black/70'
            : 'bg-gradient-to-b from-[#0D0906]/90 via-[#0D0906]/40 to-transparent py-6 border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Brand Wordmark */}
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group flex flex-col items-start focus:outline-none"
          >
            <span className="font-serif tracking-[0.25em] text-lg sm:text-2xl font-semibold text-white group-hover:text-[#F5F0E6] transition-colors duration-250 ease-out">
              Bizjewellery
            </span>
            <span className="text-[9px] tracking-[0.35em] text-gold-500/80 font-mono uppercase mt-0.5">
              FINE CRAFTSMANSHIP · EST. 1990
            </span>
          </Link>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navLinks.map((item) => (
              <a
                key={item.name}
                href={item.path}
                onClick={(e) => handleLinkClick(e, item)}
                className="nav-link relative text-xs tracking-[0.2em] uppercase font-medium py-1 group cursor-pointer transition-all duration-250 hover:text-[#F5F0E6]"
              >
                <span>{item.name}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gradient-to-r from-transparent via-gold-400 to-transparent group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center space-x-4">
            {/* Primary Gold CTA */}
            <button
              onClick={onOpenBooking}
              className="gold-glow-btn px-5 py-2 rounded-full text-[11px] tracking-[0.16em] uppercase font-semibold text-champagne-100 flex items-center gap-1.5 group shadow-gold-glow"
            >
              <span>Book an Appointment</span>
              <ChevronRight className="w-3 h-3 text-gold-400 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center space-x-3 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white/80 hover:text-[#F5F0E6] focus:outline-none rounded-lg border border-gold-500/20 bg-espresso-800/40 transition-colors duration-250"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-espresso-950/98 backdrop-blur-2xl lg:hidden flex flex-col justify-between pt-24 pb-10 px-8 transition-all duration-500">
          <div className="space-y-5 flex flex-col items-center text-center mt-6">
            <span className="text-[10px] tracking-[0.4em] text-gold-500 uppercase font-mono">Bizjewellery Menu</span>
            {navLinks.map((item) => (
              <a
                key={item.name}
                href={item.path}
                onClick={(e) => handleLinkClick(e, item)}
                className="nav-link text-lg font-serif tracking-[0.18em] uppercase py-2.5 border-b border-white/5 w-full block"
              >
                {item.name}
              </a>
            ))}
          </div>

          <div className="space-y-4 pt-6 border-t border-gold-500/20 text-center">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full gold-glow-btn py-3.5 rounded-full text-xs tracking-[0.2em] uppercase font-semibold text-champagne-200"
            >
              Book an Appointment
            </button>
            <p className="text-[11px] text-white/40 tracking-wider font-mono">
              123 Anna Salai, Chennai · Flagship Showroom
            </p>
          </div>
        </div>
      )}
    </>
  );
};
