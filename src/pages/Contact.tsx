import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

export function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    const { error } = await supabase.from('contacts').insert([
      { name, email, message }
    ]);

    setLoading(false);

    if (error) {
      setErrorMsg('Failed to send message: ' + error.message);
    } else {
      setSubmitted(true);
    }
  };

  return (
    <div className="bg-[#FAF7F2] min-h-[85vh] py-16 px-6 font-sans text-stone-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-widest text-stone-500 mb-2 font-medium">GET IN TOUCH</p>
          <h1 className="text-4xl md:text-5xl font-serif text-stone-950 mb-3">Contact Nojozi Venue</h1>
          <p className="text-stone-600 text-xs md:text-sm max-w-lg mx-auto">
            Have a question about event availability, catering options, or booking? Reach out to us below.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-12 items-start">
          {/* CONTACT INFO SIDEBAR */}
          <div className="md:col-span-2 bg-[#F5F0E8] border border-[#E8E2D9] p-8 space-y-6">
            <h2 className="text-xl font-serif text-stone-950 border-b border-[#E8E2D9] pb-3">Venue Information</h2>

            <div>
              <p className="text-[10px] uppercase tracking-widest text-stone-500 font-semibold mb-1">Physical Address</p>
              <p className="text-xs text-stone-800 leading-relaxed font-medium">
                18 Milner Drive, Kibler Park,<br />
                Johannesburg, South Africa
              </p>
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-widest text-stone-500 font-semibold mb-1">WhatsApp & Calls</p>
              <a
                href="https://wa.me/27699090089"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#D99B26] font-bold hover:underline block"
              >
                069 909 0089
              </a>
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-widest text-stone-500 font-semibold mb-1">Email Address</p>
              <a
                href="mailto:nojozirestaurant@gmail.com"
                className="text-xs text-stone-800 font-medium hover:text-[#D99B26] transition block break-all"
              >
                nojozirestaurant@gmail.com
              </a>
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-widest text-stone-500 font-semibold mb-1">Social Media</p>
              <a
                href="https://www.instagram.com/nojozi.restaurant?exln=MWdmdmR6MmxlMm0yMA=="
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-stone-800 font-medium hover:text-[#D99B26] transition flex items-center gap-1"
              >
                Instagram: @nojozi.restaurant &rarr;
              </a>
            </div>
          </div>

          {/* MESSAGE FORM */}
          <div className="md:col-span-3">
            {submitted ? (
              <div className="bg-[#F5F0E8] border border-[#E8E2D9] p-10 text-center shadow-sm">
                <span className="text-4xl font-serif text-[#D99B26] block mb-3">✓</span>
                <h3 className="text-2xl font-serif text-stone-950 mb-2">Message Sent</h3>
                <p className="text-stone-600 text-xs">
                  Thank you, <span className="font-semibold">{name}</span>! Your message has been sent to our management team.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 bg-[#F5F0E8] border border-[#E8E2D9] p-8 shadow-sm">
                <h2 className="text-xl font-serif text-stone-950 border-b border-[#E8E2D9] pb-3">Send Us a Message</h2>

                {errorMsg && (
                  <div className="p-3 bg-red-100 border border-red-200 text-red-700 text-xs">
                    {errorMsg}
                  </div>
                )}

                <div>
                  <label className="block text-xs uppercase tracking-widest font-semibold text-stone-700 mb-2">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Doe"
                    className="w-full bg-[#FAF7F2] border border-[#E8E2D9] px-4 py-3 text-xs focus:outline-none focus:border-[#D99B26]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest font-semibold text-stone-700 mb-2">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jane@example.com"
                    className="w-full bg-[#FAF7F2] border border-[#E8E2D9] px-4 py-3 text-xs focus:outline-none focus:border-[#D99B26]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest font-semibold text-stone-700 mb-2">Message *</label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can we assist with your event?"
                    className="w-full bg-[#FAF7F2] border border-[#E8E2D9] px-4 py-3 text-xs focus:outline-none focus:border-[#D99B26]"
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
        </div>
      </div>
    </div>
  );
}

export default Contact;