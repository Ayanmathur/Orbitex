import { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import StatWidget from '@/components/StatWidget';
import ValueCard from '@/components/ValueCard';
import Testimonial from '@/components/Testimonial';
import LeadForm from '@/components/LeadForm';
import Footer from '@/components/Footer';
import { hubStats, divisions, products, values, testimonials } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Orbitex | Software, Web, and Growth',
  description: 'Orbitex is a founder-led studio behind 6 products, 30+ client partnerships, and three specialist teams under one roof.',
};

export default function HubHome() {
  const hubTestimonials = testimonials.filter(t => t.divisions.includes('hub'));

  return (
    <div className="division-hub">
      <Nav />
      
      <main>
        {/* a) Hero */}
        <Hero
          headline="Software, web, and growth — engineered by one team."
          subheadline="Orbitex is a founder-led studio behind 6 products, 30+ client partnerships, and three specialist teams under one roof."
          primaryCta={{ text: 'Get a Quote', href: '#contact' }}
          secondaryCta={{ text: 'Explore Divisions', href: '#divisions' }}
          stats={hubStats}
        >
          <StatWidget 
            title="Growth Overview"
            mainMetric="30+"
            trendValue="+12%"
            trendPositive={true}
            footerStats={[
              { label: 'Products', value: '6' },
              { label: 'Divisions', value: '3' },
              { label: 'Clients', value: '30+' },
            ]}
          />
        </Hero>

        {/* b) Stat Bar */}
        <section className="py-12 section-muted">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-wrap justify-center gap-8 md:gap-16">
              {hubStats.map((stat, i) => (
                <div key={i} className="flex flex-col items-center bg-cream px-8 py-4 rounded-full shadow-sm border border-tan/30">
                  <span className="text-3xl font-display font-bold text-nearBlack">
                    {stat.value}{stat.suffix}
                  </span>
                  <span className="text-sm font-medium uppercase tracking-wider text-warmTaupe">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* c) Division Routing Cards */}
        <section id="divisions" className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="headline-display text-4xl md:text-5xl mb-6">Three specialist teams. One standard.</h2>
              <p className="text-lg text-warmTaupe max-w-2xl mx-auto">
                Whether you need a custom application, a high-converting website, or a growth engine, we have a dedicated division for it.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {divisions.map((div) => (
                <div 
                  key={div.id} 
                  className="paper-card flex flex-col group"
                  style={{ '--accent': div.accent } as React.CSSProperties}
                >
                  <div className="mb-6 flex items-center justify-between">
                    <div className="paper-badge bg-[var(--accent)]/10 text-[var(--accent)]">
                      <img 
                        src={`/icons/${div.icon}.svg`} 
                        alt={div.name} 
                        className="w-6 h-6"
                        style={{ filter: 'brightness(0) saturate(100%)' }} // Assuming CSS tinting logic or raw SVG usage
                      />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[var(--accent)]">
                      {div.id}
                    </span>
                  </div>
                  
                  <h3 className="headline-display text-2xl mb-2">{div.name}</h3>
                  <p className="text-warmTaupe font-medium mb-4">{div.tagline}</p>
                  
                  <p className="text-sm text-nearBlack/80 mb-8 flex-grow">
                    {div.description}
                  </p>
                  
                  <ul className="space-y-3 mb-8">
                    {div.capabilities.map((cap, i) => (
                      <li key={i} className="flex items-center text-sm font-medium">
                        <img src="/icons/check.svg" alt="Check" className="w-4 h-4 mr-3 opacity-50" />
                        {cap}
                      </li>
                    ))}
                  </ul>
                  
                  <Link 
                    href={div.href}
                    className="mt-auto inline-flex items-center text-[var(--accent)] font-bold hover:underline transition-all"
                  >
                    Explore {div.name}
                    <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* d) Products Strip */}
        <section className="py-24 section-muted overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 mb-12">
            <h2 className="headline-display text-4xl mb-4">Our Products</h2>
            <p className="text-warmTaupe text-lg">We build for clients, and we build for ourselves. Explore the Orbitex product ecosystem.</p>
          </div>
          
          <div className="flex overflow-x-auto pb-12 px-6 snap-x gap-6 max-w-7xl mx-auto hide-scrollbar">
            {products.map((product) => (
              <div 
                key={product.id}
                className={`paper-card min-w-[300px] md:min-w-[400px] snap-center flex flex-col ${product.comingSoon ? 'opacity-70 border-dashed bg-transparent' : ''}`}
              >
                <h3 className="font-display text-2xl mb-3 text-nearBlack">{product.name}</h3>
                <p className="text-warmTaupe text-sm mb-6 flex-grow">{product.description}</p>
                
                {product.comingSoon ? (
                  <div className="inline-flex items-center self-start text-xs font-bold uppercase tracking-widest text-warmTaupe bg-tan/20 px-3 py-1 rounded-full">
                    Coming Soon
                  </div>
                ) : (
                  <Link 
                    href={product.link}
                    className="inline-flex items-center font-bold text-nearBlack hover:text-nearBlack/70 transition-colors self-start mt-auto"
                  >
                    Visit Product <span className="ml-2">→</span>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* e) Brand Story */}
        <section className="py-24">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="headline-display text-4xl mb-10">Our Story</h2>
            <div className="space-y-6 text-lg text-nearBlack/90 leading-relaxed text-left md:text-center">
              <p>
                Orbitex began with a simple observation: founders were wasting too much time managing disconnected vendors. A software agency builds the app, a web design firm builds the marketing site, and an ad agency runs the growth campaigns. When things break, everyone points fingers.
              </p>
              <p>
                What started as a single developer taking on full-stack projects naturally evolved into something bigger. We realized that to deliver true value, we needed specialized expertise operating under one unified standard of quality.
              </p>
              <p>
                Today, Orbitex houses three distinct divisions—Software, Web, and Marketing—working in parallel. We've built 6 internal products, partnered with over 30 clients, and proved that a cohesive, full-cycle studio can outmaneuver fragmented agencies every time. We are building a long-term technology partner for modern businesses.
              </p>
            </div>
          </div>
        </section>

        {/* f) Values Grid */}
        <section className="py-24 section-muted">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="headline-display text-4xl">Our Principles</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {values.map((val, i) => (
                <ValueCard 
                  key={i}
                  title={val.title}
                  description={val.description}
                  icon={val.icon}
                />
              ))}
            </div>
          </div>
        </section>

        {/* g) Testimonial */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <Testimonial testimonials={hubTestimonials} />
          </div>
        </section>

        {/* h) CTA Band */}
        <section id="contact" className="py-24 bg-nearBlack text-ivory">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="headline-display text-4xl mb-6">Not sure which team you need? Let's talk.</h2>
            <p className="text-ivory/80 text-lg mb-12">
              Tell us about your project, and we'll route you to the right specialists.
            </p>
            
            <div className="bg-ivory text-nearBlack rounded-2xl p-8 md:p-12 text-left shadow-2xl">
              <LeadForm division="hub" />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
