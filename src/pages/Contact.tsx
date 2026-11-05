import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = {
      client_name: name,
      client_email: email || 'Not Provided',
      client_phone: phone || 'Not Provided',
      message: message,
      source: 'Contact Page Inquiry'
    };

    // 1. Send data to Formspree for email notification
    try {
      const response = await fetch('https://formspree.io/f/mnpproqe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        console.error('Formspree contact error:', await response.text());
      }
    } catch (err) {
      console.error('Formspree contact submission error:', err);
    }

    // 2. Format WhatsApp message and redirect
    const whatsappText = 
      `*NEW GENERAL INQUIRY - NOJOZI VENUE*\n\n` +
      `*Name:* ${name}\n` +
      `*Phone:* ${phone || 'N/A'}\n` +
      `*Email:* ${email || 'N/A'}\n\n` +
      `*Message:* ${message}`;

    setLoading(false);
    window.open(`https://wa.me/27734862637?text=${encodeURIComponent(whatsappText)}`, '_blank');
  };

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-12 px-4 sm:px-6 font-sans text-stone-900">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-widest text-stone-500 mb-2 font-medium">
            GET IN TOUCH
          </p>
          <h1 className="text-3xl sm:text-4xl font-serif text-stone-950">Contact Nojozi Venue</h1>
          <p className="text-xs text-stone-600 mt-2">
            Have questions about bookings, venue visits, or event packages? Reach out to us below.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Details Info Card */}
          <div className="bg-stone-900 text-stone-100 p-6 sm:p-8 space-y-6 flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-serif text-[#D99B26] mb-4">Venue Details</h2>
              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#D99B26] shrink-0 mt-0.5" />
                  <span>Johannesburg South, Gauteng, South Africa</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#D99B26] shrink-0" />
                  <span>073 486 2637</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#D99B26] shrink-0" />
                  <span>info@nojozivenue.co.za</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-stone-800 text-[11px] text-stone-400">
              <p className="font-semibold text-stone-300 mb-1">Operating Hours</p>
              <p>Mon – Sun: 08:00 AM – 18:00 PM</p>
              <p className="mt-2 text-stone-500">Site visits available by appointment.</p>
            </div>
          </div>

          {/* Formspree + WhatsApp General Inquiry Form */}
          <form onSubmit={handleSubmit} className="md:col-span-2 bg-white border border-[#E8E2D9] p-6 sm:p-8 space-y-4 shadow-sm">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Full Name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Ayanda Ndlovu"
                className="w-full border border-stone-300 p-2.5 text-xs bg-[#FAF7F2] focus:outline-none focus:border-stone-900"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">WhatsApp Phone *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 073 486 2637"
                  className="w-full border border-stone-300 p-2.5 text-xs bg-[#FAF7F2] focus:outline-none focus:border-stone-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="client@example.com"
                  className="w-full border border-stone-300 p-2.5 text-xs bg-[#FAF7F2] focus:outline-none focus:border-stone-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Your Message *</label>
              <textarea
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="How can we help you plan your event?"
                className="w-full border border-stone-300 p-2.5 text-xs bg-[#FAF7F2] focus:outline-none focus:border-stone-900"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-stone-900 text-white text-xs uppercase tracking-widest py-3.5 hover:bg-[#D99B26] transition font-semibold flex items-center justify-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              {loading ? 'Sending...' : 'Send Message to Email & WhatsApp'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;