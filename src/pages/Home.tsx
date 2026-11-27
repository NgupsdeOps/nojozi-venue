import { Link } from 'react-router-dom';
import { ArrowRight, Check, Phone, Mail, MapPin } from 'lucide-react';
import venueHero from '../assets/Updatedvenuepic.png';
import poolImg from '../assets/Poolside.jpg';
import venueLook from '../assets/venuelook.jpeg';

const VENUE_SERVICES = [
  {
    title: 'Full-Day & Half-Day Conferences',
    detail: 'Executive boardroom & seminar setups with AV support, refreshments, and tailored corporate catering.',
  },
  {
    title: 'Weddings & Engagements',
    detail: 'All-inclusive ceremony and reception venue packages with custom decor styling and multi-course banquets.',
  },
  {
    title: 'Private Pool Parties',
    detail: 'Exclusive poolside access priced at R120 per guest with optional sound, seating, and jumping castle add-ons.',
  },
  {
    title: 'Team Building & Corporate Year-End',
    detail: 'Indoor and outdoor grounds for corporate retreats, workshops, and end-of-year celebrations.',
  },
  {
    title: 'Private Functions & Milestone Birthdays',
    detail: 'Flexible venue hire for anniversaries, graduations, baby showers, and private dining.',
  },
  {
    title: '4-Tier In-House & Event Catering',
    detail: 'Curated menus ranging from R150 to R750 per person, featuring Halaal-conscious separate pork preparation.',
  },
];

export function Home() {
  return (
    <div className="bg-[#FAF7F2] text-stone-900 font-sans">
      {/* Hero Banner */}
      <section className="relative bg-stone-950 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 md:py-28 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-[#D99B26] font-semibold mb-3">
              JOHANNESBURG SOUTH • CONFERENCES & EVENTS
            </p>
            <h1 className="text-4xl sm:text-5xl font-serif leading-tight mb-5">
              Refined Spaces for Conferences, Weddings & Private Celebrations
            </h1>
            <p className="text-stone-300 text-sm leading-relaxed mb-8 max-w-lg">
              From executive corporate conferences to poolside gatherings and luxury banquets, Nojozi Venue delivers seamless hospitality, custom decor, and tiered catering.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/quote"
                className="bg-[#D99B26] text-stone-950 px-7 py-3.5 text-xs uppercase tracking-widest font-bold hover:bg-amber-400 transition inline-flex items-center gap-2"
              >
                Book & Build Quote <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="tel:0699090089"
                className="border border-stone-600 text-white px-6 py-3.5 text-xs uppercase tracking-widest font-semibold hover:border-white transition inline-flex items-center gap-2"
              >
                <Phone className="w-3.5 h-3.5 text-[#D99B26]" /> 069 909 0089
              </a>
            </div>
          </div>

          <div className="border border-stone-800 p-2 bg-stone-900/60">
            <img
              src={venueHero}
              alt="Nojozi Venue Main Hall and Grounds"
              className="w-full h-[340px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* Venue Preview Gallery */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 border-b border-[#E8E2D9] pb-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-stone-500 font-semibold">THE PROPERTY</p>
            <h2 className="text-2xl sm:text-3xl font-serif text-stone-950 mt-1">Venue Preview</h2>
          </div>
          <Link
            to="/quote"
            className="text-xs uppercase tracking-widest font-semibold text-[#D99B26] hover:text-stone-900 mt-3 sm:mt-0 inline-flex items-center gap-1"
          >
            Check Availability & Pricing <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-[#E8E2D9] p-2">
            <img src={venueHero} alt="Main Event Space" className="w-full h-56 object-cover" />
            <p className="text-xs uppercase tracking-wider text-stone-600 font-medium pt-3 pb-1 px-1">
              Main Reception & Conference Hall
            </p>
          </div>
          <div className="bg-white border border-[#E8E2D9] p-2">
            <img src={poolImg} alt="Poolside Entertainment Area" className="w-full h-56 object-cover" />
            <p className="text-xs uppercase tracking-wider text-stone-600 font-medium pt-3 pb-1 px-1">
              Poolside Lounge & Entertainment Deck
            </p>
          </div>
          <div className="bg-white border border-[#E8E2D9] p-2">
            <img src={venueLook} alt="Outdoor Garden & Dining Setup" className="w-full h-56 object-cover" />
            <p className="text-xs uppercase tracking-wider text-stone-600 font-medium pt-3 pb-1 px-1">
              Outdoor Grounds & Banquet Setup
            </p>
          </div>
        </div>
      </section>

      {/* Clean Text-Only List of Venue Services (No Service Pictures) */}
      <section className="bg-white border-y border-[#E8E2D9] py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-10">
            <p className="text-xs uppercase tracking-widest text-stone-500 font-semibold">WHAT WE HOST</p>
            <h2 className="text-2xl sm:text-3xl font-serif text-stone-950 mt-1">
              Venue & Conference Services
            </h2>
            <p className="text-xs text-stone-600 mt-2">
              Tailored packages without accommodation overhead—pay strictly for the spaces, catering, and equipment your event requires.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
            {VENUE_SERVICES.map((service) => (
              <div
                key={service.title}
                className="border-b border-[#E8E2D9] pb-5 flex items-start gap-3.5"
              >
                <div className="mt-1 bg-[#FAF7F2] border border-[#E8E2D9] p-1 text-[#D99B26]">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg text-stone-950 font-medium">{service.title}</h3>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed">{service.detail}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#FAF7F2] border border-[#E8E2D9] p-6">
            <div>
              <p className="font-serif text-lg text-stone-950">Planning an event or conference?</p>
              <p className="text-xs text-stone-600">
                All enquiries and bookings use our instant estimator so you receive an accurate quote immediately.
              </p>
            </div>
            <Link
              to="/quote"
              className="bg-stone-900 text-white px-7 py-3 text-xs uppercase tracking-widest font-semibold hover:bg-[#D99B26] transition shrink-0"
            >
              Start Booking / Enquiry
            </Link>
          </div>
        </div>
      </section>

      {/* Direct Contact Strip */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid sm:grid-cols-3 gap-6 text-xs">
          <div className="bg-white border border-[#E8E2D9] p-5 flex items-center gap-3">
            <Phone className="w-4 h-4 text-[#D99B26] shrink-0" />
            <div>
              <p className="uppercase tracking-wider text-stone-400 font-semibold">Calls & WhatsApp</p>
              <p className="text-stone-900 font-semibold mt-0.5">069 909 0089</p>
            </div>
          </div>
          <div className="bg-white border border-[#E8E2D9] p-5 flex items-center gap-3">
            <Mail className="w-4 h-4 text-[#D99B26] shrink-0" />
            <div>
              <p className="uppercase tracking-wider text-stone-400 font-semibold">Bookings & Enquiries</p>
              <p className="text-stone-900 font-semibold mt-0.5">nojozirestaurant@gmail.com</p>
            </div>
          </div>
          <div className="bg-white border border-[#E8E2D9] p-5 flex items-center gap-3">
            <MapPin className="w-4 h-4 text-[#D99B26] shrink-0" />
            <div>
              <p className="uppercase tracking-wider text-stone-400 font-semibold">Location</p>
              <p className="text-stone-900 font-semibold mt-0.5">Johannesburg South, Gauteng</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;