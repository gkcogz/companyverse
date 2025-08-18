// src/components/InteractiveSurvey.tsx
'use client';

import { useState } from 'react';
import { User } from '@supabase/supabase-js';
import { type Review } from '@/components/ReviewList';
import { createClient } from '@/utils/supabase/client';

// --- Bileşen Dışı Yardımcılar ---
const EMOJI_OPTIONS = [
  { emoji: '😠', label: 'Very Bad', rating: 1 },
  { emoji: '😐', label: 'Okay', rating: 2 },
  { emoji: '😊', label: 'Good', rating: 4 },
  { emoji: '😍', label: 'Excellent', rating: 5 },
];

const POSITIVE_TAGS = ['Friendly Crew', 'On-time Performance', 'Seat Comfort', 'Good Value', 'Clean Aircraft'];
const NEGATIVE_TAGS = ['Rude Crew', 'Delayed Flight', 'Uncomfortable Seat', 'Hidden Fees', 'Dirty Aircraft'];

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

// --- Ana Anket Bileşeni ---
const InteractiveSurvey = ({ airlineId, user, onSurveyComplete }: { airlineId: number, user: User, onSurveyComplete: (newReview: Review) => void }) => {
  const [step, setStep] = useState(1);
  
  // Anket verilerini saklamak için state'ler
  const [mood, setMood] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(0);

  // Gönderme ve hata durumları için state'ler
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const supabase = createClient();

  const handleMoodSelect = (emoji: string, defaultRating: number) => {
    setMood(emoji);
    setRating(defaultRating); // Emoji'ye göre varsayılan bir puan atayalım
    setStep(2);
  };

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prevTags => 
      prevTags.includes(tag)
        ? prevTags.filter(t => t !== tag)
        : [...prevTags, tag]
    );
  };

  const handleSubmit = async () => {
    if (rating === 0) {
      setError("Please select a final star rating.");
      return;
    }
    setIsSubmitting(true);
    setError(null);

    // Yorum metnini emoji ve etiketlerle birleştirelim (AI için harika veri)
    const finalContent = `Mood: ${mood}\nTags: ${selectedTags.join(', ')}\n\n${content}`;

    const { data: newReview, error: insertError } = await supabase.from('reviews').insert({
      airline_id: airlineId,
      user_id: user.id,
      rating: rating,
      content: finalContent,
    }).select().single();

    if (insertError) {
      setError(insertError.message);
      console.error("Error inserting review:", insertError);
    } else if (newReview) {
      onSurveyComplete(newReview);
      // Formu sıfırla veya bir "Teşekkürler" mesajı göster
      setStep(4); // "Teşekkürler" adımına geç
    }
    setIsSubmitting(false);
  };

  // --- JSX Arayüzü ---
  return (
    <div className="mt-8 border-t border-gray-700/50 pt-8">
      
      {step === 1 && (
        <div>
          <h3 className="text-2xl font-semibold text-black">How was your flight experience?</h3>
          <p className="text-gray-600 mt-2">Summarize your flight with a single emoji.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            {EMOJI_OPTIONS.map((option) => (
              <button
                key={option.label}
                onClick={() => handleMoodSelect(option.emoji, option.rating)}
                className={`flex flex-col items-center p-4 rounded-xl border-2 transition-all duration-300 w-24 h-24 justify-center
                  ${mood === option.emoji 
                    ? 'border-blue-500 bg-blue-500/20' 
                    : 'border-transparent hover:bg-gray-400/50'}
                `}
              >
                <span className="text-4xl">{option.emoji}</span>
                <span className="text-xs mt-1 text-black">{option.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
      
      {step === 2 && (
        <div>
          <h3 className="text-2xl font-semibold text-black">What stood out?</h3>
          <p className="text-gray-600 mt-2">Select the good and bad aspects of your experience. You can select multiple.</p>
          
          <div className="mt-6">
            <h4 className="font-semibold text-black">The Good:</h4>
            <div className="flex flex-wrap gap-2 mt-2">
              {POSITIVE_TAGS.map(tag => (
                <button 
                  key={tag} 
                  onClick={() => handleTagToggle(tag)}
                  className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
                    selectedTags.includes(tag)
                      ? 'bg-green-500/20 border-green-500 text-white'
                      : 'bg-gray-700/50 border-gray-600 text-white hover:border-gray-400'
                  }`}
                >
                  + {tag}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <h4 className="font-semibold text-black">The Bad:</h4>
            <div className="flex flex-wrap gap-2 mt-2">
              {NEGATIVE_TAGS.map(tag => (
                <button 
                  key={tag} 
                  onClick={() => handleTagToggle(tag)}
                  className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
                    selectedTags.includes(tag)
                      ? 'bg-red-500/20 border-red-500 text-white'
                      : 'bg-gray-700/50 border-gray-600 text-white hover:border-gray-400'
                  }`}
                >
                  - {tag}
                </button>
              ))}
            </div>
          </div>
          
          <div className="mt-8 flex justify-between items-center">
            <button onClick={() => setStep(1)} className="text-sm text-gray-400 hover:text-black">← Back</button>
            <button 
              onClick={() => setStep(3)} 
              className="rounded-md bg-blue-500 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-400"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <h3 className="text-2xl font-semibold text-black">Any other details?</h3>
          <p className="text-gray-600 mt-2">Optionally, add a comment and confirm your final rating.</p>
          <div className="mt-4 space-y-4">
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-500">Your Experience (Optional)</label>
              <textarea
                id="content"
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="mt-1 block w-full bg-gray-800 border-gray-600 rounded-md text-white p-2"
                placeholder="What was your experience like?"
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Final Rating</label>
              <StarRatingInput rating={rating} setRating={setRating} />
            </div>
          </div>
           <div className="mt-8 flex justify-between items-center">
            <button onClick={() => setStep(2)} className="text-sm text-gray-400 hover:text-black">← Back</button>
            <button 
              onClick={handleSubmit} 
              disabled={isSubmitting}
              className="inline-flex justify-center py-2 px-4 rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Review'}
            </button>
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
      )}

      {step === 4 && (
        <div className="text-center py-8">
            <h3 className="text-2xl font-semibold text-green-600">Thank You!</h3>
            <p className="text-gray-600 mt-2">Your review has been successfully submitted.</p>
        </div>
      )}
    </div>
  );
};

export default InteractiveSurvey;