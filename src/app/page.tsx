import { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import ServiceGrid from '@/components/ServiceGrid';
import BentoCollage from '@/components/BentoCollage';
import ProcessTimeline from '@/components/ProcessTimeline';
import ValueCard from '@/components/ValueCard';
import Testimonial from '@/components/Testimonial';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import { hubStats, divisions, products, values, testimonials } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Orbitex | Software, Web, and Growth Studio',
  description: 'Orbitex is a founder-led studio behind 6 products, 30+ client partnerships, and three specialist teams under one roof.',
};

const processSteps = [
  { title: 'Discovery & Vision', description: 'We analyze your business goals, target audience, and requirements to map out a strategic blueprint.', icon: 'search' },
  { title: 'Strategy & Architecture', description: 'Our engineering and creative leads design the technical architecture, UI, and roadmap.', icon: 'settings' },
  { title: 'Development & Build', description: 'We build with clean, scalable code and high-performance design patterns.', icon: 'check' },
  { title: 'Testing & Optimization', description: 'Rigorous testing, performance tuning, security scans, and Core Web Vitals optimization.', icon: 'star' },
  { title: 'Launch & Continuous Scale', description: 'Seamless deployment, monitoring, and ongoing support to ensure compounding growth.', icon: 'external-link' },
];

const hubServices = [
  { title: 'Web Application Development', description: 'We design and develop secure, scalable, and high-performance web applications blending modern design with powerful functionality.', icon: 'settings', isFeatured: true },
  { title: 'AI Automation & Systems', description: 'We create intelligent automation solutions that streamline workflows, reduce manual effort, and boost operational accuracy.', icon: 'star' },
  { title: 'Mobile App Engineering', description: 'Custom iOS & Android applications tailored to your business needs, built with Flutter and React Native.', icon: 'check' },
  { title: 'Responsive UI/UX & Craft', description: 'Intuitive, paper-diorama inspired interfaces delivering seamless, accessible user experiences across every device.', icon: 'external-link' },
];

export default function HubHome() {
  const hubTestimonials = testimonials.filter(t => t.divisions.includes('hub'));

  return (
    <div className="division-hub min-h-screen bg-ivory">
      <Nav />
      
      <main className="pt-24">
        {/* a) Hero */}
        <Hero
          headline="Software, web, and growth — engineered by one team."
          subheadline="Orbitex is a founder-led studio behind 6 products, 30+ client partnerships, and three specialist teams under one roof."
          primaryCta={{ text: 'Get a Quote', href: '#contact' }}
          secondaryCta={{ text: 'Explore Divisions', href: '#divisions' }}
          stats={hubStats}
          backgroundImage="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80"
        />


        {/* c) 4-Card Numbered Service Grid (Reference Translation Spec §1) */}
        <ServiceGrid
          services={hubServices}
          title="Engineered Capabilities"
          subtitle="Four core disciplines driving our product development and client engagements."
        />

        {/* d) Division Routing Cards */}
        <section id="divisions" className="py-20 section-muted">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16 space-y-3">
              <h2 className="headline-display text-3xl md:text-4xl text-[#2A2416]">Three specialist teams. One standard.</h2>
              <p className="text-base text-[#6B6152] max-w-2xl mx-auto">
                Whether you need a custom application, a high-converting website, or a performance marketing engine, we have a dedicated division for it.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {divisions.map((div) => (
                <div 
                  key={div.id} 
                  className="paper-card p-8 flex flex-col group bg-cream border border-tan tier-3"
                >
                  <div className="mb-6 flex items-center justify-between">
                    <div className="paper-badge bg-ivory text-[#2A2416] shadow-sm">
                      <img 
                        src={`/icons/${div.icon}.svg`} 
                        alt={div.name} 
                        className="w-5 h-5 opacity-80"
                      />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#6B6152] px-3 py-1 rounded-full bg-ivory border border-tan/40">
                      {div.id}
                    </span>
                  </div>
                  
                  <h3 className="headline-display text-2xl mb-2 text-[#2A2416]">{div.name}</h3>
                  <p className="text-[#6B6152] text-sm font-medium mb-4">{div.tagline}</p>
                  
                  <p className="text-xs md:text-sm text-[#2A2416]/80 mb-6 flex-grow leading-relaxed">
                    {div.description}
                  </p>
                  
                  <ul className="space-y-2.5 mb-8">
                    {div.capabilities.map((cap, i) => (
                      <li key={i} className="flex items-center text-xs font-semibold text-[#2A2416]">
                        <img src="/icons/check.svg" alt="Check" className="w-4 h-4 mr-2.5 opacity-70" />
                        {cap}
                      </li>
                    ))}
                  </ul>
                  
                  <Link 
                    href={div.href}
                    className="btn-outline mt-auto text-xs py-2.5 w-full justify-between group-hover:border-[var(--accent)] group-hover:text-[var(--accent)]"
                  >
                    <span>Explore {div.name}</span>
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* e) Products Showcase */}
        <section className="py-20 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 mb-10">
            <h2 className="headline-display text-3xl md:text-4xl mb-3 text-[#2A2416]">Our Products</h2>
            <p className="text-[#6B6152] text-base">We build for clients, and we build for ourselves. Explore the Orbitex product ecosystem.</p>
          </div>
          
          <div className="flex overflow-x-auto pb-8 px-6 snap-x gap-6 max-w-7xl mx-auto">
            {products.map((product) => (
              <div 
                key={product.id}
                className={`paper-card p-6 min-w-[280px] md:min-w-[360px] snap-center flex flex-col justify-between ${
                  product.comingSoon ? 'opacity-70 border-dashed bg-transparent' : 'bg-cream tier-3'
                }`}
              >
                <div>
                  <h3 className="headline-display text-xl mb-2 text-[#2A2416]">{product.name}</h3>
                  <p className="text-[#6B6152] text-xs leading-relaxed mb-6">{product.description}</p>
                </div>
                
                {product.comingSoon ? (
                  <span className="inline-flex items-center text-[10px] font-bold uppercase tracking-widest text-[#6B6152] bg-tan/30 px-3 py-1 rounded-full self-start">
                    Coming Soon
                  </span>
                ) : (
                  <Link 
                    href={product.link}
                    className="btn-outline text-xs py-2 px-4 inline-flex items-center self-start"
                  >
                    <span>Visit Product</span>
                    <span className="ml-1.5">→</span>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* f) Process Timeline with Paper Hole Punch & 3D Rope */}
        <ProcessTimeline steps={processSteps} />

        {/* g) Brand Story with Bento Collage */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
              <h2 className="headline-display text-3xl md:text-4xl text-[#2A2416]">Our Origin Story</h2>
              <p className="text-[#6B6152] text-base md:text-lg">
                Orbitex began with a simple observation: founders were wasting too much time managing disconnected vendors. A software agency builds the app, a web design firm builds the marketing site, and an ad agency runs the growth campaigns.
              </p>
            </div>

            <BentoCollage />
          </div>
        </section>

        {/* h) Values Grid */}
        <section className="py-20 section-muted">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-14">
              <h2 className="headline-display text-3xl md:text-4xl text-[#2A2416]">Our Core Principles</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
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

        {/* i) Testimonials */}
        <section className="py-16">
          <Testimonial testimonials={hubTestimonials} />
        </section>

        {/* j) Contact Section with Side-by-Side Growth Overview Card */}
        <ContactSection division="hub" />
      </main>

      <Footer />
    </div>
  );
}
