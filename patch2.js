const fs = require('fs');
let code = fs.readFileSync('scripts/gen-102-calcs.js', 'utf8');

const parts = code.split('cList.forEach((c, idx) => {');

const newBottom = `cList.forEach((c, idx) => {
  out += \`  {
    id: "\${c.id}", name: "\${c.name}", category: "\${c.category}", description: "\${c.description}",
    inputs: \${JSON.stringify(c.inputs)},
    calculate: (v) => { 
      try { 
        const fn = (v: any) => { \${c.calculate} };
        const res = fn(v);
        if (!res.chart && res.items && res.items.length > 0) {
          let chartData = res.items.map((item: any) => ({
            name: item.label.replace(/\\\\([^)]+\\\\)/g, '').trim(),
            val: parseFloat(item.value.toString().replace(/[^0-9.-]+/g,"")) || 0
          }));
          if (chartData.length === 1) {
             const inputDefs = \${JSON.stringify(c.inputs)};
             const inputData = inputDefs.map((inp: any) => ({
               name: inp.label.replace(/\\\\([^)]+\\\\)/g, '').trim(),
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
        return res;
      } catch(e) { return { items: [{label:'Error', value:'Invalid input'}] }; } 
    }
  }\${idx < cList.length - 1 ? ',' : ''}\\n\`;
});
out += '];\\n';

fs.writeFileSync('lib/calculators.ts', out);
console.log('Created lib/calculators.ts with ' + cList.length + ' calculators (now with dynamic charts)');
`;

fs.writeFileSync('scripts/gen-102-calcs.js', parts[0] + newBottom);
