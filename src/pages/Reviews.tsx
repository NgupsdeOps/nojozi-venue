import React, { useState } from 'react';
import { Star, CheckCircle } from 'lucide-react';

interface ReviewItem {
  id: string;
  author: string;
  comment: string;
  rating: number;
  date: string;
}

export const Reviews: React.FC = () => {
  const [reviews, setReviews] = useState<ReviewItem[]>([
    {
      id: '1',
      author: 'Sipho Dlamini',
      comment: 'Hosted our 30th birthday celebration here and the atmosphere was magical. The staff was professional and the venue setup exceeded expectations.',
      rating: 5,
      date: 'October 2026'
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [newReview, setNewReview] = useState({
    author: '',
    comment: '',
    rating: 5
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const item: ReviewItem = {
      id: Date.now().toString(),
      author: newReview.author,
      comment: newReview.comment,
      rating: newReview.rating,
      date: 'Just now'
    };
    setReviews([item, ...reviews]);
    setSubmitted(true);
    setNewReview({ author: '', comment: '', rating: 5 });
  };

  return (
    <div className="bg-[#FAF6F0] min-h-screen py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#C68B29] font-semibold mb-2 block">REVIEWS</span>
            <h1 className="font-serif text-4xl text-[#1A1A1A]">From our guests</h1>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-[#1A1A1A] hover:bg-[#3A3A3A] text-white text-xs font-semibold px-5 py-3 uppercase tracking-wider transition-colors"
          >
            {showForm ? 'Cancel' : 'Read & Write Reviews'}
          </button>
        </div>

        {/* SUBMIT REVIEW FORM */}
        {showForm && (
          <div className="bg-white border border-[#E8DCCB] p-8 mb-12 shadow-sm">
            <h3 className="font-serif text-2xl text-[#1A1A1A] mb-4">Share your experience</h3>
            {submitted ? (
              <div className="text-center py-6">
                <CheckCircle className="mx-auto text-[#E5A93B] mb-3" size={40} />
                <p className="text-sm font-semibold text-[#1A1A1A] mb-1">Thank you for your review!</p>
                <p className="text-xs text-gray-500 mb-4">Your feedback has been published.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="bg-[#E5A93B] text-white text-xs font-semibold px-4 py-2 uppercase tracking-wider"
                >
                  Write Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-600 mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={newReview.author}
                    onChange={(e) => setNewReview({ ...newReview, author: e.target.value })}
                    className="w-full border border-gray-300 p-3 text-xs focus:outline-none focus:border-[#E5A93B]"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-600 mb-1">Rating *</label>
                  <div className="flex space-x-2 text-[#E5A93B]">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <Star
                        key={num}
                        size={20}
                        className={`cursor-pointer ${num <= newReview.rating ? 'fill-current' : 'text-gray-300'}`}
                        onClick={() => setNewReview({ ...newReview, rating: num })}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-600 mb-1">Your Review *</label>
                  <textarea
                    rows={4}
                    required
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    className="w-full border border-gray-300 p-3 text-xs focus:outline-none focus:border-[#E5A93B]"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#E5A93B] hover:bg-[#C68B29] text-white text-xs font-semibold px-6 py-3 uppercase tracking-wider transition-all"
                >
                  Submit Review
                </button>
              </form>
            )}
          </div>
        )}

        {/* REVIEWS LIST */}
        <div className="space-y-6">
          {reviews.map((rev) => (
            <div key={rev.id} className="bg-white border border-[#E8DCCB] p-6 shadow-sm">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-serif text-lg text-[#1A1A1A]">{rev.author}</h4>
                <span className="text-xs text-gray-400">{rev.date}</span>
              </div>
              <div className="flex text-[#E5A93B] mb-3">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} size={14} className="fill-current" />
                ))}
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">{rev.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};