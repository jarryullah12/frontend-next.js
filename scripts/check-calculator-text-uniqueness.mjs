import fs from 'node:fs';

const filePath = new URL('../lib/calculators.ts', import.meta.url);
const src = fs.readFileSync(filePath, 'utf8');

const names = [...src.matchAll(/\bname:\s*"([^"]+)"/g)].map((m) => m[1]);
const descriptions = [...src.matchAll(/\bdescription:\s*"([^"]+)"/g)].map((m) => m[1]);

const duplicates = (arr) => {
  const counts = new Map();
  for (const x of arr) counts.set(x, (counts.get(x) ?? 0) + 1);
  return [...counts.entries()].filter(([, c]) => c > 1).sort((a, b) => b[1] - a[1]);
};

const dupNames = duplicates(names);
const dupDescriptions = duplicates(descriptions);

console.log(JSON.stringify({
  total: { names: names.length, descriptions: descriptions.length },
  duplicates: {
    names: dupNames.map(([value, count]) => ({ value, count })),
    descriptions: dupDescriptions.map(([value, count]) => ({ value, count })),
  },
}, null, 2));

if (dupNames.length || dupDescriptions.length) process.exit(1);
