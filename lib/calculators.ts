export interface CalcInput { id: string; label: string; type: 'number'|'text'|'select'; options?: {label:string; value:string}[]; defaultValue?: string|number; }
export interface CalcResultItem { label: string; value: string; highlight?: boolean; }
export interface CalcChartData { type: 'pie' | 'bar' | 'line'; data: any[]; dataKey?: string; nameKey?: string; xAxisKey?: string; lines?: {key: string; name: string; color: string}[]; }
export interface CalcResult { items: CalcResultItem[]; chart?: CalcChartData; }
export interface Calculator { id: string; name: string; category: string; description: string; inputs: CalcInput[]; calculate: (v: any) => CalcResult; }

const num = (v: any) => Number(v) || 0;

export const calculators: Calculator[] = [
  {
    id: "budget-50-30-20", name: "50/30/20 Budget", category: "Personal Finance", description: "See how much of your take-home pay can go to needs, wants, and savings using the simple 50/30/20 split",
    inputs: [{"id":"i","label":"Monthly Income","type":"number","defaultValue":5000}],
    calculate: (v) => { 
      try { 
        const fn = (v: any) => { const i=num(v.i); const chart={type:'pie',data:[{name:'Needs',value:i*0.5},{name:'Wants',value:i*0.3},{name:'Savings',value:i*0.2}]}; return {items:[{label:'Needs',value:(i*0.5).toFixed(2)},{label:'Wants',value:(i*0.3).toFixed(2)},{label:'Savings',value:(i*0.2).toFixed(2),highlight:true}], chart}; };
        let res: any = fn(v);
        if (!res.chart && res.items && res.items.length > 0) {
          let chartData = res.items.map((item: any) => ({
            name: item.label.replace(/\([^)]+\)/g, '').trim(),
            val: parseFloat(item.value.toString().replace(/[^0-9.-]+/g,"")) || 0
          }));
          if (chartData.length === 1) {
             const inputDefs = [{"id":"i","label":"Monthly Income","type":"number","defaultValue":5000}];
             const inputData = inputDefs.map((inp: any) => ({
               name: inp.label.replace(/\([^)]+\)/g, '').trim(),
               val: parseFloat(v[inp.id]) || 0
             }));
             const maxItem = chartData[0].val || 1;
             const filteredInputs = inputData.filter((inp: any) => inp.val > Math.abs(maxItem) * 0.01 && inp.val <= Math.abs(maxItem) * 100);
             res.chart = { type: 'bar', data: [...filteredInputs, chartData[0]], dataKey: 'val', nameKey: 'name' };
          } else {
             const allPositive = chartData.every((d: any) => d.val >= 0);
             const isPie = allPositive && chartData.length <= 4;
             res.chart = { type: isPie ? 'pie' : 'bar', data: chartData, dataKey: 'val', nameKey: 'name' };
          }
        }
        return res as any;
      } catch(e) { return { items: [{label:'Error', value:'Invalid input'}] }; } 
    }
  },
  {
    id: "emergency-fund", name: "Emergency Fund", category: "Personal Finance", description: "Figure out a realistic cash cushion for unexpected bills based on your monthly spending",
    inputs: [{"id":"e","label":"Monthly Expenses","type":"number","defaultValue":3000},{"id":"m","label":"Months","type":"number","defaultValue":6}],
    calculate: (v) => { 
      try { 
        const fn = (v: any) => { const f=num(v.e)*num(v.m); return {items:[{label:'Target Fund',value:f.toFixed(2),highlight:true}]}; };
        let res: any = fn(v);
        if (!res.chart && res.items && res.items.length > 0) {
          let chartData = res.items.map((item: any) => ({
            name: item.label.replace(/\([^)]+\)/g, '').trim(),
            val: parseFloat(item.value.toString().replace(/[^0-9.-]+/g,"")) || 0
          }));
          if (chartData.length === 1) {
             const inputDefs = [{"id":"e","label":"Monthly Expenses","type":"number","defaultValue":3000},{"id":"m","label":"Months","type":"number","defaultValue":6}];
             const inputData = inputDefs.map((inp: any) => ({
               name: inp.label.replace(/\([^)]+\)/g, '').trim(),
               val: parseFloat(v[inp.id]) || 0
             }));
             const maxItem = chartData[0].val || 1;
             const filteredInputs = inputData.filter((inp: any) => inp.val > Math.abs(maxItem) * 0.01 && inp.val <= Math.abs(maxItem) * 100);
             res.chart = { type: 'bar', data: [...filteredInputs, chartData[0]], dataKey: 'val', nameKey: 'name' };
          } else {
             const allPositive = chartData.every((d: any) => d.val >= 0);
             const isPie = allPositive && chartData.length <= 4;
             res.chart = { type: isPie ? 'pie' : 'bar', data: chartData, dataKey: 'val', nameKey: 'name' };
          }
        }
        return res as any;
      } catch(e) { return { items: [{label:'Error', value:'Invalid input'}] }; } 
    }
  },
  {
    id: "net-worth", name: "Net Worth", category: "Personal Finance", description: "Add up what you own and subtract what you owe to see where you stand financially",
    inputs: [{"id":"a","label":"Assets","type":"number","defaultValue":150000},{"id":"l","label":"Liabilities","type":"number","defaultValue":50000}],
    calculate: (v) => { 
      try { 
        const fn = (v: any) => { const nw=num(v.a)-num(v.l); const chart={type:'pie',data:[{name:'Assets',value:num(v.a)},{name:'Liabilities',value:num(v.l)}]}; return {items:[{label:'Net Worth',value:nw.toFixed(2),highlight:true}], chart}; };
        let res: any = fn(v);
        if (!res.chart && res.items && res.items.length > 0) {
          let chartData = res.items.map((item: any) => ({
            name: item.label.replace(/\([^)]+\)/g, '').trim(),
            val: parseFloat(item.value.toString().replace(/[^0-9.-]+/g,"")) || 0
          }));
          if (chartData.length === 1) {
             const inputDefs = [{"id":"a","label":"Assets","type":"number","defaultValue":150000},{"id":"l","label":"Liabilities","type":"number","defaultValue":50000}];
             const inputData = inputDefs.map((inp: any) => ({
               name: inp.label.replace(/\([^)]+\)/g, '').trim(),
               val: parseFloat(v[inp.id]) || 0
             }));
             const maxItem = chartData[0].val || 1;
             const filteredInputs = inputData.filter((inp: any) => inp.val > Math.abs(maxItem) * 0.01 && inp.val <= Math.abs(maxItem) * 100);
             res.chart = { type: 'bar', data: [...filteredInputs, chartData[0]], dataKey: 'val', nameKey: 'name' };
          } else {
             const allPositive = chartData.every((d: any) => d.val >= 0);
             const isPie = allPositive && chartData.length <= 4;
             res.chart = { type: isPie ? 'pie' : 'bar', data: chartData, dataKey: 'val', nameKey: 'name' };
          }
        }
        return res as any;
      } catch(e) { return { items: [{label:'Error', value:'Invalid input'}] }; } 
    }
  },
  {
    id: "cost-of-living", name: "Cost of Living Adjust", category: "Personal Finance", description: "Compare what your current salary would need to be in another city to keep the same lifestyle",
    inputs: [{"id":"s","label":"Current Salary","type":"number","defaultValue":60000},{"id":"o","label":"Old City Index","type":"number","defaultValue":100},{"id":"n","label":"New City Index","type":"number","defaultValue":120}],
    calculate: (v) => { 
      try { 
        const fn = (v: any) => { const s=(num(v.s)/num(v.o))*num(v.n); return {items:[{label:'Required Salary',value:s.toFixed(2),highlight:true}]}; };
        let res: any = fn(v);
        if (!res.chart && res.items && res.items.length > 0) {
          let chartData = res.items.map((item: any) => ({
            name: item.label.replace(/\([^)]+\)/g, '').trim(),
            val: parseFloat(item.value.toString().replace(/[^0-9.-]+/g,"")) || 0
          }));
          if (chartData.length === 1) {
             const inputDefs = [{"id":"s","label":"Current Salary","type":"number","defaultValue":60000},{"id":"o","label":"Old City Index","type":"number","defaultValue":100},{"id":"n","label":"New City Index","type":"number","defaultValue":120}];
             const inputData = inputDefs.map((inp: any) => ({
               name: inp.label.replace(/\([^)]+\)/g, '').trim(),
               val: parseFloat(v[inp.id]) || 0
             }));
             const maxItem = chartData[0].val || 1;
             const filteredInputs = inputData.filter((inp: any) => inp.val > Math.abs(maxItem) * 0.01 && inp.val <= Math.abs(maxItem) * 100);
             res.chart = { type: 'bar', data: [...filteredInputs, chartData[0]], dataKey: 'val', nameKey: 'name' };
          } else {
             const allPositive = chartData.every((d: any) => d.val >= 0);
             const isPie = allPositive && chartData.length <= 4;
             res.chart = { type: isPie ? 'pie' : 'bar', data: chartData, dataKey: 'val', nameKey: 'name' };
          }
        }
        return res as any;
      } catch(e) { return { items: [{label:'Error', value:'Invalid input'}] }; } 
    }
  },
  {
    id: "discretionary-income", name: "Discretionary Income", category: "Personal Finance", description: "Find out how much money is left each month after taxes and must-pay bills",
    inputs: [{"id":"i","label":"Income","type":"number","defaultValue":5000},{"id":"t","label":"Taxes","type":"number","defaultValue":1000},{"id":"e","label":"Essentials","type":"number","defaultValue":2000}],
    calculate: (v) => { 
      try { 
        const fn = (v: any) => { const d=num(v.i)-num(v.t)-num(v.e); const chart={type:'pie',data:[{name:'Taxes',value:num(v.t)},{name:'Essentials',value:num(v.e)},{name:'Discretionary',value:d}]}; return {items:[{label:'Discretionary Income',value:d.toFixed(2),highlight:true}], chart}; };
        let res: any = fn(v);
        if (!res.chart && res.items && res.items.length > 0) {
          let chartData = res.items.map((item: any) => ({
            name: item.label.replace(/\([^)]+\)/g, '').trim(),
            val: parseFloat(item.value.toString().replace(/[^0-9.-]+/g,"")) || 0
          }));
          if (chartData.length === 1) {
             const inputDefs = [{"id":"i","label":"Income","type":"number","defaultValue":5000},{"id":"t","label":"Taxes","type":"number","defaultValue":1000},{"id":"e","label":"Essentials","type":"number","defaultValue":2000}];
             const inputData = inputDefs.map((inp: any) => ({
               name: inp.label.replace(/\([^)]+\)/g, '').trim(),
               val: parseFloat(v[inp.id]) || 0
             }));
             const maxItem = chartData[0].val || 1;
             const filteredInputs = inputData.filter((inp: any) => inp.val > Math.abs(maxItem) * 0.01 && inp.val <= Math.abs(maxItem) * 100);
             res.chart = { type: 'bar', data: [...filteredInputs, chartData[0]], dataKey: 'val', nameKey: 'name' };
          } else {
             const allPositive = chartData.every((d: any) => d.val >= 0);
             const isPie = allPositive && chartData.length <= 4;
             res.chart = { type: isPie ? 'pie' : 'bar', data: chartData, dataKey: 'val', nameKey: 'name' };
          }
        }
        return res as any;
      } catch(e) { return { items: [{label:'Error', value:'Invalid input'}] }; } 
    }
  },
  {
    id: "sinking-fund", name: "Sinking Fund", category: "Personal Finance", description: "Plan monthly set-asides so a future expense does not wipe out your checking account",
    inputs: [{"id":"g","label":"Goal Amount","type":"number","defaultValue":1200},{"id":"m","label":"Months","type":"number","defaultValue":12}],
    calculate: (v) => { 
      try { 
        const fn = (v: any) => { const m=num(v.g)/num(v.m); return {items:[{label:'Monthly Saving',value:m.toFixed(2),highlight:true}]}; };
        let res: any = fn(v);
        if (!res.chart && res.items && res.items.length > 0) {
          let chartData = res.items.map((item: any) => ({
            name: item.label.replace(/\([^)]+\)/g, '').trim(),
            val: parseFloat(item.value.toString().replace(/[^0-9.-]+/g,"")) || 0
          }));
          if (chartData.length === 1) {
             const inputDefs = [{"id":"g","label":"Goal Amount","type":"number","defaultValue":1200},{"id":"m","label":"Months","type":"number","defaultValue":12}];
             const inputData = inputDefs.map((inp: any) => ({
               name: inp.label.replace(/\([^)]+\)/g, '').trim(),
               val: parseFloat(v[inp.id]) || 0
             }));
             const maxItem = chartData[0].val || 1;
             const filteredInputs = inputData.filter((inp: any) => inp.val > Math.abs(maxItem) * 0.01 && inp.val <= Math.abs(maxItem) * 100);
             res.chart = { type: 'bar', data: [...filteredInputs, chartData[0]], dataKey: 'val', nameKey: 'name' };
          } else {
             const allPositive = chartData.every((d: any) => d.val >= 0);
             const isPie = allPositive && chartData.length <= 4;
             res.chart = { type: isPie ? 'pie' : 'bar', data: chartData, dataKey: 'val', nameKey: 'name' };
          }
        }
        return res as any;
      } catch(e) { return { items: [{label:'Error', value:'Invalid input'}] }; } 
    }
  },
  {
    id: "latte-factor", name: "Latte Factor", category: "Personal Finance", description: "See what small daily purchases can add up to over a year or longer",
    inputs: [{"id":"d","label":"Daily Cost","type":"number","defaultValue":5},{"id":"y","label":"Years","type":"number","defaultValue":10},{"id":"r","label":"Return (%)","type":"number","defaultValue":7}],
    calculate: (v) => { 
      try { 
        const fn = (v: any) => { const m=num(v.d)*30; const r=num(v.r)/1200; const n=num(v.y)*12; const f=m*((Math.pow(1+r,n)-1)/r); return {items:[{label:'Future Value',value:f.toFixed(2),highlight:true}]}; };
        let res: any = fn(v);
        if (!res.chart && res.items && res.items.length > 0) {
          let chartData = res.items.map((item: any) => ({
            name: item.label.replace(/\([^)]+\)/g, '').trim(),
            val: parseFloat(item.value.toString().replace(/[^0-9.-]+/g,"")) || 0
          }));
          if (chartData.length === 1) {
             const inputDefs = [{"id":"d","label":"Daily Cost","type":"number","defaultValue":5},{"id":"y","label":"Years","type":"number","defaultValue":10},{"id":"r","label":"Return (%)","type":"number","defaultValue":7}];
             const inputData = inputDefs.map((inp: any) => ({
               name: inp.label.replace(/\([^)]+\)/g, '').trim(),
               val: parseFloat(v[inp.id]) || 0
             }));
             const maxItem = chartData[0].val || 1;
             const filteredInputs = inputData.filter((inp: any) => inp.val > Math.abs(maxItem) * 0.01 && inp.val <= Math.abs(maxItem) * 100);
             res.chart = { type: 'bar', data: [...filteredInputs, chartData[0]], dataKey: 'val', nameKey: 'name' };
          } else {
             const allPositive = chartData.every((d: any) => d.val >= 0);
             const isPie = allPositive && chartData.length <= 4;
             res.chart = { type: isPie ? 'pie' : 'bar', data: chartData, dataKey: 'val', nameKey: 'name' };
          }
        }
        return res as any;
      } catch(e) { return { items: [{label:'Error', value:'Invalid input'}] }; } 
    }
  },
  {
    id: "family-budget", name: "Family Budget", category: "Personal Finance", description: "Build a household spending plan that covers everyone under one roof",
    inputs: [{"id":"i1","label":"Income 1","type":"number","defaultValue":4000},{"id":"i2","label":"Income 2","type":"number","defaultValue":3500},{"id":"e","label":"Expenses","type":"number","defaultValue":6000}],
    calculate: (v) => { 
      try { 
        const fn = (v: any) => { const s=num(v.i1)+num(v.i2)-num(v.e); const chart={type:'pie',data:[{name:'Expenses',value:num(v.e)},{name:'Savings',value:s}]}; return {items:[{label:'Household Savings',value:s.toFixed(2),highlight:true}], chart}; };
        let res: any = fn(v);
        if (!res.chart && res.items && res.items.length > 0) {
          let chartData = res.items.map((item: any) => ({
            name: item.label.replace(/\([^)]+\)/g, '').trim(),
            val: parseFloat(item.value.toString().replace(/[^0-9.-]+/g,"")) || 0
          }));
          if (chartData.length === 1) {
             const inputDefs = [{"id":"i1","label":"Income 1","type":"number","defaultValue":4000},{"id":"i2","label":"Income 2","type":"number","defaultValue":3500},{"id":"e","label":"Expenses","type":"number","defaultValue":6000}];
             const inputData = inputDefs.map((inp: any) => ({
               name: inp.label.replace(/\([^)]+\)/g, '').trim(),
               val: parseFloat(v[inp.id]) || 0
             }));
             const maxItem = chartData[0].val || 1;
             const filteredInputs = inputData.filter((inp: any) => inp.val > Math.abs(maxItem) * 0.01 && inp.val <= Math.abs(maxItem) * 100);
             res.chart = { type: 'bar', data: [...filteredInputs, chartData[0]], dataKey: 'val', nameKey: 'name' };
          } else {
             const allPositive = chartData.every((d: any) => d.val >= 0);
             const isPie = allPositive && chartData.length <= 4;
             res.chart = { type: isPie ? 'pie' : 'bar', data: chartData, dataKey: 'val', nameKey: 'name' };
          }
        }
        return res as any;
      } catch(e) { return { items: [{label:'Error', value:'Invalid input'}] }; } 
    }
  },
  {
    id: "subscription-cost", name: "Subscription Cost", category: "Personal Finance", description: "Total the yearly cost of all those monthly streaming and app subscriptions",
    inputs: [{"id":"m","label":"Monthly Subs","type":"number","defaultValue":50}],
    calculate: (v) => { 
      try { 
        const fn = (v: any) => { const a=num(v.m)*12; return {items:[{label:'Annual Cost',value:a.toFixed(2),highlight:true}]}; };
        let res: any = fn(v);
        if (!res.chart && res.items && res.items.length > 0) {
          let chartData = res.items.map((item: any) => ({
            name: item.label.replace(/\([^)]+\)/g, '').trim(),
            val: parseFloat(item.value.toString().replace(/[^0-9.-]+/g,"")) || 0
          }));
          if (chartData.length === 1) {
             const inputDefs = [{"id":"m","label":"Monthly Subs","type":"number","defaultValue":50}];
             const inputData = inputDefs.map((inp: any) => ({
               name: inp.label.replace(/\([^)]+\)/g, '').trim(),
               val: parseFloat(v[inp.id]) || 0
             }));
             const maxItem = chartData[0].val || 1;
             const filteredInputs = inputData.filter((inp: any) => inp.val > Math.abs(maxItem) * 0.01 && inp.val <= Math.abs(maxItem) * 100);
             res.chart = { type: 'bar', data: [...filteredInputs, chartData[0]], dataKey: 'val', nameKey: 'name' };
          } else {
             const allPositive = chartData.every((d: any) => d.val >= 0);
             const isPie = allPositive && chartData.length <= 4;
             res.chart = { type: isPie ? 'pie' : 'bar', data: chartData, dataKey: 'val', nameKey: 'name' };
          }
        }
        return res as any;
      } catch(e) { return { items: [{label:'Error', value:'Invalid input'}] }; } 
    }
  },
  {
    id: "healthcare-cost", name: "Healthcare Cost", category: "Personal Finance", description: "Estimate what you might pay out of pocket for care this year",
    inputs: [{"id":"p","label":"Premium (Ann)","type":"number","defaultValue":6000},{"id":"d","label":"Deductible","type":"number","defaultValue":2000}],
    calculate: (v) => { 
      try { 
        const fn = (v: any) => { const t=num(v.p)+num(v.d); return {items:[{label:'Max Out of Pocket',value:t.toFixed(2),highlight:true}]}; };
        let res: any = fn(v);
        if (!res.chart && res.items && res.items.length > 0) {
          let chartData = res.items.map((item: any) => ({
            name: item.label.replace(/\([^)]+\)/g, '').trim(),
            val: parseFloat(item.value.toString().replace(/[^0-9.-]+/g,"")) || 0
          }));
          if (chartData.length === 1) {
             const inputDefs = [{"id":"p","label":"Premium (Ann)","type":"number","defaultValue":6000},{"id":"d","label":"Deductible","type":"number","defaultValue":2000}];
             const inputData = inputDefs.map((inp: any) => ({
               name: inp.label.replace(/\([^)]+\)/g, '').trim(),
               val: parseFloat(v[inp.id]) || 0
             }));
             const maxItem = chartData[0].val || 1;
             const filteredInputs = inputData.filter((inp: any) => inp.val > Math.abs(maxItem) * 0.01 && inp.val <= Math.abs(maxItem) * 100);
             res.chart = { type: 'bar', data: [...filteredInputs, chartData[0]], dataKey: 'val', nameKey: 'name' };
          } else {
             const allPositive = chartData.every((d: any) => d.val >= 0);
             const isPie = allPositive && chartData.length <= 4;
             res.chart = { type: isPie ? 'pie' : 'bar', data: chartData, dataKey: 'val', nameKey: 'name' };
          }
        }
        return res as any;
      } catch(e) { return { items: [{label:'Error', value:'Invalid input'}] }; } 
    }
  },
  {
    id: "envelope-budget", name: "Envelope Budget", category: "Personal Finance", description: "Divide cash into spending categories so each category has a clear limit",
    inputs: [{"id":"i","label":"Cash to allocate","type":"number","defaultValue":1000},{"id":"c","label":"Num Envelopes","type":"number","defaultValue":5}],
    calculate: (v) => { 
      try { 
        const fn = (v: any) => { const e=num(v.i)/num(v.c); return {items:[{label:'Per Envelope',value:e.toFixed(2),highlight:true}]}; };
        let res: any = fn(v);
        if (!res.chart && res.items && res.items.length > 0) {
          let chartData = res.items.map((item: any) => ({
            name: item.label.replace(/\([^)]+\)/g, '').trim(),
            val: parseFloat(item.value.toString().replace(/[^0-9.-]+/g,"")) || 0
          }));
          if (chartData.length === 1) {
             const inputDefs = [{"id":"i","label":"Cash to allocate","type":"number","defaultValue":1000},{"id":"c","label":"Num Envelopes","type":"number","defaultValue":5}];
             const inputData = inputDefs.map((inp: any) => ({
               name: inp.label.replace(/\([^)]+\)/g, '').trim(),
               val: parseFloat(v[inp.id]) || 0
             }));
             const maxItem = chartData[0].val || 1;
             const filteredInputs = inputData.filter((inp: any) => inp.val > Math.abs(maxItem) * 0.01 && inp.val <= Math.abs(maxItem) * 100);
             res.chart = { type: 'bar', data: [...filteredInputs, chartData[0]], dataKey: 'val', nameKey: 'name' };
          } else {
             const allPositive = chartData.every((d: any) => d.val >= 0);
             const isPie = allPositive && chartData.length <= 4;
             res.chart = { type: isPie ? 'pie' : 'bar', data: chartData, dataKey: 'val', nameKey: 'name' };
          }
        }
        return res as any;
      } catch(e) { return { items: [{label:'Error', value:'Invalid input'}] }; } 
    }
  },
  {
    id: "roi", name: "ROI Calculator", category: "Investment & Trading", description: "Measure how much gain or loss an investment produced relative to what you put in",
    inputs: [{"id":"i","label":"Invested","type":"number","defaultValue":1000},{"id":"r","label":"Returned","type":"number","defaultValue":1200}],
    calculate: (v) => { 
      try { 
        const fn = (v: any) => { const roi=((num(v.r)-num(v.i))/num(v.i))*100; const chart={type:'bar',data:[{name:'Invested',val:num(v.i)},{name:'Returned',val:num(v.r)}],dataKey:'val',nameKey:'name'}; return {items:[{label:'ROI (%)',value:roi.toFixed(2)+'%',highlight:true}],chart}; };
        let res: any = fn(v);
        if (!res.chart && res.items && res.items.length > 0) {
          let chartData = res.items.map((item: any) => ({
            name: item.label.replace(/\([^)]+\)/g, '').trim(),
            val: parseFloat(item.value.toString().replace(/[^0-9.-]+/g,"")) || 0
          }));
          if (chartData.length === 1) {
             const inputDefs = [{"id":"i","label":"Invested","type":"number","defaultValue":1000},{"id":"r","label":"Returned","type":"number","defaultValue":1200}];
             const inputData = inputDefs.map((inp: any) => ({
               name: inp.label.replace(/\([^)]+\)/g, '').trim(),
               val: parseFloat(v[inp.id]) || 0
             }));
             const maxItem = chartData[0].val || 1;
             const filteredInputs = inputData.filter((inp: any) => inp.val > Math.abs(maxItem) * 0.01 && inp.val <= Math.abs(maxItem) * 100);
             res.chart = { type: 'bar', data: [...filteredInputs, chartData[0]], dataKey: 'val', nameKey: 'name' };
          } else {
             const allPositive = chartData.every((d: any) => d.val >= 0);
             const isPie = allPositive && chartData.length <= 4;
             res.chart = { type: isPie ? 'pie' : 'bar', data: chartData, dataKey: 'val', nameKey: 'name' };
          }
        }
        return res as any;
      } catch(e) { return { items: [{label:'Error', value:'Invalid input'}] }; } 
    }
  },
  {
    id: "cagr", name: "CAGR Calculator", category: "Investment & Trading", description: "Find the steady yearly growth rate of an investment over multiple years",
    inputs: [{"id":"b","label":"Beginning Value","type":"number","defaultValue":1000},{"id":"e","label":"Ending Value","type":"number","defaultValue":2000},{"id":"y","label":"Years","type":"number","defaultValue":5}],
    calculate: (v) => { 
      try { 
        const fn = (v: any) => { const cagr=(Math.pow(num(v.e)/num(v.b), 1/num(v.y)) - 1)*100; return {items:[{label:'CAGR (%)',value:cagr.toFixed(2)+'%',highlight:true}]}; };
        let res: any = fn(v);
        if (!res.chart && res.items && res.items.length > 0) {
          let chartData = res.items.map((item: any) => ({
            name: item.label.replace(/\([^)]+\)/g, '').trim(),
            val: parseFloat(item.value.toString().replace(/[^0-9.-]+/g,"")) || 0
          }));
          if (chartData.length === 1) {
             const inputDefs = [{"id":"b","label":"Beginning Value","type":"number","defaultValue":1000},{"id":"e","label":"Ending Value","type":"number","defaultValue":2000},{"id":"y","label":"Years","type":"number","defaultValue":5}];
             const inputData = inputDefs.map((inp: any) => ({
               name: inp.label.replace(/\([^)]+\)/g, '').trim(),
               val: parseFloat(v[inp.id]) || 0
             }));
             const maxItem = chartData[0].val || 1;
             const filteredInputs = inputData.filter((inp: any) => inp.val > Math.abs(maxItem) * 0.01 && inp.val <= Math.abs(maxItem) * 100);
             res.chart = { type: 'bar', data: [...filteredInputs, chartData[0]], dataKey: 'val', nameKey: 'name' };
          } else {
             const allPositive = chartData.every((d: any) => d.val >= 0);
             const isPie = allPositive && chartData.length <= 4;
             res.chart = { type: isPie ? 'pie' : 'bar', data: chartData, dataKey: 'val', nameKey: 'name' };
          }
        }
        return res as any;
      } catch(e) { return { items: [{label:'Error', value:'Invalid input'}] }; } 
    }
  },
  {
    id: "dividend-yield", name: "Dividend Yield", category: "Investment & Trading", description: "See what percentage of the share price you earn from annual dividends",
    inputs: [{"id":"d","label":"Annual Dividend","type":"number","defaultValue":5},{"id":"p","label":"Stock Price","type":"number","defaultValue":100}],
    calculate: (v) => { 
      try { 
        const fn = (v: any) => { const dy=(num(v.d)/num(v.p))*100; return {items:[{label:'Dividend Yield (%)',value:dy.toFixed(2)+'%',highlight:true}]}; };
        let res: any = fn(v);
        if (!res.chart && res.items && res.items.length > 0) {
          let chartData = res.items.map((item: any) => ({
            name: item.label.replace(/\([^)]+\)/g, '').trim(),
            val: parseFloat(item.value.toString().replace(/[^0-9.-]+/g,"")) || 0
          }));
          if (chartData.length === 1) {
             const inputDefs = [{"id":"d","label":"Annual Dividend","type":"number","defaultValue":5},{"id":"p","label":"Stock Price","type":"number","defaultValue":100}];
             const inputData = inputDefs.map((inp: any) => ({
               name: inp.label.replace(/\([^)]+\)/g, '').trim(),
               val: parseFloat(v[inp.id]) || 0
             }));
             const maxItem = chartData[0].val || 1;
             const filteredInputs = inputData.filter((inp: any) => inp.val > Math.abs(maxItem) * 0.01 && inp.val <= Math.abs(maxItem) * 100);
             res.chart = { type: 'bar', data: [...filteredInputs, chartData[0]], dataKey: 'val', nameKey: 'name' };
          } else {
             const allPositive = chartData.every((d: any) => d.val >= 0);
             const isPie = allPositive && chartData.length <= 4;
             res.chart = { type: isPie ? 'pie' : 'bar', data: chartData, dataKey: 'val', nameKey: 'name' };
          }
        }
        return res as any;
      } catch(e) { return { items: [{label:'Error', value:'Invalid input'}] }; } 
    }
  },
  {
    id: "rule-of-72", name: "Rule of 72", category: "Investment & Trading", description: "Quickly estimate how many years it may take for money to roughly double at a given rate",
    inputs: [{"id":"r","label":"Interest Rate (%)","type":"number","defaultValue":8}],
    calculate: (v) => { 
      try { 
        const fn = (v: any) => { const t=72/num(v.r); return {items:[{label:'Years to Double',value:t.toFixed(2),highlight:true}]}; };
        let res: any = fn(v);
        if (!res.chart && res.items && res.items.length > 0) {
          let chartData = res.items.map((item: any) => ({
            name: item.label.replace(/\([^)]+\)/g, '').trim(),
            val: parseFloat(item.value.toString().replace(/[^0-9.-]+/g,"")) || 0
          }));
          if (chartData.length === 1) {
             const inputDefs = [{"id":"r","label":"Interest Rate (%)","type":"number","defaultValue":8}];
             const inputData = inputDefs.map((inp: any) => ({
               name: inp.label.replace(/\([^)]+\)/g, '').trim(),
               val: parseFloat(v[inp.id]) || 0
             }));
             const maxItem = chartData[0].val || 1;
             const filteredInputs = inputData.filter((inp: any) => inp.val > Math.abs(maxItem) * 0.01 && inp.val <= Math.abs(maxItem) * 100);
             res.chart = { type: 'bar', data: [...filteredInputs, chartData[0]], dataKey: 'val', nameKey: 'name' };
          } else {
             const allPositive = chartData.every((d: any) => d.val >= 0);
             const isPie = allPositive && chartData.length <= 4;
             res.chart = { type: isPie ? 'pie' : 'bar', data: chartData, dataKey: 'val', nameKey: 'name' };
          }
        }
        return res as any;
      } catch(e) { return { items: [{label:'Error', value:'Invalid input'}] }; } 
    }
  },
  {
    id: "capital-gains", name: "Capital Gains", category: "Investment & Trading", description: "Calculate the profit (or loss) when you sell an investment or property",
    inputs: [{"id":"p","label":"Purchase Price","type":"number","defaultValue":5000},{"id":"s","label":"Sale Price","type":"number","defaultValue":7000}],
    calculate: (v) => { 
      try { 
        const fn = (v: any) => { const cg=num(v.s)-num(v.p); return {items:[{label:'Capital Gain',value:cg.toFixed(2),highlight:true}]}; };
        let res: any = fn(v);
        if (!res.chart && res.items && res.items.length > 0) {
          let chartData = res.items.map((item: any) => ({
            name: item.label.replace(/\([^)]+\)/g, '').trim(),
            val: parseFloat(item.value.toString().replace(/[^0-9.-]+/g,"")) || 0
          }));
          if (chartData.length === 1) {
             const inputDefs = [{"id":"p","label":"Purchase Price","type":"number","defaultValue":5000},{"id":"s","label":"Sale Price","type":"number","defaultValue":7000}];
             const inputData = inputDefs.map((inp: any) => ({
               name: inp.label.replace(/\([^)]+\)/g, '').trim(),
               val: parseFloat(v[inp.id]) || 0
             }));
             const maxItem = chartData[0].val || 1;
             const filteredInputs = inputData.filter((inp: any) => inp.val > Math.abs(maxItem) * 0.01 && inp.val <= Math.abs(maxItem) * 100);
             res.chart = { type: 'bar', data: [...filteredInputs, chartData[0]], dataKey: 'val', nameKey: 'name' };
          } else {
             const allPositive = chartData.every((d: any) => d.val >= 0);
             const isPie = allPositive && chartData.length <= 4;
             res.chart = { type: isPie ? 'pie' : 'bar', data: chartData, dataKey: 'val', nameKey: 'name' };
          }
        }
        return res as any;
      } catch(e) { return { items: [{label:'Error', value:'Invalid input'}] }; } 
    }
  },
  {
    id: "real-return", name: "Real Return", category: "Investment & Trading", description: "Adjust your investment return for inflation so you see the true purchasing-power gain",
    inputs: [{"id":"r","label":"Nominal Return (%)","type":"number","defaultValue":8},{"id":"i","label":"Inflation Rate (%)","type":"number","defaultValue":3}],
    calculate: (v) => { 
      try { 
        const fn = (v: any) => { const rr=((1+num(v.r)/100)/(1+num(v.i)/100)-1)*100; return {items:[{label:'Real Return (%)',value:rr.toFixed(2)+'%',highlight:true}]}; };
        let res: any = fn(v);
        if (!res.chart && res.items && res.items.length > 0) {
          let chartData = res.items.map((item: any) => ({
            name: item.label.replace(/\([^)]+\)/g, '').trim(),
            val: parseFloat(item.value.toString().replace(/[^0-9.-]+/g,"")) || 0
          }));
          if (chartData.length === 1) {
             const inputDefs = [{"id":"r","label":"Nominal Return (%)","type":"number","defaultValue":8},{"id":"i","label":"Inflation Rate (%)","type":"number","defaultValue":3}];
             const inputData = inputDefs.map((inp: any) => ({
               name: inp.label.replace(/\([^)]+\)/g, '').trim(),
               val: parseFloat(v[inp.id]) || 0
             }));
             const maxItem = chartData[0].val || 1;
             const filteredInputs = inputData.filter((inp: any) => inp.val > Math.abs(maxItem) * 0.01 && inp.val <= Math.abs(maxItem) * 100);
             res.chart = { type: 'bar', data: [...filteredInputs, chartData[0]], dataKey: 'val', nameKey: 'name' };
          } else {
             const allPositive = chartData.every((d: any) => d.val >= 0);
             const isPie = allPositive && chartData.length <= 4;
             res.chart = { type: isPie ? 'pie' : 'bar', data: chartData, dataKey: 'val', nameKey: 'name' };
          }
        }
        return res as any;
      } catch(e) { return { items: [{label:'Error', value:'Invalid input'}] }; } 
    }
  },
  {
    id: "apy", name: "APY Calculator", category: "Investment & Trading", description: "Convert a stated interest rate into the effective yearly yield with compounding",
    inputs: [{"id":"r","label":"Interest Rate (%)","type":"number","defaultValue":5},{"id":"n","label":"Compounds/Year","type":"number","defaultValue":12}],
    calculate: (v) => { 
      try { 
        const fn = (v: any) => { const apy=(Math.pow(1+(num(v.r)/100)/num(v.n), num(v.n))-1)*100; return {items:[{label:'APY (%)',value:apy.toFixed(2)+'%',highlight:true}]}; };
        let res: any = fn(v);
        if (!res.chart && res.items && res.items.length > 0) {
          let chartData = res.items.map((item: any) => ({
            name: item.label.replace(/\([^)]+\)/g, '').trim(),
            val: parseFloat(item.value.toString().replace(/[^0-9.-]+/g,"")) || 0
          }));
          if (chartData.length === 1) {
             const inputDefs = [{"id":"r","label":"Interest Rate (%)","type":"number","defaultValue":5},{"id":"n","label":"Compounds/Year","type":"number","defaultValue":12}];
             const inputData = inputDefs.map((inp: any) => ({
               name: inp.label.replace(/\([^)]+\)/g, '').trim(),
               val: parseFloat(v[inp.id]) || 0
             }));
             const maxItem = chartData[0].val || 1;
             const filteredInputs = inputData.filter((inp: any) => inp.val > Math.abs(maxItem) * 0.01 && inp.val <= Math.abs(maxItem) * 100);
             res.chart = { type: 'bar', data: [...filteredInputs, chartData[0]], dataKey: 'val', nameKey: 'name' };
          } else {
             const allPositive = chartData.every((d: any) => d.val >= 0);
             const isPie = allPositive && chartData.length <= 4;
             res.chart = { type: isPie ? 'pie' : 'bar', data: chartData, dataKey: 'val', nameKey: 'name' };
          }
        }
        return res as any;
      } catch(e) { return { items: [{label:'Error', value:'Invalid input'}] }; } 
    }
  },
  {
    id: "stock-average", name: "Stock Average Price", category: "Investment & Trading", description: "Find your average cost per share after buying the same stock more than once",
    inputs: [{"id":"p1","label":"Price 1","type":"number","defaultValue":100},{"id":"q1","label":"Qty 1","type":"number","defaultValue":10},{"id":"p2","label":"Price 2","type":"number","defaultValue":90},{"id":"q2","label":"Qty 2","type":"number","defaultValue":15}],
    calculate: (v) => { 
      try { 
        const fn = (v: any) => { const tot=num(v.p1)*num(v.q1)+num(v.p2)*num(v.q2); const qty=num(v.q1)+num(v.q2); return {items:[{label:'Average Price',value:(tot/qty).toFixed(2),highlight:true}]}; };
        let res: any = fn(v);
        if (!res.chart && res.items && res.items.length > 0) {
          let chartData = res.items.map((item: any) => ({
            name: item.label.replace(/\([^)]+\)/g, '').trim(),
            val: parseFloat(item.value.toString().replace(/[^0-9.-]+/g,"")) || 0
          }));
          if (chartData.length === 1) {
             const inputDefs = [{"id":"p1","label":"Price 1","type":"number","defaultValue":100},{"id":"q1","label":"Qty 1","type":"number","defaultValue":10},{"id":"p2","label":"Price 2","type":"number","defaultValue":90},{"id":"q2","label":"Qty 2","type":"number","defaultValue":15}];
             const inputData = inputDefs.map((inp: any) => ({
               name: inp.label.replace(/\([^)]+\)/g, '').trim(),
               val: parseFloat(v[inp.id]) || 0
             }));
             const maxItem = chartData[0].val || 1;
             const filteredInputs = inputData.filter((inp: any) => inp.val > Math.abs(maxItem) * 0.01 && inp.val <= Math.abs(maxItem) * 100);
             res.chart = { type: 'bar', data: [...filteredInputs, chartData[0]], dataKey: 'val', nameKey: 'name' };
          } else {
             const allPositive = chartData.every((d: any) => d.val >= 0);
             const isPie = allPositive && chartData.length <= 4;
             res.chart = { type: isPie ? 'pie' : 'bar', data: chartData, dataKey: 'val', nameKey: 'name' };
          }
        }
        return res as any;
      } catch(e) { return { items: [{label:'Error', value:'Invalid input'}] }; } 
    }
  },
  {
    id: "mutual-fund", name: "Mutual Fund Return", category: "Investment & Trading", description: "Estimate how a mutual fund investment might grow over time",
    inputs: [{"id":"p","label":"Principal","type":"number","defaultValue":10000},{"id":"r","label":"Expected Return (%)","type":"number","defaultValue":12},{"id":"t","label":"Years","type":"number","defaultValue":10}],
    calculate: (v) => { 
      try { 
        const fn = (v: any) => { const f=num(v.p)*Math.pow(1+num(v.r)/100, num(v.t)); return {items:[{label:'Future Value',value:f.toFixed(2),highlight:true}]}; };
        let res: any = fn(v);
        if (!res.chart && res.items && res.items.length > 0) {
          let chartData = res.items.map((item: any) => ({
            name: item.label.replace(/\([^)]+\)/g, '').trim(),
            val: parseFloat(item.value.toString().replace(/[^0-9.-]+/g,"")) || 0
          }));
          if (chartData.length === 1) {
             const inputDefs = [{"id":"p","label":"Principal","type":"number","defaultValue":10000},{"id":"r","label":"Expected Return (%)","type":"number","defaultValue":12},{"id":"t","label":"Years","type":"number","defaultValue":10}];
             const inputData = inputDefs.map((inp: any) => ({
               name: inp.label.replace(/\([^)]+\)/g, '').trim(),
               val: parseFloat(v[inp.id]) || 0
             }));
             const maxItem = chartData[0].val || 1;
             const filteredInputs = inputData.filter((inp: any) => inp.val > Math.abs(maxItem) * 0.01 && inp.val <= Math.abs(maxItem) * 100);
             res.chart = { type: 'bar', data: [...filteredInputs, chartData[0]], dataKey: 'val', nameKey: 'name' };
          } else {
             const allPositive = chartData.every((d: any) => d.val >= 0);
             const isPie = allPositive && chartData.length <= 4;
             res.chart = { type: isPie ? 'pie' : 'bar', data: chartData, dataKey: 'val', nameKey: 'name' };
          }
        }
        return res as any;
      } catch(e) { return { items: [{label:'Error', value:'Invalid input'}] }; } 
    }
  },
  {
    id: "bond-yield", name: "Bond Yield", category: "Investment & Trading", description: "See the income yield on a bond based on its price and coupon",
    inputs: [{"id":"c","label":"Annual Coupon Payment","type":"number","defaultValue":50},{"id":"p","label":"Current Market Price","type":"number","defaultValue":950}],
    calculate: (v) => { 
      try { 
        const fn = (v: any) => { const cy=(num(v.c)/num(v.p))*100; return {items:[{label:'Current Yield (%)',value:cy.toFixed(2)+'%',highlight:true}]}; };
        let res: any = fn(v);
        if (!res.chart && res.items && res.items.length > 0) {
          let chartData = res.items.map((item: any) => ({
            name: item.label.replace(/\([^)]+\)/g, '').trim(),
            val: parseFloat(item.value.toString().replace(/[^0-9.-]+/g,"")) || 0
          }));
          if (chartData.length === 1) {
             const inputDefs = [{"id":"c","label":"Annual Coupon Payment","type":"number","defaultValue":50},{"id":"p","label":"Current Market Price","type":"number","defaultValue":950}];
             const inputData = inputDefs.map((inp: any) => ({
               name: inp.label.replace(/\([^)]+\)/g, '').trim(),
               val: parseFloat(v[inp.id]) || 0
             }));
             const maxItem = chartData[0].val || 1;
             const filteredInputs = inputData.filter((inp: any) => inp.val > Math.abs(maxItem) * 0.01 && inp.val <= Math.abs(maxItem) * 100);
             res.chart = { type: 'bar', data: [...filteredInputs, chartData[0]], dataKey: 'val', nameKey: 'name' };
          } else {
             const allPositive = chartData.every((d: any) => d.val >= 0);
             const isPie = allPositive && chartData.length <= 4;
             res.chart = { type: isPie ? 'pie' : 'bar', data: chartData, dataKey: 'val', nameKey: 'name' };
          }
        }
        return res as any;
      } catch(e) { return { items: [{label:'Error', value:'Invalid input'}] }; } 
    }
  },
  {
    id: "sip", name: "SIP Calculator", category: "Investment & Trading", description: "Project the future value of regular monthly investments into a fund or portfolio",
    inputs: [{"id":"m","label":"Monthly Inv","type":"number","defaultValue":1000},{"id":"r","label":"Annual Return (%)","type":"number","defaultValue":12},{"id":"y","label":"Years","type":"number","defaultValue":10}],
    calculate: (v) => { 
      try { 
        const fn = (v: any) => { const i=num(v.r)/1200; const n=num(v.y)*12; const f=num(v.m)* ((Math.pow(1+i,n)-1)/i) * (1+i); const inv=num(v.m)*n; const chart={type:'pie',data:[{name:'Invested',value:inv},{name:'Gains',value:f-inv}]}; return {items:[{label:'Future Value',value:f.toFixed(2),highlight:true}], chart}; };
        let res: any = fn(v);
        if (!res.chart && res.items && res.items.length > 0) {
          let chartData = res.items.map((item: any) => ({
            name: item.label.replace(/\([^)]+\)/g, '').trim(),
            val: parseFloat(item.value.toString().replace(/[^0-9.-]+/g,"")) || 0
          }));
          if (chartData.length === 1) {
             const inputDefs = [{"id":"m","label":"Monthly Inv","type":"number","defaultValue":1000},{"id":"r","label":"Annual Return (%)","type":"number","defaultValue":12},{"id":"y","label":"Years","type":"number","defaultValue":10}];
             const inputData = inputDefs.map((inp: any) => ({
               name: inp.label.replace(/\([^)]+\)/g, '').trim(),
               val: parseFloat(v[inp.id]) || 0
             }));
             const maxItem = chartData[0].val || 1;
             const filteredInputs = inputData.filter((inp: any) => inp.val > Math.abs(maxItem) * 0.01 && inp.val <= Math.abs(maxItem) * 100);
             res.chart = { type: 'bar', data: [...filteredInputs, chartData[0]], dataKey: 'val', nameKey: 'name' };
          } else {
             const allPositive = chartData.every((d: any) => d.val >= 0);
             const isPie = allPositive && chartData.length <= 4;
             res.chart = { type: isPie ? 'pie' : 'bar', data: chartData, dataKey: 'val', nameKey: 'name' };
          }
        }
        return res as any;
      } catch(e) { return { items: [{label:'Error', value:'Invalid input'}] }; } 
    }
  },
  {
    id: "lumpsum", name: "Lumpsum Return", category: "Investment & Trading", description: "Estimate what a one-time investment could be worth after several years",
    inputs: [{"id":"p","label":"Amount","type":"number","defaultValue":100000},{"id":"r","label":"Return (%)","type":"number","defaultValue":10},{"id":"y","label":"Years","type":"number","defaultValue":5}],
    calculate: (v) => { 
      try { 
        const fn = (v: any) => { const f=num(v.p)*Math.pow(1+num(v.r)/100, num(v.y)); const chart={type:'pie',data:[{name:'Principal',value:num(v.p)},{name:'Interest',value:f-num(v.p)}]}; return {items:[{label:'Future Value',value:f.toFixed(2),highlight:true}], chart}; };
        let res: any = fn(v);
        if (!res.chart && res.items && res.items.length > 0) {
          let chartData = res.items.map((item: any) => ({
            name: item.label.replace(/\([^)]+\)/g, '').trim(),
            val: parseFloat(item.value.toString().replace(/[^0-9.-]+/g,"")) || 0
          }));
          if (chartData.length === 1) {
             const inputDefs = [{"id":"p","label":"Amount","type":"number","defaultValue":100000},{"id":"r","label":"Return (%)","type":"number","defaultValue":10},{"id":"y","label":"Years","type":"number","defaultValue":5}];
             const inputData = inputDefs.map((inp: any) => ({
               name: inp.label.replace(/\([^)]+\)/g, '').trim(),
               val: parseFloat(v[inp.id]) || 0
             }));
             const maxItem = chartData[0].val || 1;
             const filteredInputs = inputData.filter((inp: any) => inp.val > Math.abs(maxItem) * 0.01 && inp.val <= Math.abs(maxItem) * 100);
             res.chart = { type: 'bar', data: [...filteredInputs, chartData[0]], dataKey: 'val', nameKey: 'name' };
          } else {
             const allPositive = chartData.every((d: any) => d.val >= 0);
             const isPie = allPositive && chartData.length <= 4;
             res.chart = { type: isPie ? 'pie' : 'bar', data: chartData, dataKey: 'val', nameKey: 'name' };
          }
        }
        return res as any;
      } catch(e) { return { items: [{label:'Error', value:'Invalid input'}] }; } 
    }
  },
  {
    id: "option-profit", name: "Options Profit", category: "Investment & Trading", description: "Calculate profit or loss on a basic options trade after fees",
    inputs: [{"id":"p","label":"Premium Paid","type":"number","defaultValue":200},{"id":"v","label":"Option Value at close","type":"number","defaultValue":500}],
    calculate: (v) => { 
      try { 
        const fn = (v: any) => { const p=num(v.v)-num(v.p); return {items:[{label:'Profit',value:p.toFixed(2),highlight:true}]}; };
        let res: any = fn(v);
        if (!res.chart && res.items && res.items.length > 0) {
          let chartData = res.items.map((item: any) => ({
            name: item.label.replace(/\([^)]+\)/g, '').trim(),
            val: parseFloat(item.value.toString().replace(/[^0-9.-]+/g,"")) || 0
          }));
          if (chartData.length === 1) {
             const inputDefs = [{"id":"p","label":"Premium Paid","type":"number","defaultValue":200},{"id":"v","label":"Option Value at close","type":"number","defaultValue":500}];
             const inputData = inputDefs.map((inp: any) => ({
               name: inp.label.replace(/\([^)]+\)/g, '').trim(),
               val: parseFloat(v[inp.id]) || 0
             }));
             const maxItem = chartData[0].val || 1;
             const filteredInputs = inputData.filter((inp: any) => inp.val > Math.abs(maxItem) * 0.01 && inp.val <= Math.abs(maxItem) * 100);
             res.chart = { type: 'bar', data: [...filteredInputs, chartData[0]], dataKey: 'val', nameKey: 'name' };
          } else {
             const allPositive = chartData.every((d: any) => d.val >= 0);
             const isPie = allPositive && chartData.length <= 4;
             res.chart = { type: isPie ? 'pie' : 'bar', data: chartData, dataKey: 'val', nameKey: 'name' };
          }
        }
        return res as any;
      } catch(e) { return { items: [{label:'Error', value:'Invalid input'}] }; } 
    }
  },
  {
    id: "crypto-roi", name: "Crypto ROI", category: "Investment & Trading", description: "Measure return on a crypto buy after accounting for purchase and sale prices",
    inputs: [{"id":"i","label":"Initial Price","type":"number","defaultValue":30000},{"id":"f","label":"Final Price","type":"number","defaultValue":45000},{"id":"q","label":"Coins","type":"number","defaultValue":0.5}],
    calculate: (v) => { 
      try { 
        const fn = (v: any) => { const p=(num(v.f)-num(v.i))*num(v.q); return {items:[{label:'Profit',value:p.toFixed(2),highlight:true}]}; };
        let res: any = fn(v);
        if (!res.chart && res.items && res.items.length > 0) {
          let chartData = res.items.map((item: any) => ({
            name: item.label.replace(/\([^)]+\)/g, '').trim(),
            val: parseFloat(item.value.toString().replace(/[^0-9.-]+/g,"")) || 0
          }));
          if (chartData.length === 1) {
             const inputDefs = [{"id":"i","label":"Initial Price","type":"number","defaultValue":30000},{"id":"f","label":"Final Price","type":"number","defaultValue":45000},{"id":"q","label":"Coins","type":"number","defaultValue":0.5}];
             const inputData = inputDefs.map((inp: any) => ({
               name: inp.label.replace(/\([^)]+\)/g, '').trim(),
               val: parseFloat(v[inp.id]) || 0
             }));
             const maxItem = chartData[0].val || 1;
             const filteredInputs = inputData.filter((inp: any) => inp.val > Math.abs(maxItem) * 0.01 && inp.val <= Math.abs(maxItem) * 100);
             res.chart = { type: 'bar', data: [...filteredInputs, chartData[0]], dataKey: 'val', nameKey: 'name' };
          } else {
             const allPositive = chartData.every((d: any) => d.val >= 0);
             const isPie = allPositive && chartData.length <= 4;
             res.chart = { type: isPie ? 'pie' : 'bar', data: chartData, dataKey: 'val', nameKey: 'name' };
          }
        }
        return res as any;
      } catch(e) { return { items: [{label:'Error', value:'Invalid input'}] }; } 
    }
  },
  {
    id: "asset-allocation", name: "Asset Allocation", category: "Investment & Trading", description: "Get a simple stocks-versus-bonds mix based on age or risk comfort",
    inputs: [{"id":"a","label":"Age","type":"number","defaultValue":30}],
    calculate: (v) => { 
      try { 
        const fn = (v: any) => { const s=110-num(v.a); const chart={type:'pie',data:[{name:'Stocks',value:s},{name:'Bonds',value:100-s}]}; return {items:[{label:'Stocks %',value:s.toString(),highlight:true},{label:'Bonds %',value:(100-s).toString()}], chart}; };
        let res: any = fn(v);
        if (!res.chart && res.items && res.items.length > 0) {
          let chartData = res.items.map((item: any) => ({
            name: item.label.replace(/\([^)]+\)/g, '').trim(),
            val: parseFloat(item.value.toString().replace(/[^0-9.-]+/g,"")) || 0
          }));
          if (chartData.length === 1) {
             const inputDefs = [{"id":"a","label":"Age","type":"number","defaultValue":30}];
             const inputData = inputDefs.map((inp: any) => ({
               name: inp.label.replace(/\([^)]+\)/g, '').trim(),
               val: parseFloat(v[inp.id]) || 0
             }));
             const maxItem = chartData[0].val || 1;
             const filteredInputs = inputData.filter((inp: any) => inp.val > Math.abs(maxItem) * 0.01 && inp.val <= Math.abs(maxItem) * 100);
             res.chart = { type: 'bar', data: [...filteredInputs, chartData[0]], dataKey: 'val', nameKey: 'name' };
          } else {
             const allPositive = chartData.every((d: any) => d.val >= 0);
             const isPie = allPositive && chartData.length <= 4;
             res.chart = { type: isPie ? 'pie' : 'bar', data: chartData, dataKey: 'val', nameKey: 'name' };
          }
        }
        return res as any;
      } catch(e) { return { items: [{label:'Error', value:'Invalid input'}] }; } 
    }
  },
  {
    id: "emi", name: "EMI Calculator", category: "Loans & Mortgages", description: "Estimate the fixed monthly payment on a loan for a given amount, rate, and term",
    inputs: [{"id":"p","label":"Principal","type":"number","defaultValue":100000},{"id":"r","label":"Rate (%)","type":"number","defaultValue":10},{"id":"t","label":"Years","type":"number","defaultValue":5}],
    calculate: (v) => { 
      try { 
        const fn = (v: any) => { const p=num(v.p); const r=num(v.r)/1200; const t=num(v.t)*12; const emi=(p*r*Math.pow(1+r,t))/(Math.pow(1+r,t)-1) || 0; const totalInt=emi*t-p; const chart={type:'pie',data:[{name:'Principal',value:p},{name:'Interest',value:totalInt}]}; return {items:[{label:'EMI',value:emi.toFixed(2),highlight:true}], chart}; };
        let res: any = fn(v);
        if (!res.chart && res.items && res.items.length > 0) {
          let chartData = res.items.map((item: any) => ({
            name: item.label.replace(/\([^)]+\)/g, '').trim(),
            val: parseFloat(item.value.toString().replace(/[^0-9.-]+/g,"")) || 0
          }));
          if (chartData.length === 1) {
             const inputDefs = [{"id":"p","label":"Principal","type":"number","defaultValue":100000},{"id":"r","label":"Rate (%)","type":"number","defaultValue":10},{"id":"t","label":"Years","type":"number","defaultValue":5}];
             const inputData = inputDefs.map((inp: any) => ({
               name: inp.label.replace(/\([^)]+\)/g, '').trim(),
               val: parseFloat(v[inp.id]) || 0
             }));
             const maxItem = chartData[0].val || 1;
             const filteredInputs = inputData.filter((inp: any) => inp.val > Math.abs(maxItem) * 0.01 && inp.val <= Math.abs(maxItem) * 100);
             res.chart = { type: 'bar', data: [...filteredInputs, chartData[0]], dataKey: 'val', nameKey: 'name' };
          } else {
             const allPositive = chartData.every((d: any) => d.val >= 0);
             const isPie = allPositive && chartData.length <= 4;
             res.chart = { type: isPie ? 'pie' : 'bar', data: chartData, dataKey: 'val', nameKey: 'name' };
          }
        }
        return res as any;
      } catch(e) { return { items: [{label:'Error', value:'Invalid input'}] }; } 
    }
  },
  {
    id: "loan-payoff", name: "Loan Payoff Time", category: "Loans & Mortgages", description: "See how long it takes to clear a loan balance with a fixed monthly payment",
    inputs: [{"id":"b","label":"Balance","type":"number","defaultValue":10000},{"id":"r","label":"Rate (%)","type":"number","defaultValue":5},{"id":"p","label":"Monthly Payment","type":"number","defaultValue":300}],
    calculate: (v) => { 
      try { 
        const fn = (v: any) => { const i=num(v.r)/1200; const m=-Math.log(1 - (i*num(v.b))/num(v.p))/Math.log(1+i); return {items:[{label:'Months to Payoff',value:m.toFixed(1),highlight:true}]}; };
        let res: any = fn(v);
        if (!res.chart && res.items && res.items.length > 0) {
          let chartData = res.items.map((item: any) => ({
            name: item.label.replace(/\([^)]+\)/g, '').trim(),
            val: parseFloat(item.value.toString().replace(/[^0-9.-]+/g,"")) || 0
          }));
          if (chartData.length === 1) {
             const inputDefs = [{"id":"b","label":"Balance","type":"number","defaultValue":10000},{"id":"r","label":"Rate (%)","type":"number","defaultValue":5},{"id":"p","label":"Monthly Payment","type":"number","defaultValue":300}];
             const inputData = inputDefs.map((inp: any) => ({
               name: inp.label.replace(/\([^)]+\)/g, '').trim(),
               val: parseFloat(v[inp.id]) || 0
             }));
             const maxItem = chartData[0].val || 1;
             const filteredInputs = inputData.filter((inp: any) => inp.val > Math.abs(maxItem) * 0.01 && inp.val <= Math.abs(maxItem) * 100);
             res.chart = { type: 'bar', data: [...filteredInputs, chartData[0]], dataKey: 'val', nameKey: 'name' };
          } else {
             const allPositive = chartData.every((d: any) => d.val >= 0);
             const isPie = allPositive && chartData.length <= 4;
             res.chart = { type: isPie ? 'pie' : 'bar', data: chartData, dataKey: 'val', nameKey: 'name' };
          }
        }
        return res as any;
      } catch(e) { return { items: [{label:'Error', value:'Invalid input'}] }; } 
    }
  },
  {
    id: "simple-interest", name: "Simple Interest", category: "Loans & Mortgages", description: "Calculate interest earned or owed when interest is not compounded",
    inputs: [{"id":"p","label":"Principal","type":"number","defaultValue":10000},{"id":"r","label":"Rate (%)","type":"number","defaultValue":5},{"id":"t","label":"Years","type":"number","defaultValue":5}],
    calculate: (v) => { 
      try { 
        const fn = (v: any) => { const i=(num(v.p)*num(v.r)*num(v.t))/100; const chart={type:'pie',data:[{name:'Principal',value:num(v.p)},{name:'Interest',value:i}]}; return {items:[{label:'Total Interest',value:i.toFixed(2),highlight:true}], chart}; };
        let res: any = fn(v);
        if (!res.chart && res.items && res.items.length > 0) {
          let chartData = res.items.map((item: any) => ({
            name: item.label.replace(/\([^)]+\)/g, '').trim(),
            val: parseFloat(item.value.toString().replace(/[^0-9.-]+/g,"")) || 0
          }));
          if (chartData.length === 1) {
             const inputDefs = [{"id":"p","label":"Principal","type":"number","defaultValue":10000},{"id":"r","label":"Rate (%)","type":"number","defaultValue":5},{"id":"t","label":"Years","type":"number","defaultValue":5}];
             const inputData = inputDefs.map((inp: any) => ({
               name: inp.label.replace(/\([^)]+\)/g, '').trim(),
               val: parseFloat(v[inp.id]) || 0
             }));
             const maxItem = chartData[0].val || 1;
             const filteredInputs = inputData.filter((inp: any) => inp.val > Math.abs(maxItem) * 0.01 && inp.val <= Math.abs(maxItem) * 100);
             res.chart = { type: 'bar', data: [...filteredInputs, chartData[0]], dataKey: 'val', nameKey: 'name' };
          } else {
             const allPositive = chartData.every((d: any) => d.val >= 0);
             const isPie = allPositive && chartData.length <= 4;
             res.chart = { type: isPie ? 'pie' : 'bar', data: chartData, dataKey: 'val', nameKey: 'name' };
          }
        }
        return res as any;
      } catch(e) { return { items: [{label:'Error', value:'Invalid input'}] }; } 
    }
  },
  {
    id: "compound-interest", name: "Compound Interest", category: "Loans & Mortgages", description: "See how balances grow when interest is added to the principal over time",
    inputs: [{"id":"p","label":"Principal","type":"number","defaultValue":10000},{"id":"r","label":"Rate (%)","type":"number","defaultValue":5},{"id":"t","label":"Years","type":"number","defaultValue":5},{"id":"n","label":"Compounds/Yr","type":"number","defaultValue":1}],
    calculate: (v) => { 
      try { 
        const fn = (v: any) => { const a=num(v.p)*Math.pow(1+(num(v.r)/100)/num(v.n), num(v.n)*num(v.t)); let lineData=[]; for(let i=0;i<=num(v.t);i++){lineData.push({year:i,balance:num(v.p)*Math.pow(1+(num(v.r)/100)/num(v.n), num(v.n)*i)});} const chart={type:'line',data:lineData,xAxisKey:'year',lines:[{key:'balance',name:'Balance',color:'#3b82f6'}]}; return {items:[{label:'Total Amount',value:a.toFixed(2),highlight:true}], chart}; };
        let res: any = fn(v);
        if (!res.chart && res.items && res.items.length > 0) {
          let chartData = res.items.map((item: any) => ({
            name: item.label.replace(/\([^)]+\)/g, '').trim(),
            val: parseFloat(item.value.toString().replace(/[^0-9.-]+/g,"")) || 0
          }));
          if (chartData.length === 1) {
             const inputDefs = [{"id":"p","label":"Principal","type":"number","defaultValue":10000},{"id":"r","label":"Rate (%)","type":"number","defaultValue":5},{"id":"t","label":"Years","type":"number","defaultValue":5},{"id":"n","label":"Compounds/Yr","type":"number","defaultValue":1}];
             const inputData = inputDefs.map((inp: any) => ({
               name: inp.label.replace(/\([^)]+\)/g, '').trim(),
               val: parseFloat(v[inp.id]) || 0
             }));
             const maxItem = chartData[0].val || 1;
             const filteredInputs = inputData.filter((inp: any) => inp.val > Math.abs(maxItem) * 0.01 && inp.val <= Math.abs(maxItem) * 100);
             res.chart = { type: 'bar', data: [...filteredInputs, chartData[0]], dataKey: 'val', nameKey: 'name' };
          } else {
             const allPositive = chartData.every((d: any) => d.val >= 0);
             const isPie = allPositive && chartData.length <= 4;
             res.chart = { type: isPie ? 'pie' : 'bar', data: chartData, dataKey: 'val', nameKey: 'name' };
          }
        }
        return res as any;
      } catch(e) { return { items: [{label:'Error', value:'Invalid input'}] }; } 
    }
  },
  {
    id: "amortization", name: "Amortization", category: "Loans & Mortgages", description: "Break down each payment into interest and principal for the first months of a loan",
    inputs: [{"id":"b","label":"Loan Balance","type":"number","defaultValue":100000},{"id":"r","label":"Rate (%)","type":"number","defaultValue":5},{"id":"p","label":"Monthly Payment","type":"number","defaultValue":1000}],
    calculate: (v) => { 
      try { 
        const fn = (v: any) => { const i=(num(v.b)*(num(v.r)/1200)); const pr=num(v.p)-i; const chart={type:'pie',data:[{name:'Principal',value:pr},{name:'Interest',value:i}]}; return {items:[{label:'Month 1 Interest',value:i.toFixed(2)},{label:'Month 1 Principal',value:pr.toFixed(2),highlight:true}], chart}; };
        let res: any = fn(v);
        if (!res.chart && res.items && res.items.length > 0) {
          let chartData = res.items.map((item: any) => ({
            name: item.label.replace(/\([^)]+\)/g, '').trim(),
            val: parseFloat(item.value.toString().replace(/[^0-9.-]+/g,"")) || 0
          }));
          if (chartData.length === 1) {
             const inputDefs = [{"id":"b","label":"Loan Balance","type":"number","defaultValue":100000},{"id":"r","label":"Rate (%)","type":"number","defaultValue":5},{"id":"p","label":"Monthly Payment","type":"number","defaultValue":1000}];
             const inputData = inputDefs.map((inp: any) => ({
               name: inp.label.replace(/\([^)]+\)/g, '').trim(),
               val: parseFloat(v[inp.id]) || 0
             }));
             const maxItem = chartData[0].val || 1;
             const filteredInputs = inputData.filter((inp: any) => inp.val > Math.abs(maxItem) * 0.01 && inp.val <= Math.abs(maxItem) * 100);
             res.chart = { type: 'bar', data: [...filteredInputs, chartData[0]], dataKey: 'val', nameKey: 'name' };
          } else {
             const allPositive = chartData.every((d: any) => d.val >= 0);
             const isPie = allPositive && chartData.length <= 4;
             res.chart = { type: isPie ? 'pie' : 'bar', data: chartData, dataKey: 'val', nameKey: 'name' };
          }
        }
        return res as any;
      } catch(e) { return { items: [{label:'Error', value:'Invalid input'}] }; } 
    }
  },
  {
    id: "refinance", name: "Refinance Savings", category: "Loans & Mortgages", description: "Compare your current loan payment with a new rate and estimate monthly savings",
    inputs: [{"id":"op","label":"Old Payment","type":"number","defaultValue":1200},{"id":"np","label":"New Payment","type":"number","defaultValue":1000}],
    calculate: (v) => { 
      try { 
        const fn = (v: any) => { const s=num(v.op)-num(v.np); return {items:[{label:'Monthly Savings',value:s.toFixed(2),highlight:true},{label:'Annual Savings',value:(s*12).toFixed(2)}]}; };
        let res: any = fn(v);
        if (!res.chart && res.items && res.items.length > 0) {
          let chartData = res.items.map((item: any) => ({
            name: item.label.replace(/\([^)]+\)/g, '').trim(),
            val: parseFloat(item.value.toString().replace(/[^0-9.-]+/g,"")) || 0
          }));
          if (chartData.length === 1) {
             const inputDefs = [{"id":"op","label":"Old Payment","type":"number","defaultValue":1200},{"id":"np","label":"New Payment","type":"number","defaultValue":1000}];
             const inputData = inputDefs.map((inp: any) => ({
               name: inp.label.replace(/\([^)]+\)/g, '').trim(),
               val: parseFloat(v[inp.id]) || 0
             }));
             const maxItem = chartData[0].val || 1;
             const filteredInputs = inputData.filter((inp: any) => inp.val > Math.abs(maxItem) * 0.01 && inp.val <= Math.abs(maxItem) * 100);
             res.chart = { type: 'bar', data: [...filteredInputs, chartData[0]], dataKey: 'val', nameKey: 'name' };
          } else {
             const allPositive = chartData.every((d: any) => d.val >= 0);
             const isPie = allPositive && chartData.length <= 4;
             res.chart = { type: isPie ? 'pie' : 'bar', data: chartData, dataKey: 'val', nameKey: 'name' };
          }
        }
        return res as any;
      } catch(e) { return { items: [{label:'Error', value:'Invalid input'}] }; } 
    }
  },
  {
    id: "auto-loan", name: "Auto Loan", category: "Loans & Mortgages", description: "Estimate a typical car loan payment from price, down payment, rate, and term",
    inputs: [{"id":"p","label":"Car Price","type":"number","defaultValue":25000},{"id":"d","label":"Down Payment","type":"number","defaultValue":5000},{"id":"r","label":"Rate (%)","type":"number","defaultValue":5},{"id":"t","label":"Months","type":"number","defaultValue":60}],
    calculate: (v) => { 
      try { 
        const fn = (v: any) => { const p=num(v.p)-num(v.d); const r=num(v.r)/1200; const m=(p*r*Math.pow(1+r,num(v.t)))/(Math.pow(1+r,num(v.t))-1) || 0; return {items:[{label:'Monthly Payment',value:m.toFixed(2),highlight:true}]}; };
        let res: any = fn(v);
        if (!res.chart && res.items && res.items.length > 0) {
          let chartData = res.items.map((item: any) => ({
            name: item.label.replace(/\([^)]+\)/g, '').trim(),
            val: parseFloat(item.value.toString().replace(/[^0-9.-]+/g,"")) || 0
          }));
          if (chartData.length === 1) {
             const inputDefs = [{"id":"p","label":"Car Price","type":"number","defaultValue":25000},{"id":"d","label":"Down Payment","type":"number","defaultValue":5000},{"id":"r","label":"Rate (%)","type":"number","defaultValue":5},{"id":"t","label":"Months","type":"number","defaultValue":60}];
             const inputData = inputDefs.map((inp: any) => ({
               name: inp.label.replace(/\([^)]+\)/g, '').trim(),
               val: parseFloat(v[inp.id]) || 0
             }));
             const maxItem = chartData[0].val || 1;
             const filteredInputs = inputData.filter((inp: any) => inp.val > Math.abs(maxItem) * 0.01 && inp.val <= Math.abs(maxItem) * 100);
             res.chart = { type: 'bar', data: [...filteredInputs, chartData[0]], dataKey: 'val', nameKey: 'name' };
          } else {
             const allPositive = chartData.every((d: any) => d.val >= 0);
             const isPie = allPositive && chartData.length <= 4;
             res.chart = { type: isPie ? 'pie' : 'bar', data: chartData, dataKey: 'val', nameKey: 'name' };
          }
        }
        return res as any;
      } catch(e) { return { items: [{label:'Error', value:'Invalid input'}] }; } 
    }
  },
  {
    id: "student-loan", name: "Student Loan", category: "Loans & Mortgages", description: "Project a monthly student loan payment under standard repayment assumptions",
    inputs: [{"id":"b","label":"Balance","type":"number","defaultValue":30000},{"id":"r","label":"Rate (%)","type":"number","defaultValue":4.5},{"id":"t","label":"Years","type":"number","defaultValue":10}],
    calculate: (v) => { 
      try { 
        const fn = (v: any) => { const p=num(v.b); const r=num(v.r)/1200; const n=num(v.t)*12; const m=(p*r*Math.pow(1+r,n))/(Math.pow(1+r,n)-1) || 0; return {items:[{label:'Monthly Payment',value:m.toFixed(2),highlight:true}]}; };
        let res: any = fn(v);
        if (!res.chart && res.items && res.items.length > 0) {
          let chartData = res.items.map((item: any) => ({
            name: item.label.replace(/\([^)]+\)/g, '').trim(),
            val: parseFloat(item.value.toString().replace(/[^0-9.-]+/g,"")) || 0
          }));
          if (chartData.length === 1) {
             const inputDefs = [{"id":"b","label":"Balance","type":"number","defaultValue":30000},{"id":"r","label":"Rate (%)","type":"number","defaultValue":4.5},{"id":"t","label":"Years","type":"number","defaultValue":10}];
             const inputData = inputDefs.map((inp: any) => ({
               name: inp.label.replace(/\([^)]+\)/g, '').trim(),
               val: parseFloat(v[inp.id]) || 0
             }));
             const maxItem = chartData[0].val || 1;
             const filteredInputs = inputData.filter((inp: any) => inp.val > Math.abs(maxItem) * 0.01 && inp.val <= Math.abs(maxItem) * 100);
             res.chart = { type: 'bar', data: [...filteredInputs, chartData[0]], dataKey: 'val', nameKey: 'name' };
          } else {
             const allPositive = chartData.every((d: any) => d.val >= 0);
             const isPie = allPositive && chartData.length <= 4;
             res.chart = { type: isPie ? 'pie' : 'bar', data: chartData, dataKey: 'val', nameKey: 'name' };
          }
        }
        return res as any;
      } catch(e) { return { items: [{label:'Error', value:'Invalid input'}] }; } 
    }
  },
  {
    id: "personal-loan", name: "Personal Loan", category: "Loans & Mortgages", description: "Estimate monthly payments on an unsecured personal loan",
    inputs: [{"id":"a","label":"Amount","type":"number","defaultValue":10000},{"id":"r","label":"Rate (%)","type":"number","defaultValue":8},{"id":"m","label":"Months","type":"number","defaultValue":36}],
    calculate: (v) => { 
      try { 
        const fn = (v: any) => { const p=num(v.a); const r=num(v.r)/1200; const pay=(p*r*Math.pow(1+r,num(v.m)))/(Math.pow(1+r,num(v.m))-1) || 0; return {items:[{label:'Monthly Payment',value:pay.toFixed(2),highlight:true}]}; };
        let res: any = fn(v);
        if (!res.chart && res.items && res.items.length > 0) {
          let chartData = res.items.map((item: any) => ({
            name: item.label.replace(/\([^)]+\)/g, '').trim(),
            val: parseFloat(item.value.toString().replace(/[^0-9.-]+/g,"")) || 0
          }));
          if (chartData.length === 1) {
             const inputDefs = [{"id":"a","label":"Amount","type":"number","defaultValue":10000},{"id":"r","label":"Rate (%)","type":"number","defaultValue":8},{"id":"m","label":"Months","type":"number","defaultValue":36}];
             const inputData = inputDefs.map((inp: any) => ({
               name: inp.label.replace(/\([^)]+\)/g, '').trim(),
               val: parseFloat(v[inp.id]) || 0
             }));
             const maxItem = chartData[0].val || 1;
             const filteredInputs = inputData.filter((inp: any) => inp.val > Math.abs(maxItem) * 0.01 && inp.val <= Math.abs(maxItem) * 100);
             res.chart = { type: 'bar', data: [...filteredInputs, chartData[0]], dataKey: 'val', nameKey: 'name' };
          } else {
             const allPositive = chartData.every((d: any) => d.val >= 0);
             const isPie = allPositive && chartData.length <= 4;
             res.chart = { type: isPie ? 'pie' : 'bar', data: chartData, dataKey: 'val', nameKey: 'name' };
          }
        }
        return res as any;
      } catch(e) { return { items: [{label:'Error', value:'Invalid input'}] }; } 
    }
  },
  {
    id: "debt-consolidation", name: "Debt Consolidation", category: "Loans & Mortgages", description: "Consolidate multiple loans",
    inputs: [{"id":"d1","label":"Debt 1","type":"number","defaultValue":5000},{"id":"d2","label":"Debt 2","type":"number","defaultValue":3000},{"id":"nr","label":"New Rate (%)","type":"number","defaultValue":6},{"id":"nm","label":"New Months","type":"number","defaultValue":48}],
    calculate: (v) => { 
      try { 
        const fn = (v: any) => { const p=num(v.d1)+num(v.d2); const r=num(v.nr)/1200; const pay=(p*r*Math.pow(1+r,num(v.nm)))/(Math.pow(1+r,num(v.nm))-1) || 0; return {items:[{label:'New Payment',value:pay.toFixed(2),highlight:true}]}; };
        let res: any = fn(v);
        if (!res.chart && res.items && res.items.length > 0) {
          let chartData = res.items.map((item: any) => ({
            name: item.label.replace(/\([^)]+\)/g, '').trim(),
            val: parseFloat(item.value.toString().replace(/[^0-9.-]+/g,"")) || 0
          }));
          if (chartData.length === 1) {
             const inputDefs = [{"id":"d1","label":"Debt 1","type":"number","defaultValue":5000},{"id":"d2","label":"Debt 2","type":"number","defaultValue":3000},{"id":"nr","label":"New Rate (%)","type":"number","defaultValue":6},{"id":"nm","label":"New Months","type":"number","defaultValue":48}];
             const inputData = inputDefs.map((inp: any) => ({
               name: inp.label.replace(/\([^)]+\)/g, '').trim(),
               val: parseFloat(v[inp.id]) || 0
             }));
             const maxItem = chartData[0].val || 1;
             const filteredInputs = inputData.filter((inp: any) => inp.val > Math.abs(maxItem) * 0.01 && inp.val <= Math.abs(maxItem) * 100);
             res.chart = { type: 'bar', data: [...filteredInputs, chartData[0]], dataKey: 'val', nameKey: 'name' };
          } else {
             const allPositive = chartData.every((d: any) => d.val >= 0);
             const isPie = allPositive && chartData.length <= 4;
             res.chart = { type: isPie ? 'pie' : 'bar', data: chartData, dataKey: 'val', nameKey: 'name' };
          }
        }
        return res as any;
      } catch(e) { return { items: [{label:'Error', value:'Invalid input'}] }; } 
    }
  },
  {
    id: "interest-only", name: "Interest Only", category: "Loans & Mortgages", description: "Monthly payment for IO loan",
    inputs: [{"id":"b","label":"Balance","type":"number","defaultValue":100000},{"id":"r","label":"Rate (%)","type":"number","defaultValue":5}],
    calculate: (v) => { 
      try { 
        const fn = (v: any) => { const i=(num(v.b)*(num(v.r)/100))/12; return {items:[{label:'Monthly Payment',value:i.toFixed(2),highlight:true}]}; };
        let res: any = fn(v);
        if (!res.chart && res.items && res.items.length > 0) {
          let chartData = res.items.map((item: any) => ({
            name: item.label.replace(/\([^)]+\)/g, '').trim(),
            val: parseFloat(item.value.toString().replace(/[^0-9.-]+/g,"")) || 0
          }));
          if (chartData.length === 1) {
             const inputDefs = [{"id":"b","label":"Balance","type":"number","defaultValue":100000},{"id":"r","label":"Rate (%)","type":"number","defaultValue":5}];
             const inputData = inputDefs.map((inp: any) => ({
               name: inp.label.replace(/\([^)]+\)/g, '').trim(),
               val: parseFloat(v[inp.id]) || 0
             }));
             const maxItem = chartData[0].val || 1;
             const filteredInputs = inputData.filter((inp: any) => inp.val > Math.abs(maxItem) * 0.01 && inp.val <= Math.abs(maxItem) * 100);
             res.chart = { type: 'bar', data: [...filteredInputs, chartData[0]], dataKey: 'val', nameKey: 'name' };
          } else {
             const allPositive = chartData.every((d: any) => d.val >= 0);
             const isPie = allPositive && chartData.length <= 4;
             res.chart = { type: isPie ? 'pie' : 'bar', data: chartData, dataKey: 'val', nameKey: 'name' };
          }
        }
        return res as any;
      } catch(e) { return { items: [{label:'Error', value:'Invalid input'}] }; } 
    }
  },
  {
    id: "overpayment", name: "Loan Overpayment", category: "Loans & Mortgages", description: "Time saved by overpaying",
    inputs: [{"id":"b","label":"Balance","type":"number","defaultValue":100000},{"id":"r","label":"Rate (%)","type":"number","defaultValue":5},{"id":"p","label":"Current Payment","type":"number","defaultValue":600},{"id":"o","label":"Overpayment","type":"number","defaultValue":200}],
    calculate: (v) => { 
      try { 
        const fn = (v: any) => { const i=num(v.r)/1200; const m1=-Math.log(1-(i*num(v.b))/num(v.p))/Math.log(1+i); const m2=-Math.log(1-(i*num(v.b))/(num(v.p)+num(v.o)))/Math.log(1+i); return {items:[{label:'Months Saved',value:(m1-m2).toFixed(1),highlight:true}]}; };
        let res: any = fn(v);
        if (!res.chart && res.items && res.items.length > 0) {
          let chartData = res.items.map((item: any) => ({
            name: item.label.replace(/\([^)]+\)/g, '').trim(),
            val: parseFloat(item.value.toString().replace(/[^0-9.-]+/g,"")) || 0
          }));
          if (chartData.length === 1) {
             const inputDefs = [{"id":"b","label":"Balance","type":"number","defaultValue":100000},{"id":"r","label":"Rate (%)","type":"number","defaultValue":5},{"id":"p","label":"Current Payment","type":"number","defaultValue":600},{"id":"o","label":"Overpayment","type":"number","defaultValue":200}];
             const inputData = inputDefs.map((inp: any) => ({
               name: inp.label.replace(/\([^)]+\)/g, '').trim(),
               val: parseFloat(v[inp.id]) || 0
             }));
             const maxItem = chartData[0].val || 1;
             const filteredInputs = inputData.filter((inp: any) => inp.val > Math.abs(maxItem) * 0.01 && inp.val <= Math.abs(maxItem) * 100);
             res.chart = { type: 'bar', data: [...filteredInputs, chartData[0]], dataKey: 'val', nameKey: 'name' };
          } else {
             const allPositive = chartData.every((d: any) => d.val >= 0);
             const isPie = allPositive && chartData.length <= 4;
             res.chart = { type: isPie ? 'pie' : 'bar', data: chartData, dataKey: 'val', nameKey: 'name' };
          }
        }
        return res as any;
      } catch(e) { return { items: [{label:'Error', value:'Invalid input'}] }; } 
    }
  },
  {
    id: "loan-apr", name: "Loan APR", category: "Loans & Mortgages", description: "Estimate real cost including fees",
    inputs: [{"id":"a","label":"Loan Amount","type":"number","defaultValue":10000},{"id":"f","label":"Fees","type":"number","defaultValue":500},{"id":"r","label":"Stated Rate (%)","type":"number","defaultValue":5}],
    calculate: (v) => { 
      try { 
        const fn = (v: any) => { const apr=num(v.r) + (num(v.f)/num(v.a))*100; return {items:[{label:'Est. APR (%)',value:apr.toFixed(2)+'%',highlight:true}]}; };
        let res: any = fn(v);
        if (!res.chart && res.items && res.items.length > 0) {
          let chartData = res.items.map((item: any) => ({
            name: item.label.replace(/\([^)]+\)/g, '').trim(),
            val: parseFloat(item.value.toString().replace(/[^0-9.-]+/g,"")) || 0
          }));
          if (chartData.length === 1) {
             const inputDefs = [{"id":"a","label":"Loan Amount","type":"number","defaultValue":10000},{"id":"f","label":"Fees","type":"number","defaultValue":500},{"id":"r","label":"Stated Rate (%)","type":"number","defaultValue":5}];
             const inputData = inputDefs.map((inp: any) => ({
               name: inp.label.replace(/\([^)]+\)/g, '').trim(),
               val: parseFloat(v[inp.id]) || 0
             }));
             const maxItem = chartData[0].val || 1;
             const filteredInputs = inputData.filter((inp: any) => inp.val > Math.abs(maxItem) * 0.01 && inp.val <= Math.abs(maxItem) * 100);
             res.chart = { type: 'bar', data: [...filteredInputs, chartData[0]], dataKey: 'val', nameKey: 'name' };
          } else {
             const allPositive = chartData.every((d: any) => d.val >= 0);
             const isPie = allPositive && chartData.length <= 4;
             res.chart = { type: isPie ? 'pie' : 'bar', data: chartData, dataKey: 'val', nameKey: 'name' };
          }
        }
        return res as any;
      } catch(e) { return { items: [{label:'Error', value:'Invalid input'}] }; } 
    }
  },
  {
    id: "guarantor-loan", name: "Guarantor Loan", category: "Loans & Mortgages", description: "High rate guarantor loan",
    inputs: [{"id":"a","label":"Amount","type":"number","defaultValue":5000},{"id":"r","label":"Rate (%)","type":"number","defaultValue":35},{"id":"m","label":"Months","type":"number","defaultValue":24}],
    calculate: (v) => { 
      try { 
        const fn = (v: any) => { const p=num(v.a); const r=num(v.r)/1200; const pay=(p*r*Math.pow(1+r,num(v.m)))/(Math.pow(1+r,num(v.m))-1) || 0; return {items:[{label:'Monthly Payment',value:pay.toFixed(2),highlight:true}]}; };
        let res: any = fn(v);
        if (!res.chart && res.items && res.items.length > 0) {
          let chartData = res.items.map((item: any) => ({
            name: item.label.replace(/\([^)]+\)/g, '').trim(),
            val: parseFloat(item.value.toString().replace(/[^0-9.-]+/g,"")) || 0
          }));
          if (chartData.length === 1) {
             const inputDefs = [{"id":"a","label":"Amount","type":"number","defaultValue":5000},{"id":"r","label":"Rate (%)","type":"number","defaultValue":35},{"id":"m","label":"Months","type":"number","defaultValue":24}];
             const inputData = inputDefs.map((inp: any) => ({
               name: inp.label.replace(/\([^)]+\)/g, '').trim(),
               val: parseFloat(v[inp.id]) || 0
             }));
             const maxItem = chartData[0].val || 1;
             const filteredInputs = inputData.filter((inp: any) => inp.val > Math.abs(maxItem) * 0.01 && inp.val <= Math.abs(maxItem) * 100);
             res.chart = { type: 'bar', data: [...filteredInputs, chartData[0]], dataKey: 'val', nameKey: 'name' };
          } else {
             const allPositive = chartData.every((d: any) => d.val >= 0);
             const isPie = allPositive && chartData.length <= 4;
             res.chart = { type: isPie ? 'pie' : 'bar', data: chartData, dataKey: 'val', nameKey: 'name' };
          }
        }
        return res as any;
      } catch(e) { return { items: [{label:'Error', value:'Invalid input'}] }; } 
    }
  },
  {
    id: "balloon-payment", name: "Balloon Payment", category: "Loans & Mortgages", description: "Remaining balance after term",
    inputs: [{"id":"a","label":"Amount","type":"number","defaultValue":100000},{"id":"r","label":"Rate (%)","type":"number","defaultValue":5},{"id":"am","label":"Amortization (Yrs)","type":"number","defaultValue":30},{"id":"bt","label":"Balloon Term (Yrs)","type":"number","defaultValue":7}],
    calculate: (v) => { 
      try { 
        const fn = (v: any) => { const p=num(v.a); const r=num(v.r)/1200; const n1=num(v.am)*12; const n2=num(v.bt)*12; const pay=(p*r*Math.pow(1+r,n1))/(Math.pow(1+r,n1)-1); const bal=p*Math.pow(1+r,n2) - (pay/r)*(Math.pow(1+r,n2)-1); return {items:[{label:'Balloon Payment',value:bal.toFixed(2),highlight:true}]}; };
        let res: any = fn(v);
        if (!res.chart && res.items && res.items.length > 0) {
          let chartData = res.items.map((item: any) => ({
            name: item.label.replace(/\([^)]+\)/g, '').trim(),
            val: parseFloat(item.value.toString().replace(/[^0-9.-]+/g,"")) || 0
          }));
          if (chartData.length === 1) {
             const inputDefs = [{"id":"a","label":"Amount","type":"number","defaultValue":100000},{"id":"r","label":"Rate (%)","type":"number","defaultValue":5},{"id":"am","label":"Amortization (Yrs)","type":"number","defaultValue":30},{"id":"bt","label":"Balloon Term (Yrs)","type":"number","defaultValue":7}];
             const inputData = inputDefs.map((inp: any) => ({
               name: inp.label.replace(/\([^)]+\)/g, '').trim(),
               val: parseFloat(v[inp.id]) || 0
             }));
             const maxItem = chartData[0].val || 1;
             const filteredInputs = inputData.filter((inp: any) => inp.val > Math.abs(maxItem) * 0.01 && inp.val <= Math.abs(maxItem) * 100);
             res.chart = { type: 'bar', data: [...filteredInputs, chartData[0]], dataKey: 'val', nameKey: 'name' };
          } else {
             const allPositive = chartData.every((d: any) => d.val >= 0);
             const isPie = allPositive && chartData.length <= 4;
             res.chart = { type: isPie ? 'pie' : 'bar', data: chartData, dataKey: 'val', nameKey: 'name' };
          }
        }
        return res as any;
      } catch(e) { return { items: [{label:'Error', value:'Invalid input'}] }; } 
    }
  },
  {
    id: "mortgage", name: "Mortgage", category: "Real Estate", description: "Calculate a basic home loan payment from loan amount, rate, and term",
    inputs: [{"id":"p","label":"Home Price","type":"number","defaultValue":300000},{"id":"d","label":"Down Payment","type":"number","defaultValue":60000},{"id":"r","label":"Rate (%)","type":"number","defaultValue":4},{"id":"y","label":"Years","type":"number","defaultValue":30}],
    calculate: (v) => { 
      try { 
        const fn = (v: any) => { const p=num(v.p)-num(v.d); const r=num(v.r)/1200; const n=num(v.y)*12; const m=(p*r*Math.pow(1+r,n))/(Math.pow(1+r,n)-1); const chart={type:'pie',data:[{name:'Principal',value:p},{name:'Interest',value:m*n-p}]}; return {items:[{label:'Monthly Payment',value:m.toFixed(2),highlight:true}], chart}; };
        let res: any = fn(v);
        if (!res.chart && res.items && res.items.length > 0) {
          let chartData = res.items.map((item: any) => ({
            name: item.label.replace(/\([^)]+\)/g, '').trim(),
            val: parseFloat(item.value.toString().replace(/[^0-9.-]+/g,"")) || 0
          }));
          if (chartData.length === 1) {
             const inputDefs = [{"id":"p","label":"Home Price","type":"number","defaultValue":300000},{"id":"d","label":"Down Payment","type":"number","defaultValue":60000},{"id":"r","label":"Rate (%)","type":"number","defaultValue":4},{"id":"y","label":"Years","type":"number","defaultValue":30}];
             const inputData = inputDefs.map((inp: any) => ({
               name: inp.label.replace(/\([^)]+\)/g, '').trim(),
               val: parseFloat(v[inp.id]) || 0
             }));
             const maxItem = chartData[0].val || 1;
             const filteredInputs = inputData.filter((inp: any) => inp.val > Math.abs(maxItem) * 0.01 && inp.val <= Math.abs(maxItem) * 100);
             res.chart = { type: 'bar', data: [...filteredInputs, chartData[0]], dataKey: 'val', nameKey: 'name' };
          } else {
             const allPositive = chartData.every((d: any) => d.val >= 0);
             const isPie = allPositive && chartData.length <= 4;
             res.chart = { type: isPie ? 'pie' : 'bar', data: chartData, dataKey: 'val', nameKey: 'name' };
          }
        }
        return res as any;
      } catch(e) { return { items: [{label:'Error', value:'Invalid input'}] }; } 
    }
  },
  {
    id: "down-payment", name: "Down Payment", category: "Real Estate", description: "Plan how much cash you need upfront and how it affects the loan size",
    inputs: [{"id":"p","label":"Price","type":"number","defaultValue":300000},{"id":"pct","label":"Percentage (%)","type":"number","defaultValue":20}],
    calculate: (v) => { 
      try { 
        const fn = (v: any) => { const d=num(v.p)*(num(v.pct)/100); return {items:[{label:'Down Payment',value:d.toFixed(2),highlight:true}]}; };
        let res: any = fn(v);
        if (!res.chart && res.items && res.items.length > 0) {
          let chartData = res.items.map((item: any) => ({
            name: item.label.replace(/\([^)]+\)/g, '').trim(),
            val: parseFloat(item.value.toString().replace(/[^0-9.-]+/g,"")) || 0
          }));
          if (chartData.length === 1) {
             const inputDefs = [{"id":"p","label":"Price","type":"number","defaultValue":300000},{"id":"pct","label":"Percentage (%)","type":"number","defaultValue":20}];
             const inputData = inputDefs.map((inp: any) => ({
               name: inp.label.replace(/\([^)]+\)/g, '').trim(),
               val: parseFloat(v[inp.id]) || 0
             }));
             const maxItem = chartData[0].val || 1;
             const filteredInputs = inputData.filter((inp: any) => inp.val > Math.abs(maxItem) * 0.01 && inp.val <= Math.abs(maxItem) * 100);
             res.chart = { type: 'bar', data: [...filteredInputs, chartData[0]], dataKey: 'val', nameKey: 'name' };
          } else {
             const allPositive = chartData.every((d: any) => d.val >= 0);
             const isPie = allPositive && chartData.length <= 4;
             res.chart = { type: isPie ? 'pie' : 'bar', data: chartData, dataKey: 'val', nameKey: 'name' };
          }
        }
        return res as any;
      } catch(e) { return { items: [{label:'Error', value:'Invalid input'}] }; } 
    }
  },
  {
    id: "rent-vs-buy", name: "Rent vs Buy", category: "Real Estate", description: "Compare the long-run cost of renting versus buying for your situation",
    inputs: [{"id":"r","label":"Monthly Rent","type":"number","defaultValue":1500},{"id":"m","label":"Est. Mortgage","type":"number","defaultValue":1200},{"id":"t","label":"Taxes+Ins","type":"number","defaultValue":400}],
    calculate: (v) => { 
      try { 
        const fn = (v: any) => { const buy=num(v.m)+num(v.t); const chart={type:'bar',data:[{name:'Rent',val:num(v.r)},{name:'Buy',val:buy}],dataKey:'val',nameKey:'name'}; return {items:[{label:'Buy Cost',value:buy.toFixed(2),highlight:true},{label:'Rent Cost',value:num(v.r).toFixed(2)}], chart}; };
        let res: any = fn(v);
        if (!res.chart && res.items && res.items.length > 0) {
          let chartData = res.items.map((item: any) => ({
            name: item.label.replace(/\([^)]+\)/g, '').trim(),
            val: parseFloat(item.value.toString().replace(/[^0-9.-]+/g,"")) || 0
          }));
          if (chartData.length === 1) {
             const inputDefs = [{"id":"r","label":"Monthly Rent","type":"number","defaultValue":1500},{"id":"m","label":"Est. Mortgage","type":"number","defaultValue":1200},{"id":"t","label":"Taxes+Ins","type":"number","defaultValue":400}];
             const inputData = inputDefs.map((inp: any) => ({
               name: inp.label.replace(/\([^)]+\)/g, '').trim(),
               val: parseFloat(v[inp.id]) || 0
             }));
             const maxItem = chartData[0].val || 1;
             const filteredInputs = inputData.filter((inp: any) => inp.val > Math.abs(maxItem) * 0.01 && inp.val <= Math.abs(maxItem) * 100);
             res.chart = { type: 'bar', data: [...filteredInputs, chartData[0]], dataKey: 'val', nameKey: 'name' };
          } else {
             const allPositive = chartData.every((d: any) => d.val >= 0);
             const isPie = allPositive && chartData.length <= 4;
             res.chart = { type: isPie ? 'pie' : 'bar', data: chartData, dataKey: 'val', nameKey: 'name' };
          }
        }
        return res as any;
      } catch(e) { return { items: [{label:'Error', value:'Invalid input'}] }; } 
    }
  },
  {
    id: "affordability", name: "Home Affordability", category: "Real Estate", description: "Based on 28% rule",
    inputs: [{"id":"i","label":"Gross Monthly Income","type":"number","defaultValue":6000},{"id":"d","label":"Monthly Debts","type":"number","defaultValue":500}],
    calculate: (v) => { 
      try { 
        const fn = (v: any) => { const max=(num(v.i)*0.28); const act=Math.max(0, max-num(v.d)); return {items:[{label:'Max Mortgage Pmt',value:act.toFixed(2),highlight:true}]}; };
        let res: any = fn(v);
        if (!res.chart && res.items && res.items.length > 0) {
          let chartData = res.items.map((item: any) => ({
            name: item.label.replace(/\([^)]+\)/g, '').trim(),
            val: parseFloat(item.value.toString().replace(/[^0-9.-]+/g,"")) || 0
          }));
          if (chartData.length === 1) {
             const inputDefs = [{"id":"i","label":"Gross Monthly Income","type":"number","defaultValue":6000},{"id":"d","label":"Monthly Debts","type":"number","defaultValue":500}];
             const inputData = inputDefs.map((inp: any) => ({
               name: inp.label.replace(/\([^)]+\)/g, '').trim(),
               val: parseFloat(v[inp.id]) || 0
             }));
             const maxItem = chartData[0].val || 1;
             const filteredInputs = inputData.filter((inp: any) => inp.val > Math.abs(maxItem) * 0.01 && inp.val <= Math.abs(maxItem) * 100);
             res.chart = { type: 'bar', data: [...filteredInputs, chartData[0]], dataKey: 'val', nameKey: 'name' };
          } else {
             const allPositive = chartData.every((d: any) => d.val >= 0);
             const isPie = allPositive && chartData.length <= 4;
             res.chart = { type: isPie ? 'pie' : 'bar', data: chartData, dataKey: 'val', nameKey: 'name' };
          }
        }
        return res as any;
      } catch(e) { return { items: [{label:'Error', value:'Invalid input'}] }; } 
    }
  },
  {
    id: "rental-yield", name: "Rental Yield", category: "Real Estate", description: "Gross Rental Yield",
    inputs: [{"id":"r","label":"Monthly Rent","type":"number","defaultValue":1500},{"id":"p","label":"Property Price","type":"number","defaultValue":300000}],
    calculate: (v) => { 
      try { 
        const fn = (v: any) => { const y=((num(v.r)*12)/num(v.p))*100; return {items:[{label:'Yield (%)',value:y.toFixed(2)+'%',highlight:true}]}; };
        let res: any = fn(v);
        if (!res.chart && res.items && res.items.length > 0) {
          let chartData = res.items.map((item: any) => ({
            name: item.label.replace(/\([^)]+\)/g, '').trim(),
            val: parseFloat(item.value.toString().replace(/[^0-9.-]+/g,"")) || 0
          }));
          if (chartData.length === 1) {
             const inputDefs = [{"id":"r","label":"Monthly Rent","type":"number","defaultValue":1500},{"id":"p","label":"Property Price","type":"number","defaultValue":300000}];
             const inputData = inputDefs.map((inp: any) => ({
               name: inp.label.replace(/\([^)]+\)/g, '').trim(),
               val: parseFloat(v[inp.id]) || 0
             }));
             const maxItem = chartData[0].val || 1;
             const filteredInputs = inputData.filter((inp: any) => inp.val > Math.abs(maxItem) * 0.01 && inp.val <= Math.abs(maxItem) * 100);
             res.chart = { type: 'bar', data: [...filteredInputs, chartData[0]], dataKey: 'val', nameKey: 'name' };
          } else {
             const allPositive = chartData.every((d: any) => d.val >= 0);
             const isPie = allPositive && chartData.length <= 4;
             res.chart = { type: isPie ? 'pie' : 'bar', data: chartData, dataKey: 'val', nameKey: 'name' };
          }
        }
        return res as any;
      } catch(e) { return { items: [{label:'Error', value:'Invalid input'}] }; } 
    }
  },
  {
    id: "property-tax", name: "Property Tax", category: "Real Estate", description: "Estimate annual property tax from home value and local tax rate",
    inputs: [{"id":"v","label":"Assessed Value","type":"number","defaultValue":300000},{"id":"r","label":"Tax Rate (%)","type":"number","defaultValue":1.2}],
    calculate: (v) => { 
      try { 
        const fn = (v: any) => { const t=num(v.v)*(num(v.r)/100); return {items:[{label:'Annual Tax',value:t.toFixed(2),highlight:true}]}; };
        let res: any = fn(v);
        if (!res.chart && res.items && res.items.length > 0) {
          let chartData = res.items.map((item: any) => ({
            name: item.label.replace(/\([^)]+\)/g, '').trim(),
            val: parseFloat(item.value.toString().replace(/[^0-9.-]+/g,"")) || 0
          }));
          if (chartData.length === 1) {
             const inputDefs = [{"id":"v","label":"Assessed Value","type":"number","defaultValue":300000},{"id":"r","label":"Tax Rate (%)","type":"number","defaultValue":1.2}];
             const inputData = inputDefs.map((inp: any) => ({
               name: inp.label.replace(/\([^)]+\)/g, '').trim(),
               val: parseFloat(v[inp.id]) || 0
             }));
             const maxItem = chartData[0].val || 1;
             const filteredInputs = inputData.filter((inp: any) => inp.val > Math.abs(maxItem) * 0.01 && inp.val <= Math.abs(maxItem) * 100);
             res.chart = { type: 'bar', data: [...filteredInputs, chartData[0]], dataKey: 'val', nameKey: 'name' };
          } else {
             const allPositive = chartData.every((d: any) => d.val >= 0);
             const isPie = allPositive && chartData.length <= 4;
             res.chart = { type: isPie ? 'pie' : 'bar', data: chartData, dataKey: 'val', nameKey: 'name' };
          }
        }
        return res as any;
      } catch(e) { return { items: [{label:'Error', value:'Invalid input'}] }; } 
    }
  },
  {
    id: "stamp-duty", name: "Stamp Duty", category: "Real Estate", description: "Est. stamp duty (flat %)",
    inputs: [{"id":"p","label":"Property Price","type":"number","defaultValue":300000},{"id":"r","label":"Rate (%)","type":"number","defaultValue":2}],
    calculate: (v) => { 
      try { 
        const fn = (v: any) => { const s=num(v.p)*(num(v.r)/100); return {items:[{label:'Stamp Duty',value:s.toFixed(2),highlight:true}]}; };
        let res: any = fn(v);
        if (!res.chart && res.items && res.items.length > 0) {
          let chartData = res.items.map((item: any) => ({
            name: item.label.replace(/\([^)]+\)/g, '').trim(),
            val: parseFloat(item.value.toString().replace(/[^0-9.-]+/g,"")) || 0
          }));
          if (chartData.length === 1) {
             const inputDefs = [{"id":"p","label":"Property Price","type":"number","defaultValue":300000},{"id":"r","label":"Rate (%)","type":"number","defaultValue":2}];
             const inputData = inputDefs.map((inp: any) => ({
               name: inp.label.replace(/\([^)]+\)/g, '').trim(),
               val: parseFloat(v[inp.id]) || 0
             }));
             const maxItem = chartData[0].val || 1;
             const filteredInputs = inputData.filter((inp: any) => inp.val > Math.abs(maxItem) * 0.01 && inp.val <= Math.abs(maxItem) * 100);
             res.chart = { type: 'bar', data: [...filteredInputs, chartData[0]], dataKey: 'val', nameKey: 'name' };
          } else {
             const allPositive = chartData.every((d: any) => d.val >= 0);
             const isPie = allPositive && chartData.length <= 4;
             res.chart = { type: isPie ? 'pie' : 'bar', data: chartData, dataKey: 'val', nameKey: 'name' };
          }
        }
        return res as any;
      } catch(e) { return { items: [{label:'Error', value:'Invalid input'}] }; } 
    }
  },
  {
    id: "house-appreciation", name: "House Appreciation", category: "Real Estate", description: "Future value of property",
    inputs: [{"id":"p","label":"Current Price","type":"number","defaultValue":300000},{"id":"r","label":"Annual Growth (%)","type":"number","defaultValue":4},{"id":"y","label":"Years","type":"number","defaultValue":10}],
    calculate: (v) => { 
      try { 
        const fn = (v: any) => { const f=num(v.p)*Math.pow(1+num(v.r)/100, num(v.y)); return {items:[{label:'Future Value',value:f.toFixed(2),highlight:true}]}; };
        let res: any = fn(v);
        if (!res.chart && res.items && res.items.length > 0) {
          let chartData = res.items.map((item: any) => ({
            name: item.label.replace(/\([^)]+\)/g, '').trim(),
            val: parseFloat(item.value.toString().replace(/[^0-9.-]+/g,"")) || 0
          }));
          if (chartData.length === 1) {
             const inputDefs = [{"id":"p","label":"Current Price","type":"number","defaultValue":300000},{"id":"r","label":"Annual Growth (%)","type":"number","defaultValue":4},{"id":"y","label":"Years","type":"number","defaultValue":10}];
             const inputData = inputDefs.map((inp: any) => ({
               name: inp.label.replace(/\([^)]+\)/g, '').trim(),
               val: parseFloat(v[inp.id]) || 0
             }));
             const maxItem = chartData[0].val || 1;
             const filteredInputs = inputData.filter((inp: any) => inp.val > Math.abs(maxItem) * 0.01 && inp.val <= Math.abs(maxItem) * 100);
             res.chart = { type: 'bar', data: [...filteredInputs, chartData[0]], dataKey: 'val', nameKey: 'name' };
          } else {
             const allPositive = chartData.every((d: any) => d.val >= 0);
             const isPie = allPositive && chartData.length <= 4;
             res.chart = { type: isPie ? 'pie' : 'bar', data: chartData, dataKey: 'val', nameKey: 'name' };
          }
        }
        return res as any;
      } catch(e) { return { items: [{label:'Error', value:'Invalid input'}] }; } 
    }
  },
  {
    id: "roi-property", name: "Property ROI", category: "Real Estate", description: "Return on cash invested",
    inputs: [{"id":"c","label":"Cash Invested","type":"number","defaultValue":60000},{"id":"cf","label":"Annual Cash Flow","type":"number","defaultValue":3600}],
    calculate: (v) => { 
      try { 
        const fn = (v: any) => { const roi=(num(v.cf)/num(v.c))*100; return {items:[{label:'Cash-on-Cash ROI (%)',value:roi.toFixed(2)+'%',highlight:true}]}; };
        let res: any = fn(v);
        if (!res.chart && res.items && res.items.length > 0) {
          let chartData = res.items.map((item: any) => ({
            name: item.label.replace(/\([^)]+\)/g, '').trim(),
            val: parseFloat(item.value.toString().replace(/[^0-9.-]+/g,"")) || 0
          }));
          if (chartData.length === 1) {
             const inputDefs = [{"id":"c","label":"Cash Invested","type":"number","defaultValue":60000},{"id":"cf","label":"Annual Cash Flow","type":"number","defaultValue":3600}];
             const inputData = inputDefs.map((inp: any) => ({
               name: inp.label.replace(/\([^)]+\)/g, '').trim(),
               val: parseFloat(v[inp.id]) || 0
             }));
             const maxItem = chartData[0].val || 1;
             const filteredInputs = inputData.filter((inp: any) => inp.val > Math.abs(maxItem) * 0.01 && inp.val <= Math.abs(maxItem) * 100);
             res.chart = { type: 'bar', data: [...filteredInputs, chartData[0]], dataKey: 'val', nameKey: 'name' };
          } else {
             const allPositive = chartData.every((d: any) => d.val >= 0);
             const isPie = allPositive && chartData.length <= 4;
             res.chart = { type: isPie ? 'pie' : 'bar', data: chartData, dataKey: 'val', nameKey: 'name' };
          }
        }
        return res as any;
      } catch(e) { return { items: [{label:'Error', value:'Invalid input'}] }; } 
    }
  },
  {
    id: "cap-rate", name: "Cap Rate", category: "Real Estate", description: "Capitalization Rate",
    inputs: [{"id":"noi","label":"Net Operating Income","type":"number","defaultValue":24000},{"id":"v","label":"Property Value","type":"number","defaultValue":300000}],
    calculate: (v) => { 
      try { 
        const fn = (v: any) => { const c=(num(v.noi)/num(v.v))*100; return {items:[{label:'Cap Rate (%)',value:c.toFixed(2)+'%',highlight:true}]}; };
        let res: any = fn(v);
        if (!res.chart && res.items && res.items.length > 0) {
          let chartData = res.items.map((item: any) => ({
            name: item.label.replace(/\([^)]+\)/g, '').trim(),
            val: parseFloat(item.value.toString().replace(/[^0-9.-]+/g,"")) || 0
          }));
          if (chartData.length === 1) {
             const inputDefs = [{"id":"noi","label":"Net Operating Income","type":"number","defaultValue":24000},{"id":"v","label":"Property Value","type":"number","defaultValue":300000}];
             const inputData = inputDefs.map((inp: any) => ({
               name: inp.label.replace(/\([^)]+\)/g, '').trim(),
               val: parseFloat(v[inp.id]) || 0
             }));
             const maxItem = chartData[0].val || 1;
             const filteredInputs = inputData.filter((inp: any) => inp.val > Math.abs(maxItem) * 0.01 && inp.val <= Math.abs(maxItem) * 100);
             res.chart = { type: 'bar', data: [...filteredInputs, chartData[0]], dataKey: 'val', nameKey: 'name' };
          } else {
             const allPositive = chartData.every((d: any) => d.val >= 0);
             const isPie = allPositive && chartData.length <= 4;
             res.chart = { type: isPie ? 'pie' : 'bar', data: chartData, dataKey: 'val', nameKey: 'name' };
          }
        }
        return res as any;
      } catch(e) { return { items: [{label:'Error', value:'Invalid input'}] }; } 
    }
  },
  {
    id: "ltv", name: "LTV Ratio", category: "Real Estate", description: "Loan to Value Ratio",
    inputs: [{"id":"l","label":"Loan Amount","type":"number","defaultValue":240000},{"id":"v","label":"Property Value","type":"number","defaultValue":300000}],
    calculate: (v) => { 
      try { 
        const fn = (v: any) => { const ltv=(num(v.l)/num(v.v))*100; return {items:[{label:'LTV (%)',value:ltv.toFixed(2)+'%',highlight:true}]}; };
        let res: any = fn(v);
        if (!res.chart && res.items && res.items.length > 0) {
          let chartData = res.items.map((item: any) => ({
            name: item.label.replace(/\([^)]+\)/g, '').trim(),
            val: parseFloat(item.value.toString().replace(/[^0-9.-]+/g,"")) || 0
          }));
          if (chartData.length === 1) {
             const inputDefs = [{"id":"l","label":"Loan Amount","type":"number","defaultValue":240000},{"id":"v","label":"Property Value","type":"number","defaultValue":300000}];
             const inputData = inputDefs.map((inp: any) => ({
               name: inp.label.replace(/\([^)]+\)/g, '').trim(),
               val: parseFloat(v[inp.id]) || 0
             }));
             const maxItem = chartData[0].val || 1;
             const filteredInputs = inputData.filter((inp: any) => inp.val > Math.abs(maxItem) * 0.01 && inp.val <= Math.abs(maxItem) * 100);
             res.chart = { type: 'bar', data: [...filteredInputs, chartData[0]], dataKey: 'val', nameKey: 'name' };
          } else {
             const allPositive = chartData.every((d: any) => d.val >= 0);
             const isPie = allPositive && chartData.length <= 4;
             res.chart = { type: isPie ? 'pie' : 'bar', data: chartData, dataKey: 'val', nameKey: 'name' };
          }
        }
        return res as any;
      } catch(e) { return { items: [{label:'Error', value:'Invalid input'}] }; } 
    }
  },
  {
    id: "closing-costs", name: "Closing Costs", category: "Real Estate", description: "Estimate closing costs (3%)",
    inputs: [{"id":"p","label":"Property Price","type":"number","defaultValue":300000}],
    calculate: (v) => { 
      try { 
        const fn = (v: any) => { const c=num(v.p)*0.03; return {items:[{label:'Est. Closing Costs',value:c.toFixed(2),highlight:true}]}; };
        let res: any = fn(v);
        if (!res.chart && res.items && res.items.length > 0) {
          let chartData = res.items.map((item: any) => ({
            name: item.label.replace(/\([^)]+\)/g, '').trim(),
            val: parseFloat(item.value.toString().replace(/[^0-9.-]+/g,"")) || 0
          }));
          if (chartData.length === 1) {
             const inputDefs = [{"id":"p","label":"Property Price","type":"number","defaultValue":300000}];
             const inputData = inputDefs.map((inp: any) => ({
               name: inp.label.replace(/\([^)]+\)/g, '').trim(),
               val: parseFloat(v[inp.id]) || 0
             }));
             const maxItem = chartData[0].val || 1;
             const filteredInputs = inputData.filter((inp: any) => inp.val > Math.abs(maxItem) * 0.01 && inp.val <= Math.abs(maxItem) * 100);
             res.chart = { type: 'bar', data: [...filteredInputs, chartData[0]], dataKey: 'val', nameKey: 'name' };
          } else {
             const allPositive = chartData.every((d: any) => d.val >= 0);
             const isPie = allPositive && chartData.length <= 4;
             res.chart = { type: isPie ? 'pie' : 'bar', data: chartData, dataKey: 'val', nameKey: 'name' };
          }
        }
        return res as any;
      } catch(e) { return { items: [{label:'Error', value:'Invalid input'}] }; } 
    }
  },
  {
    id: "income-tax", name: "Flat Income Tax", category: "Tax & Salary", description: "Rough estimate of income tax on taxable income using simple brackets",
    inputs: [{"id":"i","label":"Gross Income","type":"number","defaultValue":60000},{"id":"r","label":"Tax Rate (%)","type":"number","defaultValue":20}],
    calculate: (v) => { 
      try { 
        const fn = (v: any) => { const t=num(v.i)*(num(v.r)/100); const chart={type:'pie',data:[{name:'Take Home',value:num(v.i)-t},{name:'Tax',value:t}]}; return {items:[{label:'Tax Amount',value:t.toFixed(2),highlight:true}], chart}; };
        let res: any = fn(v);
        if (!res.chart && res.items && res.items.length > 0) {
          let chartData = res.items.map((item: any) => ({
            name: item.label.replace(/\([^)]+\)/g, '').trim(),
            val: parseFloat(item.value.toString().replace(/[^0-9.-]+/g,"")) || 0
          }));
          if (chartData.length === 1) {
             const inputDefs = [{"id":"i","label":"Gross Income","type":"number","defaultValue":60000},{"id":"r","label":"Tax Rate (%)","type":"number","defaultValue":20}];
             const inputData = inputDefs.map((inp: any) => ({
               name: inp.label.replace(/\([^)]+\)/g, '').trim(),
               val: parseFloat(v[inp.id]) || 0
             }));
             const maxItem = chartData[0].val || 1;
             const filteredInputs = inputData.filter((inp: any) => inp.val > Math.abs(maxItem) * 0.01 && inp.val <= Math.abs(maxItem) * 100);
             res.chart = { type: 'bar', data: [...filteredInputs, chartData[0]], dataKey: 'val', nameKey: 'name' };
          } else {
             const allPositive = chartData.every((d: any) => d.val >= 0);
             const isPie = allPositive && chartData.length <= 4;
             res.chart = { type: isPie ? 'pie' : 'bar', data: chartData, dataKey: 'val', nameKey: 'name' };
          }
        }
        return res as any;
      } catch(e) { return { items: [{label:'Error', value:'Invalid input'}] }; } 
    }
  },
  {
    id: "sales-tax", name: "Sales Tax", category: "Tax & Salary", description: "Calculate sales tax on a purchase and the total amount due",
    inputs: [{"id":"p","label":"Price","type":"number","defaultValue":100},{"id":"r","label":"Tax Rate (%)","type":"number","defaultValue":8}],
    calculate: (v) => { 
      try { 
        const fn = (v: any) => { const t=num(v.p)*(num(v.r)/100); return {items:[{label:'Total Price',value:(num(v.p)+t).toFixed(2),highlight:true}]}; };
        let res: any = fn(v);
        if (!res.chart && res.items && res.items.length > 0) {
          let chartData = res.items.map((item: any) => ({
            name: item.label.replace(/\([^)]+\)/g, '').trim(),
            val: parseFloat(item.value.toString().replace(/[^0-9.-]+/g,"")) || 0
          }));
          if (chartData.length === 1) {
             const inputDefs = [{"id":"p","label":"Price","type":"number","defaultValue":100},{"id":"r","label":"Tax Rate (%)","type":"number","defaultValue":8}];
             const inputData = inputDefs.map((inp: any) => ({
               name: inp.label.replace(/\([^)]+\)/g, '').trim(),
               val: parseFloat(v[inp.id]) || 0
             }));
             const maxItem = chartData[0].val || 1;
             const filteredInputs = inputData.filter((inp: any) => inp.val > Math.abs(maxItem) * 0.01 && inp.val <= Math.abs(maxItem) * 100);
             res.chart = { type: 'bar', data: [...filteredInputs, chartData[0]], dataKey: 'val', nameKey: 'name' };
          } else {
             const allPositive = chartData.every((d: any) => d.val >= 0);
             const isPie = allPositive && chartData.length <= 4;
             res.chart = { type: isPie ? 'pie' : 'bar', data: chartData, dataKey: 'val', nameKey: 'name' };
          }
        }
        return res as any;
      } catch(e) { return { items: [{label:'Error', value:'Invalid input'}] }; } 
    }
  },
  {
    id: "vat", name: "VAT Calculator", category: "Tax & Salary", description: "Add or remove sales tax (VAT/GST style) from a price",
    inputs: [{"id":"g","label":"Gross Price","type":"number","defaultValue":120},{"id":"r","label":"VAT Rate (%)","type":"number","defaultValue":20}],
    calculate: (v) => { 
      try { 
        const fn = (v: any) => { const n=num(v.g)/(1+num(v.r)/100); const v_amt=num(v.g)-n; return {items:[{label:'Net Price',value:n.toFixed(2),highlight:true},{label:'VAT Amount',value:v_amt.toFixed(2)}]}; };
        let res: any = fn(v);
        if (!res.chart && res.items && res.items.length > 0) {
          let chartData = res.items.map((item: any) => ({
            name: item.label.replace(/\([^)]+\)/g, '').trim(),
            val: parseFloat(item.value.toString().replace(/[^0-9.-]+/g,"")) || 0
          }));
          if (chartData.length === 1) {
             const inputDefs = [{"id":"g","label":"Gross Price","type":"number","defaultValue":120},{"id":"r","label":"VAT Rate (%)","type":"number","defaultValue":20}];
             const inputData = inputDefs.map((inp: any) => ({
               name: inp.label.replace(/\([^)]+\)/g, '').trim(),
               val: parseFloat(v[inp.id]) || 0
             }));
             const maxItem = chartData[0].val || 1;
             const filteredInputs = inputData.filter((inp: any) => inp.val > Math.abs(maxItem) * 0.01 && inp.val <= Math.abs(maxItem) * 100);
             res.chart = { type: 'bar', data: [...filteredInputs, chartData[0]], dataKey: 'val', nameKey: 'name' };
          } else {
             const allPositive = chartData.every((d: any) => d.val >= 0);
             const isPie = allPositive && chartData.length <= 4;
             res.chart = { type: isPie ? 'pie' : 'bar', data: chartData, dataKey: 'val', nameKey: 'name' };
          }
        }
        return res as any;
      } catch(e) { return { items: [{label:'Error', value:'Invalid input'}] }; } 
    }
  },
  {
    id: "gst", name: "GST Add/Remove", category: "Tax & Salary", description: "Calculate GST",
    inputs: [{"id":"a","label":"Amount","type":"number","defaultValue":1000},{"id":"r","label":"GST (%)","type":"number","defaultValue":18}],
    calculate: (v) => { 
      try { 
        const fn = (v: any) => { const gst=num(v.a)*(num(v.r)/100); return {items:[{label:'Total with GST',value:(num(v.a)+gst).toFixed(2),highlight:true}]}; };
        let res: any = fn(v);
        if (!res.chart && res.items && res.items.length > 0) {
          let chartData = res.items.map((item: any) => ({
            name: item.label.replace(/\([^)]+\)/g, '').trim(),
            val: parseFloat(item.value.toString().replace(/[^0-9.-]+/g,"")) || 0
          }));
          if (chartData.length === 1) {
             const inputDefs = [{"id":"a","label":"Amount","type":"number","defaultValue":1000},{"id":"r","label":"GST (%)","type":"number","defaultValue":18}];
             const inputData = inputDefs.map((inp: any) => ({
               name: inp.label.replace(/\([^)]+\)/g, '').trim(),
               val: parseFloat(v[inp.id]) || 0
             }));
             const maxItem = chartData[0].val || 1;
             const filteredInputs = inputData.filter((inp: any) => inp.val > Math.abs(maxItem) * 0.01 && inp.val <= Math.abs(maxItem) * 100);
             res.chart = { type: 'bar', data: [...filteredInputs, chartData[0]], dataKey: 'val', nameKey: 'name' };
          } else {
             const allPositive = chartData.every((d: any) => d.val >= 0);
             const isPie = allPositive && chartData.length <= 4;
             res.chart = { type: isPie ? 'pie' : 'bar', data: chartData, dataKey: 'val', nameKey: 'name' };
          }
        }
        return res as any;
      } catch(e) { return { items: [{label:'Error', value:'Invalid input'}] }; } 
    }
  },
  {
    id: "salary-hourly", name: "Salary to Hourly", category: "Tax & Salary", description: "Convert annual to hourly",
    inputs: [{"id":"s","label":"Annual Salary","type":"number","defaultValue":52000},{"id":"h","label":"Hours/Week","type":"number","defaultValue":40}],
    calculate: (v) => { 
      try { 
        const fn = (v: any) => { const hr=num(v.s)/(num(v.h)*52); return {items:[{label:'Hourly Rate',value:hr.toFixed(2),highlight:true}]}; };
        let res: any = fn(v);
        if (!res.chart && res.items && res.items.length > 0) {
          let chartData = res.items.map((item: any) => ({
            name: item.label.replace(/\([^)]+\)/g, '').trim(),
            val: parseFloat(item.value.toString().replace(/[^0-9.-]+/g,"")) || 0
          }));
          if (chartData.length === 1) {
             const inputDefs = [{"id":"s","label":"Annual Salary","type":"number","defaultValue":52000},{"id":"h","label":"Hours/Week","type":"number","defaultValue":40}];
             const inputData = inputDefs.map((inp: any) => ({
               name: inp.label.replace(/\([^)]+\)/g, '').trim(),
               val: parseFloat(v[inp.id]) || 0
             }));
             const maxItem = chartData[0].val || 1;
             const filteredInputs = inputData.filter((inp: any) => inp.val > Math.abs(maxItem) * 0.01 && inp.val <= Math.abs(maxItem) * 100);
             res.chart = { type: 'bar', data: [...filteredInputs, chartData[0]], dataKey: 'val', nameKey: 'name' };
          } else {
             const allPositive = chartData.every((d: any) => d.val >= 0);
             const isPie = allPositive && chartData.length <= 4;
             res.chart = { type: isPie ? 'pie' : 'bar', data: chartData, dataKey: 'val', nameKey: 'name' };
          }
        }
        return res as any;
      } catch(e) { return { items: [{label:'Error', value:'Invalid input'}] }; } 
    }
  },
  {
    id: "hourly-salary", name: "Hourly to Salary", category: "Tax & Salary", description: "Convert hourly to annual",
    inputs: [{"id":"r","label":"Hourly Rate","type":"number","defaultValue":25},{"id":"h","label":"Hours/Week","type":"number","defaultValue":40}],
    calculate: (v) => { 
      try { 
        const fn = (v: any) => { const s=num(v.r)*num(v.h)*52; return {items:[{label:'Annual Salary',value:s.toFixed(2),highlight:true}]}; };
        let res: any = fn(v);
        if (!res.chart && res.items && res.items.length > 0) {
          let chartData = res.items.map((item: any) => ({
            name: item.label.replace(/\([^)]+\)/g, '').trim(),
            val: parseFloat(item.value.toString().replace(/[^0-9.-]+/g,"")) || 0
          }));
          if (chartData.length === 1) {
             const inputDefs = [{"id":"r","label":"Hourly Rate","type":"number","defaultValue":25},{"id":"h","label":"Hours/Week","type":"number","defaultValue":40}];
             const inputData = inputDefs.map((inp: any) => ({
               name: inp.label.replace(/\([^)]+\)/g, '').trim(),
               val: parseFloat(v[inp.id]) || 0
             }));
             const maxItem = chartData[0].val || 1;
             const filteredInputs = inputData.filter((inp: any) => inp.val > Math.abs(maxItem) * 0.01 && inp.val <= Math.abs(maxItem) * 100);
             res.chart = { type: 'bar', data: [...filteredInputs, chartData[0]], dataKey: 'val', nameKey: 'name' };
          } else {
             const allPositive = chartData.every((d: any) => d.val >= 0);
             const isPie = allPositive && chartData.length <= 4;
             res.chart = { type: isPie ? 'pie' : 'bar', data: chartData, dataKey: 'val', nameKey: 'name' };
          }
        }
        return res as any;
      } catch(e) { return { items: [{label:'Error', value:'Invalid input'}] }; } 
    }
  },
  {
    id: "tax-bracket", name: "Effective Tax Rate", category: "Tax & Salary", description: "Simple progressive bracket est",
    inputs: [{"id":"i","label":"Income","type":"number","defaultValue":60000}],
    calculate: (v) => { 
      try { 
        const fn = (v: any) => { const i=num(v.i); const tax=i>50000 ? 5000+(i-50000)*0.2 : i*0.1; return {items:[{label:'Effective Rate (%)',value:((tax/i)*100).toFixed(2)+'%',highlight:true}]}; };
        let res: any = fn(v);
        if (!res.chart && res.items && res.items.length > 0) {
          let chartData = res.items.map((item: any) => ({
            name: item.label.replace(/\([^)]+\)/g, '').trim(),
            val: parseFloat(item.value.toString().replace(/[^0-9.-]+/g,"")) || 0
          }));
          if (chartData.length === 1) {
             const inputDefs = [{"id":"i","label":"Income","type":"number","defaultValue":60000}];
             const inputData = inputDefs.map((inp: any) => ({
               name: inp.label.replace(/\([^)]+\)/g, '').trim(),
               val: parseFloat(v[inp.id]) || 0
             }));
             const maxItem = chartData[0].val || 1;
             const filteredInputs = inputData.filter((inp: any) => inp.val > Math.abs(maxItem) * 0.01 && inp.val <= Math.abs(maxItem) * 100);
             res.chart = { type: 'bar', data: [...filteredInputs, chartData[0]], dataKey: 'val', nameKey: 'name' };
          } else {
             const allPositive = chartData.every((d: any) => d.val >= 0);
             const isPie = allPositive && chartData.length <= 4;
             res.chart = { type: isPie ? 'pie' : 'bar', data: chartData, dataKey: 'val', nameKey: 'name' };
          }
        }
        return res as any;
      } catch(e) { return { items: [{label:'Error', value:'Invalid input'}] }; } 
    }
  },
  {
    id: "take-home", name: "Take Home Pay", category: "Tax & Salary", description: "Gross minus deductions",
    inputs: [{"id":"g","label":"Gross Pay","type":"number","defaultValue":5000},{"id":"d","label":"Deductions %","type":"number","defaultValue":25}],
    calculate: (v) => { 
      try { 
        const fn = (v: any) => { const t=num(v.g)*(1-num(v.d)/100); return {items:[{label:'Take Home',value:t.toFixed(2),highlight:true}]}; };
        let res: any = fn(v);
        if (!res.chart && res.items && res.items.length > 0) {
          let chartData = res.items.map((item: any) => ({
            name: item.label.replace(/\([^)]+\)/g, '').trim(),
            val: parseFloat(item.value.toString().replace(/[^0-9.-]+/g,"")) || 0
          }));
          if (chartData.length === 1) {
             const inputDefs = [{"id":"g","label":"Gross Pay","type":"number","defaultValue":5000},{"id":"d","label":"Deductions %","type":"number","defaultValue":25}];
             const inputData = inputDefs.map((inp: any) => ({
               name: inp.label.replace(/\([^)]+\)/g, '').trim(),
               val: parseFloat(v[inp.id]) || 0
             }));
             const maxItem = chartData[0].val || 1;
             const filteredInputs = inputData.filter((inp: any) => inp.val > Math.abs(maxItem) * 0.01 && inp.val <= Math.abs(maxItem) * 100);
             res.chart = { type: 'bar', data: [...filteredInputs, chartData[0]], dataKey: 'val', nameKey: 'name' };
          } else {
             const allPositive = chartData.every((d: any) => d.val >= 0);
             const isPie = allPositive && chartData.length <= 4;
             res.chart = { type: isPie ? 'pie' : 'bar', data: chartData, dataKey: 'val', nameKey: 'name' };
          }
        }
        return res as any;
      } catch(e) { return { items: [{label:'Error', value:'Invalid input'}] }; } 
    }
  },
  {
    id: "capital-gains-tax", name: "CGT Calc", category: "Tax & Salary", description: "Rough estimate of tax on investment gains under basic assumptions",
    inputs: [{"id":"g","label":"Capital Gain","type":"number","defaultValue":10000}],
    calculate: (v) => { 
      try { 
        const fn = (v: any) => { const t=num(v.g)*0.15; return {items:[{label:'Est. Tax',value:t.toFixed(2),highlight:true}]}; };
        let res: any = fn(v);
        if (!res.chart && res.items && res.items.length > 0) {
          let chartData = res.items.map((item: any) => ({
            name: item.label.replace(/\([^)]+\)/g, '').trim(),
            val: parseFloat(item.value.toString().replace(/[^0-9.-]+/g,"")) || 0
          }));
          if (chartData.length === 1) {
             const inputDefs = [{"id":"g","label":"Capital Gain","type":"number","defaultValue":10000}];
             const inputData = inputDefs.map((inp: any) => ({
               name: inp.label.replace(/\([^)]+\)/g, '').trim(),
               val: parseFloat(v[inp.id]) || 0
             }));
             const maxItem = chartData[0].val || 1;
             const filteredInputs = inputData.filter((inp: any) => inp.val > Math.abs(maxItem) * 0.01 && inp.val <= Math.abs(maxItem) * 100);
             res.chart = { type: 'bar', data: [...filteredInputs, chartData[0]], dataKey: 'val', nameKey: 'name' };
          } else {
             const allPositive = chartData.every((d: any) => d.val >= 0);
             const isPie = allPositive && chartData.length <= 4;
             res.chart = { type: isPie ? 'pie' : 'bar', data: chartData, dataKey: 'val', nameKey: 'name' };
          }
        }
        return res as any;
      } catch(e) { return { items: [{label:'Error', value:'Invalid input'}] }; } 
    }
  },
  {
    id: "self-employment-tax", name: "Self Employed Tax", category: "Tax & Salary", description: "Estimate self-employment tax on net business income",
    inputs: [{"id":"i","label":"Net Earnings","type":"number","defaultValue":50000}],
    calculate: (v) => { 
      try { 
        const fn = (v: any) => { const t=num(v.i)*0.153; return {items:[{label:'SE Tax',value:t.toFixed(2),highlight:true}]}; };
        let res: any = fn(v);
        if (!res.chart && res.items && res.items.length > 0) {
          let chartData = res.items.map((item: any) => ({
            name: item.label.replace(/\([^)]+\)/g, '').trim(),
            val: parseFloat(item.value.toString().replace(/[^0-9.-]+/g,"")) || 0
          }));
          if (chartData.length === 1) {
             const inputDefs = [{"id":"i","label":"Net Earnings","type":"number","defaultValue":50000}];
             const inputData = inputDefs.map((inp: any) => ({
               name: inp.label.replace(/\([^)]+\)/g, '').trim(),
               val: parseFloat(v[inp.id]) || 0
             }));
             const maxItem = chartData[0].val || 1;
             const filteredInputs = inputData.filter((inp: any) => inp.val > Math.abs(maxItem) * 0.01 && inp.val <= Math.abs(maxItem) * 100);
             res.chart = { type: 'bar', data: [...filteredInputs, chartData[0]], dataKey: 'val', nameKey: 'name' };
          } else {
             const allPositive = chartData.every((d: any) => d.val >= 0);
             const isPie = allPositive && chartData.length <= 4;
             res.chart = { type: isPie ? 'pie' : 'bar', data: chartData, dataKey: 'val', nameKey: 'name' };
          }
        }
        return res as any;
      } catch(e) { return { items: [{label:'Error', value:'Invalid input'}] }; } 
    }
  },
  {
    id: "break-even", name: "Break Even", category: "Business Finance", description: "Estimate units or revenue needed to cover fixed and variable costs",
    inputs: [{"id":"fc","label":"Fixed Costs","type":"number","defaultValue":10000},{"id":"p","label":"Price/Unit","type":"number","defaultValue":50},{"id":"vc","label":"Var Cost/Unit","type":"number","defaultValue":30}],
    calculate: (v) => { 
      try { 
        const fn = (v: any) => { const b=num(v.fc)/(num(v.p)-num(v.vc)); return {items:[{label:'Break Even Units',value:b.toFixed(0),highlight:true}]}; };
        let res: any = fn(v);
        if (!res.chart && res.items && res.items.length > 0) {
          let chartData = res.items.map((item: any) => ({
            name: item.label.replace(/\([^)]+\)/g, '').trim(),
            val: parseFloat(item.value.toString().replace(/[^0-9.-]+/g,"")) || 0
          }));
          if (chartData.length === 1) {
             const inputDefs = [{"id":"fc","label":"Fixed Costs","type":"number","defaultValue":10000},{"id":"p","label":"Price/Unit","type":"number","defaultValue":50},{"id":"vc","label":"Var Cost/Unit","type":"number","defaultValue":30}];
             const inputData = inputDefs.map((inp: any) => ({
               name: inp.label.replace(/\([^)]+\)/g, '').trim(),
               val: parseFloat(v[inp.id]) || 0
             }));
             const maxItem = chartData[0].val || 1;
             const filteredInputs = inputData.filter((inp: any) => inp.val > Math.abs(maxItem) * 0.01 && inp.val <= Math.abs(maxItem) * 100);
             res.chart = { type: 'bar', data: [...filteredInputs, chartData[0]], dataKey: 'val', nameKey: 'name' };
          } else {
             const allPositive = chartData.every((d: any) => d.val >= 0);
             const isPie = allPositive && chartData.length <= 4;
             res.chart = { type: isPie ? 'pie' : 'bar', data: chartData, dataKey: 'val', nameKey: 'name' };
          }
        }
        return res as any;
      } catch(e) { return { items: [{label:'Error', value:'Invalid input'}] }; } 
    }
  },
  {
    id: "gross-margin", name: "Gross Margin", category: "Business Finance", description: "Calculate gross profit margin from revenue and cost of goods",
    inputs: [{"id":"r","label":"Revenue","type":"number","defaultValue":100000},{"id":"c","label":"COGS","type":"number","defaultValue":60000}],
    calculate: (v) => { 
      try { 
        const fn = (v: any) => { const m=((num(v.r)-num(v.c))/num(v.r))*100; const chart={type:'pie',data:[{name:'COGS',value:num(v.c)},{name:'Profit',value:num(v.r)-num(v.c)}]}; return {items:[{label:'Gross Margin (%)',value:m.toFixed(2)+'%',highlight:true}], chart}; };
        let res: any = fn(v);
        if (!res.chart && res.items && res.items.length > 0) {
          let chartData = res.items.map((item: any) => ({
            name: item.label.replace(/\([^)]+\)/g, '').trim(),
            val: parseFloat(item.value.toString().replace(/[^0-9.-]+/g,"")) || 0
          }));
          if (chartData.length === 1) {
             const inputDefs = [{"id":"r","label":"Revenue","type":"number","defaultValue":100000},{"id":"c","label":"COGS","type":"number","defaultValue":60000}];
             const inputData = inputDefs.map((inp: any) => ({
               name: inp.label.replace(/\([^)]+\)/g, '').trim(),
               val: parseFloat(v[inp.id]) || 0
             }));
             const maxItem = chartData[0].val || 1;
             const filteredInputs = inputData.filter((inp: any) => inp.val > Math.abs(maxItem) * 0.01 && inp.val <= Math.abs(maxItem) * 100);
             res.chart = { type: 'bar', data: [...filteredInputs, chartData[0]], dataKey: 'val', nameKey: 'name' };
          } else {
             const allPositive = chartData.every((d: any) => d.val >= 0);
             const isPie = allPositive && chartData.length <= 4;
             res.chart = { type: isPie ? 'pie' : 'bar', data: chartData, dataKey: 'val', nameKey: 'name' };
          }
        }
        return res as any;
      } catch(e) { return { items: [{label:'Error', value:'Invalid input'}] }; } 
    }
  },
  {
    id: "net-margin", name: "Net Margin", category: "Business Finance", description: "Calculate net profit margin after all expenses",
    inputs: [{"id":"r","label":"Revenue","type":"number","defaultValue":100000},{"id":"n","label":"Net Profit","type":"number","defaultValue":15000}],
    calculate: (v) => { 
      try { 
        const fn = (v: any) => { const m=(num(v.n)/num(v.r))*100; return {items:[{label:'Net Margin (%)',value:m.toFixed(2)+'%',highlight:true}]}; };
        let res: any = fn(v);
        if (!res.chart && res.items && res.items.length > 0) {
          let chartData = res.items.map((item: any) => ({
            name: item.label.replace(/\([^)]+\)/g, '').trim(),
            val: parseFloat(item.value.toString().replace(/[^0-9.-]+/g,"")) || 0
          }));
          if (chartData.length === 1) {
             const inputDefs = [{"id":"r","label":"Revenue","type":"number","defaultValue":100000},{"id":"n","label":"Net Profit","type":"number","defaultValue":15000}];
             const inputData = inputDefs.map((inp: any) => ({
               name: inp.label.replace(/\([^)]+\)/g, '').trim(),
               val: parseFloat(v[inp.id]) || 0
             }));
             const maxItem = chartData[0].val || 1;
             const filteredInputs = inputData.filter((inp: any) => inp.val > Math.abs(maxItem) * 0.01 && inp.val <= Math.abs(maxItem) * 100);
             res.chart = { type: 'bar', data: [...filteredInputs, chartData[0]], dataKey: 'val', nameKey: 'name' };
          } else {
             const allPositive = chartData.every((d: any) => d.val >= 0);
             const isPie = allPositive && chartData.length <= 4;
             res.chart = { type: isPie ? 'pie' : 'bar', data: chartData, dataKey: 'val', nameKey: 'name' };
          }
        }
        return res as any;
      } catch(e) { return { items: [{label:'Error', value:'Invalid input'}] }; } 
    }
  },
  {
    id: "operating-margin", name: "Operating Margin", category: "Business Finance", description: "Measure operating profit as a share of revenue",
    inputs: [{"id":"r","label":"Revenue","type":"number","defaultValue":100000},{"id":"o","label":"Operating Income","type":"number","defaultValue":20000}],
    calculate: (v) => { 
      try { 
        const fn = (v: any) => { const m=(num(v.o)/num(v.r))*100; return {items:[{label:'Operating Margin (%)',value:m.toFixed(2)+'%',highlight:true}]}; };
        let res: any = fn(v);
        if (!res.chart && res.items && res.items.length > 0) {
          let chartData = res.items.map((item: any) => ({
            name: item.label.replace(/\([^)]+\)/g, '').trim(),
            val: parseFloat(item.value.toString().replace(/[^0-9.-]+/g,"")) || 0
          }));
          if (chartData.length === 1) {
             const inputDefs = [{"id":"r","label":"Revenue","type":"number","defaultValue":100000},{"id":"o","label":"Operating Income","type":"number","defaultValue":20000}];
             const inputData = inputDefs.map((inp: any) => ({
               name: inp.label.replace(/\([^)]+\)/g, '').trim(),
               val: parseFloat(v[inp.id]) || 0
             }));
             const maxItem = chartData[0].val || 1;
             const filteredInputs = inputData.filter((inp: any) => inp.val > Math.abs(maxItem) * 0.01 && inp.val <= Math.abs(maxItem) * 100);
             res.chart = { type: 'bar', data: [...filteredInputs, chartData[0]], dataKey: 'val', nameKey: 'name' };
          } else {
             const allPositive = chartData.every((d: any) => d.val >= 0);
             const isPie = allPositive && chartData.length <= 4;
             res.chart = { type: isPie ? 'pie' : 'bar', data: chartData, dataKey: 'val', nameKey: 'name' };
          }
        }
        return res as any;
      } catch(e) { return { items: [{label:'Error', value:'Invalid input'}] }; } 
    }
  },
  {
    id: "markup", name: "Markup Calc", category: "Business Finance", description: "Turn cost into selling price using a markup percentage",
    inputs: [{"id":"c","label":"Cost","type":"number","defaultValue":50},{"id":"m","label":"Markup %","type":"number","defaultValue":40}],
    calculate: (v) => { 
      try { 
        const fn = (v: any) => { const p=num(v.c)*(1+num(v.m)/100); return {items:[{label:'Selling Price',value:p.toFixed(2),highlight:true}]}; };
        let res: any = fn(v);
        if (!res.chart && res.items && res.items.length > 0) {
          let chartData = res.items.map((item: any) => ({
            name: item.label.replace(/\([^)]+\)/g, '').trim(),
            val: parseFloat(item.value.toString().replace(/[^0-9.-]+/g,"")) || 0
          }));
          if (chartData.length === 1) {
             const inputDefs = [{"id":"c","label":"Cost","type":"number","defaultValue":50},{"id":"m","label":"Markup %","type":"number","defaultValue":40}];
             const inputData = inputDefs.map((inp: any) => ({
               name: inp.label.replace(/\([^)]+\)/g, '').trim(),
               val: parseFloat(v[inp.id]) || 0
             }));
             const maxItem = chartData[0].val || 1;
             const filteredInputs = inputData.filter((inp: any) => inp.val > Math.abs(maxItem) * 0.01 && inp.val <= Math.abs(maxItem) * 100);
             res.chart = { type: 'bar', data: [...filteredInputs, chartData[0]], dataKey: 'val', nameKey: 'name' };
          } else {
             const allPositive = chartData.every((d: any) => d.val >= 0);
             const isPie = allPositive && chartData.length <= 4;
             res.chart = { type: isPie ? 'pie' : 'bar', data: chartData, dataKey: 'val', nameKey: 'name' };
          }
        }
        return res as any;
      } catch(e) { return { items: [{label:'Error', value:'Invalid input'}] }; } 
    }
  },
  {
    id: "burn-rate", name: "Burn Rate", category: "Business Finance", description: "See how quickly a business is spending its cash each month",
    inputs: [{"id":"s","label":"Starting Cash","type":"number","defaultValue":100000},{"id":"e","label":"Ending Cash","type":"number","defaultValue":80000},{"id":"m","label":"Months","type":"number","defaultValue":2}],
    calculate: (v) => { 
      try { 
        const fn = (v: any) => { const b=(num(v.s)-num(v.e))/num(v.m); return {items:[{label:'Monthly Burn Rate',value:b.toFixed(2),highlight:true}]}; };
        let res: any = fn(v);
        if (!res.chart && res.items && res.items.length > 0) {
          let chartData = res.items.map((item: any) => ({
            name: item.label.replace(/\([^)]+\)/g, '').trim(),
            val: parseFloat(item.value.toString().replace(/[^0-9.-]+/g,"")) || 0
          }));
          if (chartData.length === 1) {
             const inputDefs = [{"id":"s","label":"Starting Cash","type":"number","defaultValue":100000},{"id":"e","label":"Ending Cash","type":"number","defaultValue":80000},{"id":"m","label":"Months","type":"number","defaultValue":2}];
             const inputData = inputDefs.map((inp: any) => ({
               name: inp.label.replace(/\([^)]+\)/g, '').trim(),
               val: parseFloat(v[inp.id]) || 0
             }));
             const maxItem = chartData[0].val || 1;
             const filteredInputs = inputData.filter((inp: any) => inp.val > Math.abs(maxItem) * 0.01 && inp.val <= Math.abs(maxItem) * 100);
             res.chart = { type: 'bar', data: [...filteredInputs, chartData[0]], dataKey: 'val', nameKey: 'name' };
          } else {
             const allPositive = chartData.every((d: any) => d.val >= 0);
             const isPie = allPositive && chartData.length <= 4;
             res.chart = { type: isPie ? 'pie' : 'bar', data: chartData, dataKey: 'val', nameKey: 'name' };
          }
        }
        return res as any;
      } catch(e) { return { items: [{label:'Error', value:'Invalid input'}] }; } 
    }
  },
  {
    id: "runway", name: "Cash Runway", category: "Business Finance", description: "Estimate how many months of cash remain at the current burn rate",
    inputs: [{"id":"c","label":"Current Cash","type":"number","defaultValue":100000},{"id":"b","label":"Monthly Burn","type":"number","defaultValue":10000}],
    calculate: (v) => { 
      try { 
        const fn = (v: any) => { const r=num(v.c)/num(v.b); return {items:[{label:'Runway (Months)',value:r.toFixed(1),highlight:true}]}; };
        let res: any = fn(v);
        if (!res.chart && res.items && res.items.length > 0) {
          let chartData = res.items.map((item: any) => ({
            name: item.label.replace(/\([^)]+\)/g, '').trim(),
            val: parseFloat(item.value.toString().replace(/[^0-9.-]+/g,"")) || 0
          }));
          if (chartData.length === 1) {
             const inputDefs = [{"id":"c","label":"Current Cash","type":"number","defaultValue":100000},{"id":"b","label":"Monthly Burn","type":"number","defaultValue":10000}];
             const inputData = inputDefs.map((inp: any) => ({
               name: inp.label.replace(/\([^)]+\)/g, '').trim(),
               val: parseFloat(v[inp.id]) || 0
             }));
             const maxItem = chartData[0].val || 1;
             const filteredInputs = inputData.filter((inp: any) => inp.val > Math.abs(maxItem) * 0.01 && inp.val <= Math.abs(maxItem) * 100);
             res.chart = { type: 'bar', data: [...filteredInputs, chartData[0]], dataKey: 'val', nameKey: 'name' };
          } else {
             const allPositive = chartData.every((d: any) => d.val >= 0);
             const isPie = allPositive && chartData.length <= 4;
             res.chart = { type: isPie ? 'pie' : 'bar', data: chartData, dataKey: 'val', nameKey: 'name' };
          }
        }
        return res as any;
      } catch(e) { return { items: [{label:'Error', value:'Invalid input'}] }; } 
    }
  },
  {
    id: "cac", name: "CAC", category: "Business Finance", description: "Calculate average cost to acquire one customer",
    inputs: [{"id":"m","label":"Marketing Spend","type":"number","defaultValue":5000},{"id":"c","label":"New Customers","type":"number","defaultValue":100}],
    calculate: (v) => { 
      try { 
        const fn = (v: any) => { const cac=num(v.m)/num(v.c); return {items:[{label:'CAC',value:cac.toFixed(2),highlight:true}]}; };
        let res: any = fn(v);
        if (!res.chart && res.items && res.items.length > 0) {
          let chartData = res.items.map((item: any) => ({
            name: item.label.replace(/\([^)]+\)/g, '').trim(),
            val: parseFloat(item.value.toString().replace(/[^0-9.-]+/g,"")) || 0
          }));
          if (chartData.length === 1) {
             const inputDefs = [{"id":"m","label":"Marketing Spend","type":"number","defaultValue":5000},{"id":"c","label":"New Customers","type":"number","defaultValue":100}];
             const inputData = inputDefs.map((inp: any) => ({
               name: inp.label.replace(/\([^)]+\)/g, '').trim(),
               val: parseFloat(v[inp.id]) || 0
             }));
             const maxItem = chartData[0].val || 1;
             const filteredInputs = inputData.filter((inp: any) => inp.val > Math.abs(maxItem) * 0.01 && inp.val <= Math.abs(maxItem) * 100);
             res.chart = { type: 'bar', data: [...filteredInputs, chartData[0]], dataKey: 'val', nameKey: 'name' };
          } else {
             const allPositive = chartData.every((d: any) => d.val >= 0);
             const isPie = allPositive && chartData.length <= 4;
             res.chart = { type: isPie ? 'pie' : 'bar', data: chartData, dataKey: 'val', nameKey: 'name' };
          }
        }
        return res as any;
      } catch(e) { return { items: [{label:'Error', value:'Invalid input'}] }; } 
    }
  },
  {
    id: "ltv-biz", name: "LTV", category: "Business Finance", description: "Estimate lifetime value of a customer from margin and retention",
    inputs: [{"id":"arpu","label":"Avg Rev Per User","type":"number","defaultValue":50},{"id":"churn","label":"Monthly Churn (%)","type":"number","defaultValue":5}],
    calculate: (v) => { 
      try { 
        const fn = (v: any) => { const ltv=num(v.arpu)/(num(v.churn)/100); return {items:[{label:'LTV',value:ltv.toFixed(2),highlight:true}]}; };
        let res: any = fn(v);
        if (!res.chart && res.items && res.items.length > 0) {
          let chartData = res.items.map((item: any) => ({
            name: item.label.replace(/\([^)]+\)/g, '').trim(),
            val: parseFloat(item.value.toString().replace(/[^0-9.-]+/g,"")) || 0
          }));
          if (chartData.length === 1) {
             const inputDefs = [{"id":"arpu","label":"Avg Rev Per User","type":"number","defaultValue":50},{"id":"churn","label":"Monthly Churn (%)","type":"number","defaultValue":5}];
             const inputData = inputDefs.map((inp: any) => ({
               name: inp.label.replace(/\([^)]+\)/g, '').trim(),
               val: parseFloat(v[inp.id]) || 0
             }));
             const maxItem = chartData[0].val || 1;
             const filteredInputs = inputData.filter((inp: any) => inp.val > Math.abs(maxItem) * 0.01 && inp.val <= Math.abs(maxItem) * 100);
             res.chart = { type: 'bar', data: [...filteredInputs, chartData[0]], dataKey: 'val', nameKey: 'name' };
          } else {
             const allPositive = chartData.every((d: any) => d.val >= 0);
             const isPie = allPositive && chartData.length <= 4;
             res.chart = { type: isPie ? 'pie' : 'bar', data: chartData, dataKey: 'val', nameKey: 'name' };
          }
        }
        return res as any;
      } catch(e) { return { items: [{label:'Error', value:'Invalid input'}] }; } 
    }
  },
  {
    id: "ebitda", name: "EBITDA", category: "Business Finance", description: "Compute earnings before interest, taxes, depreciation, and amortization",
    inputs: [{"id":"n","label":"Net Income","type":"number","defaultValue":50000},{"id":"t","label":"Taxes","type":"number","defaultValue":10000},{"id":"i","label":"Interest","type":"number","defaultValue":5000},{"id":"d","label":"Depreciation","type":"number","defaultValue":2000}],
    calculate: (v) => { 
      try { 
        const fn = (v: any) => { const e=num(v.n)+num(v.t)+num(v.i)+num(v.d); return {items:[{label:'EBITDA',value:e.toFixed(2),highlight:true}]}; };
        let res: any = fn(v);
        if (!res.chart && res.items && res.items.length > 0) {
          let chartData = res.items.map((item: any) => ({
            name: item.label.replace(/\([^)]+\)/g, '').trim(),
            val: parseFloat(item.value.toString().replace(/[^0-9.-]+/g,"")) || 0
          }));
          if (chartData.length === 1) {
             const inputDefs = [{"id":"n","label":"Net Income","type":"number","defaultValue":50000},{"id":"t","label":"Taxes","type":"number","defaultValue":10000},{"id":"i","label":"Interest","type":"number","defaultValue":5000},{"id":"d","label":"Depreciation","type":"number","defaultValue":2000}];
             const inputData = inputDefs.map((inp: any) => ({
               name: inp.label.replace(/\([^)]+\)/g, '').trim(),
               val: parseFloat(v[inp.id]) || 0
             }));
             const maxItem = chartData[0].val || 1;
             const filteredInputs = inputData.filter((inp: any) => inp.val > Math.abs(maxItem) * 0.01 && inp.val <= Math.abs(maxItem) * 100);
             res.chart = { type: 'bar', data: [...filteredInputs, chartData[0]], dataKey: 'val', nameKey: 'name' };
          } else {
             const allPositive = chartData.every((d: any) => d.val >= 0);
             const isPie = allPositive && chartData.length <= 4;
             res.chart = { type: isPie ? 'pie' : 'bar', data: chartData, dataKey: 'val', nameKey: 'name' };
          }
        }
        return res as any;
      } catch(e) { return { items: [{label:'Error', value:'Invalid input'}] }; } 
    }
  },
  {
    id: "cash-flow", name: "Free Cash Flow", category: "Business Finance", description: "Estimate free cash flow from operating cash and capital spending",
    inputs: [{"id":"o","label":"Operating Cash Flow","type":"number","defaultValue":100000},{"id":"c","label":"CapEx","type":"number","defaultValue":30000}],
    calculate: (v) => { 
      try { 
        const fn = (v: any) => { const fcf=num(v.o)-num(v.c); return {items:[{label:'Free Cash Flow',value:fcf.toFixed(2),highlight:true}]}; };
        let res: any = fn(v);
        if (!res.chart && res.items && res.items.length > 0) {
          let chartData = res.items.map((item: any) => ({
            name: item.label.replace(/\([^)]+\)/g, '').trim(),
            val: parseFloat(item.value.toString().replace(/[^0-9.-]+/g,"")) || 0
          }));
          if (chartData.length === 1) {
             const inputDefs = [{"id":"o","label":"Operating Cash Flow","type":"number","defaultValue":100000},{"id":"c","label":"CapEx","type":"number","defaultValue":30000}];
             const inputData = inputDefs.map((inp: any) => ({
               name: inp.label.replace(/\([^)]+\)/g, '').trim(),
               val: parseFloat(v[inp.id]) || 0
             }));
             const maxItem = chartData[0].val || 1;
             const filteredInputs = inputData.filter((inp: any) => inp.val > Math.abs(maxItem) * 0.01 && inp.val <= Math.abs(maxItem) * 100);
             res.chart = { type: 'bar', data: [...filteredInputs, chartData[0]], dataKey: 'val', nameKey: 'name' };
          } else {
             const allPositive = chartData.every((d: any) => d.val >= 0);
             const isPie = allPositive && chartData.length <= 4;
             res.chart = { type: isPie ? 'pie' : 'bar', data: chartData, dataKey: 'val', nameKey: 'name' };
          }
        }
        return res as any;
      } catch(e) { return { items: [{label:'Error', value:'Invalid input'}] }; } 
    }
  },
  {
    id: "working-capital", name: "Working Capital", category: "Business Finance", description: "Measure short-term liquidity as current assets minus current liabilities",
    inputs: [{"id":"a","label":"Current Assets","type":"number","defaultValue":50000},{"id":"l","label":"Current Liabs","type":"number","defaultValue":30000}],
    calculate: (v) => { 
      try { 
        const fn = (v: any) => { const wc=num(v.a)-num(v.l); return {items:[{label:'Working Capital',value:wc.toFixed(2),highlight:true}]}; };
        let res: any = fn(v);
        if (!res.chart && res.items && res.items.length > 0) {
          let chartData = res.items.map((item: any) => ({
            name: item.label.replace(/\([^)]+\)/g, '').trim(),
            val: parseFloat(item.value.toString().replace(/[^0-9.-]+/g,"")) || 0
          }));
          if (chartData.length === 1) {
             const inputDefs = [{"id":"a","label":"Current Assets","type":"number","defaultValue":50000},{"id":"l","label":"Current Liabs","type":"number","defaultValue":30000}];
             const inputData = inputDefs.map((inp: any) => ({
               name: inp.label.replace(/\([^)]+\)/g, '').trim(),
               val: parseFloat(v[inp.id]) || 0
             }));
             const maxItem = chartData[0].val || 1;
             const filteredInputs = inputData.filter((inp: any) => inp.val > Math.abs(maxItem) * 0.01 && inp.val <= Math.abs(maxItem) * 100);
             res.chart = { type: 'bar', data: [...filteredInputs, chartData[0]], dataKey: 'val', nameKey: 'name' };
          } else {
             const allPositive = chartData.every((d: any) => d.val >= 0);
             const isPie = allPositive && chartData.length <= 4;
             res.chart = { type: isPie ? 'pie' : 'bar', data: chartData, dataKey: 'val', nameKey: 'name' };
          }
        }
        return res as any;
      } catch(e) { return { items: [{label:'Error', value:'Invalid input'}] }; } 
    }
  },
  {
    id: "inventory-turnover", name: "Inventory Turnover", category: "Business Finance", description: "See how often inventory is sold and replaced over a period",
    inputs: [{"id":"c","label":"COGS","type":"number","defaultValue":100000},{"id":"i","label":"Avg Inventory","type":"number","defaultValue":20000}],
    calculate: (v) => { 
      try { 
        const fn = (v: any) => { const t=num(v.c)/num(v.i); return {items:[{label:'Turnover Ratio',value:t.toFixed(2),highlight:true}]}; };
        let res: any = fn(v);
        if (!res.chart && res.items && res.items.length > 0) {
          let chartData = res.items.map((item: any) => ({
            name: item.label.replace(/\([^)]+\)/g, '').trim(),
            val: parseFloat(item.value.toString().replace(/[^0-9.-]+/g,"")) || 0
          }));
          if (chartData.length === 1) {
             const inputDefs = [{"id":"c","label":"COGS","type":"number","defaultValue":100000},{"id":"i","label":"Avg Inventory","type":"number","defaultValue":20000}];
             const inputData = inputDefs.map((inp: any) => ({
               name: inp.label.replace(/\([^)]+\)/g, '').trim(),
               val: parseFloat(v[inp.id]) || 0
             }));
             const maxItem = chartData[0].val || 1;
             const filteredInputs = inputData.filter((inp: any) => inp.val > Math.abs(maxItem) * 0.01 && inp.val <= Math.abs(maxItem) * 100);
             res.chart = { type: 'bar', data: [...filteredInputs, chartData[0]], dataKey: 'val', nameKey: 'name' };
          } else {
             const allPositive = chartData.every((d: any) => d.val >= 0);
             const isPie = allPositive && chartData.length <= 4;
             res.chart = { type: isPie ? 'pie' : 'bar', data: chartData, dataKey: 'val', nameKey: 'name' };
          }
        }
        return res as any;
      } catch(e) { return { items: [{label:'Error', value:'Invalid input'}] }; } 
    }
  },
  {
    id: "quick-ratio", name: "Quick Ratio", category: "Business Finance", description: "Check short-term liquidity excluding inventory",
    inputs: [{"id":"a","label":"Current Assets","type":"number","defaultValue":50000},{"id":"i","label":"Inventory","type":"number","defaultValue":20000},{"id":"l","label":"Current Liabs","type":"number","defaultValue":25000}],
    calculate: (v) => { 
      try { 
        const fn = (v: any) => { const qr=(num(v.a)-num(v.i))/num(v.l); return {items:[{label:'Quick Ratio',value:qr.toFixed(2),highlight:true}]}; };
        let res: any = fn(v);
        if (!res.chart && res.items && res.items.length > 0) {
          let chartData = res.items.map((item: any) => ({
            name: item.label.replace(/\([^)]+\)/g, '').trim(),
            val: parseFloat(item.value.toString().replace(/[^0-9.-]+/g,"")) || 0
          }));
          if (chartData.length === 1) {
             const inputDefs = [{"id":"a","label":"Current Assets","type":"number","defaultValue":50000},{"id":"i","label":"Inventory","type":"number","defaultValue":20000},{"id":"l","label":"Current Liabs","type":"number","defaultValue":25000}];
             const inputData = inputDefs.map((inp: any) => ({
               name: inp.label.replace(/\([^)]+\)/g, '').trim(),
               val: parseFloat(v[inp.id]) || 0
             }));
             const maxItem = chartData[0].val || 1;
             const filteredInputs = inputData.filter((inp: any) => inp.val > Math.abs(maxItem) * 0.01 && inp.val <= Math.abs(maxItem) * 100);
             res.chart = { type: 'bar', data: [...filteredInputs, chartData[0]], dataKey: 'val', nameKey: 'name' };
          } else {
             const allPositive = chartData.every((d: any) => d.val >= 0);
             const isPie = allPositive && chartData.length <= 4;
             res.chart = { type: isPie ? 'pie' : 'bar', data: chartData, dataKey: 'val', nameKey: 'name' };
          }
        }
        return res as any;
      } catch(e) { return { items: [{label:'Error', value:'Invalid input'}] }; } 
    }
  },
  {
    id: "current-ratio", name: "Current Ratio", category: "Business Finance", description: "Compare current assets to current liabilities for a basic solvency check",
    inputs: [{"id":"a","label":"Current Assets","type":"number","defaultValue":50000},{"id":"l","label":"Current Liabs","type":"number","defaultValue":25000}],
    calculate: (v) => { 
      try { 
        const fn = (v: any) => { const cr=num(v.a)/num(v.l); return {items:[{label:'Current Ratio',value:cr.toFixed(2),highlight:true}]}; };
        let res: any = fn(v);
        if (!res.chart && res.items && res.items.length > 0) {
          let chartData = res.items.map((item: any) => ({
            name: item.label.replace(/\([^)]+\)/g, '').trim(),
            val: parseFloat(item.value.toString().replace(/[^0-9.-]+/g,"")) || 0
          }));
          if (chartData.length === 1) {
             const inputDefs = [{"id":"a","label":"Current Assets","type":"number","defaultValue":50000},{"id":"l","label":"Current Liabs","type":"number","defaultValue":25000}];
             const inputData = inputDefs.map((inp: any) => ({
               name: inp.label.replace(/\([^)]+\)/g, '').trim(),
               val: parseFloat(v[inp.id]) || 0
             }));
             const maxItem = chartData[0].val || 1;
             const filteredInputs = inputData.filter((inp: any) => inp.val > Math.abs(maxItem) * 0.01 && inp.val <= Math.abs(maxItem) * 100);
             res.chart = { type: 'bar', data: [...filteredInputs, chartData[0]], dataKey: 'val', nameKey: 'name' };
          } else {
             const allPositive = chartData.every((d: any) => d.val >= 0);
             const isPie = allPositive && chartData.length <= 4;
             res.chart = { type: isPie ? 'pie' : 'bar', data: chartData, dataKey: 'val', nameKey: 'name' };
          }
        }
        return res as any;
      } catch(e) { return { items: [{label:'Error', value:'Invalid input'}] }; } 
    }
  },
  {
    id: "retirement-corpus", name: "Retirement Corpus", category: "Retirement", description: "Estimate the nest egg needed to support a target retirement income",
    inputs: [{"id":"e","label":"Annual Expenses","type":"number","defaultValue":50000},{"id":"w","label":"Withdrawal Rate (%)","type":"number","defaultValue":4}],
    calculate: (v) => { 
      try { 
        const fn = (v: any) => { const c=num(v.e)/(num(v.w)/100); return {items:[{label:'Target Corpus',value:c.toFixed(2),highlight:true}]}; };
        let res: any = fn(v);
        if (!res.chart && res.items && res.items.length > 0) {
          let chartData = res.items.map((item: any) => ({
            name: item.label.replace(/\([^)]+\)/g, '').trim(),
            val: parseFloat(item.value.toString().replace(/[^0-9.-]+/g,"")) || 0
          }));
          if (chartData.length === 1) {
             const inputDefs = [{"id":"e","label":"Annual Expenses","type":"number","defaultValue":50000},{"id":"w","label":"Withdrawal Rate (%)","type":"number","defaultValue":4}];
             const inputData = inputDefs.map((inp: any) => ({
               name: inp.label.replace(/\([^)]+\)/g, '').trim(),
               val: parseFloat(v[inp.id]) || 0
             }));
             const maxItem = chartData[0].val || 1;
             const filteredInputs = inputData.filter((inp: any) => inp.val > Math.abs(maxItem) * 0.01 && inp.val <= Math.abs(maxItem) * 100);
             res.chart = { type: 'bar', data: [...filteredInputs, chartData[0]], dataKey: 'val', nameKey: 'name' };
          } else {
             const allPositive = chartData.every((d: any) => d.val >= 0);
             const isPie = allPositive && chartData.length <= 4;
             res.chart = { type: isPie ? 'pie' : 'bar', data: chartData, dataKey: 'val', nameKey: 'name' };
          }
        }
        return res as any;
      } catch(e) { return { items: [{label:'Error', value:'Invalid input'}] }; } 
    }
  },
  {
    id: "401k", name: "401k Growth", category: "Retirement", description: "Project 401(k) balance growth from contributions and expected returns",
    inputs: [{"id":"c","label":"Monthly Contrib","type":"number","defaultValue":500},{"id":"r","label":"Return (%)","type":"number","defaultValue":7},{"id":"y","label":"Years","type":"number","defaultValue":30}],
    calculate: (v) => { 
      try { 
        const fn = (v: any) => { const r=num(v.r)/1200; const n=num(v.y)*12; const f=num(v.c)*((Math.pow(1+r,n)-1)/r); return {items:[{label:'Balance',value:f.toFixed(2),highlight:true}]}; };
        let res: any = fn(v);
        if (!res.chart && res.items && res.items.length > 0) {
          let chartData = res.items.map((item: any) => ({
            name: item.label.replace(/\([^)]+\)/g, '').trim(),
            val: parseFloat(item.value.toString().replace(/[^0-9.-]+/g,"")) || 0
          }));
          if (chartData.length === 1) {
             const inputDefs = [{"id":"c","label":"Monthly Contrib","type":"number","defaultValue":500},{"id":"r","label":"Return (%)","type":"number","defaultValue":7},{"id":"y","label":"Years","type":"number","defaultValue":30}];
             const inputData = inputDefs.map((inp: any) => ({
               name: inp.label.replace(/\([^)]+\)/g, '').trim(),
               val: parseFloat(v[inp.id]) || 0
             }));
             const maxItem = chartData[0].val || 1;
             const filteredInputs = inputData.filter((inp: any) => inp.val > Math.abs(maxItem) * 0.01 && inp.val <= Math.abs(maxItem) * 100);
             res.chart = { type: 'bar', data: [...filteredInputs, chartData[0]], dataKey: 'val', nameKey: 'name' };
          } else {
             const allPositive = chartData.every((d: any) => d.val >= 0);
             const isPie = allPositive && chartData.length <= 4;
             res.chart = { type: isPie ? 'pie' : 'bar', data: chartData, dataKey: 'val', nameKey: 'name' };
          }
        }
        return res as any;
      } catch(e) { return { items: [{label:'Error', value:'Invalid input'}] }; } 
    }
  },
  {
    id: "pension", name: "Pension Payout", category: "Retirement", description: "Estimate a simple defined-benefit pension payout",
    inputs: [{"id":"y","label":"Years of Service","type":"number","defaultValue":20},{"id":"s","label":"Final Salary","type":"number","defaultValue":80000},{"id":"m","label":"Multiplier (%)","type":"number","defaultValue":2}],
    calculate: (v) => { 
      try { 
        const fn = (v: any) => { const p=num(v.y)*(num(v.m)/100)*num(v.s); return {items:[{label:'Annual Pension',value:p.toFixed(2),highlight:true}]}; };
        let res: any = fn(v);
        if (!res.chart && res.items && res.items.length > 0) {
          let chartData = res.items.map((item: any) => ({
            name: item.label.replace(/\([^)]+\)/g, '').trim(),
            val: parseFloat(item.value.toString().replace(/[^0-9.-]+/g,"")) || 0
          }));
          if (chartData.length === 1) {
             const inputDefs = [{"id":"y","label":"Years of Service","type":"number","defaultValue":20},{"id":"s","label":"Final Salary","type":"number","defaultValue":80000},{"id":"m","label":"Multiplier (%)","type":"number","defaultValue":2}];
             const inputData = inputDefs.map((inp: any) => ({
               name: inp.label.replace(/\([^)]+\)/g, '').trim(),
               val: parseFloat(v[inp.id]) || 0
             }));
             const maxItem = chartData[0].val || 1;
             const filteredInputs = inputData.filter((inp: any) => inp.val > Math.abs(maxItem) * 0.01 && inp.val <= Math.abs(maxItem) * 100);
             res.chart = { type: 'bar', data: [...filteredInputs, chartData[0]], dataKey: 'val', nameKey: 'name' };
          } else {
             const allPositive = chartData.every((d: any) => d.val >= 0);
             const isPie = allPositive && chartData.length <= 4;
             res.chart = { type: isPie ? 'pie' : 'bar', data: chartData, dataKey: 'val', nameKey: 'name' };
          }
        }
        return res as any;
      } catch(e) { return { items: [{label:'Error', value:'Invalid input'}] }; } 
    }
  },
  {
    id: "fire", name: "FIRE Number", category: "Retirement", description: "Calculate a rough Financial Independence number from annual spending",
    inputs: [{"id":"m","label":"Monthly Expenses","type":"number","defaultValue":4000}],
    calculate: (v) => { 
      try { 
        const fn = (v: any) => { const f=num(v.m)*12*25; return {items:[{label:'FIRE Number',value:f.toFixed(2),highlight:true}]}; };
        let res: any = fn(v);
        if (!res.chart && res.items && res.items.length > 0) {
          let chartData = res.items.map((item: any) => ({
            name: item.label.replace(/\([^)]+\)/g, '').trim(),
            val: parseFloat(item.value.toString().replace(/[^0-9.-]+/g,"")) || 0
          }));
          if (chartData.length === 1) {
             const inputDefs = [{"id":"m","label":"Monthly Expenses","type":"number","defaultValue":4000}];
             const inputData = inputDefs.map((inp: any) => ({
               name: inp.label.replace(/\([^)]+\)/g, '').trim(),
               val: parseFloat(v[inp.id]) || 0
             }));
             const maxItem = chartData[0].val || 1;
             const filteredInputs = inputData.filter((inp: any) => inp.val > Math.abs(maxItem) * 0.01 && inp.val <= Math.abs(maxItem) * 100);
             res.chart = { type: 'bar', data: [...filteredInputs, chartData[0]], dataKey: 'val', nameKey: 'name' };
          } else {
             const allPositive = chartData.every((d: any) => d.val >= 0);
             const isPie = allPositive && chartData.length <= 4;
             res.chart = { type: isPie ? 'pie' : 'bar', data: chartData, dataKey: 'val', nameKey: 'name' };
          }
        }
        return res as any;
      } catch(e) { return { items: [{label:'Error', value:'Invalid input'}] }; } 
    }
  },
  {
    id: "social-security", name: "Est. SS Benefit", category: "Retirement", description: "Rough estimate of Social Security benefits under simplified assumptions",
    inputs: [{"id":"i","label":"Avg Annual Income","type":"number","defaultValue":60000}],
    calculate: (v) => { 
      try { 
        const fn = (v: any) => { const b=(num(v.i)/12)*0.4; return {items:[{label:'Est Monthly Benefit',value:b.toFixed(2),highlight:true}]}; };
        let res: any = fn(v);
        if (!res.chart && res.items && res.items.length > 0) {
          let chartData = res.items.map((item: any) => ({
            name: item.label.replace(/\([^)]+\)/g, '').trim(),
            val: parseFloat(item.value.toString().replace(/[^0-9.-]+/g,"")) || 0
          }));
          if (chartData.length === 1) {
             const inputDefs = [{"id":"i","label":"Avg Annual Income","type":"number","defaultValue":60000}];
             const inputData = inputDefs.map((inp: any) => ({
               name: inp.label.replace(/\([^)]+\)/g, '').trim(),
               val: parseFloat(v[inp.id]) || 0
             }));
             const maxItem = chartData[0].val || 1;
             const filteredInputs = inputData.filter((inp: any) => inp.val > Math.abs(maxItem) * 0.01 && inp.val <= Math.abs(maxItem) * 100);
             res.chart = { type: 'bar', data: [...filteredInputs, chartData[0]], dataKey: 'val', nameKey: 'name' };
          } else {
             const allPositive = chartData.every((d: any) => d.val >= 0);
             const isPie = allPositive && chartData.length <= 4;
             res.chart = { type: isPie ? 'pie' : 'bar', data: chartData, dataKey: 'val', nameKey: 'name' };
          }
        }
        return res as any;
      } catch(e) { return { items: [{label:'Error', value:'Invalid input'}] }; } 
    }
  },
  {
    id: "rmd", name: "RMD Calculator", category: "Retirement", description: "Estimate a required minimum distribution from retirement account balance and age",
    inputs: [{"id":"b","label":"Account Balance","type":"number","defaultValue":500000},{"id":"f","label":"Life Expectancy Factor","type":"number","defaultValue":25.6}],
    calculate: (v) => { 
      try { 
        const fn = (v: any) => { const rmd=num(v.b)/num(v.f); return {items:[{label:'RMD Amount',value:rmd.toFixed(2),highlight:true}]}; };
        let res: any = fn(v);
        if (!res.chart && res.items && res.items.length > 0) {
          let chartData = res.items.map((item: any) => ({
            name: item.label.replace(/\([^)]+\)/g, '').trim(),
            val: parseFloat(item.value.toString().replace(/[^0-9.-]+/g,"")) || 0
          }));
          if (chartData.length === 1) {
             const inputDefs = [{"id":"b","label":"Account Balance","type":"number","defaultValue":500000},{"id":"f","label":"Life Expectancy Factor","type":"number","defaultValue":25.6}];
             const inputData = inputDefs.map((inp: any) => ({
               name: inp.label.replace(/\([^)]+\)/g, '').trim(),
               val: parseFloat(v[inp.id]) || 0
             }));
             const maxItem = chartData[0].val || 1;
             const filteredInputs = inputData.filter((inp: any) => inp.val > Math.abs(maxItem) * 0.01 && inp.val <= Math.abs(maxItem) * 100);
             res.chart = { type: 'bar', data: [...filteredInputs, chartData[0]], dataKey: 'val', nameKey: 'name' };
          } else {
             const allPositive = chartData.every((d: any) => d.val >= 0);
             const isPie = allPositive && chartData.length <= 4;
             res.chart = { type: isPie ? 'pie' : 'bar', data: chartData, dataKey: 'val', nameKey: 'name' };
          }
        }
        return res as any;
      } catch(e) { return { items: [{label:'Error', value:'Invalid input'}] }; } 
    }
  },
  {
    id: "retirement-savings", name: "Retirement Savings", category: "Retirement", description: "See how much to save each month to reach a retirement goal",
    inputs: [{"id":"g","label":"Goal Amount","type":"number","defaultValue":1000000},{"id":"y","label":"Years","type":"number","defaultValue":30},{"id":"r","label":"Return (%)","type":"number","defaultValue":7}],
    calculate: (v) => { 
      try { 
        const fn = (v: any) => { const r=num(v.r)/1200; const n=num(v.y)*12; const p=(num(v.g)*r)/(Math.pow(1+r,n)-1); return {items:[{label:'Monthly Savings',value:p.toFixed(2),highlight:true}]}; };
        let res: any = fn(v);
        if (!res.chart && res.items && res.items.length > 0) {
          let chartData = res.items.map((item: any) => ({
            name: item.label.replace(/\([^)]+\)/g, '').trim(),
            val: parseFloat(item.value.toString().replace(/[^0-9.-]+/g,"")) || 0
          }));
          if (chartData.length === 1) {
             const inputDefs = [{"id":"g","label":"Goal Amount","type":"number","defaultValue":1000000},{"id":"y","label":"Years","type":"number","defaultValue":30},{"id":"r","label":"Return (%)","type":"number","defaultValue":7}];
             const inputData = inputDefs.map((inp: any) => ({
               name: inp.label.replace(/\([^)]+\)/g, '').trim(),
               val: parseFloat(v[inp.id]) || 0
             }));
             const maxItem = chartData[0].val || 1;
             const filteredInputs = inputData.filter((inp: any) => inp.val > Math.abs(maxItem) * 0.01 && inp.val <= Math.abs(maxItem) * 100);
             res.chart = { type: 'bar', data: [...filteredInputs, chartData[0]], dataKey: 'val', nameKey: 'name' };
          } else {
             const allPositive = chartData.every((d: any) => d.val >= 0);
             const isPie = allPositive && chartData.length <= 4;
             res.chart = { type: isPie ? 'pie' : 'bar', data: chartData, dataKey: 'val', nameKey: 'name' };
          }
        }
        return res as any;
      } catch(e) { return { items: [{label:'Error', value:'Invalid input'}] }; } 
    }
  },
  {
    id: "post-retirement", name: "Post-Retirement Income", category: "Retirement", description: "Estimate sustainable income from a retirement portfolio",
    inputs: [{"id":"c","label":"Corpus","type":"number","defaultValue":1000000},{"id":"r","label":"Return (%)","type":"number","defaultValue":5}],
    calculate: (v) => { 
      try { 
        const fn = (v: any) => { const i=(num(v.c)*(num(v.r)/100))/12; return {items:[{label:'Monthly Income',value:i.toFixed(2),highlight:true}]}; };
        let res: any = fn(v);
        if (!res.chart && res.items && res.items.length > 0) {
          let chartData = res.items.map((item: any) => ({
            name: item.label.replace(/\([^)]+\)/g, '').trim(),
            val: parseFloat(item.value.toString().replace(/[^0-9.-]+/g,"")) || 0
          }));
          if (chartData.length === 1) {
             const inputDefs = [{"id":"c","label":"Corpus","type":"number","defaultValue":1000000},{"id":"r","label":"Return (%)","type":"number","defaultValue":5}];
             const inputData = inputDefs.map((inp: any) => ({
               name: inp.label.replace(/\([^)]+\)/g, '').trim(),
               val: parseFloat(v[inp.id]) || 0
             }));
             const maxItem = chartData[0].val || 1;
             const filteredInputs = inputData.filter((inp: any) => inp.val > Math.abs(maxItem) * 0.01 && inp.val <= Math.abs(maxItem) * 100);
             res.chart = { type: 'bar', data: [...filteredInputs, chartData[0]], dataKey: 'val', nameKey: 'name' };
          } else {
             const allPositive = chartData.every((d: any) => d.val >= 0);
             const isPie = allPositive && chartData.length <= 4;
             res.chart = { type: isPie ? 'pie' : 'bar', data: chartData, dataKey: 'val', nameKey: 'name' };
          }
        }
        return res as any;
      } catch(e) { return { items: [{label:'Error', value:'Invalid input'}] }; } 
    }
  },
  {
    id: "annuity", name: "Annuity Value", category: "Retirement", description: "Find the present value of a stream of future annuity payments",
    inputs: [{"id":"p","label":"Payment","type":"number","defaultValue":1000},{"id":"r","label":"Rate (%)","type":"number","defaultValue":5},{"id":"y","label":"Years","type":"number","defaultValue":20}],
    calculate: (v) => { 
      try { 
        const fn = (v: any) => { const r=num(v.r)/100; const pv=num(v.p)*((1-Math.pow(1+r,-num(v.y)))/r); return {items:[{label:'Present Value',value:pv.toFixed(2),highlight:true}]}; };
        let res: any = fn(v);
        if (!res.chart && res.items && res.items.length > 0) {
          let chartData = res.items.map((item: any) => ({
            name: item.label.replace(/\([^)]+\)/g, '').trim(),
            val: parseFloat(item.value.toString().replace(/[^0-9.-]+/g,"")) || 0
          }));
          if (chartData.length === 1) {
             const inputDefs = [{"id":"p","label":"Payment","type":"number","defaultValue":1000},{"id":"r","label":"Rate (%)","type":"number","defaultValue":5},{"id":"y","label":"Years","type":"number","defaultValue":20}];
             const inputData = inputDefs.map((inp: any) => ({
               name: inp.label.replace(/\([^)]+\)/g, '').trim(),
               val: parseFloat(v[inp.id]) || 0
             }));
             const maxItem = chartData[0].val || 1;
             const filteredInputs = inputData.filter((inp: any) => inp.val > Math.abs(maxItem) * 0.01 && inp.val <= Math.abs(maxItem) * 100);
             res.chart = { type: 'bar', data: [...filteredInputs, chartData[0]], dataKey: 'val', nameKey: 'name' };
          } else {
             const allPositive = chartData.every((d: any) => d.val >= 0);
             const isPie = allPositive && chartData.length <= 4;
             res.chart = { type: isPie ? 'pie' : 'bar', data: chartData, dataKey: 'val', nameKey: 'name' };
          }
        }
        return res as any;
      } catch(e) { return { items: [{label:'Error', value:'Invalid input'}] }; } 
    }
  },
  {
    id: "inflation-retirement", name: "Inflation Adjusted", category: "Retirement", description: "Show what a future amount is worth in today’s dollars",
    inputs: [{"id":"f","label":"Future Value","type":"number","defaultValue":1000000},{"id":"i","label":"Inflation (%)","type":"number","defaultValue":3},{"id":"y","label":"Years","type":"number","defaultValue":20}],
    calculate: (v) => { 
      try { 
        const fn = (v: any) => { const pv=num(v.f)/Math.pow(1+num(v.i)/100, num(v.y)); return {items:[{label:'Today\'s Value',value:pv.toFixed(2),highlight:true}]}; };
        let res: any = fn(v);
        if (!res.chart && res.items && res.items.length > 0) {
          let chartData = res.items.map((item: any) => ({
            name: item.label.replace(/\([^)]+\)/g, '').trim(),
            val: parseFloat(item.value.toString().replace(/[^0-9.-]+/g,"")) || 0
          }));
          if (chartData.length === 1) {
             const inputDefs = [{"id":"f","label":"Future Value","type":"number","defaultValue":1000000},{"id":"i","label":"Inflation (%)","type":"number","defaultValue":3},{"id":"y","label":"Years","type":"number","defaultValue":20}];
             const inputData = inputDefs.map((inp: any) => ({
               name: inp.label.replace(/\([^)]+\)/g, '').trim(),
               val: parseFloat(v[inp.id]) || 0
             }));
             const maxItem = chartData[0].val || 1;
             const filteredInputs = inputData.filter((inp: any) => inp.val > Math.abs(maxItem) * 0.01 && inp.val <= Math.abs(maxItem) * 100);
             res.chart = { type: 'bar', data: [...filteredInputs, chartData[0]], dataKey: 'val', nameKey: 'name' };
          } else {
             const allPositive = chartData.every((d: any) => d.val >= 0);
             const isPie = allPositive && chartData.length <= 4;
             res.chart = { type: isPie ? 'pie' : 'bar', data: chartData, dataKey: 'val', nameKey: 'name' };
          }
        }
        return res as any;
      } catch(e) { return { items: [{label:'Error', value:'Invalid input'}] }; } 
    }
  },
  {
    id: "savings-goal", name: "Savings Goal", category: "Banking & Savings", description: "Estimate time needed to reach a savings target with regular deposits",
    inputs: [{"id":"g","label":"Goal","type":"number","defaultValue":10000},{"id":"s","label":"Monthly Save","type":"number","defaultValue":500}],
    calculate: (v) => { 
      try { 
        const fn = (v: any) => { const m=num(v.g)/num(v.s); return {items:[{label:'Months',value:m.toFixed(1),highlight:true}]}; };
        let res: any = fn(v);
        if (!res.chart && res.items && res.items.length > 0) {
          let chartData = res.items.map((item: any) => ({
            name: item.label.replace(/\([^)]+\)/g, '').trim(),
            val: parseFloat(item.value.toString().replace(/[^0-9.-]+/g,"")) || 0
          }));
          if (chartData.length === 1) {
             const inputDefs = [{"id":"g","label":"Goal","type":"number","defaultValue":10000},{"id":"s","label":"Monthly Save","type":"number","defaultValue":500}];
             const inputData = inputDefs.map((inp: any) => ({
               name: inp.label.replace(/\([^)]+\)/g, '').trim(),
               val: parseFloat(v[inp.id]) || 0
             }));
             const maxItem = chartData[0].val || 1;
             const filteredInputs = inputData.filter((inp: any) => inp.val > Math.abs(maxItem) * 0.01 && inp.val <= Math.abs(maxItem) * 100);
             res.chart = { type: 'bar', data: [...filteredInputs, chartData[0]], dataKey: 'val', nameKey: 'name' };
          } else {
             const allPositive = chartData.every((d: any) => d.val >= 0);
             const isPie = allPositive && chartData.length <= 4;
             res.chart = { type: isPie ? 'pie' : 'bar', data: chartData, dataKey: 'val', nameKey: 'name' };
          }
        }
        return res as any;
      } catch(e) { return { items: [{label:'Error', value:'Invalid input'}] }; } 
    }
  },
  {
    id: "cd-ladder", name: "CD Ladder Avg Yield", category: "Banking & Savings", description: "Average the yield across a simple ladder of certificates of deposit",
    inputs: [{"id":"r1","label":"CD 1 Rate (%)","type":"number","defaultValue":2},{"id":"r2","label":"CD 2 Rate (%)","type":"number","defaultValue":3},{"id":"r3","label":"CD 3 Rate (%)","type":"number","defaultValue":4}],
    calculate: (v) => { 
      try { 
        const fn = (v: any) => { const avg=(num(v.r1)+num(v.r2)+num(v.r3))/3; return {items:[{label:'Avg Yield (%)',value:avg.toFixed(2)+'%',highlight:true}]}; };
        let res: any = fn(v);
        if (!res.chart && res.items && res.items.length > 0) {
          let chartData = res.items.map((item: any) => ({
            name: item.label.replace(/\([^)]+\)/g, '').trim(),
            val: parseFloat(item.value.toString().replace(/[^0-9.-]+/g,"")) || 0
          }));
          if (chartData.length === 1) {
             const inputDefs = [{"id":"r1","label":"CD 1 Rate (%)","type":"number","defaultValue":2},{"id":"r2","label":"CD 2 Rate (%)","type":"number","defaultValue":3},{"id":"r3","label":"CD 3 Rate (%)","type":"number","defaultValue":4}];
             const inputData = inputDefs.map((inp: any) => ({
               name: inp.label.replace(/\([^)]+\)/g, '').trim(),
               val: parseFloat(v[inp.id]) || 0
             }));
             const maxItem = chartData[0].val || 1;
             const filteredInputs = inputData.filter((inp: any) => inp.val > Math.abs(maxItem) * 0.01 && inp.val <= Math.abs(maxItem) * 100);
             res.chart = { type: 'bar', data: [...filteredInputs, chartData[0]], dataKey: 'val', nameKey: 'name' };
          } else {
             const allPositive = chartData.every((d: any) => d.val >= 0);
             const isPie = allPositive && chartData.length <= 4;
             res.chart = { type: isPie ? 'pie' : 'bar', data: chartData, dataKey: 'val', nameKey: 'name' };
          }
        }
        return res as any;
      } catch(e) { return { items: [{label:'Error', value:'Invalid input'}] }; } 
    }
  },
  {
    id: "money-market", name: "Money Market Return", category: "Banking & Savings", description: "Estimate simple interest on a money market style balance",
    inputs: [{"id":"b","label":"Balance","type":"number","defaultValue":10000},{"id":"r","label":"APY (%)","type":"number","defaultValue":4}],
    calculate: (v) => { 
      try { 
        const fn = (v: any) => { const r=num(v.b)*(num(v.r)/100); return {items:[{label:'Annual Interest',value:r.toFixed(2),highlight:true}]}; };
        let res: any = fn(v);
        if (!res.chart && res.items && res.items.length > 0) {
          let chartData = res.items.map((item: any) => ({
            name: item.label.replace(/\([^)]+\)/g, '').trim(),
            val: parseFloat(item.value.toString().replace(/[^0-9.-]+/g,"")) || 0
          }));
          if (chartData.length === 1) {
             const inputDefs = [{"id":"b","label":"Balance","type":"number","defaultValue":10000},{"id":"r","label":"APY (%)","type":"number","defaultValue":4}];
             const inputData = inputDefs.map((inp: any) => ({
               name: inp.label.replace(/\([^)]+\)/g, '').trim(),
               val: parseFloat(v[inp.id]) || 0
             }));
             const maxItem = chartData[0].val || 1;
             const filteredInputs = inputData.filter((inp: any) => inp.val > Math.abs(maxItem) * 0.01 && inp.val <= Math.abs(maxItem) * 100);
             res.chart = { type: 'bar', data: [...filteredInputs, chartData[0]], dataKey: 'val', nameKey: 'name' };
          } else {
             const allPositive = chartData.every((d: any) => d.val >= 0);
             const isPie = allPositive && chartData.length <= 4;
             res.chart = { type: isPie ? 'pie' : 'bar', data: chartData, dataKey: 'val', nameKey: 'name' };
          }
        }
        return res as any;
      } catch(e) { return { items: [{label:'Error', value:'Invalid input'}] }; } 
    }
  },
  {
    id: "overdraft", name: "Overdraft Fee Calc", category: "Banking & Savings", description: "Add up the cost of an overdraft including fees and interest",
    inputs: [{"id":"f","label":"Fee per Day","type":"number","defaultValue":5},{"id":"d","label":"Days","type":"number","defaultValue":10}],
    calculate: (v) => { 
      try { 
        const fn = (v: any) => { const t=num(v.f)*num(v.d); return {items:[{label:'Total Fees',value:t.toFixed(2),highlight:true}]}; };
        let res: any = fn(v);
        if (!res.chart && res.items && res.items.length > 0) {
          let chartData = res.items.map((item: any) => ({
            name: item.label.replace(/\([^)]+\)/g, '').trim(),
            val: parseFloat(item.value.toString().replace(/[^0-9.-]+/g,"")) || 0
          }));
          if (chartData.length === 1) {
             const inputDefs = [{"id":"f","label":"Fee per Day","type":"number","defaultValue":5},{"id":"d","label":"Days","type":"number","defaultValue":10}];
             const inputData = inputDefs.map((inp: any) => ({
               name: inp.label.replace(/\([^)]+\)/g, '').trim(),
               val: parseFloat(v[inp.id]) || 0
             }));
             const maxItem = chartData[0].val || 1;
             const filteredInputs = inputData.filter((inp: any) => inp.val > Math.abs(maxItem) * 0.01 && inp.val <= Math.abs(maxItem) * 100);
             res.chart = { type: 'bar', data: [...filteredInputs, chartData[0]], dataKey: 'val', nameKey: 'name' };
          } else {
             const allPositive = chartData.every((d: any) => d.val >= 0);
             const isPie = allPositive && chartData.length <= 4;
             res.chart = { type: isPie ? 'pie' : 'bar', data: chartData, dataKey: 'val', nameKey: 'name' };
          }
        }
        return res as any;
      } catch(e) { return { items: [{label:'Error', value:'Invalid input'}] }; } 
    }
  },
  {
    id: "cheque-bounce", name: "Cheque Bounce Penalty", category: "Banking & Savings", description: "Estimate fees and interest tied to a returned check",
    inputs: [{"id":"a","label":"Amount","type":"number","defaultValue":1000},{"id":"p","label":"Penalty (%)","type":"number","defaultValue":2}],
    calculate: (v) => { 
      try { 
        const fn = (v: any) => { const p=num(v.a)*(num(v.p)/100); return {items:[{label:'Penalty',value:p.toFixed(2),highlight:true}]}; };
        let res: any = fn(v);
        if (!res.chart && res.items && res.items.length > 0) {
          let chartData = res.items.map((item: any) => ({
            name: item.label.replace(/\([^)]+\)/g, '').trim(),
            val: parseFloat(item.value.toString().replace(/[^0-9.-]+/g,"")) || 0
          }));
          if (chartData.length === 1) {
             const inputDefs = [{"id":"a","label":"Amount","type":"number","defaultValue":1000},{"id":"p","label":"Penalty (%)","type":"number","defaultValue":2}];
             const inputData = inputDefs.map((inp: any) => ({
               name: inp.label.replace(/\([^)]+\)/g, '').trim(),
               val: parseFloat(v[inp.id]) || 0
             }));
             const maxItem = chartData[0].val || 1;
             const filteredInputs = inputData.filter((inp: any) => inp.val > Math.abs(maxItem) * 0.01 && inp.val <= Math.abs(maxItem) * 100);
             res.chart = { type: 'bar', data: [...filteredInputs, chartData[0]], dataKey: 'val', nameKey: 'name' };
          } else {
             const allPositive = chartData.every((d: any) => d.val >= 0);
             const isPie = allPositive && chartData.length <= 4;
             res.chart = { type: isPie ? 'pie' : 'bar', data: chartData, dataKey: 'val', nameKey: 'name' };
          }
        }
        return res as any;
      } catch(e) { return { items: [{label:'Error', value:'Invalid input'}] }; } 
    }
  },
  {
    id: "rate-converter", name: "Rate Converter", category: "Banking & Savings", description: "Convert between monthly and annual interest rate formats",
    inputs: [{"id":"r","label":"Monthly Rate (%)","type":"number","defaultValue":1}],
    calculate: (v) => { 
      try { 
        const fn = (v: any) => { const a=num(v.r)*12; return {items:[{label:'Annual Rate (%)',value:a.toFixed(2)+'%',highlight:true}]}; };
        let res: any = fn(v);
        if (!res.chart && res.items && res.items.length > 0) {
          let chartData = res.items.map((item: any) => ({
            name: item.label.replace(/\([^)]+\)/g, '').trim(),
            val: parseFloat(item.value.toString().replace(/[^0-9.-]+/g,"")) || 0
          }));
          if (chartData.length === 1) {
             const inputDefs = [{"id":"r","label":"Monthly Rate (%)","type":"number","defaultValue":1}];
             const inputData = inputDefs.map((inp: any) => ({
               name: inp.label.replace(/\([^)]+\)/g, '').trim(),
               val: parseFloat(v[inp.id]) || 0
             }));
             const maxItem = chartData[0].val || 1;
             const filteredInputs = inputData.filter((inp: any) => inp.val > Math.abs(maxItem) * 0.01 && inp.val <= Math.abs(maxItem) * 100);
             res.chart = { type: 'bar', data: [...filteredInputs, chartData[0]], dataKey: 'val', nameKey: 'name' };
          } else {
             const allPositive = chartData.every((d: any) => d.val >= 0);
             const isPie = allPositive && chartData.length <= 4;
             res.chart = { type: isPie ? 'pie' : 'bar', data: chartData, dataKey: 'val', nameKey: 'name' };
          }
        }
        return res as any;
      } catch(e) { return { items: [{label:'Error', value:'Invalid input'}] }; } 
    }
  },
  {
    id: "compounding-freq", name: "Compounding Effect", category: "Banking & Savings", description: "Compare growth when interest compounds yearly versus more often",
    inputs: [{"id":"p","label":"Principal","type":"number","defaultValue":10000},{"id":"r","label":"Rate (%)","type":"number","defaultValue":5}],
    calculate: (v) => { 
      try { 
        const fn = (v: any) => { const r=num(v.r)/100; const a=num(v.p)*Math.pow(1+r,1); const d=num(v.p)*Math.pow(1+r/365,365); return {items:[{label:'Annual Gain',value:(a-num(v.p)).toFixed(2)},{label:'Daily Comp. Gain',value:(d-num(v.p)).toFixed(2),highlight:true}]}; };
        let res: any = fn(v);
        if (!res.chart && res.items && res.items.length > 0) {
          let chartData = res.items.map((item: any) => ({
            name: item.label.replace(/\([^)]+\)/g, '').trim(),
            val: parseFloat(item.value.toString().replace(/[^0-9.-]+/g,"")) || 0
          }));
          if (chartData.length === 1) {
             const inputDefs = [{"id":"p","label":"Principal","type":"number","defaultValue":10000},{"id":"r","label":"Rate (%)","type":"number","defaultValue":5}];
             const inputData = inputDefs.map((inp: any) => ({
               name: inp.label.replace(/\([^)]+\)/g, '').trim(),
               val: parseFloat(v[inp.id]) || 0
             }));
             const maxItem = chartData[0].val || 1;
             const filteredInputs = inputData.filter((inp: any) => inp.val > Math.abs(maxItem) * 0.01 && inp.val <= Math.abs(maxItem) * 100);
             res.chart = { type: 'bar', data: [...filteredInputs, chartData[0]], dataKey: 'val', nameKey: 'name' };
          } else {
             const allPositive = chartData.every((d: any) => d.val >= 0);
             const isPie = allPositive && chartData.length <= 4;
             res.chart = { type: isPie ? 'pie' : 'bar', data: chartData, dataKey: 'val', nameKey: 'name' };
          }
        }
        return res as any;
      } catch(e) { return { items: [{label:'Error', value:'Invalid input'}] }; } 
    }
  },
  {
    id: "time-deposit", name: "Time Deposit", category: "Banking & Savings", description: "Estimate maturity value of a fixed-term deposit",
    inputs: [{"id":"p","label":"Principal","type":"number","defaultValue":5000},{"id":"r","label":"Rate (%)","type":"number","defaultValue":4},{"id":"m","label":"Months","type":"number","defaultValue":12}],
    calculate: (v) => { 
      try { 
        const fn = (v: any) => { const i=(num(v.p)*(num(v.r)/100)*(num(v.m)/12)); return {items:[{label:'Maturity Value',value:(num(v.p)+i).toFixed(2),highlight:true}]}; };
        let res: any = fn(v);
        if (!res.chart && res.items && res.items.length > 0) {
          let chartData = res.items.map((item: any) => ({
            name: item.label.replace(/\([^)]+\)/g, '').trim(),
            val: parseFloat(item.value.toString().replace(/[^0-9.-]+/g,"")) || 0
          }));
          if (chartData.length === 1) {
             const inputDefs = [{"id":"p","label":"Principal","type":"number","defaultValue":5000},{"id":"r","label":"Rate (%)","type":"number","defaultValue":4},{"id":"m","label":"Months","type":"number","defaultValue":12}];
             const inputData = inputDefs.map((inp: any) => ({
               name: inp.label.replace(/\([^)]+\)/g, '').trim(),
               val: parseFloat(v[inp.id]) || 0
             }));
             const maxItem = chartData[0].val || 1;
             const filteredInputs = inputData.filter((inp: any) => inp.val > Math.abs(maxItem) * 0.01 && inp.val <= Math.abs(maxItem) * 100);
             res.chart = { type: 'bar', data: [...filteredInputs, chartData[0]], dataKey: 'val', nameKey: 'name' };
          } else {
             const allPositive = chartData.every((d: any) => d.val >= 0);
             const isPie = allPositive && chartData.length <= 4;
             res.chart = { type: isPie ? 'pie' : 'bar', data: chartData, dataKey: 'val', nameKey: 'name' };
          }
        }
        return res as any;
      } catch(e) { return { items: [{label:'Error', value:'Invalid input'}] }; } 
    }
  },
  {
    id: "cc-payoff", name: "CC Payoff Time", category: "Credit Card & Debt", description: "See how long it takes to pay off a credit card balance at a fixed payment",
    inputs: [{"id":"b","label":"Balance","type":"number","defaultValue":5000},{"id":"r","label":"APR (%)","type":"number","defaultValue":18},{"id":"p","label":"Monthly Pay","type":"number","defaultValue":200}],
    calculate: (v) => { 
      try { 
        const fn = (v: any) => { const i=num(v.r)/1200; const m=-Math.log(1-(i*num(v.b))/num(v.p))/Math.log(1+i); return {items:[{label:'Months',value:m>0?m.toFixed(1):'Never',highlight:true}]}; };
        let res: any = fn(v);
        if (!res.chart && res.items && res.items.length > 0) {
          let chartData = res.items.map((item: any) => ({
            name: item.label.replace(/\([^)]+\)/g, '').trim(),
            val: parseFloat(item.value.toString().replace(/[^0-9.-]+/g,"")) || 0
          }));
          if (chartData.length === 1) {
             const inputDefs = [{"id":"b","label":"Balance","type":"number","defaultValue":5000},{"id":"r","label":"APR (%)","type":"number","defaultValue":18},{"id":"p","label":"Monthly Pay","type":"number","defaultValue":200}];
             const inputData = inputDefs.map((inp: any) => ({
               name: inp.label.replace(/\([^)]+\)/g, '').trim(),
               val: parseFloat(v[inp.id]) || 0
             }));
             const maxItem = chartData[0].val || 1;
             const filteredInputs = inputData.filter((inp: any) => inp.val > Math.abs(maxItem) * 0.01 && inp.val <= Math.abs(maxItem) * 100);
             res.chart = { type: 'bar', data: [...filteredInputs, chartData[0]], dataKey: 'val', nameKey: 'name' };
          } else {
             const allPositive = chartData.every((d: any) => d.val >= 0);
             const isPie = allPositive && chartData.length <= 4;
             res.chart = { type: isPie ? 'pie' : 'bar', data: chartData, dataKey: 'val', nameKey: 'name' };
          }
        }
        return res as any;
      } catch(e) { return { items: [{label:'Error', value:'Invalid input'}] }; } 
    }
  },
  {
    id: "min-payment", name: "Minimum Payment", category: "Credit Card & Debt", description: "Estimate a typical minimum payment as a percentage of the balance",
    inputs: [{"id":"b","label":"Balance","type":"number","defaultValue":5000}],
    calculate: (v) => { 
      try { 
        const fn = (v: any) => { const m=Math.max(25, num(v.b)*0.02); return {items:[{label:'Min Payment',value:m.toFixed(2),highlight:true}]}; };
        let res: any = fn(v);
        if (!res.chart && res.items && res.items.length > 0) {
          let chartData = res.items.map((item: any) => ({
            name: item.label.replace(/\([^)]+\)/g, '').trim(),
            val: parseFloat(item.value.toString().replace(/[^0-9.-]+/g,"")) || 0
          }));
          if (chartData.length === 1) {
             const inputDefs = [{"id":"b","label":"Balance","type":"number","defaultValue":5000}];
             const inputData = inputDefs.map((inp: any) => ({
               name: inp.label.replace(/\([^)]+\)/g, '').trim(),
               val: parseFloat(v[inp.id]) || 0
             }));
             const maxItem = chartData[0].val || 1;
             const filteredInputs = inputData.filter((inp: any) => inp.val > Math.abs(maxItem) * 0.01 && inp.val <= Math.abs(maxItem) * 100);
             res.chart = { type: 'bar', data: [...filteredInputs, chartData[0]], dataKey: 'val', nameKey: 'name' };
          } else {
             const allPositive = chartData.every((d: any) => d.val >= 0);
             const isPie = allPositive && chartData.length <= 4;
             res.chart = { type: isPie ? 'pie' : 'bar', data: chartData, dataKey: 'val', nameKey: 'name' };
          }
        }
        return res as any;
      } catch(e) { return { items: [{label:'Error', value:'Invalid input'}] }; } 
    }
  },
  {
    id: "cc-interest", name: "CC Interest Charge", category: "Credit Card & Debt", description: "Calculate monthly interest charged on a revolving credit card balance",
    inputs: [{"id":"b","label":"Balance","type":"number","defaultValue":5000},{"id":"r","label":"APR (%)","type":"number","defaultValue":18}],
    calculate: (v) => { 
      try { 
        const fn = (v: any) => { const i=num(v.b)*(num(v.r)/1200); return {items:[{label:'Monthly Interest',value:i.toFixed(2),highlight:true}]}; };
        let res: any = fn(v);
        if (!res.chart && res.items && res.items.length > 0) {
          let chartData = res.items.map((item: any) => ({
            name: item.label.replace(/\([^)]+\)/g, '').trim(),
            val: parseFloat(item.value.toString().replace(/[^0-9.-]+/g,"")) || 0
          }));
          if (chartData.length === 1) {
             const inputDefs = [{"id":"b","label":"Balance","type":"number","defaultValue":5000},{"id":"r","label":"APR (%)","type":"number","defaultValue":18}];
             const inputData = inputDefs.map((inp: any) => ({
               name: inp.label.replace(/\([^)]+\)/g, '').trim(),
               val: parseFloat(v[inp.id]) || 0
             }));
             const maxItem = chartData[0].val || 1;
             const filteredInputs = inputData.filter((inp: any) => inp.val > Math.abs(maxItem) * 0.01 && inp.val <= Math.abs(maxItem) * 100);
             res.chart = { type: 'bar', data: [...filteredInputs, chartData[0]], dataKey: 'val', nameKey: 'name' };
          } else {
             const allPositive = chartData.every((d: any) => d.val >= 0);
             const isPie = allPositive && chartData.length <= 4;
             res.chart = { type: isPie ? 'pie' : 'bar', data: chartData, dataKey: 'val', nameKey: 'name' };
          }
        }
        return res as any;
      } catch(e) { return { items: [{label:'Error', value:'Invalid input'}] }; } 
    }
  },
  {
    id: "dti", name: "DTI Ratio", category: "Credit Card & Debt", description: "Measure monthly debt payments against gross income (debt-to-income ratio)",
    inputs: [{"id":"d","label":"Total Debt Pmts","type":"number","defaultValue":1500},{"id":"i","label":"Gross Income","type":"number","defaultValue":5000}],
    calculate: (v) => { 
      try { 
        const fn = (v: any) => { const r=(num(v.d)/num(v.i))*100; return {items:[{label:'DTI Ratio (%)',value:r.toFixed(2)+'%',highlight:true}]}; };
        let res: any = fn(v);
        if (!res.chart && res.items && res.items.length > 0) {
          let chartData = res.items.map((item: any) => ({
            name: item.label.replace(/\([^)]+\)/g, '').trim(),
            val: parseFloat(item.value.toString().replace(/[^0-9.-]+/g,"")) || 0
          }));
          if (chartData.length === 1) {
             const inputDefs = [{"id":"d","label":"Total Debt Pmts","type":"number","defaultValue":1500},{"id":"i","label":"Gross Income","type":"number","defaultValue":5000}];
             const inputData = inputDefs.map((inp: any) => ({
               name: inp.label.replace(/\([^)]+\)/g, '').trim(),
               val: parseFloat(v[inp.id]) || 0
             }));
             const maxItem = chartData[0].val || 1;
             const filteredInputs = inputData.filter((inp: any) => inp.val > Math.abs(maxItem) * 0.01 && inp.val <= Math.abs(maxItem) * 100);
             res.chart = { type: 'bar', data: [...filteredInputs, chartData[0]], dataKey: 'val', nameKey: 'name' };
          } else {
             const allPositive = chartData.every((d: any) => d.val >= 0);
             const isPie = allPositive && chartData.length <= 4;
             res.chart = { type: isPie ? 'pie' : 'bar', data: chartData, dataKey: 'val', nameKey: 'name' };
          }
        }
        return res as any;
      } catch(e) { return { items: [{label:'Error', value:'Invalid input'}] }; } 
    }
  },
  {
    id: "credit-utilization", name: "Credit Utilization", category: "Credit Card & Debt", description: "See what share of available credit is currently in use",
    inputs: [{"id":"u","label":"Used Credit","type":"number","defaultValue":2000},{"id":"a","label":"Total Limit","type":"number","defaultValue":10000}],
    calculate: (v) => { 
      try { 
        const fn = (v: any) => { const r=(num(v.u)/num(v.a))*100; return {items:[{label:'Utilization (%)',value:r.toFixed(2)+'%',highlight:true}]}; };
        let res: any = fn(v);
        if (!res.chart && res.items && res.items.length > 0) {
          let chartData = res.items.map((item: any) => ({
            name: item.label.replace(/\([^)]+\)/g, '').trim(),
            val: parseFloat(item.value.toString().replace(/[^0-9.-]+/g,"")) || 0
          }));
          if (chartData.length === 1) {
             const inputDefs = [{"id":"u","label":"Used Credit","type":"number","defaultValue":2000},{"id":"a","label":"Total Limit","type":"number","defaultValue":10000}];
             const inputData = inputDefs.map((inp: any) => ({
               name: inp.label.replace(/\([^)]+\)/g, '').trim(),
               val: parseFloat(v[inp.id]) || 0
             }));
             const maxItem = chartData[0].val || 1;
             const filteredInputs = inputData.filter((inp: any) => inp.val > Math.abs(maxItem) * 0.01 && inp.val <= Math.abs(maxItem) * 100);
             res.chart = { type: 'bar', data: [...filteredInputs, chartData[0]], dataKey: 'val', nameKey: 'name' };
          } else {
             const allPositive = chartData.every((d: any) => d.val >= 0);
             const isPie = allPositive && chartData.length <= 4;
             res.chart = { type: isPie ? 'pie' : 'bar', data: chartData, dataKey: 'val', nameKey: 'name' };
          }
        }
        return res as any;
      } catch(e) { return { items: [{label:'Error', value:'Invalid input'}] }; } 
    }
  },
  {
    id: "balance-transfer", name: "Balance Transfer", category: "Credit Card & Debt", description: "Compare transfer fees against interest savings on a card balance move",
    inputs: [{"id":"b","label":"Balance","type":"number","defaultValue":5000},{"id":"f","label":"Transfer Fee (%)","type":"number","defaultValue":3}],
    calculate: (v) => { 
      try { 
        const fn = (v: any) => { const f=num(v.b)*(num(v.f)/100); return {items:[{label:'Transfer Fee',value:f.toFixed(2),highlight:true}]}; };
        let res: any = fn(v);
        if (!res.chart && res.items && res.items.length > 0) {
          let chartData = res.items.map((item: any) => ({
            name: item.label.replace(/\([^)]+\)/g, '').trim(),
            val: parseFloat(item.value.toString().replace(/[^0-9.-]+/g,"")) || 0
          }));
          if (chartData.length === 1) {
             const inputDefs = [{"id":"b","label":"Balance","type":"number","defaultValue":5000},{"id":"f","label":"Transfer Fee (%)","type":"number","defaultValue":3}];
             const inputData = inputDefs.map((inp: any) => ({
               name: inp.label.replace(/\([^)]+\)/g, '').trim(),
               val: parseFloat(v[inp.id]) || 0
             }));
             const maxItem = chartData[0].val || 1;
             const filteredInputs = inputData.filter((inp: any) => inp.val > Math.abs(maxItem) * 0.01 && inp.val <= Math.abs(maxItem) * 100);
             res.chart = { type: 'bar', data: [...filteredInputs, chartData[0]], dataKey: 'val', nameKey: 'name' };
          } else {
             const allPositive = chartData.every((d: any) => d.val >= 0);
             const isPie = allPositive && chartData.length <= 4;
             res.chart = { type: isPie ? 'pie' : 'bar', data: chartData, dataKey: 'val', nameKey: 'name' };
          }
        }
        return res as any;
      } catch(e) { return { items: [{label:'Error', value:'Invalid input'}] }; } 
    }
  }
];
