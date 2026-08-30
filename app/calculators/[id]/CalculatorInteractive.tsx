'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { calculators } from '@/lib/calculators';

const CalculatorChart = dynamic(
  () => import('@/components/CalculatorChart').then((m) => m.CalculatorChart),
  {
    ssr: false,
    loading: () => (
      <div className="h-64 w-full flex items-center justify-center text-slate-500 text-sm">Loading chart...</div>
    ),
  },
);

export default function CalculatorInteractive({ id }: { id: string }) {
  const calc = calculators.find((c) => c.id === id);

  const [values, setValues] = useState<Record<string, string | number>>(() => {
    const init: Record<string, string | number> = {};
    calc?.inputs.forEach((input) => {
      init[input.id] = input.defaultValue !== undefined ? input.defaultValue : '';
    });
    return init;
  });

  if (!calc) return null;

  const results = calc.calculate(values);

  const handleInputChange = (inputId: string, value: string) => {
    setValues((prev) => ({ ...prev, [inputId]: value }));
  };

  const formatResultValue = (label: string, value: string) => {
    const raw = String(value ?? '').trim();
    if (!raw) return raw;
    if (raw.includes('$')) return raw;
    if (raw.includes('%')) return raw;
    if (/[a-zA-Z]/.test(raw)) return raw;

    const currencyLabels =
      /(income|salary|fund|worth|saving|savings|value|amount|payment|cost|price|profit|interest|principal|tax|gains|invested|balance|rent|mortgage|closing|emi|expenses|expense|loan|deposit|down payment|stamp duty|vat|gst)/i;
    const nonCurrencyLabels = /(year|years|month|months|day|days|%|rate|ratio|stocks|bonds)/i;

    const isCurrency = currencyLabels.test(label) || (!nonCurrencyLabels.test(label) && raw.includes('.'));
    if (!isCurrency) return raw;

    const n = Number(raw.replace(/,/g, ''));
    if (!Number.isFinite(n)) return raw;

    const formatted = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(Math.abs(n));

    return `${n < 0 ? '-' : ''}$${formatted}`;
  };

  return (
    <div className="p-8">
      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">Inputs</h3>
          {calc.inputs.map((input) => (
            <div key={input.id}>
              <label htmlFor={input.id} className="block text-sm font-medium text-slate-700 mb-1">
                {input.label}
              </label>
              <input
                id={input.id}
                type={input.type === 'number' ? 'number' : 'text'}
                value={values[input.id]}
                onChange={(e) => handleInputChange(input.id, e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                placeholder={`Enter ${input.label.toLowerCase()}`}
              />
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <div className="border-b border-slate-100 pb-2">
            <h3 className="text-lg font-bold text-slate-900">Results</h3>
          </div>

          <div className="space-y-4">
            {results.items && results.items.length > 0 ? (
              <>
                {results.items.map((res, i) => (
                  <div
                    key={i}
                    className={`p-4 rounded-xl border ${res.highlight ? 'bg-blue-50 border-blue-200' : 'bg-slate-50 border-slate-200'}`}
                  >
                    <div className={`text-sm mb-1 ${res.highlight ? 'text-blue-700 font-medium' : 'text-slate-500'}`}>
                      {res.label}
                    </div>
                    <div className={`text-2xl font-bold ${res.highlight ? 'text-blue-900' : 'text-slate-900'}`}>
                      {formatResultValue(res.label, res.value)}
                    </div>
                  </div>
                ))}

                {results.chart && (
                  <div className="mt-8 p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
                    <h4 className="text-sm font-semibold text-slate-700 mb-4 text-center">Visualization</h4>
                    <CalculatorChart chart={results.chart} />
                  </div>
                )}
              </>
            ) : (
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-slate-500 text-center text-sm">
                Enter values to see results
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

