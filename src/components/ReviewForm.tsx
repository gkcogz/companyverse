// src/components/ReviewForm.tsx
'use client';

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client'
import { User } from '@supabase/supabase-js';
import { type Review } from '@/components/ReviewList'; // Review tipini ReviewList'ten alıyoruz

// Star (Yıldız) bileşeni - puanlama için
const StarRatingInput = ({ rating, setRating }: { rating: number, setRating: (r: number) => void }) => {
  const [hoverRating, setHoverRating] = useState(0);
  return (
    <div className="flex items-center space-x-1">
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        return (
          <svg
            key={starValue}
            className={`w-8 h-8 cursor-pointer transition-colors ${
              starValue <= (hoverRating || rating) ? 'text-yellow-400' : 'text-gray-600'
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
            onClick={() => setRating(starValue)}
            onMouseEnter={() => setHoverRating(starValue)}
            onMouseLeave={() => setHoverRating(0)}
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      })}
    </div>
  );
};

const ReviewForm = ({ airlineId, user, onReviewSubmitted }: { airlineId: number, user: User, onReviewSubmitted: (newReview: Review) => void }) => {
  const supabase = createClient();
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      setError("Please select a star rating.");
      return;
    }
    setIsSubmitting(true);
    setError(null);

    const { data: newReview, error: insertError } = await supabase.from('reviews').insert({
      airline_id: airlineId,
      user_id: user.id,
      rating: rating,
      content: content,
    }).select().single();

    if (insertError) {
      setError(insertError.message);
      console.error("Error inserting review:", insertError);
    } else if (newReview) {
      // Sayfayı yenilemek yerine, ana bileşene yeni yorumu gönderiyoruz
      onReviewSubmitted(newReview);
      setRating(0);
      setContent('');
    }
    setIsSubmitting(false);
  };

  return (
    <div className="mt-8 border-t border-gray-700/50 pt-8">
      <h3 className="text-2xl font-semibold text-white">Write Your Review</h3>
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Your Rating</label>
          <StarRatingInput rating={rating} setRating={setRating} />
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-300">Your Experience</label>
          <textarea
            id="content"
            name="content"
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="mt-1 block w-full bg-gray-800 border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-white p-2"
            placeholder="What was your experience like?"
          ></textarea>
        </div>
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Review'}
          </button>
        </div>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default ReviewForm;