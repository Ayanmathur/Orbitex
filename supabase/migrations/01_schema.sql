-- ─────────────────────────────────────────────────────────
-- ORBITEX DATABASE SCHEMA & SEED DATA (SUPABASE)
-- Master Plan §7, §11 (Admin CMS & Lead Submissions)
-- ─────────────────────────────────────────────────────────

-- 1. Products Table
CREATE TABLE IF NOT EXISTS public.products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  link TEXT DEFAULT '#',
  division TEXT DEFAULT 'software',
  coming_soon BOOLEAN DEFAULT false,
  logo TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Clients Table
CREATE TABLE IF NOT EXISTS public.clients (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  logo TEXT NOT NULL,
  link TEXT DEFAULT '#',
  divisions TEXT[] DEFAULT ARRAY['software', 'web', 'marketing'],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Testimonials Table
CREATE TABLE IF NOT EXISTS public.testimonials (
  id TEXT PRIMARY KEY,
  quote TEXT NOT NULL,
  author TEXT NOT NULL,
  role TEXT NOT NULL,
  company TEXT NOT NULL,
  divisions TEXT[] DEFAULT ARRAY['hub'],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Quote Requests / Leads Table
CREATE TABLE IF NOT EXISTS public.quote_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  division TEXT DEFAULT 'hub',
  service TEXT,
  message TEXT NOT NULL,
  consent BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Founder Bio Table
CREATE TABLE IF NOT EXISTS public.founder_bio (
  id TEXT PRIMARY KEY DEFAULT 'main',
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  photo TEXT NOT NULL,
  bio TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.founder_bio ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Allow public read on products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Allow public read on clients" ON public.clients FOR SELECT USING (true);
CREATE POLICY "Allow public read on testimonials" ON public.testimonials FOR SELECT USING (true);
CREATE POLICY "Allow public read on founder_bio" ON public.founder_bio FOR SELECT USING (true);

-- Public insert policy for quote requests / leads
CREATE POLICY "Allow public insert on quote_requests" ON public.quote_requests FOR INSERT WITH CHECK (true);

-- Service role policies for Admin CMS CRUD
CREATE POLICY "Allow full access for service_role on products" ON public.products USING (true) WITH CHECK (true);
CREATE POLICY "Allow full access for service_role on clients" ON public.clients USING (true) WITH CHECK (true);
CREATE POLICY "Allow full access for service_role on testimonials" ON public.testimonials USING (true) WITH CHECK (true);
CREATE POLICY "Allow full access for service_role on quote_requests" ON public.quote_requests USING (true) WITH CHECK (true);
CREATE POLICY "Allow full access for service_role on founder_bio" ON public.founder_bio USING (true) WITH CHECK (true);

-- ── Seed Initial Data ──

INSERT INTO public.products (id, name, description, link, division, coming_soon) VALUES
('billdoor', 'Billdoor', 'One-stop billing, review, and appointment system with WhatsApp automation.', '#', 'software', false),
('skillitlearn', 'SkillItLearn', 'Student guidance platform mapping courses and degrees to relevant skills, with certifications per skill learned.', '#', 'software', false),
('addicted-zero', 'Addicted Zero', 'Platform to help quit addictions — smoking, alcohol, drugs, and more — with guided programs and community support.', '#', 'software', false),
('wtw', 'WTW (What to Wear)', 'Occasion-based clothing platform — airport look, beach look, wedding look, date look, and more.', '#', 'software', false),
('product-5', 'Coming Soon', 'An exciting new product is in the works. Stay tuned for the reveal.', '#', 'software', true),
('product-6', 'Coming Soon', 'Another innovative product launching soon. Watch this space.', '#', 'software', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.clients (id, name, logo, link, divisions) VALUES
('c1', 'Client One', '/placeholders/client.svg', '#', ARRAY['software', 'web']),
('c2', 'Client Two', '/placeholders/client.svg', '#', ARRAY['web', 'marketing']),
('c3', 'Client Three', '/placeholders/client.svg', '#', ARRAY['software']),
('c4', 'Client Four', '/placeholders/client.svg', '#', ARRAY['marketing']),
('c5', 'Client Five', '/placeholders/client.svg', '#', ARRAY['software', 'web', 'marketing']),
('c6', 'Client Six', '/placeholders/client.svg', '#', ARRAY['web'])
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.testimonials (id, quote, author, role, company, divisions) VALUES
('t1', 'Orbitex didn''t just build our software — they understood our business. The product they delivered exceeded every expectation and continues to drive real growth.', 'Sarah Mitchell', 'CEO', 'TechVentures Inc.', ARRAY['software', 'hub']),
('t2', 'Our website went from a slow, dated design to a lightning-fast, conversion-optimized platform. The results spoke for themselves within the first month.', 'James Chen', 'Marketing Director', 'Elevate Brands', ARRAY['web', 'hub']),
('t3', 'The marketing team at Orbitex brought a data-driven approach that transformed our digital presence. Our lead generation increased by over 200% in six months.', 'Priya Sharma', 'Founder', 'GreenLeaf Organics', ARRAY['marketing', 'hub'])
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.founder_bio (id, name, title, photo, bio) VALUES
('main', 'Ayan Mathur', 'Founder', '/placeholders/founder.svg', 'I started Orbitex to solve a problem I kept running into: businesses needing software, a website, and marketing that actually work together — instead of hiring three disconnected vendors who don''t talk to each other. Today that''s grown into three specialist teams, six products, and thirty client partnerships — but the reason hasn''t changed.')
ON CONFLICT (id) DO NOTHING;
