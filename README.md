# FinovaCalc Blog - Supabase Setup

To use the blog functionality, you need to set up a Supabase project and provide the connection details.

1. Create a Supabase project at [supabase.com](https://supabase.com/).
2. In your Supabase SQL editor, run the following command to create the `posts` table:

```sql
CREATE TABLE posts (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT now(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  category text,
  author_bio text,
  image_url text,
  content text NOT NULL,
  author text
);

-- Note: Ensure Row Level Security (RLS) is appropriately configured if you intend to secure the upload form.
-- For a basic setup, you can disable RLS or add policies to allow reads and inserts.
```

3. Go to your Applet Settings -> Environment Variables and add the following keys:
- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase Project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase Project Anon/Public Key

Once these are configured, you can add new articles from the `/admin/blog/new` panel and they will appear on the `/blog` page.
