const fs = require('fs');

const categories = {
  fin: "Financial"
};

const cList = [];

function add(id, name, cat, desc, inputs, calculate) {
  cList.push({
    id, name, category: categories[cat], description: desc, inputs, calculate
  });
}

// 1. Finance (15)
add('emi', 'EMI Calculator', 'fin', 'Calculate Equated Monthly Installment', [
  {id:'p',label:'Principal',type:'number',defaultValue:100000},
  {id:'r',label:'Rate (%)',type:'number',defaultValue:10},
  {id:'t',label:'Time (Years)',type:'number',defaultValue:5}
], `const p=num(v.p); const r=num(v.r)/1200; const t=num(v.t)*12; const emi=(p*r*Math.pow(1+r,t))/(Math.pow(1+r,t)-1) || 0;
const totalPay = emi * t;
const totalInt = totalPay - p;
const chart = { type: 'pie', data: [{name:'Principal', value:p}, {name:'Interest', value:totalInt}] };
return { items: [{label:'EMI',value:emi.toFixed(2),highlight:true}, {label:'Total Interest', value:totalInt.toFixed(2)}], chart };`);

add('simple-interest', 'Simple Interest', 'fin', 'Calculate Simple Interest', [
  {id:'p',label:'Principal',type:'number',defaultValue:10000},
  {id:'r',label:'Rate (%)',type:'number',defaultValue:5},
  {id:'t',label:'Time (Years)',type:'number',defaultValue:5}
], `const res = (num(v.p)*num(v.r)*num(v.t))/100;
const chart = { type: 'pie', data: [{name:'Principal', value:num(v.p)}, {name:'Interest', value:res}] };
return { items: [{label:'Interest',value:res.toFixed(2),highlight:true}, {label:'Total Amount',value:(num(v.p)+res).toFixed(2)}], chart };`);

add('compound-interest', 'Compound Interest', 'fin', 'Calculate Compound Interest', [
  {id:'p',label:'Principal',type:'number',defaultValue:10000},
  {id:'r',label:'Rate (%)',type:'number',defaultValue:5},
  {id:'t',label:'Time (Years)',type:'number',defaultValue:5},
  {id:'n',label:'Compounding Freq (per year)',type:'number',defaultValue:1}
], `const p=num(v.p); const r=num(v.r)/100; const n=num(v.n)||1; const t=num(v.t);
const a = p * Math.pow(1 + (r/n), n*t);
const interest = a - p;
let lineData = [];
for(let i=0; i<=t; i++) { lineData.push({ year: i, balance: p * Math.pow(1 + (r/n), n*i) }); }
const chart = { type: 'line', data: lineData, xAxisKey: 'year', lines: [{key: 'balance', name: 'Balance', color: '#8884d8'}] };
return { items: [{label:'Total Amount',value:a.toFixed(2),highlight:true}, {label:'Interest',value:interest.toFixed(2)}], chart };`);

add('mortgage', 'Mortgage Calculator', 'fin', 'Estimate monthly mortgage payments', [
  {id:'price',label:'Home Price',type:'number',defaultValue:300000},
  {id:'dp',label:'Down Payment',type:'number',defaultValue:60000},
  {id:'r',label:'Interest Rate (%)',type:'number',defaultValue:4},
  {id:'t',label:'Term (Years)',type:'number',defaultValue:30}
], `const p=num(v.price)-num(v.dp); const r=num(v.r)/1200; const t=num(v.t)*12; const m=(p*r*Math.pow(1+r,t))/(Math.pow(1+r,t)-1) || 0;
const totalPay = m * t; const totalInt = totalPay - p;
const chart = { type: 'pie', data: [{name:'Principal', value:p}, {name:'Interest', value:totalInt}, {name:'Down Payment', value:num(v.dp)}] };
return { items: [{label:'Monthly Payment',value:m.toFixed(2),highlight:true}, {label:'Total Interest', value:totalInt.toFixed(2)}], chart };`);

add('roi', 'ROI Calculator', 'fin', 'Calculate Return on Investment', [
  {id:'inv',label:'Amount Invested',type:'number',defaultValue:1000},
  {id:'ret',label:'Amount Returned',type:'number',defaultValue:1200}
], `const i=num(v.inv); const r=num(v.ret); const roi=((r-i)/i)*100 || 0;
const chart = { type: 'bar', data: [{name:'Invested', val:i}, {name:'Returned', val:r}], dataKey:'val', nameKey:'name' };
return { items: [{label:'ROI (%)',value:roi.toFixed(2)+'%',highlight:true}], chart };`);

