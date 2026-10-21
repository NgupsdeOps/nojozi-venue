import { Link } from 'react-router-dom';

// Import venue images from src/assets
import heroBg from '../assets/hero.png';
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
    title: 'Special Events',
    desc: 'Tailored to your needs.',
    img: foodGatheringImg,
  },
];

export default function Home() {
  return (
    <div className="bg-stone-50 text-stone-900">
      {/* Hero Section */}
      <section
        className="relative h-[85vh] bg-cover bg-center flex items-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative max-w-5xl mx-auto px-6 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-serif mb-6 leading-tight">
            Welcome to Nojozi Venue
          </h1>
          <p className="text-lg md:text-xl font-light mb-8 max-w-2xl mx-auto text-stone-200">
            The perfect venue for weddings, corporate events, and memorable private celebrations.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/quote"
              className="bg-amber-700 text-white px-8 py-3.5 rounded-md font-medium hover:bg-amber-800 transition"
            >
              Get Instant Quote
            </Link>
            <Link
              to="/about"
              className="bg-white/10 backdrop-blur-md text-white border border-white/30 px-8 py-3.5 rounded-md font-medium hover:bg-white/20 transition"
            >
              Explore Venue
            </Link>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section id="services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif text-stone-950 mb-4">
              Exceptional Services, Unforgettable Events
            </h2>
            <p className="text-stone-600 max-w-xl mx-auto">
              Explore our versatile event options designed to cater to gatherings of every scale.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service, idx) => (
              <div
                key={idx}
                className="bg-stone-50 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition group border border-stone-100"
              >
                <div className="h-60 overflow-hidden">
                  <img
                    src={service.img}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-serif text-stone-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-stone-600 text-sm mb-4">{service.desc}</p>
                  <Link
                    to="/quote"
                    className="text-amber-800 font-medium text-sm hover:underline inline-flex items-center gap-1"
                  >
                    Book for this event &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}