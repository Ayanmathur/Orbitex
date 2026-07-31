import React from 'react';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ProcessTimeline from '@/components/ProcessTimeline';
import ContactSection from '@/components/ContactSection';
import Testimonial from '@/components/Testimonial';
import TechStackChips from '@/components/TechStackChips';
import { testimonials } from '@/lib/data';

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
        {/* a) Hero */}
        <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <h1 className="headline-display text-4xl md:text-6xl text-[#2A2416]">
              Fast, elegant, conversion-first websites
            </h1>
            <p className="text-base md:text-lg text-[#6B6152] max-w-2xl">
              We design and engineer bespoke websites and web applications that combine stunning design with lightning-fast performance.
            </p>

            {/* Sleek Rounded Rectangular Stat Chips */}
            <div className="flex flex-wrap gap-3 pt-2">
              <div className="bg-cream border border-tan px-4 py-2 rounded-xl flex items-center gap-2 shadow-sm font-semibold text-xs md:text-sm text-[#2A2416]">
                <img src="/icons/check.svg" alt="" className="w-4 h-4 text-[var(--accent)]" />
                <span>&lt;1s Page Load Benchmark</span>
              </div>
              <div className="bg-cream border border-tan px-4 py-2 rounded-xl flex items-center gap-2 shadow-sm font-semibold text-xs md:text-sm text-[#2A2416]">
                <img src="/icons/check.svg" alt="" className="w-4 h-4 text-[var(--accent)]" />
                <span>90+ Lighthouse Performance</span>
              </div>
              <div className="bg-cream border border-tan px-4 py-2 rounded-xl flex items-center gap-2 shadow-sm font-semibold text-xs md:text-sm text-[#2A2416]">
                <img src="/icons/check.svg" alt="" className="w-4 h-4 text-[var(--accent)]" />
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

          {/* Right Hero Image Card */}
          <div className="flex-1 w-full flex justify-center">
            <div className="paper-card p-3 bg-cream border border-tan shadow-card max-w-md w-full">
              <div className="aspect-[4/3] rounded-xl overflow-hidden relative bg-beige">
                <img
                  src="https://images.unsplash.com/photo-1467238307002-480ffdd960d3?auto=format&fit=crop&w=1000&q=80"
                  alt="Web Development & UI Design"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 flex justify-between items-center">
                <span className="font-display font-bold text-sm text-[#2A2416]">Web Development Agency</span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[var(--accent)]/15 text-[var(--accent)]">
                  Web Division
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* b) Services Grid */}
        <section className="section-muted py-20 px-6 md:px-12">
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
                <div key={i} className="paper-card p-6 bg-cream border border-tan space-y-3">
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

        {/* d) Portfolio Showcase */}
        <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <h2 className="headline-display text-3xl md:text-4xl text-[#2A2416]">Featured Web Projects</h2>
            <p className="text-[#6B6152] text-base">A selection of recent websites and web applications built by our team.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Fintech Portal', desc: 'Next.js banking portal with real-time dashboard analytics.', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80' },
              { name: 'E-commerce Brand', desc: 'Shopify & Headless Next.js storefront with 1.2s load speeds.', img: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=600&q=80' },
              { name: 'SaaS Platform Site', desc: 'High-converting product landing site with interactive pricing.', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80' }
            ].map((proj, idx) => (
              <div key={idx} className="paper-card p-4 bg-cream border border-tan space-y-3 group">
                <div className="aspect-video rounded-xl overflow-hidden relative bg-beige">
                  <img src={proj.img} alt={proj.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <h3 className="headline-display text-lg text-[#2A2416]">{proj.name}</h3>
                <p className="text-xs text-[#6B6152]">{proj.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* e) Tech Stack Chips */}
        <section className="py-20 section-muted">
          <div className="max-w-7xl mx-auto px-6 text-center space-y-8">
            <h2 className="headline-display text-3xl md:text-4xl text-[#2A2416]">Web Development Stack</h2>
            <div className="max-w-4xl mx-auto flex justify-center">
              <TechStackChips techs={webTechStack} />
            </div>
          </div>
        </section>

        {/* f) Testimonials */}
        {webTestimonials.length > 0 && (
          <section className="py-16">
            <Testimonial testimonials={webTestimonials} />
          </section>
        )}

        {/* g) Contact Section */}
        <ContactSection division="web" headline="Let's build a website that works as hard as you do." />
      </main>

      <Footer />
    </div>
  );
}
