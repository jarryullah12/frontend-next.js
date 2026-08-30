const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://finova-calc.com').replace(/\/+$/, '');

function xmlEscape(v: string) {
  return v.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}

export async function GET() {
  const sitemaps = [
    `${siteUrl}/sitemap-pages.xml`,
    `${siteUrl}/sitemap-calculators.xml`,
    `${siteUrl}/sitemap-blog.xml`,
  ];

  const now = new Date().toISOString();

  const body = `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    sitemaps
      .map((loc) => `  <sitemap><loc>${xmlEscape(loc)}</loc><lastmod>${now}</lastmod></sitemap>`)
      .join('\n') +
    `\n</sitemapindex>\n`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
