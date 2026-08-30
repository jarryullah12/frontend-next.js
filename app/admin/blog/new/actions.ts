'use server';

import { createClient } from '@supabase/supabase-js';

export async function createBlogPost(formData: any) {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey || supabaseUrl.includes('placeholder')) {
    return {
      error:
        'Supabase credentials are not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (recommended) or NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY, then restart the app.',
    };
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    const { data, error } = await supabase
      .from('posts')
      .insert([
        {
          title: formData.title,
          slug: formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
          category: formData.category,
          author_bio: formData.author_bio,
          image_url: formData.image_url,
          content: formData.content,
          author: formData.author || 'Admin User'
        }
      ])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      const message = String(error.message || '');
      if (message.toLowerCase().includes('row-level security')) {
        return {
          error:
            'Row Level Security (RLS) is blocking INSERT on posts. Fix by either (1) set SUPABASE_SERVICE_ROLE_KEY on the server, or (2) add an INSERT policy for the role you are using (anon/authenticated) on the posts table.',
        };
      }
      return { error: message || 'Supabase error' };
    }
    
    return { success: true, data };
  } catch (err: any) {
    console.error('Action error:', err);
    return { error: err.message || 'An unexpected error occurred' };
  }
}
