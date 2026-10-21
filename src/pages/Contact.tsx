import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

export function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from('contacts').insert([
      { name, email, message }
    ]);

    setLoading(false);

    if (error) {
      alert('Failed to send message: ' + error.message);
    } else {
      setSubmitted(true);
    }
  };

  return (
    <div className="bg-[#FAF7F2] min-h-[80vh] py-20 px-6 font-sans text-stone-900 max-w-3xl mx-auto">
      <h1 className="text-4xl font-serif mb-4 text-stone-950">Contact Us</h1>
      <p className="text-stone-600 text-xs mb-8">Send us a message and we'll be in touch shortly.</p>

      {submitted ? (
        <div className="bg-[#F5F0E8] border border-[#E8E2D9] p-8 text-center">
          <h3 className="text-2xl font-serif text-stone-900 mb-2">Thank you!</h3>
          <p className="text-stone-600 text-xs">Your message has been received and saved.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6 bg-[#F5F0E8] border border-[#E8E2D9] p-8">
          <div>
            <label className="block text-xs uppercase tracking-widest font-semibold text-stone-700 mb-2">Your Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#FAF7F2] border border-[#E8E2D9] px-4 py-3 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest font-semibold text-stone-700 mb-2">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#FAF7F2] border border-[#E8E2D9] px-4 py-3 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest font-semibold text-stone-700 mb-2">Message</label>
            <textarea
              required
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-[#FAF7F2] border border-[#E8E2D9] px-4 py-3 text-sm"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#D99B26] text-white text-xs uppercase tracking-widest font-semibold py-3.5 hover:bg-[#b8821d] transition disabled:opacity-50"
          >
            {loading ? 'SENDING...' : 'SEND MESSAGE'}
          </button>
        </form>
      )}
    </div>
  );
}

export default Contact;