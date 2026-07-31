/* ─────────────────────────────────────────────────────────
   CMS Data Store — Default seed data from master plan §7
   Provides typed product/client/testimonial/founder data
   ───────────────────────────────────────────────────────── */

export interface Product {
  id: string;
  name: string;
  description: string;
  link: string;
  division: 'software' | 'web' | 'marketing' | 'all';
  comingSoon: boolean;
  logo?: string;
}

export interface Client {
  id: string;
  name: string;
  logo: string;
  link: string;
  divisions: ('software' | 'web' | 'marketing')[];
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  divisions: ('software' | 'web' | 'marketing' | 'hub')[];
}

export interface FounderBio {
  name: string;
  title: string;
  photo: string;
  bio: string;
}

/* ── Seed Data (§7) ── */

export const products: Product[] = [
  {
    id: 'billdoor',
    name: 'Billdoor',
    description: 'One-stop billing, review, and appointment system with WhatsApp automation.',
    link: '#',
    division: 'software',
    comingSoon: false,
  },
  {
    id: 'skillitlearn',
    name: 'SkillItLearn',
    description: 'Student guidance platform mapping courses and degrees to relevant skills, with certifications per skill learned.',
    link: '#',
    division: 'software',
    comingSoon: false,
  },
  {
    id: 'addicted-zero',
    name: 'Addicted Zero',
    description: 'Platform to help quit addictions — smoking, alcohol, drugs, and more — with guided programs and community support.',
    link: '#',
    division: 'software',
    comingSoon: false,
  },
  {
    id: 'wtw',
    name: 'WTW (What to Wear)',
    description: 'Occasion-based clothing platform — airport look, beach look, wedding look, date look, and more.',
    link: '#',
    division: 'software',
    comingSoon: false,
  },
  {
    id: 'product-5',
    name: 'Coming Soon',
    description: 'An exciting new product is in the works. Stay tuned for the reveal.',
    link: '#',
    division: 'software',
    comingSoon: true,
  },
  {
    id: 'product-6',
    name: 'Coming Soon',
    description: 'Another innovative product launching soon. Watch this space.',
    link: '#',
    division: 'software',
    comingSoon: true,
  },
];

export const clients: Client[] = [
  { id: 'c1', name: 'Client One', logo: '/placeholders/client.svg', link: '#', divisions: ['software', 'web'] },
  { id: 'c2', name: 'Client Two', logo: '/placeholders/client.svg', link: '#', divisions: ['web', 'marketing'] },
  { id: 'c3', name: 'Client Three', logo: '/placeholders/client.svg', link: '#', divisions: ['software'] },
  { id: 'c4', name: 'Client Four', logo: '/placeholders/client.svg', link: '#', divisions: ['marketing'] },
  { id: 'c5', name: 'Client Five', logo: '/placeholders/client.svg', link: '#', divisions: ['software', 'web', 'marketing'] },
  { id: 'c6', name: 'Client Six', logo: '/placeholders/client.svg', link: '#', divisions: ['web'] },
];

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    quote: 'Orbitex didn\'t just build our software — they understood our business. The product they delivered exceeded every expectation and continues to drive real growth.',
    author: 'Sarah Mitchell',
    role: 'CEO',
    company: 'TechVentures Inc.',
    divisions: ['software', 'hub'],
  },
  {
    id: 't2',
    quote: 'Our website went from a slow, dated design to a lightning-fast, conversion-optimized platform. The results spoke for themselves within the first month.',
    author: 'James Chen',
    role: 'Marketing Director',
    company: 'Elevate Brands',
    divisions: ['web', 'hub'],
  },
  {
    id: 't3',
    quote: 'The marketing team at Orbitex brought a data-driven approach that transformed our digital presence. Our lead generation increased by over 200% in six months.',
    author: 'Priya Sharma',
    role: 'Founder',
    company: 'GreenLeaf Organics',
    divisions: ['marketing', 'hub'],
  },
];

export const founder: FounderBio = {
  name: 'Ayan Mathur',
  title: 'Founder',
  photo: '/placeholders/founder.svg',
  bio: 'I started Orbitex to solve a problem I kept running into: businesses needing software, a website, and marketing that actually work together — instead of hiring three disconnected vendors who don\'t talk to each other. Today that\'s grown into three specialist teams, six products, and thirty client partnerships — but the reason hasn\'t changed.',
};

/* ── Values (§7) ── */
export const values = [
  {
    title: 'Built to Last',
    description: 'Not just shipped, maintained. Every line of code, every campaign, every page — built with long-term performance in mind.',
    icon: 'settings',
  },
  {
    title: 'Transparent by Default',
    description: 'Clear scope, clear pricing conversations, clear reporting. You\'ll never wonder where things stand.',
    icon: 'eye',
  },
  {
    title: 'One Team, Full Stack',
    description: 'Software, web, and growth working from the same playbook. No silos, no vendor coordination headaches.',
    icon: 'check',
  },
  {
    title: 'Measured, Not Guessed',
    description: 'Every engagement tied to a real outcome. We track what matters and optimize relentlessly.',
    icon: 'star',
  },
];

/* ── Hub Stats (§2.2) ── */
export const hubStats = [
  { value: '6', label: 'Products', suffix: '' },
  { value: '30', label: 'Clients', suffix: '+' },
  { value: '3', label: 'Divisions', suffix: '' },
];

/* ── Division definitions for routing cards (§3) ── */
export const divisions = [
  {
    id: 'software',
    name: 'Software Development',
    accent: '#7C3AED',
    accentSecondary: '#4F46E5',
    href: '/software',
    tagline: 'Custom software & products',
    description: 'From idea to deployed product — custom applications, SaaS platforms, APIs, and AI-powered automation built for scale.',
    capabilities: ['Custom Software', 'Product Engineering', 'API & Backend', 'AI Automation'],
    icon: 'settings',
  },
  {
    id: 'web',
    name: 'Web Development',
    accent: '#06B6D4',
    accentSecondary: '#2563EB',
    href: '/web',
    tagline: 'Websites & web apps',
    description: 'Fast, elegant, conversion-first websites and web applications — designed to perform and built to impress.',
    capabilities: ['Website Design', 'Web Apps', 'E-commerce', 'Performance & CRO'],
    icon: 'external-link',
  },
  {
    id: 'marketing',
    name: 'Digital Marketing',
    accent: '#C2622D',
    accentSecondary: '#D97706',
    href: '/marketing',
    tagline: 'Growth & performance marketing',
    description: 'Data-driven SEO, paid ads, social media, and content marketing — measurable growth that compounds.',
    capabilities: ['SEO', 'Google & Meta Ads', 'Content Marketing', 'AI Automation'],
    icon: 'star',
  },
];
