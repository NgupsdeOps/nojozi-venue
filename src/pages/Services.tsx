import React from 'react';
import { Link } from 'react-router-dom';

// Import local venue images from src/assets
import eventBookingImg from '../assets/EventBooking.jpg';
import poolsideImg from '../assets/Poolside.jpg';
import chairsImg from '../assets/Chairssetup.jpg';
import buffetImg from '../assets/Buffet.jpg';
import foodGatheringImg from '../assets/Foodgathering.jpg';

const SERVICES = [
  {
    title: 'Birthday Parties',
    desc: 'Celebrate another year in style with bespoke setups and vibrant outdoor seating.',
    img: eventBookingImg,
  },
  {
    title: 'Baby Showers',
    desc: 'A gentle, beautiful welcome for parents-to-be with peaceful poolside decor.',
    img: chairsImg,
  },
  {
    title: 'Pool Parties',
    desc: 'Sun, water, and good company surrounded by landscaped gardens.',
    img: poolsideImg,
  },
  {
    title: 'Team Building',
    desc: 'Reconnect your team with versatile lawn spaces and corporate function setups.',
    img: poolsideImg,
  },
  {
    title: 'Open Buffet',
    desc: 'Generous, shared dining experiences tailored to your event preferences.',
    img: buffetImg,
  },
  {
    title: 'General Events & Private Functions',
    desc: 'Unforgettable moments, warm hospitality, and custom private celebrations.',
    img: foodGatheringImg,
  },
];

export function Services() {
  return (
    <div className="bg-[#FAF7F2] min-h-screen py-16 px-6 font-sans text-stone-900">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-widest text-stone-500 mb-2 font-medium">
            EXQUISITE VENUE EXPERIENCES
          </p>
          <h1 className="text-4xl md:text-5xl font-serif text-stone-950 mb-4">
            Our Offerings & Services
          </h1>
          <p className="text-stone-600 text-xs md:text-sm max-w-xl mx-auto leading-relaxed">
            From intimate gatherings to lavish celebrations, explore our range of catered events and versatile venue setups.
          </p>
        </div>

        {/* SERVICES GRID */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {SERVICES.map((service, idx) => (
            <div
              key={idx}
              className="bg-[#FAF7F2] border border-[#E8E2D9] overflow-hidden group flex flex-col justify-between"
            >
              <div>
                <div className="h-64 overflow-hidden relative">
                  <img
                    src={service.img}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-serif text-stone-950 mb-2">{service.title}</h3>
                  <p className="text-xs text-stone-600 leading-relaxed mb-4">{service.desc}</p>
                  <p className="text-[10px] uppercase tracking-widest text-stone-400 font-semibold mb-6">
                    PRICE ON REQUEST
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  to="/quote"
                  className="w-full bg-stone-900 text-white text-xs uppercase tracking-widest font-semibold py-3.5 block text-center hover:bg-[#D99B26] transition"
                >
                  BUILD YOUR QUOTE
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Services;