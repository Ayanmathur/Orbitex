import React from 'react';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ProcessTimeline from '@/components/ProcessTimeline';
import ContactSection from '@/components/ContactSection';
import Testimonial from '@/components/Testimonial';
import { testimonials } from '@/lib/data';
import TornStrip from '@/components/TornStrip';

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
        {/* a) Hero with Background Image & Warm Paper Overlay */}
        <section className="relative min-h-[85vh] flex items-center overflow-hidden">
          {/* Background Image Layer (Tier 1-2) */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1600&q=80" 
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
              <h1 className="headline-display text-4xl md:text-6xl text-[#2A2416] leading-tight">
                Measurable growth. Real results.
              </h1>
              <p className="text-base md:text-lg text-[#4A4236] max-w-2xl font-medium leading-relaxed">
                We engineer performance marketing campaigns that compound — combining technical SEO, high-converting paid ads, and content strategy.
              </p>

              {/* Sleek Rounded Rectangular Stat Chips */}
              <div className="flex flex-wrap gap-3 pt-2">
                <div className="bg-cream/80 border border-tan px-4 py-2 rounded-xl flex items-center gap-2 shadow-sm font-semibold text-xs md:text-sm text-[#2A2416]">
                  <img src="/icons/check.svg" alt="" className="w-4 h-4" />
                  <span>+320% Organic Search Traffic</span>
                </div>
                <div className="bg-cream/80 border border-tan px-4 py-2 rounded-xl flex items-center gap-2 shadow-sm font-semibold text-xs md:text-sm text-[#2A2416]">
                  <img src="/icons/check.svg" alt="" className="w-4 h-4" />
                  <span>4.8x Average Return on Ad Spend</span>
                </div>
                <div className="bg-cream/80 border border-tan px-4 py-2 rounded-xl flex items-center gap-2 shadow-sm font-semibold text-xs md:text-sm text-[#2A2416]">
                  <img src="/icons/check.svg" alt="" className="w-4 h-4" />
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
          </div>
        </section>

        {/* b) 8 Service Cards */}
        <section className="py-20 px-6 md:px-12">
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
                <div key={i} className="paper-card p-6 bg-cream border border-tan space-y-3 tier-3 fold-corner">
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
        <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto section-muted">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <h2 className="headline-display text-3xl md:text-4xl text-[#2A2416]">Illustrative Benchmarks</h2>
            <p className="text-[#6B6152] text-base">Average performance metrics achieved across multi-channel client engagements.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="paper-card p-8 text-center bg-cream border border-tan space-y-2 tier-3 fold-corner">
              <span className="headline-display text-4xl font-bold text-[var(--accent)]">+320%</span>
              <h3 className="font-bold text-base text-[#2A2416]">Organic Traffic Growth</h3>
              <p className="text-xs text-[#6B6152]">Within 6 months of technical SEO execution</p>
            </div>
            <div className="paper-card p-8 text-center bg-cream border border-tan space-y-2 tier-3 fold-corner">
              <span className="headline-display text-4xl font-bold text-[var(--accent)]">+180%</span>
              <h3 className="font-bold text-base text-[#2A2416]">Qualified Leads</h3>
              <p className="text-xs text-[#6B6152]">Combined search and paid social funnels</p>
            </div>
            <div className="paper-card p-8 text-center bg-cream border border-tan space-y-2 tier-3 fold-corner">
              <span className="headline-display text-4xl font-bold text-[var(--accent)]">4.8x</span>
              <h3 className="font-bold text-base text-[#2A2416]">Return on Ad Spend</h3>
              <p className="text-xs text-[#6B6152]">Across Google Ads & Meta advertising</p>
            </div>
          </div>
        </section>

        {/* e) Testimonials */}
        {marketingTestimonials.length > 0 && (
          <section className="py-16">
            <Testimonial testimonials={marketingTestimonials} />
          </section>
        )}

        {/* f) Contact Section */}
        <ContactSection division="marketing" headline="Ready to grow? Let's build your growth engine." />
        <TornStrip />
      </main>

      <Footer />
    </div>
  );
}
