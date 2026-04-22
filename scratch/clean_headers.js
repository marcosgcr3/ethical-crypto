const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function run() {
    console.log('Starting 70/30 sweep...');
    const articles = await prisma.article.findMany({ 
        select: { id: true, content: true, title: true } 
    });
    
    // Filter articles that have numbered headers
    const affected = articles.filter(a => /<h[1-4][^>]*>\d+\.\s+[^<]+<\/h[1-4]>/gi.test(a.content));
    console.log('Total affected articles: ' + affected.length);
    
    // Shuffle and pick 35 (70% of 50)
    // Using a fixed seed-like sort for reproducibility if needed, but random is fine here
    affected.sort((a, b) => a.id.localeCompare(b.id)); // Sort by ID first
    affected.sort(() => Math.random() - 0.5);
    
    const toClean = affected.slice(0, 35);
    console.log('Articles to clean: ' + toClean.length);
    
    let cleanedCount = 0;
    for (const a of toClean) {
        // Regex: group 1: opening tag, group 2: number and dot, group 3: rest of content
        const newContent = a.content.replace(/(<h[1-4][^>]*>)(\d+\.\s+)([^<]+<\/h[1-4]>)/gi, '$1$3');
        
        await prisma.article.update({
            where: { id: a.id },
            data: { content: newContent }
        });
        cleanedCount++;
        console.log(`Cleaned: ${a.title}`);
    }
    
    console.log('Successfully cleaned ' + cleanedCount + ' articles.');
}

run()
    .then(() => prisma.$disconnect())
    .catch(e => {
        console.error(e);
        prisma.$disconnect();
        process.exit(1);
    });
