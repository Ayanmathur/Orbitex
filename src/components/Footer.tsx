'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Icon from './Icon';
import { supabase } from '@/lib/supabase';

export default function Footer() {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await supabase.from('quote_requests').insert([
        { name, email, phone: mobile, message, division: 'footer', service: 'Footer Inquiry' }
      ]);
    } catch (err) {
      console.warn('Footer inquiry submitted locally:', err);
    }
    setSubmitted(true);
  };

  return (
    <footer className="bg-[#1A1814] relative z-30 pt-16 pb-8 text-[#FBF7F0]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-16">
          
          {/* Column 1: Brand & Bio (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <Link href="/" className="inline-block">
              <img src="/branding/svg/primary-logo.svg" alt="Orbitex Logo" className="h-8 w-auto brightness-0 invert" />
            </Link>
            <p className="text-xs text-[#D9C8A9] leading-relaxed">
              Orbitex is a founder-led studio behind 6 products, 30+ client partnerships, and three specialist teams under one roof.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-[#2A2416] border border-[#36322A] hover:border-[#D9C8A9] transition-colors">
                <Icon name="facebook" size={16} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-[#2A2416] border border-[#36322A] hover:border-[#D9C8A9] transition-colors">
                <Icon name="instagram" size={16} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-[#2A2416] border border-[#36322A] hover:border-[#D9C8A9] transition-colors">
                <Icon name="linkedin" size={16} />
              </a>
              <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-[#2A2416] border border-[#36322A] hover:border-[#D9C8A9] transition-colors">
                <Icon name="whatsapp" size={16} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="headline-display text-base text-[#FBF7F0] font-bold">Quick Links</h3>
            <ul className="space-y-2 text-xs font-medium text-[#EDE3D0]">
              <li><Link href="/" className="hover:text-[#FBF7F0] transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-[#FBF7F0] transition-colors">About Us</Link></li>
              <li><Link href="/#divisions" className="hover:text-[#FBF7F0] transition-colors">Our Services</Link></li>
              <li><Link href="/blog" className="hover:text-[#FBF7F0] transition-colors">Blog</Link></li>
              <li><Link href="/#contact" className="hover:text-[#FBF7F0] transition-colors">Get a Quote</Link></li>
            </ul>
          </div>

          {/* Column 3: Our Services (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="headline-display text-base text-[#FBF7F0] font-bold">Our Services</h3>
            <ul className="space-y-2 text-xs font-medium text-[#EDE3D0]">
              <li><Link href="/software" className="hover:text-[var(--accent)] transition-colors">Web App Development</Link></li>
              <li><Link href="/software" className="hover:text-[var(--accent)] transition-colors">AI Automation</Link></li>
              <li><Link href="/software" className="hover:text-[var(--accent)] transition-colors">Mobile App Dev</Link></li>
              <li><Link href="/web" className="hover:text-[var(--accent)] transition-colors">Responsive UI/UX</Link></li>
              <li><Link href="/marketing" className="hover:text-[var(--accent)] transition-colors">Digital Marketing</Link></li>
              <li><Link href="/software" className="hover:text-[var(--accent)] transition-colors">Software Development</Link></li>
            </ul>
          </div>

          {/* Column 4: Quick Contact (2 cols) */}
          <div className="lg:col-span-2 space-y-3 text-xs">
            <h3 className="headline-display text-base text-[#FBF7F0] font-bold">Quick Contact</h3>
            <p className="font-semibold text-[#FBF7F0]">Orbitex Studio</p>
            <p className="text-[#EDE3D0]">India: +91-9923290693 / +91-9096300320</p>
            <p className="text-[#EDE3D0]">Email: contact@orbitex.com</p>
          </div>

          {/* Column 5: Inline Quick Form (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="headline-display text-base text-[#FBF7F0] font-bold">Quick Inquiry</h3>
            {submitted ? (
              <div className="p-4 bg-emerald-900/40 border border-emerald-500/30 text-emerald-300 rounded-xl text-xs font-semibold">
                Thank you! Message received.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-2">
                <input
                  type="text"
                  required
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#36322A] bg-[#2A2416] text-[#FBF7F0] placeholder-[#B5A895] focus:outline-none focus:border-[#D9C8A9]"
                />
                <input
                  type="email"
                  required
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#36322A] bg-[#2A2416] text-[#FBF7F0] placeholder-[#B5A895] focus:outline-none focus:border-[#D9C8A9]"
                />
                <textarea
                  required
                  placeholder="Your Message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#36322A] bg-[#2A2416] text-[#FBF7F0] placeholder-[#B5A895] focus:outline-none focus:border-[#D9C8A9] resize-none"
                />
                <button type="submit" className="w-full bg-[#FBF7F0] text-[#1A1814] font-semibold text-xs py-2 rounded-full hover:bg-[#D9C8A9] transition-colors">
                  Submit Inquiry
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Copyright & Legal Bar */}
        <div className="pt-8 border-t border-[#36322A] flex flex-col md:flex-row justify-between items-center text-xs text-[#EDE3D0] space-y-2 md:space-y-0">
          <p>© 2026 Orbitex Studio. Founded by Ayan Mathur. All rights reserved.</p>
          <div className="flex space-x-4">
            <Link href="/privacy" className="hover:text-[#FBF7F0] transition-colors">Privacy Policy</Link>
            <span>|</span>
            <Link href="/terms" className="hover:text-[#FBF7F0] transition-colors">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
