import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export function Admin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      setIsLoggedIn(true);
    }
  };

  const handleDemoLogin = () => {
    setEmail('admin@nojozivenue.co.za');
    setPassword('demo1234');
    setIsLoggedIn(true);
  };

  if (isLoggedIn) {
    return (
      <div className="bg-[#FAF7F2] min-h-[80vh] py-16 px-6 font-sans text-stone-900">
        <div className="max-w-4xl mx-auto bg-[#F5F0E8] border border-[#E8E2D9] p-8 md:p-10">
          <div className="flex justify-between items-center mb-8 border-b border-[#E8E2D9] pb-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-stone-500 font-medium">ADMIN DASHBOARD</p>
              <h1 className="text-3xl font-serif text-stone-950">Welcome, Venue Manager</h1>
            </div>
            <button
              onClick={() => setIsLoggedIn(false)}
              className="bg-stone-900 text-white text-xs uppercase tracking-widest font-semibold px-4 py-2 hover:bg-stone-800 transition"
            >
              Sign Out
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-[#FAF7F2] p-6 border border-[#E8E2D9]">
              <h3 className="text-xs uppercase tracking-widest text-stone-500 mb-1 font-semibold">Total Quotes</h3>
              <p className="text-3xl font-serif text-stone-900">12</p>
            </div>
            <div className="bg-[#FAF7F2] p-6 border border-[#E8E2D9]">
              <h3 className="text-xs uppercase tracking-widest text-stone-500 mb-1 font-semibold">Pending Requests</h3>
              <p className="text-3xl font-serif text-amber-700">4</p>
            </div>
            <div className="bg-[#FAF7F2] p-6 border border-[#E8E2D9]">
              <h3 className="text-xs uppercase tracking-widest text-stone-500 mb-1 font-semibold">Confirmed Bookings</h3>
              <p className="text-3xl font-serif text-stone-900">8</p>
            </div>
          </div>

          <p className="text-xs text-stone-500">
            Connected to Supabase project: <span className="font-mono text-stone-800">qbwipveuclqzjnfjdxir</span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF7F2] min-h-[80vh] flex items-center justify-center py-16 px-6 font-sans text-stone-900">
      <div className="max-w-md w-full bg-[#F5F0E8] border border-[#E8E2D9] p-8 md:p-10 shadow-sm">
        <div className="text-center mb-8">
          <p className="text-xs uppercase tracking-widest text-stone-500 mb-2 font-medium">ADMIN ACCESS</p>
          <h1 className="text-3xl font-serif text-stone-950">Sign In</h1>
          <p className="text-stone-600 text-xs mt-2">
            Sign in to manage venue bookings, quotations, and customer inquiries.
          </p>
        </div>

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
              placeholder="admin1234"
              className="w-full bg-[#FAF7F2] border border-[#E8E2D9] px-4 py-3 text-sm focus:outline-none focus:border-[#D99B26]"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#D99B26] text-white text-xs uppercase tracking-widest font-semibold py-3.5 hover:bg-[#b8821d] transition"
          >
            SIGN IN
          </button>
        </form>

        <div className="mt-4">
          <button
            onClick={handleDemoLogin}
            type="button"
            className="w-full bg-stone-900 text-white text-xs uppercase tracking-widest font-semibold py-3 hover:bg-stone-800 transition"
          >
            ONE-CLICK DEMO SIGN IN
          </button>
        </div>

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