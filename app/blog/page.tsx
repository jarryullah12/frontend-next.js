import { Search, Tag } from 'lucide-react';
import Link from 'next/link';
import { getSupabaseClient } from '@/lib/supabase';
import type { Metadata } from 'next';

// Revalidate every 60 seconds (or 0 to always fetch fresh, useful for admin)
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Personal finance guides and tutorials on investing, loans, mortgages, saving, and retirement planning.',
};

type BlogSearchParams = { q?: string; page?: string; cat?: string };

function buildBlogUrl({ q, page, cat }: { q?: string; page?: number; cat?: string }) {
  const params = new URLSearchParams();
  if (q) params.set('q', q);
  if (cat) params.set('cat', cat);
  if (page && page > 1) params.set('page', String(page));
  const qs = params.toString();
  return qs ? `/blog?${qs}` : '/blog';
}

export default async function BlogPage({ searchParams }: { searchParams: Promise<BlogSearchParams> }) {
  const sp = await searchParams;
  const q = (sp.q || '').replace(/,/g, ' ').trim().slice(0, 100);
  const cat = (sp.cat || '').trim().slice(0, 60);
  const page = Math.max(1, Number.parseInt(sp.page || '1', 10) || 1);
  const pageSize = 8;
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { client: supabase, error: configError } = getSupabaseClient();

  let posts: any[] | null = null;
  let error: { message: string } | null = null;
  let totalCount = 0;
  let totalPages = 1;

  if (configError) {
    error = { message: configError };
  } else {
    try {
      let query = supabase
        .from('posts')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false });

      if (cat) {
        query = query.ilike('category', cat);
      }

      if (q) {
        const qPattern = `%${q}%`;
        query = query.or(
          `title.ilike.${qPattern},content.ilike.${qPattern},category.ilike.${qPattern},author.ilike.${qPattern}`,
        );
      }

      const result = await query.range(from, to);

      posts = result.data;
      totalCount = result.count || 0;
      totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
      if (result.error) error = { message: result.error.message };
    } catch (err: any) {
      error = { message: err?.message || 'Network error while fetching posts.' };
    }
  }

  const effectivePage = Math.min(page, totalPages);
  const hasResults = !error && posts && posts.length > 0;
  const hasFilters = Boolean(q || cat);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <section className="bg-slate-900 text-white pt-24 pb-24 border-b border-slate-800 text-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            FinovaCalc <span className="text-yellow-500">Blog</span>
          </h1>
          <p className="text-xl text-slate-300">
            Expert articles on personal finance, investing, loans, mortgages, and retirement planning.
          </p>
        </div>
      </section>

      <section className="py-16 flex-grow">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          
          <div className="mb-16">
            <form method="get" className="relative max-w-2xl mx-auto mb-8">
              {cat ? <input type="hidden" name="cat" value={cat} /> : null}
              <input
                type="text"
                name="q"
                defaultValue={q}
                placeholder="Search for articles..."
                className="w-full pl-6 pr-12 py-4 rounded-full border border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-sm text-slate-800"
              />
              <button
                type="submit"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-500"
              >
                <Search className="w-5 h-5" />
              </button>
            </form>
            
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href={buildBlogUrl({ q, cat: undefined, page: 1 })}
                className={`px-5 py-2 rounded-full font-medium text-sm transition-colors ${
                  !cat ? 'bg-slate-900 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                All
              </Link>
              {['Banking & Savings', 'Business Finance', 'Credit Card & Debt', 'Investment & Trading', 'Loans & Mortgages', 'Personal Finance', 'Real Estate', 'Retirement', 'Tax & Salary'].map((catItem) => (
                <Link
                  key={catItem}
                  href={buildBlogUrl({ q, cat: catItem, page: 1 })}
                  className={`px-5 py-2 rounded-full font-medium text-sm transition-colors flex items-center ${
                    catItem === cat
                      ? 'bg-slate-900 text-white'
                      : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <Tag className="w-4 h-4 mr-2 text-slate-400" />
                  {catItem}
                </Link>
              ))}
            </div>
          </div>

          {error && (
             <div className="text-center py-10 text-red-500 bg-red-50 rounded-xl border border-red-200 px-4">
               <p className="font-bold text-lg mb-2">Error loading posts.</p>
               <p className="mb-2">Message: {error.message}</p>
               <p className="text-sm">
                 Have you configured Supabase in the Applet Settings / Environment Variables?
                 <br />
                 If you see permission/RLS errors, add a SELECT policy on the <code>posts</code> table (or disable RLS).
                 <br />
                 If you see <code>fetch failed</code>, double-check the Supabase URL/key and your network access, then restart the app.
               </p>
             </div>
          )}

          {hasResults ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {posts!.map((post: any) => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-lg transition-shadow group flex flex-col">
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100">
                    {post.image_url ? (
                      <img 
                        src={post.image_url} 
                        alt={post.title} 
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full text-slate-400">
                         No Image
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 text-xs font-medium">
                        <Tag className="w-3 h-3 mr-1" />
                        {post.category || 'General'}
                      </span>
                      <span className="text-slate-400 text-sm">
                        {new Date(post.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-slate-600 mb-6 line-clamp-3 text-sm leading-relaxed flex-grow">
                      {(post.content || '').replace(/<[^>]*>?/gm, '').substring(0, 150)}...
                    </p>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                      <div className="flex items-center text-sm font-medium text-slate-900">
                        <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center mr-2 overflow-hidden">
                          <span className="text-[10px] text-slate-500">{post.author?.charAt(0) || 'A'}</span>
                        </div>
                        {post.author || 'Admin User'}
                      </div>
                      <span className="text-blue-600 text-sm font-medium flex items-center group-hover:translate-x-1 transition-transform">
                        Read More →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 border-dashed mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">No Articles Found</h2>
              <p className="text-slate-500 mb-8">
                {hasFilters ? 'Your search/filters did not return any results.' : 'No posts have been published yet.'}
              </p>
              <Link href="/admin/blog/new" className="inline-flex items-center justify-center bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-md font-medium transition-colors">
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Publish an Article
              </Link>
            </div>
          )}

          {!error && totalPages > 1 ? (
            <div className="flex items-center justify-center gap-2">
              {effectivePage > 1 ? (
                <Link
                  href={buildBlogUrl({ q, cat, page: effectivePage - 1 })}
                  className="px-4 py-2 rounded-md border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                >
                  Prev
                </Link>
              ) : (
                <span className="px-4 py-2 rounded-md border border-slate-200 bg-white text-slate-400">Prev</span>
              )}

              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((p) => p === 1 || p === totalPages || Math.abs(p - effectivePage) <= 2)
                .map((p, idx, arr) => {
                  const prev = arr[idx - 1];
                  const showDots = prev && p - prev > 1;
                  return (
                    <span key={p} className="flex items-center gap-2">
                      {showDots ? <span className="px-2 text-slate-400">…</span> : null}
                      <Link
                        href={buildBlogUrl({ q, cat, page: p })}
                        className={`px-4 py-2 rounded-md border ${
                          p === effectivePage
                            ? 'border-slate-900 bg-slate-900 text-white'
                            : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {p}
                      </Link>
                    </span>
                  );
                })}

              {effectivePage < totalPages ? (
                <Link
                  href={buildBlogUrl({ q, cat, page: effectivePage + 1 })}
                  className="px-4 py-2 rounded-md border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                >
                  Next
                </Link>
              ) : (
                <span className="px-4 py-2 rounded-md border border-slate-200 bg-white text-slate-400">Next</span>
              )}
            </div>
          ) : null}

        </div>
      </section>
    </div>
  );
}