const fs = require('fs');
let code = fs.readFileSync('scripts/gen-102-calcs.js', 'utf8');

// The line is: return res;
code = code.replace(/return res;/g, 'return res as any;');
fs.writeFileSync('scripts/gen-102-calcs.js', code);
