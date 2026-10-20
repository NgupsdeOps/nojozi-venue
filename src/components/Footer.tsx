import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1A1A1A] text-white pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 border-b border-gray-800">
        {/* Brand */}
        <div>
          <h3 className="font-serif text-2xl mb-4 text-[#FAF6F0]">Nojozi Venue</h3>
          <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
            One venue, many unforgettable experiences. Customise your event and request your personalised quotation.
          </p>
        </div>

        {/* Explore Links */}
        <div>
          <h4 className="text-xs uppercase tracking-widest text-[#E5A93B] mb-4 font-semibold">Explore</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link to="/services" className="hover:text-white transition-colors">Services</Link></li>
            <li><Link to="/quote" className="hover:text-white transition-colors">Build Your Quote</Link></li>
            <li><Link to="/reviews" className="hover:text-white transition-colors">Reviews</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
          </ul>
        </div>

        {/* Contact info */}
        <div>
          <h4 className="text-xs uppercase tracking-widest text-[#E5A93B] mb-4 font-semibold">Contact</h4>
          <p className="text-sm text-gray-400">Contact details coming soon.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
        <p>© 2026 Nojozi Venue</p>
        <Link to="/admin" className="hover:text-gray-400 transition-colors mt-2 md:mt-0">
          Owner login
        </Link>
      </div>
    </footer>
  );
};