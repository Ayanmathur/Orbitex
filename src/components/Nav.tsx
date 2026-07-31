"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from './Icon';

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
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-350 ease-out py-4 ${
          scrolled ? 'bg-ivory shadow-nav py-2' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex-shrink-0">
            <img src="/branding/svg/primary-logo.svg" alt="Orbitex Logo" className="h-8 w-auto" />
          </Link>

          <div className="hidden md:flex items-center space-x-1 bg-cream/50 px-2 py-1 rounded-full border border-tan/30 backdrop-blur-sm">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-250 ease-out ${
                    isActive ? 'font-bold' : 'text-near-black hover:bg-black/5'
                  }`}
                  style={isActive ? { backgroundColor: 'color-mix(in srgb, var(--accent) 15%, transparent)', color: 'var(--accent)' } : {}}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="hidden md:flex items-center">
            <Link href="/quote" className="btn-primary rounded-full px-6 py-2.5 text-sm font-medium">
              Get a Quote
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setMobileOpen(true)} className="p-2 text-near-black">
              <Icon name="hamburger-menu" size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-[60] bg-ivory transform transition-transform duration-350 ease-out ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center px-6 py-4 border-b border-tan">
          <img src="/branding/svg/primary-logo.svg" alt="Orbitex Logo" className="h-8 w-auto" />
          <button onClick={() => setMobileOpen(false)} className="p-2 text-near-black">
            <Icon name="close" size={24} />
          </button>
        </div>
        <div className="flex flex-col px-6 py-8 space-y-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-2xl font-display font-bold text-near-black"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-8">
            <Link
              href="/quote"
              onClick={() => setMobileOpen(false)}
              className="btn-primary block text-center rounded-full px-6 py-3 text-lg font-medium"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
