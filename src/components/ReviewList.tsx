// src/components/ReviewList.tsx
'use client';

import { useState, useEffect } from 'react';

// Updated Review type to include profiles
export type Review = {
  id: number;
  created_at: string;
  content: string | null;
  rating: number | null;
  profiles: {
    username: string | null;
    avatar_url: string | null;
  } | null;
};

// --- Helper Components ---

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center">
    {[...Array(5)].map((_, index) => (
      <svg key={index} className={`w-5 h-5 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

const Tag = ({ text }: { text: string }) => {
  const isPositive = text.startsWith('+');
  const tagText = text.substring(2);
  const colorClasses = isPositive 
    ? 'bg-green-100 text-green-800 border-green-300' 
    : 'bg-red-100 text-red-800 border-red-300';
  
  return <div className={`px-2 py-0.5 text-xs rounded-full border ${colorClasses}`}>{tagText}</div>
};

// --- Main Review Card Component ---

const ReviewCard = ({ review }: { review: Review }) => {
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    // This ensures date formatting only happens on the client, avoiding hydration errors
    setFormattedDate(new Date(review.created_at).toLocaleDateString());
  }, [review.created_at]);

  const lines = review.content?.split('\n') || [];
  const moodLine = lines.find(line => line.startsWith('Mood:'));
  const tagsLine = lines.find(line => line.startsWith('Tags:'));
  const comment = lines.filter(line => !line.startsWith('Mood:') && !line.startsWith('Tags:')).join('\n').trim();

  const mood = moodLine?.replace('Mood: ', '');
  const tags = tagsLine?.replace('Tags: ', '').split(', ').filter(Boolean) || [];
  const username = review.profiles?.username || 'Anonymous';

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
      <div className="flex items-start space-x-4">
        <div className="w-10 h-10 bg-gray-200 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-gray-500">
          {username.charAt(0).toUpperCase()}
        </div>
        
        <div className="flex-grow">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-gray-900">{username}</p>
              <p className="text-xs text-gray-500">{formattedDate}</p>
            </div>
            {review.rating && <StarRating rating={review.rating} />}
          </div>

          {(mood || tags.length > 0) && (
            <div className="flex items-center space-x-4 mt-3">
              {mood && <span className="text-2xl">{mood}</span>}
              <div className="flex flex-wrap gap-2">
                {tags.map(tag => <Tag key={tag} text={tag.startsWith('+') || tag.startsWith('-') ? tag : `+ ${tag}`} />)}
              </div>
            </div>
          )}

          {comment && <p className="text-gray-700 mt-3 whitespace-pre-wrap">{comment}</p>}
        </div>
      </div>
    </div>
  );
};

// --- Review List Component ---

const ReviewList = ({ reviews }: { reviews: Review[] }) => {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="mt-8 border-t border-gray-200 pt-8">
        <h3 className="text-2xl font-semibold text-gray-900">Ratings & Reviews</h3>
        <p className="text-gray-600 mt-4">Be the first to share your experience!</p>
      </div>
    );
  }

  return (
    <div className="mt-8 border-t border-gray-200 pt-8">
      <h3 className="text-2xl font-semibold text-gray-900 mb-6">Ratings & Reviews ({reviews.length})</h3>
      <div className="space-y-6">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
};

export default ReviewList;