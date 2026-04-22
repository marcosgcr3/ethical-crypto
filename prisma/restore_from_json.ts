import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

async function main() {
    const jsonPath = path.join(process.cwd(), "scratch", "articles_final.json");
    console.log(`Reading original titles from ${jsonPath}...`);
    
    // Read the file and handle potentially different encodings
    const fileBuffer = fs.readFileSync(jsonPath);
    let jsonContent = "";
    
    // Check for BOM for UTF-16LE or UTF-8
    if (fileBuffer[0] === 0xff && fileBuffer[1] === 0xfe) {
        jsonContent = fileBuffer.toString("utf16le");
    } else {
        jsonContent = fileBuffer.toString("utf-8");
    }

    // Strip BOM if present at the start of the string
    if (jsonContent.charCodeAt(0) === 0xFEFF) {
        jsonContent = jsonContent.slice(1);
    }

    const articles = JSON.parse(jsonContent);
    console.log(`Found ${articles.length} articles in JSON.`);
    
    let updateCount = 0;
    for (const a of articles) {
        if (a.id && a.title) {
            console.log(`Restoring article ${a.id}: ${a.title.substring(0, 50)}...`);
            await prisma.article.update({
                where: { id: a.id },
                data: { title: a.title.trim() }
            });
            updateCount++;
        }
    }

    console.log(`\nSuccess! Restored ${updateCount} titles to their original full length.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
