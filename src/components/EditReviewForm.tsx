// src/components/EditReviewForm.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link'; // EKSİK OLAN VE YENİ EKLENEN SATIR
import { createClient } from '@/utils/supabase/client';
import { type Review } from '@/components/ReviewList';

// StarRatingInput bileşenini InteractiveSurvey'den alabilir veya burada yeniden tanımlayabiliriz.
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
              starValue <= (hoverRating || rating) ? 'text-yellow-400' : 'text-gray-300'
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


type EditReviewFormProps = {
  review: Review;
}

export default function EditReviewForm({ review }: EditReviewFormProps) {
  const router = useRouter();
  const supabase = createClient();

  const [rating, setRating] = useState(review.rating || 0);
  const [content, setContent] = useState(review.content || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const { error: updateError } = await supabase
      .from('reviews')
      .update({ 
        content: content,
        rating: rating,
      })
      .eq('id', review.id);

    if (updateError) {
      setError(updateError.message);
      console.error("Error updating review:", updateError);
    } else {
      router.push('/profile');
      router.refresh(); 
    }

    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleUpdate} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Your Rating</label>
        <StarRatingInput rating={rating} setRating={setRating} />
      </div>
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">Your Experience</label>
        <textarea
          id="content"
          name="content"
          rows={6}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900 p-2"
          placeholder="What was your experience like?"
        ></textarea>
      </div>
      <div className="flex justify-end space-x-4">
        <Link href="/profile" className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50">
          Cancel
        </Link>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </form>
  );
}