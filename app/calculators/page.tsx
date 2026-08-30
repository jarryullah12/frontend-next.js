import Link from 'next/link';
import { ArrowRight, Calculator, Search } from 'lucide-react';
import { calculators } from '@/lib/calculators';
import type { Metadata } from 'next';

export function generateMetadata({
  searchParams,
}: {
  searchParams?: Promise<{ search?: string | string[] }>;
}): Promise<Metadata> {
  return (async () => {
    const resolved = await searchParams;
    const search = Array.isArray(resolved?.search) ? resolved?.search[0] : resolved?.search;
  const q = (search || '').trim();

    return {
      title: q ? `Calculators Search: ${q}` : 'Calculators',
      description:
        'Browse financial calculators for loans, mortgages, investing, savings, retirement, and more. Fast results with simple inputs.',
      alternates: {
        canonical: '/calculators',
      },
      robots: q
        ? {
            index: false,
            follow: true,
            googleBot: {
              index: false,
              follow: true,
              'max-image-preview': 'large',
              'max-snippet': -1,
              'max-video-preview': -1,
            },
          }
        : undefined,
    };
  })();
}

export default async function CalculatorsPage({
  searchParams,
}: {
  searchParams?: Promise<{ search?: string | string[] }>;
}) {
  const resolved = await searchParams;
  const search = Array.isArray(resolved?.search) ? resolved?.search[0] : resolved?.search;
  const q = (search || '').trim();

  const list = q
    ? calculators.filter((c) => {
        const haystack = `${c.name} ${c.category} ${c.description}`.toLowerCase();
        return haystack.includes(q.toLowerCase());
      })
    : calculators;

  const categories = Array.from(new Set(list.map((c) => c.category)));

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-slate-900 text-white pt-20 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-yellow-500 text-sm font-medium mb-6">
            <Calculator className="w-4 h-4" />
            100+ Professional Tools
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Financial & Utility <span className="text-yellow-500">Calculators</span>
          </h1>
          <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            A complete suite of 100+ professional-grade tools designed to help you make smarter decisions. Browse our categories below.
          </p>

          {/* Search Bar */}
          <form action="/calculators" method="GET" className="max-w-xl mx-auto">
            <div className="relative flex items-center">
              <Search className="absolute left-4 w-5 h-5 text-slate-400 pointer-events-none" />
              <input
                type="search"
                name="search"
                defaultValue={q}
                placeholder="Search calculators (e.g. mortgage, EMI, SIP...)"
                className="w-full pl-12 pr-28 py-3.5 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-shadow"
                aria-label="Search calculators"
              />
              <button
                type="submit"
                className="absolute right-2 px-5 py-2 rounded-lg bg-yellow-500 text-slate-900 font-semibold text-sm hover:bg-yellow-400 transition-colors"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </section>

      {q && (
        <section className="py-6 bg-white border-b border-slate-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl flex flex-wrap items-center justify-between gap-3">
            <div className="text-slate-700 text-sm">
              Showing results for <span className="font-semibold text-slate-900">&ldquo;{q}&rdquo;</span> ({list.length})
            </div>
            <Link
              href="/calculators"
              className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
            >
              Clear search
            </Link>
          </div>
        </section>
      )}

      {categories.map((cat) => (
        <section key={cat} className="py-12 border-b border-slate-200 odd:bg-white even:bg-slate-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-slate-900 p-2 rounded-lg text-white">
                 <Calculator className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">{cat}</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {list.filter((c) => c.category === cat).map((calc) => (
                <Link
                  key={calc.id}
                  href={`/calculators/${calc.id}`}
                  prefetch={false}
                  className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{calc.name}</h3>
                    <p className="text-slate-600 text-sm mb-4 flex-grow line-clamp-2">{calc.description}</p>
                    <div className="text-blue-600 font-medium flex items-center text-sm mt-auto">
                      Open {calc.name} <ArrowRight className="ml-1 w-4 h-4" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ))}

      {q && list.length === 0 && (
        <section className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl text-slate-700">
            No calculators found for <span className="font-semibold text-slate-900">{q}</span>.
          </div>
        </section>
      )}
    </div>
  );
}