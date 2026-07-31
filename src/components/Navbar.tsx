import React, { useState, useEffect } from 'react';
import { NavbarLogo } from './BrandLogos';
import { ArrowRight, Sparkles } from 'lucide-react';

interface NavbarProps {
  onOpenWaitlist: () => void;
  onOpenExpertModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenWaitlist, onOpenExpertModal }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-gray-200/80 shadow-sm py-2.5 sm:py-3'
          : 'bg-transparent py-3 sm:py-5'
      }`}
    >
      <div className="maxwell-container flex items-center justify-between gap-2">
        {/* Navbar Brand Logo */}
        <a href="#" className="hover:opacity-90 transition-opacity shrink-0" aria-label="MaxWell Homepage">
          <NavbarLogo />
        </a>

        {/* Action Links & CTAs */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <button
            onClick={onOpenExpertModal}
            className="text-xs sm:text-sm font-medium text-charcoal hover:text-primary-purple transition-colors hidden md:inline-flex items-center gap-1.5"
            style={{ color: '#4A4A4A' }}
          >
            <Sparkles size={14} className="text-purple-600" />
            <span>Founding Experts</span>
          </button>

          <button
            onClick={onOpenWaitlist}
            className="btn-primary text-xs sm:text-sm py-1.5 px-3 sm:py-2 sm:px-4 shadow-sm whitespace-nowrap"
          >
            <span>Join Waitlist</span>
            <ArrowRight size={14} className="hidden sm:inline-block" />
          </button>
        </div>
      </div>
    </header>
  );
};
