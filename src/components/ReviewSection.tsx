// src/components/ReviewSection.tsx
'use client';

import { User } from '@supabase/supabase-js';
import { type Company } from '@/components/CompanyCard';
import { type Review } from '@/components/ReviewList';
import InteractiveSurvey from "@/components/InteractiveSurvey";
import ReviewList from "@/components/ReviewList";
import Link from 'next/link';

type ReviewSectionProps = {
  company: Company; 
  reviews: Review[];
  user: User | null;
  onNewReview: (newReview: Review) => void;
  existingUserReview: Review | undefined;
};

const ReviewSection = ({ company, reviews, user, onNewReview, existingUserReview }: ReviewSectionProps) => {
  return (
    <div className="mt-12">
      {user && company.category === 'Aviation' && (
        <>
          {existingUserReview ? (
            <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl text-center mb-8">
              <h3 className="font-semibold text-gray-900">You`ve already reviewed {company.name}.</h3>
              <p className="text-gray-600 mt-2 text-sm">
                You can edit your existing review from your profile.
              </p>
              <div className="mt-4">
                <Link 
                  href="/profile"
                  className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  Go to My Profile to Edit
                </Link>
              </div>
            </div>
          ) : (
            <InteractiveSurvey 
              company={company} 
              user={user} 
              onSurveyComplete={onNewReview} 
            />
          )}
        </>
      )}
      
      {(!user || company.category !== 'Aviation') && (
         <div className="mt-8 border-t border-gray-200 pt-8">
           <h3 className="text-2xl font-semibold text-gray-900">Information</h3>
           <p className="text-gray-600 mt-4">
            {company.category === 'Aviation' 
              ? 'Please sign in to share your experience.' 
              : 'User reviews are currently only available for the aviation sector.'}
           </p>
         </div>
      )}
      
      <ReviewList reviews={reviews} />
    </div>
  );
};

export default ReviewSection;