export interface CalculatorTopic {
  title: string;
  summary: string;
  historyAndConcept: string;
  whyItMatters: string;
  formulaExplanation: string;
  realWorldExample: {
    title: string;
    scenario: string;
    calculation: string;
    takeaway: string;
  };
  longTailKeywords: string[];
  faqs: Array<{ q: string; a: string }>;
}

export const calculatorTopics: Record<string, CalculatorTopic> = {
  'budget-50-30-20': {
    title: '50/30/20 Budgeting Rule',
    summary: 'The 50/30/20 rule is an intuitive personal budgeting framework popularized by Senator Elizabeth Warren in her book *All Your Worth*. It divides post-tax income into 50% Needs, 30% Wants, and 20% Savings.',
    historyAndConcept: 'Originating as a simplified alternative to tedious line-item budgeting, the 50/30/20 rule provides macro-level financial boundaries. Needs include housing, utilities, groceries, minimum debt payments, and healthcare. Wants cover dining out, streaming subscriptions, vacations, and entertainment. Savings include emergency fund contributions, retirement savings, and extra debt principal payments.',
    whyItMatters: 'Without a structured ratio, many households overspend on fixed "Needs" (such as expensive housing or luxury car leases), leaving zero room for wealth creation. Applying 50/30/20 ensures you automatically build financial security before discretionary spending occurs.',
    formulaExplanation: 'Needs = Net Income × 0.50 | Wants = Net Income × 0.30 | Savings = Net Income × 0.20',
    realWorldExample: {
      title: 'Example: $5,000 Net Monthly Take-Home Pay',
      scenario: 'A working professional brings home $5,000 per month after taxes and payroll deductions.',
      calculation: 'Needs Allocation = $5,000 × 50% = $2,500\nWants Allocation = $5,000 × 30% = $1,500\nSavings Allocation = $5,000 × 20% = $1,000',
      takeaway: 'Allocating $1,000 per month into index funds or high-yield savings builds a $12,000 annual wealth cushion without sacrificing lifestyle enjoyment.'
    },
    longTailKeywords: [
      '50 30 20 budget calculator monthly income',
      'how to split salary 50 30 20 rule example',
      '50 percent needs 30 percent wants 20 percent savings guide',
      'after tax income budgeting calculator online',
      'best budgeting rule for young professionals'
    ],
    faqs: [
      { q: 'Should minimum debt payments be classified under Needs or Savings?', a: 'Minimum debt payments are mandatory obligations and fall under Needs (50%). Any extra payments made above the minimum to accelerate debt payoff are counted under Savings (20%).' },
      { q: 'What if my rent takes up more than 50% of my income?', a: 'In high cost of living areas (HCOL), Needs may temporarily exceed 50%. In that case, reduce the Wants bucket (e.g. 15-20%) to keep your Savings bucket as close to 20% as possible.' },
      { q: 'Is the 50/30/20 rule based on gross or net income?', a: 'The rule is calculated using net (take-home) income after tax withholdings. However, if your employer automatically deducts 401(k) retirement contributions, you can add that back to calculate true net income.' }
    ]
  },
  'emergency-fund': {
    title: 'Emergency Fund Planning',
    summary: 'An emergency fund is a liquid cash reserve specifically set aside to cover unexpected financial crises, such as medical emergencies, sudden job loss, car repairs, or home maintenance.',
    historyAndConcept: 'Financial planners universally recommend holding between 3 to 6 months of essential living expenses in an accessible, liquid account (like a High-Yield Savings Account). Single-income households or freelancers should aim for 6 to 9 months, while dual-income households with stable jobs can maintain 3 to 4 months.',
    whyItMatters: 'Without an emergency fund, unexpected expenses force individuals to rely on high-interest credit cards, personal loans, or premature 401(k) withdrawals with penalty fees, compounding financial stress.',
    formulaExplanation: 'Target Emergency Fund = Essential Monthly Expenses × Number of Target Months',
    realWorldExample: {
      title: 'Example: Calculating Emergency Reserve for 6 Months',
      scenario: 'A family has essential monthly bills (rent, food, insurance, utilities) totaling $3,500.',
      calculation: 'Target Fund = $3,500 × 6 months = $21,000 liquid cash buffer.',
      takeaway: 'Having $21,000 in a High-Yield Savings Account earning 4.5% APY yields ~$945 per year in risk-free interest while insulating the family from financial debt traps.'
    },
    longTailKeywords: [
      'how to calculate emergency fund target size',
      '3 to 6 months emergency savings calculator',
      'how much emergency fund do I need for job loss',
      'emergency fund calculator high yield savings account',
      'essential monthly expense baseline budget'
    ],
    faqs: [
      { q: 'Where should I keep my emergency fund?', a: 'Keep your emergency fund in a High-Yield Savings Account (HYSA) or Money Market Account (MMA) with FDIC insurance. Avoid investing it in stocks or lock-in CDs because liquidity and capital preservation are paramount.' },
      { q: 'Should emergency fund calculations use gross income or essential expenses?', a: 'Always base your emergency fund on essential monthly expenses (housing, groceries, utilities, debt minimums), NOT gross income or total spending.' },
      { q: 'How long should it take to build an emergency fund?', a: 'Building a 3-6 month fund takes time. Start with an initial micro-goal of $1,000, then automate monthly transfers of 10-15% of your income until the target is reached.' }
    ]
  },
  'net-worth': {
    title: 'Personal Net Worth Calculation',
    summary: 'Net worth is the definitive metric of financial health, calculated by subtracting your total liabilities (what you owe) from your total assets (what you own).',
    historyAndConcept: 'Assets include cash, bank balances, stock portfolios, retirement accounts (IRA, 401k), real estate market value, and vehicles. Liabilities include mortgages, auto loans, student debt, credit card balances, and personal loans. A positive net worth indicates financial growth, whereas a negative net worth signifies debt overhang.',
    whyItMatters: 'Income measures cash flow, but net worth measures accumulated wealth. Tracking net worth over time reveals whether your financial decisions are compounding your real balance sheet or adding unnecessary debt.',
    formulaExplanation: 'Net Worth = Total Assets − Total Liabilities',
    realWorldExample: {
      title: 'Example: Balance Sheet Snapshot',
      scenario: 'An individual owns a home worth $350,000, has $45,000 in retirement savings, and $10,000 in cash ($405,000 Total Assets). They have a mortgage of $220,000 and student loans of $15,000 ($235,000 Total Liabilities).',
      calculation: 'Net Worth = $405,000 − $235,000 = $170,000',
      takeaway: 'Paying down the mortgage by $5,000 or gaining $5,000 in stock market returns increases net worth by the exact same $5,000.'
    },
    longTailKeywords: [
      'how to calculate personal net worth accurately',
      'assets minus liabilities net worth calculator',
      'average net worth by age breakdown guide',
      'free online net worth tracker and balance sheet',
      'how real estate equity increases total net worth'
    ],
    faqs: [
      { q: 'Should I include my primary home in my net worth?', a: 'Yes, include the current market value of your home under Assets and the remaining mortgage balance under Liabilities. Home equity directly contributes to total net worth.' },
      { q: 'Why is income different from net worth?', a: 'Income is the amount of money you earn per year (a flow metric). Net worth is what you keep and accumulate over time (a stock metric). A high earner who spends everything can have a zero net worth.' },
      { q: 'How often should I recalculate my net worth?', a: 'Recalculating your net worth quarterly or semi-annually is ideal. Avoid tracking daily market fluctuations to stay focused on long-term trends.' }
    ]
  },
  'roi': {
    title: 'Return on Investment (ROI)',
    summary: 'Return on Investment (ROI) is a fundamental financial performance metric used to evaluate the efficiency and profitability of an investment relative to its initial cost.',
    historyAndConcept: 'Expressed as a percentage, ROI measures the net gain or loss generated on an asset over a given holding period. It is widely applied across stock trading, real estate purchases, business ventures, and marketing campaigns to benchmark capital efficiency.',
    whyItMatters: 'ROI allows investors to compare disparate assets—such as comparing stock market gains against real estate rental yields or business expansions—on a standardized percentage scale.',
    formulaExplanation: 'ROI (%) = [(Final Value of Investment − Initial Cost of Investment) / Initial Cost of Investment] × 100',
    realWorldExample: {
      title: 'Example: Stock Investment ROI',
      scenario: 'An investor buys shares for $10,000 and sells them three years later for $14,500.',
      calculation: 'Net Gain = $14,500 − $10,000 = $4,500\nROI = ($4,500 / $10,000) × 100 = 45.00%',
      takeaway: 'The total holding period yield is 45.00%. To compare annual efficiency, convert this total ROI into Compound Annual Growth Rate (CAGR).'
    },
    longTailKeywords: [
      'how to calculate return on investment roi formula',
      'roi calculator stock market gain percentage',
      'real estate return on investment percentage formula',
      'total return vs annual return roi comparison',
      'simple roi percentage calculation with example'
    ],
    faqs: [
      { q: 'What is the difference between ROI and CAGR?', a: 'ROI measures the total cumulative gain over the entire holding period regardless of time. CAGR (Compound Annual Growth Rate) measures the annualized rate of return per year.' },
      { q: 'Can ROI be negative?', a: 'Yes. If the final value of the investment is lower than the initial acquisition price, the resulting ROI percentage will be negative, representing a capital loss.' },
      { q: 'Does basic ROI account for dividends or cash flows?', a: 'Standard simple ROI uses price change. Total Return ROI includes capital gains PLUS dividends, interest, or rental income received during ownership.' }
    ]
  },
  'cagr': {
    title: 'Compound Annual Growth Rate (CAGR)',
    summary: 'CAGR represents the mean annual growth rate of an investment over a specified time period longer than one year, smoothing out geometric compounding fluctuations.',
    historyAndConcept: 'Unlike simple average returns—which can be misleading due to market volatility—CAGR measures the exact constant rate at which an investment would have grown if it had compounded steadily each year.',
    whyItMatters: 'If an asset gains 50% in Year 1 and loses 50% in Year 2, the arithmetic average is 0%, but the actual money lost is 25%. CAGR accurately reflects geometric compounding truth.',
    formulaExplanation: 'CAGR = [(Ending Value / Beginning Value)^(1 / Years)] − 1',
    realWorldExample: {
      title: 'Example: Portfolio Growth over 5 Years',
      scenario: 'An initial investment of $20,000 grows to $35,000 over a 5-year tenure.',
      calculation: 'Ratio = $35,000 / $20,000 = 1.75\nCAGR = (1.75 ^ (1/5)) − 1 = 1.1184 − 1 = 11.84%',
      takeaway: 'The portfolio compounded at an effective annual rate of 11.84% per year.'
    },
    longTailKeywords: [
      'compound annual growth rate cagr formula calculator',
      'how to calculate cagr for mutual funds and stocks',
      'cagr vs annualized return difference explained',
      'cagr formula excel and online calculator tool',
      'smoothing geometric compound growth rate calculation'
    ],
    faqs: [
      { q: 'Why is CAGR preferred over simple average return?', a: 'Simple average return ignores compounding and volatility drag. CAGR gives the true rate required to turn a starting sum into an ending sum.' },
      { q: 'Can CAGR account for periodic interim deposits?', a: 'No. Standard CAGR assumes a single initial lump-sum deposit. For ongoing monthly/annual deposits, use Internal Rate of Return (IRR) or XIRR.' },
      { q: 'What is a good CAGR for stock market investments?', a: 'Historically, the broad S&P 500 index has delivered an average nominal CAGR of approximately 9-10% over multi-decade periods.' }
    ]
  },
  'rule-of-72': {
    title: 'Rule of 72 Doubling Time',
    summary: 'The Rule of 72 is a quick, famous mental math shortcut used to estimate the number of years required to double an investment at a fixed annual rate of interest.',
    historyAndConcept: 'Discovered in the Renaissance by mathematician Luca Pacioli, the Rule of 72 approximates logarithmic compounding. Dividing 72 by your annual interest rate provides an instant estimate of doubling time.',
    whyItMatters: 'It allows investors to instantly grasp the power of compounding. For instance, at a 7.2% return, your money doubles in 10 years; at 10%, it doubles in ~7.2 years.',
    formulaExplanation: 'Years to Double ≈ 72 / Annual Interest Rate (%)',
    realWorldExample: {
      title: 'Example: Comparing 6% vs 12% Compound Rates',
      scenario: 'You invest $10,000. Option A yields 6% annual return; Option B yields 12% annual return.',
      calculation: 'Option A Doubling Time = 72 / 6 = 12 years (Grows to $20,000 in 12 yrs).\nOption B Doubling Time = 72 / 12 = 6 years (Grows to $20,000 in 6 yrs, $40,000 in 12 yrs).',
      takeaway: 'Doubling the return rate doesn\'t just double your money—it quadruples your final wealth over time due to compound frequency.'
    },
    longTailKeywords: [
      'rule of 72 calculator doubling time formula',
      'how long to double money interest rate calculation',
      'rule of 72 vs exact compound interest formula',
      'rule of 72 for inflation purchasing power halving',
      'compound growth mental math shortcut rule 72'
    ],
    faqs: [
      { q: 'How accurate is the Rule of 72?', a: 'The Rule of 72 is remarkably accurate for interest rates between 5% and 12%. For rates outside this range, the Rule of 69 or 70 offers slightly higher precision.' },
      { q: 'Can I use the Rule of 72 for inflation?', a: 'Yes! Divide 72 by the annual inflation rate to find how many years it will take for your money\'s purchasing power to cut in half.' },
      { q: 'Does the Rule of 72 assume monthly or annual compounding?', a: 'The basic rule assumes annual compounding. For continuous compounding, the Rule of 69.3 is mathematically exact.' }
    ]
  },
  'sinking-fund': {
    title: 'Sinking Fund Savings Strategy',
    summary: 'A sinking fund is a strategic savings account dedicated to accumulating money for a planned future expense by saving a fixed monthly amount over a predetermined period.',
    historyAndConcept: 'Unlike an emergency fund (which protects against unplanned crises), a sinking fund is for known upcoming costs—such as a wedding, car down payment, annual insurance premiums, property taxes, or vacation.',
    whyItMatters: 'Setting up sinking funds prevents large seasonal or planned expenses from ruining your monthly budget or forcing you to rely on credit cards.',
    formulaExplanation: 'Monthly Savings Requirement = Total Target Amount / Target Number of Months',
    realWorldExample: {
      title: 'Example: Saving for a $2,400 Holiday Trip in 12 Months',
      scenario: 'You plan to take a $2,400 vacation in exactly one year.',
      calculation: 'Monthly Sinking Fund = $2,400 / 12 months = $200 per month.',
      takeaway: 'Saving $200 per month turns a scary $2,400 bill into a smooth, manageable monthly line item with zero interest debt.'
    },
    longTailKeywords: [
      'how to calculate sinking fund monthly deposit',
      'sinking fund vs emergency fund difference explained',
      'sinking fund calculator for upcoming expenses',
      'budgeting sinking fund categories example',
      'how to save for annual bills monthly breakdown'
    ],
    faqs: [
      { q: 'How is a sinking fund different from an emergency fund?', a: 'An emergency fund is for unknown unexpected events (job loss, medical bill). A sinking fund is for known expected events (vacation, car maintenance, Christmas).' },
      { q: 'Can I have multiple sinking funds at once?', a: 'Yes! Many people maintain separate sinking fund sub-accounts (e.g., Car Repairs, Travel, Annual Taxes, Home Maintenance).' },
      { q: 'Should sinking funds be kept in a high-yield account?', a: 'Yes, keeping sinking funds in a High-Yield Savings Account (HYSA) allows your target money to earn interest while waiting to be spent.' }
    ]
  },
  'latte-factor': {
    title: 'The Latte Factor Micro-Spending Impact',
    summary: 'The Latte Factor, coined by financial author David Bach, demonstrates how small, routine daily expenditures (like a $5 coffee) compound into massive lost wealth when invested over time.',
    historyAndConcept: 'The concept highlights that wealth building is rarely blocked by major one-time purchases; it is eroded by unexamined recurring micro-habits. Diverting $5 per day into a broad market index fund creates compounding interest over decades.',
    whyItMatters: 'It empowers individuals to realize that modest daily frugality can generate financial freedom without requiring a dramatic high income.',
    formulaExplanation: 'Daily Cost × 30 Days × Future Value of Monthly Annuity Compound Formula',
    realWorldExample: {
      title: 'Example: $5 Daily Coffee over 20 Years',
      scenario: 'You spend $5 every day on coffee ($150/month). Instead, you invest $150/month at 8% annual return for 20 years.',
      calculation: 'Total Out of Pocket = $150 × 12 × 20 = $36,000\nInvested Compounded Value = ~$88,300',
      takeaway: 'Eliminating or reducing a $5 daily habit yields over $88,000 in wealth, including $52,300 in free compound interest.'
    },
    longTailKeywords: [
      'latte factor calculator compound growth coffee savings',
      'david bach latte factor formula and example',
      'how small daily expenses affect long term wealth',
      'daily expense investment multiplier calculator',
      'cutting small habit expenses for financial independence'
    ],
    faqs: [
      { q: 'Does the Latte Factor mean I should never buy coffee?', a: 'No! The Latte Factor is a metaphor for mindful spending. The goal is to audit micro-habits that you don\'t truly value and redirect those funds toward compounding wealth.' },
      { q: 'What other micro-expenses fit the Latte Factor?', a: 'Daily takeaway lunches, unused streaming subscriptions, daily rideshares, premium bottled water, and impulse app purchases.' },
      { q: 'What rate of return is used for Latte Factor projections?', a: 'Projections typically use a conservative 7% to 8% annual return, matching historical inflation-adjusted index fund averages.' }
    ]
  }
};
