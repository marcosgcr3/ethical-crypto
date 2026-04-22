import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'path'

const prisma = new PrismaClient()

async function main() {
  console.log('--- Database Backup Script ---')
  console.log('Connecting to database...')
  
  try {
    // 1. Fetch Reviewers
    console.log('Fetching Reviewers...')
    const reviewers = await prisma.reviewer.findMany({
      include: {
        articles: true
      }
    })
    
    // 2. Fetch Articles
    console.log('Fetching Articles...')
    const articles = await prisma.article.findMany()
    
    const backupData = {
      timestamp: new Date().toISOString(),
      models: {
        Reviewer: reviewers,
        Article: articles
      }
    }
    
    // 3. Save to File
    const backupPath = path.join(process.cwd(), 'database_backup.json')
    fs.writeFileSync(backupPath, JSON.stringify(backupData, null, 2))
    
    console.log(`\n✅ Backup completed successfully!`)
    console.log(`Saved to: ${backupPath}`)
    console.log(`Total Reviewers: ${reviewers.length}`)
    console.log(`Total Articles: ${articles.length}`)
    
  } catch (error) {
    console.error('\n❌ Backup failed:')
    console.error(error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
