'use client';

import React, { useState } from 'react';

type Division = 'hub' | 'software' | 'web' | 'marketing';

interface LeadFormProps {
  division?: Division;
}

const serviceOptions = {
  software: ['Custom Software', 'Product Development', 'API & Backend', 'AI Automation', 'Not sure yet'],
  web: ['Website Design', 'Web Application', 'E-commerce', 'CMS Build', 'Performance & CRO', 'Not sure yet'],
  marketing: ['SEO', 'Google Ads', 'Meta Ads', 'Social Media', 'Branding', 'Content Marketing', 'AI Automation', 'Not sure yet'],
};

const allOptions = Array.from(new Set([
  ...serviceOptions.software,
  ...serviceOptions.web,
  ...serviceOptions.marketing
]));

export default function LeadForm({ division = 'hub' }: LeadFormProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: '',
    consent: false,
  });

  const options = division === 'hub' ? allOptions : serviceOptions[division] || allOptions;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <div className={`paper-card p-8 md:p-12 max-w-4xl mx-auto division-${division}`}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col space-y-2">
            <label htmlFor="fullName" className="text-sm font-medium text-near-black">Full Name *</label>
            <input required type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} className="form-input" />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-near-black">Email *</label>
            <input required type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="form-input" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col space-y-2">
            <label htmlFor="phone" className="text-sm font-medium text-near-black">Phone Number *</label>
            <input required type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="form-input" />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="company" className="text-sm font-medium text-near-black">Company Name</label>
            <input type="text" id="company" name="company" value={formData.company} onChange={handleChange} className="form-input" />
          </div>
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="service" className="text-sm font-medium text-near-black">Service/Project interested in</label>
          <div className="relative">
            <select id="service" name="service" value={formData.service} onChange={handleChange} className="form-input appearance-none w-full">
              <option value="" disabled>Select an option</option>
              {options.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            <img src="/icons/chevron-down.svg" alt="" className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none" />
          </div>
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="message" className="text-sm font-medium text-near-black">Message</label>
          <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows={5} placeholder="Goals, timeline, and anything else that'll help us scope this" className="form-input resize-y"></textarea>
        </div>

        <div className="flex items-start space-x-3">
          <button type="button" className="mt-1 flex-shrink-0" onClick={() => setFormData(p => ({ ...p, consent: !p.consent }))}>
            <img src={formData.consent ? '/icons/checkbox-checked.svg' : '/icons/checkbox-unchecked.svg'} alt={formData.consent ? 'Checked' : 'Unchecked'} className="w-5 h-5" />
          </button>
          <label className="text-sm text-warm-taupe">
            I agree to the <a href="/privacy-policy" className="underline hover:text-near-black">Privacy Policy</a>
          </label>
        </div>

        <button type="submit" disabled={!formData.consent} className="btn-primary flex items-center justify-center space-x-2 w-full md:w-auto group disabled:opacity-50">
          <span>Request a Quote</span>
          <img src="/icons/arrow-cta.svg" alt="" className="w-5 h-5 transition-transform duration-300 group-hover:rotate-45" />
        </button>
      </form>
    </div>
  );
}
