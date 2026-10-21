import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface ReviewItem {
  id?: string;
  author: string;
  event_type: string;
  rating: number;
  comment: string;
  created_at?: string;
}

export function Reviews() {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(true);

  // Form state
  const [author, setAuthor] = useState('');
  const [eventType, setEventType] = useState('Birthday Party');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoadingReviews(true);
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) console.error('Error fetching reviews:', error);
      else setReviews(data || []);
    } catch (err) {
      console.error('Unexpected error fetching reviews:', err);
    } finally {
      setLoadingReviews(false);
    }
  };

 const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    try {
      // 1. Try full insert with event_type
      let { error } = await supabase.from('reviews').insert([
        {
          author: author || 'Anonymous Guest',
          event_type: eventType,
          rating,
          comment,
        },
      ]);

      // 2. Fallback if event_type column is missing
      if (error && error.message.includes('column')) {
        console.warn('Retrying review submission without optional columns:', error.message);
        const fallbackRes = await supabase.from('reviews').insert([
          {
            author: author || 'Anonymous Guest',
            rating,
            comment,
          },
        ]);
        error = fallbackRes.error;
      }

      if (error) {
        setErrorMsg('Failed to save review: ' + error.message);
      } else {
        setSubmitSuccess(true);
        setAuthor('');
        setComment('');
        setRating(5);
        fetchReviews(); // Refresh review list instantly
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Average Rating Calculation
  const avgRating =
    reviews.length > 0
      ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
      : '5.0';

  return (
    <div className="bg-[#FAF7F2] text-stone-900 font-sans min-h-[85vh] py-16 px-6">
      <div className="max-w-5xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-widest text-stone-500 mb-2 font-medium">
            CLIENT TESTIMONIALS
          </p>
          <h1 className="text-4xl md:text-5xl font-serif text-stone-950 mb-3">
            Guest Experiences
          </h1>
          <p className="text-stone-600 text-xs md:text-sm max-w-lg mx-auto">
            Read authentic reviews from guests who hosted their milestone celebrations and events at Nojozi Venue.
          </p>
        </div>

        {/* OVERALL SUMMARY & LEAVE REVIEW BUTTON */}
        <div className="bg-[#F5F0E8] border border-[#E8E2D9] p-8 mb-12 flex flex-col md:flex-row justify-between items-center gap-6 shadow-xs">
          <div className="text-center md:text-left">
            <span className="text-3xl md:text-4xl font-serif text-[#D99B26] font-bold">
              ★ {avgRating} / 5.0
            </span>
            <p className="text-xs text-stone-600 mt-1">
              Based on {reviews.length} guest {reviews.length === 1 ? 'review' : 'reviews'}
            </p>
          </div>

          <button
            onClick={() => {
              setShowForm(!showForm);
              setSubmitSuccess(false);
            }}
            className="bg-[#D99B26] text-white text-xs uppercase tracking-widest font-semibold px-6 py-3.5 hover:bg-[#b8821d] transition"
          >
            {showForm ? 'CLOSE REVIEW FORM' : 'WRITE A REVIEW'}
          </button>
        </div>

        {/* SUBMIT REVIEW FORM */}
        {showForm && (
          <div className="bg-[#F5F0E8] border border-[#E8E2D9] p-8 mb-12 shadow-sm">
            <h2 className="text-2xl font-serif text-stone-950 mb-6">Leave Your Review</h2>

            {submitSuccess ? (
              <div className="p-6 bg-[#FAF7F2] border border-[#E8E2D9] text-center">
                <span className="text-3xl text-[#D99B26] block mb-2">★</span>
                <h3 className="text-xl font-serif text-stone-900 mb-1">Thank You!</h3>
                <p className="text-xs text-stone-600">Your review has been captured and published.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {errorMsg && (
                  <div className="p-3 bg-red-100 border border-red-200 text-red-700 text-xs">
                    {errorMsg}
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-widest font-semibold text-stone-700 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      placeholder="e.g. Lerato M."
                      className="w-full bg-[#FAF7F2] border border-[#E8E2D9] px-4 py-3 text-xs focus:outline-none focus:border-[#D99B26]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest font-semibold text-stone-700 mb-2">
                      Event Type
                    </label>
                    <select
                      value={eventType}
                      onChange={(e) => setEventType(e.target.value)}
                      className="w-full bg-[#FAF7F2] border border-[#E8E2D9] px-4 py-3 text-xs focus:outline-none focus:border-[#D99B26]"
                    >
                      <option value="Birthday Party">Birthday Party</option>
                      <option value="Baby Shower">Baby Shower</option>
                      <option value="Pool Party">Pool Party</option>
                      <option value="Team Building">Team Building</option>
                      <option value="Open Buffet Event">Open Buffet Event</option>
                      <option value="General & Private Function">General & Private Function</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest font-semibold text-stone-700 mb-2">
                    Rating (1 to 5 Stars)
                  </label>
                  <div className="flex gap-2 text-2xl text-[#D99B26] cursor-pointer">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        onClick={() => setRating(star)}
                        className={star <= rating ? 'opacity-100' : 'opacity-30'}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest font-semibold text-stone-700 mb-2">
                    Your Feedback & Review *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Tell us about your experience at Nojozi Venue..."
                    className="w-full bg-[#FAF7F2] border border-[#E8E2D9] px-4 py-3 text-xs focus:outline-none focus:border-[#D99B26]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#D99B26] text-white text-xs uppercase tracking-widest font-semibold py-3.5 hover:bg-[#b8821d] transition disabled:opacity-50"
                >
                  {isSubmitting ? 'SUBMITTING...' : 'SUBMIT REVIEW'}
                </button>
              </form>
            )}
          </div>
        )}

        {/* REVIEWS LIST */}
        {loadingReviews ? (
          <p className="text-xs text-stone-500 italic text-center py-12">Loading guest reviews...</p>
        ) : reviews.length === 0 ? (
          <div className="bg-[#F5F0E8] border border-[#E8E2D9] p-8 text-center text-xs text-stone-600">
            No reviews yet. Be the first to share your experience at Nojozi Venue!
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {reviews.map((rev, idx) => (
              <div
                key={rev.id || idx}
                className="bg-[#F5F0E8] border border-[#E8E2D9] p-6 space-y-3 flex flex-col justify-between shadow-xs"
              >
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[#D99B26] text-sm">
                      {'★'.repeat(rev.rating)}
                      {'☆'.repeat(5 - rev.rating)}
                    </span>
                    <span className="text-[10px] uppercase tracking-widest text-stone-400 font-semibold">
                      {rev.event_type}
                    </span>
                  </div>
                  <p className="text-stone-800 text-xs leading-relaxed italic">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E8E2D9] flex justify-between text-[11px] text-stone-500">
                  <span className="font-semibold text-stone-900">{rev.author}</span>
                  <span>{rev.created_at ? new Date(rev.created_at).toLocaleDateString() : ''}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Reviews;