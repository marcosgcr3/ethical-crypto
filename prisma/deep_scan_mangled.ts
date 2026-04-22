import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const MANGLED_PATTERNS = [
  { mangled: /\u252C\u2591/g, correct: '°', name: 'Degree Symbol' },
  { mangled: /\u00D4\u00C7\u00D6/g, correct: '’', name: 'Smart Apostrophe' },
  { mangled: /\u00D4\u00C7\u00A3/g, correct: '“', name: 'Left Smart Quote' },
  { mangled: /\u00D4\u00C7\u009D/g, correct: '”', name: 'Right Smart Quote' },
  { mangled: /\u00D4\u00C7\u00F4/g, correct: '–', name: 'En Dash' },
  { mangled: /\u00D4\u00C7\u00F6/g, correct: '—', name: 'Em Dash' },
];

async function main() {
  const articles = await prisma.article.findMany();

  console.log(`Scanning ${articles.length} articles for mangled characters...`);
  
  let totalIssues = 0;
  for (const article of articles) {
    let articleIssues = 0;
    const fields: ('title' | 'excerpt' | 'content')[] = ['title', 'excerpt', 'content'];
    
    for (const field of fields) {
      const val = article[field];
      if (!val) continue;
      
      for (const pattern of MANGLED_PATTERNS) {
        if (pattern.mangled.test(val)) {
          console.log(`- Issue in ${article.slug} [${field}]: Found ${pattern.name}`);
          articleIssues++;
          totalIssues++;
        }
      }
    }
  }

  console.log(`\nTotal issues found: ${totalIssues}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
