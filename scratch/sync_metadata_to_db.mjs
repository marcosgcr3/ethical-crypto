import { PrismaClient } from '@prisma/client';
import fs from 'fs';

const prisma = new PrismaClient();
const metadataPath = 'c:/Users/marco/biohacking/scratch/new_articles_metadata.json';

async function main() {
    const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
    console.log(`Syncing ${metadata.length} articles from metadata...`);

    for (const item of metadata) {
        await prisma.article.upsert({
            where: { slug: item.slug },
            update: {
                title: item.title,
                excerpt: item.excerpt,
                imageUrl: item.imageUrl,
                category: item.category,
                // We keep it as a draft if it already was, or set to false for these new ones
                published: false 
            },
            create: {
                slug: item.slug,
                title: item.title,
                excerpt: item.excerpt,
                imageUrl: item.imageUrl,
                category: item.category,
                content: item.description || '', // Using description as placeholder for content
                published: false
            }
        });
        console.log(`- Synced: ${item.slug}`);
    }

    console.log('Sync complete.');
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
