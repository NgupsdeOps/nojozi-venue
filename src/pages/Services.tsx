import React from 'react';
import { Link } from 'react-router-dom';

const SERVICES = [
  {
    title: 'Birthday Parties',
    desc: 'From intimate gatherings to milestone celebrations, we help you host a birthday your guests will remember.',
    img: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: 'Baby Showers',
    desc: 'A warm, elegant setting to celebrate parents-to-be with family and friends.',
    img: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: 'Pool Parties',
    desc: 'Make a splash with a relaxed poolside celebration for friends, family or colleagues.',
    img: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: 'Team Building',
    desc: 'Engage and inspire your corporate group with tailored outdoors and indoor event setups.',
    img: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: 'Open Buffet',
    desc: 'A festive, generous shared dining experience prepared and styled to perfection.',
    img: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: 'General Events & Private Functions',
    desc: 'Versatile venue spaces for anniversaries, dinner parties, launches, and custom gatherings.',
    img: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=800'
  }
];

export const Services: React.FC = () => {
  return (
    <div className="bg-[#FAF6F0] min-h-screen py-16 px-6">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <span className="text-xs uppercase tracking-widest text-[#C68B29] font-semibold mb-3 block">
          SERVICES
        </span>
        <h1 className="font-serif text-4xl md:text-5xl text-[#1A1A1A] mb-4">
          Event experiences
        </h1>
        <p className="text-gray-600 text-sm max-w-xl mx-auto">
          Every service is hosted at our single venue and can be tailored with optional extras.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {SERVICES.map((item) => (
          <div key={item.title} className="bg-white border border-[#E8DCCB] p-5 flex flex-col justify-between shadow-sm">
            <div>
              <div className="h-56 overflow-hidden mb-4">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
              <h3 className="font-serif text-2xl text-[#1A1A1A] mb-2">{item.title}</h3>
              <p className="text-xs text-gray-500 mb-4 leading-relaxed">{item.desc}</p>
              <p className="text-[10px] uppercase tracking-widest text-[#C68B29] font-semibold mb-6">PRICE ON REQUEST</p>
            </div>
            <Link 
              to="/quote" 
              className="block text-center bg-[#1A1A1A] hover:bg-[#3A3A3A] text-white text-xs font-semibold py-3 uppercase tracking-wider transition-colors"
            >
              BUILD YOUR QUOTE
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};