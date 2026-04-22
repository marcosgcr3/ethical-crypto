import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

async function main() {
  const content = fs.readFileSync(path.join(process.cwd(), 'tmp/article_18.html'), 'utf-8');

  const article = await prisma.article.upsert({
    where: { slug: 'sleep-chronotype-manifesto-biology-productivity-hacking' },
    update: {
      title: 'The Sleep Chronotype Manifesto: Hacking Your Biology for Peak Productivity',
      content: content,
      category: 'sleep',
      imageUrl: '/images/hero_chronotypes.png',
      published: true,
      excerpt: 'Struggle to wake up at 5 AM? Stop fighting your biology. Master your sleep chronotype (Lion, Bear, Wolf, or Dolphin) to double your productivity and optimize your performance with half the effort.',
    },
    create: {
      title: 'The Sleep Chronotype Manifesto: Hacking Your Biology for Peak Productivity',
      slug: 'sleep-chronotype-manifesto-biology-productivity-hacking',
      content: content,
      category: 'sleep',
      imageUrl: '/images/hero_chronotypes.png',
      published: true,
      excerpt: 'Struggle to wake up at 5 AM? Stop fighting your biology. Master your sleep chronotype (Lion, Bear, Wolf, or Dolphin) to double your productivity and optimize your performance with half the effort.',
    },
  });

  console.log('Article 18 created/updated:', article.id);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
