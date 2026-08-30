import { ArrowLeft, Tag, User, Calendar, Clock } from 'lucide-react';
import Link from 'next/link';
import { getSupabaseClient } from '@/lib/supabase';
import { notFound } from 'next/navigation';

export const revalidate = 0;

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const { client: supabase, error: configError } = getSupabaseClient();

  if (configError) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="max-w-xl w-full text-center py-10 text-red-500 bg-red-50 rounded-xl border border-red-200 px-4">
          <p className="font-bold text-lg mb-2">Error loading post.</p>
          <p className="mb-2">Message: {configError}</p>
        </div>
      </div>
    );
  }

  let post: any | null = null;
  let fetchError: any = null;
  let relatedPosts: any[] = [];

  try {
    const result = await supabase.from('posts').select('*').eq('slug', slug).single();
    post = result.data;
    fetchError = result.error;
  } catch (err: any) {
    fetchError = { message: err?.message || 'Network error while fetching the post.' };
  }

  if (fetchError || !post) return notFound();

  if (post.category) {
    try {
      const relatedResult = await supabase
        .from('posts')
        .select('id, slug, title, category, created_at, image_url, author')
        .ilike('category', post.category)
        .neq('slug', slug)
        .order('created_at', { ascending: false })
        .limit(3);

      if (!relatedResult.error && relatedResult.data) {
        relatedPosts = relatedResult.data;
      }
    } catch {
      relatedPosts = [];
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Hero Section */}
      <section className="bg-slate-900 text-white pt-16 pb-16 border-b border-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="flex items-center gap-4 mb-6 text-sm">
            <Link href="/blog" className="flex items-center text-slate-300 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>
            <span className="flex items-center px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-500 border border-yellow-500/20">
              <Tag className="w-3 h-3 mr-1.5" />
              {post.category || 'General'}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-slate-300 text-sm">
            <div className="flex items-center">
              <User className="w-4 h-4 mr-2" />
              {post.author || 'Admin User'}
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              {new Date(post.created_at).toLocaleDateString()}
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              {Math.max(1, Math.ceil((post.content?.length || 0) / 1000))} min read
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 flex-grow">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Left Column - Article */}
            <div className="lg:w-2/3">
              {post.image_url && (
                <div className="rounded-2xl overflow-hidden mb-8 shadow-sm bg-slate-100">
                  <img
                    src={post.image_url}
                    alt={post.title}
                    className="w-full h-auto object-contain"
                  />
                </div>
              )}
              
              <article 
                className="prose prose-slate max-w-none prose-lg"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>
            
            {/* Right Column - Sidebar */}
            <div className="lg:w-1/3 space-y-8">
              {/* About the Author */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <h3 className="text-lg font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">About the Author</h3>
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-full bg-slate-200 flex-shrink-0 overflow-hidden relative">
                     <User className="w-8 h-8 text-slate-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg mb-2">{post.author || 'Admin User'}</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {post.author_bio || 'A dedicated contributor sharing insights on personal finance.'}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Related Articles */}
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-6">Related Articles</h3>
                {relatedPosts.length > 0 ? (
                  <div className="space-y-4">
                    {relatedPosts.map((relatedPost) => (
                      <Link
                        key={relatedPost.id}
                        href={`/blog/${relatedPost.slug}`}
                        className="block bg-white rounded-xl border border-slate-100 hover:border-slate-200 hover:shadow-sm transition-all p-4"
                      >
                        <div className="flex gap-4">
                          <div className="w-16 h-16 rounded-lg bg-slate-100 overflow-hidden flex-shrink-0">
                            {relatedPost.image_url ? (
                              <img
                                src={relatedPost.image_url}
                                alt={relatedPost.title}
                                className="object-cover w-full h-full"
                              />
                            ) : null}
                          </div>
                          <div className="min-w-0">
                            <p className="text-slate-900 font-semibold leading-snug line-clamp-2">
                              {relatedPost.title}
                            </p>
                            <p className="text-slate-500 text-sm mt-1">
                              {new Date(relatedPost.created_at).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-500 text-sm">No related articles found.</p>
                )}
              </div>
            </div>
            
          </div>
        </div>
      </section>
    </div>
  );
}