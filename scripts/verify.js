const fs = require('fs');
const required = ['index.html','api/leads.js','api/admin/login.js','api/admin/leads.js','api/admin/logout.js','sql/001_seller_leads.sql'];
for (const file of required) {
  if (!fs.existsSync(file)) throw new Error(`Missing ${file}`);
}
console.log('Static/Vercel Functions build check passed.');
