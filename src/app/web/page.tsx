'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import StatWidget from '@/components/StatWidget';
import ProcessTimeline from '@/components/ProcessTimeline';
import ContactSection from '@/components/ContactSection';
import Testimonial from '@/components/Testimonial';
import TechStackChips from '@/components/TechStackChips';
import ProductDrawer, { DrawerItem } from '@/components/ProductDrawer';
import { testimonials } from '@/lib/data';
import TornStrip from '@/components/TornStrip';

const webServices = [
  { title: 'Website Design & Dev', description: 'Bespoke corporate websites built with custom UI components and paper aesthetics.', icon: 'settings' },
  { title: 'Web Applications', description: 'Complex interactive web applications and client portals engineered for speed.', icon: 'check' },
  { title: 'E-commerce Solutions', description: 'High-converting online store builds with seamless payment checkout flows.', icon: 'external-link' },
  { title: 'CMS Builds', description: 'Headless and traditional CMS integrations empowering non-technical teams to manage content.', icon: 'edit' },
  { title: 'Performance & CRO', description: 'Core Web Vitals auditing, load speed optimization, and conversion rate testing.', icon: 'star' },
  { title: 'Ongoing Maintenance', description: 'Proactive security updates, uptime monitoring, and continuous site enhancements.', icon: 'clock' }
];

const webSteps = [
  { title: 'Discovery & UX Research', description: 'Understanding brand identity, user personas, site hierarchy, and conversion pathways.', icon: 'search' },
  { title: 'UI Design & Wireframing', description: 'Creating interactive Figma prototypes with paper diorama aesthetics and modern typography.', icon: 'settings' },
  { title: 'Next.js & Frontend Build', description: 'Developing with Next.js, Tailwind CSS, TypeScript, and responsive component libraries.', icon: 'check' },
  { title: 'Core Web Vitals Tuning', description: 'Optimizing load speeds (<1s), Lighthouse metrics (90+), SEO tags, and accessibility.', icon: 'star' },
  { title: 'Launch & CMS Handoff', description: 'Deploying to high-availability CDN infrastructure and training your team on CMS content updates.', icon: 'external-link' }
];

