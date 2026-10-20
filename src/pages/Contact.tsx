import React, { useState } from 'react';
import { CheckCircle, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

export const Contact: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const { error } = await supabase.from('enquiries').insert([
        {
          full_name: form.name,
          email: form.email,
          phone: form.phone,
          subject: form.subject,
          message: form.message
        }
      ]);

      if (error) throw error;
      setSubmitted(true);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to send message.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#FAF6F0] min-h-screen py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-widest text-[#C68B29] font-semibold mb-2 block">CONTACT US</span>
          <h1 className="font-serif text-4xl text-[#1A1A1A] mb-3">Let's plan your event</h1>
          <p className="text-xs text-gray-500">Send us a message and we'll be in touch.</p>
        </div>

        {errorMsg && (
          <div className="bg-red-50 text-red-700 p-4 border border-red-200 text-xs mb-6">
            {errorMsg}
          </div>
        )}

        {submitted ? (
          <div className="bg-white border border-[#E8DCCB] p-8 text-center shadow-sm">
            <CheckCircle className="mx-auto text-[#E5A93B] mb-4" size={48} />
            <h2 className="font-serif text-2xl text-[#1A1A1A] mb-2">Message Sent Successfully!</h2>
            <p className="text-xs text-gray-600 mb-6">Thank you, {form.name}. We have saved your message in our database.</p>
            <button
              onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', subject: '', message: '' }); }}
              className="bg-[#E5A93B] text-white text-xs font-semibold px-6 py-3 uppercase tracking-wider"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white border border-[#E8DCCB] p-8 space-y-6 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Full Name *"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="border border-gray-300 p-3 text-xs focus:outline-none focus:border-[#E5A93B]"
              />
              <input
                type="email"
                placeholder="Email Address *"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="border border-gray-300 p-3 text-xs focus:outline-none focus:border-[#E5A93B]"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="tel"
                placeholder="Phone Number *"
                required
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="border border-gray-300 p-3 text-xs focus:outline-none focus:border-[#E5A93B]"
              />
              <input
                type="text"
                placeholder="Subject *"
                required
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="border border-gray-300 p-3 text-xs focus:outline-none focus:border-[#E5A93B]"
              />
            </div>
            <textarea
              rows={5}
              placeholder="Your Message *"
              required
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full border border-gray-300 p-3 text-xs focus:outline-none focus:border-[#E5A93B]"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#E5A93B] hover:bg-[#C68B29] text-white text-xs font-semibold py-4 uppercase tracking-wider transition-all shadow-sm flex justify-center items-center"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : 'Send Message'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};