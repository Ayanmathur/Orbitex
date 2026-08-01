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
import { products, testimonials } from '@/lib/data';
import TornStrip from '@/components/TornStrip';

const softwareServices = [
  { title: 'Custom Software Development', description: 'End-to-end bespoke solutions tailored to your unique workflows and operating requirements.', icon: 'settings' },
  { title: 'Product Engineering', description: 'Building scalable SaaS platforms and digital products from scratch.', icon: 'check' },
  { title: 'API & Backend Systems', description: 'Robust architectures powering your data and third-party integrations.', icon: 'external-link' },
  { title: 'AI & Automation Integration', description: 'Leveraging intelligence to streamline operations and save manual effort.', icon: 'star' },
  { title: 'Maintenance & Support', description: 'Ongoing SLA support to ensure your software never misses a beat.', icon: 'clock' }
];

const softwareSteps = [
  { title: 'Discovery & Audit', description: 'Deep dive into business requirements, existing systems, and technical constraints.', icon: 'search' },
  { title: 'System Architecture', description: 'Designing high-performance backend, database schema, and API contracts.', icon: 'settings' },
  { title: 'Agile Engineering', description: 'Sprint-based development with continuous integration and clean code standards.', icon: 'check' },
  { title: 'QA & Security Scans', description: 'Automated testing, load testing, SAST security checks, and code reviews.', icon: 'star' },
  { title: 'Ship & Maintain', description: 'Zero-downtime deployment and long-term maintenance & support retainers.', icon: 'external-link' }
];

