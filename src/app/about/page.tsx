import { Metadata } from 'next';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import TechStackChips from '@/components/TechStackChips';
import ValueCard from '@/components/ValueCard';
import LeadForm from '@/components/LeadForm';
import Footer from '@/components/Footer';
import { founder, values } from '@/lib/data';

export const metadata: Metadata = {
  title: 'About Us | Orbitex',
  description: 'Learn about the Orbitex origin story, our values, and the unified team behind our software, web, and marketing divisions.',
};

const techStack = [
  'Java', 'Flutter', 'React', 'Next.js', 'Python', 'Node.js', 
  'TypeScript', 'PostgreSQL', 'MongoDB', 'AWS', 'Docker', 
  'Kubernetes', 'SEO', 'Google Ads', 'Meta Ads', 'Analytics', 
  'Figma', 'Tailwind CSS'
];

export default function AboutPage() {
  return (
    <div className="division-hub">
      <Nav />
      
      <main>
        {/* Hero */}
        <Hero
          headline="Built on the belief that great products need one unified team."
          subheadline="We are builders, designers, and growth engineers committed to transparency, quality, and measurable results."
        />

        {/* Founder Section */}
        <section className="py-24 section-muted">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row gap-12 items-center md:items-start">
              <div className="w-full md:w-1/3">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-tan/30 relative paper-card p-2 border-0">
                  <div className="w-full h-full bg-cream rounded-xl flex items-center justify-center overflow-hidden">
                    <img 
                      src={founder.photo} 
                      alt={founder.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
              <div className="w-full md:w-2/3 md:pt-8">
                <h2 className="headline-display text-3xl mb-2">{founder.name}</h2>
                <p className="text-warmTaupe font-medium uppercase tracking-widest text-sm mb-8">{founder.title}</p>
                <div className="text-xl leading-relaxed text-nearBlack italic relative">
                  <span className="absolute -top-6 -left-4 text-6xl text-tan opacity-50 font-display">"</span>
                  <p className="relative z-10">{founder.bio}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Origin Story */}
        <section className="py-24">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="headline-display text-4xl mb-10 text-center">The Orbitex Evolution</h2>
            
            <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-tan before:to-transparent">
              
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-cream bg-nearBlack text-ivory font-bold shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  1
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] paper-card p-6 rounded-2xl">
                  <h3 className="font-bold text-xl mb-2">The Solo Foundation</h3>
                  <p className="text-warmTaupe">What started as a single developer taking on end-to-end projects built a foundation of full-stack understanding and uncompromising quality.</p>
                </div>
              </div>

              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-cream bg-nearBlack text-ivory font-bold shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  2
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] paper-card p-6 rounded-2xl">
                  <h3 className="font-bold text-xl mb-2">The Division Split</h3>
                  <p className="text-warmTaupe">As client needs grew, we realized specialization was key. We formed three distinct teams: Software, Web, and Marketing—experts in their craft, united under one standard.</p>
                </div>
              </div>

              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-cream bg-nearBlack text-ivory font-bold shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  3
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] paper-card p-6 rounded-2xl">
                  <h3 className="font-bold text-xl mb-2">6 Products, 30+ Clients</h3>
                  <p className="text-warmTaupe">Today, we don't just build for others; we build for ourselves. This dual experience as an agency and a product studio gives us unmatched perspective on what it takes to succeed.</p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="py-24 section-muted overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="headline-display text-4xl mb-6">Our Capabilities & Stack</h2>
            <p className="text-warmTaupe text-lg max-w-2xl mx-auto mb-12">
              We leverage modern, battle-tested technologies to deliver performant, scalable, and secure solutions.
            </p>
            <div className="max-w-4xl mx-auto">
              <TechStackChips techs={techStack} />
            </div>
          </div>
        </section>

        {/* Values Grid */}
        <section className="py-24">
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

        {/* CTA Band */}
        <section id="contact" className="py-24 bg-nearBlack text-ivory">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="headline-display text-4xl mb-6">Ready to build something great?</h2>
            <p className="text-ivory/80 text-lg mb-12">
              Get in touch to discuss your next project, whether it's software, web, or growth.
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
