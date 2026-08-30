const fs = require('fs');
const content = fs.readFileSync('lib/calculators.ts', 'utf8');
// This is not standard JSON, so we'll just parse the TS file using regex
const categories = new Set();
const matches = content.matchAll(/category:\s*"([^"]+)"/g);
for (const match of matches) {
  categories.add(match[1]);
}
console.log(Array.from(categories).sort());
