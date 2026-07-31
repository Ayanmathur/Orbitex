import React from 'react';

interface TechStackChipsProps {
  techs: string[];
}

export default function TechStackChips({ techs }: TechStackChipsProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {techs.map((tech, index) => (
        <span
          key={index}
          className="px-4 py-2 bg-ivory border border-tan rounded-full text-sm font-medium text-near-black transition-colors duration-300 hover:border-[var(--accent)] cursor-default"
        >
          {tech}
        </span>
      ))}
    </div>
  );
}
