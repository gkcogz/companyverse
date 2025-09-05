// src/components/EditReviewModal.tsx
'use client';

import { useState, useEffect, Fragment } from 'react';
import { useRouter } from 'next/navigation';
import { Dialog, Transition } from '@headlessui/react';
import { createClient } from '@/utils/supabase/client';
import { type Review } from '@/components/ReviewList';

// --- Yardımcı Bileşenler ve Sabitler ---
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
          <svg key={starValue} className={`w-8 h-8 cursor-pointer transition-colors ${ starValue <= (hoverRating || rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20" onClick={() => setRating(starValue)} onMouseEnter={() => setHoverRating(starValue)} onMouseLeave={() => setHoverRating(0)}>
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      })}
    </div>
  );
};

type EditReviewModalProps = {
  isOpen: boolean;
  onClose: () => void;
  review: Review | null;
  onReviewUpdated: (updatedReview: Review) => void; // Anında güncelleme için
}

export default function EditReviewModal({ isOpen, onClose, review, onReviewUpdated }: EditReviewModalProps) {
  const supabase = createClient();

  const [rating, setRating] = useState(0);
  const [content, setContent] = useState('');
  const [mood, setMood] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Modal her açıldığında veya farklı bir yorum seçildiğinde, formu o yorumun verileriyle doldurur.
  useEffect(() => {
    if (review && isOpen) {
      const lines = review.content?.split('\n') || [];
      const moodLine = lines.find(line => line.startsWith('Mood:'));
      const tagsLine = lines.find(line => line.startsWith('Tags:'));
      const comment = lines.filter(line => !line.startsWith('Mood:') && !line.startsWith('Tags:')).join('\n').trim();

      setRating(review.rating || 0);
      setContent(comment);
      setMood(moodLine?.replace('Mood: ', '') || null);
      setSelectedTags(tagsLine?.replace('Tags: ', '').split(', ').filter(Boolean) || []);
    }
  }, [review, isOpen]);

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prevTags => 
      prevTags.includes(tag) ? prevTags.filter(t => t !== tag) : [...prevTags, tag]
    );
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!review) return;

    setIsSubmitting(true);
    setError(null);

    // Güncellenmiş verilerden yeni 'content' metnini oluştur
    const finalContent = `Mood: ${mood}\nTags: ${selectedTags.join(', ')}\n\n${content}`;

    const { data: updatedReview, error: updateError } = await supabase
      .from('reviews')
      .update({ content: finalContent, rating: rating })
      .eq('id', review.id)
      .select('*, profiles(*)') // Güncellenmiş veriyi, profil bilgisiyle birlikte geri al
      .single();

    if (updateError) {
      setError(updateError.message);
    } else if (updatedReview) {
      onReviewUpdated(updatedReview); // Profil sayfasındaki listeyi anında güncelle
      onClose(); // Modal'ı kapat
    }
    setIsSubmitting(false);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* ... Modal arkaplanı ve geçiş efektleri ... */}
        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black bg-opacity-30" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
              <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">Edit Your Review</Dialog.Title>
                
                <form onSubmit={handleUpdate} className="mt-4 space-y-6">
                  {/* Mood (Emoji) Düzenleme */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Your Mood</label>
                    <div className="flex flex-wrap gap-2">
                        {EMOJI_OPTIONS.map(option => (
                            <button type="button" key={option.emoji} onClick={() => setMood(option.emoji)} className={`p-2 rounded-lg border-2 ${mood === option.emoji ? 'border-blue-500 bg-blue-100' : 'border-transparent hover:bg-gray-100'}`}>
                                <span className="text-2xl">{option.emoji}</span>
                            </button>
                        ))}
                    </div>
                  </div>

                  {/* Etiket (Tags) Düzenleme */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                    <div className="flex flex-wrap gap-2">
                        {POSITIVE_TAGS.map(tag => <button type="button" key={tag} onClick={() => handleTagToggle(`+ ${tag}`)} className={`px-2 py-1 text-xs rounded-full border ${selectedTags.includes(`+ ${tag}`) ? 'bg-green-100 border-green-400 text-green-800' : 'bg-gray-100 border-gray-300'}`}>+ {tag}</button>)}
                        {NEGATIVE_TAGS.map(tag => <button type="button" key={tag} onClick={() => handleTagToggle(`- ${tag}`)} className={`px-2 py-1 text-xs rounded-full border ${selectedTags.includes(`- ${tag}`) ? 'bg-red-100 border-red-400 text-red-800' : 'bg-gray-100 border-gray-300'}`}>- {tag}</button>)}
                    </div>
                  </div>

                  {/* Metin (Content) Düzenleme */}
                  <div>
                    <label htmlFor="content" className="block text-sm font-medium text-gray-700">Your Experience</label>
                    <textarea id="content" rows={4} value={content} onChange={(e) => setContent(e.target.value)} className="mt-1 block w-full bg-white border border-gray-300 rounded-md p-2" />
                  </div>

                  {/* Puan (Rating) Düzenleme */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Your Rating</label>
                    <StarRatingInput rating={rating} setRating={setRating} />
                  </div>

                  <div className="mt-6 flex justify-end space-x-4">
                    <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">Cancel</button>
                    <button type="submit" disabled={isSubmitting} className="inline-flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50">{isSubmitting ? 'Saving...' : 'Save Changes'}</button>
                  </div>
                  {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}