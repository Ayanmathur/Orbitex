import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import StatWidget from '@/components/StatWidget';
import LeadForm from '@/components/LeadForm';

export const metadata: Metadata = {
  title: 'Digital Marketing — Orbitex',
};

const services = [
  { title: 'SEO', desc: 'Boost organic visibility and dominate search rankings.', icon: 'search' },
  { title: 'Google Ads', desc: 'High-intent search campaigns for immediate ROI.', icon: 'cursor' },
  { title: 'Meta Ads', desc: 'Targeted social campaigns on Facebook & Instagram.', icon: 'users' },
  { title: 'Social Media Marketing', desc: 'Build engaging communities and brand loyalty.', icon: 'heart' },
  { title: 'Website Development', desc: 'High-performance websites built for conversion.', icon: 'code', link: '/web' },
  { title: 'Branding', desc: 'Establish a memorable and cohesive brand identity.', icon: 'star' },
  { title: 'Content Marketing', desc: 'Valuable content that drives traffic and trust.', icon: 'document' },
  { title: 'AI Automation', desc: 'Streamline marketing with intelligent automation.', icon: 'lightning' },
];

const valueProps = [
  { title: 'Performance Focused', desc: 'We care about metrics that matter: ROI, ROAS, and CAC.' },
  { title: 'Data Driven', desc: 'Every decision is backed by comprehensive data analysis.' },
  { title: 'Creative Strategy', desc: 'Innovative campaigns that capture attention and convert.' },
  { title: 'Continuous Optimization', desc: 'Relentless testing and refinement for maximum growth.' },
];

const processSteps = ['Discovery', 'Research', 'Planning', 'Execution', 'Optimization', 'Growth'];

const industries = [
  'Healthcare', 'Education', 'Real Estate', 'Restaurants', 
  'Startups', 'Finance', 'E-commerce', 'Construction'
];

const faqs = [
  { q: 'How quickly will I see results?', a: 'SEO typically shows meaningful traction in 3–6 months. Paid campaigns often generate leads within the first week.' },
  { q: 'What platforms do you advertise on?', a: 'Google Ads, Meta (Facebook & Instagram), LinkedIn, and emerging platforms depending on your audience.' },
  { q: 'Do you require long-term contracts?', a: 'No. We work on month-to-month retainers, relying on our results to keep you as a partner.' },
  { q: 'How do you measure success?', a: 'We set clear KPIs at project kick-off, focusing on leads, cost per acquisition, and overall ROI.' },
  { q: 'Can you work with our existing brand guidelines?', a: 'Absolutely. We adapt to your brand voice and visual identity to ensure consistency.' },
];

