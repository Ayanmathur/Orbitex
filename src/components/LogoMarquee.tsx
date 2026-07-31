'use client';

import React from 'react';
import { clients } from '@/lib/data';

export default function LogoMarquee() {
  const duplicatedClients = [...clients, ...clients, ...clients];

  return (
    <div className="w-full overflow-hidden py-12">
      <div className="relative marquee-container flex overflow-hidden group">
        <div className="marquee-track flex animate-[marquee_42s_linear_infinite] group-hover:[animation-play-state:paused] hover:motion-reduce:animate-none space-x-6 pr-6">
          {duplicatedClients.map((client, index) => (
            <a
              key={`${client.name}-${index}`}
              href={client.link || '#'}
              target={client.link ? "_blank" : "_self"}
              rel="noopener noreferrer"
              className="flex items-center justify-center h-[80px] min-w-[180px] rounded-2xl bg-cream border border-tan px-6 shadow-tier-2 transition-all duration-300 grayscale opacity-65 hover:grayscale-0 hover:opacity-100 hover:scale-105 hover:shadow-tier-3"
            >
              <img
                src={client.logo}
                alt={client.name}
                className="max-h-12 w-auto object-contain"
              />
            </a>
          ))}
        </div>
        <div
          className="absolute bottom-0 left-0 right-0 h-4 pointer-events-none z-10"
          style={{
            background: 'linear-gradient(to bottom, rgba(42,36,22,0.08), transparent)',
          }}
        />
      </div>
    </div>
  );
}
