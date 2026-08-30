'use client';

import React, { useState, useMemo } from 'react';
import { Upload, Type, FileText, Tag, User, Link as LinkIcon, Lightbulb, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { createBlogPost } from './actions';
import dynamic from 'next/dynamic';

// Import Jodit CSS
import 'jodit/es2021/jodit.min.css';

const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

export default function UploadBlogPostPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'Banking & Savings',
    author_bio: '',
    image_url: '',
    content: ''
  });

  const config = useMemo(() => ({
    readonly: false,
    placeholder: 'Start typing...',
    minHeight: 400,
    buttons: [
      'bold', 'italic', 'underline', 'strikethrough', '|',
      'font', 'fontsize', 'brush', 'paragraph', '|',
      'ul', 'ol', '|',
      'align', 'image', 'link', '|',
      'undo', 'redo', '|',
      'fullsize', 'dots'
    ],
    uploader: {
      insertImageAsBase64URI: true
    },
    controls: {
      paragraph: {
        list: {
          p: 'Paragraph',
          h1: 'Heading 1',
          h2: 'Heading 2',
          h3: 'Heading 3',
          h4: 'Heading 4',
          h5: 'Heading 5',
          h6: 'Heading 6',
          pre: 'Code'
        }
      }
    }
  }), []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'title' && !prev.slug ? { slug: value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') } : {})
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.content) {
      alert("Title and content are required.");
      return;
    }

    setLoading(true);
    try {
      const result = await createBlogPost(formData);

      if (result.error) {
        alert("Error publishing post: " + result.error);
      } else {
        alert("Blog post published successfully!");
        router.push('/blog');
        router.refresh();
      }
    } catch (error: any) {
      console.error(error);
      alert("Error publishing post: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <section className="bg-slate-900 text-white pt-20 pb-32 border-b border-slate-800 text-center">
        <div className="container mx-auto px-4">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 mb-6 text-sm font-medium">
            <Upload className="w-4 h-4 mr-2" />
            Admin Panel
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Upload Blog Post
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Create and publish new financial articles for the FinovaCalc blog.
          </p>
        </div>
      </section>

      <section className="pb-24 -mt-16 flex-grow">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <form className="space-y-8" onSubmit={handleSubmit}>
              
              <div>
                <label className="flex items-center text-sm font-medium text-slate-700 mb-2">
                  <Type className="w-4 h-4 mr-2 text-slate-500" />
                  Blog Title
                </label>
                <input 
                  type="text" 
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter your blog title"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                />
              </div>

              <div>
                <label className="flex items-center text-sm font-medium text-slate-700 mb-2">
                  <FileText className="w-4 h-4 mr-2 text-slate-500" />
                  Slug
                </label>
                <input 
                  type="text" 
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  placeholder="a-url-friendly-slug"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                />
                <p className="mt-2 text-xs text-slate-500 flex items-center">
                  <Lightbulb className="w-3 h-3 mr-1 text-yellow-500" />
                  Tip: The slug is auto-generated from the title, but you can edit it for a custom URL.
                </p>
              </div>

              <div>
                <label className="flex items-center text-sm font-medium text-slate-700 mb-2">
                  <Tag className="w-4 h-4 mr-2 text-slate-500" />
                  Category
                </label>
                <select name="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors bg-white appearance-none">
                  <option>Banking & Savings</option>
                  <option>Business Finance</option>
                  <option>Credit Card & Debt</option>
                  <option>Investment & Trading</option>
                  <option>Loans & Mortgages</option>
                  <option>Personal Finance</option>
                  <option>Real Estate</option>
                  <option>Retirement</option>
                  <option>Tax & Salary</option>
                </select>
              </div>

              <div>
                <label className="flex items-center text-sm font-medium text-slate-700 mb-2">
                  <User className="w-4 h-4 mr-2 text-slate-500" />
                  Author Bio
                </label>
                <textarea 
                  rows={4}
                  name="author_bio"
                  value={formData.author_bio}
                  onChange={handleChange}
                  placeholder="Tell us a little about the author"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors resize-none"
                />
              </div>

              <div>
                <label className="flex items-center text-sm font-medium text-slate-700 mb-2">
                  <LinkIcon className="w-4 h-4 mr-2 text-slate-500" />
                  Featured Image URL
                </label>
                <input 
                  type="url" 
                  name="image_url"
                  value={formData.image_url}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                />
              </div>

              <div>
                <label className="flex items-center text-sm font-medium text-slate-700 mb-2">
                  <FileText className="w-4 h-4 mr-2 text-slate-500" />
                  Full Content
                </label>
                <div className="rounded-xl overflow-hidden bg-white border border-slate-200 min-h-[400px]">
                  <JoditEditor
                    value={formData.content}
                    config={config}
                    onChange={newContent => setFormData(prev => ({ ...prev, content: newContent }))}
                  />
                </div>
              </div>

              <div className="pt-4">
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full flex items-center justify-center py-4 px-6 rounded-xl bg-[#0f2842] text-white font-medium hover:bg-[#1a385a] transition-colors shadow-sm disabled:opacity-50"
                >
                  <CheckCircle className="w-5 h-5 mr-2" />
                  {loading ? 'Publishing...' : 'Publish Blog Post'}
                </button>
              </div>
              
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
