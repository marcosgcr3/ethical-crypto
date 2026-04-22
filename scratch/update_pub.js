const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const updates = [
  { id: "ad625637-dbad-4698-b410-fd1e2ba00485", title: "Deep Sleep Protocol: How to Biohack Your Brain's Glymphatic System" },
  { id: "d6be6837-98b5-4912-8840-d29219b9d609", title: "The 5 Essential Blood Tests for Extreme Longevity (Ask Your Doctor)" },
  { id: "ed59ade3-9298-41a7-b39a-bebc5fb5402b", title: "Why Non-Diabetics Are Using CGMs to Hack Fat Loss & Energy" },
  { id: "ade29bcb-602a-4ef6-82db-4d3b355e6f61", title: "How to Stimulate Your Vagus Nerve to Instantly Stop Anxiety" },
  { id: "28324b75-c55c-4453-8cb0-5d1a1c11836c", title: "The Truth About Collagen: Are You Wasting Your Money in 2026?" },
  { id: "12d2067a-4440-4802-bd40-af2dd86ce28f", title: "Why Skeletal Muscle is the Ultimate Longevity Organ (Not Cardio)" },
  { id: "9daf8565-3f6e-47c1-a470-02cdb6d424fc", title: "The Morning Sunlight Hack: How 10 Minutes Can Fix Your Sleep" },
  { id: "cf6f00d2-e853-4c6d-b26c-39c2b17ddade", title: "Heal Your Gut to Cure Anxiety: The 2026 Microbiome Protocol" },
  { id: "142f7b6d-95c9-47ff-8339-772ff2d5757a", title: "HRV Biohacking: How to Measure and Double Your Recovery Score" },
  { id: "75feff86-bd47-4559-8036-951f21ea9af0", title: "The 18°C Sleep Hack: Why Cold Rooms Melt Fat and Deepen Sleep" }
];

async function main() {
  for (const update of updates) {
    await prisma.article.update({
      where: { id: update.id },
      data: { title: update.title }
    });
    console.log(`Updated ID: ${update.id}`);
  }
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
