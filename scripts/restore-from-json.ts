import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'path'

const prisma = new PrismaClient()

async function main() {
  const backupPath = path.join(process.cwd(), 'database_backup.json')
  
  if (!fs.existsSync(backupPath)) {
    console.error('Backup file not found at:', backupPath)
    return
  }

  const rawData = fs.readFileSync(backupPath, 'utf8')
  const backup = JSON.parse(rawData)
  const { Reviewer, Article, SecurityLog } = backup.models

  console.log(`Starting restoration from ${backup.timestamp} into local PostgreSQL...`)

  // 1. Restore Reviewers
  console.log('Restoring Reviewers...')
  for (const reviewer of Reviewer) {
    const { articles, ...reviewerData } = reviewer
    await prisma.reviewer.upsert({
      where: { id: reviewer.id },
      update: reviewerData,
      create: reviewerData,
    })
  }

  // 2. Restore Articles
  console.log('Restoring Articles...')
  for (const article of Article) {
    await prisma.article.upsert({
      where: { id: article.id },
      update: article,
      create: article,
    })
  }

  // 3. Restore Security Logs
  console.log('Restoring Security Logs...')
  if (SecurityLog) {
    for (const log of SecurityLog) {
      await prisma.securityLog.upsert({
        where: { id: log.id },
        update: log,
        create: log,
      })
    }
  }

  console.log('✅ Restoration complete!')
}

main()
  .catch(e => {
    console.error('❌ Restoration failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
