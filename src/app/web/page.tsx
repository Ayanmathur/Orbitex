import React from 'react';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ProcessTimeline from '@/components/ProcessTimeline';
import ContactSection from '@/components/ContactSection';
import Testimonial from '@/components/Testimonial';
import TechStackChips from '@/components/TechStackChips';
import { testimonials } from '@/lib/data';
import TornStrip from '@/components/TornStrip';

export const metadata = {
  title: 'Web Development — Orbitex',
  description: 'Fast, elegant, conversion-first websites and web applications built to scale.',
};

const webSteps = [
  { title: 'Discovery & UX Research', description: 'Understanding brand identity, user personas, site hierarchy, and conversion pathways.', icon: 'search' },
  { title: 'UI Design & Wireframing', description: 'Creating interactive Figma prototypes with paper diorama aesthetics and modern typography.', icon: 'settings' },
  { title: 'Next.js & Frontend Build', description: 'Developing with Next.js, Tailwind CSS, TypeScript, and responsive component libraries.', icon: 'check' },
  { title: 'Core Web Vitals Tuning', description: 'Optimizing load speeds (<1s), Lighthouse metrics (90+), SEO tags, and accessibility.', icon: 'star' },
  { title: 'Launch & CMS Handoff', description: 'Deploying to high-availability CDN infrastructure and training your team on CMS content updates.', icon: 'external-link' },
];

const webTechStack = [
  'React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 
  'Prisma', 'PostgreSQL', 'Vercel', 'Figma', 'Framer Motion', 
  'Three.js', 'Shopify', 'WordPress'
];

export default function WebDivisionPage() {
  const webTestimonials = testimonials.filter(t => t.divisions.includes('web'));

  return (
    <div className="division-web min-h-screen bg-ivory text-[#2A2416]">
      <Nav />

      <main className="pt-24">
        {/* a) Hero with Background Image & Warm Paper Overlay */}
        <section className="relative min-h-[85vh] flex items-center overflow-hidden">
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
        <section className="py-20 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
              <h2 className="headline-display text-3xl md:text-4xl text-[#2A2416]">Web Services</h2>
              <p className="text-[#6B6152] text-base">Comprehensive web engineering services designed for modern digital brands.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'Website Design & Dev', desc: 'Bespoke corporate websites built with custom UI components and paper aesthetics.', icon: 'settings' },
                { title: 'Web Applications', desc: 'Complex interactive web applications and client portals engineered for speed.', icon: 'check' },
                { title: 'E-commerce Solutions', desc: 'High-converting online store builds with seamless payment checkout flows.', icon: 'external-link' },
                { title: 'CMS Builds', desc: 'Headless and traditional CMS integrations empowering non-technical teams to manage content.', icon: 'edit' },
                { title: 'Performance & CRO', desc: 'Core Web Vitals auditing, load speed optimization, and conversion rate testing.', icon: 'star' },
                { title: 'Ongoing Maintenance', desc: 'Proactive security updates, uptime monitoring, and continuous site enhancements.', icon: 'clock' }
              ].map((s, i) => (
                <div key={i} className="paper-card p-6 bg-cream border border-tan space-y-3 tier-3 fold-corner">
                  <div className="w-10 h-10 rounded-xl bg-ivory border border-tan flex items-center justify-center shadow-sm">
                    <img src={`/icons/${s.icon}.svg`} alt="" className="w-5 h-5 opacity-75" />
                  </div>
                  <h3 className="headline-display text-xl text-[#2A2416]">{s.title}</h3>
                  <p className="text-[#6B6152] text-xs leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* c) Process Timeline */}
        <ProcessTimeline steps={webSteps} title="Web Launch Process" />

        {/* d) Portfolio Showcase (High Quality Verified Unsplash Images) */}
        <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <h2 className="headline-display text-3xl md:text-4xl text-[#2A2416]">Featured Web Projects</h2>
            <p className="text-[#6B6152] text-base">A selection of recent websites and web applications built by our team.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Fintech Portal', desc: 'Next.js banking portal with real-time dashboard analytics.', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80' },
              { name: 'E-commerce Brand', desc: 'Shopify & Headless Next.js storefront with 1.2s load speeds.', img: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=80' },
              { name: 'SaaS Platform Site', desc: 'High-converting product landing site with interactive pricing.', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80' }
            ].map((proj, idx) => (
              <div key={idx} className="paper-card p-4 bg-cream border border-tan space-y-3 group tier-3 fold-corner paper-grain-card">
                <div className="aspect-video rounded-xl overflow-hidden relative bg-beige border border-tan/40">
                  <img src={proj.img} alt={proj.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <h3 className="headline-display text-lg text-[#2A2416]">{proj.name}</h3>
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
              <TechStackChips techs={webTechStack} />
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
        <ContactSection division="web" headline="Let's build a website that works as hard as you do." />
        <TornStrip />
      </main>

      <Footer />
    </div>
  );
}
