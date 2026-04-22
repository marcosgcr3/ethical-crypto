const fs = require('fs');
const path = require('path');

const baseDir = 'c:/Users/marco/biohacking/.unlighthouse/ethicalbiohacking.com/9294';
const reportsDir = path.join(baseDir, 'reports');
const payloadPath = path.join(baseDir, 'assets/payload.js');

// Load current payload to keep options and scanMeta
const currentContent = fs.readFileSync(payloadPath, 'utf8');
const match = currentContent.match(/window\.__unlighthouse_payload\s*=\s*(.*)/);
if (!match) {
  console.error('Could not find window.__unlighthouse_payload in payload.js');
  process.exit(1);
}

const payload = JSON.parse(match[1]);
const reports = [];

function walk(dir, routePath = '') {
  const files = fs.readdirSync(dir);
  
  // Check if lighthouse.json exists in this folder
  if (files.includes('lighthouse.json')) {
    const data = JSON.parse(fs.readFileSync(path.join(dir, 'lighthouse.json'), 'utf8'));
    const finalRoutePath = routePath || '/';
    
    reports.push({
      route: {
        path: finalRoutePath,
        definition: { name: finalRoutePath === '/' ? 'index' : finalRoutePath.replace(/^\//, '').replace(/\//g, '-') }
      },
      report: data,
      tasks: { inspect: 'completed' }
    });
  }

  // Recurse into subdirectories
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory() && !file.startsWith('__')) {
      walk(fullPath, `${routePath}/${file}`);
    }
  }
}

console.log('Scanning reports...');
walk(reportsDir);

console.log(`Found ${reports.length} reports.`);
payload.reports = reports;
payload.scanMeta. monitor.doneTargets = reports.length;
payload.scanMeta.monitor.allTargets = reports.length;
payload.scanMeta.routes = reports.length;

const newContent = `window.__unlighthouse_payload = ${JSON.stringify(payload)}`;
fs.writeFileSync(payloadPath, newContent);
console.log('Successfully rebuilt payload.js');
