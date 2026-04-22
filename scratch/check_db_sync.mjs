import { PrismaClient } from '@prisma/client';
import fs from 'fs';

const prisma = new PrismaClient();
const metadataPath = 'c:/Users/marco/biohacking/scratch/new_articles_metadata.json';

async function main() {
    const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
    const slugs = metadata.map(m => m.slug);
    
    const dbArticles = await prisma.article.findMany({
        where: { slug: { in: slugs } }
    });
    
    console.log(`Metadata articles count: ${metadata.length}`);
    console.log(`Database articles found: ${dbArticles.length}`);
    
    if (dbArticles.length > 0) {
        console.log('Sample found in DB:');
        dbArticles.slice(0, 3).forEach(a => console.log(`- ${a.title} (${a.slug})` ));
    }
}

main().catch(console.error).finally(() => prisma.$disconnect());
