import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

// Event types with base rates
const EVENT_TYPES = [
  { id: 'birthday', name: 'Birthday Party', basePrice: 3500 },
  { id: 'babyshower', name: 'Baby Shower', basePrice: 3000 },
  { id: 'poolparty', name: 'Pool Party', basePrice: 4000 },
  { id: 'teambuilding', name: 'Team Building', basePrice: 4500 },
  { id: 'buffet', name: 'Open Buffet Event', basePrice: 5000 },
  { id: 'general', name: 'General & Private Function', basePrice: 3500 },
];

// Optional extra add-ons
const EXTRAS = [
  { id: 'furniture', name: 'Tables, Chairs & Lounge Setup', price: 1500 },
  { id: 'catering', name: 'In-House Catering & Refreshments', price: 3500 },
  { id: 'security', name: 'On-Site Security Personnel', price: 800 },
  { id: 'decor', name: 'Decor Styling & Setup Assistance', price: 2000 },
];

export function Quote() {
  const [selectedEvent, setSelectedEvent] = useState(EVENT_TYPES[0].id);
  const [guestCount, setGuestCount] = useState(30);
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  
  // Contact details
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [eventDate, setEventDate] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Price calculations
  const currentEvent = EVENT_TYPES.find((e) => e.id === selectedEvent) || EVENT_TYPES[0];
  const basePrice = currentEvent.basePrice;
  const guestSurcharge = Math.max(0, guestCount - 20) * 50; // R50 per guest above 20
  const extrasTotal = selectedExtras.reduce((sum, extraId) => {
    const extra = EXTRAS.find((e) => e.id === extraId);
    return sum + (extra ? extra.price : 0);
  }, 0);

  const totalPrice = basePrice + guestSurcharge + extrasTotal;

  const toggleExtra = (id: string) => {
    if (selectedExtras.includes(id)) {
      setSelectedExtras(selectedExtras.filter((item) => item !== id));
    } else {
      setSelectedExtras([...selectedExtras, id]);
    }
  };

  const handleSubmitQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const selectedExtraNames = selectedExtras
        .map((id) => EXTRAS.find((e) => e.id === id)?.name)
        .filter(Boolean)
        .join(', ') || 'None selected';

      // 1. Primary payload with all detailed fields
      const fullPayload = {
        name: name || 'Not provided',
        email: email,
        phone: phone || 'Not provided',
        event_type: currentEvent.name,
        guest_count: guestCount,
        event_date: eventDate || 'Flexible / Not specified',
        extras: selectedExtraNames,
        total_price: totalPrice,
      };

      // Attempt full insert
      let { error } = await supabase.from('quotes').insert([fullPayload]);

      // 2. If Supabase throws a column schema error, fallback to essential columns
      if (error && error.message.includes('column')) {
        console.warn('Retrying insert with core columns:', error.message);
        const fallbackRes = await supabase.from('quotes').insert([
          {
            email: email,
            event_type: currentEvent.name,
            guest_count: guestCount,
            total_price: totalPrice,
          },
        ]);
        error = fallbackRes.error;
      }

      if (error) {
        console.error('Supabase submission error:', error.message);
        setErrorMsg(error.message);
      } else {
        setSubmitted(true);
      }
    } catch (err: any) {
      console.error('Unexpected error during submission:', err);
      setErrorMsg(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#FAF7F2] text-stone-900 font-sans min-h-screen py-16 px-6">
      <div className="max-w-4xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-widest text-stone-500 mb-2 font-medium">
            CUSTOMISE YOUR EVENT
          </p>
          <h1 className="text-4xl md:text-5xl font-serif text-stone-950 mb-4">
            Build Your Quotation
          </h1>
          <p className="text-stone-600 text-xs md:text-sm max-w-xl mx-auto leading-relaxed">
            Select your event details, guest count, and optional extras below to view an instant estimated pricing summary.
          </p>
        </div>

        {submitted ? (
          /* SUCCESS STATE */
          <div className="bg-[#F5F0E8] border border-[#E8E2D9] p-10 text-center max-w-2xl mx-auto shadow-sm">
            <span className="text-4xl font-serif text-[#D99B26] block mb-4">✓</span>
            <h2 className="text-3xl font-serif text-stone-950 mb-3">Quotation Submitted</h2>
            <p className="text-stone-600 text-xs md:text-sm mb-6 leading-relaxed">
              Thank you, <span className="font-semibold">{name || email}</span>! Your estimate of{' '}
              <span className="font-bold text-stone-900">R {totalPrice.toLocaleString()}</span> for a{' '}
              <span className="font-semibold">{currentEvent.name}</span> has been logged. Our venue coordinator will review your request and reach out via email shortly.
            </p>
            <div className="flex justify-center gap-4">
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="bg-stone-900 text-white text-xs uppercase tracking-widest font-semibold px-6 py-3 hover:bg-stone-800 transition"
              >
                BUILD ANOTHER QUOTE
              </button>
              <Link
                to="/"
                className="bg-[#D99B26] text-white text-xs uppercase tracking-widest font-semibold px-6 py-3 hover:bg-[#b8821d] transition"
              >
                RETURN HOME
              </Link>
            </div>
          </div>
        ) : (
          /* FORM BUILDER */
          <form onSubmit={handleSubmitQuote} className="grid md:grid-cols-3 gap-8">
            {/* LEFT COLUMN: OPTIONS */}
            <div className="md:col-span-2 space-y-8">
              {/* STEP 1: EVENT TYPE */}
              <div className="bg-[#F5F0E8] border border-[#E8E2D9] p-6">
                <h3 className="text-xs uppercase tracking-widest font-semibold text-stone-500 mb-4">
                  1. SELECT EVENT TYPE
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {EVENT_TYPES.map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setSelectedEvent(type.id)}
                      className={`text-left p-4 border transition text-xs font-medium ${
                        selectedEvent === type.id
                          ? 'border-[#D99B26] bg-[#FAF7F2] text-stone-950 shadow-sm'
                          : 'border-[#E8E2D9] bg-[#FAF7F2]/50 text-stone-600 hover:border-stone-400'
                      }`}
                    >
                      <div className="font-semibold text-sm mb-1">{type.name}</div>
                      <div className="text-stone-400">From R {type.basePrice.toLocaleString()}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* STEP 2: GUEST COUNT */}
              <div className="bg-[#F5F0E8] border border-[#E8E2D9] p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xs uppercase tracking-widest font-semibold text-stone-500">
                    2. ESTIMATED GUEST COUNT
                  </h3>
                  <span className="text-lg font-serif text-stone-900 font-bold">{guestCount} Guests</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="150"
                  step="5"
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                  className="w-full accent-[#D99B26] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-stone-400 mt-2">
                  <span>10 Guests</span>
                  <span>75 Guests</span>
                  <span>150 Guests</span>
                </div>
              </div>

              {/* STEP 3: OPTIONAL EXTRAS */}
              <div className="bg-[#F5F0E8] border border-[#E8E2D9] p-6">
                <h3 className="text-xs uppercase tracking-widest font-semibold text-stone-500 mb-4">
                  3. TAILOR WITH OPTIONAL EXTRAS
                </h3>
                <div className="space-y-3">
                  {EXTRAS.map((extra) => {
                    const isChecked = selectedExtras.includes(extra.id);
                    return (
                      <div
                        key={extra.id}
                        onClick={() => toggleExtra(extra.id)}
                        className={`flex justify-between items-center p-4 border cursor-pointer transition text-xs ${
                          isChecked
                            ? 'border-[#D99B26] bg-[#FAF7F2] text-stone-950 font-semibold'
                            : 'border-[#E8E2D9] bg-[#FAF7F2]/50 text-stone-600 hover:border-stone-400'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            readOnly
                            className="accent-[#D99B26]"
                          />
                          <span>{extra.name}</span>
                        </div>
                        <span className="text-stone-500">+ R {extra.price.toLocaleString()}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* STEP 4: CONTACT INFORMATION */}
              <div className="bg-[#F5F0E8] border border-[#E8E2D9] p-6 space-y-4">
                <h3 className="text-xs uppercase tracking-widest font-semibold text-stone-500 mb-2">
                  4. YOUR CONTACT DETAILS
                </h3>

                {errorMsg && (
                  <div className="p-3 bg-red-100 border border-red-200 text-red-700 text-xs">
                    {errorMsg}
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-semibold text-stone-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full bg-[#FAF7F2] border border-[#E8E2D9] px-4 py-2.5 text-xs focus:outline-none focus:border-[#D99B26]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-semibold text-stone-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jane@example.com"
                      className="w-full bg-[#FAF7F2] border border-[#E8E2D9] px-4 py-2.5 text-xs focus:outline-none focus:border-[#D99B26]"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-semibold text-stone-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+27 82 123 4567"
                      className="w-full bg-[#FAF7F2] border border-[#E8E2D9] px-4 py-2.5 text-xs focus:outline-none focus:border-[#D99B26]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-semibold text-stone-700 mb-1">
                      Target Event Date
                    </label>
                    <input
                      type="date"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="w-full bg-[#FAF7F2] border border-[#E8E2D9] px-4 py-2.5 text-xs focus:outline-none focus:border-[#D99B26]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: PRICE ESTIMATE SUMMARY CARD */}
            <div className="md:col-span-1">
              <div className="bg-[#F5F0E8] border border-[#E8E2D9] p-6 sticky top-28 shadow-sm space-y-6">
                <div>
                  <p className="text-xs uppercase tracking-widest text-stone-500 font-medium mb-1">
                    ESTIMATE SUMMARY
                  </p>
                  <h3 className="text-2xl font-serif text-stone-950">{currentEvent.name}</h3>
                </div>

                <div className="space-y-3 text-xs border-t border-b border-[#E8E2D9] py-4">
                  <div className="flex justify-between">
                    <span className="text-stone-600">Base Venue Rate</span>
                    <span className="font-semibold text-stone-900">
                      R {basePrice.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-600">Guest Fee ({guestCount} guests)</span>
                    <span className="font-semibold text-stone-900">
                      R {guestSurcharge.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-600">Optional Add-ons</span>
                    <span className="font-semibold text-stone-900">
                      R {extrasTotal.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] uppercase tracking-widest text-stone-500 block mb-1">
                    TOTAL ESTIMATE
                  </span>
                  <div className="text-3xl font-serif text-[#D99B26] font-bold">
                    R {totalPrice.toLocaleString()}
                  </div>
                  <p className="text-[10px] text-stone-400 mt-1">
                    * Final quotation confirmed upon date availability review.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#D99B26] text-white text-xs uppercase tracking-widest font-semibold py-4 hover:bg-[#b8821d] transition disabled:opacity-50 block text-center"
                >
                  {loading ? 'SUBMITTING...' : 'SUBMIT QUOTE REQUEST'}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default Quote;