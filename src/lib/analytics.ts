// src/lib/analytics.ts
import { type Review } from "@/components/ReviewList";

export function calculateAnalytics(reviews: Review[]) {
  const reviewCount = reviews.length;
  const averageRating = reviewCount > 0 
    ? reviews.reduce((acc, review) => acc + (review.rating || 0), 0) / reviewCount
    : 0;

  const ratingDistribution = Array.from({ length: 5 }, (_, i) => ({ rating: 5 - i, count: 0 }));
  reviews.forEach(review => {
    const star = Math.round(review.rating || 0);
    const item = ratingDistribution.find(r => r.rating === star);
    if (item) item.count++;
  });

  const tagCounts: { [key:string]: number } = {};
  reviews.forEach(review => {
    if (!review.content) return;
    const lines = review.content.split('\n');
    const tagsLine = lines.find(line => line.startsWith('Tags:'));

    if (tagsLine) {
      const tagsString = tagsLine.replace('Tags: ', '');
      const tagList = tagsString.split(',').map(tag => tag.trim());
      tagList.forEach(tag => {
        if (tag.startsWith('+')) {
          const formattedTag = 'p-' + tag.substring(2);
          tagCounts[formattedTag] = (tagCounts[formattedTag] || 0) + 1;
        } else if (tag.startsWith('-')) {
          const formattedTag = 'n-' + tag.substring(2);
          tagCounts[formattedTag] = (tagCounts[formattedTag] || 0) + 1;
        }
      });
    }
  });

  const sortedTags = Object.entries(tagCounts).sort(([, a], [, b]) => b - a);
  const topPositiveTags = sortedTags.filter(([tag]) => tag.startsWith('p-')).slice(0, 3).map(([tag, count]) => ({ tag, count }));
  const topNegativeTags = sortedTags.filter(([tag]) => tag.startsWith('n-')).slice(0, 3).map(([tag, count]) => ({ tag, count }));
  
  return {
    reviewCount,
    averageRating,
    distribution: ratingDistribution,
    topPositiveTags,
    topNegativeTags,
  };
}