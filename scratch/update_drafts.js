const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const updates = [
  {
    id: "4e0da7cb-0f2a-44fd-8dd6-1515f61159ab",
    title: "Fibermaxxing: The 2026 Gut Protocol for Extreme Longevity",
    excerpt: "Forget probiotics. \"Fibermaxxing\" is the ultimate longevity trend of 2026. Discover how specific fermentable fibers reduce biological age faster than most premium supplement stacks."
  },
  {
    id: "f2efbb49-9183-41d4-98f9-2efa6f3f3b16",
    title: "The Truth About DNA Shortening: Can Telomere Science Stop Aging?",
    excerpt: "Stop wasting money on telomerase activators. We separate billion-dollar industry hype from clinical reality to reveal the proven lifestyle habits that actually preserve DNA length."
  },
  {
    id: "91e35d64-d40e-4cb6-a5b7-e2718d01d8f9",
    title: "Destroy Zombie Cells: The Best Senolytic Foods to Stop Aging",
    excerpt: "Cellular senescence is silently accelerating your aging process. Unpack the science of dietary senolytics and learn how Quercetin and Fisetin flush these toxic cells from your body."
  },
  {
    id: "4a3ffcc9-3aab-4d49-9081-59b9dfde58cc",
    title: "AI Health Coaches Exposed: Do Whoop and Levels Actually Work?",
    excerpt: "Continuous glucose monitors and AI algorithms promise perfect health personalization. We dive deep into the data to reveal which 2026 biohacking platforms are worth your money."
  },
  {
    id: "b3efcf71-7fe5-409c-832a-2745051bcb3c",
    title: "Active Wearables 3.0: The Tech That Hacks Your Nervous System",
    excerpt: "Passive tracking is dead. Meet the next generation of wearables (like Apollo Neuro & Eight Sleep) that actively use temperature and neuro-vibrations to change your biology in real-time."
  },
  {
    id: "a53a4218-831e-4045-a7e9-f45d5add801d",
    title: "The Ultimate Longevity Supplement Stack 2026: Stop Wasting Money",
    excerpt: "Swallowing 40 pills a day? You're probably doing it wrong. Learn the fatal interactions hiding in your supplement drawer and discover the evidence-backed stack that actually works."
  },
  {
    id: "53c8744e-5636-4b1e-9fee-decc0b3f43e4",
    title: "Why Intermittent Fasting Fails Women (And How to Fix It)",
    excerpt: "Most mainstream fasting protocols were made by men, for men. Uncover the dangers of OMAD for female hormones and learn to map your biohacks dynamically to your infradian rhythm."
  },
  {
    id: "bcdd18e0-a208-437d-8ac2-35a399fb2fc0",
    title: "Biological Age Tests: Are Epigenetic Clocks a Total Scam?",
    excerpt: "Everyone is taking biological age tests like TruAge and DunedinPACE. But what do they actually measure? We expose the hard limits and clinical truths behind longevity testing."
  },
  {
    id: "d606b7b0-c596-4d5f-98c6-6dc9820965bf",
    title: "Red Light Therapy: The Ultimate Guide to True Mitochondria Healing",
    excerpt: "Is photobiomodulation just a red bulb, or a miracle cure? We decode clinical dosing, real scientific evidence, and tell you which expensive RLT devices you should actually avoid."
  },
  {
    id: "152e84ef-238d-443b-a4cf-aba0b73e5285",
    title: "The Natural GLP-1 Diet: How to Hack Satiety Without Ozempic",
    excerpt: "Weight loss injections are dominating the news, but you can trigger the exact same biological pathways naturally. Learn the specific food protocols that skyrocket your endogenous GLP-1."
  },
  {
    id: "6b86000c-5385-4747-a92b-9683f98cf6d3",
    title: "Why VO2 Max is the Ultimate Predictor of Longevity (Test Yours)",
    excerpt: "Forget cholesterol. VO2 Max is clinically proven as the single most powerful predictor of all-cause mortality. Learn exactly how to measure and drastically improve your cardiorespiratory fitness."
  }
];

async function main() {
  for (const update of updates) {
    await prisma.article.update({
      where: { id: update.id },
      data: {
        title: update.title,
        excerpt: update.excerpt
      }
    });
    console.log(`Updated ID: ${update.id}`);
  }
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
