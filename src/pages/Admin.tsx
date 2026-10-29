import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface Quote {
  id?: string | number;
  name: string;
  email: string;
  phone: string;
  event_date: string;
  event_type: string;
  total_price?: number;
  details?: string;
  created_at?: string;
}

interface Contact {
  id?: string | number;
  name: string;
  email: string;
  message: string;
  created_at?: string;
}

interface Review {
  id?: string | number;
  name: string;
  rating: number;
  comment: string;
  created_at?: string;
}

export function Admin() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past' | 'contacts' | 'reviews'>('upcoming');
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);

    // 1. Fetch from Supabase
    let sbQuotes: Quote[] = [];
    let sbContacts: Contact[] = [];
    let sbReviews: Review[] = [];

    try {
      const qRes = await supabase.from('quotes').select('*');
      if (qRes.data) sbQuotes = qRes.data;

      const cRes = await supabase.from('contacts').select('*');
      if (cRes.data) sbContacts = cRes.data;

      const rRes = await supabase.from('reviews').select('*');
      if (rRes.data) sbReviews = rRes.data;
    } catch (err) {
      console.warn('Supabase fetch error, relying on local storage:', err);
    }

    // 2. Fetch Local Storage Fallbacks and merge
    try {
      const localQuotes = JSON.parse(localStorage.getItem('nojozi_quotes') || '[]');
      // Merge unique by email/date/name or ID
      const mergedQuotes = [...localQuotes, ...sbQuotes];
      // Deduplicate quotes
      const uniqueQuotes = Array.from(new Map(mergedQuotes.map(item => [item.id || item.created_at || item.email, item])).values());
      setQuotes(uniqueQuotes);
    } catch (e) {
      setQuotes(sbQuotes);
    }

    setContacts(sbContacts);
    setReviews(sbReviews);
    setLoading(false);
  };

  // Separate quotes into Upcoming and Past based on event_date
  const today = new Date().toISOString().split('T')[0];
  
  const upcomingQuotes = quotes.filter((q) => {
    if (!q.event_date) return true; // default to upcoming if no date
    return q.event_date >= today;
  }).sort((a, b) => (a.event_date || '').localeCompare(b.event_date || ''));

  const pastQuotes = quotes.filter((q) => {
    if (!q.event_date) return false;
    return q.event_date < today;
  }).sort((a, b) => (b.event_date || '').localeCompare(a.event_date || ''));

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-16 px-6 font-sans text-stone-900">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 border-b border-[#E8E2D9] pb-6">
          <div>
            <p className="text-xs uppercase tracking-widest text-stone-500 mb-1 font-medium">
              VENUE MANAGEMENT PORTAL
            </p>
            <h1 className="text-3xl font-serif text-stone-950">Admin Dashboard</h1>
          </div>
          <button
            onClick={fetchAllData}
            className="mt-4 md:mt-0 bg-stone-900 text-white text-xs uppercase tracking-widest px-4 py-2 hover:bg-[#D99B26] transition"
          >
            {loading ? 'Refreshing...' : 'Refresh Data'}
          </button>
        </div>

        {/* TABS NAVIGATION */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-[#E8E2D9] pb-4">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`px-5 py-2.5 text-xs uppercase tracking-widest font-semibold transition ${
              activeTab === 'upcoming'
                ? 'bg-stone-900 text-white'
                : 'bg-white border border-[#E8E2D9] text-stone-700 hover:bg-stone-100'
            }`}
          >
            Upcoming Events ({upcomingQuotes.length})
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`px-5 py-2.5 text-xs uppercase tracking-widest font-semibold transition ${
              activeTab === 'past'
                ? 'bg-stone-900 text-white'
                : 'bg-white border border-[#E8E2D9] text-stone-700 hover:bg-stone-100'
            }`}
          >
            Past Events ({pastQuotes.length})
          </button>
          <button
            onClick={() => setActiveTab('contacts')}
            className={`px-5 py-2.5 text-xs uppercase tracking-widest font-semibold transition ${
              activeTab === 'contacts'
                ? 'bg-stone-900 text-white'
                : 'bg-white border border-[#E8E2D9] text-stone-700 hover:bg-stone-100'
            }`}
          >
            Contact Inquiries ({contacts.length})
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-5 py-2.5 text-xs uppercase tracking-widest font-semibold transition ${
              activeTab === 'reviews'
                ? 'bg-stone-900 text-white'
                : 'bg-white border border-[#E8E2D9] text-stone-700 hover:bg-stone-100'
            }`}
          >
            Guest Reviews ({reviews.length})
          </button>
        </div>

        {/* TAB CONTENT */}
        {loading ? (
          <div className="text-center py-20 text-stone-500 text-xs uppercase tracking-widest">
            Loading dashboard data...
          </div>
        ) : (
          <div>
            {/* UPCOMING EVENTS */}
            {activeTab === 'upcoming' && (
              <div className="space-y-4">
                <h2 className="text-xl font-serif text-stone-950 mb-4">Upcoming Bookings & Quotes</h2>
                {upcomingQuotes.length === 0 ? (
                  <p className="text-xs text-stone-500 bg-white p-8 border border-[#E8E2D9] text-center">
                    No upcoming event quotes found.
                  </p>
                ) : (
                  <div className="grid md:grid-cols-2 gap-4">
                    {upcomingQuotes.map((q, idx) => (
                      <div key={idx} className="bg-white border border-[#E8E2D9] p-6 space-y-3 shadow-sm">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="text-[10px] uppercase tracking-widest bg-stone-900 text-white px-2 py-1 font-semibold">
                              {q.event_type || 'Event Booking'}
                            </span>
                            <h3 className="text-lg font-serif text-stone-950 mt-2">{q.name}</h3>
                          </div>
                          {q.total_price && (
                            <span className="text-sm font-serif font-bold text-[#D99B26]">
                              R{Number(q.total_price).toLocaleString()}
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-stone-600 space-y-1">
                          <p><strong>Date:</strong> {q.event_date || 'Not specified'}</p>
                          <p><strong>Email:</strong> {q.email}</p>
                          <p><strong>Phone:</strong> {q.phone}</p>
                          {q.details && <p className="pt-2 text-stone-700 bg-[#FAF7F2] p-2 border border-[#E8E2D9]"><strong>Details:</strong> {q.details}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* PAST EVENTS */}
            {activeTab === 'past' && (
              <div className="space-y-4">
                <h2 className="text-xl font-serif text-stone-950 mb-4">Past Event History</h2>
                {pastQuotes.length === 0 ? (
                  <p className="text-xs text-stone-500 bg-white p-8 border border-[#E8E2D9] text-center">
                    No past event records found.
                  </p>
                ) : (
                  <div className="grid md:grid-cols-2 gap-4">
                    {pastQuotes.map((q, idx) => (
                      <div key={idx} className="bg-white border border-[#E8E2D9] p-6 space-y-3 opacity-90 shadow-sm">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="text-[10px] uppercase tracking-widest bg-stone-500 text-white px-2 py-1 font-semibold">
                              PAST — {q.event_type || 'Event Booking'}
                            </span>
                            <h3 className="text-lg font-serif text-stone-950 mt-2">{q.name}</h3>
                          </div>
                          {q.total_price && (
                            <span className="text-sm font-serif font-bold text-stone-700">
                              R{Number(q.total_price).toLocaleString()}
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-stone-600 space-y-1">
                          <p><strong>Date:</strong> {q.event_date}</p>
                          <p><strong>Email:</strong> {q.email}</p>
                          <p><strong>Phone:</strong> {q.phone}</p>
                          {q.details && <p className="pt-2 text-stone-700 bg-[#FAF7F2] p-2 border border-[#E8E2D9]"><strong>Details:</strong> {q.details}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* CONTACTS */}
            {activeTab === 'contacts' && (
              <div className="space-y-4">
                <h2 className="text-xl font-serif text-stone-950 mb-4">Client Inquiries</h2>
                {contacts.length === 0 ? (
                  <p className="text-xs text-stone-500 bg-white p-8 border border-[#E8E2D9] text-center">
                    No contact messages found.
                  </p>
                ) : (
                  <div className="grid md:grid-cols-2 gap-4">
                    {contacts.map((c, idx) => (
                      <div key={idx} className="bg-white border border-[#E8E2D9] p-6 space-y-2">
                        <h3 className="text-base font-serif text-stone-950">{c.name}</h3>
                        <p className="text-xs text-stone-500">{c.email}</p>
                        <p className="text-xs text-stone-700 bg-[#FAF7F2] p-3 border border-[#E8E2D9] mt-2">{c.message}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* REVIEWS */}
            {activeTab === 'reviews' && (
              <div className="space-y-4">
                <h2 className="text-xl font-serif text-stone-950 mb-4">Guest Reviews</h2>
                {reviews.length === 0 ? (
                  <p className="text-xs text-stone-500 bg-white p-8 border border-[#E8E2D9] text-center">
                    No guest reviews found.
                  </p>
                ) : (
                  <div className="grid md:grid-cols-2 gap-4">
                    {reviews.map((r, idx) => (
                      <div key={idx} className="bg-white border border-[#E8E2D9] p-6 space-y-2">
                        <div className="flex justify-between">
                          <h3 className="text-base font-serif text-stone-950">{r.name}</h3>
                          <span className="text-[#D99B26] font-semibold text-xs">★ {r.rating} / 5</span>
                        </div>
                        <p className="text-xs text-stone-700 italic">"{r.comment}"</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Admin;