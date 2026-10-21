import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'ABOUT', path: '/about' },
    { name: 'SERVICES', path: '/services' },
    { name: 'REVIEWS', path: '/reviews' },
    { name: 'CONTACT', path: '/contact' },

  ];

  return (
    <nav className="bg-[#FAF6F0]/90 backdrop-blur-md sticky top-0 z-50 border-b border-[#E8DCCB]/50 px-6 py-4 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Title */}
        <Link to="/" className="font-serif text-2xl tracking-wide text-[#1A1A1A]">
          Nojozi Venue
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-xs tracking-widest font-medium transition-colors hover:text-[#C68B29] ${
                location.pathname === link.path ? 'text-[#1A1A1A] font-semibold' : 'text-[#555555]'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/quote"
            className="bg-[#E5A93B] hover:bg-[#C68B29] text-white text-xs font-semibold px-5 py-2.5 tracking-wider uppercase transition-all shadow-sm"
          >
            Build Your Quote
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-[#1A1A1A] focus:outline-none p-1"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden mt-4 pt-4 border-t border-[#E8DCCB] flex flex-col space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="text-sm tracking-widest text-[#1A1A1A] hover:text-[#C68B29]"
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/quote"
            onClick={() => setIsOpen(false)}
            className="bg-[#E5A93B] hover:bg-[#C68B29] text-white text-xs font-semibold px-5 py-3 tracking-wider uppercase text-center transition-all"
          >
            Build Your Quote
          </Link>
        </div>
      )}
    </nav>
  );
};