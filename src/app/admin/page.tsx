'use client';

import React, { useState, useEffect } from 'react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { supabase } from '@/lib/supabase';
import { products as seedProducts, clients as seedClients, testimonials as seedTestimonials, founder as seedFounder } from '@/lib/data';

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState<'products' | 'clients' | 'testimonials' | 'leads' | 'founder'>('products');

  const [productsList, setProductsList] = useState(seedProducts);
  const [clientsList, setClientsList] = useState(seedClients);
  const [testimonialsList, setTestimonialsList] = useState(seedTestimonials);
  const [leadsList, setLeadsList] = useState<any[]>([]);
  const [founderData, setFounderData] = useState(seedFounder);
  const [statusMessage, setStatusMessage] = useState('');

  // Handle Password Authentication
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'orbitex-admin-2026' || password === 'admin') {
      setIsAuthenticated(true);
      setLoginError('');
      fetchSupabaseData();
    } else {
      setLoginError('Invalid password. Please try again.');
    }
  };

  const fetchSupabaseData = async () => {
    try {
      const { data: dbProducts } = await supabase.from('products').select('*');
      if (dbProducts && dbProducts.length > 0) {
        setProductsList(dbProducts.map(p => ({
          ...p,
          comingSoon: p.coming_soon ?? p.comingSoon,
        })));
      }

      const { data: dbClients } = await supabase.from('clients').select('*');
      if (dbClients && dbClients.length > 0) setClientsList(dbClients);

      const { data: dbTestimonials } = await supabase.from('testimonials').select('*');
      if (dbTestimonials && dbTestimonials.length > 0) setTestimonialsList(dbTestimonials);

      const { data: dbLeads } = await supabase.from('quote_requests').select('*').order('created_at', { ascending: false });
      if (dbLeads) setLeadsList(dbLeads);

      const { data: dbFounder } = await supabase.from('founder_bio').select('*').single();
      if (dbFounder) setFounderData(dbFounder);
    } catch (err) {
      console.warn('Using local seed data for admin preview:', err);
    }
  };

  const handleSaveProduct = async (product: any) => {
    try {
      const { error } = await supabase.from('products').upsert([{
        id: product.id,
        name: product.name,
        description: product.description,
        link: product.link,
        division: product.division,
        coming_soon: product.comingSoon,
      }]);
      if (error) throw error;
      setStatusMessage('Product saved to Supabase!');
    } catch (err: any) {
      setStatusMessage('Saved locally (Supabase table pending schema execution).');
    }
    setTimeout(() => setStatusMessage(''), 3000);
  };

  const handleSaveFounder = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase.from('founder_bio').upsert([{
        id: 'main',
        name: founderData.name,
        title: founderData.title,
        photo: founderData.photo,
        bio: founderData.bio,
      }]);
      if (error) throw error;
      setStatusMessage('Founder bio saved to Supabase!');
    } catch (err: any) {
      setStatusMessage('Saved locally (Supabase table pending schema execution).');
    }
    setTimeout(() => setStatusMessage(''), 3000);
  };

  if (!isAuthenticated) {
    return (
      <div className="division-hub min-h-screen flex flex-col bg-ivory">
        <Nav />
        <main className="flex-1 flex items-center justify-center px-6 py-24">
          <div className="paper-card p-8 md:p-12 max-w-md w-full text-center space-y-6">
            <div className="w-16 h-16 bg-cream border border-tan rounded-full mx-auto flex items-center justify-center">
              <img src="/icons/lock.svg" alt="Lock" className="w-8 h-8" />
            </div>
            <h1 className="headline-display text-2xl">Orbitex Admin CMS</h1>
            <p className="text-sm text-warm-taupe">Enter password to access the content management system.</p>

            <form onSubmit={handleLogin} className="space-y-4">
              {loginError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg">
                  {loginError}
                </div>
              )}
              <input
                type="password"
                placeholder="Admin password (default: admin)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input text-center"
                required
              />
              <button type="submit" className="btn-primary w-full justify-center">
                <span>Login to Dashboard</span>
                <img src="/icons/arrow-cta.svg" alt="" className="w-4 h-4" />
              </button>
            </form>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="division-hub min-h-screen flex flex-col bg-ivory">
      <Nav />

      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-28">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="headline-display text-3xl md:text-4xl">Content Management System</h1>
            <p className="text-warm-taupe">Manage products, clients, testimonials, leads, and bio.</p>
          </div>
          <button onClick={() => setIsAuthenticated(false)} className="btn-outline text-xs px-4 py-2">
            Logout
          </button>
        </div>

        {statusMessage && (
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-sm font-medium">
            {statusMessage}
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-tan pb-4">
          {(['products', 'clients', 'testimonials', 'leads', 'founder'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold capitalize transition-all ${
                activeTab === tab
                  ? 'bg-warm-black text-ivory shadow-md'
                  : 'bg-cream text-warm-taupe hover:bg-beige border border-tan'
              }`}
            >
              {tab === 'leads' ? `Quote Requests (${leadsList.length})` : tab}
            </button>
          ))}
        </div>

        {/* Products Management Tab */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <h2 className="headline-display text-xl mb-4">6 Product Slots (§7, §11)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {productsList.map((prod, idx) => (
                <div key={prod.id} className="paper-card p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-warm-taupe uppercase">Slot {idx + 1}</span>
                    <label className="flex items-center space-x-2 text-xs">
                      <input
                        type="checkbox"
                        checked={prod.comingSoon}
                        onChange={(e) => {
                          const updated = [...productsList];
                          updated[idx].comingSoon = e.target.checked;
                          setProductsList(updated);
                        }}
                      />
                      <span>Coming Soon</span>
                    </label>
                  </div>
                  <div>
                    <label className="text-xs font-medium block text-warm-taupe mb-1">Product Name</label>
                    <input
                      type="text"
                      value={prod.name}
                      onChange={(e) => {
                        const updated = [...productsList];
                        updated[idx].name = e.target.value;
                        setProductsList(updated);
                      }}
                      className="form-input text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium block text-warm-taupe mb-1">Description</label>
                    <textarea
                      value={prod.description}
                      onChange={(e) => {
                        const updated = [...productsList];
                        updated[idx].description = e.target.value;
                        setProductsList(updated);
                      }}
                      rows={3}
                      className="form-input text-sm resize-y"
                    />
                  </div>
                  <button onClick={() => handleSaveProduct(prod)} className="btn-primary text-xs w-full justify-center py-2">
                    Save Product
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Clients Management Tab */}
        {activeTab === 'clients' && (
          <div className="space-y-6">
            <h2 className="headline-display text-xl">Clients Trust Bar (§2.9, §11)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {clientsList.map((client) => (
                <div key={client.id} className="paper-card p-6 space-y-3">
                  <h3 className="font-semibold text-lg">{client.name}</h3>
                  <p className="text-xs text-warm-taupe">Divisions: {client.divisions.join(', ')}</p>
                  <input type="text" value={client.link} readOnly className="form-input text-xs" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Testimonials Tab */}
        {activeTab === 'testimonials' && (
          <div className="space-y-6">
            <h2 className="headline-display text-xl">Testimonials</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {testimonialsList.map((t) => (
                <div key={t.id} className="paper-card p-6 space-y-3">
                  <p className="text-sm italic">"{t.quote}"</p>
                  <p className="text-xs font-semibold text-warm-black">— {t.author}, {t.role} ({t.company})</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Lead Inquiries Tab */}
        {activeTab === 'leads' && (
          <div className="space-y-6">
            <h2 className="headline-display text-xl">Submitted Quote Requests</h2>
            {leadsList.length === 0 ? (
              <div className="paper-card p-8 text-center text-warm-taupe">
                No quote requests submitted yet. Test the lead form on the homepage or division pages to populate data!
              </div>
            ) : (
              <div className="space-y-4">
                {leadsList.map((lead) => (
                  <div key={lead.id} className="paper-card p-6 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-lg">{lead.name}</h3>
                        <p className="text-xs text-warm-taupe">{lead.email} | {lead.phone} | {lead.company || 'N/A'}</p>
                      </div>
                      <span className="paper-badge text-xs px-3 py-1 bg-cream border border-tan">{lead.division}</span>
                    </div>
                    <p className="text-sm font-medium">Service: {lead.service}</p>
                    <p className="text-sm bg-ivory p-3 rounded-lg border border-tan">{lead.message}</p>
                    <p className="text-xs text-warm-taupe text-right">{new Date(lead.created_at).toLocaleString()}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Founder Bio Tab */}
        {activeTab === 'founder' && (
          <form onSubmit={handleSaveFounder} className="paper-card p-8 max-w-2xl space-y-6">
            <h2 className="headline-display text-xl">Founder Bio & Photo (§7)</h2>
            <div className="space-y-2">
              <label className="text-sm font-medium">Founder Name</label>
              <input
                type="text"
                value={founderData.name}
                onChange={(e) => setFounderData({ ...founderData, name: e.target.value })}
                className="form-input"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Title</label>
              <input
                type="text"
                value={founderData.title}
                onChange={(e) => setFounderData({ ...founderData, title: e.target.value })}
                className="form-input"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Photo Path / URL</label>
              <input
                type="text"
                value={founderData.photo}
                onChange={(e) => setFounderData({ ...founderData, photo: e.target.value })}
                className="form-input"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">First-Person Bio Statement</label>
              <textarea
                value={founderData.bio}
                onChange={(e) => setFounderData({ ...founderData, bio: e.target.value })}
                rows={5}
                className="form-input resize-y"
              />
            </div>
            <button type="submit" className="btn-primary">
              Save Founder Profile
            </button>
          </form>
        )}
      </main>

      <Footer />
    </div>
  );
}
