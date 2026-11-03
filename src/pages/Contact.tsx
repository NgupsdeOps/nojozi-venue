import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const contactRecord = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      message: formData.message,
      created_at: new Date().toISOString(),
    };

    try {
      await supabase.from('contacts').insert([contactRecord]);
    } catch (err) {
      console.warn('Supabase contact insert warning:', err);
    }

    try {
      const existingContacts = JSON.parse(localStorage.getItem('nojozi_contacts') || '[]');
      localStorage.setItem('nojozi_contacts', JSON.stringify([contactRecord, ...existingContacts]));
    } catch (e) {
      console.error('Local storage error:', e);
    }

    setIsSubmitting(false);
    setSubmitted(true);
  };

  const whatsappUrl = `https://wa.me/27734862637?text=` + encodeURIComponent(`Hi Nojozi Venue, I have an inquiry: `);

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-16 px-6 font-sans text-stone-900">
      <div className="max-w-3xl mx-auto bg-white border border-[#E8E2D9] p-8 md:p-12 shadow-sm">
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-widest text-stone-500 mb-2 font-medium">
            GET IN TOUCH
          </p>
          <h1 className="text-3xl font-serif text-stone-950">Contact Nojozi Venue</h1>
          <p className="text-xs text-stone-600 mt-2">
            Have questions about our venue, packages, or availability? Reach out below or chat with us instantly on WhatsApp.
          </p>
        </div>

        {/* Quick WhatsApp Banner */}
        <div className="mb-8 p-6 bg-[#FAF7F2] border border-[#E8E2D9] text-center space-y-3">
          <p className="text-xs font-serif uppercase tracking-widest text-stone-800 font-semibold">Prefer instant messaging?</p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white text-xs uppercase tracking-widest px-6 py-3 hover:bg-[#20ba5a] transition font-semibold"
          >
            💬 Chat with Us on WhatsApp
          </a>
        </div>

        {submitted ? (
          <div className="text-center py-12 space-y-4">
            <h2 className="text-2xl font-serif text-stone-950">Message Sent Successfully!</h2>
            <p className="text-xs text-stone-600 max-w-md mx-auto">
              Thank you, <strong>{formData.name}</strong>. We have received your inquiry and will get back to you shortly.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({ name: '', email: '', message: '' });
              }}
              className="mt-4 bg-stone-900 text-white text-xs uppercase tracking-widest px-6 py-3 hover:bg-[#D99B26] transition"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-stone-700 font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border border-stone-300 p-3 bg-[#FAF7F2]"
                  placeholder="e.g. Lerato Mokoena"
                />
              </div>
              <div>
                <label className="block text-stone-700 font-medium mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full border border-stone-300 p-3 bg-[#FAF7F2]"
                  placeholder="lerato@example.com"
                />
              </div>
            </div>

            <div className="text-xs">
              <label className="block text-stone-700 font-medium mb-1">Your Message / Inquiry</label>
              <textarea
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full border border-stone-300 p-3 bg-[#FAF7F2]"
                placeholder="Ask about available dates, viewing appointments, or event customization..."
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-stone-900 text-white text-xs uppercase tracking-widest px-8 py-3.5 hover:bg-[#D99B26] transition font-semibold disabled:opacity-50"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default Contact;