export default function WebDivisionPage() {
  const [selectedDrawerItem, setSelectedDrawerItem] = useState<DrawerItem | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const webTestimonials = testimonials.filter(t => t.divisions.includes('web'));

  const webProjects = [
    { 
      id: 'fintech-portal',
      name: 'Fintech Portal', 
      desc: 'Next.js banking portal with real-time dashboard analytics.', 
      img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
      techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Recharts', 'PostgreSQL'],
      metrics: [{ label: 'Performance', value: '98/100' }, { label: 'Load Speed', value: '0.7s' }]
    },
    { 
      id: 'ecommerce-brand',
      name: 'E-commerce Brand', 
      desc: 'Shopify & Headless Next.js storefront with 1.2s load speeds.', 
      img: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=80',
      techStack: ['Shopify Storefront API', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel'],
      metrics: [{ label: 'Conversion', value: '+34%' }, { label: 'FCP Speed', value: '0.8s' }]
    },
    { 
      id: 'saas-platform-site',
      name: 'SaaS Platform Site', 
      desc: 'High-converting product landing site with interactive pricing.', 
      img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
      techStack: ['Next.js', 'Framer Motion', 'TypeScript', 'Tailwind CSS', 'Prisma'],
      metrics: [{ label: 'Lighthouse', value: '99/100' }, { label: 'Leads/Mo', value: '1,450+' }]
    }
  ];

  const openDrawer = (proj: typeof webProjects[0]) => {
    setSelectedDrawerItem({
      id: proj.id,
      name: proj.name,
      category: 'Web Project Showcase',
      description: proj.desc,
      fullDetails: `${proj.name} is a high-performance web experience engineered by Orbitex Web Division. Optimized for mobile-first responsiveness, Core Web Vitals, and conversion rate optimization (CRO).`,
      image: proj.img,
      features: ['Mobile-First Accessible Design System', 'Sub-second Core Web Vitals Performance', 'Integrated CMS Content Workflows', 'SEO & Analytics Setup'],
      techStack: proj.techStack,
      metrics: proj.metrics,
      link: '#',
    });
    setIsDrawerOpen(true);
  };

  return (
    <div className="division-web min-h-screen bg-ivory text-[#2A2416]">
      <Nav />

      <main className="pt-24">
        {/* a) Hero with Background Image & Warm Paper Overlay */}
        <section className="hero-light-theme relative min-h-[85vh] flex items-center overflow-hidden">
          {/* Background Image Layer (Tier 1-2) */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1467238307002-480ffdd960d3?auto=format&fit=crop&w=1600&q=80" 
              alt="" 
              className="w-full h-full object-cover"
              style={{ filter: 'contrast(1.05) saturate(0.7) brightness(0.85)' }}
            />
            <div 
              className="absolute inset-0"
              style={{ 
                background: 'linear-gradient(135deg, rgba(251,247,240,0.82) 0%, rgba(245,239,227,0.65) 40%, rgba(237,227,208,0.55) 100%)' 
              }}
            />
            {/* Matte grain overlay */}
            <div className="absolute inset-0 opacity-[0.06]" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E")`,
            }} />
          </div>

          {/* Torn bottom edge */}
          <div className="absolute bottom-0 left-0 right-0 z-30 pointer-events-none">
            <svg viewBox="0 0 1440 40" preserveAspectRatio="none" className="w-full h-[40px] block">
              <path 
                d="M0,20 Q30,8 60,18 T120,14 T180,22 T240,12 T300,20 T360,10 T420,18 T480,14 T540,22 T600,16 T660,20 T720,10 T780,18 T840,22 T900,14 T960,20 T1020,12 T1080,18 T1140,22 T1200,14 T1260,18 T1320,22 T1380,16 T1440,20 L1440,40 L0,40 Z" 
                fill="var(--ivory, #FBF7F0)" 
              />
            </svg>
          </div>

          {/* Tier 3-4: Foreground Content */}
          <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full py-20">
            <div className="max-w-3xl space-y-6">
              <h1 className="headline-display text-4xl md:text-6xl text-[#2A2416] leading-tight torn-reveal">
                Fast, elegant, conversion-first websites
              </h1>
              <p className="text-base md:text-lg text-[#4A4236] max-w-2xl font-medium leading-relaxed torn-reveal torn-reveal-delay-1">
                We design and engineer bespoke websites and web applications that combine stunning design with lightning-fast performance.
              </p>

              {/* Sleek Rounded Rectangular Stat Chips */}
              <div className="flex flex-wrap gap-3 pt-2">
                <div className="bg-cream/80 border border-tan px-4 py-2 rounded-xl flex items-center gap-2 shadow-sm font-semibold text-xs md:text-sm text-[#2A2416]">
                  <img src="/icons/check.svg" alt="" className="w-4 h-4" />
                  <span>&lt;1s Page Load Benchmark</span>
                </div>
                <div className="bg-cream/80 border border-tan px-4 py-2 rounded-xl flex items-center gap-2 shadow-sm font-semibold text-xs md:text-sm text-[#2A2416]">
                  <img src="/icons/check.svg" alt="" className="w-4 h-4" />
                  <span>90+ Lighthouse Performance</span>
                </div>
                <div className="bg-cream/80 border border-tan px-4 py-2 rounded-xl flex items-center gap-2 shadow-sm font-semibold text-xs md:text-sm text-[#2A2416]">
                  <img src="/icons/check.svg" alt="" className="w-4 h-4" />
                  <span>30+ Web Projects Delivered</span>
                </div>
              </div>

              <div className="pt-4">
                <Link href="#contact" className="btn-primary">
                  <span>Get a Web Quote</span>
                  <img src="/icons/arrow-cta.svg" alt="" className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* b) Services Grid */}
        <section className="py-12 sm:py-20 px-4 sm:px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-2.5 sm:space-y-3">
              <h2 className="headline-display text-2xl sm:text-3xl md:text-4xl text-[#2A2416]">Web Services</h2>
              <p className="text-[#6B6152] text-xs sm:text-sm md:text-base">Comprehensive web engineering services designed for modern digital brands.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
              {webServices.map((service, i) => (
                <div key={i} className="paper-card p-5 sm:p-6 bg-cream border border-tan space-y-3 tier-3 fold-corner">
                  <div className="paper-badge bg-ivory text-[#2A2416]">
                    <img src={`/icons/${service.icon || 'settings'}.svg`} alt="" className="w-5 h-5 opacity-75" />
                  </div>
                  <h3 className="headline-display text-lg sm:text-xl text-[#2A2416]">{service.title}</h3>
                  <p className="text-xs text-[#6B6152] leading-relaxed">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* c) Process Timeline */}
        <ProcessTimeline steps={webSteps} title="Web Launch Process" />

        {/* d) Portfolio Showcase */}
        <section id="portfolio" className="py-12 sm:py-20 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-2.5 sm:space-y-3">
            <h2 className="headline-display text-2xl sm:text-3xl md:text-4xl text-[#2A2416]">Featured Web Projects</h2>
            <p className="text-[#6B6152] text-xs sm:text-sm md:text-base">A selection of recent websites and web applications built by our team.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {webProjects.map((proj, idx) => (
              <div 
                key={idx} 
                onClick={() => openDrawer(proj)}
                className="paper-card p-4 bg-cream border border-tan space-y-3 group tier-3 fold-corner paper-grain-card cursor-pointer hover:border-[var(--accent)]"
              >
                <div className="aspect-video rounded-xl overflow-hidden relative bg-beige border border-tan/40">
                  <img src={proj.img} alt={proj.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="flex items-center justify-between">
                  <h3 className="headline-display text-lg text-[#2A2416]">{proj.name}</h3>
                  <span className="text-xs text-[var(--accent)] font-bold opacity-0 group-hover:opacity-100 transition-opacity">View Details →</span>
                </div>
                <p className="text-xs text-[#6B6152]">{proj.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* e) Tech Stack Chips */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6 text-center space-y-8">
            <h2 className="headline-display text-3xl md:text-4xl text-[#2A2416]">Web Development Stack</h2>
            <div className="max-w-4xl mx-auto flex justify-center">
              <TechStackChips techs={['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Prisma', 'PostgreSQL', 'Vercel', 'Figma', 'Framer Motion', 'Three.js', 'Shopify', 'WordPress']} />
            </div>
          </div>
        </section>

        {/* f) Testimonials */}
        {webTestimonials.length > 0 && (
          <section className="py-16 section-muted">
            <Testimonial testimonials={webTestimonials} />
          </section>
        )}

        {/* g) Contact Section */}
        <ContactSection division="web" />
        <TornStrip />
      </main>

      <Footer />

      {/* Product & Project Drawer Panel */}
      <ProductDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        item={selectedDrawerItem} 
      />
    </div>
  );
}
