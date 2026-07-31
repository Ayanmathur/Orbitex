import React from 'react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import BentoCollage from '@/components/BentoCollage';
import TechStackChips from '@/components/TechStackChips';
import ValueCard from '@/components/ValueCard';
import ContactSection from '@/components/ContactSection';
import { founder, values } from '@/lib/data';

export const metadata = {
  title: 'About Us | Orbitex Studio',
  description: 'Learn about the Orbitex origin story, founder Ayan Mathur, principles, and capabilities.',
};

const techStack = [
  'Java', 'Flutter', 'React', 'Next.js', 'Python', 'Node.js', 
  'TypeScript', 'PostgreSQL', 'MongoDB', 'AWS', 'Docker', 
  'Kubernetes', 'SEO', 'Google Ads', 'Meta Ads', 'Analytics', 
  'Figma', 'Tailwind CSS'
];

export default function AboutPage() {
  return (
    <div className="division-hub min-h-screen bg-ivory text-[#2A2416]">
      <Nav />
      
      <main className="pt-24">
        {/* Hero */}
        <Hero
          headline="Built on the belief that great products need one unified team."
          subheadline="We are builders, designers, and growth engineers committed to transparency, quality, and measurable results."
          primaryCta={{ text: 'Get in Touch', href: '#contact' }}
        />

        {/* Founder Section */}
        <section className="py-20 section-muted">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row gap-12 items-center md:items-start">
              <div className="w-full md:w-1/3">
                <div className="paper-card p-3 bg-cream border border-tan shadow-paper">
                  <div className="aspect-[4/5] rounded-xl overflow-hidden relative bg-beige">
                    <img 
                      src={founder.photo} 
                      alt={founder.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
              <div className="w-full md:w-2/3 md:pt-4 space-y-4">
                <h2 className="headline-display text-3xl md:text-4xl text-[#2A2416]">{founder.name}</h2>
                <p className="text-xs font-bold uppercase tracking-widest text-[#6B6152] px-3 py-1 bg-cream border border-tan/60 inline-block rounded-full">
                  {founder.title} & Lead Engineer
                </p>
                <div className="text-base md:text-lg leading-relaxed text-[#2A2416] italic relative pt-4">
                  <p className="relative z-10">"{founder.bio}"</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bento Collage Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
              <h2 className="headline-display text-3xl md:text-4xl text-[#2A2416]">The Orbitex Studio</h2>
              <p className="text-[#6B6152] text-base">A look into our multi-disciplinary product engineering and design environment.</p>
            </div>
            <BentoCollage />
          </div>
        </section>

        {/* Tech Stack */}
        <section className="py-20 section-muted">
          <div className="max-w-7xl mx-auto px-6 text-center space-y-8">
            <h2 className="headline-display text-3xl md:text-4xl text-[#2A2416]">Capabilities & Technologies</h2>
            <p className="text-[#6B6152] text-base max-w-xl mx-auto">
              Battle-tested tools and frameworks used across our software, web, and growth operations.
            </p>
            <div className="max-w-4xl mx-auto flex justify-center">
              <TechStackChips techs={techStack} />
            </div>
          </div>
        </section>

        {/* Principles */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-14">
              <h2 className="headline-display text-3xl md:text-4xl text-[#2A2416]">Our Operating Principles</h2>
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

        {/* Contact Section */}
        <ContactSection division="hub" />
      </main>

      <Footer />
    </div>
  );
}
