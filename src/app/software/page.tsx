import React from 'react';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ProcessTimeline from '@/components/ProcessTimeline';
import ContactSection from '@/components/ContactSection';
import Testimonial from '@/components/Testimonial';
import TechStackChips from '@/components/TechStackChips';
import { products, testimonials } from '@/lib/data';

export const metadata = {
  title: 'Software Development — Orbitex',
  description: 'Custom software built to run your business with reliability and scale.',
};

const softwareSteps = [
  { title: 'Discovery & Audit', description: 'Deep dive into business requirements, existing systems, and technical constraints.', icon: 'search' },
  { title: 'System Architecture', description: 'Designing high-performance backend, database schema, and API contracts.', icon: 'settings' },
  { title: 'Agile Engineering', description: 'Sprint-based development with continuous integration and clean code standards.', icon: 'check' },
  { title: 'QA & Security Scans', description: 'Automated testing, load testing, SAST security checks, and code reviews.', icon: 'star' },
  { title: 'Ship & Maintain', description: 'Zero-downtime deployment and long-term maintenance & support retainers.', icon: 'external-link' },
];

const techStack = [
  'Java', 'Python', 'TypeScript', 'React', 'Next.js', 'Node.js', 
  'Flutter', 'PostgreSQL', 'MongoDB', 'Redis', 'Docker', 
  'Kubernetes', 'AWS', 'GraphQL', 'REST APIs'
];

export default function SoftwareDivisionPage() {
  const softwareProducts = products.filter(p => p.division === 'software');
  const softwareTestimonials = testimonials.filter(t => t.divisions.includes('software'));

  return (
    <div className="division-software min-h-screen bg-ivory text-[#2A2416]">
      <Nav />

      <main className="pt-24">
        {/* a) Hero */}
        <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <h1 className="headline-display text-4xl md:text-6xl text-[#2A2416]">
              Custom software built to run your business
            </h1>
            <p className="text-base md:text-lg text-[#6B6152] max-w-2xl">
              We build reliable, scalable software solutions that solve real business problems. From complex internal tools to customer-facing platforms.
            </p>
            
            {/* Sleek Rounded Rectangular Stat Chips */}
            <div className="flex flex-wrap gap-3 pt-2">
              <div className="bg-cream border border-tan px-4 py-2 rounded-xl flex items-center gap-2 shadow-sm font-semibold text-xs md:text-sm text-[#2A2416]">
                <img src="/icons/check.svg" alt="" className="w-4 h-4 text-[var(--accent)]" />
                <span>99.9% Uptime Benchmark</span>
              </div>
              <div className="bg-cream border border-tan px-4 py-2 rounded-xl flex items-center gap-2 shadow-sm font-semibold text-xs md:text-sm text-[#2A2416]">
                <img src="/icons/check.svg" alt="" className="w-4 h-4 text-[var(--accent)]" />
                <span>6 Internal Products Shipped</span>
              </div>
              <div className="bg-cream border border-tan px-4 py-2 rounded-xl flex items-center gap-2 shadow-sm font-semibold text-xs md:text-sm text-[#2A2416]">
                <img src="/icons/check.svg" alt="" className="w-4 h-4 text-[var(--accent)]" />
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

          {/* Right Hero Image Card */}
          <div className="flex-1 w-full flex justify-center">
            <div className="paper-card p-3 bg-cream border border-tan shadow-card max-w-md w-full">
              <div className="aspect-[4/3] rounded-xl overflow-hidden relative bg-beige">
                <img
                  src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80"
                  alt="Software Architecture & Engineering"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 flex justify-between items-center">
                <span className="font-display font-bold text-sm text-[#2A2416]">Full-Stack Software Studio</span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[var(--accent)]/15 text-[var(--accent)]">
                  Software Division
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* b) Services Grid */}
        <section className="section-muted py-20 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
              <h2 className="headline-display text-3xl md:text-4xl text-[#2A2416]">Software Capabilities</h2>
              <p className="text-[#6B6152] text-base">Bespoke software development engineered for performance and durability.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'Custom Software Development', desc: 'End-to-end bespoke solutions tailored to your unique workflows and requirements.', icon: 'settings' },
                { title: 'Product Engineering', desc: 'Building scalable SaaS platforms and digital products from scratch.', icon: 'check' },
                { title: 'API & Backend Systems', desc: 'Robust architectures powering your data and third-party integrations.', icon: 'external-link' },
                { title: 'AI & Automation Integration', desc: 'Leveraging intelligence to streamline operations and save manual effort.', icon: 'star' },
                { title: 'Maintenance & Support', desc: 'Ongoing SLA support to ensure your software never misses a beat.', icon: 'clock' }
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

        {/* c) Products Showcase */}
        <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <h2 className="headline-display text-3xl md:text-4xl text-[#2A2416]">6 Products Showcase</h2>
            <p className="text-[#6B6152] text-base">In-house software products developed and maintained by our software engineering division.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {softwareProducts.map((p, i) => (
              <div key={i} className={`paper-card p-8 flex flex-col justify-between bg-cream border border-tan ${p.comingSoon ? 'border-dashed opacity-85' : ''}`}>
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
                    <Link href={p.link} className="btn-outline text-xs py-2 px-4 inline-flex items-center">
                      <span>Explore Product</span>
                      <span className="ml-1.5">→</span>
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* d) Process Timeline with Paper Hole Punches & Rope */}
        <ProcessTimeline steps={softwareSteps} title="Software Engineering Process" />

        {/* e) Tech Stack Chips */}
        <section className="py-20 section-muted">
          <div className="max-w-7xl mx-auto px-6 text-center space-y-8">
            <h2 className="headline-display text-3xl md:text-4xl text-[#2A2416]">Technology Stack</h2>
            <p className="text-[#6B6152] text-base max-w-xl mx-auto">
              Modern languages, frameworks, and infrastructure tools powering our software architectures.
            </p>
            <div className="max-w-4xl mx-auto flex justify-center">
              <TechStackChips techs={techStack} />
            </div>
          </div>
        </section>

        {/* f) Testimonial */}
        {softwareTestimonials.length > 0 && (
          <section className="py-16">
            <Testimonial testimonials={softwareTestimonials} />
          </section>
        )}

        {/* g) Contact Section with Side-by-Side Growth Overview Widget Card */}
        <ContactSection division="software" headline="Ready to build something that lasts?" />
      </main>

      <Footer />
    </div>
  );
}
