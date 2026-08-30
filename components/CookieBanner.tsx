'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Basic check, in a real app you'd check localStorage or cookies
    const consent = localStorage.getItem('cookie-consent');
    setTimeout(() => setIsVisible(!consent), 0);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-900 text-slate-300 py-4 px-4 sm:px-6 lg:px-8 border-t border-slate-700 z-50 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center text-sm">
        <span className="mr-2 text-xl">🍪</span>
        <p>
          We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.{' '}
          <Link href="/privacy" className="text-white underline hover:text-yellow-500 transition-colors">
            Learn more
          </Link>
        </p>
      </div>
      <button
        onClick={() => {
          localStorage.setItem('cookie-consent', 'true');
          setIsVisible(false);
        }}
        className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap"
      >
        Accept
      </button>
    </div>
  );
}
