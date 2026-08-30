export type CalculatorFormulaData = { formulas: string[]; vars: string[] };

export const calculatorFormulas: Record<string, CalculatorFormulaData> = {
  "budget-50-30-20": {
    "formulas": [
      "Needs = ((I)×0.5)",
      "Wants = ((I)×0.3)",
      "Savings = ((I)×0.2)"
    ],
    "vars": [
      "I = Monthly Income"
    ]
  },
  "emergency-fund": {
    "formulas": [
      "Target Fund = (E×M)"
    ],
    "vars": [
      "E = Monthly Expenses",
      "M = Months"
    ]
  },
  "net-worth": {
    "formulas": [
      "Net Worth = (A−L)"
    ],
    "vars": [
      "A = Assets",
      "L = Liabilities"
    ]
  },
  "cost-of-living": {
    "formulas": [
      "Required Salary = ((S÷O)×N)"
    ],
    "vars": [
      "S = Current Salary",
      "O = Old City Index",
      "N = New City Index"
    ]
  },
  "discretionary-income": {
    "formulas": [
      "Discretionary Income = (I−T−E)"
    ],
    "vars": [
      "I = Income",
      "T = Taxes",
      "E = Essentials"
    ]
  },
  "sinking-fund": {
    "formulas": [
      "Monthly Saving = (G÷M)"
    ],
    "vars": [
      "G = Goal Amount",
      "M = Months"
    ]
  },
  "latte-factor": {
    "formulas": [
      "Future Value = ((D×30)×(((1+(R÷1200))^((Y×12))−1)÷(R÷1200)))"
    ],
    "vars": [
      "D = Daily Cost",
      "Y = Years",
      "R = Return (%)"
    ]
  },
  "family-budget": {
    "formulas": [
      "Household Savings = (I1+I2−E)"
    ],
    "vars": [
      "I1 = Income 1",
      "I2 = Income 2",
      "E = Expenses"
    ]
  },
  "subscription-cost": {
    "formulas": [
      "Annual Cost = (M×12)"
    ],
    "vars": [
      "M = Monthly Subs"
    ]
  },
  "healthcare-cost": {
    "formulas": [
      "Max Out of Pocket = (P+D)"
    ],
    "vars": [
      "P = Premium (Ann)",
      "D = Deductible"
    ]
  },
  "envelope-budget": {
    "formulas": [
      "Per Envelope = (I÷C)"
    ],
    "vars": [
      "I = Cash to allocate",
      "C = Num Envelopes"
    ]
  },
  "roi": {
    "formulas": [
      "ROI (%) = (((R−I)÷I)×100)"
    ],
    "vars": [
      "I = Invested",
      "R = Returned"
    ]
  },
  "cagr": {
    "formulas": [
      "CAGR (%) = (((E÷B)^(1÷Y) − 1)×100)"
    ],
    "vars": [
      "B = Beginning Value",
      "E = Ending Value",
      "Y = Years"
    ]
  },
  "dividend-yield": {
    "formulas": [
      "Dividend Yield (%) = ((D÷P)×100)"
    ],
    "vars": [
      "D = Annual Dividend",
      "P = Stock Price"
    ]
  },
  "rule-of-72": {
    "formulas": [
      "Years to Double = (72÷R)"
    ],
    "vars": [
      "R = Interest Rate (%)"
    ]
  },
  "capital-gains": {
    "formulas": [
      "Capital Gain = (S−P)"
    ],
    "vars": [
      "P = Purchase Price",
      "S = Sale Price"
    ]
  },
  "real-return": {
    "formulas": [
      "Real Return (%) = (((1+R÷100)÷(1+I÷100)−1)×100)"
    ],
    "vars": [
      "R = Nominal Return (%)",
      "I = Inflation Rate (%)"
    ]
  },
  "apy": {
    "formulas": [
      "APY (%) = (((1+(R÷100)÷N)^(N)−1)×100)"
    ],
    "vars": [
      "R = Interest Rate (%)",
      "N = Compounds/Year"
    ]
  },
  "stock-average": {
    "formulas": [
      "Average Price = ((P1×Q1+P2×Q2)÷(Q1+Q2))"
    ],
    "vars": [
      "P1 = Price 1",
      "Q1 = Qty 1",
      "P2 = Price 2",
      "Q2 = Qty 2"
    ]
  },
  "mutual-fund": {
    "formulas": [
      "Future Value = (P×(1+R÷100)^(T))"
    ],
    "vars": [
      "P = Principal",
      "R = Expected Return (%)",
      "T = Years"
    ]
  },
  "bond-yield": {
    "formulas": [
      "Current Yield (%) = ((C÷P)×100)"
    ],
    "vars": [
      "C = Annual Coupon Payment",
      "P = Current Market Price"
    ]
  },
  "sip": {
    "formulas": [
      "Future Value = (M× (((1+(R÷1200))^((Y×12))−1)÷(R÷1200)) × (1+(R÷1200)))"
    ],
    "vars": [
      "M = Monthly Inv",
      "R = Annual Return (%)",
      "Y = Years"
    ]
  },
  "lumpsum": {
    "formulas": [
      "Future Value = (P×(1+R÷100)^(Y))"
    ],
    "vars": [
      "P = Amount",
      "R = Return (%)",
      "Y = Years"
    ]
  },
  "option-profit": {
    "formulas": [
      "Profit = (V−P)"
    ],
    "vars": [
      "P = Premium Paid",
      "V = Option Value at close"
    ]
  },
  "crypto-roi": {
    "formulas": [
      "Profit = ((F−I)×Q)"
    ],
    "vars": [
      "I = Initial Price",
      "F = Final Price",
      "Q = Coins"
    ]
  },
  "asset-allocation": {
    "formulas": [
      "Stocks % = (110−A).toString()",
      "Bonds % = (100−(110−A)).toString()"
    ],
    "vars": [
      "A = Age"
    ]
  },
  "emi": {
    "formulas": [
      "EMI = (((P)×(R÷1200)×(1+(R÷1200))^((T×12)))÷((1+(R÷1200))^((T×12))−1) || 0)"
    ],
    "vars": [
      "P = Principal",
      "R = Rate (%)",
      "T = Years"
    ]
  },
  "loan-payoff": {
    "formulas": [
      "Months to Payoff = (−ln(1 − ((R÷1200)×B)÷P)÷ln(1+(R÷1200)))"
    ],
    "vars": [
      "B = Balance",
      "R = Rate (%)",
      "P = Monthly Payment"
    ]
  },
  "simple-interest": {
    "formulas": [
      "Total Interest = ((P×R×T)÷100)"
    ],
    "vars": [
      "P = Principal",
      "R = Rate (%)",
      "T = Years"
    ]
  },
  "compound-interest": {
    "formulas": [
      "Total Amount = (P×(1+(R÷100)÷N)^(N×T))"
    ],
    "vars": [
      "P = Principal",
      "R = Rate (%)",
      "T = Years",
      "N = Compounds/Yr"
    ]
  },
  "amortization": {
    "formulas": [
      "Month 1 Interest = ((B×(R÷1200)))",
      "Month 1 Principal = (P−((B×(R÷1200))))"
    ],
    "vars": [
      "B = Loan Balance",
      "R = Rate (%)",
      "P = Monthly Payment"
    ]
  },
  "refinance": {
    "formulas": [
      "Monthly Savings = (OP−NP)",
      "Annual Savings = ((OP−NP)×12)"
    ],
    "vars": [
      "OP = Old Payment",
      "NP = New Payment"
    ]
  },
  "auto-loan": {
    "formulas": [
      "Monthly Payment = (((P−D)×(R÷1200)×(1+(R÷1200))^(T))÷((1+(R÷1200))^(T)−1) || 0)"
    ],
    "vars": [
      "P = Car Price",
      "D = Down Payment",
      "R = Rate (%)",
      "T = Months"
    ]
  },
  "student-loan": {
    "formulas": [
      "Monthly Payment = (((B)×(R÷1200)×(1+(R÷1200))^((T×12)))÷((1+(R÷1200))^((T×12))−1) || 0)"
    ],
    "vars": [
      "B = Balance",
      "R = Rate (%)",
      "T = Years"
    ]
  },
  "personal-loan": {
    "formulas": [
      "Monthly Payment = (((A)×(R÷1200)×(1+(R÷1200))^(M))÷((1+(R÷1200))^(M)−1) || 0)"
    ],
    "vars": [
      "A = Amount",
      "R = Rate (%)",
      "M = Months"
    ]
  },
  "debt-consolidation": {
    "formulas": [
      "New Payment = (((D1+D2)×(NR÷1200)×(1+(NR÷1200))^(NM))÷((1+(NR÷1200))^(NM)−1) || 0)"
    ],
    "vars": [
      "D1 = Debt 1",
      "D2 = Debt 2",
      "NR = New Rate (%)",
      "NM = New Months"
    ]
  },
  "interest-only": {
    "formulas": [
      "Monthly Payment = ((B×(R÷100))÷12)"
    ],
    "vars": [
      "B = Balance",
      "R = Rate (%)"
    ]
  },
  "overpayment": {
    "formulas": [
      "Months Saved = ((−ln(1−((R÷1200)×B)÷P)÷ln(1+(R÷1200)))−(−ln(1−((R÷1200)×B)÷(P+O))÷ln(1+(R÷1200))))"
    ],
    "vars": [
      "B = Balance",
      "R = Rate (%)",
      "P = Current Payment",
      "O = Overpayment"
    ]
  },
  "loan-apr": {
    "formulas": [
      "Est. APR (%) = (R + (F÷A)×100)"
    ],
    "vars": [
      "A = Loan Amount",
      "F = Fees",
      "R = Stated Rate (%)"
    ]
  },
  "guarantor-loan": {
    "formulas": [
      "Monthly Payment = (((A)×(R÷1200)×(1+(R÷1200))^(M))÷((1+(R÷1200))^(M)−1) || 0)"
    ],
    "vars": [
      "A = Amount",
      "R = Rate (%)",
      "M = Months"
    ]
  },
  "balloon-payment": {
    "formulas": [
      "Balloon Payment = ((A)×(1+(R÷1200))^((BT×12)) − ((((A)×(R÷1200)×(1+(R÷1200))^((AM×12)))÷((1+(R÷1200))^((AM×12))−1))÷(R÷1200))×((1+(R÷1200))^((BT×12))−1))"
    ],
    "vars": [
      "A = Amount",
      "R = Rate (%)",
      "AM = Amortization (Yrs)",
      "BT = Balloon Term (Yrs)"
    ]
  },
  "mortgage": {
    "formulas": [
      "Monthly Payment = (((P−D)×(R÷1200)×(1+(R÷1200))^((Y×12)))÷((1+(R÷1200))^((Y×12))−1))"
    ],
    "vars": [
      "P = Home Price",
      "D = Down Payment",
      "R = Rate (%)",
      "Y = Years"
    ]
  },
  "down-payment": {
    "formulas": [
      "Down Payment = (P×(PCT÷100))"
    ],
    "vars": [
      "P = Price",
      "PCT = Percentage (%)"
    ]
  },
  "rent-vs-buy": {
    "formulas": [
      "Buy Cost = (M+T)",
      "Rent Cost = R"
    ],
    "vars": [
      "R = Monthly Rent",
      "M = Est. Mortgage",
      "T = Taxes+Ins"
    ]
  },
  "affordability": {
    "formulas": [
      "Max Mortgage Pmt = (max(0, ((I×0.28))−D))"
    ],
    "vars": [
      "I = Gross Monthly Income",
      "D = Monthly Debts"
    ]
  },
  "rental-yield": {
    "formulas": [
      "Yield (%) = (((R×12)÷P)×100)"
    ],
    "vars": [
      "R = Monthly Rent",
      "P = Property Price"
    ]
  },
  "property-tax": {
    "formulas": [
      "Annual Tax = (V×(R÷100))"
    ],
    "vars": [
      "V = Assessed Value",
      "R = Tax Rate (%)"
    ]
  },
  "stamp-duty": {
    "formulas": [
      "Stamp Duty = (P×(R÷100))"
    ],
    "vars": [
      "P = Property Price",
      "R = Rate (%)"
    ]
  },
  "house-appreciation": {
    "formulas": [
      "Future Value = (P×(1+R÷100)^(Y))"
    ],
    "vars": [
      "P = Current Price",
      "R = Annual Growth (%)",
      "Y = Years"
    ]
  },
  "roi-property": {
    "formulas": [
      "Cash-on-Cash ROI (%) = ((CF÷C)×100)"
    ],
    "vars": [
      "C = Cash Invested",
      "CF = Annual Cash Flow"
    ]
  },
  "cap-rate": {
    "formulas": [
      "Cap Rate (%) = ((NOI÷V)×100)"
    ],
    "vars": [
      "NOI = Net Operating Income",
      "V = Property Value"
    ]
  },
  "ltv": {
    "formulas": [
      "LTV (%) = ((L÷V)×100)"
    ],
    "vars": [
      "L = Loan Amount",
      "V = Property Value"
    ]
  },
  "closing-costs": {
    "formulas": [
      "Est. Closing Costs = (P×0.03)"
    ],
    "vars": [
      "P = Property Price"
    ]
  },
  "income-tax": {
    "formulas": [
      "Tax Amount = (I×(R÷100))"
    ],
    "vars": [
      "I = Gross Income",
      "R = Tax Rate (%)"
    ]
  },
  "sales-tax": {
    "formulas": [
      "Total Price = (P+(P×(R÷100)))"
    ],
    "vars": [
      "P = Price",
      "R = Tax Rate (%)"
    ]
  },
  "vat": {
    "formulas": [
      "Net Price = (G÷(1+R÷100))",
      "VAT Amount = (G−(G÷(1+R÷100)))"
    ],
    "vars": [
      "G = Gross Price",
      "R = VAT Rate (%)"
    ]
  },
  "gst": {
    "formulas": [
      "Total with GST = (A+(A×(R÷100)))"
    ],
    "vars": [
      "A = Amount",
      "R = GST (%)"
    ]
  },
  "salary-hourly": {
    "formulas": [
      "Hourly Rate = (S÷(H×52))"
    ],
    "vars": [
      "S = Annual Salary",
      "H = Hours/Week"
    ]
  },
  "hourly-salary": {
    "formulas": [
      "Annual Salary = (R×H×52)"
    ],
    "vars": [
      "R = Hourly Rate",
      "H = Hours/Week"
    ]
  },
  "tax-bracket": {
    "formulas": [
      "Effective Rate (%) = ((((I)>50000 ? 5000+((I)−50000)×0.2 : (I)×0.1)÷(I))×100)"
    ],
    "vars": [
      "I = Income"
    ]
  },
  "take-home": {
    "formulas": [
      "Take Home = (G×(1−D÷100))"
    ],
    "vars": [
      "G = Gross Pay",
      "D = Deductions %"
    ]
  },
  "capital-gains-tax": {
    "formulas": [
      "Est. Tax = (G×0.15)"
    ],
    "vars": [
      "G = Capital Gain"
    ]
  },
  "self-employment-tax": {
    "formulas": [
      "SE Tax = (I×0.153)"
    ],
    "vars": [
      "I = Net Earnings"
    ]
  },
  "break-even": {
    "formulas": [
      "Break Even Units = (FC÷(P−VC))"
    ],
    "vars": [
      "FC = Fixed Costs",
      "P = Price/Unit",
      "VC = Var Cost/Unit"
    ]
  },
  "gross-margin": {
    "formulas": [
      "Gross Margin (%) = (((R−C)÷R)×100)"
    ],
    "vars": [
      "R = Revenue",
      "C = COGS"
    ]
  },
  "net-margin": {
    "formulas": [
      "Net Margin (%) = ((N÷R)×100)"
    ],
    "vars": [
      "R = Revenue",
      "N = Net Profit"
    ]
  },
  "operating-margin": {
    "formulas": [
      "Operating Margin (%) = ((O÷R)×100)"
    ],
    "vars": [
      "R = Revenue",
      "O = Operating Income"
    ]
  },
  "markup": {
    "formulas": [
      "Selling Price = (C×(1+M÷100))"
    ],
    "vars": [
      "C = Cost",
      "M = Markup %"
    ]
  },
  "burn-rate": {
    "formulas": [
      "Monthly Burn Rate = ((S−E)÷M)"
    ],
    "vars": [
      "S = Starting Cash",
      "E = Ending Cash",
      "M = Months"
    ]
  },
  "runway": {
    "formulas": [
      "Runway (Months) = (C÷B)"
    ],
    "vars": [
      "C = Current Cash",
      "B = Monthly Burn"
    ]
  },
  "cac": {
    "formulas": [
      "CAC = (M÷C)"
    ],
    "vars": [
      "M = Marketing Spend",
      "C = New Customers"
    ]
  },
  "ltv-biz": {
    "formulas": [
      "LTV = (ARPU÷(CHURN÷100))"
    ],
    "vars": [
      "ARPU = Avg Rev Per User",
      "CHURN = Monthly Churn (%)"
    ]
  },
  "ebitda": {
    "formulas": [
      "EBITDA = (N+T+I+D)"
    ],
    "vars": [
      "N = Net Income",
      "T = Taxes",
      "I = Interest",
      "D = Depreciation"
    ]
  },
  "cash-flow": {
    "formulas": [
      "Free Cash Flow = (O−C)"
    ],
    "vars": [
      "O = Operating Cash Flow",
      "C = CapEx"
    ]
  },
  "working-capital": {
    "formulas": [
      "Working Capital = (A−L)"
    ],
    "vars": [
      "A = Current Assets",
      "L = Current Liabs"
    ]
  },
  "inventory-turnover": {
    "formulas": [
      "Turnover Ratio = (C÷I)"
    ],
    "vars": [
      "C = COGS",
      "I = Avg Inventory"
    ]
  },
  "quick-ratio": {
    "formulas": [
      "Quick Ratio = ((A−I)÷L)"
    ],
    "vars": [
      "A = Current Assets",
      "I = Inventory",
      "L = Current Liabs"
    ]
  },
  "current-ratio": {
    "formulas": [
      "Current Ratio = (A÷L)"
    ],
    "vars": [
      "A = Current Assets",
      "L = Current Liabs"
    ]
  },
  "retirement-corpus": {
    "formulas": [
      "Target Corpus = (E÷(W÷100))"
    ],
    "vars": [
      "E = Annual Expenses",
      "W = Withdrawal Rate (%)"
    ]
  },
  "401k": {
    "formulas": [
      "Balance = (C×(((1+(R÷1200))^((Y×12))−1)÷(R÷1200)))"
    ],
    "vars": [
      "C = Monthly Contrib",
      "R = Return (%)",
      "Y = Years"
    ]
  },
  "pension": {
    "formulas": [
      "Annual Pension = (Y×(M÷100)×S)"
    ],
    "vars": [
      "Y = Years of Service",
      "S = Final Salary",
      "M = Multiplier (%)"
    ]
  },
  "fire": {
    "formulas": [
      "FIRE Number = (M×12×25)"
    ],
    "vars": [
      "M = Monthly Expenses"
    ]
  },
  "social-security": {
    "formulas": [
      "Est Monthly Benefit = ((I÷12)×0.4)"
    ],
    "vars": [
      "I = Avg Annual Income"
    ]
  },
  "rmd": {
    "formulas": [
      "RMD Amount = (B÷F)"
    ],
    "vars": [
      "B = Account Balance",
      "F = Life Expectancy Factor"
    ]
  },
  "retirement-savings": {
    "formulas": [
      "Monthly Savings = ((G×(R÷1200))÷((1+(R÷1200))^((Y×12))−1))"
    ],
    "vars": [
      "G = Goal Amount",
      "Y = Years",
      "R = Return (%)"
    ]
  },
  "post-retirement": {
    "formulas": [
      "Monthly Income = ((C×(R÷100))÷12)"
    ],
    "vars": [
      "C = Corpus",
      "R = Return (%)"
    ]
  },
  "annuity": {
    "formulas": [
      "Present Value = (P×((1−(1+(R÷100))^(−Y))÷(R÷100)))"
    ],
    "vars": [
      "P = Payment",
      "R = Rate (%)",
      "Y = Years"
    ]
  },
  "inflation-retirement": {
    "formulas": [
      "Today\\ = (F÷(1+I÷100)^(Y))"
    ],
    "vars": [
      "F = Future Value",
      "I = Inflation (%)",
      "Y = Years"
    ]
  },
  "savings-goal": {
    "formulas": [
      "Months = (G÷S)"
    ],
    "vars": [
      "G = Goal",
      "S = Monthly Save"
    ]
  },
  "cd-ladder": {
    "formulas": [
      "Avg Yield (%) = ((R1+R2+R3)÷3)"
    ],
    "vars": [
      "R1 = CD 1 Rate (%)",
      "R2 = CD 2 Rate (%)",
      "R3 = CD 3 Rate (%)"
    ]
  },
  "money-market": {
    "formulas": [
      "Annual Interest = (B×(R÷100))"
    ],
    "vars": [
      "B = Balance",
      "R = APY (%)"
    ]
  },
  "overdraft": {
    "formulas": [
      "Total Fees = (F×D)"
    ],
    "vars": [
      "F = Fee per Day",
      "D = Days"
    ]
  },
  "cheque-bounce": {
    "formulas": [
      "Penalty = (A×(P÷100))"
    ],
    "vars": [
      "A = Amount",
      "P = Penalty (%)"
    ]
  },
  "rate-converter": {
    "formulas": [
      "Annual Rate (%) = (R×12)"
    ],
    "vars": [
      "R = Monthly Rate (%)"
    ]
  },
  "compounding-freq": {
    "formulas": [
      "Annual Gain = ((P×(1+(R÷100))^(1))−P)",
      "Daily Comp. Gain = ((P×(1+(R÷100)÷365)^(365))−P)"
    ],
    "vars": [
      "P = Principal",
      "R = Rate (%)"
    ]
  },
  "time-deposit": {
    "formulas": [
      "Maturity Value = (P+((P×(R÷100)×(M÷12))))"
    ],
    "vars": [
      "P = Principal",
      "R = Rate (%)",
      "M = Months"
    ]
  },
  "cc-payoff": {
    "formulas": [
      "Months = (−ln(1−((R÷1200)×B)÷P)÷ln(1+(R÷1200)))>0?(−ln(1−((R÷1200)×B)÷P)÷ln(1+(R÷1200))):'Never'"
    ],
    "vars": [
      "B = Balance",
      "R = APR (%)",
      "P = Monthly Pay"
    ]
  },
  "min-payment": {
    "formulas": [
      "Min Payment = (max(25, B×0.02))"
    ],
    "vars": [
      "B = Balance"
    ]
  },
  "cc-interest": {
    "formulas": [
      "Monthly Interest = (B×(R÷1200))"
    ],
    "vars": [
      "B = Balance",
      "R = APR (%)"
    ]
  },
  "dti": {
    "formulas": [
      "DTI Ratio (%) = ((D÷I)×100)"
    ],
    "vars": [
      "D = Total Debt Pmts",
      "I = Gross Income"
    ]
  },
  "credit-utilization": {
    "formulas": [
      "Utilization (%) = ((U÷A)×100)"
    ],
    "vars": [
      "U = Used Credit",
      "A = Total Limit"
    ]
  },
  "balance-transfer": {
    "formulas": [
      "Transfer Fee = (B×(F÷100))"
    ],
    "vars": [
      "B = Balance",
      "F = Transfer Fee (%)"
    ]
  }
};
