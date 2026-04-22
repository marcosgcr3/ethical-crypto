const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function updateSEO() {
  const updates = [
    {
      slug: 'senolytic-nutrition-clear-zombie-cells',
      title: 'Senolytics: Foods to Clear Zombie Cells & Stop Aging',
      excerpt: 'Cellular senescence causes aging. Discover how dietary senolytics like Quercetin & Fisetin clear zombie cells before they trigger systemic disease.'
    },
    {
      slug: 'biological-age-testing-2026-epigenetic-clocks',
      title: 'Epigenetic Clocks 2026: Can We Map Biological Age?',
      excerpt: 'Biological age metrics are mainstream. But what do tests like TruAge or DunedinPACE really measure? We break down the true limits of longevity testing.'
    },
    {
      slug: 'vo2-max-longevity-cardiorespiratory-fitness',
      title: 'VO2 Max & Longevity: The #1 Predictor of a Long Life',
      excerpt: 'VO2 Max is the single most powerful predictor of all-cause mortality. Learn how to optimize your cardiorespiratory fitness for maximum longevity.'
    },
    {
      slug: 'telomere-science-2026-slowing-dna-shortening',
      title: 'Telomere Science 2026: Can You Stop DNA Shortening?',
      excerpt: 'Do telomerase activators actually work? We separate hype from real science, examining how lifestyle and supplements truly impact DNA telomere length.'
    }
  ];

  console.log('Starting SEO updates for drafts...');

  for (const item of updates) {
    try {
      const updatedInfo = await prisma.article.update({
        where: { slug: item.slug },
        data: {
          title: item.title,
          excerpt: item.excerpt
        }
      });
      console.log(`Updated successfully: ${updatedInfo.slug}`);
      console.log(` -> Title [${updatedInfo.title.length} chars]: ${updatedInfo.title}`);
      console.log(` -> Excerpt [${updatedInfo.excerpt.length} chars]: ${updatedInfo.excerpt}\n`);
    } catch (e) {
      console.error(`Failed to update ${item.slug}. It might not exist in the DB yet.`);
    }
  }
}

updateSEO()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
