// src/components/CompanyInfoCard.tsx
import Image from 'next/image';
import { type Company } from '@/components/CompanyCard';

// YENİ: Analiz verisi için net bir tip tanımlıyoruz.
// Bu tip, useReviewAnalytics hook'unun döndürdüğü veriyle eşleşmelidir.
type AnalyticsData = {
  averageRating: string;
  totalReviews: number;
  ratingDistribution: Array<{
    star: number;
    count: number;
    percentage: number;
  }>;
  topPositiveTags: Array<{
    tag: string;
    count: number;
  }>;
  topNegativeTags: Array<{
    tag: string;
    count: number;
  }>;
};

// 'analytics' prop'u artık 'any' yerine 'AnalyticsData' tipini kullanıyor.
type CompanyInfoCardProps = {
  company: Company & { description: string | null };
  analytics: AnalyticsData;
};

const CompanyInfoCard = ({ company, analytics }: CompanyInfoCardProps) => {
  return (
    <div className="sticky top-24 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <div className="flex flex-col items-center text-center">
        {company.logo_url ? (
          <Image
            src={company.logo_url}
            alt={`${company.name} logo`}
            width={96}
            height={96}
            className="rounded-full object-contain bg-white p-2 border border-gray-200"
          />
        ) : (
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-4xl font-bold text-gray-500">
            {company.name.charAt(0)}
          </div>
        )}
        <p className="text-xl text-gray-600 mt-4">{company.country}</p>
      </div>

      <div className="mt-6 border-t border-gray-200 pt-6">
        <h3 className="text-lg font-semibold text-gray-900">About {company.name}</h3>
        <p className="text-gray-600 leading-relaxed text-sm mt-2">
          {company.description || 'No description available yet.'}
        </p>
      </div>

      <div className="mt-6 border-t border-gray-200 pt-6">
        <h3 className="text-lg font-semibold text-gray-900">Overall Score</h3>
        <p className="text-3xl font-bold text-blue-600 mt-2">
          {analytics.averageRating} <span className="text-lg font-normal text-gray-500">/ 5</span>
        </p>
        <p className="text-xs text-gray-500 mt-1">Based on {analytics.totalReviews} reviews</p>
      </div>
      
      <div className="mt-6 border-t border-gray-200 pt-6 space-y-2">
        <h3 className="text-lg font-semibold text-gray-900">Rating Distribution</h3>
        {analytics.ratingDistribution.map(item => (
          <div key={item.star} className="flex items-center text-xs" title={`${item.count} reviews`}>
            <span className="text-gray-500">{item.star} ★</span>
            <div className="w-full bg-gray-200 rounded-full h-2 mx-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${item.percentage}%` }}></div>
            </div>
            <span className="text-gray-500 w-12 text-right">{item.percentage.toFixed(0)}%</span>
          </div>
        ))}
      </div>

      {(analytics.topPositiveTags.length > 0 || analytics.topNegativeTags.length > 0) && (
        <div className="mt-6 border-t border-gray-200 pt-6">
          <h3 className="text-lg font-semibold text-gray-900">Top Mentions</h3>
          <div className="mt-3 space-y-3">
            {analytics.topPositiveTags.map(({ tag, count }) => (
              <div key={tag} className="flex items-center text-sm">
                <span className="text-green-500 mr-2">👍</span>
                <span className="text-gray-700">{tag.substring(2)}</span>
                <span className="text-xs text-gray-500 ml-auto">{count} times</span>
              </div>
            ))}
            {analytics.topNegativeTags.map(({ tag, count }) => (
              <div key={tag} className="flex items-center text-sm">
                <span className="text-red-500 mr-2">👎</span>
                <span className="text-gray-700">{tag.substring(2)}</span>
                <span className="text-xs text-gray-500 ml-auto">{count} times</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyInfoCard;