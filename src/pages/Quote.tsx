import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

export function Quote() {
  const [step, setStep] = useState(1);
  const [eventData, setEventData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    eventType: 'Pool Party',
    basePrice: 7500,
    chairs: '' as number | '',
    tables: '' as number | '',
    securityGuards: '' as number | '',
    themeStyle: 'Standard Elegance',
    speakers: false,
    microphones: false,
    cdjs: false,
    accommodation: false,
  });

  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const packagePrices: Record<string, number> = {
    'Pool Party': 7500,
    'Baby Shower': 3000,
    'Team Building': 3000,
    'Open Buffet': 3000,
    'Private Function': 3000,
    'General Event': 3000,
  };

  const themePrices: Record<string, number> = {
    'Standard Elegance': 0,
    'Bohemian Chic': 850,
    'Royal Gold & White': 1200,
    'Tropical Garden': 950,
    'Modern Minimalist': 700,
  };

  const handleEventTypeChange = (type: string) => {
    setEventData({
      ...eventData,
      eventType: type,
      basePrice: packagePrices[type] || 3000,
    });
  };

  const calculateTotal = () => {
    let total = eventData.basePrice;
    total += (typeof eventData.chairs === 'number' ? eventData.chairs : 0) * 25;
    total += (typeof eventData.tables === 'number' ? eventData.tables : 0) * 100;
    total += (typeof eventData.securityGuards === 'number' ? eventData.securityGuards : 0) * 350;
    total += themePrices[eventData.themeStyle] || 0;
    if (eventData.speakers) total += 800;
    if (eventData.microphones) total += 300;
    if (eventData.cdjs) total += 1200;
    if (eventData.accommodation) total += 1200;
    return total;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsSubmitting(true);

    const finalTotal = calculateTotal();
    const guestCount = typeof eventData.chairs === 'number' && eventData.chairs > 0 ? eventData.chairs : 50;
    const summaryDetails = `Theme: ${eventData.themeStyle}, Chairs: ${eventData.chairs || 0}, Tables: ${eventData.tables || 0}, Guards: ${eventData.securityGuards || 0}, Speakers: ${eventData.speakers}, Mics: ${eventData.microphones}, CDJs: ${eventData.cdjs}, Accom: ${eventData.accommodation}`;

    // Standard Payload
    const primaryPayload = {
      name: eventData.name,
      email: eventData.email,
      phone: eventData.phone,
      event_date: eventData.date,
      event_type: eventData.eventType,
      estimated_guests: guestCount,
      total_price: finalTotal,
      details: summaryDetails,
    };

    try {
      // Attempt 1: Standard Insert
      const { error: err1 } = await supabase.from('quotes').insert([primaryPayload]);

      if (!err1) {
        setSubmitted(true);
        setIsSubmitting(false);
        return;
      }

      // Attempt 2: Flexible Fallback (If table schema uses different column names)
      const fallbackPayload = {
        name: eventData.name,
        email: eventData.email,
        phone: eventData.phone,
        event_type: `${eventData.eventType} - Total: R${finalTotal}`,
        details: `${summaryDetails} | Date: ${eventData.date}`,
      };

      const { error: err2 } = await supabase.from('quotes').insert([fallbackPayload]);

      if (!err2) {
        setSubmitted(true);
      } else {
        console.error('Supabase quote submission error:', err1 || err2);
        setErrorMsg('Could not submit quote automatically. Please click WhatsApp below or try again.');
      }
    } catch (err) {
      console.error('Submission exception:', err);
      setErrorMsg('An error occurred. Please try again or WhatsApp us.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-16 px-6 font-sans text-stone-900">
      <div className="max-w-3xl mx-auto bg-white border border-[#E8E2D9] p-8 md:p-12 shadow-sm">
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-widest text-stone-500 mb-2 font-medium">
            CUSTOMIZED BOOKING CALCULATOR
          </p>
          <h1 className="text-3xl font-serif text-stone-950">Build Your Custom Quote</h1>
          <p className="text-xs text-stone-600 mt-2">
            Select your venue package, decor theme, furniture, security, and individual audio equipment.
          </p>
        </div>

        {submitted ? (
          <div className="text-center py-12 space-y-4">
            <h2 className="text-2xl font-serif text-stone-950">Quote Submitted Successfully!</h2>
            <p className="text-xs text-stone-600 max-w-md mx-auto">
              Thank you, <strong>{eventData.name}</strong>! Your quotation estimate of <strong>R{calculateTotal().toLocaleString()}</strong> has been securely logged. We will contact you shortly.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setStep(1);
              }}
              className="mt-6 bg-stone-900 text-white text-xs uppercase tracking-widest px-6 py-3 hover:bg-[#D99B26] transition"
            >
              Build Another Quote
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 && (
              <div className="space-y-4">
                <h2 className="text-lg font-serif text-stone-900 font-semibold">1. Choose Event & Base Venue</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {Object.keys(packagePrices).map((type) => (
                    <button
                      type="button"
                      key={type}
                      onClick={() => handleEventTypeChange(type)}
                      className={`p-4 border text-left text-xs transition ${
                        eventData.eventType === type
                          ? 'border-stone-900 bg-stone-900 text-white font-medium'
                          : 'border-[#E8E2D9] hover:border-stone-400 bg-[#FAF7F2]'
                      }`}
                    >
                      <p className="font-serif text-sm mb-1">{type}</p>
                      <p className="opacity-80">From R{packagePrices[type].toLocaleString()}</p>
                    </button>
                  ))}
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="bg-stone-900 text-white text-xs uppercase tracking-widest px-6 py-3 hover:bg-[#D99B26] transition"
                  >
                    Next: Decor, Furniture & Sound &rarr;
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-lg font-serif text-stone-900 font-semibold">2. Themed Decor, Furniture, Security & Sound</h2>
                
                {/* Themed Decor */}
                <div className="space-y-2 text-xs">
                  <label className="block text-stone-700 font-medium">Select Themed Decor Style</label>
                  <select
                    value={eventData.themeStyle}
                    onChange={(e) => setEventData({ ...eventData, themeStyle: e.target.value })}
                    className="w-full border border-stone-300 p-3 bg-[#FAF7F2]"
                  >
                    {Object.keys(themePrices).map((theme) => (
                      <option key={theme} value={theme}>
                        {theme} {themePrices[theme] > 0 ? `(+R${themePrices[theme]})` : '(Included)'}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Furniture & Security */}
                <div className="grid md:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="block text-stone-700 font-medium mb-1">Chairs (R25 / chair)</label>
                    <input
                      type="number"
                      min="0"
                      placeholder=""
                      value={eventData.chairs}
                      onChange={(e) => setEventData({ ...eventData, chairs: e.target.value === '' ? '' : parseInt(e.target.value) })}
                      className="w-full border border-stone-300 p-3 bg-[#FAF7F2]"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-700 font-medium mb-1">Tables (R100 / table)</label>
                    <input
                      type="number"
                      min="0"
                      placeholder=""
                      value={eventData.tables}
                      onChange={(e) => setEventData({ ...eventData, tables: e.target.value === '' ? '' : parseInt(e.target.value) })}
                      className="w-full border border-stone-300 p-3 bg-[#FAF7F2]"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-700 font-medium mb-1">Security Guards (R350 / guard)</label>
                    <input
                      type="number"
                      min="0"
                      placeholder=""
                      value={eventData.securityGuards}
                      onChange={(e) => setEventData({ ...eventData, securityGuards: e.target.value === '' ? '' : parseInt(e.target.value) })}
                      className="w-full border border-stone-300 p-3 bg-[#FAF7F2]"
                    />
                  </div>
                </div>

                {/* Sound System Equipment Breakdown */}
                <div className="space-y-3 pt-2 text-xs border-t border-[#E8E2D9] pt-4">
                  <p className="font-serif text-sm font-semibold text-stone-900">Audio & Entertainment Equipment</p>
                  
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={eventData.speakers}
                      onChange={(e) => setEventData({ ...eventData, speakers: e.target.checked })}
                      className="w-4 h-4 accent-stone-900"
                    />
                    <span>Professional PA Speakers Setup — <strong>R800</strong></span>
                  </label>

                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={eventData.microphones}
                      onChange={(e) => setEventData({ ...eventData, microphones: e.target.checked })}
                      className="w-4 h-4 accent-stone-900"
                    />
                    <span>Wireless Microphones (Pair) — <strong>R300</strong></span>
                  </label>

                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={eventData.cdjs}
                      onChange={(e) => setEventData({ ...eventData, cdjs: e.target.checked })}
                      className="w-4 h-4 accent-stone-900"
                    />
                    <span>DJ Console / CDJs & Mixer — <strong>R1,200</strong></span>
                  </label>

                  <label className="flex items-center space-x-3 cursor-pointer pt-2">
                    <input
                      type="checkbox"
                      checked={eventData.accommodation}
                      onChange={(e) => setEventData({ ...eventData, accommodation: e.target.checked })}
                      className="w-4 h-4 accent-stone-900"
                    />
                    <span>Overnight Accommodation Suite — <strong>R1,200</strong></span>
                  </label>
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="border border-stone-300 text-stone-700 text-xs uppercase tracking-widest px-6 py-3 hover:bg-stone-100 transition"
                  >
                    &larr; Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="bg-stone-900 text-white text-xs uppercase tracking-widest px-6 py-3 hover:bg-[#D99B26] transition"
                  >
                    Next: Contact & Finalize &rarr;
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <h2 className="text-lg font-serif text-stone-900 font-semibold">3. Client Details & Summary</h2>
                
                <div className="bg-[#FAF7F2] p-4 border border-[#E8E2D9] text-xs space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-stone-600">Selected Event:</span>
                    <span className="font-semibold">{eventData.eventType} (From R{eventData.basePrice.toLocaleString()})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-600">Decor & Extras:</span>
                    <span className="font-semibold">R{(calculateTotal() - eventData.basePrice).toLocaleString()}</span>
                  </div>
                  <div className="border-t border-stone-300 pt-2 flex justify-between text-sm font-serif">
                    <span>Estimated Total:</span>
                    <span className="text-[#D99B26] font-bold">R{calculateTotal().toLocaleString()}</span>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-stone-700 font-medium mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={eventData.name}
                      onChange={(e) => setEventData({ ...eventData, name: e.target.value })}
                      className="w-full border border-stone-300 p-3 bg-[#FAF7F2]"
                      placeholder="e.g. Lwane Maditsi"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-700 font-medium mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={eventData.email}
                      onChange={(e) => setEventData({ ...eventData, email: e.target.value })}
                      className="w-full border border-stone-300 p-3 bg-[#FAF7F2]"
                      placeholder="client@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-700 font-medium mb-1">WhatsApp / Phone Number</label>
                    <input
                      type="text"
                      required
                      value={eventData.phone}
                      onChange={(e) => setEventData({ ...eventData, phone: e.target.value })}
                      className="w-full border border-stone-300 p-3 bg-[#FAF7F2]"
                      placeholder="0637794062"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-700 font-medium mb-1">Event Date</label>
                    <input
                      type="date"
                      required
                      value={eventData.date}
                      onChange={(e) => setEventData({ ...eventData, date: e.target.value })}
                      className="w-full border border-stone-300 p-3 bg-[#FAF7F2]"
                    />
                  </div>
                </div>

                {errorMsg && <p className="text-red-600 text-xs font-medium">{errorMsg}</p>}

                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="border border-stone-300 text-stone-700 text-xs uppercase tracking-widest px-6 py-3 hover:bg-stone-100 transition"
                  >
                    &larr; Back
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#D99B26] text-white text-xs uppercase tracking-widest px-8 py-3.5 hover:bg-stone-900 transition font-semibold disabled:opacity-50"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Quotation'}
                  </button>
                </div>
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
}

export default Quote;