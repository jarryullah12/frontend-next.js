﻿'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Calculator, Menu, X } from 'lucide-react';

export function Header() {
  const [open, setOpen] = useState(false);

  const links = [
    { href: '/', label: 'Home' },
    { href: '/calculators', label: 'Calculators' },
    { href: '/blog', label: 'Blog' },
    { href: '/docs', label: 'Docs' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className="bg-slate-900 text-white sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-yellow-500 p-1.5 rounded-md">
                <Calculator className="h-6 w-6 text-slate-900" />
              </div>
              <span className="text-xl font-bold tracking-tight">FinovaCalc</span>
            </Link>
          </div>
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-md border border-slate-700 text-slate-200 hover:text-white hover:border-slate-600 transition-colors"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <nav className="hidden md:block">
            <ul className="flex items-center space-x-8">
              {links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {open ? (
          <nav className="md:hidden pb-4">
            <ul className="flex flex-col gap-1 border-t border-slate-800 pt-3">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="block px-2 py-2 rounded-md text-sm font-medium text-slate-200 hover:bg-slate-800 hover:text-white transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
      </div>
    </header>
  );
}
