import React from 'react';
import Link from 'next/link';
import Icon from './Icon';

export default function Footer() {
  return (
    <footer className="bg-cream border-t border-tan pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <Link href="/">
              <img src="/branding/svg/primary-logo.svg" alt="Orbitex Logo" className="h-8 w-auto mb-6" />
            </Link>
            <p className="text-muted-foreground text-sm">
              A premium software, web, and marketing agency building digital products that drive growth.
            </p>
          </div>

          <div>
            <h3 className="font-display font-semibold text-lg mb-4 text-near-black">Divisions</h3>
            <ul className="space-y-3 text-sm font-medium">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-near-black transition-colors">Orbitex Hub</Link>
              </li>
              <li>
                <Link href="/software" className="text-muted-foreground hover:text-[#7C3AED] transition-colors">Software</Link>
              </li>
              <li>
                <Link href="/web" className="text-muted-foreground hover:text-[#06B6D4] transition-colors">Web</Link>
              </li>
              <li>
                <Link href="/marketing" className="text-muted-foreground hover:text-[#C2622D] transition-colors">Marketing</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display font-semibold text-lg mb-4 text-near-black">Company</h3>
            <ul className="space-y-3 text-sm font-medium">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-near-black transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-near-black transition-colors">Blog</Link>
              </li>
              <li>
                <Link href="/quote" className="text-muted-foreground hover:text-near-black transition-colors">Get a Quote</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display font-semibold text-lg mb-4 text-near-black">Legal</h3>
            <ul className="space-y-3 text-sm font-medium">
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-near-black transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-near-black transition-colors">Terms of Service</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-tan flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-muted-foreground">
            © 2024 Orbitex. Founded by Ayan Mathur.
          </p>
          <div className="flex space-x-4">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-near-black transition-colors">
              <Icon name="linkedin" size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-near-black transition-colors">
              <Icon name="twitter-x" size={20} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-near-black transition-colors">
              <Icon name="instagram" size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
