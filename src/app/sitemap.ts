// src/app/sitemap.ts
import { MetadataRoute } from 'next';
import { createClient } from '@/utils/supabase/server';

// Sitenizin tam URL'sini buraya ekleyin
const BASE_URL = 'https://companyverse.co'; 

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createClient();

  // Veritabanından tüm şirketlerin slug'larını çekiyoruz
  const { data: companies, error } = await supabase
    .from('companies')
    .select('slug, updated_at'); // updated_at, Google'a sayfanın ne zaman güncellendiğini söyler

  if (error) {
    console.error('Sitemap için şirketler çekilirken hata oluştu:', error);
    // Hata olursa en azından statik sayfaları döndür
    return [
      { url: BASE_URL, lastModified: new Date() },
      { url: `${BASE_URL}/about`, lastModified: new Date() },
      { url: `${BASE_URL}/blog`, lastModified: new Date() },
    ];
  }

  // Her şirket için dinamik URL'ler oluştur
  const companyUrls = companies?.map(({ slug, updated_at }) => ({
    url: `${BASE_URL}/companies/${slug}`,
    lastModified: updated_at ? new Date(updated_at) : new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9, // Bu sayfalar yüksek öncelikli
  })) ?? [];

  // Statik sayfalar
  const staticUrls = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ];
  
  // Statik ve dinamik URL'leri birleştirerek tam site haritasını döndür
  return [...staticUrls, ...companyUrls];
}