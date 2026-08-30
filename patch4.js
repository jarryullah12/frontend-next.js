const fs = require('fs');
let code = fs.readFileSync('scripts/gen-102-calcs.js', 'utf8');

code = code.replace(/const res = fn\(v\);/g, 'let res: any = fn(v);');
fs.writeFileSync('scripts/gen-102-calcs.js', code);
