import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

async function main() {
    const csvPath = path.join(process.cwd(), "ethicalbiohacking.com_PagesByIssueCategory_4_20_2026.csv");
    const fileContent = fs.readFileSync(csvPath, "utf-8");
    
    // Simple CSV parsing for this specific file
    const lines = fileContent.split("\n").filter(line => line.trim() !== "");
    const headers = lines[0].split(",");
    const urlIdx = headers.indexOf("URL");
    const titleIdx = headers.indexOf("Title");

    console.log("Restoring full titles from CSV...");
    let count = 0;

    for (let i = 1; i < lines.length; i++) {
        const row = lines[i].split(",");
        if (row.length <= Math.max(urlIdx, titleIdx)) continue;

        const url = row[urlIdx];
        // Handle cases where title might have commas (CSV with quotes)
        let fullTitle = row[titleIdx];
        if (fullTitle && fullTitle.startsWith('"')) {
            // Very simple quote handling
            fullTitle = lines[i].split('"')[1];
        }
        
        if (!url || !fullTitle) continue;

        const urlParts = url.split("/");
        if (urlParts.length >= 5) {
            const slug = urlParts[urlParts.length - 1].replace(/"/g, '');
            
            const article = await prisma.article.findUnique({
                where: { slug }
            });

            if (article) {
                console.log(`Restoring slug: ${slug} -> ${fullTitle}`);
                await prisma.article.update({
                    where: { id: article.id },
                    data: { title: fullTitle }
                });
                count++;
            }
        }
    }

    console.log(`\nFinished restoring ${count} titles.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
