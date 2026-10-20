import React from 'react';
import { Link } from 'react-router-dom';

const SERVICES = [
  {
    title: 'Birthday Parties',
    desc: 'Celebrate another year in style.',
    img: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: 'Baby Showers',
    desc: 'A gentle, beautiful welcome.',
    img: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: 'Pool Parties',
    desc: 'Sun, water and good company.',
    img: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: 'Team Building',
    desc: 'Reconnect your team.',
    img: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: 'Open Buffet',
    desc: 'Generous, shared dining.',
    img: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: 'General Events & Private Functions',
    desc: 'Your occasion, your way.',
    img: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=800'
  }
];

const EXTRAS = [
  { title: 'Furniture', desc: 'Tables, chairs and lounge furniture arranged to suit your event.' },
  { title: 'Catering', desc: 'Food and refreshments prepared for your guests.' },
  { title: 'Security', desc: 'On-site security personnel for peace of mind.' },
  { title: 'Decor assistance', desc: 'Help with styling, theming and setting up your decor.' },
];

export const Home: React.FC = () => {
  return (
    <div className="bg-[#FAF6F0] min-h-screen">
      {/* HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center justify-center px-6 py-20 bg-black text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1600')` }}
        />
        <div className="relative max-w-4xl mx-auto text-left w-full z-10">
          <span className="text-xs uppercase tracking-widest text-[#E5A93B] font-semibold mb-4 block">
            NOJOZI VENUE
          </span>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-normal leading-tight mb-6">
            Your Event. Your Vision. Our Venue.
          </h1>
          <p className="text-sm md:text-base text-gray-200 max-w-xl mb-8 leading-relaxed font-light">
            Create unforgettable moments at Nojozi Venue. Explore our services, customise your event, and request your personalised quotation.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/services" className="bg-[#E5A93B] hover:bg-[#C68B29] text-white text-xs font-semibold px-6 py-3.5 uppercase tracking-wider transition-all">
              EXPLORE OUR SERVICES
            </Link>
            <Link to="/quote" className="border border-white/40 hover:border-white text-white text-xs font-semibold px-6 py-3.5 uppercase tracking-wider transition-all">
              BUILD YOUR QUOTE
            </Link>
            <Link to="/contact" className="border border-white/40 hover:border-white text-white text-xs font-semibold px-6 py-3.5 uppercase tracking-wider transition-all">
              CONTACT US
            </Link>
          </div>
        </div>
      </section>

      {/* WELCOME SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#C68B29] font-semibold mb-3 block">
            WELCOME
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-[#1A1A1A] leading-tight">
            One venue. Every kind of celebration.
          </h2>
        </div>
        <div className="space-y-6 text-gray-600 text-sm leading-relaxed">
          <p>
            Nojozi Venue is a single, dedicated venue offering a range of event experiences—from birthdays and baby showers to pool parties, team building days and private functions.
          </p>
          <p>
            Tell us what you have in mind and build your own estimate online in a few minutes.
          </p>
          <Link to="/about" className="inline-block text-xs uppercase tracking-widest text-[#1A1A1A] font-semibold hover:text-[#C68B29] transition-colors pt-2">
            ABOUT OUR VENUE →
          </Link>
        </div>
      </section>

      {/* EXPERIENCES WE HOST */}
      <section className="bg-[#F3ECE1]/50 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#C68B29] font-semibold mb-2 block">
                EVENT SERVICES
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-[#1A1A1A]">
                Experiences we host
              </h2>
            </div>
            <Link to="/services" className="hidden sm:inline-block border border-gray-300 bg-white px-5 py-2 text-xs font-medium uppercase tracking-wider text-gray-700 hover:bg-gray-50">
              ALL SERVICES
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((item) => (
              <div key={item.title} className="bg-white border border-[#E8DCCB] shadow-sm flex flex-col justify-between p-4">
                <div>
                  <div className="h-56 overflow-hidden mb-4">
                    <img src={item.img} alt={item.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                  </div>
                  <h3 className="font-serif text-xl text-[#1A1A1A] mb-1">{item.title}</h3>
                  <p className="text-xs text-gray-500 mb-4">{item.desc}</p>
                  <p className="text-[10px] uppercase tracking-widest text-[#C68B29] font-semibold mb-6">PRICE ON REQUEST</p>
                </div>
                <Link to="/quote" className="block text-center bg-[#1A1A1A] hover:bg-[#3A3A3A] text-white text-xs font-semibold py-3 uppercase tracking-wider transition-colors">
                  BUILD YOUR QUOTE
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OPTIONAL EXTRAS */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <span className="text-xs uppercase tracking-widest text-[#C68B29] font-semibold mb-2 block">
          OPTIONAL EXTRAS
        </span>
        <h2 className="font-serif text-3xl md:text-4xl text-[#1A1A1A] mb-12">
          Tailor every detail
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {EXTRAS.map((extra) => (
            <div key={extra.title} className="bg-white p-6 border border-[#E8DCCB]">
              <h3 className="font-serif text-lg text-[#1A1A1A] mb-2">{extra.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed mb-4">{extra.desc}</p>
              <p className="text-[10px] uppercase tracking-widest text-[#C68B29] font-semibold">PRICE ON REQUEST</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-[#1A1A1A] text-white py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <span className="text-xs uppercase tracking-widest text-[#E5A93B] font-semibold mb-2 block">
            HOW IT WORKS
          </span>
          <h2 className="font-serif text-3xl md:text-4xl mb-16">
            From idea to booked, simply.
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div>
              <span className="font-serif text-2xl text-[#E5A93B] mb-2 block">01</span>
              <h3 className="font-serif text-lg mb-2">Choose your event</h3>
              <p className="text-xs text-gray-400 leading-relaxed">Select the experience that suits your occasion.</p>
            </div>
            <div>
              <span className="font-serif text-2xl text-[#E5A93B] mb-2 block">02</span>
              <h3 className="font-serif text-lg mb-2">Customise</h3>
              <p className="text-xs text-gray-400 leading-relaxed">Add guests, date, time and optional extras.</p>
            </div>
            <div>
              <span className="font-serif text-2xl text-[#E5A93B] mb-2 block">03</span>
              <h3 className="font-serif text-lg mb-2">Get your estimate</h3>
              <p className="text-xs text-gray-400 leading-relaxed">See an itemised quotation instantly and download it.</p>
            </div>
            <div>
              <span className="font-serif text-2xl text-[#E5A93B] mb-2 block">04</span>
              <h3 className="font-serif text-lg mb-2">Request booking</h3>
              <p className="text-xs text-gray-400 leading-relaxed">We confirm availability and final terms with you.</p>
            </div>
          </div>

          <Link to="/quote" className="inline-block bg-[#E5A93B] hover:bg-[#C68B29] text-white text-xs font-semibold px-6 py-3.5 uppercase tracking-wider transition-all">
            START YOUR QUOTE
          </Link>
        </div>
      </section>

      {/* REVIEWS PREVIEW */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex justify-between items-end mb-8">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#C68B29] font-semibold mb-2 block">REVIEWS</span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#1A1A1A]">From our guests</h2>
          </div>
          <Link to="/reviews" className="border border-gray-300 bg-white px-5 py-2 text-xs font-medium uppercase tracking-wider text-gray-700 hover:bg-gray-50">
            READ & WRITE REVIEWS
          </Link>
        </div>
        <p className="text-xs text-gray-500">No reviews have been published yet. Hosted an event with us? Be the first to share your experience.</p>
      </section>

      {/* LET'S PLAN YOUR EVENT CTA */}
      <section className="bg-[#F3ECE1]/60 py-16 px-6 border-t border-[#E8DCCB]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-serif text-2xl md:text-3xl text-[#1A1A1A] mb-1">Let's plan your event</h2>
            <p className="text-xs text-gray-500">Send us a message and we'll be in touch.</p>
          </div>
          <Link to="/contact" className="bg-[#1A1A1A] hover:bg-[#3A3A3A] text-white text-xs font-semibold px-8 py-3.5 uppercase tracking-wider transition-colors">
            CONTACT US
          </Link>
        </div>
      </section>
    </div>
  );
};