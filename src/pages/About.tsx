import { Link } from 'react-router-dom';

// Import venue images from src/assets
import EventBookingImg from '../assets/EventBooking.jpg';
import cocktailtableImg from '../assets/cocktailtable.jpeg';
import venuelookImg from '../assets/venuelook.jpeg';

export function About() {
  return (
    <div className="bg-[#FAF7F2] text-stone-900 font-sans min-h-screen">
      {/* HEADER SECTION */}
      <section className="py-20 max-w-4xl mx-auto px-6 text-center">
        <p className="text-xs uppercase tracking-widest text-stone-500 mb-3 font-medium">ABOUT US</p>
        <h1 className="text-4xl md:text-6xl font-serif mb-6 text-stone-950">Welcome to Nojozi Venue</h1>
        <p className="text-sm md:text-base text-stone-600 leading-relaxed font-light">
          A single venue designed to host many kinds of meaningful moments.
        </p>
      </section>

      {/* OUR STORY SECTION */}
      <section className="py-16 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div className="h-[400px] overflow-hidden">
          <img src={venuelookImg} alt="Nojozi Venue Look" className="w-full h-full object-cover" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-stone-500 mb-2 font-medium">OUR STORY</p>
          <h2 className="text-3xl font-serif mb-6 text-stone-950">The venue</h2>
          <p className="text-stone-600 text-sm leading-relaxed mb-6">
            Our full story is coming soon. In the meantime, explore our services or get in touch — we'd love to hear about your event.
          </p>
          <Link to="/quote" className="bg-[#D99B26] text-white text-xs uppercase tracking-widest font-semibold px-6 py-3.5 hover:bg-[#b8821d] transition inline-block">
            BUILD YOUR QUOTE
          </Link>
        </div>
      </section>

      {/* OUR APPROACH */}
      <section className="py-20 bg-[#F5F0E8] border-t border-b border-[#E8E2D9]">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-xs uppercase tracking-widest text-stone-500 mb-2 font-medium">OUR APPROACH</p>
          <h2 className="text-4xl font-serif text-stone-950 mb-12">Why choose Nojozi Venue</h2>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="bg-[#FAF7F2] p-6 border border-[#E8E2D9]">
              <h3 className="font-serif text-lg mb-2">One dedicated venue</h3>
              <p className="text-xs text-stone-600 leading-relaxed mb-6">
                Your event has our full attention — we are not a directory of many venues.
              </p>
              <Link to="/quote" className="bg-stone-950 text-white text-[10px] uppercase tracking-widest font-semibold py-2.5 px-4 block text-center">
                BUILD YOUR QUOTE
              </Link>
            </div>
            <div className="bg-[#FAF7F2] p-6 border border-[#E8E2D9]">
              <h3 className="font-serif text-lg mb-2">Transparent estimates</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Build an itemised quotation online before you commit to anything.
              </p>
            </div>
            <div className="bg-[#FAF7F2] p-6 border border-[#E8E2D9]">
              <h3 className="font-serif text-lg mb-2">Flexible experiences</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Choose the service that fits and add only the extras you need.
              </p>
            </div>
            <div className="bg-[#FAF7F2] p-6 border border-[#E8E2D9]">
              <h3 className="font-serif text-lg mb-2">Personal service</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                We confirm the final details with you directly before your booking is confirmed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PHOTO BANNER */}
      <section className="py-20 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-8">
        <div className="h-80 overflow-hidden">
          <img src={EventBookingImg} alt="Event Booking" className="w-full h-full object-cover" />
        </div>
        <div className="h-80 overflow-hidden">
          <img src={cocktailtableImg} alt="Poolside Area" className="w-full h-full object-cover" />
        </div>
      </section>
    </div>
  );
}

export default About;