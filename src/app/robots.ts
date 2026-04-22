import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ethicalcrypto.com';

  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/api/images'],
      disallow: ['/eb-clinical-portal', '/api'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
