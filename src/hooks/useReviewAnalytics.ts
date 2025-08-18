// src/hooks/useReviewAnalytics.ts
import { useMemo } from 'react';
import { type Review } from '@/components/ReviewList';

export function useReviewAnalytics(reviews: Review[]) {
  const analytics = useMemo(() => {
    if (!reviews || reviews.length === 0) {
      return {
        averageRating: 'N/A',
        totalReviews: 0,
        ratingDistribution: [],
        topPositiveTags: [],
        topNegativeTags: [],
      };
    }

    const totalReviews = reviews.length;

    // 1. Ortalama Puan Hesaplama
    const totalRating = reviews.reduce((acc, review) => acc + (review.rating || 0), 0);
    const averageRating = (totalRating / totalReviews).toFixed(1);

    // 2. Puan Dağılımı Hesaplama
    const ratingDistribution = Array(5).fill(0).map((_, index) => {
      const star = 5 - index;
      const count = reviews.filter(r => r.rating === star).length;
      const percentage = (count / totalReviews) * 100;
      return { star, count, percentage };
    });

    // 3. Popüler Etiketleri Hesaplama
    const tagCounts: { [key: string]: number } = {};
    reviews.forEach(review => {
      const tagsLine = review.content?.split('\n').find(line => line.startsWith('Tags:'));
      if (tagsLine) {
        const tags = tagsLine.replace('Tags: ', '').split(', ').filter(Boolean);
        tags.forEach(tag => {
          tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        });
      }
    });

    const sortedTags = Object.entries(tagCounts).sort((a, b) => b[1] - a[1]);
    const topPositiveTags = sortedTags.filter(([tag]) => tag.startsWith('+')).slice(0, 2);
    const topNegativeTags = sortedTags.filter(([tag]) => tag.startsWith('-')).slice(0, 2);

    return { averageRating, totalReviews, ratingDistribution, topPositiveTags, topNegativeTags };
  }, [reviews]);

  return analytics;
}