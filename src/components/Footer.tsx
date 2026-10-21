import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-stone-950 text-stone-300 py-12 border-t border-stone-800 font-sans">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8 mb-8">
        <div>
          <h3 className="text-xl font-serif text-white mb-4">Nojozi Venue</h3>
          <p className="text-xs text-stone-400 leading-relaxed">
            An exquisite venue crafted for unforgettable weddings, corporate retreats, private celebrations, and milestone events.
          </p>
        </div>

        <div>
          <h4 className="text-white text-xs uppercase tracking-widest font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-xs">
            <li><Link to="/" className="hover:text-amber-400 transition">Home</Link></li>
            <li><Link to="/about" className="hover:text-amber-400 transition">About Us</Link></li>
            <li><Link to="/services" className="hover:text-amber-400 transition">Services</Link></li>
            <li><Link to="/quote" className="hover:text-amber-400 transition">Instant Quote</Link></li>
            <li><Link to="/contact" className="hover:text-amber-400 transition">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white text-xs uppercase tracking-widest font-semibold mb-4">Contact Details</h4>
          <p className="text-xs text-stone-400 mb-2">
            <strong className="text-stone-200">Address:</strong><br />
            18 Milner Drive, Kibler Park, Johannesburg
          </p>
          <p className="text-xs text-stone-400 mb-2">
            <strong className="text-stone-200">WhatsApp & Calls:</strong><br />
            <a href="https://wa.me/27699090089" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition">
              069 909 0089
            </a>
          </p>
          <p className="text-xs text-stone-400 mb-2">
            <strong className="text-stone-200">Email:</strong><br />
            <a href="mailto:nojozirestaurant@gmail.com" className="hover:text-amber-400 transition">
              nojozirestaurant@gmail.com
            </a>
          </p>
        </div>

        <div>
          <h4 className="text-white text-xs uppercase tracking-widest font-semibold mb-4">Connect With Us</h4>
          <p className="text-xs text-stone-400 mb-4">
            Follow our Instagram for recent event setups and venue updates.
          </p>
          <a
            href="https://www.instagram.com/nojozi.restaurant?exln=MWdmdmR6MmxlMm0yMA=="
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#D99B26] text-white text-[10px] uppercase tracking-widest font-semibold px-4 py-2.5 hover:bg-[#b8821d] transition"
          >
            Instagram Profile &rarr;
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-stone-900 flex flex-col md:flex-row justify-between items-center text-[11px] text-stone-500 gap-4">
        <p>&copy; {new Date().getFullYear()} Nojozi Venue. All rights reserved.</p>
        <Link to="/signin" className="hover:text-stone-400 transition">Owner & Admin Login</Link>
      </div>
    </footer>
  );
}

export default Footer;