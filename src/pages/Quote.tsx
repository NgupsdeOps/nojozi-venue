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
    chairs: 0,
    tables: 0,
    securityGuards: 0,
    soundSystem: false,
    accommodation: false,
  });

  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const packagePrices: Record<string, number> = {
    'Pool Party': 7500,
    'Baby Shower': 3000,
    'Team Building': 3000,
    'Open Buffet': 3000,
    'Private Function': 3000,
    'General Event': 3000,
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
    total += eventData.chairs * 25; // R25 per chair
    total += eventData.tables * 100; // R100 per table estimate
    total += eventData.securityGuards * 350; // R350 per guard
    if (eventData.soundSystem) total += 1500; // Sound package
    if (eventData.accommodation) total += 1200; // Accommodation night
    return total;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const finalTotal = calculateTotal();

    const payload = {
      name: eventData.name,
      email: eventData.email,
      phone: eventData.phone,
      event_date: eventData.date,
      event_type: eventData.eventType,
      estimated_guests: eventData.chairs || 50,
      total_price: finalTotal,
      details: `Chairs: ${eventData.chairs}, Tables: ${eventData.tables}, Security: ${eventData.securityGuards}, Sound: ${eventData.soundSystem}, Accommodation: ${eventData.accommodation}`,
    };

    const { error } = await supabase.from('quotes').insert([payload]);

    if (error) {
      setErrorMsg('Failed to submit quote. Please try again or WhatsApp us directly.');
    } else {
      setSubmitted(true);
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
            Select your venue option, customize your furniture, security, sound, and get an instant quote estimate.
          </p>
        </div>

        {submitted ? (
          <div className="text-center py-12 space-y-4">
            <h2 className="text-2xl font-serif text-stone-950">Quote Submitted Successfully!</h2>
            <p className="text-xs text-stone-600 max-w-md mx-auto">
              Thank you! Your quotation has been securely saved to our system. We will review your selections and contact you shortly via WhatsApp or email.
            </p>
            <button
              onClick={() => setSubmitted(false)}
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
                    Next: Add Equipment & Add-ons &rarr;
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-lg font-serif text-stone-900 font-semibold">2. Custom Furniture, Security & Sound</h2>
                
                <div className="grid md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-stone-700 font-medium mb-1">Chairs (R25 per chair)</label>
                    <input
                      type="number"
                      min="0"
                      value={eventData.chairs}
                      onChange={(e) => setEventData({ ...eventData, chairs: parseInt(e.target.value) || 0 })}
                      className="w-full border border-stone-300 p-3 bg-[#FAF7F2]"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-700 font-medium mb-1">Tables (R100 per table)</label>
                    <input
                      type="number"
                      min="0"
                      value={eventData.tables}
                      onChange={(e) => setEventData({ ...eventData, tables: parseInt(e.target.value) || 0 })}
                      className="w-full border border-stone-300 p-3 bg-[#FAF7F2]"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-700 font-medium mb-1">Security Guards (R350 per guard)</label>
                    <input
                      type="number"
                      min="0"
                      value={eventData.securityGuards}
                      onChange={(e) => setEventData({ ...eventData, securityGuards: parseInt(e.target.value) || 0 })}
                      className="w-full border border-stone-300 p-3 bg-[#FAF7F2]"
                    />
                  </div>
                </div>

                <div className="space-y-3 pt-2 text-xs">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={eventData.soundSystem}
                      onChange={(e) => setEventData({ ...eventData, soundSystem: e.target.checked })}
                      className="w-4 h-4 accent-stone-900"
                    />
                    <span>Add Professional Sound System (Speakers, Mics & CDJs) — <strong>R1,500</strong></span>
                  </label>

                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={eventData.accommodation}
                      onChange={(e) => setEventData({ ...eventData, accommodation: e.target.checked })}
                      className="w-4 h-4 accent-stone-900"
                    />
                    <span>Add Overnight Accommodation Suite — <strong>R1,200</strong></span>
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
                    <span className="font-semibold">{eventData.eventType} (From R{eventData.basePrice})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-600">Calculated Extras:</span>
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
                      placeholder="e.g. Ms Thandiswa"
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
                      placeholder="069 909 0089"
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

                {errorMsg && <p className="text-red-600 text-xs">{errorMsg}</p>}

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
                    className="bg-[#D99B26] text-white text-xs uppercase tracking-widest px-8 py-3.5 hover:bg-stone-900 transition font-semibold"
                  >
                    Submit Quotation
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