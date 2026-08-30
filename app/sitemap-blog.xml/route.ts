import { getSupabaseClient } from '@/lib/supabase';

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://finova-calc.com').replace(/\/+$/, '');

function xmlEscape(v: string) {
  return v.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}

function formatDate(d: Date) {
  return d.toISOString();
}

export async function GET() {
  const now = new Date();
  const urls: { loc: string; lastmod: Date; changefreq: string; priority: string }[] = [];

  const { client: supabase, error: configError } = getSupabaseClient();

  if (!configError) {
    try {
      const result = await supabase
        .from('posts')
        .select('slug, created_at')
        .not('slug', 'is', null)
        .neq('slug', '')
        .order('created_at', { ascending: false })
        .limit(5000);

      if (result.error) {
        console.error('sitemap-blog.xml Supabase error:', result.error);
        if (process.env.NODE_ENV !== 'production') {
          return new Response('Supabase error', { status: 500 });
        }
      }

      if (!result.error && result.data) {
        for (const row of result.data as any[]) {
          const slug = row?.slug;
          if (!slug) continue;
          const lastModified = row?.created_at ? new Date(row.created_at) : now;
          urls.push({
            loc: `${siteUrl}/blog/${encodeURIComponent(slug)}`,
            lastmod: lastModified,
            changefreq: 'weekly',
            priority: '0.6',
          });
        }
      }
    } catch (err) {
      console.error('sitemap-blog.xml error:', err);
      if (process.env.NODE_ENV !== 'production') {
        return new Response('Sitemap error', { status: 500 });
      }
    }
  }

  const body = `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls
      .map(
        (u) =>
          `  <url>` +
          `<loc>${xmlEscape(u.loc)}</loc>` +
          `<lastmod>${formatDate(u.lastmod)}</lastmod>` +
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