export default function MarketingPage() {
  return (
    <main className="division-marketing min-h-screen bg-[var(--color-ivory)] text-[var(--color-near-black)]">
      <Nav />
      
      {/* Hero Section */}
      <section className="relative px-6 py-24 md:py-32 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 space-y-8">
          <h1 className="headline-display text-5xl md:text-7xl font-bold">
            Measurable growth. <span className="text-[var(--accent)]">Real results.</span>
          </h1>
          <p className="text-xl max-w-2xl text-[var(--color-warm-taupe)]">
            Data-driven performance marketing designed to scale your business predictably and profitably.
          </p>
          <div className="flex flex-wrap gap-4">
            <span className="paper-badge text-sm">+320% Organic Growth</span>
            <span className="paper-badge text-sm">4.8x ROAS</span>
            <span className="paper-badge text-sm">180% More Leads</span>
          </div>
          <button className="btn-primary">Get a Quote</button>
        </div>
        <div className="flex-1 w-full max-w-md">
          <StatWidget 
            title="Campaign Snapshot"
            mainMetric="4.8x" 
            trendValue="+23%" 
            trendPositive={true}
            footerStats={[
              { label: 'Organic Traffic', value: '+320%' },
              { label: 'Leads Generated', value: '2,847' },
              { label: 'CTR', value: '4.2%' },
            ]}
          />
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-muted px-6 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="headline-display text-4xl">Our Expertise</h2>
            <p className="text-lg text-[var(--color-warm-taupe)]">Comprehensive digital marketing services.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, i) => (
              <div key={i} className="paper-card p-6 flex flex-col items-start gap-4 hover:-translate-y-1 transition-transform">
                <div className="w-12 h-12 rounded-full bg-[var(--color-cream)] flex items-center justify-center border border-[var(--color-beige)]">
                  {/* Icon placeholder */}
                  <div className="w-6 h-6 border-2 border-[var(--color-near-black)] rounded-sm" />
                </div>
                <h3 className="font-bold text-xl">{service.title}</h3>
                <p className="text-[var(--color-warm-taupe)] text-sm">{service.desc}</p>
                {service.link && (
                  <Link href={service.link} className="text-[var(--accent)] text-sm font-medium hover:underline mt-auto">
                    Learn more &rarr;
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="px-6 py-24">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-6">
          {valueProps.map((prop, i) => (
            <div key={i} className="paper-card p-8 border-t-4 border-t-[var(--accent)]">
              <h3 className="font-bold mb-3">{prop.title}</h3>
              <p className="text-sm text-[var(--color-warm-taupe)]">{prop.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Process Timeline */}
      <section className="section-muted px-6 py-24">
        <div className="max-w-7xl mx-auto">
          <h2 className="headline-display text-4xl text-center mb-16">Our Proven Process</h2>
          <div className="flex flex-col md:flex-row justify-between items-center relative gap-8 md:gap-4">
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-[var(--color-beige)] -z-10" />
            {processSteps.map((step, i) => (
              <div key={i} className="flex flex-col items-center gap-4 bg-[var(--color-ivory)] md:bg-transparent p-4 md:p-0 rounded-xl z-10 w-full md:w-auto">
                <div className="w-10 h-10 rounded-full bg-[var(--accent)] text-white flex items-center justify-center font-bold">
                  {i + 1}
                </div>
                <span className="font-medium">{step}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Performance Metrics Band */}
      <section className="px-6 py-24">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          <h2 className="headline-display text-4xl">Illustrative benchmarks across client engagements</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="paper-card p-8 bg-[var(--color-cream)]">
              <div className="text-5xl font-bold text-[var(--accent)] mb-2">+320%</div>
              <div className="font-medium">Organic Traffic</div>
            </div>
            <div className="paper-card p-8 bg-[var(--color-cream)]">
              <div className="text-5xl font-bold text-[var(--accent)] mb-2">+180%</div>
              <div className="font-medium">Qualified Leads</div>
            </div>
            <div className="paper-card p-8 bg-[var(--color-cream)]">
              <div className="text-5xl font-bold text-[var(--accent)] mb-2">4.8x</div>
              <div className="font-medium">Return on Ad Spend</div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Served */}
      <section className="section-muted px-6 py-24">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="headline-display text-3xl mb-12">Industries We Serve</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {industries.map((ind, i) => (
              <div key={i} className="paper-badge px-6 py-3 text-lg font-medium">
                {ind}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="px-6 py-24 bg-[var(--color-near-black)] text-[var(--color-ivory)]">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="text-[var(--accent)] text-6xl font-serif">"</div>
          <p className="text-2xl md:text-4xl font-light italic leading-relaxed">
            Orbitex transformed our digital presence. Within 6 months, our inbound leads quadrupled, and our cost-per-acquisition dropped by 40%.
          </p>
          <div>
            <div className="font-bold">Sarah Jenkins</div>
            <div className="text-sm opacity-70">CMO, TechFlow Solutions</div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-24 max-w-3xl mx-auto space-y-12">
        <h2 className="headline-display text-4xl text-center">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <div key={i} className="paper-card p-6">
              <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                <span className="text-[var(--accent)]">Q.</span> {faq.q}
              </h3>
              <p className="text-[var(--color-warm-taupe)] pl-6">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Band */}
      <section className="cta-band px-6 py-24 bg-[var(--color-cream)] border-t border-[var(--color-beige)]">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <h2 className="headline-display text-4xl">Ready to grow?</h2>
            <p className="text-xl">Let's build your growth engine.</p>
          </div>
          <div className="flex-1 w-full">
            <div className="paper-card p-6 md:p-8 bg-white">
              <LeadForm division="marketing" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
