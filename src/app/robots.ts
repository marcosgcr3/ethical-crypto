import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ethical-crypto.com';

  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/api/images'],
      disallow: ['/ec-protocol-portal', '/api'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
