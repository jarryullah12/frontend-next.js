import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calculator as CalculatorIcon } from 'lucide-react';
import { calculators } from '@/lib/calculators';

import CalculatorGuide from '@/components/CalculatorGuide';
import CalculatorInteractive from './CalculatorInteractive';

export const dynamicParams = false;

export function generateStaticParams() {
  return calculators.map((c) => ({ id: c.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const calc = calculators.find((c) => c.id === id);
  if (!calc) return {};

  const title = `${calc.name} Calculator – Free Online Tool | FinovaCalc`;
  const description = `${calc.description}. Use our free ${calc.name.toLowerCase()} calculator with clear explanations, examples, and step-by-step guidance. No sign-up required.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/calculators/${calc.id}`,
    },
    openGraph: {
      title,
      description,
      url: `/calculators/${calc.id}`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    keywords: [
      calc.name,
      `${calc.name} calculator`,
      `free ${calc.name.toLowerCase()} calculator`,
      calc.category,
      'online financial calculator',
      'FinovaCalc',
    ],
  };
}

export default async function CalculatorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const calc = calculators.find((c) => c.id === id);

  if (!calc) notFound();

  const related = calculators
    .filter((c) => c.category === calc.category && c.id !== calc.id)
    .slice(0, 6);

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <Link href="/calculators" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-blue-600 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Calculators
        </Link>
        
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-slate-900 p-8 text-white">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-yellow-500 text-xs font-bold uppercase tracking-wider mb-4">
              {calc.category}
            </div>
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
              <CalculatorIcon className="w-8 h-8 text-yellow-500" />
              {calc.name}
            </h1>
            <p className="text-slate-300">{calc.description}</p>
          </div>
          <CalculatorInteractive id={calc.id} />
        </div>

        <CalculatorGuide calc={calc} />

        {related.length > 0 && (
          <section className="mt-16 border-t border-slate-200 pt-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Related Calculators</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {related.map((r) => (
                <Link
                  key={r.id}
                  href={`/calculators/${r.id}`}
                  className="block bg-white border border-slate-200 rounded-xl p-5 hover:shadow-md hover:border-slate-300 transition-all"
                >
                  <div className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
                    {r.category}
                  </div>
                  <div className="text-base font-semibold text-slate-900 mb-1">{r.name}</div>
                  <p className="text-sm text-slate-600 line-clamp-2">{r.description}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}