const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://finova-calc.com').replace(/\/+$/, '');

function xmlEscape(v: string) {
  return v.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}

function formatDate(d: Date) {
  return d.toISOString();
}

export async function GET() {
  const now = new Date();

  const urls = [
    { loc: `${siteUrl}/`, changefreq: 'weekly', priority: '1.0' },
    { loc: `${siteUrl}/calculators`, changefreq: 'weekly', priority: '0.9' },
    { loc: `${siteUrl}/blog`, changefreq: 'daily', priority: '0.7' },
    { loc: `${siteUrl}/about`, changefreq: 'monthly', priority: '0.7' },
    { loc: `${siteUrl}/contact`, changefreq: 'yearly', priority: '0.4' },
    { loc: `${siteUrl}/privacy`, changefreq: 'yearly', priority: '0.3' },
    { loc: `${siteUrl}/terms`, changefreq: 'yearly', priority: '0.3' },
    { loc: `${siteUrl}/disclaimer`, changefreq: 'yearly', priority: '0.3' },
    { loc: `${siteUrl}/docs`, changefreq: 'monthly', priority: '0.4' },
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls
      .map(
        (u) =>
          `  <url>` +
          `<loc>${xmlEscape(u.loc)}</loc>` +
          `<lastmod>${formatDate(now)}</lastmod>` +
          `<changefreq>${u.changefreq}</changefreq>` +
          `<priority>${u.priority}</priority>` +
          `</url>`
      )
      .join('\n') +
    `\n</urlset>\n`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
