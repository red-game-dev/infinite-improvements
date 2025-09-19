import { MetadataRoute } from 'next';
import { env } from '@/config/env.config';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = env.site.url;

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ];
}