import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://finova-calc.com').replace(/\/+$/, '');

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/admin/', '/calculators?search='],
      },
    ],
    sitemap: [
      `${siteUrl}/sitemap.xml`,
      `${siteUrl}/sitemap-pages.xml`,
      `${siteUrl}/sitemap-calculators.xml`,
      `${siteUrl}/sitemap-blog.xml`,
    ],
  };
}
