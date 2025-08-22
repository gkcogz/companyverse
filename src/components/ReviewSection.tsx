// src/components/ReviewSection.tsx
'use client';

import { User } from '@supabase/supabase-js';
import { type Company } from '@/components/CompanyCard';
import { type Review } from '@/components/ReviewList';
import InteractiveSurvey from "@/components/InteractiveSurvey";
import ReviewList from "@/components/ReviewList";

// This is the part that needs to be corrected
type ReviewSectionProps = {
  company: Company; 
  reviews: Review[]; // Renamed from initialReviews for clarity
  user: User | null;
  onNewReview: (newReview: Review) => void; // Added onNewReview
};

const ReviewSection = ({ company, reviews, user, onNewReview }: ReviewSectionProps) => {
  return (
    <div className="mt-12">
      {user && company.category === 'Aviation' && (
        <InteractiveSurvey 
          company={company} 
          user={user} 
          onSurveyComplete={onNewReview} // onSurveyComplete now uses onNewReview
        />
      )}
      
      {company.category !== 'Aviation' && (
         <div className="mt-8 border-t border-gray-200 pt-8">
           <h3 className="text-2xl font-semibold text-gray-900">Information</h3>
           <p className="text-gray-600 mt-4">User reviews are currently only available for the aviation sector.</p>
         </div>
      )}
      
      <ReviewList reviews={reviews} />
    </div>
  );
};

export default ReviewSection;