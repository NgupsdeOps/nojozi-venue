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

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) fetchQuotes();
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) fetchQuotes();
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchQuotes = async () => {
    try {
      const { data, error } = await supabase.from('quotes').select('*').order('created_at', { ascending: false });
      if (error) console.error('Error fetching quotes:', error);
      else setQuotes(data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMessage(error.message);
    }
    setLoading(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  // IF LOGGED IN WITH REAL SUPABASE ACCOUNT
  if (session) {
    return (
      <div className="bg-[#FAF7F2] min-h-[80vh] py-16 px-6 font-sans text-stone-900">
        <div className="max-w-5xl mx-auto bg-[#F5F0E8] border border-[#E8E2D9] p-8 md:p-10">
          <div className="flex justify-between items-center mb-8 border-b border-[#E8E2D9] pb-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-stone-500 font-medium">ADMIN DASHBOARD</p>
              <h1 className="text-3xl font-serif text-stone-950">Logged in as {session.user.email}</h1>
            </div>
            <button
              onClick={handleSignOut}
              className="bg-stone-900 text-white text-xs uppercase tracking-widest font-semibold px-4 py-2 hover:bg-stone-800 transition"
            >
              Sign Out
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-[#FAF7F2] p-6 border border-[#E8E2D9]">
              <h3 className="text-xs uppercase tracking-widest text-stone-500 mb-1 font-semibold">Total Live Quotes</h3>
              <p className="text-3xl font-serif text-stone-900">{quotes.length}</p>
            </div>
            <div className="bg-[#FAF7F2] p-6 border border-[#E8E2D9]">
              <h3 className="text-xs uppercase tracking-widest text-stone-500 mb-1 font-semibold">Database Status</h3>
              <p className="text-3xl font-serif text-emerald-700">Connected</p>
            </div>
            <div className="bg-[#FAF7F2] p-6 border border-[#E8E2D9]">
              <h3 className="text-xs uppercase tracking-widest text-stone-500 mb-1 font-semibold">Project Host</h3>
              <p className="text-xs font-mono text-stone-700 mt-2 truncate">qbwipveuclqzjnfjdxir</p>
            </div>
          </div>

          <h2 className="text-xl font-serif text-stone-900 mb-4">Received Inquiries & Quotes</h2>
          {quotes.length === 0 ? (
            <p className="text-xs text-stone-500 italic bg-[#FAF7F2] p-6 border border-[#E8E2D9]">
              No quote submissions recorded in Supabase yet.
            </p>
          ) : (
            <div className="space-y-4">
              {quotes.map((q, idx) => (
                <div key={q.id || idx} className="bg-[#FAF7F2] p-4 border border-[#E8E2D9] text-xs">
                  <div className="flex justify-between font-semibold text-stone-900 mb-1">
                    <span>{q.event_type || 'Event Quote'}</span>
                    <span>{q.created_at ? new Date(q.created_at).toLocaleDateString() : ''}</span>
                  </div>
                  <p className="text-stone-600">Email: {q.email || 'N/A'}</p>
                  <p className="text-stone-600">Guests: {q.guest_count || 'N/A'}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // REAL LOGIN FORM
  return (
    <div className="bg-[#FAF7F2] min-h-[80vh] flex items-center justify-center py-16 px-6 font-sans text-stone-900">
      <div className="max-w-md w-full bg-[#F5F0E8] border border-[#E8E2D9] p-8 md:p-10 shadow-sm">
        <div className="text-center mb-8">
          <p className="text-xs uppercase tracking-widest text-stone-500 mb-2 font-medium">ADMIN ACCESS</p>
          <h1 className="text-3xl font-serif text-stone-950">Sign In</h1>
          <p className="text-stone-600 text-xs mt-2">
            Sign in with your real Supabase account credentials.
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