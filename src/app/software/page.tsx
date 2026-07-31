import React from 'react';
import Link from 'next/link';
import { products, testimonials, Testimonial } from '@/lib/data';
import Image from 'next/image';

// Inline simple StatWidget and LeadForm if they don't exist
const StatWidget = ({ main, label, trend, footerStats }: { main: string; label: string; trend: string; footerStats: { label: string; value: string }[] }) => (
  <div className="paper-card p-6 flex flex-col gap-4 max-w-sm mt-8 relative z-10 bg-[#F5EFE3]">
    <div className="flex justify-between items-start">
      <div>
        <div className="text-4xl font-bold font-fraunces text-[var(--accent)]">{main}</div>
        <div className="text-sm text-[#6B6152] font-medium mt-1 uppercase tracking-wider">{label}</div>
      </div>
      <div className="paper-badge bg-[#F5EFE3] text-green-700 border-green-200">{trend}</div>
    </div>
    <div className="h-px w-full bg-[#D9C8A9]" />
    <div className="flex justify-between text-sm">
      {footerStats.map((stat, i) => (
        <div key={i} className="flex flex-col">
          <span className="text-[#6B6152]">{stat.label}</span>
          <span className="font-semibold text-[#2A2416]">{stat.value}</span>
        </div>
      ))}
    </div>
  </div>
);

const LeadForm = ({ division }: { division: string }) => (
  <form className="flex flex-col gap-4 max-w-md mx-auto w-full paper-card p-8 bg-[#F5EFE3]">
    <h3 className="text-xl font-bold font-fraunces mb-2">Request a Quote</h3>
    <input type="text" placeholder="Name" className="form-input" required />
    <input type="email" placeholder="Email" className="form-input" required />
    <textarea placeholder="Project Details" className="form-input" rows={4} required></textarea>
    <button type="submit" className="btn-primary w-full mt-2">Get a Quote</button>
  </form>
);

export const metadata = {
  title: 'Software Development — Orbitex',
  description: 'Custom software built to run your business with reliability and scale.',
};

