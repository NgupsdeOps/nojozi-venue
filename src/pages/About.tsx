import React from 'react';
import { Link } from 'react-router-dom';

export const About: React.FC = () => {
  return (
    <div className="bg-[#FAF6F0] min-h-screen py-16 px-6">
      {/* HEADER SECTION */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <span className="text-xs uppercase tracking-widest text-[#C68B29] font-semibold mb-3 block">
          ABOUT US
        </span>
        <h1 className="font-serif text-4xl md:text-5xl text-[#1A1A1A] mb-4">
          Welcome to Nojozi Venue
        </h1>
        <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
          A single venue designed to host many kinds of meaningful moments.
        </p>
      </div>

      {/* OUR STORY SECTION */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
        <div className="h-[400px] overflow-hidden rounded-sm shadow-md">
          <img 
            src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1200" 
            alt="Nojozi Venue Atmosphere" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="space-y-6">
          <span className="text-xs uppercase tracking-widest text-[#C68B29] font-semibold block">
            OUR STORY
          </span>
          <h2 className="font-serif text-3xl text-[#1A1A1A]">The venue</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Nojozi Venue was created with a single vision: to provide an elegant, versatile, and intimate setting for all life’s celebrations. Whether you are hosting a milestone birthday, a tranquil baby shower, or a corporate team building session, our space adapts seamlessly to your vision.
          </p>
          <p className="text-gray-600 text-sm leading-relaxed">
            Unlike directory platforms or multi-venue agencies, we focus entirely on our own single property, ensuring undivided personal attention and care for every event.
          </p>
        </div>
      </div>

      {/* OUR APPROACH SECTION */}
      <div className="bg-[#F3ECE1]/60 py-16 px-8 max-w-7xl mx-auto border border-[#E8DCCB] mb-16">
        <span className="text-xs uppercase tracking-widest text-[#C68B29] font-semibold mb-2 block">
          OUR APPROACH
        </span>
        <h2 className="font-serif text-3xl text-[#1A1A1A] mb-12">
          Why choose Nojozi Venue
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          <div className="border-t border-[#E8DCCB] pt-4">
            <h3 className="font-serif text-lg text-[#1A1A1A] mb-2">One dedicated venue</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Your event has our full attention — we are not a directory of many venues.
            </p>
          </div>
          <div className="border-t border-[#E8DCCB] pt-4">
            <h3 className="font-serif text-lg text-[#1A1A1A] mb-2">Transparent estimates</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Build an itemised quotation online before you commit to anything.
            </p>
          </div>
          <div className="border-t border-[#E8DCCB] pt-4">
            <h3 className="font-serif text-lg text-[#1A1A1A] mb-2">Flexible experiences</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Choose the service that fits and add only the extras you need.
            </p>
          </div>
          <div className="border-t border-[#E8DCCB] pt-4">
            <h3 className="font-serif text-lg text-[#1A1A1A] mb-2">Personal service</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              We confirm the final details with you directly before your booking is confirmed.
            </p>
          </div>
        </div>

        <Link 
          to="/quote" 
          className="inline-block bg-[#1A1A1A] hover:bg-[#3A3A3A] text-white text-xs font-semibold px-6 py-3 uppercase tracking-wider transition-colors"
        >
          BUILD YOUR QUOTE
        </Link>
      </div>
    </div>
  );
};