add('discount', 'Discount Calculator', 'fin', 'Calculate price after discount', [
  {id:'price',label:'Original Price',type:'number',defaultValue:100},
  {id:'disc',label:'Discount (%)',type:'number',defaultValue:20}
], `const p=num(v.price); const d=num(v.disc); const s=p*(d/100); const finalP = p-s;
const chart = { type: 'pie', data: [{name:'Final Price', value:finalP}, {name:'Saved', value:s}] };
return { items: [{label:'Final Price',value:finalP.toFixed(2),highlight:true}, {label:'Saved',value:s.toFixed(2)}], chart };`);

add('sales-tax', 'Sales Tax Calculator', 'fin', 'Calculate total price including tax', [
  {id:'price',label:'Price before tax',type:'number',defaultValue:100},
  {id:'tax',label:'Sales Tax Rate (%)',type:'number',defaultValue:7}
], `const p=num(v.price); const t=num(v.tax); const tx=p*(t/100);
const chart = { type: 'pie', data: [{name:'Base Price', value:p}, {name:'Tax', value:tx}] };
return { items: [{label:'Total Price',value:(p+tx).toFixed(2),highlight:true}, {label:'Tax Amount',value:tx.toFixed(2)}], chart };`);

add('tip', 'Tip Calculator', 'fin', 'Calculate tip and total per person', [
  {id:'bill',label:'Bill Amount',type:'number',defaultValue:50},
  {id:'tip',label:'Tip (%)',type:'number',defaultValue:15},
  {id:'split',label:'Split (Persons)',type:'number',defaultValue:1}
], `const b=num(v.bill); const t=num(v.tip); const s=num(v.split)||1; const tip=b*(t/100); const total=b+tip;
const chart = { type: 'pie', data: [{name:'Bill', value:b}, {name:'Tip', value:tip}] };
return { items: [{label:'Total per person',value:(total/s).toFixed(2),highlight:true}, {label:'Tip per person',value:(tip/s).toFixed(2)}], chart };`);

add('salary', 'Salary Calculator', 'fin', 'Convert between hourly and annual salary', [
  {id:'rate',label:'Hourly Rate',type:'number',defaultValue:25},
  {id:'hours',label:'Hours per Week',type:'number',defaultValue:40}
], `const r=num(v.rate); const h=num(v.hours); const a=r*h*52;
return { items: [{label:'Annual Salary',value:a.toFixed(2),highlight:true}, {label:'Monthly',value:(a/12).toFixed(2)}] };`);

add('inflation', 'Inflation Calculator', 'fin', 'Calculate future value adjusted for inflation', [
  {id:'amount',label:'Current Amount',type:'number',defaultValue:100},
  {id:'rate',label:'Inflation Rate (%)',type:'number',defaultValue:3},
  {id:'years',label:'Years',type:'number',defaultValue:10}
], `const a=num(v.amount); const r=num(v.rate)/100; const y=num(v.years); const f=a*Math.pow(1+r,y);
let lineData = []; for(let i=0; i<=y; i++) { lineData.push({ year: i, cost: a*Math.pow(1+r,i) }); }
const chart = { type: 'line', data: lineData, xAxisKey: 'year', lines: [{key: 'cost', name: 'Cost', color: '#ff7300'}] };
return { items: [{label:'Future Cost',value:f.toFixed(2),highlight:true}], chart };`);

add('profit-margin', 'Profit Margin', 'fin', 'Calculate gross profit margin', [
  {id:'cost',label:'Cost',type:'number',defaultValue:50},
  {id:'revenue',label:'Revenue',type:'number',defaultValue:100}
], `const c=num(v.cost); const r=num(v.revenue); const p=r-c; const m=(p/r)*100 || 0;
const chart = { type: 'pie', data: [{name:'Cost', value:c}, {name:'Profit', value:p}] };
return { items: [{label:'Profit Margin (%)',value:m.toFixed(2)+'%',highlight:true}, {label:'Gross Profit',value:p.toFixed(2)}], chart };`);

