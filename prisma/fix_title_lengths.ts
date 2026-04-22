import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    console.log("Checking article titles and shortening if > 65 characters...");
    
    const articles = await prisma.article.findMany();
    let updatedCount = 0;

    for (const article of articles) {
        if (article.title.length > 65) {
            let newTitle = article.title.substring(0, 65);
            // Try to cut at the last space within 65 chars
            const lastSpace = newTitle.lastIndexOf(" ");
            if (lastSpace > 30) {
                newTitle = newTitle.substring(0, lastSpace);
            }
            
            console.log(`Updating ID ${article.id}:`);
            console.log(`  OLD: (${article.title.length}) ${article.title}`);
            console.log(`  NEW: (${newTitle.length}) ${newTitle}`);
            
            await prisma.article.update({
                where: { id: article.id },
                data: { title: newTitle }
            });
            updatedCount++;
        }
    }

    console.log(`\nFinished. Updated ${updatedCount} articles.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
