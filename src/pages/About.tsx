import { Link } from 'react-router-dom';

// Import venue images from src/assets
import chairsSetupImg from '../assets/Chairssetup.jpg';
import poolImg from '../assets/Poolside.jpg';
import decorSetupImg from '../assets/Decorsetup.jpg';

export function About() {
  return (
    <div className="bg-stone-50 min-h-screen text-stone-900">
      <section className="relative py-20 bg-stone-900 text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-serif mb-4">About Nojozi Venue</h1>
          <p className="text-lg text-stone-300 font-light">
            An elegant space crafted for life's most memorable moments.
          </p>
        </div>
      </section>

      <section className="py-16 max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-serif mb-6 text-stone-950">Our Story</h2>
          <p className="text-stone-700 leading-relaxed mb-4">
            Welcome to Nojozi Venue. Designed with versatile layouts, serene outdoor poolside areas, and beautiful indoor decor settings, our venue provides the ideal canvas for any gathering.
          </p>
          <Link
            to="/quote"
            className="inline-block bg-amber-700 text-white px-6 py-3 rounded-md font-medium hover:bg-amber-800 transition"
          >
            Request a Quote
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <img src={chairsSetupImg} alt="Venue Setup" className="rounded-lg shadow-md w-full h-48 object-cover" />
          <img src={decorSetupImg} alt="Decor Setup" className="rounded-lg shadow-md w-full h-48 object-cover mt-6" />
        </div>
      </section>

      <section className="py-16 max-w-6xl mx-auto px-6">
        <div className="relative rounded-2xl overflow-hidden shadow-xl h-80">
          <img src={poolImg} alt="Nojozi Poolside Area" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-center p-6">
            <div>
              <h3 className="text-3xl font-serif text-white mb-3">Ready to host your event with us?</h3>
              <Link to="/contact" className="inline-block bg-white text-stone-900 px-6 py-2.5 rounded-md font-medium hover:bg-stone-100 transition">
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;