'use client';

import React, { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
}

export default function FAQ({ items }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-4">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={index} className="bg-cream border-b border-tan overflow-hidden rounded-xl transition-colors hover:bg-ivory/80 shadow-tier-1">
            <button
              onClick={() => toggle(index)}
              className="w-full flex items-center justify-between p-5 text-left focus:outline-none cursor-pointer"
            >
              <span className="font-semibold text-lg text-near-black font-display">{item.question}</span>
              <img
                src="/icons/chevron-down.svg"
                alt=""
                className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 cubic-bezier(0.16,1,0.3,1) ${isOpen ? 'rotate-180 text-[var(--accent)]' : 'rotate-0'}`}
              />
            </button>
            <div
              className={`grid transition-[grid-template-rows,opacity] duration-300 cubic-bezier(0.16,1,0.3,1) ${
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className="overflow-hidden">
                <div className="p-5 pt-0 text-warm-taupe text-sm leading-relaxed border-t border-tan/30 mt-1">
                  {item.answer}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
