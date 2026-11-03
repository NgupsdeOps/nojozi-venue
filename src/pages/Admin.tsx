import React, { useState, useEffect } from 'react';

export function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');

  // Check if session is already saved in memory/storage
  useEffect(() => {
    const session = sessionStorage.getItem('nojozi_admin_auth');
    if (session === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default admin passcode - change this to your preferred PIN/password
    if (passcode === '1234' || passcode === 'nojozi2026') {
      setIsAuthenticated(true);
      sessionStorage.setItem('nojozi_admin_auth', 'true');
      setError('');
      setPasscode('');
    } else {
      setError('Invalid admin passcode. Please try again.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('nojozi_admin_auth');
  };

  // 1. SIGN IN SCREEN
  if (!isAuthenticated) {
    return (
      <div className="bg-[#FAF7F2] min-h-screen py-24 px-6 font-sans text-stone-900 flex items-center justify-center">
        <div className="max-w-md w-full bg-white border border-[#E8E2D9] p-8 md:p-10 shadow-sm text-center">
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
                className="w-full border border-stone-300 p-3 bg-[#FAF7F2] text-center text-stone-900 tracking-widest text-base"
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

  // 2. DASHBOARD SCREEN (WHEN LOGGED IN)
  return (
    <div className="bg-[#FAF7F2] min-h-screen py-16 px-6 font-sans text-stone-900">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 border-b border-[#E8E2D9] pb-6 gap-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-stone-500 mb-1 font-medium">
              VENUE MANAGEMENT PORTAL
            </p>
            <h1 className="text-3xl font-serif text-stone-950">Admin Dashboard</h1>
          </div>
          
          <button
            onClick={handleLogout}
            className="bg-stone-900 text-white text-xs uppercase tracking-widest px-5 py-2.5 hover:bg-red-700 transition font-semibold"
          >
            Sign Out
          </button>
        </div>

        {/* Placeholder / Future expansion state */}
        <div className="bg-white border border-[#E8E2D9] p-8 md:p-12 text-center space-y-4">
          <p className="text-xs uppercase tracking-widest text-stone-500 font-medium">
            DIRECT WHATSAPP BOOKING WORKFLOW ACTIVE
          </p>
          <h2 className="text-xl font-serif text-stone-950">Management Portal Standby</h2>
          <p className="text-xs text-stone-600 max-w-lg mx-auto leading-relaxed">
            All client quotes and booking inquiries are currently routed directly to your primary WhatsApp line for immediate communication and quick responses.
          </p>
          <div className="pt-4">
            <span className="inline-block bg-[#FAF7F2] border border-[#E8E2D9] text-stone-700 text-xs px-4 py-2 font-mono">
              Status: Authenticated & Active
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;