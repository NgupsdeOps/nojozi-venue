import React, { useState } from 'react';
import { CheckCircle2, Send, Phone, Mail, AlertCircle } from 'lucide-react';

interface EventPackage {
  id: string;
  name: string;
  pricingType: 'flat' | 'per_person';
  price: number;
  description: string;
}

const EVENT_PACKAGES: EventPackage[] = [
  { id: 'full_conf', name: 'Full-Day Conference Venue Package', pricingType: 'flat', price: 4500, description: 'Full-day main hall access, tables, chairs & standard setup (08:00–17:00)' },
  { id: 'half_conf', name: 'Half-Day Conference Venue Package', pricingType: 'flat', price: 2800, description: 'Half-day morning or afternoon venue hire with conference seating' },
  { id: 'boardroom', name: 'Executive Boardroom / Workshop Hire', pricingType: 'flat', price: 1800, description: 'Private meeting space for strategy sessions & small workshops' },
  { id: 'wedding', name: 'Weddings & Engagements', pricingType: 'flat', price: 15000, description: 'Full venue exclusivity including base reception setup & catering coordination' },
  { id: 'pool_party', name: 'Pool Party (Per Person)', pricingType: 'per_person', price: 120, description: 'R120 per guest — full poolside access & outdoor grounds' },
  { id: 'team_building', name: 'Team Building & Corporate Day', pricingType: 'flat', price: 3500, description: 'Indoor & outdoor activity grounds for corporate groups' },
  { id: 'private_func', name: 'Private Function / Celebration', pricingType: 'per_person', price: 100, description: 'R100 per guest base venue hire for birthdays & private gatherings' },
];

const CATERING_TIERS = [
  {
    id: 'none',
    name: 'No Catering (Venue & Extras Only)',
    pricePerHead: 0,
    summary: 'Self-catered or drinks-only arrangement.',
  },
  {
    id: 'tier1',
    name: 'Tier 1: Essential Package — R150/pp',
    pricePerHead: 150,
    summary: 'Main + 2 Sides + 1 Salad. Choice of 2 proteins (Peri-Peri/Lemon-Herb Chicken, Beef Stew, Pork Chops, or Crispy Hake).',
  },
  {
    id: 'tier2',
    name: 'Tier 2: Classic Event Package — R300/pp',
    pricePerHead: 300,
    summary: 'Starter + Main + 3 Sides + Dessert. Choice of 2–3 proteins (Stuffed Chicken Breast, Apricot Pork Neck, Beef Curry/Stroganoff, Grilled Hake).',
  },
  {
    id: 'tier3',
    name: 'Tier 3: Executive Feast — R500/pp',
    pricePerHead: 500,
    summary: 'Starter + Main + 3 Sides + Dessert. 3 proteins served (Sticky BBQ Pork Ribs, Carved Sirloin/Rump, Chicken Ballotine, Kingklip Fillet).',
  },
  {
    id: 'tier4',
    name: 'Tier 4: VIP Signature Banquet — R750/pp',
    pricePerHead: 750,
    summary: 'Arrival Canapés + Plated Starter + 4 Luxury Proteins (Beef Fillet, Crispy Pork Belly, Norwegian Salmon, Truffle Chicken) + 4 Sides + Dessert.',
  },
];

const DECOR_THEMES = [
  { id: 'none', name: 'No Decor Package', price: 0, swatch: '#E5E7EB' },
  { id: 'royal', name: 'Royal Elegance (Navy & Gold)', price: 750, swatch: '#1E3A8A' },
  { id: 'botanical', name: 'Botanical Harmony (Sage & White)', price: 650, swatch: '#4D7C0F' },
  { id: 'midnight', name: 'Midnight Glamour (Black & Gold)', price: 900, swatch: '#18181B' },
  { id: 'earthy', name: 'Earthy Warmth (Terracotta & Cream)', price: 600, swatch: '#B45309' },
  { id: 'classic', name: 'Classic Pure (All White & Silver)', price: 400, swatch: '#F8FAFC' },
];

const SOUND_PACKAGES = [
  { id: 'none', name: 'No Sound Equipment', price: 0 },
  { id: 'mic', name: 'Cordless Microphone Only', price: 150 },
  { id: 'cdj', name: 'CDJ & Mixer Setup', price: 850 },
  { id: 'speakers', name: 'PA Speakers System', price: 1500 },
  { id: 'full_sound', name: 'Full Sound Bundle (Speakers + CDJ/Mixer + Mic)', price: 2500 },
];