export default function SoftwareDivisionPage() {
  const softwareProducts = products.filter(p => p.division === 'software');
  const softwareTestimonials = testimonials.filter(t => t.divisions.includes('software'));

  return (
    <div className="division-software min-h-screen bg-[#FBF7F0] text-[#2A2416]">
      {/* a) Hero */}
      <section className="pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1">
          <h1 className="headline-display text-5xl md:text-7xl mb-6">Custom software built to run your business</h1>
          <p className="text-xl text-[#6B6152] mb-8 max-w-2xl">
            We build reliable, scalable software solutions that solve real business problems. From complex internal tools to customer-facing platforms.
          </p>
          <div className="flex flex-wrap gap-3 mb-8">
            <span className="paper-badge">99.9% Uptime</span>
            <span className="paper-badge">6 Products Shipped</span>
            <span className="paper-badge">30+ Clients</span>
          </div>
          <button className="btn-primary">Get a Quote</button>
        </div>
        <div className="flex-1 w-full flex justify-end">
          <StatWidget 
            main="99.9%" 
            label="Uptime" 
            trend="+2.3%" 
            footerStats={[
              { label: 'Deploys', value: '847' },
              { label: 'Response Time', value: '42ms' },
              { label: 'Tests Passing', value: '100%' }
            ]} 
          />
        </div>
      </section>

      {/* b) Services Grid */}
      <section className="section-muted py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold font-fraunces mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Custom Software Development', desc: 'End-to-end bespoke solutions tailored to your unique workflows.' },
              { title: 'Product Engineering', desc: 'Building scalable SaaS platforms and digital products from scratch.' },
              { title: 'API & Backend Systems', desc: 'Robust architectures powering your data and integrations.' },
              { title: 'AI & Automation Integration', desc: 'Leveraging intelligence to streamline operations and save time.' },
              { title: 'Maintenance & Support', desc: 'Ongoing care to ensure your software never misses a beat.' }
            ].map((s, i) => (
              <div key={i} className="paper-card p-6 bg-[#F5EFE3]">
                <img src="/icons/settings.svg" alt="icon" className="w-8 h-8 mb-4 opacity-80" />
                <h3 className="text-xl font-bold mb-2">{s.title}</h3>
                <p className="text-[#6B6152] text-sm line-clamp-2">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* c) Products Showcase */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold font-fraunces mb-12">6 Products Showcase</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {softwareProducts.map((p, i) => (
            <div key={i} className={`paper-card p-8 flex flex-col gap-4 bg-[#F5EFE3] ${p.comingSoon ? 'border-dashed border-2 opacity-80' : ''}`}>
              <h3 className="text-2xl font-bold font-fraunces text-[var(--accent)]">{p.name}</h3>
              <p className="text-sm font-semibold text-[#6B6152] uppercase tracking-wide">The Problem</p>
              <p className="mb-2 text-[#2A2416]">Navigating scattered tools and disconnected workflows was costing hours.</p>
              <p className="text-sm font-semibold text-[#6B6152] uppercase tracking-wide">What We Built</p>
              <p className="mb-4 text-[#6B6152] flex-grow">{p.description}</p>
              {p.comingSoon ? (
                <span className="paper-badge self-start mt-auto">Coming Soon</span>
              ) : (
                <Link href={p.link} className="text-[var(--accent)] font-semibold hover:underline inline-flex items-center gap-2 mt-auto">
                  View Product <img src="/icons/arrow-cta.svg" alt="arrow" className="w-4 h-4" />
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* d) Process Timeline */}
      <section className="section-muted py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold font-fraunces mb-12 text-center">How We Work</h2>
          <div className="flex flex-col md:flex-row gap-4 justify-between items-start text-center max-w-4xl mx-auto">
            {['Discover', 'Scope', 'Build', 'Test', 'Ship & Support'].map((step, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-4 relative">
                <div className="w-12 h-12 rounded-full bg-[var(--accent)] text-white flex items-center justify-center font-bold font-fraunces text-xl z-10">
                  {i + 1}
                </div>
                {i < 4 && <div className="hidden md:block absolute top-6 left-1/2 w-full h-px bg-[#D9C8A9] -z-0" />}
                <div className="font-semibold">{step}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* e) Tech Stack Chips */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto text-center">
        <h2 className="text-2xl font-bold font-fraunces mb-8">Our Tech Stack</h2>
        <div className="flex flex-wrap justify-center gap-3">
          {['Java', 'Python', 'TypeScript', 'React', 'Next.js', 'Node.js', 'Flutter', 'PostgreSQL', 'MongoDB', 'Redis', 'Docker', 'Kubernetes', 'AWS', 'GraphQL', 'REST APIs'].map((tech) => (
            <span key={tech} className="paper-badge text-lg px-4 py-2 border-[#D9C8A9] text-[#6B6152]">{tech}</span>
          ))}
        </div>
      </section>

      {/* f) Testimonial */}
      {softwareTestimonials.length > 0 && (
        <section className="section-muted py-24 px-6 md:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold font-fraunces mb-12">Client Success</h2>
            <div className="paper-card p-8 md:p-12 bg-[#F5EFE3] text-left relative">
              <img src="/icons/star.svg" alt="star" className="w-8 h-8 mb-6 text-[var(--accent)]" />
              <p className="text-xl md:text-2xl font-medium mb-8 leading-relaxed text-[#2A2416]">
                "{softwareTestimonials[0].quote}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#D9C8A9]" />
                <div>
                  <div className="font-bold">{softwareTestimonials[0].author}</div>
                  <div className="text-sm text-[#6B6152]">{softwareTestimonials[0].role}, {softwareTestimonials[0].company}</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* g) FAQ */}
      <section className="py-24 px-6 md:px-12 max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold font-fraunces mb-12 text-center">Frequently Asked Questions</h2>
        <div className="flex flex-col gap-4">
          {[
            { q: 'Who owns the code?', a: 'You do. 100% IP ownership transfers to you on delivery.' },
            { q: 'What tech stack do you use?', a: 'We pick the right tool for the job, favoring modern and robust technologies like React, Node.js, and PostgreSQL.' },
            { q: 'How long does a typical project take?', a: 'Most projects run 8–16 weeks depending on scope and complexity.' },
            { q: 'Do you handle maintenance after launch?', a: 'Yes. We offer ongoing support and maintenance retainers.' },
            { q: 'Can you integrate with our existing systems?', a: 'Absolutely. API-first architecture is our specialty.' }
          ].map((faq, i) => (
            <details key={i} className="paper-card p-6 bg-[#F5EFE3] group cursor-pointer">
              <summary className="font-bold text-lg list-none flex justify-between items-center">
                {faq.q}
                <img src="/icons/chevron-down.svg" alt="expand" className="w-5 h-5 group-open:rotate-180 transition-transform" />
              </summary>
              <p className="mt-4 text-[#6B6152] leading-relaxed">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* h) CTA Band */}
      <section className="cta-band py-24 px-6 md:px-12 bg-[var(--accent)] text-white text-center rounded-t-[40px] mt-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold font-fraunces mb-8">Ready to build something that lasts?</h2>
          <LeadForm division="software" />
        </div>
      </section>
    </div>
  );
}
