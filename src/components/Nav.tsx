"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from './Icon';
import TopUtilityBar from './TopUtilityBar';

const links = [
  { href: '/', label: 'Home' },
  { href: '/software', label: 'Software' },
  { href: '/web', label: 'Web' },
  { href: '/marketing', label: 'Marketing' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300">
        {!scrolled && <TopUtilityBar />}
        
        <nav
          className={`w-full transition-all duration-300 ease-out relative ${
            scrolled
              ? 'bg-ivory/95 backdrop-blur-md shadow-nav py-3'
              : 'bg-ivory/80 backdrop-blur-sm py-4'
          }`}
        >
          {/* Horizontal Rope Border — bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-[5px] pointer-events-none z-10 overflow-hidden">
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1440 5">
              <line x1="0" y1="2.5" x2="1440" y2="2.5" stroke="#D9C8A9" strokeWidth="2" />
              <line x1="0" y1="2.5" x2="1440" y2="2.5" stroke="#C4B18E" strokeWidth="1.5" strokeDasharray="4 3" />
              <line x1="0" y1="3.5" x2="1440" y2="3.5" stroke="rgba(42,36,22,0.1)" strokeWidth="1" />
            </svg>
          </div>
          <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
            <Link href="/" className="flex-shrink-0 relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-amber-500/0 via-amber-500/25 to-amber-500/0 rounded-full blur-md opacity-0 theme-night-logo-glow transition-opacity duration-300 pointer-events-none" />
              <img src="/branding/svg/primary-logo.svg" alt="Orbitex Logo" className="h-10 md:h-12 w-auto nav-logo-img relative z-10 transition-transform duration-250 hover:scale-105" />
            </Link>

            <div className="hidden md:flex items-center space-x-1 bg-cream/90 px-3 py-1.5 rounded-full border border-tan/60 shadow-tier-1">
              {links.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-4 text-sm font-medium transition-all duration-[250ms] ease-out ${
                      isActive 
                        ? 'font-bold rounded-t-lg rounded-b-full -mt-1 pt-2.5 pb-1.5 shadow-sm' 
                        : 'rounded-full text-[#2A2416] hover:bg-black/5 py-1.5'
                    }`}
                    style={isActive ? { backgroundColor: 'color-mix(in srgb, var(--accent) 15%, transparent)', color: 'var(--accent)' } : {}}
                  >
                    {isActive && (
                      <>
                        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-6 h-1 bg-[var(--accent)] rounded-t-sm opacity-80" />
                        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[var(--accent)] shadow-sm opacity-90" />
                      </>
                    )}
                    {link.label}
                  </Link>
                );
              })}
            </div>

            <div className="hidden md:flex items-center">
              <Link href="/#contact" className="btn-primary rounded-full px-6 py-2 text-sm font-semibold">
                Get a Quote
              </Link>
            </div>

            <div className="md:hidden flex items-center">
              <button onClick={() => setMobileOpen(true)} className="p-2 text-[#2A2416]">
                <Icon name="hamburger-menu" size={24} />
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-[60] bg-ivory transform transition-transform duration-300 ease-out ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center px-6 py-5 border-b border-tan">
          <img src="/branding/svg/primary-logo.svg" alt="Orbitex Logo" className="h-10 w-auto" />
          <button onClick={() => setMobileOpen(false)} className="p-2 text-[#2A2416]">
            <Icon name="close" size={24} />
          </button>
        </div>
        <div className="flex flex-col px-6 py-8 space-y-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-xl font-display font-bold text-[#2A2416]"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-8">
            <Link
              href="/#contact"
              onClick={() => setMobileOpen(false)}
              className="btn-primary block text-center rounded-full px-6 py-3 text-base font-semibold"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
