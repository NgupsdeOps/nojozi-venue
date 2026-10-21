import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export function Admin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const [quotes, setQuotes] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'quotes' | 'contacts'>('quotes');

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) fetchAllData();
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) fetchAllData();
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchAllData = async () => {
    try {
      const { data: quotesData } = await supabase
        .from('quotes')
        .select('*')
        .order('created_at', { ascending: false });
      
      const { data: contactsData } = await supabase
        .from('contacts')
        .select('*')
        .order('created_at', { ascending: false });

      setQuotes(quotesData || []);
      setContacts(contactsData || []);
    } catch (err) {
      console.error('Error loading admin data:', err);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setErrorMessage(error.message);
    setLoading(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  if (session) {
    return (
      <div className="bg-[#FAF7F2] min-h-[85vh] py-16 px-6 font-sans text-stone-900">
        <div className="max-w-6xl mx-auto bg-[#F5F0E8] border border-[#E8E2D9] p-6 md:p-10 shadow-sm">
          {/* HEADER */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b border-[#E8E2D9] pb-6 gap-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-stone-500 font-medium">ADMIN DASHBOARD</p>
              <h1 className="text-3xl font-serif text-stone-950">Nojozi Venue Management</h1>
              <p className="text-stone-600 text-xs mt-1">Logged in as {session.user.email}</p>
            </div>
            <button
              onClick={handleSignOut}
              className="bg-stone-900 text-white text-xs uppercase tracking-widest font-semibold px-5 py-2.5 hover:bg-stone-800 transition"
            >
              Sign Out
            </button>
          </div>

          {/* METRICS */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-[#FAF7F2] p-6 border border-[#E8E2D9]">
              <h3 className="text-xs uppercase tracking-widest text-stone-500 mb-1 font-semibold">Total Quotes Booked</h3>
              <p className="text-3xl font-serif text-stone-900">{quotes.length}</p>
            </div>
            <div className="bg-[#FAF7F2] p-6 border border-[#E8E2D9]">
              <h3 className="text-xs uppercase tracking-widest text-stone-500 mb-1 font-semibold">Contact Messages</h3>
              <p className="text-3xl font-serif text-amber-700">{contacts.length}</p>
            </div>
            <div className="bg-[#FAF7F2] p-6 border border-[#E8E2D9]">
              <h3 className="text-xs uppercase tracking-widest text-stone-500 mb-1 font-semibold">Database</h3>
              <p className="text-3xl font-serif text-emerald-700">Connected</p>
            </div>
          </div>

          {/* TAB SWITCHER */}
          <div className="flex gap-4 mb-6 border-b border-[#E8E2D9] pb-4">
            <button
              onClick={() => setActiveTab('quotes')}
              className={`text-xs uppercase tracking-widest font-semibold px-4 py-2 transition ${
                activeTab === 'quotes'
                  ? 'bg-[#D99B26] text-white'
                  : 'bg-[#FAF7F2] text-stone-700 border border-[#E8E2D9] hover:bg-stone-200'
              }`}
            >
              Quote Requests ({quotes.length})
            </button>
            <button
              onClick={() => setActiveTab('contacts')}
              className={`text-xs uppercase tracking-widest font-semibold px-4 py-2 transition ${
                activeTab === 'contacts'
                  ? 'bg-[#D99B26] text-white'
                  : 'bg-[#FAF7F2] text-stone-700 border border-[#E8E2D9] hover:bg-stone-200'
              }`}
            >
              Contact Messages ({contacts.length})
            </button>
          </div>

          {/* QUOTES LIST */}
          {activeTab === 'quotes' && (
            <div>
              <h2 className="text-xl font-serif text-stone-950 mb-4">Detailed Quote Submissions</h2>
              {quotes.length === 0 ? (
                <p className="text-xs text-stone-500 italic bg-[#FAF7F2] p-6 border border-[#E8E2D9]">
                  No quote requests recorded in Supabase yet.
                </p>
              ) : (
                <div className="space-y-6">
                  {quotes.map((q, idx) => (
                    <div key={q.id || idx} className="bg-[#FAF7F2] p-6 border border-[#E8E2D9] shadow-xs text-xs space-y-4">
                      {/* CARD HEADER */}
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-[#E8E2D9] pb-3 gap-2">
                        <div>
                          <span className="text-[10px] uppercase tracking-widest text-[#D99B26] font-bold block">EVENT TYPE</span>
                          <h3 className="text-lg font-serif font-bold text-stone-950">{q.event_type || 'Custom Event'}</h3>
                        </div>
                        <div className="text-left sm:text-right">
                          <span className="text-[10px] uppercase tracking-widest text-stone-400 block">TOTAL ESTIMATE</span>
                          <span className="text-xl font-serif font-bold text-[#D99B26]">R {Number(q.total_price || 0).toLocaleString()}</span>
                        </div>
                      </div>

                      {/* CLIENT & EVENT DETAILS GRID WITH OVERFLOW / BREAK PROTECTION */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 py-2">
                        <div className="min-w-0">
                          <span className="text-stone-400 block uppercase text-[10px] font-semibold mb-1">Client Name</span>
                          <span className="font-semibold text-stone-900 text-sm block truncate">{q.name || 'Not provided'}</span>
                        </div>
                        <div className="min-w-0">
                          <span className="text-stone-400 block uppercase text-[10px] font-semibold mb-1">Email Address</span>
                          <span className="font-semibold text-stone-900 text-xs block break-all">{q.email || 'Not provided'}</span>
                        </div>
                        <div className="min-w-0">
                          <span className="text-stone-400 block uppercase text-[10px] font-semibold mb-1">Phone Number</span>
                          <span className="font-semibold text-stone-900 text-sm block">{q.phone || 'Not provided'}</span>
                        </div>
                        <div className="min-w-0">
                          <span className="text-stone-400 block uppercase text-[10px] font-semibold mb-1">Guest Count</span>
                          <span className="font-semibold text-stone-900 text-sm block">{q.guest_count || 0} Guests</span>
                        </div>
                      </div>

                      {/* FOOTER INFO GRID */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 border-t border-stone-200 text-xs">
                        <div>
                          <span className="text-stone-400 block uppercase text-[10px] font-semibold mb-1">Target Event Date</span>
                          <span className="text-stone-800 font-medium">{q.event_date || 'Flexible / Not specified'}</span>
                        </div>
                        <div>
                          <span className="text-stone-400 block uppercase text-[10px] font-semibold mb-1">Optional Add-ons</span>
                          <span className="text-stone-800 font-medium">{q.extras || 'None selected'}</span>
                        </div>
                        <div>
                          <span className="text-stone-400 block uppercase text-[10px] font-semibold mb-1">Submitted At</span>
                          <span className="text-stone-800">{q.created_at ? new Date(q.created_at).toLocaleString() : ''}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* CONTACTS LIST */}
          {activeTab === 'contacts' && (
            <div>
              <h2 className="text-xl font-serif text-stone-950 mb-4">Contact Messages</h2>
              {contacts.length === 0 ? (
                <p className="text-xs text-stone-500 italic bg-[#FAF7F2] p-6 border border-[#E8E2D9]">
                  No contact messages received in Supabase yet.
                </p>
              ) : (
                <div className="space-y-4">
                  {contacts.map((c, idx) => (
                    <div key={c.id || idx} className="bg-[#FAF7F2] p-6 border border-[#E8E2D9] text-xs space-y-2">
                      <div className="flex justify-between font-semibold text-stone-900 border-b border-[#E8E2D9] pb-2">
                        <span className="text-sm font-serif">{c.name} ({c.email})</span>
                        <span className="text-stone-400 text-[10px]">{c.created_at ? new Date(c.created_at).toLocaleString() : ''}</span>
                      </div>
                      <p className="text-stone-700 pt-1 leading-relaxed">{c.message}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  // SIGN IN FORM
  return (
    <div className="bg-[#FAF7F2] min-h-[80vh] flex items-center justify-center py-16 px-6 font-sans text-stone-900">
      <div className="max-w-md w-full bg-[#F5F0E8] border border-[#E8E2D9] p-8 md:p-10 shadow-sm">
        <div className="text-center mb-8">
          <p className="text-xs uppercase tracking-widest text-stone-500 mb-2 font-medium">ADMIN ACCESS</p>
          <h1 className="text-3xl font-serif text-stone-950">Sign In</h1>
          <p className="text-stone-600 text-xs mt-2">
            Sign in with your Supabase account credentials to view all submissions.
          </p>
        </div>

        {errorMessage && (
          <div className="mb-6 p-3 bg-red-100 border border-red-200 text-red-700 text-xs text-center">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs uppercase tracking-widest font-semibold text-stone-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@nojozivenue.co.za"
              className="w-full bg-[#FAF7F2] border border-[#E8E2D9] px-4 py-3 text-sm focus:outline-none focus:border-[#D99B26]"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest font-semibold text-stone-700 mb-2">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-[#FAF7F2] border border-[#E8E2D9] px-4 py-3 text-sm focus:outline-none focus:border-[#D99B26]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#D99B26] text-white text-xs uppercase tracking-widest font-semibold py-3.5 hover:bg-[#b8821d] transition disabled:opacity-50"
          >
            {loading ? 'AUTHENTICATING...' : 'SIGN IN'}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-[#E8E2D9] text-center">
          <Link to="/" className="text-xs text-stone-500 hover:text-stone-900 transition">
            &larr; Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Admin;