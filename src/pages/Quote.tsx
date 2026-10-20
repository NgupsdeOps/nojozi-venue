import React, { useState } from 'react';
import { CheckCircle, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

const EVENT_TYPES = [
  'Birthday Party',
  'Baby Shower',
  'Pool Party',
  'Team Building',
  'Open Buffet',
  'General Event / Private Function'
];

const EXTRAS_OPTIONS = [
  { id: 'furniture', name: 'Furniture (Tables, Chairs, Lounges)' },
  { id: 'catering', name: 'Catering & Food Service' },
  { id: 'security', name: 'On-site Security Personnel' },
  { id: 'decor', name: 'Decor & Styling Assistance' }
];

export const Quote: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [formData, setFormData] = useState({
    eventType: EVENT_TYPES[0],
    eventDate: '',
    guestCount: 20,
    selectedExtras: [] as string[],
    fullName: '',
    email: '',
    phone: '',
    notes: ''
  });

  const handleExtraToggle = (id: string) => {
    setFormData(prev => ({
      ...prev,
      selectedExtras: prev.selectedExtras.includes(id)
        ? prev.selectedExtras.filter(item => item !== id)
        : [...prev.selectedExtras, id]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const { error } = await supabase.from('bookings').insert([
        {
          event_type: formData.eventType,
          event_date: formData.eventDate,
          guest_count: formData.guestCount,
          extras: formData.selectedExtras,
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          notes: formData.notes
        }
      ]);

      if (error) throw error;
      setSubmitted(true);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to submit quote request.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto my-20 p-8 bg-white border border-[#E8DCCB] text-center shadow-sm">
        <CheckCircle className="mx-auto text-[#E5A93B] mb-4" size={56} />
        <h2 className="font-serif text-3xl text-[#1A1A1A] mb-3">Quote Request Saved!</h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-6">
          Thank you, <strong className="text-[#1A1A1A]">{formData.fullName}</strong>. We have saved your request for a <strong>{formData.eventType}</strong> on <strong>{formData.eventDate}</strong> in our database.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="bg-[#E5A93B] hover:bg-[#C68B29] text-white text-xs font-semibold px-6 py-3 uppercase tracking-wider transition-all"
        >
          Request Another Quote
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF6F0] min-h-screen py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-widest text-[#C68B29] font-semibold mb-2 block">
            CUSTOMISE YOUR EVENT
          </span>
          <h1 className="font-serif text-4xl text-[#1A1A1A] mb-3">
            Build Your Quotation
          </h1>
        </div>

        {errorMsg && (
          <div className="bg-red-50 text-red-700 p-4 border border-red-200 text-xs mb-6">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white border border-[#E8DCCB] p-8 space-y-8 shadow-sm">
          <div>
            <label className="block font-serif text-lg text-[#1A1A1A] mb-3">1. Select Event Type</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {EVENT_TYPES.map((type) => (
                <button
                  type="button"
                  key={type}
                  onClick={() => setFormData({ ...formData, eventType: type })}
                  className={`p-3 text-xs text-left border transition-all ${
                    formData.eventType === type
                      ? 'border-[#E5A93B] bg-[#FAF6F0] font-semibold text-[#1A1A1A]'
                      : 'border-gray-200 hover:border-gray-300 text-gray-600'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block font-serif text-lg text-[#1A1A1A] mb-2">2. Preferred Date</label>
              <input
                type="date"
                required
                value={formData.eventDate}
                onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                className="w-full border border-gray-300 p-3 text-xs focus:outline-none focus:border-[#E5A93B]"
              />
            </div>
            <div>
              <label className="block font-serif text-lg text-[#1A1A1A] mb-2">3. Expected Guests</label>
              <input
                type="number"
                min="1"
                required
                value={formData.guestCount}
                onChange={(e) => setFormData({ ...formData, guestCount: parseInt(e.target.value) || 0 })}
                className="w-full border border-gray-300 p-3 text-xs focus:outline-none focus:border-[#E5A93B]"
              />
            </div>
          </div>

          <div>
            <label className="block font-serif text-lg text-[#1A1A1A] mb-3">4. Optional Extras</label>
            <div className="space-y-2">
              {EXTRAS_OPTIONS.map((extra) => (
                <label key={extra.id} className="flex items-center space-x-3 text-xs text-gray-700 cursor-pointer p-2 hover:bg-[#FAF6F0]">
                  <input
                    type="checkbox"
                    checked={formData.selectedExtras.includes(extra.id)}
                    onChange={() => handleExtraToggle(extra.id)}
                    className="accent-[#E5A93B]"
                  />
                  <span>{extra.name}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-gray-100">
            <h3 className="font-serif text-lg text-[#1A1A1A]">5. Contact Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Full Name *"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="border border-gray-300 p-3 text-xs focus:outline-none focus:border-[#E5A93B]"
              />
              <input
                type="email"
                placeholder="Email Address *"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="border border-gray-300 p-3 text-xs focus:outline-none focus:border-[#E5A93B]"
              />
              <input
                type="tel"
                placeholder="Phone Number *"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="border border-gray-300 p-3 text-xs focus:outline-none focus:border-[#E5A93B]"
              />
            </div>
            <textarea
              rows={3}
              placeholder="Special requirements or questions..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full border border-gray-300 p-3 text-xs focus:outline-none focus:border-[#E5A93B]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#E5A93B] hover:bg-[#C68B29] text-white text-xs font-semibold py-4 uppercase tracking-wider transition-all shadow-sm flex justify-center items-center"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : 'Submit Quotation Request'}
          </button>
        </form>
      </div>
    </div>
  );
};