const EXTRAS_CATALOG = [
  { id: 'jumping_castle', name: 'Jumping Castle (Full Day Hire)', price: 950 },
  { id: 'couch_set', name: 'VIP Lounge Couch Set', price: 750 },
  { id: 'single_couch', name: 'Single Accent Couch', price: 500 },
  { id: 'glass_table', name: 'Glass Cocktail / Dining Table', price: 350 },
  { id: 'event_table', name: 'Standard Event Table', price: 200 },
  { id: 'cocktail_table', name: 'High Cocktail Table', price: 150 },
  { id: 'cocktail_chair', name: 'Cocktail Bar Stool / Chair', price: 45 },
  { id: 'standard_chair', name: 'Event Chair (Standard / Tiffany)', price: 35 },
  { id: 'security', name: 'Dedicated Event Security Guard', price: 1200 },
];

export function Quote() {
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [selectedPackageId, setSelectedPackageId] = useState(EVENT_PACKAGES[0].id);
  const [eventDate, setEventDate] = useState('');
  const [guestCount, setGuestCount] = useState<number>(30);
  const [cateringId, setCateringId] = useState('none');
  const [cateringNotes, setCateringNotes] = useState('');
  const [decorId, setDecorId] = useState('none');
  const [soundId, setSoundId] = useState('none');
  const [extraQuantities, setExtraQuantities] = useState<Record<string, number>>({});
  const [specialRequests, setSpecialRequests] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [submittedRef, setSubmittedRef] = useState('');

  const activePackage = EVENT_PACKAGES.find((p) => p.id === selectedPackageId) || EVENT_PACKAGES[0];
  const activeCatering = CATERING_TIERS.find((c) => c.id === cateringId) || CATERING_TIERS[0];
  const activeDecor = DECOR_THEMES.find((d) => d.id === decorId) || DECOR_THEMES[0];
  const activeSound = SOUND_PACKAGES.find((s) => s.id === soundId) || SOUND_PACKAGES[0];

  const venueTotal =
    activePackage.pricingType === 'per_person'
      ? activePackage.price * Math.max(1, guestCount)
      : activePackage.price;

  const cateringTotal = activeCatering.pricePerHead * Math.max(1, guestCount);

  const extrasTotal = EXTRAS_CATALOG.reduce((sum, item) => {
    const qty = extraQuantities[item.id] || 0;
    return sum + item.price * qty;
  }, 0);

  const grandTotal = venueTotal + cateringTotal + activeDecor.price + activeSound.price + extrasTotal;

  const updateExtraQty = (id: string, qty: number) => {
    setExtraQuantities((prev) => ({
      ...prev,
      [id]: Math.max(0, qty),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!clientName.trim() || !clientEmail.trim() || !clientPhone.trim() || !eventDate || guestCount < 1 || !specialRequests.trim()) {
      setErrorMsg('Please fill in all required contact, event date, guest count, and enquiry fields before submitting.');
      return;
    }

    setIsSubmitting(true);

    const selectedExtrasFormatted = EXTRAS_CATALOG.filter((item) => (extraQuantities[item.id] || 0) > 0).map(
      (item) => `${item.name} x${extraQuantities[item.id]} (R${(item.price * extraQuantities[item.id]).toLocaleString()})`
    );

    try {
      const response = await fetch('/api/submit-booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName,
          clientEmail,
          clientPhone,
          eventType: activePackage.name,
          eventDate,
          guestCount,
          cateringTier: activeCatering.name,
          cateringNotes,
          decorTheme: activeDecor.name,
          selectedExtras: selectedExtrasFormatted,
          soundPackage: activeSound.name,
          specialRequests,
          estimatedTotal: grandTotal,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Submission failed');
      }

      setSubmittedRef(data.bookingRef);

      const whatsappText = [
        `*NOJOZI VENUE — BOOKING & ENQUIRY (${data.bookingRef})*`,
        `*Name:* ${clientName}`,
        `*Phone:* ${clientPhone}`,
        `*Email:* ${clientEmail}`,
        `*Package:* ${activePackage.name}`,
        `*Date:* ${eventDate} | *Guests:* ${guestCount}`,
        `*Catering:* ${activeCatering.name}`,
        cateringNotes ? `*Menu Notes:* ${cateringNotes}` : '',
        `*Decor:* ${activeDecor.name}`,
        `*Sound:* ${activeSound.name}`,
        selectedExtrasFormatted.length > 0 ? `*Extras:* ${selectedExtrasFormatted.join(', ')}` : '',
        `*Enquiry Details:* ${specialRequests}`,
        `*ESTIMATED TOTAL:* R ${grandTotal.toLocaleString()}`,
      ]
        .filter(Boolean)
        .join('\n');

      window.open(`https://wa.me/27699090089?text=${encodeURIComponent(whatsappText)}`, '_blank');
    } catch (err: any) {
      setErrorMsg(err.message || 'Something went wrong saving your booking. Please call or WhatsApp 069 909 0089.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-12 px-4 sm:px-6 font-sans text-stone-900">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-widest text-stone-500 font-semibold mb-2">
            RESERVATIONS & GENERAL ENQUIRIES
          </p>
          <h1 className="text-3xl sm:text-4xl font-serif text-stone-950">
            Book Your Event or Request a Custom Quote
          </h1>
          <p className="text-xs text-stone-600 mt-2 max-w-xl mx-auto">
            Complete all event and contact fields below to receive an instant estimate, log your booking into our system, and connect directly with our coordinator on WhatsApp.
          </p>
        </div>

        {/* Direct Contact Bar */}
        <div className="bg-white border border-[#E8E2D9] p-4 mb-8 flex flex-wrap items-center justify-center gap-6 text-xs">
          <span className="inline-flex items-center gap-2 font-medium">
            <Phone className="w-3.5 h-3.5 text-[#D99B26]" /> Calls & WhatsApp: <strong>069 909 0089</strong>
          </span>
          <span className="inline-flex items-center gap-2 font-medium">
            <Mail className="w-3.5 h-3.5 text-[#D99B26]" /> Email: <strong>nojozirestaurant@gmail.com</strong>
          </span>
        </div>

        {submittedRef ? (
          <div className="bg-white border border-[#E8E2D9] p-8 text-center max-w-xl mx-auto shadow-sm">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
            <h2 className="text-2xl font-serif text-stone-950">Enquiry & Quote Logged</h2>
            <p className="text-xs uppercase tracking-widest text-[#D99B26] font-bold mt-1">
              Reference: {submittedRef}
            </p>
            <p className="text-xs text-stone-600 mt-3 leading-relaxed">
              Your quote of <strong>R {grandTotal.toLocaleString()}</strong> has been emailed to our team and saved in our booking database. If WhatsApp did not open automatically, click below to send your reference directly.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <a
                href={`https://wa.me/27699090089?text=${encodeURIComponent(`Hi Nojozi Venue, following up on my booking reference ${submittedRef} for ${eventDate}.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-stone-900 text-white px-6 py-3 text-xs uppercase tracking-widest font-semibold hover:bg-[#D99B26] transition"
              >
                Open WhatsApp Chat
              </a>
              <button
                type="button"
                onClick={() => setSubmittedRef('')}
                className="border border-stone-300 px-6 py-3 text-xs uppercase tracking-widest font-semibold hover:bg-stone-100 transition"
              >
                Submit Another Enquiry
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8 items-start">
            {/* Left 2 Columns: Form Inputs */}
            <div className="lg:col-span-2 space-y-6">
              {errorMsg && (
                <div className="bg-red-50 border border-red-200 text-red-800 p-4 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* 1. Client Details */}
              <div className="bg-white border border-[#E8E2D9] p-6">
                <h2 className="text-lg font-serif text-stone-950 border-b border-[#E8E2D9] pb-3 mb-4">
                  1. Your Contact Details <span className="text-red-600">*</span>
                </h2>
                <div className="grid sm:grid-cols-2 gap-4 text-xs">
                  <div className="sm:col-span-2">
                    <label className="block uppercase tracking-wider text-stone-600 font-semibold mb-1">
                      Full Name / Company Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="e.g., Thabo Mokoena"
                      className="w-full border border-[#E8E2D9] px-3.5 py-2.5 focus:outline-none focus:border-stone-900"
                    />
                  </div>
                  <div>
                    <label className="block uppercase tracking-wider text-stone-600 font-semibold mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full border border-[#E8E2D9] px-3.5 py-2.5 focus:outline-none focus:border-stone-900"
                    />
                  </div>
                  <div>
                    <label className="block uppercase tracking-wider text-stone-600 font-semibold mb-1">
                      Phone / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      placeholder="e.g., 073 123 4567"
                      className="w-full border border-[#E8E2D9] px-3.5 py-2.5 focus:outline-none focus:border-stone-900"
                    />
                  </div>
                </div>
              </div>

              {/* 2. Venue / Conference Package & Date */}
              <div className="bg-white border border-[#E8E2D9] p-6">
                <h2 className="text-lg font-serif text-stone-950 border-b border-[#E8E2D9] pb-3 mb-4">
                  2. Event / Conference Package & Date <span className="text-red-600">*</span>
                </h2>
                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block uppercase tracking-wider text-stone-600 font-semibold mb-1">
                      Select Event or Conference Package *
                    </label>
                    <select
                      required
                      value={selectedPackageId}
                      onChange={(e) => setSelectedPackageId(e.target.value)}
                      className="w-full border border-[#E8E2D9] px-3.5 py-2.5 bg-white focus:outline-none focus:border-stone-900"
                    >
                      {EVENT_PACKAGES.map((pkg) => (
                        <option key={pkg.id} value={pkg.id}>
                          {pkg.name} — {pkg.pricingType === 'per_person' ? `R${pkg.price}/person` : `R${pkg.price.toLocaleString()} base`}
                        </option>
                      ))}
                    </select>
                    <p className="text-stone-500 mt-1.5">{activePackage.description}</p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block uppercase tracking-wider text-stone-600 font-semibold mb-1">
                        Preferred Event Date *
                      </label>
                      <input
                        type="date"
                        required
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                        className="w-full border border-[#E8E2D9] px-3.5 py-2.5 focus:outline-none focus:border-stone-900"
                      />
                    </div>
                    <div>
                      <label className="block uppercase tracking-wider text-stone-600 font-semibold mb-1">
                        Estimated Guest Count *
                      </label>
                      <input
                        type="number"
                        min={1}
                        max={500}
                        required
                        value={guestCount}
                        onChange={(e) => setGuestCount(Number(e.target.value))}
                        className="w-full border border-[#E8E2D9] px-3.5 py-2.5 focus:outline-none focus:border-stone-900"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. Four-Tier Catering Menu */}
              <div className="bg-white border border-[#E8E2D9] p-6">
                <h2 className="text-lg font-serif text-stone-950 border-b border-[#E8E2D9] pb-3 mb-2">
                  3. Catering Menu Selection
                </h2>
                <p className="text-[11px] text-stone-500 mb-4">
                  Note: Minimum 20–30 guests recommended for Tier 1 & Tier 2. Pork dishes are prepared and served in separate trays and utensils for Halaal-conscious guests.
                </p>
                <div className="space-y-3 text-xs">
                  {CATERING_TIERS.map((tier) => (
                    <label
                      key={tier.id}
                      className={`block border p-3.5 cursor-pointer transition ${
                        cateringId === tier.id ? 'border-stone-900 bg-[#FAF7F2]' : 'border-[#E8E2D9]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <input
                          type="radio"
                          name="cateringTier"
                          value={tier.id}
                          checked={cateringId === tier.id}
                          onChange={() => setCateringId(tier.id)}
                        />
                        <span className="font-semibold text-stone-950">{tier.name}</span>
                      </div>
                      <p className="text-stone-600 mt-1 pl-6">{tier.summary}</p>
                    </label>
                  ))}

                  {cateringId !== 'none' && (
                    <div className="pt-2">
                      <label className="block uppercase tracking-wider text-stone-600 font-semibold mb-1">
                        Preferred Proteins, Sides & Dietary Requirements
                      </label>
                      <input
                        type="text"
                        value={cateringNotes}
                        onChange={(e) => setCateringNotes(e.target.value)}
                        placeholder="e.g., Lemon-herb chicken + beef stew, savoury rice, coleslaw, no pork"
                        className="w-full border border-[#E8E2D9] px-3.5 py-2.5 focus:outline-none focus:border-stone-900"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* 4. Decor, Sound & Extras (Including Jumping Castle) */}
              <div className="bg-white border border-[#E8E2D9] p-6 space-y-5 text-xs">
                <h2 className="text-lg font-serif text-stone-950 border-b border-[#E8E2D9] pb-3">
                  4. Decor, Sound & Event Extras
                </h2>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block uppercase tracking-wider text-stone-600 font-semibold mb-1">
                      Decor Theme
                    </label>
                    <select
                      value={decorId}
                      onChange={(e) => setDecorId(e.target.value)}
                      className="w-full border border-[#E8E2D9] px-3 py-2.5 bg-white"
                    >
                      {DECOR_THEMES.map((d) => (
                        <option key={d.id} value={d.id}>
                          {d.name} {d.price > 0 ? `(+R${d.price})` : ''}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block uppercase tracking-wider text-stone-600 font-semibold mb-1">
                      Sound System
                    </label>
                    <select
                      value={soundId}
                      onChange={(e) => setSoundId(e.target.value)}
                      className="w-full border border-[#E8E2D9] px-3 py-2.5 bg-white"
                    >
                      {SOUND_PACKAGES.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name} {s.price > 0 ? `(+R${s.price.toLocaleString()})` : ''}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <p className="uppercase tracking-wider text-stone-600 font-semibold mb-2">
                    Furniture, Jumping Castle & Security Add-Ons
                  </p>
                  <div className="grid sm:grid-cols-2 gap-2.5">
                    {EXTRAS_CATALOG.map((extra) => (
                      <div
                        key={extra.id}
                        className="border border-[#E8E2D9] p-2.5 flex items-center justify-between"
                      >
                        <div>
                          <p className="font-medium text-stone-900">{extra.name}</p>
                          <p className="text-stone-500">R {extra.price.toLocaleString()} each</p>
                        </div>
                        <input
                          type="number"
                          min={0}
                          max={200}
                          value={extraQuantities[extra.id] || 0}
                          onChange={(e) => updateExtraQty(extra.id, Number(e.target.value))}
                          className="w-16 border border-[#E8E2D9] px-2 py-1 text-center"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 5. Required Enquiry / Event Notes */}
              <div className="bg-white border border-[#E8E2D9] p-6 text-xs">
                <h2 className="text-lg font-serif text-stone-950 border-b border-[#E8E2D9] pb-3 mb-4">
                  5. Event Details & Enquiry Message <span className="text-red-600">*</span>
                </h2>
                <label className="block uppercase tracking-wider text-stone-600 font-semibold mb-1">
                  Tell us about your event schedule, questions, or setup requirements *
                </label>
                <textarea
                  required
                  rows={4}
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="Required: Share start/end times, specific questions for our team, or setup preferences..."
                  className="w-full border border-[#E8E2D9] p-3 focus:outline-none focus:border-stone-900"
                />
              </div>
            </div>

            {/* Right Column: Live Sticky Quote Summary */}
            <div className="bg-white border border-[#E8E2D9] p-6 shadow-sm lg:sticky lg:top-6 text-xs space-y-4">
              <h3 className="text-lg font-serif text-stone-950 border-b border-[#E8E2D9] pb-3">
                Live Quote Breakdown
              </h3>

              <div className="space-y-2 text-stone-700">
                <div className="flex justify-between">
                  <span>{activePackage.name}</span>
                  <span className="font-semibold">R {venueTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Catering ({guestCount} guests)</span>
                  <span className="font-semibold">R {cateringTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Decor ({activeDecor.name})</span>
                  <span className="font-semibold">R {activeDecor.price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Sound ({activeSound.name})</span>
                  <span className="font-semibold">R {activeSound.price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Extras & Furniture</span>
                  <span className="font-semibold">R {extrasTotal.toLocaleString()}</span>
                </div>
              </div>

              <div className="border-t border-[#E8E2D9] pt-4 flex justify-between items-baseline">
                <span className="uppercase tracking-wider font-bold text-stone-950">Estimated Total</span>
                <span className="text-2xl font-serif font-bold text-[#D99B26]">
                  R {grandTotal.toLocaleString()}
                </span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-stone-900 text-white py-3.5 uppercase tracking-widest font-bold hover:bg-[#D99B26] transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? 'Saving Booking...' : 'Submit Booking & Send to WhatsApp'}
                <Send className="w-3.5 h-3.5" />
              </button>

              <p className="text-[11px] text-stone-500 text-center leading-relaxed">
                Submitting saves your quote in our database, emails our events desk, and opens WhatsApp (069 909 0089) for instant confirmation.
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default Quote;