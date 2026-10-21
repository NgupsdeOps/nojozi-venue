import React from 'react';
import { Link } from 'react-router-dom';

// Import venue images from src/assets
import chairsSetupImg from '../assets/Chairssetup.jpg';
import poolImg from '../assets/Poolside.jpg';
import decorSetupImg from '../assets/Decorsetup.jpg';

export default function About() {
  return (
    <div className="bg-stone-50 min-h-screen text-stone-900">
      {/* Hero Header */}
      <section className="relative py-20 bg-stone-900 text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-serif mb-4">About Nojozi Venue</h1>
          <p className="text-lg text-stone-300 font-light">
            An elegant space crafted for life's most memorable moments.
          </p>
        </div>
      </section>

      {/* Story & Vision */}
      <section className="py-16 max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-serif mb-6 text-stone-950">Our Story</h2>
          <p className="text-stone-700 leading-relaxed mb-4">
            Welcome to Nojozi Venue. Designed with versatile layouts, serene outdoor poolside areas, and beautiful indoor decor settings, our venue provides the ideal canvas for any gathering.
          </p>
          <p className="text-stone-700 leading-relaxed mb-6">
            Whether you are hosting an intimate family celebration, a corporate retreat, a stylish baby shower, or an unforgettable wedding, our team is dedicated to providing exceptional service and an unmatched atmosphere.
          </p>
          <Link
            to="/quote"
            className="inline-block bg-amber-700 text-white px-6 py-3 rounded-md font-medium hover:bg-amber-800 transition"
          >
            Request a Quote
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <img
            src={chairsSetupImg}
            alt="Venue Setup"
            className="rounded-lg shadow-md w-full h-48 object-cover"
          />
          <img
            src={decorSetupImg}
            alt="Decor Setup"
            className="rounded-lg shadow-md w-full h-48 object-cover mt-6"
          />
        </div>
      </section>

      {/* Highlights Banner */}
      <section className="py-16 bg-white border-t border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6">
            <h3 className="text-xl font-serif mb-2 text-stone-900">Tailored Decor</h3>
            <p className="text-stone-600 text-sm">Custom seating, table arrangements, and event setups designed for your vision.</p>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-serif mb-2 text-stone-900">Outdoor & Poolside</h3>
            <p className="text-stone-600 text-sm">Spacious garden and poolside areas perfect for open-air functions and photoshoots.</p>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-serif mb-2 text-stone-900">Full In-House Support</h3>
            <p className="text-stone-600 text-sm">Catering services, audio setup, and site coordination to ensure smooth events.</p>
          </div>
        </div>
      </section>

      {/* Feature Image Banner */}
      <section className="py-16 max-w-6xl mx-auto px-6">
        <div className="relative rounded-2xl overflow-hidden shadow-xl h-80">
          <img
            src={poolImg}
            alt="Nojozi Poolside Area"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-center p-6">
            <div>
              <h3 className="text-3xl font-serif text-white mb-3">Ready to host your event with us?</h3>
              <Link
                to="/contact"
                className="inline-block bg-white text-stone-900 px-6 py-2.5 rounded-md font-medium hover:bg-stone-100 transition"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}