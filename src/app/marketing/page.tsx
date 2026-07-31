import React from 'react';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ProcessTimeline from '@/components/ProcessTimeline';
import ContactSection from '@/components/ContactSection';
import Testimonial from '@/components/Testimonial';
import { testimonials } from '@/lib/data';

export const metadata = {
  title: 'Digital Marketing — Orbitex',
  description: 'Performance-driven digital marketing, SEO, paid ads, content, and growth strategy.',
};

const marketingSteps = [
  { title: 'Audits & Keyword Research', description: 'Comprehensive SEO, competitor landscape, and historical ad account analysis.', icon: 'search' },
  { title: 'Growth Strategy', description: 'Building custom multi-channel acquisition funnels tailored to your ideal customer profile.', icon: 'settings' },
  { title: 'Campaign Setup & Launch', description: 'Deploying high-intent search ads, Meta social campaigns, and retargeting workflows.', icon: 'check' },
  { title: 'Continuous CRO & A/B Testing', description: 'Testing ad copy, landing pages, creative assets, and bidding strategies.', icon: 'star' },
  { title: 'Compounding Scale', description: 'Doubling down on winning channels to scale ROAS and drive predictable monthly leads.', icon: 'external-link' },
];

export default function MarketingDivisionPage() {
  const marketingTestimonials = testimonials.filter(t => t.divisions.includes('marketing'));

  return (
    <div className="division-marketing min-h-screen bg-ivory text-[#2A2416]">
      <Nav />

      <main className="pt-24">
        {/* a) Hero */}
        <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <h1 className="headline-display text-4xl md:text-6xl text-[#2A2416]">
              Measurable growth. Real results.
            </h1>
            <p className="text-base md:text-lg text-[#6B6152] max-w-2xl">
              We engineer performance marketing campaigns that compound — combining technical SEO, high-converting paid ads, and content strategy.
            </p>

            {/* Sleek Rounded Rectangular Stat Chips */}
            <div className="flex flex-wrap gap-3 pt-2">
              <div className="bg-cream border border-tan px-4 py-2 rounded-xl flex items-center gap-2 shadow-sm font-semibold text-xs md:text-sm text-[#2A2416]">
                <img src="/icons/check.svg" alt="" className="w-4 h-4 text-[var(--accent)]" />
                <span>+320% Organic Search Traffic</span>
              </div>
              <div className="bg-cream border border-tan px-4 py-2 rounded-xl flex items-center gap-2 shadow-sm font-semibold text-xs md:text-sm text-[#2A2416]">
                <img src="/icons/check.svg" alt="" className="w-4 h-4 text-[var(--accent)]" />
                <span>4.8x Average Return on Ad Spend</span>
              </div>
              <div className="bg-cream border border-tan px-4 py-2 rounded-xl flex items-center gap-2 shadow-sm font-semibold text-xs md:text-sm text-[#2A2416]">
                <img src="/icons/check.svg" alt="" className="w-4 h-4 text-[var(--accent)]" />
                <span>+180% Qualified Lead Growth</span>
              </div>
            </div>

            <div className="pt-4">
              <Link href="#contact" className="btn-primary">
                <span>Get a Growth Quote</span>
                <img src="/icons/arrow-cta.svg" alt="" className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Hero Image Card */}
          <div className="flex-1 w-full flex justify-center">
            <div className="paper-card p-3 bg-cream border border-tan shadow-card max-w-md w-full">
              <div className="aspect-[4/3] rounded-xl overflow-hidden relative bg-beige">
                <img
                  src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1000&q=80"
                  alt="Digital Marketing Strategy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 flex justify-between items-center">
                <span className="font-display font-bold text-sm text-[#2A2416]">Digital Marketing Division</span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[var(--accent)]/15 text-[var(--accent)]">
                  Marketing Division
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* b) 8 Service Cards */}
        <section className="section-muted py-20 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
              <h2 className="headline-display text-3xl md:text-4xl text-[#2A2416]">Growth Services</h2>
              <p className="text-[#6B6152] text-base">Full-funnel digital marketing tailored to software, web, and B2B growth.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'Technical SEO', desc: 'Dominating organic search rankings through technical audits and content hubs.', icon: 'search' },
                { title: 'Google Ads', desc: 'High-intent search and shopping campaigns focused on direct ROAS.', icon: 'check' },
                { title: 'Meta Paid Social', desc: 'Targeted Facebook & Instagram creative funnels driving brand awareness.', icon: 'external-link' },
                { title: 'Social Media Strategy', desc: 'Consistent brand authority building across LinkedIn, X, and Instagram.', icon: 'star' },
                { title: 'Website Optimization', desc: 'Seamlessly cross-linking with our Web Division for high-converting landing pages.', icon: 'settings' },
                { title: 'Branding & Identity', desc: 'Crafting memorable brand guidelines, positioning, and visual identity.', icon: 'edit' },
                { title: 'Content Marketing', desc: 'Thought leadership articles, whitepapers, and copy that converts visitors.', icon: 'copy' },
                { title: 'AI Growth Automation', desc: 'Automating lead scoring, email nurturing, and reporting dashboards.', icon: 'clock' }
              ].map((s, i) => (
                <div key={i} className="paper-card p-6 bg-cream border border-tan space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-ivory border border-tan flex items-center justify-center shadow-sm">
                    <img src={`/icons/${s.icon}.svg`} alt="" className="w-5 h-5 opacity-75" />
                  </div>
                  <h3 className="headline-display text-lg text-[#2A2416]">{s.title}</h3>
                  <p className="text-[#6B6152] text-xs leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* c) Process Timeline */}
        <ProcessTimeline steps={marketingSteps} title="6-Step Growth Framework" />

        {/* d) Illustrative Performance Metrics Band */}
        <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <h2 className="headline-display text-3xl md:text-4xl text-[#2A2416]">Illustrative Benchmarks</h2>
            <p className="text-[#6B6152] text-base">Average performance metrics achieved across multi-channel client engagements.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="paper-card p-8 text-center bg-cream border border-tan space-y-2">
              <span className="headline-display text-4xl font-bold text-[var(--accent)]">+320%</span>
              <h3 className="font-bold text-base text-[#2A2416]">Organic Traffic Growth</h3>
              <p className="text-xs text-[#6B6152]">Within 6 months of technical SEO execution</p>
            </div>
            <div className="paper-card p-8 text-center bg-cream border border-tan space-y-2">
              <span className="headline-display text-4xl font-bold text-[var(--accent)]">+180%</span>
              <h3 className="font-bold text-base text-[#2A2416]">Qualified Leads</h3>
              <p className="text-xs text-[#6B6152]">Combined search and paid social funnels</p>
            </div>
            <div className="paper-card p-8 text-center bg-cream border border-tan space-y-2">
              <span className="headline-display text-4xl font-bold text-[var(--accent)]">4.8x</span>
              <h3 className="font-bold text-base text-[#2A2416]">Return on Ad Spend</h3>
              <p className="text-xs text-[#6B6152]">Across Google Ads & Meta advertising</p>
            </div>
          </div>
        </section>

        {/* e) Testimonials */}
        {marketingTestimonials.length > 0 && (
          <section className="py-16 section-muted">
            <Testimonial testimonials={marketingTestimonials} />
          </section>
        )}

        {/* f) Contact Section */}
        <ContactSection division="marketing" headline="Ready to grow? Let's build your growth engine." />
      </main>

      <Footer />
    </div>
  );
}
