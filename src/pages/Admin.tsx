import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface Submission {
  id: string;
  created_at: string;
  name?: string;
  full_name?: string;
  email?: string;
  phone?: string;
  event_type?: string;
  event_date?: string;
  guests?: number | string;
  total_price?: number;
  details?: string;
  message?: string;
  items?: Record<string, any>;
}

export function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passcode, setPasscode] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'quotes' | 'contacts'>('quotes');
  
  const [quotes, setQuotes] = useState<Submission[]>([]);
  const [contacts, setContacts] = useState<Submission[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Load session from browser memory on startup
  useEffect(() => {
    const session = sessionStorage.getItem('nojozi_admin_auth');
    if (session === 'true') {
      setIsAuthenticated(true);
      fetchData();
    }
  }, []);

  // Fetch captured data directly from Supabase tables
  const fetchData = async () => {
    setLoading(true);
    try {
      const { data: quotesData } = await supabase
        .from('quotes')
        .select('*')
        .order('created_at', { ascending: false });

      const { data: contactsData } = await supabase
        .from('contacts')
        .select('*')
        .order('created_at', { ascending: false });

      if (quotesData) setQuotes(quotesData);
      if (contactsData) setContacts(contactsData);
    } catch (err) {
      console.error('Error fetching data from Supabase:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === '1234' || passcode === 'nojozi2026') {
      setIsAuthenticated(true);
      sessionStorage.setItem('nojozi_admin_auth', 'true');
      setError('');
      setPasscode('');
      fetchData();
    } else {
      setError('Invalid admin passcode. Please try again.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('nojozi_admin_auth');
  };

  // 1. MOBILE & DESKTOP AUTHENTICATION SCREEN
  if (!isAuthenticated) {
    return (
      <div className="bg-[#FAF7F2] min-h-screen py-12 md:py-24 px-4 sm:px-6 font-sans text-stone-900 flex items-center justify-center">
        <div className="max-w-md w-full bg-white border border-[#E8E2D9] p-6 sm:p-10 shadow-sm text-center">
          <p className="text-xs uppercase tracking-widest text-stone-500 mb-2 font-medium">
            RESTRICTED ACCESS
          </p>
          <h1 className="text-2xl font-serif text-stone-950 mb-6">Admin Portal Sign In</h1>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="text-left text-xs">
              <label className="block text-stone-700 font-medium mb-1">Passcode / PIN</label>
              <input
                type="password"
                required
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter admin passcode"
                className="w-full border border-stone-300 p-3 bg-[#FAF7F2] text-center text-stone-900 tracking-widest text-base focus:outline-none focus:border-stone-900"
              />
            </div>

            {error && <p className="text-red-600 text-xs font-medium">{error}</p>}

            <button
              type="submit"
              className="w-full bg-stone-900 text-white text-xs uppercase tracking-widest py-3.5 hover:bg-[#D99B26] transition font-semibold"
            >
              Sign In to Portal
            </button>
          </form>

          <p className="text-[11px] text-stone-400 mt-6 italic">
            Default passcodes: <code className="bg-[#FAF7F2] px-1 py-0.5 border">1234</code> or <code className="bg-[#FAF7F2] px-1 py-0.5 border">nojozi2026</code>
          </p>
        </div>
      </div>
    );
  }

  // 2. DASHBOARD & SUPABASE RECORDINGS VIEW
  return (
    <div className="bg-[#FAF7F2] min-h-screen py-8 sm:py-16 px-4 sm:px-6 font-sans text-stone-900">
      <div className="max-w-6xl mx-auto">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 border-b border-[#E8E2D9] pb-6 gap-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-stone-500 mb-1 font-medium">
              VENUE MANAGEMENT PORTAL
            </p>
            <h1 className="text-2xl sm:text-3xl font-serif text-stone-950">Captured Recordings & Submissions</h1>
          </div>
          
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            <button
              onClick={fetchData}
              className="bg-white border border-[#E8E2D9] text-stone-800 text-xs uppercase tracking-widest px-4 py-2.5 hover:bg-stone-100 transition font-medium"
            >
              Refresh
            </button>
            <button
              onClick={handleLogout}
              className="bg-stone-900 text-white text-xs uppercase tracking-widest px-5 py-2.5 hover:bg-red-700 transition font-semibold"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-[#E8E2D9] mb-6">
          <button
            onClick={() => setActiveTab('quotes')}
            className={`py-3 px-6 text-xs uppercase tracking-widest font-semibold border-b-2 transition ${
              activeTab === 'quotes'
                ? 'border-stone-900 text-stone-950 bg-white'
                : 'border-transparent text-stone-500 hover:text-stone-900'
            }`}
          >
            Quote Recordings ({quotes.length})
          </button>
          <button
            onClick={() => setActiveTab('contacts')}
            className={`py-3 px-6 text-xs uppercase tracking-widest font-semibold border-b-2 transition ${
              activeTab === 'contacts'
                ? 'border-stone-900 text-stone-950 bg-white'
                : 'border-transparent text-stone-500 hover:text-stone-900'
            }`}
          >
            Contact Messages ({contacts.length})
          </button>
        </div>

        {/* Data View */}
        {loading ? (
          <div className="bg-white border border-[#E8E2D9] p-12 text-center text-stone-500 text-xs">
            Loading recordings from Supabase...
          </div>
        ) : activeTab === 'quotes' ? (
          quotes.length === 0 ? (
            <div className="bg-white border border-[#E8E2D9] p-8 text-center text-stone-500 text-xs">
              No quote recordings found in Supabase.
            </div>
          ) : (
            <div className="space-y-4">
              {quotes.map((q) => (
                <div key={q.id} className="bg-white border border-[#E8E2D9] p-5 shadow-sm space-y-3">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-stone-100 pb-3 gap-2">
                    <div>
                      <h3 className="font-serif text-lg text-stone-950">{q.name || q.full_name || 'Anonymous Client'}</h3>
                      <p className="text-xs text-stone-500">{q.email} {q.phone && `• ${q.phone}`}</p>
                    </div>
                    <div className="text-left sm:text-right">
                      <span className="inline-block bg-[#FAF7F2] border border-[#E8E2D9] text-[#D99B26] font-semibold text-xs px-3 py-1">
                        {q.total_price ? `R${q.total_price.toLocaleString()}` : 'Custom Quote'}
                      </span>
                      <p className="text-[10px] text-stone-400 mt-1">
                        Captured: {new Date(q.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-stone-600 bg-[#FAF7F2] p-3 border border-[#E8E2D9]">
                    <div>
                      <span className="font-semibold block text-stone-900">Event Type:</span>
                      {q.event_type || 'General Function'}
                    </div>
                    <div>
                      <span className="font-semibold block text-stone-900">Event Date:</span>
                      {q.event_date || 'Not specified'}
                    </div>
                    <div>
                      <span className="font-semibold block text-stone-900">Guest Count:</span>
                      {q.guests || 'N/A'}
                    </div>
                  </div>

                  {q.items && (
                    <div className="text-xs text-stone-600 space-y-1">
                      <span className="font-semibold block text-stone-900">Selected Breakdown:</span>
                      <pre className="bg-stone-50 p-2 text-[11px] font-mono text-stone-700 overflow-x-auto border border-stone-200 whitespace-pre-wrap">
                        {JSON.stringify(q.items, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )
        ) : contacts.length === 0 ? (
          <div className="bg-white border border-[#E8E2D9] p-8 text-center text-stone-500 text-xs">
            No contact inquiries found in Supabase.
          </div>
        ) : (
          <div className="space-y-4">
            {contacts.map((c) => (
              <div key={c.id} className="bg-white border border-[#E8E2D9] p-5 shadow-sm space-y-2">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-stone-100 pb-2 gap-1">
                  <h3 className="font-serif text-lg text-stone-950">{c.name || c.full_name || 'Website Inquiry'}</h3>
                  <span className="text-[10px] text-stone-400">
                    {new Date(c.created_at).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-xs text-stone-500">{c.email} {c.phone && `• ${c.phone}`}</p>
                <div className="bg-[#FAF7F2] p-3 border border-[#E8E2D9] text-xs text-stone-700 leading-relaxed">
                  {c.message || c.details || 'No message content provided.'}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Admin;