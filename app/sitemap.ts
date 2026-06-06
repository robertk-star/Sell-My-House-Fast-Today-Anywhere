import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://sellmyhousetodayanywhere.com';
  return ['', '/how-it-works', '/sell-your-house-fast', '/we-buy-houses-as-is', '/locations', '/faq', '/contact', '/privacy-policy', '/terms'].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: path === '' ? 1 : 0.7
  }));
}
