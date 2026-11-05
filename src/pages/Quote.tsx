import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

// Affordable Decor Theme Definitions with Swatches & Lowered Estimates
const DECOR_THEMES = [
  { id: 'royal_blue', name: 'Royal Elegance', colors: ['#1E3A8A', '#F59E0B'], estimate: 900, desc: 'Deep Blue & Gold accents' },
  { id: 'botanical', name: 'Botanical Harmony', colors: ['#15803D', '#FFFFFF'], estimate: 750, desc: 'Fresh Green & Pure White' },
  { id: 'midnight', name: 'Midnight Glamour', colors: ['#09090B', '#D99B26'], estimate: 900, desc: 'Sleek Black & Luxe Gold' },
  { id: 'earthy', name: 'Earthy Warmth', colors: ['#D5C5B1', '#FFFFFF'], estimate: 600, desc: 'Warm Beige & Clean White' },
  { id: 'classic', name: 'Classic Pure', colors: ['#FFFFFF', '#E5E7EB'], estimate: 400, desc: 'All White Crisp Aesthetic' },
];

export function Quote() {
  // Client Details
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');

  // Event Category & Details
  const [eventType, setEventType] = useState('pool_party');
  const [eventDate, setEventDate] = useState('');
  const [guestCount, setGuestCount] = useState<number>(50);

  // Per-Person Tier Selections (For Buffet & Private Functions / Catering)
  const [buffetRate, setBuffetRate] = useState<number>(250);
  const [privateRate, setPrivateRate] = useState<number>(100);

  // Decor Theme
  const [selectedTheme, setSelectedTheme] = useState<string>('none');

  // Seating & Furniture Extras
  const [chairType, setChairType] = useState<string>('none');
  const [chairQuantity, setChairQuantity] = useState<number>(0);
  const [couchSetCount, setCouchSetCount] = useState<number>(0);
  const [couchSingleCount, setCouchSingleCount] = useState<number>(0);
  const [glassTableCount, setGlassTableCount] = useState<number>(0);
  const [cocktailTableCount, setCocktailTableCount] = useState<number>(0);
  const [cocktailChairCount, setCocktailChairCount] = useState<number>(0);
  const [tableCount, setTableCount] = useState<number>(0);

  // Sound Extras
  const [includeCDJ, setIncludeCDJ] = useState<boolean>(false);
  const [includeMic, setIncludeMic] = useState<boolean>(false);
  const [includeSpeakers, setIncludeSpeakers] = useState<boolean>(false);

  // Security Guards
  const [securityGuards, setSecurityGuards] = useState<number>(0);

  // Category Flags
  const isFullPackage = ['pool_party', 'wedding', 'team_building'].includes(eventType);
  

  // Max Allowed Chairs based on Tier
  const getMaxChairs = (type: string) => {
    if (type === 'r25') return 20;
    if (type === 'r35') return 50;
    if (type === 'r40') return 12;
    return 999;
  };

  const getChairUnitPrice = (type: string) => {
    if (type === 'r25') return 25;
    if (type === 'r35') return 35;
    if (type === 'r40') return 40;
    if (type === 'r50') return 50;
    return 0;
  };

  // --- Dynamic Pricing Engine ---
  const calculateTotal = (): number => {
    let total = 0;

    if (eventType === 'pool_party') total += 10000;
    else if (eventType === 'wedding') total += 15000;
    else if (eventType === 'team_building') total += 3500;
    else if (eventType === 'open_buffet') total += guestCount * buffetRate;
    else if (eventType === 'private_function') total += guestCount * privateRate;

    const themeObj = DECOR_THEMES.find(t => t.id === selectedTheme);
    if (themeObj) total += themeObj.estimate;

    if (includeCDJ && includeMic && includeSpeakers) {
      total += 2500;
    } else {
      if (includeCDJ) total += 850;
      if (includeMic) total += 150;
      if (includeSpeakers) total += 1500;
    }

    total += securityGuards * 1200;

    if (isFullPackage) {
      total += chairQuantity * getChairUnitPrice(chairType);
      total += couchSetCount * 750;
      total += couchSingleCount * 500;
      total += glassTableCount * 350;
      total += tableCount * 200;
      total += cocktailTableCount * 150;
      total += cocktailChairCount * 45;
    }

    return total;
  };

  const handleSubmitQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    const totalPrice = calculateTotal();
    const themeObj = DECOR_THEMES.find(t => t.id === selectedTheme);

    const formData = {
      client_name: clientName,
      client_phone: clientPhone,
      client_email: clientEmail || 'Not Provided',
      event_type: eventType,
      event_date: eventDate,
      guests: guestCount,
      total_price: totalPrice,
      decor_theme: themeObj ? themeObj.name : 'None',
      security_guards: securityGuards
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
        console.error('Formspree error:', await response.text());
      }
    } catch (err) {
      console.error('Formspree submission error:', err);
    }

    // 2. Save backup copy to Supabase database
    try {
      await supabase.from('quotes').insert([{
        name: clientName,
        phone: clientPhone,
        email: clientEmail,
        event_type: eventType,
        event_date: eventDate,
        guests: guestCount,
        total_price: totalPrice,
        items: formData
      }]);
    } catch (err) {
      console.error('Supabase DB log error:', err);
    }

    // 3. Format WhatsApp message text and open
    const whatsappText = 
      `*NEW CUSTOM QUOTE REQUEST - NOJOZI VENUE*\n\n` +
      `*Client:* ${clientName}\n` +
      `*Phone:* ${clientPhone}\n` +
      `*Email:* ${clientEmail || 'N/A'}\n\n` +
      `*EVENT SELECTION*\n` +
      `• Category: ${eventType.toUpperCase().replace('_', ' ')}\n` +
      `• Date: ${eventDate}\n` +
      `• Guests: ${guestCount}\n\n` +
      `*ESTIMATED TOTAL: R${totalPrice.toLocaleString()}*\n\n` +
      `Please confirm venue and dates availability.`;

    window.open(`https://wa.me/27734862637?text=${encodeURIComponent(whatsappText)}`, '_blank');
  };

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-12 px-4 sm:px-6 font-sans text-stone-900">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-widest text-stone-500 mb-2 font-medium">
            NOJOZI VENUE ESTIMATOR
          </p>
          <h1 className="text-3xl sm:text-4xl font-serif text-stone-950">Build Your Custom Package</h1>
          <p className="text-xs text-stone-600 mt-2">
            Select your event type and customized options to receive an instant total and submit straight to our WhatsApp line & email.
          </p>
        </div>

        <form onSubmit={handleSubmitQuote} className="bg-white border border-[#E8E2D9] p-6 sm:p-10 shadow-sm space-y-8">
          
          {/* STEP 1: CLIENT DETAILS */}
          <div>
            <h2 className="text-base font-serif text-stone-950 border-b border-[#E8E2D9] pb-2 mb-4">
              1. Contact Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="e.g. Ayanda Ndlovu"
                  className="w-full border border-stone-300 p-2.5 text-xs bg-[#FAF7F2] focus:outline-none focus:border-stone-900"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">WhatsApp Number *</label>
                <input
                  type="tel"
                  required
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  placeholder="e.g. 073 486 2637"
                  className="w-full border border-stone-300 p-2.5 text-xs bg-[#FAF7F2] focus:outline-none focus:border-stone-900"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Email Address</label>
                <input
                  type="email"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  placeholder="client@example.com"
                  className="w-full border border-stone-300 p-2.5 text-xs bg-[#FAF7F2] focus:outline-none focus:border-stone-900"
                />
              </div>
            </div>
          </div>

          {/* STEP 2: EVENT CATEGORY & CATERING MENUS */}
          <div>
            <h2 className="text-base font-serif text-stone-950 border-b border-[#E8E2D9] pb-2 mb-4">
              2. Event Category & Date
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Event Type *</label>
                <select
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  className="w-full border border-stone-300 p-2.5 text-xs bg-[#FAF7F2] focus:outline-none focus:border-stone-900 font-medium"
                >
                  <option value="pool_party">Pool Party (R10,000 base)</option>
                  <option value="wedding">Weddings & Engagements (R15,000 incl. Catering)</option>
                  <option value="team_building">Team Building (R3,500 base)</option>
                  <option value="open_buffet">Open Buffet (Per Person Catering)</option>
                  <option value="private_function">Private Function (Per Person)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Event Date *</label>
                <input
                  type="date"
                  required
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full border border-stone-300 p-2.5 text-xs bg-[#FAF7F2] focus:outline-none focus:border-stone-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Guest Count *</label>
                <input
                  type="number"
                  min="1"
                  required
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                  className="w-full border border-stone-300 p-2.5 text-xs bg-[#FAF7F2] focus:outline-none focus:border-stone-900"
                />
              </div>
            </div>

            {eventType === 'open_buffet' && (
              <div className="mt-4 bg-[#FAF7F2] p-4 border border-[#E8E2D9] text-xs space-y-3">
                <span className="font-semibold block text-stone-900">Open Buffet Catering Rate (R150 - R500 per person):</span>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="150"
                    max="500"
                    step="50"
                    value={buffetRate}
                    onChange={(e) => setBuffetRate(Number(e.target.value))}
                    className="w-full accent-stone-900"
                  />
                  <span className="font-serif font-bold text-sm text-[#D99B26] min-w-[70px]">R{buffetRate}/head</span>
                </div>

                <div className="bg-white p-3 border border-stone-200 text-[11px] text-stone-600 space-y-1">
                  <p className="font-semibold text-stone-900">Menu Tier Preview:</p>
                  {buffetRate <= 250 ? (
                    <p>• <strong>Standard Buffet (R150 - R250):</strong> Includes 1 starch (rice or pap), 1 meat option (chicken or beef stew), 1 side salad, and soft drinks.</p>
                  ) : (
                    <p>• <strong>Gourmet / Premium Buffet (R300 - R500):</strong> Includes 2 starches, 2 premium meats (grilled steak, lamb, or roasted chicken), 2 gourmet salads, warm side vegetables, dessert selection, and welcome refreshments.</p>
                  )}
                </div>

                <p className="text-[11px] text-stone-500">Catering Subtotal: R{(guestCount * buffetRate).toLocaleString()}</p>
              </div>
            )}

            {eventType === 'private_function' && (
              <div className="mt-4 bg-[#FAF7F2] p-4 border border-[#E8E2D9] text-xs space-y-2">
                <span className="font-semibold block text-stone-900">Private Function Rate (R60 - R150 per person):</span>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="60"
                    max="150"
                    step="10"
                    value={privateRate}
                    onChange={(e) => setPrivateRate(Number(e.target.value))}
                    className="w-full accent-stone-900"
                  />
                  <span className="font-serif font-bold text-sm text-[#D99B26] min-w-[70px]">R{privateRate}/head</span>
                </div>
                <p className="text-[11px] text-stone-500">Function Subtotal: R{(guestCount * privateRate).toLocaleString()}</p>
              </div>
            )}
          </div>

          {/* STEP 3: THEMED DECOR STYLES */}
          <div>
            <h2 className="text-base font-serif text-stone-950 border-b border-[#E8E2D9] pb-2 mb-4">
              3. Themed Decor Styles
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <div
                onClick={() => setSelectedTheme('none')}
                className={`p-3 border cursor-pointer transition ${
                  selectedTheme === 'none' ? 'border-stone-900 bg-[#FAF7F2]' : 'border-stone-200'
                }`}
              >
                <p className="font-semibold text-xs text-stone-900">Standard / No Decor Package</p>
                <p className="text-[11px] text-stone-500">Venue setup without custom decor</p>
              </div>

              {DECOR_THEMES.map((theme) => (
                <div
                  key={theme.id}
                  onClick={() => setSelectedTheme(theme.id)}
                  className={`p-3 border cursor-pointer transition ${
                    selectedTheme === theme.id ? 'border-stone-900 bg-[#FAF7F2] ring-1 ring-stone-900' : 'border-stone-200 hover:border-stone-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-semibold text-xs text-stone-950">{theme.name}</p>
                    <div className="flex items-center gap-1">
                      {theme.colors.map((c, idx) => (
                        <span key={idx} className="w-3 h-3 rounded-full border border-stone-300" style={{ backgroundColor: c }} />
                      ))}
                    </div>
                  </div>
                  <p className="text-[11px] text-stone-500 mb-1">{theme.desc}</p>
                  <p className="text-[11px] font-semibold text-[#D99B26]">Est. +R{theme.estimate.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>

          {/* STEP 4: SOUND SYSTEM BUNDLE */}
          <div>
            <h2 className="text-base font-serif text-stone-950 border-b border-[#E8E2D9] pb-2 mb-4 flex justify-between items-center">
              <span>4. Sound System Options</span>
              {includeCDJ && includeMic && includeSpeakers && (
                <span className="text-xs bg-[#D99B26] text-white px-2 py-0.5 font-sans font-semibold">Full Bundle Active: R2,500</span>
              )}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <label className={`p-3 border flex items-center justify-between cursor-pointer ${includeCDJ ? 'border-stone-900 bg-[#FAF7F2]' : 'border-stone-200'}`}>
                <div>
                  <span className="font-semibold block text-stone-900">CDJ / Mixer Setup</span>
                  <span className="text-[11px] text-stone-500">R850</span>
                </div>
                <input type="checkbox" checked={includeCDJ} onChange={(e) => setIncludeCDJ(e.target.checked)} className="accent-stone-900" />
              </label>

              <label className={`p-3 border flex items-center justify-between cursor-pointer ${includeMic ? 'border-stone-900 bg-[#FAF7F2]' : 'border-stone-200'}`}>
                <div>
                  <span className="font-semibold block text-stone-900">Microphone</span>
                  <span className="text-[11px] text-stone-500">R150</span>
                </div>
                <input type="checkbox" checked={includeMic} onChange={(e) => setIncludeMic(e.target.checked)} className="accent-stone-900" />
              </label>

              <label className={`p-3 border flex items-center justify-between cursor-pointer ${includeSpeakers ? 'border-stone-900 bg-[#FAF7F2]' : 'border-stone-200'}`}>
                <div>
                  <span className="font-semibold block text-stone-900">Sound Speakers</span>
                  <span className="text-[11px] text-stone-500">R1,500</span>
                </div>
                <input type="checkbox" checked={includeSpeakers} onChange={(e) => setIncludeSpeakers(e.target.checked)} className="accent-stone-900" />
              </label>
            </div>
          </div>

          {/* STEP 5: FURNITURE EXTRAS */}
          {isFullPackage ? (
            <div>
              <h2 className="text-base font-serif text-stone-950 border-b border-[#E8E2D9] pb-2 mb-4">
                5. Seating & Furniture Extras
              </h2>
              
              <div className="space-y-4 text-xs">
                <div className="bg-[#FAF7F2] p-4 border border-[#E8E2D9] grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-stone-900 mb-1">Chair Option</label>
                    <select
                      value={chairType}
                      onChange={(e) => {
                        setChairType(e.target.value);
                        setChairQuantity(0);
                      }}
                      className="w-full border border-stone-300 p-2 bg-white"
                    >
                      <option value="none">No extra chairs needed</option>
                      <option value="r25">Standard Chairs (R25/ea - Max 20 available)</option>
                      <option value="r35">Deluxe Chairs (R35/ea - Max 50 available)</option>
                      <option value="r40">Premium Chairs (R40/ea - Max 12 available)</option>
                      <option value="r50">VIP Chairs (R50/ea - Unlimited)</option>
                    </select>
                  </div>

                  {chairType !== 'none' && (
                    <div>
                      <label className="block font-semibold text-stone-900 mb-1">
                        Quantity (Max {getMaxChairs(chairType)})
                      </label>
                      <input
                        type="number"
                        min="1"
                        max={getMaxChairs(chairType)}
                        value={chairQuantity}
                        onChange={(e) => setChairQuantity(Math.min(Number(e.target.value), getMaxChairs(chairType)))}
                        className="w-full border border-stone-300 p-2 bg-white"
                        placeholder="0"
                      />
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="border border-stone-200 p-3 bg-white">
                    <label className="font-semibold block text-stone-900 mb-1">Event Tables (R200 / table)</label>
                    <input
                      type="number"
                      min="0"
                      value={tableCount}
                      onChange={(e) => setTableCount(Number(e.target.value))}
                      className="w-full border border-stone-300 p-2 bg-[#FAF7F2]"
                      placeholder="0"
                    />
                  </div>

                  <div className="border border-stone-200 p-3 bg-white">
                    <label className="font-semibold block text-stone-900 mb-1">Glass Tables (R350 / table)</label>
                    <input
                      type="number"
                      min="0"
                      value={glassTableCount}
                      onChange={(e) => setGlassTableCount(Number(e.target.value))}
                      className="w-full border border-stone-300 p-2 bg-[#FAF7F2]"
                      placeholder="0"
                    />
                  </div>

                  <div className="border border-stone-200 p-3 bg-white">
                    <label className="font-semibold block text-stone-900 mb-1">Couch Set (R750 / set)</label>
                    <input
                      type="number"
                      min="0"
                      value={couchSetCount}
                      onChange={(e) => setCouchSetCount(Number(e.target.value))}
                      className="w-full border border-stone-300 p-2 bg-[#FAF7F2]"
                      placeholder="0"
                    />
                  </div>

                  <div className="border border-stone-200 p-3 bg-white">
                    <label className="font-semibold block text-stone-900 mb-1">Single Couch (R500 / couch)</label>
                    <input
                      type="number"
                      min="0"
                      value={couchSingleCount}
                      onChange={(e) => setCouchSingleCount(Number(e.target.value))}
                      className="w-full border border-stone-300 p-2 bg-[#FAF7F2]"
                      placeholder="0"
                    />
                  </div>

                  <div className="border border-stone-200 p-3 bg-white">
                    <label className="font-semibold block text-stone-900 mb-1">Cocktail Tables (~R150 / table)</label>
                    <input
                      type="number"
                      min="0"
                      max="3"
                      value={cocktailTableCount}
                      onChange={(e) => setCocktailTableCount(Math.min(Number(e.target.value), 3))}
                      className="w-full border border-stone-300 p-2 bg-[#FAF7F2]"
                      placeholder="Max 3"
                    />
                  </div>

                  <div className="border border-stone-200 p-3 bg-white">
                    <label className="font-semibold block text-stone-900 mb-1">Cocktail Chairs (~R45 / chair)</label>
                    <input
                      type="number"
                      min="0"
                      max="12"
                      value={cocktailChairCount}
                      onChange={(e) => setCocktailChairCount(Math.min(Number(e.target.value), 12))}
                      className="w-full border border-stone-300 p-2 bg-[#FAF7F2]"
                      placeholder="Max 12"
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-[#FAF7F2] p-4 border border-[#E8E2D9] text-xs text-stone-500 italic">
              Note: Extra furniture options (chairs, glass tables, couches) are tailored exclusively for Pool Parties, Weddings, and Team Building packages.
            </div>
          )}

          {/* STEP 6: SECURITY GUARDS */}
          <div>
            <h2 className="text-base font-serif text-stone-950 border-b border-[#E8E2D9] pb-2 mb-4">
              6. Security Guards
            </h2>
            <div className="bg-[#FAF7F2] p-4 border border-[#E8E2D9] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
              <div>
                <span className="font-semibold block text-stone-900">Security Guard Requirement (R1,200 / guard)</span>
                <span className="text-[11px] text-stone-500">Select how many security personnel are required for your event safety.</span>
              </div>
              <input
                type="number"
                min="0"
                value={securityGuards}
                onChange={(e) => setSecurityGuards(Number(e.target.value))}
                className="w-full sm:w-32 border border-stone-300 p-2.5 bg-white text-center font-bold text-sm"
                placeholder="0"
              />
            </div>
          </div>

          {/* STEP 7: LIVE TOTAL & SUBMIT */}
          <div className="bg-[#FAF7F2] border border-[#E8E2D9] p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-stone-500 font-medium">ESTIMATED TOTAL PACKAGE</p>
              <p className="text-3xl font-serif text-[#D99B26] font-bold">
                R{calculateTotal().toLocaleString()}
              </p>
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto bg-stone-900 text-white text-xs uppercase tracking-widest px-8 py-4 hover:bg-[#D99B26] transition font-semibold"
            >
              Send Quote to WhatsApp & Email
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default Quote;