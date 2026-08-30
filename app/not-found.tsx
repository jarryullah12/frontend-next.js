import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-slate-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-slate-700 mb-6">Page Not Found</h2>
        <p className="text-slate-500 mb-8 max-w-md mx-auto">
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>
        <Link 
          href="/"
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
}
