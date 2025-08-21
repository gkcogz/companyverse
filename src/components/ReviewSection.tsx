// src/components/ReviewSection.tsx
'use client';

import { User } from '@supabase/supabase-js';
import { type Company } from '@/components/CompanyCard';
import { type Review } from '@/components/ReviewList';
import InteractiveSurvey from "@/components/InteractiveSurvey";
import ReviewList from "@/components/ReviewList";

// Bu bileşenin alacağı props'ların tipi
type ReviewSectionProps = {
  // DEĞİŞİKLİK: 'company' prop'unun tipi, 'Company' tipiyle tam uyumlu hale getirildi.
  company: Company; 
  reviews: Review[];
  user: User | null;
  onSurveyComplete: (newReview: Review) => void;
};

const ReviewSection = ({ company, reviews, user, onSurveyComplete }: ReviewSectionProps) => {
  return (
    <div className="mt-12">
      {/* Kategoriye göre anket gösterimini burada kontrol ediyoruz */}
      {user && company.category === 'Aviation' && (
        <InteractiveSurvey 
          company={company} 
          user={user} 
          onSurveyComplete={onSurveyComplete} 
        />
      )}
      
      {/* Biyoteknoloji gibi kategoriler için buraya farklı bir içerik gelecek */}
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