export default function SoftwareDivisionPage() {
  const [selectedDrawerItem, setSelectedDrawerItem] = useState<DrawerItem | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const softwareProducts = products.filter(p => p.division === 'software');
  const softwareTestimonials = testimonials.filter(t => t.divisions.includes('software'));

  const openDrawer = (p: typeof softwareProducts[0]) => {
    setSelectedDrawerItem({
      id: p.id,
      name: p.name,
      category: 'Software Solution',
      description: p.description,
      fullDetails: `${p.name} is a high-availability software platform developed by Orbitex Software Division. Designed with clean architecture, API-first integrations, and robust security.`,
      features: ['API-First Microservices Architecture', 'Role-Based Access Control (RBAC)', 'PostgreSQL & Redis Caching Layer', 'Continuous Deployment Pipeline'],
      techStack: ['Python', 'Java', 'Next.js', 'PostgreSQL', 'Docker', 'AWS'],
      metrics: [
        { label: 'Uptime SLA', value: '99.99%' },
        { label: 'API Speed', value: '38ms' },
      ],
      link: p.link,
    });
    setIsDrawerOpen(true);
  };

  return (
    <div className="division-software min-h-screen bg-ivory text-[#2A2416]">
      <Nav />

      <main className="pt-24">
        {/* a) Hero with Background Image & Warm Paper Overlay */}
        <section className="hero-light-theme relative min-h-[85vh] flex items-center overflow-hidden">
          {/* Background Image Layer (Tier 1-2) */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1600&q=80" 
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
                Custom software built to run your business
              </h1>
              <p className="text-base md:text-lg text-[#4A4236] max-w-2xl font-medium leading-relaxed torn-reveal torn-reveal-delay-1">
                We build reliable, scalable software solutions that solve real business problems. From complex internal tools to customer-facing platforms.
              </p>
              
              {/* Sleek Rounded Rectangular Stat Chips */}
              <div className="flex flex-wrap gap-3 pt-2">
                <div className="bg-cream/80 border border-tan px-4 py-2 rounded-xl flex items-center gap-2 shadow-sm font-semibold text-xs md:text-sm text-[#2A2416]">
                  <img src="/icons/check.svg" alt="" className="w-4 h-4" />
                  <span>99.9% Uptime Benchmark</span>
                </div>
                <div className="bg-cream/80 border border-tan px-4 py-2 rounded-xl flex items-center gap-2 shadow-sm font-semibold text-xs md:text-sm text-[#2A2416]">
                  <img src="/icons/check.svg" alt="" className="w-4 h-4" />
                  <span>6 Internal Products Shipped</span>
                </div>
                <div className="bg-cream/80 border border-tan px-4 py-2 rounded-xl flex items-center gap-2 shadow-sm font-semibold text-xs md:text-sm text-[#2A2416]">
                  <img src="/icons/check.svg" alt="" className="w-4 h-4" />
                  <span>30+ Client Partnerships</span>
                </div>
              </div>

              <div className="pt-4">
                <Link href="#contact" className="btn-primary">
                  <span>Get a Custom Quote</span>
                  <img src="/icons/arrow-cta.svg" alt="" className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* b) Services Grid */}
        <section className="py-20 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
              <h2 className="headline-display text-3xl md:text-4xl text-[#2A2416]">Software Capabilities</h2>
              <p className="text-[#6B6152] text-base">Bespoke software development engineered for performance and durability.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {softwareServices.map((s, i) => (
                <div key={i} className="paper-card p-6 bg-cream border border-tan space-y-3 tier-3 fold-corner">
                  <div className="w-10 h-10 rounded-xl bg-ivory border border-tan flex items-center justify-center shadow-sm">
                    <img src={`/icons/${s.icon}.svg`} alt="" className="w-5 h-5 opacity-75" />
                  </div>
                  <h3 className="headline-display text-xl text-[#2A2416]">{s.title}</h3>
                  <p className="text-[#6B6152] text-xs leading-relaxed">{s.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* c) Products Showcase — 4-Sided Grainy Grey Paper Picture Frame Gallery */}
        <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto section-muted">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <h2 className="headline-display text-3xl md:text-4xl text-[#2A2416]">6 Products Showcase</h2>
            <p className="text-[#6B6152] text-base">In-house software products developed and maintained by our software engineering division.</p>
          </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {softwareProducts.map((p, i) => (
                <div key={i} className="wooden-picture-frame-4sided relative group">
                  {/* Brass Corner Brackets */}
                  <div className="absolute top-2.5 left-2.5 w-3.5 h-3.5 rounded-full bg-[#B89B5E] border border-[#7A613D] shadow-sm opacity-90 z-20 pointer-events-none" />
                  <div className="absolute top-2.5 right-2.5 w-3.5 h-3.5 rounded-full bg-[#B89B5E] border border-[#7A613D] shadow-sm opacity-90 z-20 pointer-events-none" />
                  <div className="absolute bottom-2.5 left-2.5 w-3.5 h-3.5 rounded-full bg-[#B89B5E] border border-[#7A613D] shadow-sm opacity-90 z-20 pointer-events-none" />
                  <div className="absolute bottom-2.5 right-2.5 w-3.5 h-3.5 rounded-full bg-[#B89B5E] border border-[#7A613D] shadow-sm opacity-90 z-20 pointer-events-none" />

                  {/* Inner Matting Bevel */}
                  <div className="wooden-frame-inner-mat h-full">
                    <div className={`paper-card p-8 flex flex-col justify-between bg-cream border border-tan fold-corner paper-grain-card tier-3 cursor-pointer hover:border-[var(--accent)] transition-all h-full ${p.comingSoon ? 'border-dashed opacity-85' : ''}`}>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <h3 className="headline-display text-2xl text-[#2A2416]">{p.name}</h3>
                          {p.comingSoon && (
                            <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-tan/40 text-[#6B6152]">
                              Coming Soon
                            </span>
                          )}
                        </div>
                        <p className="text-xs font-semibold text-[#6B6152] uppercase tracking-wide">Product Solution</p>
                        <p className="text-sm text-[#2A2416] leading-relaxed">{p.description}</p>
                      </div>

                      <div className="pt-6">
                        {!p.comingSoon && (
                          <button 
                            onClick={() => openDrawer(p)}
                            className="btn-outline text-xs py-2 px-4 inline-flex items-center cursor-pointer hover:border-[var(--accent)]"
                          >
                            <span>Explore Product</span>
                            <span className="ml-1.5">→</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
        </section>

        {/* d) Process Timeline with Rope & Die-Cut Hole Punches */}
        <ProcessTimeline steps={softwareSteps} title="Software Engineering Process" />

        {/* e) Tech Stack Chips */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6 text-center space-y-8">
            <h2 className="headline-display text-3xl md:text-4xl text-[#2A2416]">Technology Stack</h2>
            <p className="text-[#6B6152] text-base max-w-xl mx-auto">
              Modern languages, frameworks, and infrastructure tools powering our software architectures.
            </p>
            <div className="max-w-4xl mx-auto flex justify-center">
              <TechStackChips techs={['Java', 'Python', 'TypeScript', 'React', 'Next.js', 'Node.js', 'Flutter', 'PostgreSQL', 'MongoDB', 'Redis', 'Docker', 'Kubernetes', 'AWS', 'GraphQL', 'REST APIs']} />
            </div>
          </div>
        </section>

        {/* f) Testimonial */}
        {softwareTestimonials.length > 0 && (
          <section className="py-16 section-muted">
            <Testimonial testimonials={softwareTestimonials} />
          </section>
        )}

        {/* g) Contact Section */}
        <ContactSection division="software" headline="Ready to build something that lasts?" />
        <TornStrip />
      </main>

      <Footer />

      <ProductDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        item={selectedDrawerItem} 
      />
    </div>
  );
}
