import React from 'react';
import Link from 'next/link';
import { testimonials } from '@/lib/data';

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
  <form className="flex flex-col gap-4 max-w-md mx-auto w-full paper-card p-8 bg-[#F5EFE3] text-left text-[#2A2416]">
    <h3 className="text-xl font-bold font-fraunces mb-2">Request a Quote</h3>
    <input type="text" placeholder="Name" className="form-input" required />
    <input type="email" placeholder="Email" className="form-input" required />
    <textarea placeholder="Project Details" className="form-input" rows={4} required></textarea>
    <button type="submit" className="btn-primary w-full mt-2">Get a Quote</button>
  </form>
);

export const metadata = {
  title: 'Web Development — Orbitex',
  description: 'Fast, elegant, conversion-first websites and web applications.',
};

export default function WebDivisionPage() {
  const webTestimonials = testimonials.filter(t => t.divisions.includes('web'));

  return (
    <div className="division-web min-h-screen bg-[#FBF7F0] text-[#2A2416]">
      {/* a) Hero */}
      <section className="pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1">
          <h1 className="headline-display text-5xl md:text-7xl mb-6">Fast, elegant, conversion-first websites</h1>
          <p className="text-xl text-[#6B6152] mb-8 max-w-2xl">
            We build web experiences that are designed to perform and built to impress. From marketing sites to full-scale web applications.
          </p>
          <div className="flex flex-wrap gap-3 mb-8">
            <span className="paper-badge">&lt;1s Load Time</span>
            <span className="paper-badge">90+ Lighthouse</span>
            <span className="paper-badge">30+ Projects</span>
          </div>
          <button className="btn-primary">Get a Quote</button>
        </div>
        <div className="flex-1 w-full flex justify-end">
          <StatWidget 
            main="96" 
            label="Lighthouse Score" 
            trend="+12" 
            footerStats={[
              { label: 'Load Time', value: '0.8s' },
              { label: 'Conversion', value: '+34%' },
              { label: 'Core Web Vitals', value: 'All Green' }
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
              { title: 'Website Design & Development', desc: 'Custom marketing websites that tell your story and drive action.' },
              { title: 'Web Applications', desc: 'Complex web platforms built with modern frontend frameworks.' },
              { title: 'E-commerce Solutions', desc: 'Scalable storefronts optimized for seamless shopping experiences.' },
              { title: 'CMS Builds', desc: 'Empowering your team with easy-to-use content management systems.' },
              { title: 'Performance & CRO', desc: 'Speed optimization and conversion rate improvements for existing sites.' },
              { title: 'Ongoing Maintenance', desc: 'Proactive updates, security, and support to keep your site running smoothly.' }
            ].map((s, i) => (
              <div key={i} className="paper-card p-6 bg-[#F5EFE3]">
                <img src="/icons/external-link.svg" alt="icon" className="w-8 h-8 mb-4 opacity-80" />
                <h3 className="text-xl font-bold mb-2">{s.title}</h3>
                <p className="text-[#6B6152] text-sm line-clamp-2">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* c) Process Timeline */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold font-fraunces mb-12 text-center">How We Work</h2>
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start text-center max-w-4xl mx-auto">
          {['Discover', 'Design', 'Build', 'Launch', 'Iterate'].map((step, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-4 relative">
              <div className="w-12 h-12 rounded-full bg-[var(--accent)] text-white flex items-center justify-center font-bold font-fraunces text-xl z-10">
                {i + 1}
              </div>
              {i < 4 && <div className="hidden md:block absolute top-6 left-1/2 w-full h-px bg-[#D9C8A9] -z-0" />}
              <div className="font-semibold">{step}</div>
            </div>
          ))}
        </div>
      </section>

      {/* d) Portfolio Section */}
      <section className="section-muted py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold font-fraunces mb-12">Featured Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="paper-card overflow-hidden group bg-[#F5EFE3] flex flex-col relative">
                <div className="h-48 w-full bg-gradient-to-br from-[#E2E8F0] to-[#CBD5E1] relative">
                  <div className="absolute inset-0 bg-[var(--accent)] opacity-10 mix-blend-multiply" />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-[#2A2416]/80 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <img src="/icons/eye.svg" alt="view" className="w-8 h-8 text-white filter invert" />
                    <img src="/icons/external-link.svg" alt="link" className="w-8 h-8 text-white filter invert" />
                  </div>
                </div>
                <div className="p-6 flex-grow flex flex-col gap-2">
                  <h3 className="text-xl font-bold font-fraunces">Project Name {item}</h3>
                  <p className="text-[#6B6152] text-sm mb-4">A brief description of the web project and its impact on the client's business.</p>
                  <Link href="#" className="text-[var(--accent)] font-semibold hover:underline inline-flex items-center gap-2 mt-auto">
                    View Project <img src="/icons/arrow-cta.svg" alt="arrow" className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* e) Tech Stack Chips */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto text-center">
        <h2 className="text-2xl font-bold font-fraunces mb-8">Our Tech Stack</h2>
        <div className="flex flex-wrap justify-center gap-3">
          {['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Prisma', 'PostgreSQL', 'Vercel', 'Figma', 'Framer Motion', 'Three.js', 'Shopify', 'WordPress'].map((tech) => (
            <span key={tech} className="paper-badge text-lg px-4 py-2 border-[#D9C8A9] text-[#6B6152]">{tech}</span>
          ))}
        </div>
      </section>

      {/* f) Testimonial */}
      {webTestimonials.length > 0 && (
        <section className="section-muted py-24 px-6 md:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold font-fraunces mb-12">Client Success</h2>
            <div className="paper-card p-8 md:p-12 bg-[#F5EFE3] text-left relative">
              <img src="/icons/star.svg" alt="star" className="w-8 h-8 mb-6 text-[var(--accent)]" />
              <p className="text-xl md:text-2xl font-medium mb-8 leading-relaxed text-[#2A2416]">
                "{webTestimonials[0].quote}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#D9C8A9]" />
                <div>
                  <div className="font-bold">{webTestimonials[0].author}</div>
                  <div className="text-sm text-[#6B6152]">{webTestimonials[0].role}, {webTestimonials[0].company}</div>
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
            { q: 'Do you handle hosting and domains?', a: 'We can manage your hosting on Vercel, AWS, or your preferred provider.' },
            { q: 'Will I be able to edit content myself?', a: 'Yes. We build with CMS integrations so your team can easily update content.' },
            { q: 'How many revisions are included?', a: 'Design phase includes 3 rounds of revisions to ensure you love the final product.' },
            { q: 'Do you optimize for mobile?', a: 'Every site is mobile-first by default, perfectly responsive across all devices.' },
            { q: 'What about SEO?', a: 'Technical SEO is baked into every build from the start.' }
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
          <h2 className="text-4xl md:text-5xl font-bold font-fraunces mb-8">Let's build a website that works as hard as you do.</h2>
          <LeadForm division="web" />
        </div>
      </section>
    </div>
  );
}
