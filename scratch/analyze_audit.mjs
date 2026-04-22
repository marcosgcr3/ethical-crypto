import fs from 'fs';

const results = JSON.parse(fs.readFileSync('.unlighthouse/full-audit/ci-result.json', 'utf8'));

const total = results.length;
const averages = {
  performance: 0,
  accessibility: 0,
  bestPractices: 0,
  seo: 0,
  score: 0
};

results.forEach(r => {
  averages.performance += r.performance;
  averages.accessibility += r.accessibility;
  averages.bestPractices += r['best-practices'];
  averages.seo += r.seo;
  averages.score += r.score;
});

Object.keys(averages).forEach(k => {
  averages[k] = (averages[k] / total).toFixed(2);
});

const sortedPerformance = [...results].sort((a, b) => a.performance - b.performance);
const worstPerformance = sortedPerformance.slice(0, 5);
const bestPerformance = sortedPerformance.slice(-5).reverse();

const sortedAccessibility = [...results].sort((a, b) => a.accessibility - b.accessibility);
const worstAccessibility = sortedAccessibility.slice(0, 5);

console.log('Averages:', averages);
console.log('Worst Performance:', worstPerformance.map(r => ({ path: r.path, perf: r.performance })));
console.log('Best Performance:', bestPerformance.map(r => ({ path: r.path, perf: r.performance })));
console.log('Worst Accessibility:', worstAccessibility.map(r => ({ path: r.path, acc: r.accessibility })));
