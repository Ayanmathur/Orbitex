'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

const POSTS = [
  { id: 1, title: 'Building Scalable SaaS: Lessons from 6 Products', tag: 'Software', date: 'Oct 12, 2024', excerpt: 'Discover the architectural decisions that helped scale our software products.', link: '/blog/scalable-saas' },
  { id: 2, title: 'Core Web Vitals: The Performance Metrics That Matter', tag: 'Web', date: 'Oct 05, 2024', excerpt: 'A deep dive into measuring and improving web performance.', link: '/blog/core-web-vitals' },
  { id: 3, title: 'SEO in 2024: What Actually Moves the Needle', tag: 'Marketing', date: 'Sep 28, 2024', excerpt: 'Separating signal from noise in modern search engine optimization.', link: '/blog/seo-2024' },
  { id: 4, title: 'API-First Architecture: Why It Matters', tag: 'Software', date: 'Sep 21, 2024', excerpt: 'How designing your API before your UI leads to better products.', link: '/blog/api-first' },
  { id: 5, title: 'Conversion Rate Optimization: Beyond A/B Testing', tag: 'Web', date: 'Sep 15, 2024', excerpt: 'Holistic strategies for turning more visitors into customers.', link: '/blog/cro-beyond-ab' },
  { id: 6, title: 'Google Ads vs Meta Ads: Where to Spend Your Budget', tag: 'Marketing', date: 'Sep 02, 2024', excerpt: 'A strategic framework for allocating your paid acquisition budget.', link: '/blog/google-vs-meta' },
];

const FILTERS = ['All', 'Software', 'Web', 'Marketing'];

export default function BlogPage() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredPosts = POSTS.filter(post => 
    activeFilter === 'All' || post.tag === activeFilter
  );

  const getTagClass = (tag: string) => {
    switch (tag) {
      case 'Software': return 'division-software bg-[var(--accent)] text-white';
      case 'Web': return 'division-web bg-[var(--accent)] text-white';
      case 'Marketing': return 'division-marketing bg-[var(--accent)] text-white';
      default: return 'bg-[var(--color-beige)] text-[var(--color-near-black)]';
    }
  };

  return (
    <main className="division-hub min-h-screen bg-[var(--color-ivory)] text-[var(--color-near-black)]">
      <Nav />
      
      {/* Featured Post */}
      <section className="px-6 py-12 md:py-24 max-w-7xl mx-auto">
        <div className="paper-card relative overflow-hidden flex flex-col md:flex-row min-h-[400px]">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-cream)] to-[var(--color-beige)] z-0" />
          <div className="relative z-10 p-8 md:p-16 flex flex-col justify-center max-w-2xl">
            <span className="paper-badge self-start mb-6 border-[var(--color-beige)]">Featured</span>
            <h1 className="headline-display text-4xl md:text-5xl font-bold mb-4">
              Designing the Future: Our 2025 Vision
            </h1>
            <p className="text-lg text-[var(--color-warm-taupe)] mb-8">
              Explore how Orbitex is bridging the gap between innovative software, high-performance web experiences, and data-driven marketing.
            </p>
            <div className="flex items-center gap-6">
              <span className="text-sm font-medium">Nov 01, 2024</span>
              <Link href="/blog/vision-2025" className="btn-primary">
                Read More &rarr;
              </Link>
            </div>
          </div>
          <div className="relative z-10 hidden md:block flex-1 opacity-10 m-12">
             {/* Decorative placeholder */}
             <div className="w-full h-full bg-[var(--color-near-black)] rounded-full blur-3xl"></div>
          </div>
        </div>
      </section>

      {/* Filter and Grid */}
      <section className="px-6 pb-24 max-w-7xl mx-auto">
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          {FILTERS.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2 rounded-full transition-all duration-300 font-medium ${
                activeFilter === filter
                  ? 'bg-[var(--color-near-black)] text-[var(--color-ivory)]'
                  : 'bg-[var(--color-cream)] text-[var(--color-warm-taupe)] hover:bg-[var(--color-beige)]'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map(post => (
            <div 
              key={post.id} 
              className={`paper-card p-6 flex flex-col h-full animate-fade-in group hover:shadow-xl transition-all duration-300 division-${post.tag.toLowerCase()}`}
            >
              <div className="flex justify-between items-center mb-6">
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${getTagClass(post.tag)}`}>
                  {post.tag}
                </span>
                <span className="text-sm text-[var(--color-warm-taupe)]">{post.date}</span>
              </div>
              <h2 className="font-serif text-2xl font-bold mb-4 group-hover:text-[var(--accent)] transition-colors">
                {post.title}
              </h2>
              <p className="text-[var(--color-warm-taupe)] mb-8 flex-1">
                {post.excerpt}
              </p>
              <Link href={post.link} className="font-medium text-[var(--accent)] hover:underline flex items-center gap-2 mt-auto">
                Read More <span>&rarr;</span>
              </Link>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
