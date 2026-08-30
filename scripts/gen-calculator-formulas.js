const fs = require('fs');
const path = require('path');

function sliceBalanced(source, openIndex, openChar, closeChar) {
  let depth = 0;
  let inStr = false;
  let strChar = '';
  let escaped = false;

  for (let i = openIndex; i < source.length; i++) {
    const ch = source[i];

    if (inStr) {
      if (escaped) {
        escaped = false;
        continue;
      }
      if (ch === '\\') {
        escaped = true;
        continue;
      }
      if (ch === strChar) {
        inStr = false;
        strChar = '';
      }
      continue;
    }

    if (ch === '"' || ch === "'") {
      inStr = true;
      strChar = ch;
      continue;
    }

    if (ch === openChar) {
      depth++;
      continue;
    }
    if (ch === closeChar) {
      depth--;
      if (depth === 0) {
        return source.slice(openIndex, i + 1);
      }
    }
  }
  return null;
}

function normalizeExpr(expr, inputs) {
  let out = String(expr ?? '').trim();
  if (!out) return out;

  out = out.replace(/num\s*\(\s*v\.([a-zA-Z0-9_]+)\s*\)/g, (_m, id) => String(id));
  out = out.replace(/Number\s*\(\s*v\.([a-zA-Z0-9_]+)\s*\)/g, (_m, id) => String(id));
  out = out.replace(/\bv\.([a-zA-Z0-9_]+)\b/g, (_m, id) => String(id));

  const powRe = /Math\.pow\(\s*([^,]+?)\s*,\s*([^)]+?)\s*\)/g;
  for (let i = 0; i < 8; i++) {
    const next = out.replace(powRe, (_m, a, b) => `(${a})^(${b})`);
    if (next === out) break;
    out = next;
  }

  out = out.replace(/Math\.log\(/g, 'ln(');
  out = out.replace(/Math\.abs\(/g, 'abs(');
  out = out.replace(/Math\.max\(/g, 'max(');
  out = out.replace(/Math\.min\(/g, 'min(');

  out = out.replace(/\.toFixed\(\s*\d+\s*\)/g, '');
  out = out.replace(/\s*\+\s*'%'?/g, '');
  out = out.replace(/\s*\+\s*"%"/g, '');

  out = out.replace(/\*/g, '×');
  out = out.replace(/\//g, '÷');
  out = out.replace(/-/g, '−');

  out = out.replace(/\s+/g, ' ').trim();

  const ids = new Set(inputs.map((i) => i.id).filter(Boolean));
  for (const id of ids) {
    out = out.replace(new RegExp(`\\b${id}\\b`, 'g'), id.toUpperCase());
  }

  return out;
}

function extractConstMap(fnBody) {
  const map = {};
  const re = /\bconst\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*=\s*([^;]+);/g;
  let m;
  while ((m = re.exec(fnBody))) {
    map[m[1]] = m[2].trim();
  }
  return map;
}

function resolveExpr(expr, constMap) {
  let out = String(expr ?? '').trim();
  for (let i = 0; i < 8; i++) {
    const next = out.replace(/(?<!\.)\b([a-zA-Z_$][a-zA-Z0-9_$]*)\b/g, (m, name) => {
      if (!constMap[name]) return m;
      return `(${constMap[name]})`;
    });
    if (next === out) break;
    out = next;
  }
  return out;
}

function extractInputs(block) {
  const idx = block.indexOf('inputs:');
  if (idx === -1) return [];
  const open = block.indexOf('[', idx);
  if (open === -1) return [];
  const src = sliceBalanced(block, open, '[', ']');
  if (!src) return [];
  try {
    const parsed = JSON.parse(src);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map((i) => ({ id: String(i?.id ?? '').trim(), label: String(i?.label ?? '').trim() }))
      .filter((i) => i.id && i.label);
  } catch {
    return [];
  }
}

function extractFnBody(block) {
  const idx = block.indexOf('const fn');
  if (idx === -1) return null;
  const arrow = block.indexOf('=>', idx);
  if (arrow === -1) return null;
  const open = block.indexOf('{', arrow);
  if (open === -1) return null;
  const src = sliceBalanced(block, open, '{', '}');
  if (!src) return null;
  return src.slice(1, -1);
}

function extractItemsChunk(fnBody) {
  const idx = fnBody.indexOf('items:');
  if (idx === -1) return null;
  const open = fnBody.indexOf('[', idx);
  if (open === -1) return null;
  return sliceBalanced(fnBody, open, '[', ']');
}

function extractFormulas(fnBody, inputs) {
  const constMap = extractConstMap(fnBody);
  const itemsChunk = extractItemsChunk(fnBody);
  if (!itemsChunk) return [];

  const formulas = [];
  const itemRe = /label\s*:\s*(['"])(.*?)\1[\s\S]*?value\s*:\s*([^,}]+)(?:,|\})/g;
  let m;
  while ((m = itemRe.exec(itemsChunk))) {
    const label = String(m[2] ?? '').trim();
    const valueExpr = String(m[3] ?? '').trim();
    if (!label || !valueExpr) continue;
    const resolved = resolveExpr(valueExpr, constMap);
    const normalized = normalizeExpr(resolved, inputs);
    if (!normalized) continue;
    formulas.push(`${label} = ${normalized}`);
  }
  return formulas.slice(0, 6);
}

function splitCalculatorBlocks(file) {
  const re = /\n\s*\{\s*\n\s*id:\s*"([^"]+)"/g;
  const hits = [];
  let m;
  while ((m = re.exec(file))) {
    hits.push({ id: m[1], index: m.index });
  }
  const blocks = [];
  for (let i = 0; i < hits.length; i++) {
    const start = hits[i].index;
    const end = i + 1 < hits.length ? hits[i + 1].index : file.length;
    blocks.push({ id: hits[i].id, text: file.slice(start, end) });
  }
  return blocks;
}

function generate() {
  const root = path.resolve(__dirname, '..');
  const sourcePath = path.join(root, 'lib', 'calculators.ts');
  const outPath = path.join(root, 'lib', 'calculatorFormulas.ts');

  const file = fs.readFileSync(sourcePath, 'utf8');
  const blocks = splitCalculatorBlocks(file);

  const out = {};
  for (const block of blocks) {
    const inputs = extractInputs(block.text);
    const fnBody = extractFnBody(block.text);
    if (!fnBody) continue;
    const formulas = extractFormulas(fnBody, inputs);
    if (!formulas.length) continue;
    const vars = inputs.map((i) => `${i.id.toUpperCase()} = ${i.label}`);
    out[block.id] = { formulas, vars };
  }

  if (!Object.keys(out).length) {
    console.error('[gen-calculator-formulas] No formulas generated. Check lib/calculators.ts parsing.');
    process.exit(1);
  }

  const content =
    `export type CalculatorFormulaData = { formulas: string[]; vars: string[] };\n\n` +
    `export const calculatorFormulas: Record<string, CalculatorFormulaData> = ${JSON.stringify(out, null, 2)};\n`;

  fs.writeFileSync(outPath, content, 'utf8');
}

generate();