add('break-even', 'Break-Even Point', 'fin', 'Calculate break-even units', [
  {id:'fc',label:'Fixed Costs',type:'number',defaultValue:1000},
  {id:'p',label:'Price per Unit',type:'number',defaultValue:50},
  {id:'vc',label:'Variable Cost per Unit',type:'number',defaultValue:30}
], `const fc=num(v.fc); const p=num(v.p); const vc=num(v.vc); const b=fc/(p-vc) || 0;
let lineData = [];
for(let i=0; i<=b*2; i+=Math.max(1, Math.floor(b/5))) { lineData.push({ units: i, revenue: i*p, totalCost: fc + i*vc }); }
const chart = { type: 'line', data: lineData, xAxisKey: 'units', lines: [{key:'revenue', name:'Revenue', color:'#82ca9d'}, {key:'totalCost', name:'Total Cost', color:'#ff7300'}] };
return { items: [{label:'Break-Even Units',value:b.toFixed(2),highlight:true}], chart };`);

add('dti', 'Debt-to-Income', 'fin', 'Calculate Debt-to-Income ratio', [
  {id:'debt',label:'Total Monthly Debt',type:'number',defaultValue:1500},
  {id:'income',label:'Gross Monthly Income',type:'number',defaultValue:5000}
], `const d=num(v.debt); const i=num(v.income); const r=(d/i)*100 || 0;
const chart = { type: 'pie', data: [{name:'Debt', value:d}, {name:'Remaining Income', value:Math.max(0,i-d)}] };
return { items: [{label:'DTI Ratio (%)',value:r.toFixed(2)+'%',highlight:true}], chart };`);

add('rule72', 'Rule of 72', 'fin', 'Estimate time to double investment', [
  {id:'rate',label:'Annual Interest Rate (%)',type:'number',defaultValue:6}
], `const r=num(v.rate); const t=72/r || 0;
return { items: [{label:'Years to Double',value:t.toFixed(2),highlight:true}] };`);

add('auto-loan', 'Auto Loan', 'fin', 'Calculate car loan monthly payment', [
  {id:'price',label:'Car Price',type:'number',defaultValue:25000},
  {id:'dp',label:'Down Payment',type:'number',defaultValue:5000},
  {id:'r',label:'Interest Rate (%)',type:'number',defaultValue:5},
  {id:'t',label:'Term (Months)',type:'number',defaultValue:60}
], `const p=num(v.price)-num(v.dp); const r=num(v.r)/1200; const t=num(v.t); const m=(p*r*Math.pow(1+r,t))/(Math.pow(1+r,t)-1) || 0;
const totalPay = m * t; const totalInt = totalPay - p;
const chart = { type: 'pie', data: [{name:'Principal', value:p}, {name:'Interest', value:totalInt}] };
return { items: [{label:'Monthly Payment',value:m.toFixed(2),highlight:true}], chart };`);


if (!fs.existsSync('lib')) {
  fs.mkdirSync('lib');
}

let out = `export interface CalcInput { id: string; label: string; type: 'number'|'text'|'select'; options?: {label:string; value:string}[]; defaultValue?: string|number; }
export interface CalcResultItem { label: string; value: string; highlight?: boolean; }
export interface CalcChartData { type: 'pie' | 'bar' | 'line'; data: any[]; dataKey?: string; nameKey?: string; xAxisKey?: string; lines?: {key: string; name: string; color: string}[]; }
export interface CalcResult { items: CalcResultItem[]; chart?: CalcChartData; }
export interface Calculator { id: string; name: string; category: string; description: string; inputs: CalcInput[]; calculate: (v: any) => CalcResult; }

const num = (v: any) => Number(v) || 0;

export const calculators: Calculator[] = [\n`;

cList.forEach((c, idx) => {
  out += `  {
    id: "${c.id}", name: "${c.name}", category: "${c.category}", description: "${c.description}",
    inputs: ${JSON.stringify(c.inputs)},
    calculate: (v) => { try { ${c.calculate} } catch(e) { return { items: [{label:'Error', value:'Invalid input'}] }; } }
  }${idx < cList.length - 1 ? ',' : ''}\n`;
});
out += '];\n';

fs.writeFileSync('lib/calculators.ts', out);
console.log('Created lib/calculators.ts with ' + cList.length + ' calculators');
