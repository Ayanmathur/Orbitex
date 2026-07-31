'use client';

import React, { useState } from 'react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ContactSection from '@/components/ContactSection';

const posts = [
  { id: 1, title: 'Building Scalable SaaS: Lessons from 6 Products', tag: 'software', date: 'Jul 28, 2026', excerpt: 'How full-stack architecture decisions and automated testing prevent technical debt in production.' },
  { id: 2, title: 'Core Web Vitals: The Performance Metrics That Matter', tag: 'web', date: 'Jul 20, 2026', excerpt: 'Practical techniques for optimizing Next.js applications for <1s LCP and sub-50ms INP.' },
  { id: 3, title: 'SEO in 2024: What Actually Moves the Needle', tag: 'marketing', date: 'Jul 15, 2026', excerpt: 'Why technical audits, entity clustering, and high-intent content hubs outshine legacy backlinks.' },
  { id: 4, title: 'API-First Architecture: Why It Matters for Scale', tag: 'software', date: 'Jul 10, 2026', excerpt: 'Decoupling frontend web apps and backend services to streamline multi-platform deployments.' },
  { id: 5, title: 'Conversion Rate Optimization: Beyond A/B Testing', tag: 'web', date: 'Jul 02, 2026', excerpt: 'Designing paper-cutout micro-interactions that reduce user friction and boost funnel conversion.' },
  { id: 6, title: 'Google Ads vs Meta Ads: Where to Spend Your Budget', tag: 'marketing', date: 'Jun 25, 2026', excerpt: 'Allocating ad spend between high-intent search queries and top-of-funnel social discovery.' },
];

export default function BlogPage() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'software' | 'web' | 'marketing'>('all');

  const filteredPosts = activeFilter === 'all' ? posts : posts.filter(p => p.tag === activeFilter);

  return (
    <div className="division-hub min-h-screen bg-ivory text-[#2A2416]">
      <Nav />

      <main className="pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <h1 className="headline-display text-4xl md:text-5xl text-[#2A2416]">Orbitex Engineering & Growth Blog</h1>
            <p className="text-[#6B6152] text-base">Insights, technical case studies, and growth playbooks from our studio teams.</p>
          </div>

          {/* Filter Pills */}
          <div className="flex justify-center gap-2 mb-12">
            {(['all', 'software', 'web', 'marketing'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                  activeFilter === filter
                    ? 'bg-[#2A2416] text-white shadow-md'
                    : 'bg-cream text-[#6B6152] border border-tan hover:bg-beige'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {filteredPosts.map((post) => (
              <article key={post.id} className="paper-card p-6 bg-cream border border-tan space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold uppercase tracking-wider text-[var(--accent)]">{post.tag}</span>
                    <span className="text-[#6B6152]">{post.date}</span>
                  </div>
                  <h2 className="headline-display text-xl text-[#2A2416] hover:text-[var(--accent)] transition-colors cursor-pointer">
                    {post.title}
                  </h2>
                  <p className="text-xs text-[#6B6152] leading-relaxed">{post.excerpt}</p>
                </div>
                <div className="pt-4">
                  <span className="text-xs font-bold text-[#2A2416] hover:underline cursor-pointer inline-flex items-center">
                    Read Article <span className="ml-1">→</span>
                  </span>
                </div>
              </article>
            ))}
          </div>

          {/* Contact Section */}
          <ContactSection division="hub" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
