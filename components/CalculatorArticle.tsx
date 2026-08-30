import React from 'react';
import CalculatorFormulaSection from '@/components/CalculatorFormulaSection';
import { calculatorTopics } from '@/lib/calculatorTopics';
import { calculatorDetailedContent } from '@/lib/calculatorDetailedContent';
import { getCalculatorGuide } from '@/lib/calculatorGuides';

type CalcInput = {
  id: string;
  label: string;
  type: string;
  defaultValue?: any;
  options?: { label: string; value: string }[];
};

type Calculator = {
  id: string;
  name: string;
  category: string;
  description: string;
  inputs: CalcInput[];
};

/**
 * Unique, long-form (~1700–2200 words), AdSense-friendly article for every calculator.
 * Heavy use of calculator-specific name, inputs, category and long-tail phrases
 * so pages do not look spun or identical.
 */
export default function CalculatorArticle({ calc }: { calc: Calculator }) {
  const topic = calculatorTopics[calc.id];
  const detailed = calculatorDetailedContent[calc.id];
  const guide = getCalculatorGuide(calc.id);

  const name = calc.name;
  const nameLower = calc.name.toLowerCase();
  const category = calc.category;
  const categoryLower = calc.category.toLowerCase();
  const description = calc.description;
  const inputLabels = calc.inputs.map((i) => i.label);
  const inputList = inputLabels.join(', ');
  const firstInput = inputLabels[0] || 'main value';
  const secondInput = inputLabels[1] || 'second value';
  const defaultSummary = calc.inputs
    .map((i) => `${i.label} (${i.defaultValue ?? 'N/A'})`)
    .join(', ');

  const categoryOpeners: Record<string, string[]> = {
    'Personal Finance': [
      `Most people know they should track money better, yet few have a quick way to answer “where does my pay actually go?” The ${name} gives you that answer in seconds.`,
      `Instead of building a complicated spreadsheet, you can use this free ${nameLower} to turn your real numbers into a clear picture of needs, wants, savings, or net position.`,
      `The goal is not perfection on day one. It is visibility. Once you see the numbers, adjusting habits becomes much easier.`,
    ],
    'Investment & Trading': [
      `Returns look simple on paper until you factor in time, compounding, fees, and inflation. The ${name} isolates the variables that actually move the needle.`,
      `Whether you are comparing two funds, checking a dividend, or estimating growth, this tool replaces rough mental math with a precise result you can trust for planning.`,
      `Remember: the calculator shows the mathematical outcome of the assumptions you enter. It does not predict markets.`,
    ],
    'Loans & Mortgages': [
      `Loan offers rarely look the same once you translate them into monthly payments and total interest. The ${name} does that translation instantly.`,
      `Enter the amount, rate, and term that match a real quote. You will see whether the payment fits your budget and how much interest you will pay over the full life of the loan.`,
      `Small differences in rate or tenure often cost (or save) thousands. Testing both before you sign is one of the highest-ROI habits in personal finance.`,
    ],
    'Real Estate': [
      `Property decisions mix emotion, leverage, and long-term cash flow. The ${name} strips the decision back to the numbers that matter.`,
      `Use it to compare purchase scenarios, estimate yield, or check how a mortgage changes affordability before you fall in love with a listing.`,
      `Always run a conservative case (lower rent, higher expenses, or higher rate) so the plan still works if reality is less optimistic than the brochure.`,
    ],
    'Business Finance': [
      `Business owners and managers need fast answers on margins, break-even, runway, and ratios. The ${name} turns recent figures into those answers without a full model.`,
      `Pull the inputs from your latest statements or forecasts, then stress-test the result. A single clear number often reveals whether a plan is viable or needs revision.`,
      `Consistency of definitions matters more than precision to the last decimal. Use the same method every month so trends stay meaningful.`,
    ],
    'Tax & Salary': [
      `Headline salary and take-home pay are not the same thing. The ${name} helps you estimate what actually lands in your account after typical deductions.`,
      `Tax rules vary by location and filing status, so treat the result as a planning estimate rather than a final tax authority figure.`,
      `When comparing job offers, run the full package—not just base pay—through the same calculator so you compare apples to apples.`,
    ],
    'Retirement': [
      `Retirement math is dominated by three levers: how much you save, how long it compounds, and how much you withdraw later. The ${name} puts those levers in front of you.`,
      `Because small rate and contribution differences compound over decades, always test a lower-return scenario alongside your base case.`,
      `Inflation quietly reduces purchasing power. Whenever possible, think in today’s dollars and then adjust.`,
    ],
    'Banking & Savings': [
      `The difference between “I should save more” and an actual funded goal is usually a clear monthly target. The ${name} creates that target from your numbers.`,
      `Compare APY, compounding frequency, and time horizon rather than advertised rates alone. The calculator makes those differences visible.`,
      `Automatic transfers that you never skip almost always beat irregular large deposits. Use the result to set a realistic automatic amount.`,
    ],
    'Credit Card & Debt': [
      `Minimum payments keep accounts current but can stretch payoff for years and inflate total interest. The ${name} shows the real cost of that path.`,
      `Enter your balance, rate, and planned extra payment. You will see months to freedom and total interest—two numbers that usually change behavior faster than any lecture.`,
      `Avalanche (highest rate first) and snowball (smallest balance first) both work. The best method is the one you will stick with for the full term.`,
    ],
  };

  const introParagraphs =
    detailed?.intro ||
    guide?.intro ||
    categoryOpeners[category] ||
    [
      `The ${name} is built for one job: ${description.toLowerCase()}. It takes the inputs that matter most in ${categoryLower} and returns a clear, actionable result.`,
      `You do not need a spreadsheet or an advisor appointment to run a quick scenario. Enter realistic figures, read the output, then adjust one variable at a time to see what changes the answer most.`,
      `All math runs in your browser. Nothing is uploaded, so you can test private numbers with confidence.`,
    ];

  const howItWorks =
    detailed?.howItWorks ||
    guide?.howItWorks ||
    [
      `You provide the core inputs—${inputList}. The calculator applies the standard formula used for this type of ${categoryLower} analysis.`,
      `Results appear immediately as labeled figures (and a chart when the data supports one). Change any single field and the entire result updates in real time.`,
      `Because the logic is fixed and transparent, the same inputs always produce the same outputs. That makes the tool reliable for household discussions, client conversations, or personal planning.`,
    ];

  const benefits =
    detailed?.benefits ||
    guide?.benefits ||
    [
      `Turns the question “what does this ${nameLower} look like with my numbers?” into a concrete answer in seconds.`,
      `Lets you compare multiple scenarios (base, optimistic, conservative) without rebuilding a spreadsheet each time.`,
      `Highlights which input—${firstInput}, ${secondInput}, or another field—has the biggest impact on the final result.`,
      `Gives couples, families, or business partners a shared number to discuss instead of vague opinions.`,
      `Keeps the calculation private and free so you can run as many what-if tests as you need.`,
    ];

  const factors =
    detailed?.factors ||
    guide?.factors ||
    calc.inputs.map(
      (inp) =>
        `${inp.label}: one of the primary drivers. Changing this value usually moves the result more than most people expect.`
    );

  const proTips =
    detailed?.proTips ||
    guide?.proTips ||
    [
      `Start with the most accurate numbers you have (actual statements, real quotes, recent pay) rather than round “nice” figures.`,
      `Always run at least two extra scenarios: one slightly worse and one slightly better than your base case.`,
      `When the result looks too good or too bad, re-check units (annual vs monthly rate, years vs months) before changing your plan.`,
      `Write down the exact inputs you used. Future reviews are much faster when you know what assumptions produced the earlier number.`,
      `Pair the ${nameLower} result with a simple cash-flow check: after this number, can you still cover essentials and savings?`,
    ];

  const mistakes =
    detailed?.mistakes ||
    guide?.mistakes ||
    [
      `Mixing pre-tax and after-tax figures in the same calculation.`,
      `Ignoring fees, taxes, or insurance that will change the true cost or return.`,
      `Assuming today’s rate or return will stay fixed for the entire time horizon.`,
      `Focusing only on the monthly or single-period figure and forgetting the cumulative impact.`,
      `Treating the calculator output as a guarantee instead of a model of the inputs you entered.`,
    ];

  const categoryCases: Record<string, { title: string; paragraphs: string[] }[]> = {
    'Personal Finance': [
      {
        title: `Case: Turning a vague goal into a monthly target with the ${name}`,
        paragraphs: [
          `A household knew they “should save more” but had no concrete number. They opened the ${name}, entered current income and essential costs, and immediately saw a realistic monthly target.`,
          `Instead of an open-ended promise, they set up an automatic transfer for that amount. Three months later the habit was still intact because the target had been grounded in real numbers from day one.`,
        ],
      },
      {
        title: `Case: Spotting a housing or debt squeeze early`,
        paragraphs: [
          `Someone entered their take-home pay and fixed obligations. The ${name} showed that necessities already consumed most of the available room. That early warning prompted a roommate search and a debt-paydown plan before an emergency hit.`,
        ],
      },
      {
        title: `Case: Aligning two partners on the same page`,
        paragraphs: [
          `Two partners had different mental pictures of “affordable.” Running the same ${nameLower} with shared inputs produced one number both could see. The conversation shifted from opinion to options.`,
        ],
      },
    ],
    'Investment & Trading': [
      {
        title: `Case: Comparing two return assumptions side by side`,
        paragraphs: [
          `An investor tested the same contribution at 5% and at 8% expected return using the ${name}. The gap in final value over 20 years was large enough to change the required monthly savings amount.`,
          `They chose the more conservative rate for planning and treated anything above it as upside rather than a promise.`,
        ],
      },
      {
        title: `Case: Checking the impact of fees`,
        paragraphs: [
          `Two similar products had different expense ratios. By adjusting the return input in the ${name} to reflect net-of-fee performance, the lower-cost option clearly pulled ahead over a long horizon.`,
        ],
      },
      {
        title: `Case: Reality-checking a short-term trade idea`,
        paragraphs: [
          `Before committing capital, a trader ran the expected upside and downside through the calculator. The required win rate and magnitude became obvious, and the idea was either sized smaller or dropped.`,
        ],
      },
    ],
    'Loans & Mortgages': [
      {
        title: `Case: Choosing term length with eyes open`,
        paragraphs: [
          `A borrower compared a shorter and longer term in the ${name}. The shorter term raised the monthly payment but cut total interest dramatically. They chose the shorter term only after confirming the higher payment still left room for savings.`,
        ],
      },
      {
        title: `Case: Testing a rate increase before locking`,
        paragraphs: [
          `While waiting for final approval, rates moved. Re-running the ${nameLower} with the new rate showed the payment was still acceptable. The borrower proceeded with confidence instead of surprise at closing.`,
        ],
      },
      {
        title: `Case: Deciding whether extra principal is worth it`,
        paragraphs: [
          `Someone used the calculator to model a fixed extra monthly principal payment. The reduction in term and total interest was large enough to justify the change in their budget.`,
        ],
      },
    ],
    'Real Estate': [
      {
        title: `Case: Stress-testing rental yield`,
        paragraphs: [
          `A buyer ran optimistic and conservative rent and expense assumptions through the ${name}. Only the conservative case still cleared their minimum yield target, so they negotiated harder on price.`,
        ],
      },
      {
        title: `Case: Rent vs buy with real numbers`,
        paragraphs: [
          `Instead of relying on rules of thumb, the household entered local rent, expected purchase price, rate, and ownership costs. The ${name} made the break-even horizon visible and changed the timeline they were willing to commit to.`,
        ],
      },
      {
        title: `Case: Checking affordability after taxes and insurance`,
        paragraphs: [
          `The base mortgage payment looked fine. Adding estimated property tax and insurance in a related run showed the true monthly housing cost. The buyer adjusted the target price downward.`,
        ],
      },
    ],
    'Business Finance': [
      {
        title: `Case: Finding the real break-even point`,
        paragraphs: [
          `A small business entered fixed costs, variable cost per unit, and price into the ${name}. The unit volume required to break even was higher than the sales forecast. They raised price slightly and cut one discretionary fixed cost before launch.`,
        ],
      },
      {
        title: `Case: Runway check before a hiring decision`,
        paragraphs: [
          `Cash and burn rate were run through the calculator. Hiring on the original plan left too few months of runway. The team delayed the hire and focused on revenue first.`,
        ],
      },
      {
        title: `Case: Margin review after a cost increase`,
        paragraphs: [
          `Supplier costs rose. Re-running gross and net margin calculations showed which products were still viable and which needed a price change or redesign.`,
        ],
      },
    ],
    'Tax & Salary': [
      {
        title: `Case: Comparing two job offers on take-home basis`,
        paragraphs: [
          `Two offers had different base salaries and benefit packages. Running both through the ${name} (and adjusting for known deductions) showed the lower headline salary actually produced higher monthly cash in that location.`,
        ],
      },
      {
        title: `Case: Estimating the impact of a raise`,
        paragraphs: [
          `Before celebrating a raise, the employee estimated the new take-home and the likely tax bracket effect. The net increase was still meaningful, but smaller than the gross figure suggested—useful for setting realistic spending plans.`,
        ],
      },
      {
        title: `Case: Side-income tax awareness`,
        paragraphs: [
          `Someone starting freelance work used the calculator to estimate self-employment tax impact. They began setting aside a percentage of every invoice from day one instead of facing a surprise later.`,
        ],
      },
    ],
    'Retirement': [
      {
        title: `Case: Testing a lower return assumption`,
        paragraphs: [
          `A couple ran their retirement plan at both 7% and 4% expected return. The lower-return case required a higher savings rate. They increased automatic contributions rather than hoping for the higher return.`,
        ],
      },
      {
        title: `Case: Deciding between more savings vs later retirement`,
        paragraphs: [
          `The ${name} showed that working two extra years had a similar effect to a significant rise in the savings rate. The household chose a mix of both instead of relying on only one lever.`,
        ],
      },
      {
        title: `Case: Withdrawal rate reality check`,
        paragraphs: [
          `Before retiring, they modeled a few withdrawal rates. The higher rate looked comfortable in early years but raised the risk of depleting the portfolio too soon. They adopted a more moderate starting withdrawal.`,
        ],
      },
    ],
    'Banking & Savings': [
      {
        title: `Case: Turning a big goal into a weekly transfer`,
        paragraphs: [
          `A savings target felt overwhelming as a lump sum. The ${name} converted it into a weekly amount that fit the paycheck cycle. Automation did the rest.`,
        ],
      },
      {
        title: `Case: Choosing between accounts on APY and access`,
        paragraphs: [
          `Two accounts advertised similar rates. After comparing compounding and liquidity needs with the calculator’s help, the user picked the one that balanced yield with easy access for emergencies.`,
        ],
      },
      {
        title: `Case: Building a short-term sinking fund`,
        paragraphs: [
          `Instead of putting an irregular expense on a credit card, the household calculated the monthly amount needed to fund it in cash by the due date and started the transfers immediately.`,
        ],
      },
    ],
    'Credit Card & Debt': [
      {
        title: `Case: Seeing the true cost of minimum payments`,
        paragraphs: [
          `Entering the current balance and minimum payment into the ${name} produced a payoff timeline measured in years and a total interest figure that was hard to ignore. The user committed to a fixed extra amount the same week.`,
        ],
      },
      {
        title: `Case: Choosing avalanche vs snowball`,
        paragraphs: [
          `Two debts were compared. The math favored paying the higher rate first. The user still started with the smaller balance for a quick psychological win, then switched to the higher rate—hybrid approach powered by clear numbers.`,
        ],
      },
      {
        title: `Case: Evaluating a balance transfer offer`,
        paragraphs: [
          `A 0% intro offer looked attractive. Modeling the transfer fee, remaining balance after the promo window, and the post-promo rate showed whether the move actually saved money for that specific balance.`,
        ],
      },
    ],
  };

  const cases =
    detailed?.cases ||
    guide?.cases ||
    categoryCases[category] ||
    [
      {
        title: `Example: Everyday use of the ${name}`,
        paragraphs: [
          `Someone facing a typical ${categoryLower} decision opens the ${name}, enters current figures (${defaultSummary}), and reviews the primary result. The number shows whether the plan fits existing cash flow or needs adjustment.`,
          `They then change one input at a time to discover which lever matters most, leaving with a short list of realistic options instead of a vague goal.`,
        ],
      },
      {
        title: `Example: Side-by-side comparison`,
        paragraphs: [
          `Two alternatives look similar in marketing material. Running both through the same ${nameLower} with identical assumptions reveals the real difference in cost, return, or risk.`,
        ],
      },
      {
        title: `Example: Stress test before committing`,
        paragraphs: [
          `A base case is built, then one or two inputs are deliberately worsened. If the plan still works, confidence rises. If it breaks, the user knows which variable to protect first.`,
        ],
      },
    ];

  const categoryFaqs: Record<string, { q: string; a: string }[]> = {
    'Personal Finance': [
      { q: `How do I calculate a realistic monthly budget with the ${name}?`, a: `Start with actual take-home pay and fixed essential costs. Enter those figures, then adjust discretionary categories until the remaining amount matches what you can sustainably save or put toward debt.` },
      { q: `Should I use gross or net income in this ${nameLower}?`, a: `For most personal budgeting tools, after-tax (net) income is the better starting point because that is the money you actually control.` },
      { q: `How often should I update my numbers?`, a: `Update after any material change—raise, new bill, move, or debt payoff—and at least once per quarter so the picture stays current.` },
    ],
    'Investment & Trading': [
      { q: `Does the ${name} account for taxes and fees?`, a: `Most core return calculators focus on the mathematical growth formula. Enter a net-of-fee return if you want a more realistic long-term estimate, and remember taxes depend on account type and jurisdiction.` },
      { q: `What return rate should I assume?`, a: `Use a conservative long-term rate for planning and treat higher historical averages as upside, not a promise. Re-run the ${nameLower} at more than one rate.` },
      { q: `Can I use this for short-term trading decisions?`, a: `You can use it to size positions or check required returns, but short-term price movement is uncertain. The calculator does not predict markets.` },
    ],
    'Loans & Mortgages': [
      { q: `How do I compare two loan offers with the ${name}?`, a: `Enter the same principal for both, then the rate and term of each offer. Compare both the monthly payment and the total interest paid over the full term.` },
      { q: `Should I include taxes and insurance in the payment?`, a: `For pure loan comparison you can exclude them. For true housing affordability you should add estimated property tax and insurance so the monthly number matches reality.` },
      { q: `Is a lower monthly payment always better?`, a: `Not necessarily. A longer term lowers the payment but usually raises total interest. Use the ${nameLower} to see both figures before deciding.` },
    ],
    'Real Estate': [
      { q: `What expenses should I include when estimating yield?`, a: `Include vacancy allowance, property management, maintenance, insurance, taxes, and capital expenditures if possible. Optimistic rent with zero expenses produces misleading yields.` },
      { q: `How do I stress-test a purchase with this calculator?`, a: `Run a base case, then lower rent or raise the interest rate and expenses. If the deal only works in the optimistic case, reconsider price or terms.` },
      { q: `Does the ${name} replace a full investment underwriting model?`, a: `It gives a fast, clear first pass. For large purchases, follow up with detailed cash-flow projections and professional advice.` },
    ],
    'Business Finance': [
      { q: `Where should the input numbers come from?`, a: `Prefer recent actuals from your accounting system. Forecasts are useful for planning, but base decisions on numbers you can defend.` },
      { q: `How often should a business re-run these calculations?`, a: `After each major cost or revenue change, and at least monthly if you are early-stage or managing tight cash.` },
      { q: `Can I use the ${name} for pricing decisions?`, a: `Yes—especially break-even and margin tools. Change price or cost inputs to see the effect on required volume or remaining margin.` },
    ],
    'Tax & Salary': [
      { q: `Is the result exact for my tax return?`, a: `No. It is a planning estimate based on standard assumptions. Final tax depends on filing status, deductions, credits, and local rules.` },
      { q: `How should I compare two job offers?`, a: `Run both through the same ${nameLower} using the best information you have on taxes and deductions, and also factor commute, benefits, and cost of living.` },
      { q: `Does this include state or local taxes?`, a: `Coverage varies. When in doubt, add a manual adjustment or consult a tax professional for your location.` },
    ],
    'Retirement': [
      { q: `What investment return should I use for retirement planning?`, a: `A conservative long-term rate is safer for planning. Always test a lower rate as well so your required savings rate is not based on best-case history.` },
      { q: `How does inflation affect the result?`, a: `Inflation reduces future purchasing power. When possible, think in today’s dollars or explicitly include an inflation assumption in your planning.` },
      { q: `Should I include Social Security or pensions?`, a: `Yes if you have a reasonable estimate. Enter them as additional income in retirement so the portfolio withdrawal need is not overstated.` },
    ],
    'Banking & Savings': [
      { q: `What is the difference between APY and interest rate?`, a: `APY includes the effect of compounding. When comparing accounts, APY is usually the fairer figure to enter or compare.` },
      { q: `How do I turn a big savings goal into a monthly amount?`, a: `Enter the target amount and the time you have. The ${name} will show the required regular contribution assuming a given rate of return.` },
      { q: `Should emergency savings earn high returns?`, a: `Priority is safety and liquidity. A competitive high-yield savings or money-market rate is usually enough; do not take market risk with money you may need quickly.` },
    ],
    'Credit Card & Debt': [
      { q: `Why do minimum payments take so long to clear a balance?`, a: `Minimums are often a small percentage of the balance plus interest. Most of the early payment goes to interest, so principal declines slowly.` },
      { q: `Is the debt avalanche or snowball method better?`, a: `Avalanche (highest interest first) minimizes total interest. Snowball (smallest balance first) can provide faster psychological wins. The ${nameLower} helps you see the cost of either path.` },
      { q: `Should I accept a balance transfer offer?`, a: `Model the transfer fee, the promotional period, and the rate afterward. If a large balance will remain when the promo ends, the savings may be smaller than they appear.` },
    ],
  };

  const baseFaqs =
    detailed?.faqs ||
    guide?.faqs ||
    topic?.faqs ||
    categoryFaqs[category] ||
    [];

  const commonFaqs = [
    {
      q: `Is the ${name} free to use and private?`,
      a: `Yes. FinovaCalc calculators are free, require no account, and run entirely in your browser so your inputs stay on your device.`,
    },
    {
      q: `How accurate is the ${nameLower} result?`,
      a: `The math follows standard formulas used in ${categoryLower}. Accuracy depends on the quality of the inputs you provide. Garbage in, garbage out—realistic numbers produce realistic guidance.`,
    },
    {
      q: `Can I rely on this for formal advice or lending decisions?`,
      a: `Use it for education, personal planning, and preliminary comparisons. For regulated advice, tax filings, or final lending decisions, confirm with a qualified professional and current official rules.`,
    },
    {
      q: `What if my result seems surprisingly high or low?`,
      a: `First verify every input and unit (annual vs monthly, years vs months). Then test nearby values. Large swings usually point to a high-impact variable such as rate, term, or starting amount.`,
    },
  ];

  const seen = new Set<string>();
  const faqs = [...baseFaqs, ...commonFaqs].filter((f) => {
    if (seen.has(f.q)) return false;
    seen.add(f.q);
    return true;
  });

  const conclusion =
    detailed?.conclusion ||
    guide?.conclusion ||
    [
      `The ${name} exists to replace guesswork with a clear number you can discuss and act on. Used regularly, it reduces expensive surprises in ${categoryLower}.`,
      `Enter realistic inputs, test a better and worse case, and revisit the calculation when life or markets change. That simple loop is one of the highest-leverage habits available to anyone managing money.`,
    ];

  const getFieldSemantics = (label: string) => {
    const l = label.toLowerCase();
    if (l.includes('income') || l.includes('salary') || l.includes('pay'))
      return 'Sets the cash-flow baseline before expenses, savings, or debt service.';
    if (l.includes('expense') || l.includes('cost') || l.includes('payment') || l.includes('emi'))
      return 'The recurring or one-time cash outflow being measured.';
    if (l.includes('rate') || l.includes('interest') || l.includes('return') || l.includes('apr') || l.includes('%') || l.includes('yield'))
      return 'Percentage driver of growth or borrowing cost; small changes compound.';
    if (l.includes('year') || l.includes('month') || l.includes('term') || l.includes('period') || l.includes('tenure') || l.includes('horizon'))
      return 'Time span over which interest, growth, or repayment occurs.';
    if (l.includes('asset') || l.includes('principal') || l.includes('balance') || l.includes('invested') || l.includes('amount') || l.includes('value'))
      return 'Starting capital, loan size, or asset value under analysis.';
    if (l.includes('liability') || l.includes('debt') || l.includes('loan'))
      return 'Obligation that reduces net worth or requires ongoing payments.';
    if (l.includes('down') || l.includes('contribution') || l.includes('deposit') || l.includes('extra'))
      return 'Up-front or recurring capital that reduces financing need or accelerates the goal.';
    if (l.includes('age') || l.includes('retirement'))
      return 'Personal timeline that sets how many years remain for compounding or withdrawals.';
    if (l.includes('fee') || l.includes('tax') || l.includes('insurance'))
      return 'Friction cost that reduces net return or raises true monthly outflow.';
    return `Controls the ${label.toLowerCase()} input inside the model.`;
  };

  const steps =
    guide?.steps ||
    [
      `Collect current, accurate figures for: ${inputList}.`,
      `Enter them into the ${name}. Use defaults only for exploration; replace them with your real numbers for decisions.`,
      `Read the primary result and any secondary breakdown or chart.`,
      `Change one input at a time (especially ${firstInput} and ${secondInput}) and note how the outcome moves.`,
      `Write down the scenario that fits your budget and goals, plus the next action you will take.`,
      `Re-run the calculator after the next material change or at least once per quarter.`,
    ];

  const whoFor = `The ${name} is most useful for people who need a fast, private answer to a specific ${categoryLower} question—whether that is a household checking affordability, an investor comparing assumptions, a borrower reading a loan quote, or a business owner testing a margin or runway number. It is less useful if you need formal tax advice, a full legal underwriting package, or personalized portfolio management; those still require qualified professionals.`;

  const whenNot = `Do not treat a single run of the ${nameLower} as a permanent plan. Rates, income, fees, and goals change. Do not ignore fees, taxes, or inflation when the time horizon is long. And do not use optimistic inputs to justify a decision you already emotionally want—stress-test the downside first.`;

  return (
    <article className="mt-16 prose prose-slate max-w-none border-t border-slate-200 pt-12">
      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
        How to Use the {name} for Clearer {category} Decisions
      </h2>
      {introParagraphs.map((p, i) => (
        <p key={i} className="text-slate-700 leading-relaxed mb-4">
          {p}
        </p>
      ))}
      {topic?.historyAndConcept && (
        <p className="text-slate-700 leading-relaxed mb-4">{topic.historyAndConcept}</p>
      )}
      {topic?.whyItMatters && (
        <>
          <h3 className="text-xl font-bold text-slate-900 mb-3 mt-6">Why This Number Matters</h3>
          <p className="text-slate-700 leading-relaxed mb-6">{topic.whyItMatters}</p>
        </>
      )}

      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4 mt-10">
        Who Should Use This {name} (and Who Should Not)
      </h2>
      <p className="text-slate-700 leading-relaxed mb-4">{whoFor}</p>
      <p className="text-slate-700 leading-relaxed mb-6">{whenNot}</p>

      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4 mt-10">
        How the {name} Works Step by Step
      </h2>
      {howItWorks.map((p, i) => (
        <p key={i} className="text-slate-700 leading-relaxed mb-4">
          {p}
        </p>
      ))}

      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4 mt-10">
        Inputs Explained: What Each Field Means in the {name}
      </h2>
      <p className="text-slate-700 leading-relaxed mb-6">
        Understanding the role of each input prevents the most common errors and helps you interpret
        the result correctly when you change assumptions.
      </p>
      <div className="not-prose overflow-x-auto mb-8 border border-slate-200 rounded-xl bg-white shadow-xs">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="bg-slate-100 border-b border-slate-200 text-slate-800 font-semibold">
              <th className="p-3 sm:p-4">Input</th>
              <th className="p-3 sm:p-4">Type</th>
              <th className="p-3 sm:p-4">Default</th>
              <th className="p-3 sm:p-4">Role in the calculation</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-slate-700">
            {calc.inputs.map((inp, idx) => (
              <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                <td className="p-3 sm:p-4 font-semibold text-slate-900">{inp.label}</td>
                <td className="p-3 sm:p-4 capitalize">{inp.type}</td>
                <td className="p-3 sm:p-4 font-mono text-slate-600">
                  {String(inp.defaultValue ?? 'N/A')}
                </td>
                <td className="p-3 sm:p-4">{getFieldSemantics(inp.label)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CalculatorFormulaSection calc={calc} />
      {topic?.formulaExplanation && (
        <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-200 font-mono text-sm text-slate-800 not-prose">
          <strong>Formula in plain language:</strong> {topic.formulaExplanation}
        </div>
      )}

      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4 mt-10">
        Practical Walkthrough: Using the {name} With Real Numbers
      </h2>
      <ol className="list-decimal pl-6 space-y-3 text-slate-700 mb-6">
        {steps.map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ol>

      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4 mt-10">
        Why People Keep Coming Back to This {name}
      </h2>
      <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
        {benefits.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>

      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4 mt-10">
        Real Examples: {name} in Everyday Situations
      </h2>
      {topic?.realWorldExample && (
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-8 not-prose">
          <h3 className="text-lg font-bold text-slate-900 mb-2">{topic.realWorldExample.title}</h3>
          <p className="text-sm text-slate-700 mb-3">
            <strong>Scenario:</strong> {topic.realWorldExample.scenario}
          </p>
          <div className="bg-white p-4 rounded-xl border border-slate-200 font-mono text-sm text-slate-800 mb-3 whitespace-pre-line">
            {topic.realWorldExample.calculation}
          </div>
          <p className="text-xs font-semibold text-slate-700">
            Takeaway: {topic.realWorldExample.takeaway}
          </p>
        </div>
      )}
      {cases.map((cs, i) => (
        <section key={i} className="mt-6">
          <h3 className="text-xl font-semibold text-slate-900 mb-2">{cs.title}</h3>
          {cs.paragraphs.map((p, j) => (
            <p key={j} className="text-slate-700 leading-relaxed mb-4">
              {p}
            </p>
          ))}
        </section>
      ))}

      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4 mt-10">
        {guide?.factorsTitle || `What Moves the Result in the ${name}`}
      </h2>
      <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
        {factors.map((f, i) => (
          <li key={i}>{f}</li>
        ))}
      </ul>

      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4 mt-10">
        Long-Tail Tips Specific to {category}
      </h2>
      <p className="text-slate-700 leading-relaxed mb-4">
        Search interest often clusters around phrases such as “how to calculate {nameLower} with my
        actual numbers,” “{nameLower} vs alternatives,” or “what happens if the rate changes.” The
        most useful way to answer those questions is to run your own figures through the tool above
        and then stress-test the sensitive inputs.
      </p>
      <p className="text-slate-700 leading-relaxed mb-4">
        Low-competition, high-intent questions usually look like: “{nameLower} for a specific loan
        amount and term,” “effect of extra payments on total interest,” or “required monthly amount
        to reach a goal by a date.” This calculator is built exactly for those practical checks.
      </p>
      <p className="text-slate-700 leading-relaxed mb-6">
        Bookmark the page with the inputs that matter to your situation. Returning to the same
        {nameLower} after a rate change, a raise, or a new bill takes less than a minute and keeps
        your plan honest.
      </p>

      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4 mt-10">
        Pro Tips for Better {name} Results
      </h2>
      <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
        {proTips.map((t, i) => (
          <li key={i}>{t}</li>
        ))}
      </ul>

      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4 mt-10">
        Common Mistakes When Using a {name}
      </h2>
      <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
        {mistakes.map((m, i) => (
          <li key={i}>{m}</li>
        ))}
      </ul>

      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4 mt-10">
        Best Practices That Keep Your Plan Realistic
      </h2>
      <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
        <li>
          <strong>Prefer verified data:</strong> Statements, written quotes, and recent pay details
          beat rounded guesses.
        </li>
        <li>
          <strong>Always sensitivity-test:</strong> One optimistic run is not enough. Add a
          conservative case before you commit.
        </li>
        <li>
          <strong>Watch units:</strong> Annual vs monthly rates and years vs months are the most
          frequent sources of large errors.
        </li>
        <li>
          <strong>Link the result to cash flow:</strong> A mathematically attractive number is only
          useful if the rest of the budget still works.
        </li>
        <li>
          <strong>Document assumptions:</strong> Note the rate, term, and other key inputs so you can
          explain the earlier result later.
        </li>
        <li>
          <strong>Revisit on a schedule:</strong> Quarterly reviews catch drift before it becomes a
          problem.
        </li>
      </ul>

      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4 mt-10">
        Frequently Asked Questions About the {name}
      </h2>
      <div className="space-y-4 not-prose mb-8">
        {faqs.map((faq, i) => (
          <div key={i} className="p-4 bg-white rounded-xl border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-1">{faq.q}</h3>
            <p className="text-sm text-slate-600 leading-relaxed">{faq.a}</p>
          </div>
        ))}
      </div>

      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4 mt-10">
        Final Takeaway
      </h2>
      {conclusion.map((p, i) => (
        <p key={i} className="text-slate-700 leading-relaxed mb-4">
          {p}
        </p>
      ))}
      <p className="text-slate-700 leading-relaxed mb-6">
        Scroll up to the {name}, enter the numbers that match your situation, and test at least one
        alternative scenario. A few minutes of clear math is often the difference between a hopeful
        guess and a plan you can actually follow.
      </p>
    </article>
  );
}
