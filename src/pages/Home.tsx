import { Link } from 'react-router-dom';

// Import venue images from src/assets
import homeImg from '../assets/home.jpg';
import eventBookingImg from '../assets/EventBooking.jpg';
import poolImg from '../assets/Poolside.jpg';
import chairsImg from '../assets/Chairssetup.jpg';
import buffetImg from '../assets/Buffet.jpg';
import cateringImg from '../assets/Catering.jpg';
import foodGatheringImg from '../assets/Foodgathering.jpg';


const SERVICES = [
  {
    title: 'Birthday Parties',
    desc: 'Celebrate another year in style.',
    img: eventBookingImg,
  },
  {
    title: 'Baby Showers',
    desc: 'A gentle, beautiful welcome.',
    img: chairsImg,
  },
  {
    title: 'Pool Parties',
    desc: 'Sun, water and good company.',
    img: poolImg,
  },
  {
    title: 'Team Building',
    desc: 'Reconnect your team.',
    img: cateringImg,
  },
  {
    title: 'Open Buffet',
    desc: 'Generous, shared dining.',
    img: buffetImg,
  },
  {
    title: 'General Events & Private Functions',
    desc: 'Your occasion, your way.',
    img: foodGatheringImg,
  },
];

export function Home() {
  return (
    <div className="bg-[#FAF7F2] text-stone-900 font-sans">
      {/* HERO SECTION */}
      <section
        className="relative min-h-[85vh] bg-cover bg-center flex items-center"
        style={{ backgroundImage: `url(${homeImg})` }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative max-w-5xl mx-auto px-6 py-20 text-white">
          <p className="text-xs uppercase tracking-widest mb-4 opacity-80 font-medium">NOJOZI VENUE</p>
          <h1 className="text-5xl md:text-7xl font-serif mb-6 leading-tight">
            Your Event. Your Vision. <br /> Our Venue.
          </h1>
          <p className="text-sm md:text-base font-light mb-8 max-w-xl text-stone-200 leading-relaxed">
            Create unforgettable moments at Nojozi Venue. Explore our services, customise your event, and request your personalised quotation.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/services" className="bg-[#D99B26] text-white text-xs uppercase tracking-widest font-semibold px-6 py-3.5 hover:bg-[#b8821d] transition">
              EXPLORE OUR SERVICES
            </Link>
            <Link to="/quote" className="border border-white/60 text-white text-xs uppercase tracking-widest font-semibold px-6 py-3.5 hover:bg-white/10 transition">
              BUILD YOUR QUOTE
            </Link>
            <Link to="/contact" className="border border-white/60 text-white text-xs uppercase tracking-widest font-semibold px-6 py-3.5 hover:bg-white/10 transition">
              BOOK OUR VENUE
            </Link>
            <Link to="/contact" className="border border-white/60 text-white text-xs uppercase tracking-widest font-semibold px-6 py-3.5 hover:bg-white/10 transition">
              CONTACT US
            </Link>
          </div>
        </div>
      </section>

      {/* WELCOME SECTION */}
      <section className="py-20 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-start border-b border-[#E8E2D9]">
        <div>
          <p className="text-xs uppercase tracking-widest text-stone-500 mb-2 font-medium">WELCOME</p>
          <h2 className="text-4xl md:text-5xl font-serif text-stone-900 leading-tight">
            One venue. Every kind of celebration.
          </h2>
        </div>
        <div className="text-stone-600 text-sm leading-relaxed space-y-4">
          <p>
            Nojozi Venue is a single, dedicated venue offering a range of event experiences — from birthdays and baby showers to pool parties, team building days and private functions.
          </p>
          <p>Tell us what you have in mind and build your own estimate online in a few minutes.</p>
          <Link to="/about" className="text-xs uppercase tracking-widest font-semibold text-stone-900 hover:underline inline-block pt-2">
            ABOUT OUR VENUE &rarr;
          </Link>
        </div>
      </section>

      {/* EXPERIENCES WE HOST GRID */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
          <div>
            <p className="text-xs uppercase tracking-widest text-stone-500 mb-2 font-medium">EVENT SERVICES</p>
            <h2 className="text-4xl font-serif text-stone-900">Experiences we host</h2>
          </div>
          <Link to="/services" className="hidden md:inline-block border border-stone-300 text-stone-800 text-xs tracking-widest font-semibold uppercase px-5 py-2.5 hover:bg-stone-200 transition">
            ALL SERVICES
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {SERVICES.map((service, idx) => (
            <div key={idx} className="bg-[#F5F0E8] border border-[#E8E2D9] p-4 flex flex-col justify-between">
              <div>
                <div className="h-64 overflow-hidden mb-6">
                  <img src={service.img} alt={service.title} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-2xl font-serif text-stone-900 mb-2">{service.title}</h3>
                <p className="text-stone-600 text-xs mb-4 leading-relaxed">{service.desc}</p>
                <p className="text-[10px] uppercase tracking-widest font-bold text-stone-400 mb-6">PRICE ON REQUEST</p>
              </div>
              <Link to="/quote" className="bg-stone-950 text-white text-xs uppercase tracking-widest font-semibold py-3 text-center block hover:bg-stone-800 transition">
                BUILD YOUR QUOTE
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* TAILOR EVERY DETAIL (OPTIONAL EXTRAS) */}
      <section className="py-20 bg-[#FAF7F2] border-t border-[#E8E2D9]">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-xs uppercase tracking-widest text-stone-500 mb-2 font-medium">OPTIONAL EXTRAS</p>
          <h2 className="text-4xl font-serif text-stone-900 mb-12">Tailor every detail</h2>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="border-l border-stone-300 pl-6">
              <h4 className="text-xl font-serif text-stone-900 mb-2">Furniture</h4>
              <p className="text-stone-600 text-xs leading-relaxed">Tables, chairs and lounge furniture arranged to suit your event.</p>
            </div>
            <div className="border-l border-stone-300 pl-6">
              <h4 className="text-xl font-serif text-stone-900 mb-2">Catering</h4>
              <p className="text-stone-600 text-xs leading-relaxed">Food and refreshments prepared for your guests.</p>
            </div>
            <div className="border-l border-stone-300 pl-6">
              <h4 className="text-xl font-serif text-stone-900 mb-2">Security</h4>
              <p className="text-stone-600 text-xs leading-relaxed">On-site security personnel for peace of mind.</p>
            </div>
            <div className="border-l border-stone-300 pl-6">
              <h4 className="text-xl font-serif text-stone-900 mb-2">Decor assistance</h4>
              <p className="text-stone-600 text-xs leading-relaxed">Help with styling, theming and setting up your decor.</p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 bg-stone-950 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-xs uppercase tracking-widest text-stone-400 mb-2 font-medium">HOW IT WORKS</p>
          <h2 className="text-4xl md:text-5xl font-serif mb-16">From idea to booked, simply.</h2>

          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <span className="text-3xl font-serif text-amber-500 block mb-2">01</span>
              <h3 className="text-lg font-semibold mb-2">Choose your event</h3>
              <p className="text-stone-400 text-xs leading-relaxed">Select the experience that suits your occasion.</p>
            </div>
            <div>
              <span className="text-3xl font-serif text-amber-500 block mb-2">02</span>
              <h3 className="text-lg font-semibold mb-2">Customise</h3>
              <p className="text-stone-400 text-xs leading-relaxed">Add guests, date, time and optional extras.</p>
            </div>
            <div>
              <span className="text-3xl font-serif text-amber-500 block mb-2">03</span>
              <h3 className="text-lg font-semibold mb-2">Get your estimate</h3>
              <p className="text-stone-400 text-xs leading-relaxed">See an itemised quotation instantly and download it.</p>
            </div>
            <div>
              <span className="text-3xl font-serif text-amber-500 block mb-2">04</span>
              <h3 className="text-lg font-semibold mb-2">Request booking</h3>
              <p className="text-stone-400 text-xs leading-relaxed">We confirm availability and final terms with you.</p>
            </div>
          </div>

          <Link to="/quote" className="inline-block bg-[#D99B26] text-white text-xs uppercase tracking-widest font-semibold px-8 py-3.5 hover:bg-[#b8821d] transition">
            START YOUR QUOTE
          </Link>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="py-20 max-w-7xl mx-auto px-6 border-b border-[#E8E2D9]">
        <div className="flex justify-between items-end mb-8">
          <div>
            <p className="text-xs uppercase tracking-widest text-stone-500 mb-2 font-medium">REVIEWS</p>
            <h2 className="text-4xl font-serif text-stone-900">From our guests</h2>
          </div>
          <Link to="/reviews" className="border border-stone-300 text-stone-800 text-xs tracking-widest font-semibold uppercase px-4 py-2 hover:bg-stone-200 transition">
            READ & WRITE REVIEWS
          </Link>
        </div>
        <p className="text-stone-500 text-xs">
          No reviews have been published yet. Hosted an event with us? Be the first to share your experience.
        </p>
      </section>

      {/* LET'S PLAN YOUR EVENT */}
      <section className="py-16 max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h2 className="text-3xl font-serif text-stone-900 mb-2">Let's plan your event</h2>
          <p className="text-stone-600 text-xs">Send us a message and we'll be in touch.</p>
        </div>
        <Link to="/contact" className="bg-stone-950 text-white text-xs uppercase tracking-widest font-semibold px-8 py-3.5 hover:bg-stone-800 transition">
          CONTACT US
        </Link>
      </section>
    </div>
  );
}

export default Home;