import { calculators } from '@/lib/calculators';

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://finova-calc.com').replace(/\/+$/, '');

function xmlEscape(v: string) {
  return v.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}

function formatDate(d: Date) {
  return d.toISOString();
}

export async function GET() {
  const now = new Date();

  const urls = calculators.map((c) => ({
    loc: `${siteUrl}/calculators/${encodeURIComponent(c.id)}`,
    changefreq: 'monthly',
    priority: '0.8',
  }));

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
