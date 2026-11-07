import { useEffect } from 'react';
import { Star, ExternalLink } from 'lucide-react';

export function Reviews() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://cdn.trustindex.io/loader.js?951831985d9927376e967925c55";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-12 px-4 sm:px-6 font-sans text-stone-900">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-widest text-stone-500 mb-2 font-medium">
            CLIENT TESTIMONIALS
          </p>
          <h1 className="text-3xl sm:text-4xl font-serif text-stone-950">Google Reviews & Feedback</h1>
          <p className="text-xs text-stone-600 mt-2">
            See what our guests say about their experience at Nojozi Venue.
          </p>
        </div>

        {/* Rating Summary Card */}
        <div className="bg-white border border-[#E8E2D9] p-6 text-center mb-8 shadow-sm max-w-xl mx-auto">
          <div className="flex items-center justify-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-[#D99B26] text-[#D99B26]" />
            ))}
          </div>
          <p className="text-lg font-serif text-stone-950 font-semibold">Live Google Reviews</p>
          <p className="text-xs text-stone-500 mt-1 mb-4">
            Synced automatically from our official Google Business Profile.
          </p>
          
          <a
            href="https://g.page/r/CXa7Y-NUzRIeEBE/review" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-stone-900 text-white text-xs uppercase tracking-widest px-6 py-2.5 hover:bg-[#D99B26] transition font-semibold"
          >
            Leave Us a Review on Google <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Embedded Google Reviews Widget Wrapper */}
        <div className="bg-white border border-[#E8E2D9] p-6 shadow-sm min-h-[250px]">
          <div className="trustindex-widget"></div>
        </div>

      </div>
    </div>
  );
}

export default Reviews;