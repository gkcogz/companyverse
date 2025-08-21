// src/components/CompanyInfoCard.tsx
'use client'; 

import { useState } from 'react';
import Image from 'next/image';
import { type Company } from '@/components/CompanyCard';
import { SparklesIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import SentimentGauge from './SentimentGauge';

export type AnalyticsData = {
  reviewCount: number;
  averageRating: number;
  distribution: Array<{ rating: number; count: number; }>;
  topPositiveTags: Array<{ tag: string; count: number; }>;
  topNegativeTags: Array<{ tag: string; count: number; }>;
};

type CompanyInfoCardProps = {
  company: Company & { description: string | null; ai_summary: string | null };
  analytics: AnalyticsData;
};

const CompanyInfoCard = ({ company, analytics }: CompanyInfoCardProps) => {
  const [summary, setSummary] = useState(company.ai_summary);
  const [isSummaryLoading, setIsSummaryLoading] = useState(false);

  const handleGenerateSummary = async () => {
    setIsSummaryLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    const newSummary = "This is a new AI-generated summary highlighting key customer feedback points.";
    setSummary(newSummary);
    setIsSummaryLoading(false);
  };
  
  const ratingScore = analytics.averageRating * 20;
  const totalPositiveCount = analytics.topPositiveTags.reduce((sum, tag) => sum + tag.count, 0);
  const totalNegativeCount = analytics.topNegativeTags.reduce((sum, tag) => sum + tag.count, 0);
  const totalTagCount = totalPositiveCount + totalNegativeCount;
  const tagScore = totalTagCount > 0 ? (totalPositiveCount / totalTagCount) * 100 : 50;
  const finalSentimentScore = (ratingScore * 0.7) + (tagScore * 0.3);

  const totalReviews = analytics.reviewCount;
  const ratingDistributionWithPercentage = analytics.distribution.map(item => ({
      ...item,
      percentage: totalReviews > 0 ? (item.count / totalReviews) * 100 : 0,
  }));
  
  const allTags = [...analytics.topPositiveTags, ...analytics.topNegativeTags];
  const maxCount = allTags.reduce((max, tag) => (tag.count > max ? tag.count : max), 0);

  return (
    <div className="sticky top-24 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <div className="flex flex-col items-center text-center">
        {company.logo_url ? (
          <Image src={company.logo_url} alt={`${company.name} logo`} width={96} height={96} className="rounded-full object-contain bg-white p-2 border border-gray-200" />
        ) : (
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-4xl font-bold text-gray-500">{company.name.charAt(0)}</div>
        )}
        <p className="text-xl text-gray-600 mt-4">{company.country}</p>
      </div>

      <div className="mt-6 border-t border-gray-200 pt-6">
        <h3 className="text-lg font-semibold text-gray-900">About {company.name}</h3>
        <p className="text-gray-600 leading-relaxed text-sm mt-2">{company.description || 'No description available yet.'}</p>
      </div>
      
      <div className="mt-6 border-t border-gray-200 pt-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center"><SparklesIcon className="w-5 h-5 text-purple-500 mr-2" /> AI Summary</h3>
        {summary ? (
          <p className="text-gray-600 leading-relaxed text-sm mt-2 italic">{summary}</p>
        ) : (
          <div className="mt-3 text-center">
            <p className="text-sm text-gray-500">No summary available yet.</p>
            <button
              onClick={handleGenerateSummary}
              disabled={isSummaryLoading}
              className="mt-2 inline-flex items-center justify-center py-2 px-3 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >{isSummaryLoading ? 'Generating...' : 'Generate with AI'}</button>
          </div>
        )}
      </div>

      <div className="mt-6 border-t border-gray-200 pt-6 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 items-center">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">Overall Score</h3>
            <p className="text-5xl font-bold text-blue-600 text-center">
              {analytics.averageRating.toFixed(1)} <span className="text-2xl font-normal text-gray-500">/ 5</span>
            </p>
            <p className="text-xs text-gray-500 mt-1 text-center">Based on {totalReviews} reviews</p>
          </div>
          <div>
             <div className="relative flex items-center justify-center gap-1 group mb-1">
                <h3 className="text-lg font-semibold text-gray-900">Sentiment</h3>
                <InformationCircleIcon className="h-5 w-5 text-gray-400 cursor-pointer" />
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 bg-gray-800 text-white text-xs rounded-lg p-3 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity duration-300 z-10">
                  <h4 className="font-bold mb-1">How is the Sentiment Score calculated?</h4>
                  <p>This score combines two key data points:</p>
                  <ul className="list-disc list-inside mt-1 space-y-1">
                    <li><strong>Star Rating (70%):</strong> The average of all user ratings.</li>
                    <li><strong>Tag Sentiment (30%):</strong> The ratio of positive vs. negative tags from all reviews.</li>
                  </ul>
                  <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-gray-800"></div>
                </div>
              </div>
             <div className="flex justify-center">
               <SentimentGauge score={finalSentimentScore} />
             </div>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-900">Top Mentions</h3>
          {allTags.length === 0 ? (
            <p className="text-xs text-gray-500">No tags mentioned yet.</p>
          ) : (
            <>
              {analytics.topPositiveTags.map(({ tag, count }) => {
                const percentage = maxCount > 0 ? (count / maxCount) * 100 : 0;
                return (
                  <div key={tag}>
                    <div className="flex justify-between items-center text-sm mb-1">
                      <span className="flex items-center text-gray-700">
                        <span className="text-green-500 mr-2">👍</span> {tag.substring(2)}
                      </span>
                      <span className="font-medium text-gray-500">{count}x</span>
                    </div>
                    <div className="w-full bg-green-100 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: `${percentage}%` }}></div>
                    </div>
                  </div>
                );
              })}
              {analytics.topNegativeTags.map(({ tag, count }) => {
                const percentage = maxCount > 0 ? (count / maxCount) * 100 : 0;
                return (
                  <div key={tag}>
                    <div className="flex justify-between items-center text-sm mb-1">
                      <span className="flex items-center text-gray-700">
                        <span className="text-red-500 mr-2">👎</span> {tag.substring(2)}
                      </span>
                      <span className="font-medium text-gray-500">{count}x</span>
                    </div>
                    <div className="w-full bg-red-100 rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full" style={{ width: `${percentage}%` }}></div>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>

      <div className="mt-6 border-t border-gray-200 pt-6 space-y-2">
        <h3 className="text-lg font-semibold text-gray-900">Rating Distribution</h3>
        {ratingDistributionWithPercentage.map(item => (
          <div key={item.rating} className="flex items-center text-xs" title={`${item.count} reviews`}>
            <span className="text-gray-500 w-12">{item.rating} star</span>
            <div className="w-full bg-gray-200 rounded-full h-2 mx-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${item.percentage}%` }}></div>
            </div>
            <span className="text-gray-500 w-12 text-right">{item.percentage.toFixed(0)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyInfoCard;