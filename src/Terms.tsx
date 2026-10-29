export function Terms() {
  return (
    <div className="bg-[#FAF7F2] min-h-screen py-16 px-6 font-sans text-stone-900">
      <div className="max-w-4xl mx-auto bg-white border border-[#E8E2D9] p-8 md:p-12 shadow-sm">
        <p className="text-xs uppercase tracking-widest text-stone-500 mb-2 font-medium">
          LEGAL & VENUE GUIDELINES
        </p>
        <h1 className="text-3xl md:text-4xl font-serif text-stone-950 mb-6">
          Terms, Conditions & Policies
        </h1>
        
        <div className="space-y-6 text-xs md:text-sm text-stone-700 leading-relaxed">
          <section>
            <h2 className="text-lg font-serif text-stone-900 mb-2 font-semibold">1. Booking & Payment Terms</h2>
            <p>
              A 50% non-refundable deposit is required upon signing the agreement to secure your date. The remaining balance is due on or before the day of the event. Payments are processed via EFT to Nojozi Bookings (Capitec Bank, Acc: 1736397832). A refundable damage deposit of R300.00 is included in venue quotations.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-serif text-stone-900 mb-2 font-semibold">2. Cancellation Policy</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Cancellations made more than 7 days prior to the event date will result in the forfeiture of the 50% deposit[cite: 6].</li>
              <li>Cancellations made less than 7 days prior to the event date incur a charge of 30% of the total rental fee[cite: 6, 7].</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-serif text-stone-900 mb-2 font-semibold">3. Venue Rules & Restrictions</h2>
            <p>
              The client agrees not to cause any property damage, adhere to noise regulations, and ensure all guests comply with venue policies. Canned and plastic beverages are permitted; glass bottles are prohibited unless specially discussed. The venue reserves the right to refuse entry or eject any guest whose conduct is deemed inappropriate[cite: 7].
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Terms;