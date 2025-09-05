// src/app/profile/page.tsx
'use client'; 

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import Link from 'next/link';
import { type Review } from '@/components/ReviewList';
import { ChatBubbleLeftRightIcon, StarIcon } from '@heroicons/react/24/outline';
import EditReviewModal from '@/components/EditReviewModal';
import { User } from '@supabase/supabase-js';
import ReviewList from '@/components/ReviewList'; // ReviewList'i import ediyoruz

export default function ProfilePage() {
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        window.location.href = '/';
        return;
      }
      setUser(session.user);

      const { data, error } = await supabase
        .from('reviews')
        .select(`*, companies (name, slug), profiles (username, avatar_url)`)
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false })
        .returns<Review[]>();

      if (error) {
        console.error("Error fetching reviews:", error);
      } else if (data) {
        setReviews(data);
      }
      setLoading(false);
    };

    fetchData();
  }, [supabase]);

  const handleEditClick = (review: Review) => {
    setSelectedReview(review);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedReview(null);
  };
  
  const handleReviewUpdated = (updatedReview: Review) => {
    setReviews(prevReviews => 
      prevReviews.map(r => (r.id === updatedReview.id ? { ...r, ...updatedReview } : r))
    );
  };
  
  const totalReviews = reviews.length;
  const averageRatingGiven = totalReviews > 0
    ? (reviews.reduce((acc, review) => acc + (review.rating || 0), 0) / totalReviews).toFixed(1)
    : 'N/A';

  if (loading) {
    return <p className="text-center text-gray-500 mt-40">Loading profile...</p>;
  }

  return (
    <>
      <main className="container mx-auto px-6 py-24 sm:py-32">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-600 mt-2">Welcome, {user?.email}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-start space-x-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <ChatBubbleLeftRightIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Reviews</p>
              <p className="text-2xl font-bold text-gray-900">{totalReviews}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-start space-x-4">
            <div className="bg-yellow-100 p-3 rounded-lg">
              <StarIcon className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Your Average Rating</p>
              <p className="text-2xl font-bold text-gray-900">{averageRatingGiven}</p>
            </div>
          </div>
        </div>

        <div>
          {reviews.length > 0 ? (
            <ReviewList reviews={reviews} onEditClick={handleEditClick} />
          ) : (
            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm text-center">
              <p className="text-gray-500">You haven`t submitted any reviews yet.</p>
              <Link href="/companies" className="mt-4 inline-block text-sm font-semibold text-blue-600 hover:text-blue-500">
                  Start exploring companies &rarr;
              </Link>
            </div>
          )}
        </div>
      </main>

      <EditReviewModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        review={selectedReview}
        onReviewUpdated={handleReviewUpdated}
      />
    </>
  );
}