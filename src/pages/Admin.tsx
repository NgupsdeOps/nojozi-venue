import React, { useState, useEffect } from 'react';
import { Calendar, MessageSquare, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

export const Admin: React.FC = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'bookings' | 'enquiries'>('bookings');
  const [bookings, setBookings] = useState<any[]>([]);
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const { data: bData } = await supabase.from('bookings').select('*').order('created_at', { ascending: false });
    if (bData) setBookings(bData);

    const { data: eData } = await supabase.from('enquiries').select('*').order('created_at', { ascending: false });
    if (eData) setEnquiries(eData);

    setLoading(false);
  };

  useEffect(() => {
    if (authenticated) {
      fetchData();
    }
  }, [authenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setAuthenticated(true);
    } else {
      alert('Incorrect password (demo: admin123)');
    }
  };

  if (!authenticated) {
    return (
      <div className="max-w-md mx-auto my-28 p-8 bg-white border border-[#E8DCCB] shadow-sm">
        <h2 className="font-serif text-2xl text-[#1A1A1A] mb-2 text-center">Owner Login</h2>
        <p className="text-xs text-gray-500 mb-6 text-center">Sign in to manage Nojozi Venue bookings and enquiries.</p>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="password"
            placeholder="Password (admin123)"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 p-3 text-xs focus:outline-none focus:border-[#E5A93B]"
          />
          <button
            type="submit"
            className="w-full bg-[#1A1A1A] hover:bg-[#3A3A3A] text-white text-xs font-semibold py-3 uppercase tracking-wider transition-colors"
          >
            Sign In
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF6F0] min-h-screen py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8 border-b border-[#E8DCCB] pb-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#C68B29] font-semibold block">ADMINISTRATION</span>
            <h1 className="font-serif text-3xl text-[#1A1A1A]">Nojozi Venue Dashboard</h1>
          </div>
          <button
            onClick={() => setAuthenticated(false)}
            className="border border-gray-300 bg-white text-xs px-4 py-2 uppercase tracking-wider text-gray-700 hover:bg-gray-50"
          >
            Sign Out
          </button>
        </div>

        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`flex items-center space-x-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider border transition-all ${
              activeTab === 'bookings' ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]' : 'bg-white text-gray-700 border-[#E8DCCB]'
            }`}
          >
            <Calendar size={14} />
            <span>Bookings & Quotes ({bookings.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('enquiries')}
            className={`flex items-center space-x-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider border transition-all ${
              activeTab === 'enquiries' ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]' : 'bg-white text-gray-700 border-[#E8DCCB]'
            }`}
          >
            <MessageSquare size={14} />
            <span>Contact Messages ({enquiries.length})</span>
          </button>
        </div>

        <div className="bg-white border border-[#E8DCCB] p-6 shadow-sm">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="animate-spin text-[#E5A93B]" size={28} />
            </div>
          ) : activeTab === 'bookings' ? (
            bookings.length === 0 ? (
              <p className="text-xs text-gray-500 py-6">No quotation requests yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-gray-600">
                  <thead className="bg-[#FAF6F0] uppercase text-[10px] tracking-wider text-gray-500">
                    <tr>
                      <th className="p-3">Customer</th>
                      <th className="p-3">Event</th>
                      <th className="p-3">Date</th>
                      <th className="p-3">Guests</th>
                      <th className="p-3">Phone</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {bookings.map((b) => (
                      <tr key={b.id} className="hover:bg-gray-50">
                        <td className="p-3 font-semibold text-[#1A1A1A]">{b.full_name}<br/><span className="font-normal text-gray-400">{b.email}</span></td>
                        <td className="p-3">{b.event_type}</td>
                        <td className="p-3">{b.event_date}</td>
                        <td className="p-3">{b.guest_count}</td>
                        <td className="p-3">{b.phone}</td>
                        <td className="p-3">
                          <span className="bg-amber-100 text-amber-800 text-[10px] px-2 py-1 uppercase tracking-wider rounded">
                            {b.status || 'Pending'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          ) : (
            enquiries.length === 0 ? (
              <p className="text-xs text-gray-500 py-6">No contact messages yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-gray-600">
                  <thead className="bg-[#FAF6F0] uppercase text-[10px] tracking-wider text-gray-500">
                    <tr>
                      <th className="p-3">Sender</th>
                      <th className="p-3">Subject</th>
                      <th className="p-3">Message</th>
                      <th className="p-3">Phone</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {enquiries.map((e) => (
                      <tr key={e.id} className="hover:bg-gray-50">
                        <td className="p-3 font-semibold text-[#1A1A1A]">{e.full_name}<br/><span className="font-normal text-gray-400">{e.email}</span></td>
                        <td className="p-3">{e.subject}</td>
                        <td className="p-3 max-w-xs truncate">{e.message}</td>
                        <td className="p-3">{e.phone}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};