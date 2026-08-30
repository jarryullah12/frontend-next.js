import type { Calculator } from '@/lib/calculators';

export type GuideFaq = { q: string; a: string };

export type GuideCaseStudy = {
  title: string;
  paragraphs: string[];
};

export type GuideComparisonTable = {
  title: string;
  headers: string[];
  rows: string[][];
  note: string[];
};

export type GuideContent = {
  intro: string[];
  howItWorks: string[];
  benefits: string[];
  comparison?: GuideComparisonTable;
  steps: string[];
  cases: GuideCaseStudy[];
  factorsTitle: string;
  factors: string[];
  proTips: string[];
  mistakes: string[];
  faqs: GuideFaq[];
  conclusion: string[];
};

const usdNote =
  'Examples use USD for readability. Your real numbers depend on lender terms, credit, fees, and local rules.';

export const calculatorGuides: Record<string, GuideContent> = {
  emi: {
    intro: [
      'An EMI (equated monthly installment) is the fixed amount you pay each month on a typical installment loan. It covers both interest and principal so the balance trends toward zero by the end of the term.',
      'Marketing often highlights a low rate or a long term. Until you translate the offer into a monthly payment that fits your budget, you are guessing. That is the job of an EMI-style calculator.',
      `Use the tool to test loan amount, rate, and tenure before you sign. ${usdNote}`,
    ],
    howItWorks: [
      'The payment is derived from loan amount, periodic interest rate, and number of months. Early payments are usually interest-heavy; later payments clear more principal.',
      'Lengthening the term lowers the monthly EMI but tends to raise total interest paid. Shortening the term does the opposite.',
      'Fees rolled into the loan increase principal and therefore the EMI. Always check whether quotes include origination fees.',
    ],
    benefits: [
      'Turns abstract loan offers into a concrete monthly number.',
      'Makes side-by-side lender comparisons easier.',
      'Supports what-if tests: higher down payment, shorter term, or extra principal.',
      'Helps protect savings goals by revealing payment crowding.',
    ],
    comparison: {
      title: 'Shorter term vs longer term (same rate and amount)',
      headers: ['Choice', 'Monthly payment', 'Total interest tendency'],
      rows: [
        ['Shorter term', 'Higher', 'Usually lower overall interest'],
        ['Longer term', 'Lower', 'Usually higher overall interest'],
      ],
      note: [
        'Exact figures depend on rate and amount. Run both scenarios in the calculator before deciding.',
      ],
    },
    steps: [
      'Gather the loan amount you need after any down payment.',
      'Enter the annual interest rate from the quote (confirm APR vs nominal rate).',
      'Choose a term in months or years matching the offer.',
      'Review the monthly EMI and total interest estimate.',
      'Stress-test a slightly higher rate to see if the payment still fits.',
    ],
    cases: [
      {
        title: 'Example: Personal loan for consolidation',
        paragraphs: [
          'A borrower consolidates card balances into a fixed personal loan. The EMI is predictable, but only helps if it is lower cost overall and truly affordable beside rent and savings.',
          'They compare a 3-year and 5-year term. The 5-year EMI is easier monthly; the 3-year costs less interest if cash flow allows.',
        ],
      },
      {
        title: 'Example: Car financing',
        paragraphs: [
          'Two dealers quote similar prices but different rates and terms. Matching loan amount and running EMI for each quote reveals the real monthly difference beyond the sticker price.',
        ],
      },
      {
        title: 'Example: Stretching approval',
        paragraphs: [
          'A maximum approved amount produces an EMI that leaves no room for emergencies. Choosing a smaller loan protects the rest of the budget even if the purchase is more modest.',
        ],
      },
    ],
    factorsTitle: 'What changes your EMI',
    factors: [
      'Principal (loan amount).',
      'Interest rate / APR.',
      'Term length.',
      'Fees added to principal.',
      'Extra principal payments after the loan starts.',
    ],
    proTips: [
      'Afford the payment first; size the loan second.',
      'Compare APR when fees differ between lenders.',
      'Keep an emergency buffer rather than maxing the approval.',
      'Ask how prepayments are applied.',
    ],
    mistakes: [
      'Looking only at monthly EMI and ignoring total interest.',
      'Forgetting insurance or other ownership costs (especially cars and homes).',
      'Using teaser rates that adjust later without modeling the change.',
      'Co-signing without running the EMI against your own budget.',
    ],
    faqs: [
      { q: 'Is EMI the same as the interest rate?', a: 'No. EMI is the payment amount. The rate is one input that helps determine that payment.' },
      { q: 'Why is early interest so high?', a: 'Amortizing loans apply interest to the current balance. Early on, the balance is largest, so more of each payment goes to interest.' },
      { q: 'Can I lower EMI without refinancing?', a: 'Paying down principal (when allowed) can shorten the schedule or reduce future interest; it may not change a fixed contractual payment unless you restructure.' },
      { q: 'Does a longer term always hurt?', a: 'It raises total interest in most fixed-rate cases, but can be the difference between a workable budget and a strained one. Run both options.' },
    ],
    conclusion: [
      'EMI math turns loan marketing into a budget decision. Know the payment, the total interest tendency, and whether the rest of your life still fits.',
      'Test realistic amounts and rates in the calculator, then confirm final terms in writing before you borrow.',
    ],
  },

  amortization: {
    intro: [
      'An amortization schedule shows how each loan payment splits into interest and principal over time. It explains why balances fall slowly at first even when you pay on time.',
      'Seeing the split helps people decide about extra payments, refinancing, or choosing a shorter term.',
      `The calculator highlights the early-payment mix so the pattern is easy to understand. ${usdNote}`,
    ],
    howItWorks: [
      'Each period, interest is charged on the current balance. The rest of the fixed payment reduces principal. As principal falls, the interest portion shrinks.',
      'A full schedule lists every period. Even a first-month view teaches the core idea: early dollars lean toward interest.',
      'Extra principal payments reduce the balance immediately, which lowers future interest if applied correctly.',
    ],
    benefits: [
      'Demystifies where your payment goes.',
      'Shows the impact of term length on total interest.',
      'Supports smarter extra-payment decisions.',
      'Useful when comparing refinance offers.',
    ],
    steps: [
      'Enter loan amount, rate, and term.',
      'Generate or view the payment split for early months.',
      'Note how much of payment one is interest vs principal.',
      'Model an extra principal amount and re-check the balance path if your tool allows.',
      'Use insights before committing to a term or refinance.',
    ],
    cases: [
      {
        title: 'Example: First payment surprise',
        paragraphs: [
          'A new borrower expects half of each payment to cut principal. The schedule shows most of month one is interest. Understanding that pattern reduces frustration and motivates optional extra principal when cash allows.',
        ],
      },
      {
        title: 'Example: Extra $100 monthly',
        paragraphs: [
          'Adding $100 to principal each month on a long consumer loan can shave years and a meaningful amount of interest—depending on rate and balance. The schedule makes the benefit tangible.',
        ],
      },
      {
        title: 'Example: Refinancing decision',
        paragraphs: [
          'Someone is three years into a loan. Remaining interest on the current schedule is compared with a new loan’s costs and fees. Amortization context prevents refinancing solely because the new payment looks lower.',
        ],
      },
    ],
    factorsTitle: 'What shapes the schedule',
    factors: [
      'Interest rate.',
      'Remaining principal.',
      'Payment amount and frequency.',
      'Loan term.',
      'Extra principal payments and how the servicer applies them.',
    ],
    proTips: [
      'Request a full schedule from your lender for official numbers.',
      'Label extra payments clearly as principal-only when required.',
      'Recheck schedules after any refinance.',
      'Focus on high-rate loans first when accelerating payoff.',
    ],
    mistakes: [
      'Assuming equal interest and principal every month.',
      'Paying ahead without confirming application to principal.',
      'Ignoring fees when refinancing to improve the schedule.',
      'Confusing a lower payment with lower total cost.',
    ],
    faqs: [
      { q: 'Why does principal drop slowly at first?', a: 'Interest is calculated on a larger balance early in the loan, so more of each fixed payment covers interest.' },
      { q: 'Do all loans amortize?', a: 'Many installment loans do. Interest-only or balloon products follow different patterns—read the contract.' },
      { q: 'Will extra payments change my required EMI?', a: 'Often the minimum stays the same while the term shortens, unless you formally restructure.' },
      { q: 'Is amortization only for mortgages?', a: 'No. Auto loans, personal loans, and many student loans also amortize.' },
    ],
    conclusion: [
      'Amortization turns a fixed payment into a visible path of interest versus principal. Once you see it, term choices and extra payments make more sense.',
      'Use the calculator to learn the pattern, then rely on lender schedules for official figures.',
    ],
  },

  refinance: {
    intro: [
      'Refinancing replaces an existing loan with a new one—usually to lower the rate, change the term, or tap equity. Savings are real only after fees and your time horizon are considered.',
      'A lower monthly payment can still cost more overall if you reset a long term or pay high closing costs.',
      `This guide focuses on estimating payment change and thinking through break-even. ${usdNote}`,
    ],
    howItWorks: [
      'Compare your current payment with a modeled payment at the new rate and term. Subtract fees to see how long it takes for monthly savings to recover closing costs (break-even).',
      'If you extend the term, monthly relief may come with more total interest. If you shorten the term, payment may rise while interest falls.',
      'Cash-out refinance adds principal. That can fund needs—but it is still debt secured by collateral in many cases.',
    ],
    benefits: [
      'Potential rate reduction and lower interest cost.',
      'Option to adjust term to match cash-flow needs.',
      'Opportunity to switch loan types when appropriate.',
      'Clearer decision when break-even is calculated honestly.',
    ],
    steps: [
      'List current balance, rate, remaining term, and payment.',
      'Collect formal quotes with APR and itemized fees.',
      'Estimate new payment and monthly savings.',
      'Divide total refinance costs by monthly savings for a break-even month count.',
      'Decide only if you expect to keep the loan past break-even and the structure fits your goals.',
    ],
    cases: [
      {
        title: 'Example: Rate drop with costs',
        paragraphs: [
          'Monthly savings look attractive at $120, but fees total $3,600. Break-even is about 30 months. If a move is likely in two years, refinancing may not pay off.',
        ],
      },
      {
        title: 'Example: Shortening the term',
        paragraphs: [
          'A borrower refinances from 30 years remaining to 15 at a modestly lower rate. The payment rises, but interest over the remaining life falls. They choose the higher payment because cash flow allows it.',
        ],
      },
      {
        title: 'Example: Cash-out caution',
        paragraphs: [
          'Equity is pulled out to fund a project. The new loan is larger. Without a repayment plan for the extra principal, long-term cost climbs even if the rate is decent.',
        ],
      },
    ],
    factorsTitle: 'What drives refinance value',
    factors: [
      'Rate difference versus current loan.',
      'Closing costs and points.',
      'Remaining time you will keep the loan.',
      'New term length.',
      'Credit changes since origination.',
    ],
    proTips: [
      'Use written loan estimates, not verbal ranges.',
      'Calculate break-even before celebrating a lower payment.',
      'Watch for term reset that quietly increases total interest.',
      'Compare at least two or three lenders.',
    ],
    mistakes: [
      'Refinancing for a small rate cut with high fees and a short stay.',
      'Ignoring how a longer term affects total interest.',
      'Rolling fees into the loan without noticing the higher balance.',
      'Skipping a check on prepayment penalties on the old loan.',
    ],
    faqs: [
      { q: 'How big a rate cut is enough?', a: 'It depends on fees and how long you will keep the loan. Break-even months matter more than a fixed rule of thumb.' },
      { q: 'Will refinancing hurt my credit?', a: 'Applications can cause inquiries; responsible payment history still matters most long term.' },
      { q: 'Is cash-out a bad idea?', a: 'Not always, but it increases debt. Match it to high-value needs and a clear payoff plan.' },
      { q: 'Should I refinance adjustable to fixed?', a: 'If you need payment certainty and the fixed pricing makes sense after fees, it can be reasonable—run the numbers either way.' },
    ],
    conclusion: [
      'Refinance when the math works after fees and the structure matches how long you will keep the debt. A lower payment alone is not proof of savings.',
      'Model the new payment, add up costs, and be honest about your timeline before you sign.',
    ],
  },

  affordability: {
    intro: [
      'Home affordability estimates try to answer how much house payment (or price) fits your income and existing debts. Lenders use their own formulas; your comfort level may be stricter.',
      'Rules of thumb about multiples of income are starting points only. Local taxes, insurance, and personal goals change the answer.',
      `Use affordability math as a ceiling conversation, not a target to stretch into. ${usdNote}`,
    ],
    howItWorks: [
      'Many approaches look at housing costs as a share of income and at total debt payments versus income (DTI). Higher existing debts reduce room for a mortgage.',
      'Price, down payment, rate, and term translate into principal and interest. Adding taxes and insurance produces a more realistic monthly housing cost.',
      'Approval amount is not the same as affordable amount. Approval reflects lender risk; affordability should reflect your budget and savings rate.',
    ],
    benefits: [
      'Prevents shopping only at the maximum approval.',
      'Links income, debts, and housing in one view.',
      'Encourages leaving room for maintenance and emergencies.',
      'Supports clearer talks with a partner or advisor.',
    ],
    steps: [
      'Add up stable gross income and monthly debt payments.',
      'Estimate taxes and insurance for the area you are considering.',
      'Pick a rate and term assumption that is realistic today.',
      'Back into a price range that keeps total housing comfortable.',
      'Stress-test higher rates or lower income briefly.',
    ],
    cases: [
      {
        title: 'Example: High approval, tight life',
        paragraphs: [
          'A household is approved near the top of the range, but the payment would erase their vacation and retirement contributions. They shop 15% lower in price to keep those goals alive.',
        ],
      },
      {
        title: 'Example: Student loans and DTI',
        paragraphs: [
          'Student loan payments push DTI higher. Even with decent income, mortgage room shrinks. Paying down a chunk of debt before applying improves both comfort and options.',
        ],
      },
      {
        title: 'Example: Cash for down payment vs reserves',
        paragraphs: [
          'Using every dollar for a larger down payment lowers the loan but empties emergency savings. Keeping a reserve may matter more than squeezing the last percent off the loan.',
        ],
      },
    ],
    factorsTitle: 'What limits affordable price',
    factors: [
      'Income stability.',
      'Existing monthly debts.',
      'Interest rates and available terms.',
      'Property taxes and insurance levels.',
      'Down payment and cash reserves after closing.',
    ],
    proTips: [
      'Budget below the maximum quoted approval.',
      'Include maintenance—homes need ongoing care.',
      'Get pre-qualified with realistic debts listed.',
      'Revisit affordability if rates move sharply.',
    ],
    mistakes: [
      'Equating lender approval with personal affordability.',
      'Forgetting HOA fees or private mortgage insurance when applicable.',
      'Draining all savings for closing so any repair becomes a crisis.',
      'Ignoring commute costs tied to a cheaper far-away property.',
    ],
    faqs: [
      { q: 'What DTI do lenders like?', a: 'Guidelines vary by program and market. Lower DTI generally means more flexibility, but your budget may require going lower than the maximum allowed.' },
      { q: 'Should I include bonuses in income?', a: 'Use income you can count on. Irregular bonuses are safer as extras, not as the foundation of a mortgage.' },
      { q: 'Is renting throwing money away?', a: 'Not automatically. Ownership has benefits and costs. Compare total monthly reality, time horizon, and flexibility needs.' },
      { q: 'How much down payment is required?', a: 'It depends on the loan type. Larger down payments can improve terms but should not eliminate emergency savings.' },
    ],
    conclusion: [
      'Affordability is about a payment you can live with while still saving and handling surprises—not the highest number on a preapproval letter.',
      'Run conservative assumptions, keep reserves, and treat the result as a guide for shopping ranges.',
    ],
  },

  vat: {
    intro: [
      'Sales tax and VAT-style taxes add a percentage on top of a price—or are already included, depending on how a price is shown. Calculators help you move between pre-tax and post-tax amounts cleanly.',
      'For shoppers, that means fewer surprises at checkout. For small sellers, it means clearer pricing when rates differ by location.',
      'Enter the rate that applies to your purchase or jurisdiction and whether you are adding tax or removing it from a tax-inclusive figure.',
    ],
    howItWorks: [
      'To add tax: multiply the net price by (1 + rate). To extract tax from a gross price: divide by (1 + rate).',
      'Rates vary by place and sometimes by product category. Always confirm the rate that actually applies.',
      'Compound rules (state + local) may stack. When in doubt, use the combined rate you are charged at checkout.',
    ],
    benefits: [
      'Avoids mental math errors on large purchases.',
      'Helps compare tax-inclusive vs tax-exclusive price tags.',
      'Useful for quick budgeting on multi-state shopping.',
      'Supports simple invoicing checks for freelancers.',
    ],
    steps: [
      'Confirm whether the listed price already includes tax.',
      'Enter the correct combined rate.',
      'Calculate either the total with tax or the net before tax.',
      'Double-check on high-value orders where small rate errors matter.',
    ],
    cases: [
      {
        title: 'Example: Online cart total',
        paragraphs: [
          'An item is listed at $80 before tax in a location with a 7.5% rate. The calculator shows about $86 total. Knowing that up front prevents budget overruns at checkout.',
        ],
      },
      {
        title: 'Example: Tax-inclusive price',
        paragraphs: [
          'A label shows a tax-inclusive price. Dividing by (1 + rate) reveals the pre-tax amount for bookkeeping or reimbursement forms.',
        ],
      },
      {
        title: 'Example: Small seller',
        paragraphs: [
          'A maker sells at markets in two cities with different rates. Quick calculations keep quotes consistent with local rules.',
        ],
      },
    ],
    factorsTitle: 'What affects the tax amount',
    factors: [
      'Applicable tax rate(s).',
      'Whether price is tax-inclusive or exclusive.',
      'Product exemptions or reduced rates where they exist.',
      'Shipping or service treatment under local rules.',
    ],
    proTips: [
      'Save common rates for places you shop often.',
      'Separate net and tax on invoices for clarity.',
      'Recheck rates after moves or rule changes.',
      'Do not assume online rates match every local store.',
    ],
    mistakes: [
      'Using the wrong city rate.',
      'Adding tax twice to a tax-inclusive price.',
      'Ignoring local add-ons on top of state rates.',
      'Rounding inconsistently across line items on invoices.',
    ],
    faqs: [
      { q: 'Is VAT the same as sales tax?', a: 'They are related ideas implemented differently by country. The math of percentage add-ons is similar for simple cases.' },
      { q: 'Why is my checkout tax different from the calculator?', a: 'Shipping origin, destination rules, or product category can change the applied rate.' },
      { q: 'Do tips get taxed the same way?', a: 'Rules vary. Follow the receipt or local guidance rather than assuming.' },
      { q: 'Can businesses reclaim tax?', a: 'In some systems, yes under specific rules. That is separate from consumer checkout math.' },
    ],
    conclusion: [
      'Tax percentage math is simple once you know if prices are gross or net and which rate applies. The calculator removes the arithmetic friction.',
      'Confirm the rate for your location, then add or remove tax with confidence before you buy or invoice.',
    ],
  },

  fire: {
    intro: [
      'FIRE (Financial Independence, Retire Early) planning centers on building investments large enough that withdrawals can cover living costs without relying on a traditional paycheck.',
      'A common discussion shortcut is a multiple of annual spending (often linked to safe withdrawal rate ideas). It is a planning model, not a promise that markets will cooperate on your schedule.',
      'Use FI-style numbers to understand the scale of savings required—then pressure-test assumptions about spending, returns, and healthcare.',
    ],
    howItWorks: [
      'A simple approach multiplies annual spending by a factor (for example related to a 4%-style withdrawal framework) to estimate a portfolio target. Lower spending reduces the target; higher spending raises it.',
      'Savings rate and time determine how quickly you might approach that target. Investment returns matter, but so does avoiding large lifestyle jumps.',
      'Early retirement also needs plans for insurance, sequence of returns risk, and flexible spending in down markets.',
    ],
    benefits: [
      'Clarifies how spending level drives the independence number.',
      'Motivates higher savings rates with a concrete target.',
      'Encourages intentional trade-offs between lifestyle now and options later.',
      'Provides a shared framework for couples aligning long-term plans.',
    ],
    steps: [
      'Track realistic annual spending (not an aspirational bare-minimum that you will not keep).',
      'Choose a planning withdrawal framework and margin of safety.',
      'Estimate current invested assets earmarked for independence.',
      'Project savings rate and time under moderate return assumptions.',
      'Revisit after major life or market changes.',
    ],
    cases: [
      {
        title: 'Example: Spending cut changes the target',
        paragraphs: [
          'Reducing recurring costs by $6,000 a year can lower a FI target by a large multiple of that amount under common rules of thumb. Efficiency in spending is often as powerful as chasing return.',
        ],
      },
      {
        title: 'Example: High saver, modest lifestyle',
        paragraphs: [
          'A household saves aggressively while keeping housing reasonable. Their timeline shortens not because of speculative picks, but because the gap between income and spending is wide and steady.',
        ],
      },
      {
        title: 'Example: Semi-retirement',
        paragraphs: [
          'Rather than full early retirement, someone aims for work-optional status with part-time income. The required portfolio is smaller, and the plan is more resilient.',
        ],
      },
    ],
    factorsTitle: 'What moves your FI number',
    factors: [
      'Annual spending level.',
      'Savings rate.',
      'Investment mix and fees.',
      'Other income (rental, pension, part-time work).',
      'Healthcare and insurance before standard retirement ages.',
    ],
    proTips: [
      'Use conservative return and spending assumptions.',
      'Build flexibility to cut optional costs in a downturn.',
      'Do not ignore healthcare and taxes in lean plans.',
      'Measure progress yearly without obsessing daily.',
    ],
    mistakes: [
      'Underestimating future spending.',
      'Assuming high returns to justify a thin savings rate.',
      'Ignoring sequence risk near the retirement date.',
      'Treating online FI stories as guarantees.',
    ],
    faqs: [
      { q: 'Is the 4% idea a law?', a: 'No. It is a research-inspired starting point with limitations. Some planners use lower initial rates for longer retirements.' },
      { q: 'Do I need millions?', a: 'It depends entirely on spending. Lower sustainable costs mean a lower target.' },
      { q: 'What about Social Security?', a: 'It may help later, but early FI plans should not rely on it for the first years of a long independence period.' },
      { q: 'Can I invest aggressively to speed FI?', a: 'Higher equity shares can raise expected return and volatility. Match risk to your timeline and comfort with drawdowns.' },
    ],
    conclusion: [
      'FIRE math is really spending-and-savings math with an investment layer. Clear costs and consistent saving matter more than perfect market calls.',
      'Estimate a target, automate contributions, and keep the plan flexible enough to survive real-world surprises.',
    ],
  },

  dti: {
    intro: [
      'Debt-to-income (DTI) ratio compares your monthly debt payments with your gross monthly income. Lenders use it as one signal of capacity to take on another payment.',
      'Even outside lending, DTI is a quick stress check: if too much of each paycheck is pre-committed to debt, savings and flexibility suffer.',
      `Lower DTI generally means more room—both for approvals and for real life. ${usdNote}`,
    ],
    howItWorks: [
      'Add required monthly debt payments (loans, cards minimums or reported payments, alimony if applicable). Divide by gross monthly income. Multiply by 100 for a percentage.',
      'Housing costs may be included or viewed separately depending on the context (front-end vs back-end ratios in mortgage underwriting).',
      'Gross income is commonly used by lenders; your take-home reality may feel tighter than the ratio suggests.',
    ],
    benefits: [
      'Flags over-extension before a new loan application.',
      'Gives a single number to track while paying down balances.',
      'Supports housing budget conversations alongside affordability tools.',
      'Helps prioritize which debts to attack first when combined with interest rates.',
    ],
    steps: [
      'List each debt required monthly payment.',
      'Total gross monthly income from stable sources.',
      'Divide payments by income and convert to a percentage.',
      'Compare with lender guidelines and with your comfort level.',
      'Recompute after paydowns or income changes.',
    ],
    cases: [
      {
        title: 'Example: Card minimums add up',
        paragraphs: [
          'Several cards with small minimums still push DTI upward. Paying down the highest-rate balances reduces both interest cost and the ratio over time.',
        ],
      },
      {
        title: 'Example: Mortgage shopping',
        paragraphs: [
          'A buyer DTI is near program limits. They delay a car loan and clear a small installment account before applying, improving approval odds and monthly comfort.',
        ],
      },
      {
        title: 'Example: Income rise',
        paragraphs: [
          'A raise lowers DTI automatically if debt payments stay flat. Directing part of the raise to principal accelerates the improvement.',
        ],
      },
    ],
    factorsTitle: 'What changes DTI',
    factors: [
      'Required monthly debt payments.',
      'Gross income level and stability.',
      'New loans or cosigned obligations.',
      'Reported payment amounts on credit files.',
      'Housing payment size when included.',
    ],
    proTips: [
      'Keep a personal DTI target below the maximum a lender might allow.',
      'Avoid new financing right before a mortgage application when possible.',
      'Attack high-rate debt while maintaining all minimums.',
      'Update the ratio after major paydowns to see progress.',
    ],
    mistakes: [
      'Using take-home pay in a lender-style DTI without adjusting expectations.',
      'Omitting debts that will still appear on credit reports.',
      'Assuming preapproval means the payment is comfortable long term.',
      'Opening new revolving accounts that raise utilization and potential payments.',
    ],
    faqs: [
      { q: 'What is a good DTI?', a: 'Lower is generally better. Many people aim well below the highest ratios lenders might accept so day-to-day life stays manageable.' },
      { q: 'Do monthly utilities count?', a: 'Traditional DTI focuses on debt obligations, not utilities. Utilities still matter in your real budget.' },
      { q: 'Are student loans included?', a: 'Yes, typically via the required monthly payment used by the lender or a calculated payment depending on the program.' },
      { q: 'Does paying off a card help immediately?', a: 'It can reduce revolving obligations and future minimums; credit reports and lender calculations may update on their own timelines.' },
    ],
    conclusion: [
      'DTI is a compact signal of how much of your income is already spoken for by debt. Use it before taking on new payments and while measuring payoff progress.',
      'Calculate honestly, aim lower than the maximum you might be offered, and pair the ratio with a budget that still funds savings.',
    ],
  },
};

export function getCalculatorGuide(id: string): GuideContent | null {
  return calculatorGuides[id] ?? null;
}
