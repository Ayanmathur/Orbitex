import React from 'react';

interface ProcessStep {
  title: string;
  description: string;
  icon?: string;
}

interface ProcessTimelineProps {
  steps: ProcessStep[];
}

export default function ProcessTimeline({ steps }: ProcessTimelineProps) {
  return (
    <div className="w-full py-12">
      <div className="relative max-w-6xl mx-auto px-4 md:px-8">
        {/* Desktop timeline line */}
        <div className="hidden lg:block absolute top-[52px] left-0 w-full h-0.5 bg-tan z-0" />
        
        {/* Mobile timeline line */}
        <div className="lg:hidden absolute top-0 left-[39px] h-full w-0.5 bg-tan z-0" />

        <div className="flex flex-col lg:flex-row justify-between relative z-10 space-y-12 lg:space-y-0 lg:space-x-8">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-row lg:flex-col items-start lg:items-center relative w-full lg:w-1/5 group">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[var(--accent)] text-white flex items-center justify-center font-bold text-lg mb-0 lg:mb-6 mr-6 lg:mr-0 z-10 shadow-md">
                {index + 1}
              </div>
              <div className="paper-card p-6 w-full h-full lg:text-center mt-0 lg:mt-2 transition-transform duration-300 group-hover:-translate-y-2">
                {step.icon && (
                  <div className="flex justify-start lg:justify-center mb-4">
                    <img src={`/icons/${step.icon}.svg`} alt="" className="w-8 h-8" />
                  </div>
                )}
                <h3 className="font-bold text-lg text-near-black mb-2">{step.title}</h3>
                <p className="text-sm text-warm-taupe">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
