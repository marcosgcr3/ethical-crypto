import { PrismaClient } from '@prisma/client';
import fs from 'fs';

const prisma = new PrismaClient();
const metadataPath = 'c:/Users/marco/biohacking/scratch/new_articles_metadata.json';

async function main() {
    // 1. Fetch draft articles from DB
    const drafts = await prisma.article.findMany({
        where: { published: false },
        select: { id: true, slug: true, category: true, title: true }
    });

    if (drafts.length === 0) {
        console.log('No draft articles found in the database.');
        return;
    }

    console.log(`Found ${drafts.length} draft articles.`);

    // 2. Group by category
    const categoriesOrder = ['longevity', 'wearables', 'nutrition', 'sleep'];
    const grouped = {
        longevity: [],
        wearables: [],
        nutrition: [],
        sleep: []
    };

    drafts.forEach(article => {
        const cat = article.category?.toLowerCase();
        if (grouped[cat]) {
            grouped[cat].push(article);
        } else {
            console.warn(`Article ${article.slug} has unknown category: ${article.category}`);
        }
    });

    // Sort to have a stable order
    categoriesOrder.forEach(cat => {
        grouped[cat].sort((a, b) => a.slug.localeCompare(b.slug));
    });

    // 3. Reschedule
    let startDate = new Date('2026-04-21');
    const scheduledUpdates = [];
    const metadataUpdates = [];

    // Cycle through categories
    let itemsLeft = drafts.length;
    let currentIdx = 0;

    while (itemsLeft > 0) {
        for (const cat of categoriesOrder) {
            if (grouped[cat].length > 0) {
                const article = grouped[cat].shift();
                
                // Clone the date and randomize time
                const date = new Date(startDate);
                date.setHours(9 + Math.floor(Math.random() * 8), Math.floor(Math.random() * 60)); // Random time between 9 AM and 5 PM
                
                scheduledUpdates.push({
                    id: article.id,
                    slug: article.slug,
                    newDate: date,
                    category: cat
                });

                metadataUpdates.push({
                    slug: article.slug,
                    publishedAt: date.toISOString()
                });

                // Increment date for the next article in the cycle
                startDate.setDate(startDate.getDate() + 2);
                itemsLeft--;
            }
        }
    }

    // 4. Update Database
    console.log('Updating database...');
    for (const update of scheduledUpdates) {
        await prisma.article.update({
            where: { id: update.id },
            data: { 
                createdAt: update.newDate,
                // Assuming you use updatedAt or a custom publishedAt for scheduling logic if implemented
            }
        });
        console.log(`- Scheduled ${update.slug} (${update.category}) for ${update.newDate.toISOString()}`);
    }

    // 5. Update JSON
    console.log('Updating new_articles_metadata.json...');
    const metadataContent = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
    
    metadataContent.forEach(item => {
        const update = metadataUpdates.find(u => u.slug === item.slug);
        if (update) {
            item.publishedAt = update.publishedAt;
        }
    });

    fs.writeFileSync(metadataPath, JSON.stringify(metadataContent, null, 2));
    console.log('JSON metadata updated.');

    console.log('Rescheduling complete.');
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
