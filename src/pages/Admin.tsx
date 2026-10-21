import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export function Admin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Logging in with ' + email);
  };

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
              placeholder="••••••••"
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