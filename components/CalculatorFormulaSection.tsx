import React from 'react';
import { calculatorFormulas } from '@/lib/calculatorFormulas';

type CalcInput = { id: string; label: string };

function sliceBalanced(source: string, openIndex: number, openChar: string, closeChar: string) {
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

    if (ch === '"' || ch === "'" || ch === '`') {
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

function normalizeExpr(expr: string, inputs: CalcInput[]) {
  let out = expr;

  out = out.replace(/num\s*\(\s*v\.([a-zA-Z0-9_]+)\s*\)/g, (_m, id) => String(id));
  out = out.replace(/Number\s*\(\s*v\.([a-zA-Z0-9_]+)\s*\)/g, (_m, id) => String(id));
  out = out.replace(/\bv\.([a-zA-Z0-9_]+)\b/g, (_m, id) => String(id));

  const powRe = /Math\.pow\(\s*([^,]+?)\s*,\s*([^)]+?)\s*\)/g;
  for (let i = 0; i < 6; i++) {
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

  const inputIds = new Set(inputs.map((i) => i.id));
  for (const id of inputIds) {
    out = out.replace(new RegExp(`\\b${id}\\b`, 'g'), id.toUpperCase());
  }

  return out;
}

function extractFnBodyFromSource(src: string) {
  const idx = src.indexOf('const fn');
  if (idx === -1) return null;
  const arrow = src.indexOf('=>', idx);
  if (arrow === -1) return null;
  const open = src.indexOf('{', arrow);
  if (open === -1) return null;
  const sliced = sliceBalanced(src, open, '{', '}');
  if (!sliced) return null;
  return sliced.slice(1, -1);
}

function extractItemsChunk(src: string) {
  const idx = src.indexOf('items:');
  if (idx === -1) return null;
  const open = src.indexOf('[', idx);
  if (open === -1) return null;
  return sliceBalanced(src, open, '[', ']');
}

function extractConstMap(fnBody: string) {
  const map: Record<string, string> = {};
  const re = /const\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*=\s*([^;]+);/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(fnBody))) {
    map[m[1]] = m[2].trim();
  }
  return map;
}

function resolveExpr(expr: string, constMap: Record<string, string>) {
  let out = expr.trim();
  for (let i = 0; i < 6; i++) {
    const next = out.replace(/(?<!\.)\b([a-zA-Z_$][a-zA-Z0-9_$]*)\b/g, (m, name) => {
      if (!constMap[name]) return m;
      return `(${constMap[name]})`;
    });
    if (next === out) break;
    out = next;
  }
  return out;
}

function extractItemFormulasFromSource(src: string, inputs: CalcInput[]) {
  const fnBody = extractFnBodyFromSource(src);
  const body = fnBody ?? src;
  const constMap = extractConstMap(body);
  const itemsChunk = extractItemsChunk(body) ?? (fnBody ? extractItemsChunk(src) : null);
  if (!itemsChunk) return [];

  const formulas: string[] = [];
  const itemRe = /label\s*:\s*(['"])(.*?)\1[\s\S]*?value\s*:\s*([^,}]+)(?:,|\})/g;
  let m: RegExpExecArray | null;
  while ((m = itemRe.exec(itemsChunk))) {
    const label = String(m[2] ?? '').trim();
    const valueExpr = String(m[3] ?? '').trim();
    const resolved = resolveExpr(valueExpr, constMap);
    const normalized = normalizeExpr(resolved, inputs);
    if (!normalized) continue;
    formulas.push(`${label} = ${normalized}`);
  }
  return formulas.slice(0, 6);
}

function buildFormulaData(calc: any) {
  const fromMap = calc?.id ? calculatorFormulas[String(calc.id)] : undefined;
  if (fromMap?.formulas?.length) {
    return { formulas: fromMap.formulas, vars: fromMap.vars ?? [] };
  }

  const inputs: CalcInput[] = Array.isArray(calc?.inputs)
    ? calc.inputs
        .map((i: any) => ({ id: String(i?.id ?? '').trim(), label: String(i?.label ?? '').trim() }))
        .filter((i: CalcInput) => i.id && i.label)
    : [];

  const src = String(calc?.calculate?.toString?.() ?? '');
  const formulas = src ? extractItemFormulasFromSource(src, inputs) : [];
  const vars = inputs.map((i) => `${i.id.toUpperCase()} = ${i.label}`);
  return { formulas, vars };
}

export default function CalculatorFormulaSection({ calc }: { calc: any }) {
  const { formulas, vars } = buildFormulaData(calc);

  if (!formulas.length) return null;

  return (
    <>
      <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-10">Formula</h2>
      <div className="not-prose rounded-2xl border border-slate-200 bg-white p-5">
        <div className="space-y-2">
          {formulas.map((f) => (
            <div key={f} className="font-mono text-sm text-slate-900 break-words">
              {f}
            </div>
          ))}
        </div>
        {vars.length ? (
          <div className="mt-4 border-t border-slate-100 pt-4 grid gap-1 sm:grid-cols-2">
            {vars.map((v) => (
              <div key={v} className="text-xs text-slate-600 break-words">
                {v}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </>
  );
}
