import type { Calculator } from '@/lib/calculators';
import CalculatorArticle from '@/components/CalculatorArticle';
import { getCalculatorGuide } from '@/lib/calculatorGuides';
import { calculatorDetailedContent } from '@/lib/calculatorDetailedContent';
import CalculatorFormulaSection from '@/components/CalculatorFormulaSection';

/**
 * Renders long-form educational content under every calculator.
 * Prefers dedicated guide / detailed content when available;
 * otherwise falls back to the comprehensive CalculatorArticle
 * that produces ~1600–2000 words of AdSense-friendly material for any calculator.
 */
export default function CalculatorGuide({ calc }: { calc: Calculator }) {
  const guide = getCalculatorGuide(calc.id);
  const detailed = calculatorDetailedContent[calc.id];

  // If we have neither a structured guide nor detailed content, use the rich article generator
  if (!guide && !detailed) {
    return <CalculatorArticle calc={calc} />;
  }

  // Prefer guide when present; otherwise synthesize a guide-like structure from detailed content
  const content = guide || {
    intro: detailed!.intro,
    howItWorks: detailed!.howItWorks,
    benefits: detailed!.benefits,
    steps: [
      `Enter the required inputs for the ${calc.name}.`,
      'Review the calculated results and any chart that appears.',
      'Adjust one variable at a time to see sensitivity.',
      'Compare the outcome against your budget or goals.',
      'Save or note the scenario you want to act on.',
    ],
    cases: detailed!.cases,
    factorsTitle: `What influences your ${calc.name} result`,
    factors: detailed!.factors,
    proTips: detailed!.proTips,
    mistakes: detailed!.mistakes,
    faqs: detailed!.faqs,
    conclusion: detailed!.conclusion,
  };

  const comparison = guide?.comparison;

  return (
    <article className="mt-16 prose prose-slate max-w-none border-t border-slate-200 pt-12">
      <h2 className="text-2xl font-bold text-slate-900 mb-4">Introduction</h2>
      {content.intro.map((p, i) => (
        <p key={i} className="text-slate-700 leading-relaxed mb-4">
          {p}
        </p>
      ))}

      <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-10">
        What is {calc.name} and How it Works
      </h2>
      {content.howItWorks.map((p, i) => (
        <p key={i} className="text-slate-700 leading-relaxed mb-4">
          {p}
        </p>
      ))}

      <CalculatorFormulaSection calc={calc} />

      <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-10">
        Benefits of Using This Calculator
      </h2>
      <ul className="list-disc pl-6 space-y-2">
        {content.benefits.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>

      {comparison && (
        <>
          <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-10">{comparison.title}</h2>
          <div className="not-prose md:hidden space-y-3">
            {comparison.rows.map((row, i) => (
              <div key={i} className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="divide-y divide-slate-100">
                  {comparison.headers.map((h, j) => (
                    <div key={j} className="flex items-start justify-between gap-4 py-2">
                      <div className="text-sm font-medium text-slate-600">{h}</div>
                      <div className="text-sm text-slate-900 text-right">{row[j]}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="hidden md:block not-prose overflow-x-auto mb-6">
            <table className="w-full text-left text-sm border border-slate-200 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-slate-100">
                  {comparison.headers.map((h, i) => (
                    <th key={i} className="p-3 font-semibold text-slate-800">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparison.rows.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                    {row.map((cell, j) => (
                      <td key={j} className="p-3 text-slate-700">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {comparison.note.map((p, i) => (
            <p key={i} className="text-slate-700 leading-relaxed mb-4">
              {p}
            </p>
          ))}
        </>
      )}

      <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-10">
        Step-by-Step Guide on How to Use the Calculator
      </h2>
      <ol className="list-decimal pl-6 space-y-2">
        {content.steps.map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ol>

      <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-10">
        Real-Life Examples / Case Studies
      </h2>
      {content.cases.map((cs, i) => (
        <section key={i} className="mt-6">
          <h3 className="text-xl font-semibold text-slate-900 mb-2">{cs.title}</h3>
          {cs.paragraphs.map((p, j) => (
            <p key={j} className="text-slate-700 leading-relaxed mb-4">
              {p}
            </p>
          ))}
        </section>
      ))}

      <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-10">
        {content.factorsTitle}
      </h2>
      <ul className="list-disc pl-6 space-y-2">
        {content.factors.map((f, i) => (
          <li key={i}>{f}</li>
        ))}
      </ul>

      <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-10">Pro Tips</h2>
      <ul className="list-disc pl-6 space-y-2">
        {content.proTips.map((t, i) => (
          <li key={i}>{t}</li>
        ))}
      </ul>

      <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-10">Common Mistakes to Avoid</h2>
      <ul className="list-disc pl-6 space-y-2">
        {content.mistakes.map((m, i) => (
          <li key={i}>{m}</li>
        ))}
      </ul>

      {/* Extra depth for AdSense / user value — always present */}
      <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-10">
        Best Practices When Using Financial Calculators
      </h2>
      <p className="text-slate-700 leading-relaxed mb-4">
        Treat every result as a model based on the inputs you provided, not a guarantee. Markets,
        rates, tax rules, and personal circumstances change. The highest-value habit is to re-run the
        same calculator after any material change and to keep a short written record of the assumptions
        you used.
      </p>
      <p className="text-slate-700 leading-relaxed mb-4">
        When large sums or long commitments are involved, cross-check the output with a second method
        or a qualified professional. Calculators excel at speed and consistency; human judgment is still
        required for risk tolerance, legal constraints, and personal priorities.
      </p>
      <p className="text-slate-700 leading-relaxed mb-4">
        Finally, link the number back to cash flow. A mathematically attractive loan payment or
        investment contribution is only useful if it still leaves room for essentials, emergency savings,
        and the rest of your life.
      </p>

      <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-10">Frequently Asked Questions</h2>
      <div className="space-y-4 not-prose mb-8">
        {content.faqs.map((faq, i) => (
          <div key={i} className="p-4 bg-white rounded-xl border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-1">{faq.q}</h3>
            <p className="text-sm text-slate-600 leading-relaxed">{faq.a}</p>
          </div>
        ))}
        {/* Always-added generic high-value FAQs to push word count and usefulness */}
        <div className="p-4 bg-white rounded-xl border border-slate-200">
          <h3 className="font-bold text-slate-900 mb-1">
            Is the {calc.name} free and private?
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Yes. FinovaCalc tools are free to use without registration. Calculations run in your
            browser so your inputs are not uploaded to our servers for processing.
          </p>
        </div>
        <div className="p-4 bg-white rounded-xl border border-slate-200">
          <h3 className="font-bold text-slate-900 mb-1">
            How often should I revisit this calculation?
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Re-run the {calc.name} whenever a key input changes—new rate quote, income shift, extra
            payment, or revised goal—or at least once per quarter so your plan stays aligned with
            reality.
          </p>
        </div>
        <div className="p-4 bg-white rounded-xl border border-slate-200">
          <h3 className="font-bold text-slate-900 mb-1">
            Can I rely on this for formal financial advice?
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Use the results for education, personal planning, and preliminary comparisons. For lending
            decisions, tax filings, or regulated advice, confirm figures with a qualified professional
            and the latest rules that apply to your situation.
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-10">Conclusion</h2>
      {content.conclusion.map((p, i) => (
        <p key={i} className="text-slate-700 leading-relaxed mb-4">
          {p}
        </p>
      ))}
      <p className="text-slate-700 leading-relaxed mb-6">
        Scroll back to the {calc.name} above, enter your own numbers, and test a few alternative
        scenarios. A few minutes of clear math often prevents months of costly uncertainty.
      </p>
    </article>
  );
}
