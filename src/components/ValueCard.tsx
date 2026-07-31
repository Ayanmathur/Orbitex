import React from 'react';

interface ValueCardProps {
  title: string;
  description: string;
  icon: string;
}

export default function ValueCard({ title, description, icon }: ValueCardProps) {
  return (
    <div className="paper-card p-8 flex flex-col h-full group transition-transform hover:-translate-y-1">
      <div className="paper-badge w-14 h-14 flex items-center justify-center rounded-2xl mb-6 bg-cream border border-tan transition-colors duration-300 group-hover:border-[var(--accent)] group-hover:bg-ivory">
        <img src={`/icons/${icon}.svg`} alt="" className="w-6 h-6" />
      </div>
      <h3 className="font-bold text-xl text-near-black mb-3">{title}</h3>
      <p className="text-warm-taupe flex-grow leading-relaxed">{description}</p>
    </div>
  );
}
