import type { Metadata } from 'next';
import { HomePageClient, type HomeLatestPost } from '@/components/HomePageClient';
import { getSupabaseClient } from '@/lib/supabase';

export const revalidate = 60;

export const metadata: Metadata = {
  description:
    'Free financial calculators for loans, mortgages, investing, savings, and retirement. Get instant results with simple, clear breakdowns.',
  alternates: {
    canonical: '/',
  },
};

export default async function HomePage() {
  const { client: supabase, error: configError } = getSupabaseClient();
  let latestPosts: HomeLatestPost[] = [];

  if (!configError && supabase) {
    try {
      const result = await supabase
        .from('posts')
        .select('id,slug,title,content,category,author,image_url,created_at')
        .order('created_at', { ascending: false })
        .limit(3);

      if (!result.error && result.data) latestPosts = result.data as HomeLatestPost[];
    } catch {
      latestPosts = [];
    }
  }

  return <HomePageClient latestPosts={latestPosts} />;
}
