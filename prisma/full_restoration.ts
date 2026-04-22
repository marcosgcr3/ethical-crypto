import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const articlesData = [
  {
    title: 'Telomere Optimization: The Genetic Frontier',
    slug: 'telomere-optimization',
    category: 'longevity',
    excerpt: 'Deep dive into recent studies regarding molecular interventions and life habits that protect DNA integrity.',
    imageUrl: '/images/longevity.png',
    content: `<h2>The Vanguard of Genomics: Telomere Science</h2><p>Telomeres are the protective nucleotide caps at the ends of our chromosomes—often compared to the plastic tips on the ends of shoelaces. Every time a cell divides, these telomeres become slightly shorter. When they become too short, the cell can no longer divide accurately and enters a state of "senescence" (or cellular old age).</p><h3>Key Strategies for Telomere Optimization</h3><ul><li><strong>Caloric Restriction & Fasting Mimetics:</strong> Engaging in intermittent fasting triggers autophagy, a cellular cleaning process that removes damaged organelles and reduces the burden on telomeres.</li><li><strong>NAD+ Support and Sirtuin Activation:</strong> Nicotinamide adenine dinucleotide (NAD+) is a critical coenzyme found in every living cell. It activates sirtuins, known commonly as the "longevity genes," which are essential for DNA repair and telomere maintenance.</li></ul>`,
    published: true,
    amazonProducts: []
  },
  {
    title: 'Functional Metabolic Flexibility Strategies',
    slug: 'metabolic-flexibility',
    category: 'nutrition',
    excerpt: 'Learn how to alternate fuel sources for improved cognitive clarity and sustained energy levels.',
    imageUrl: '/images/nutrition.png',
    content: `<h2>The Biochemistry of Substrate Utilization</h2><p>Metabolic flexibility refers to the body's innate, evolutionary ability to seamlessly transition between burning glucose and burning stored fats depending on fuel availability.</p><h3>Zone 2 Cardiovascular Training</h3><p>Exercising at a specific, steady-state intensity—where your heart rate is elevated but you can still hold a conversation (roughly 60-70% of max HR)—is critical. At this exact metabolic threshold, the body is forced to clear lactate while maximizing the use of fat as the primary substrate.</p>`,
    published: true,
    amazonProducts: []
  },
  {
    title: 'Hormesis: The Science of Heat and Cold Thermogenesis',
    slug: 'hormesis-guide',
    category: 'longevity',
    excerpt: 'Engage the power of beneficial biological stress through cold plunges and saunas to trigger cellular longevity signals.',
    imageUrl: '/images/longevity.png',
    content: `<h2>Hormesis: The Science of Beneficial Stress</h2><p>In the vanguard of longevity science, hormesis represents a pivotal paradigm shift. It is the concept that low-dose stressors—which would be toxic in high doses—actually trigger a cascade of beneficial, adaptive responses at the cellular level.</p><h3>Cold Thermogenesis (The Cold Plunge)</h3><p>Exposure to extreme cold (39-50°F) for short durations triggers the massive release of norepinephrine, activates brown adipose tissue (BAT), and stimulates mitochondrial biogenesis. It signals to the body that it must become more efficient and resilient to survive.</p>`,
    published: true,
    amazonProducts: []
  },
  {
    title: 'Autophagy Activation: Cellular Cleaning Protocols',
    slug: 'autophagy-activation',
    category: 'longevity',
    excerpt: 'How to trigger the cellular self-cleaning process for anti-aging and protein recycling.',
    imageUrl: '/images/longevity.png',
    content: `<h2>Autophagy: The Biological Act of Cleaning House</h2><p>Autophagy is the natural regulated mechanism of the cell that removes unnecessary or dysfunctional components. It allows the orderly degradation and recycling of cellular components, effectively refreshing the cell from the inside out.</p><h3>Fasting and Autophagy</h3><p>Triggering deep autophagy typically requires nutritional deprivation. Prolonged fasting (36+ hours) is the most potent trigger, though Time-Restricted Eating (16:8) provides a mild, daily stimulus for protein turnover.</p>`,
    published: true,
    amazonProducts: []
  },
  {
    title: 'Blue Zones Biohacking: Global Longevity Secrets',
    slug: 'blue-zones-longevity',
    category: 'longevity',
    excerpt: 'Deconstructing the lifestyles of world-leading centenarian populations for practical daily habits.',
    imageUrl: '/images/longevity.png',
    content: `<h2>Lessons from the Blue Zones</h2><p>From Okinawa, Japan to Sardinia, Italy, the common denominators of survival are no longer mystery. Centenarians in these regions share specific lifestyle "anchors" that keep their biological clocks ticking far beyond the global average.</p><ul><li><strong>Natural Movement:</strong> Not "gym" exercise, but persistent, low-level physical activity integrated into the environment.</li><li><strong>Polyphenol-Rich Mediterranean Nutrition:</strong> Focus on whole, plant-based foods, healthy fats, and local, seasonal produce.</li></ul>`,
    published: true,
    amazonProducts: []
  },
  {
    title: 'Longevity Biomarkers: What to Measure in 2026',
    slug: 'longevity-biomarkers',
    category: 'longevity',
    excerpt: 'Beyond basic bloodwork: Epigenetic clocks, HRV, and mitochondrial efficiency tests.',
    imageUrl: '/images/longevity.png',
    content: `<h2>The Quantification of Biological Age</h2><p>If you cannot measure it, you cannot manage it. These are the master metrics used by top-tier biohackers to audit their biological trajectory.</p><h3>Epigenetic Testing</h3><p>The Horvath Clock measures DNA methylation patterns to assess true cellular health. Poor diet strips away protective methylation, while longevity protocols restore it.</p><h3>HRV (Heart Rate Variability)</h3><p>HRV is the definitive master metric for measuring sympathetic vs. parasympathetic balance and recovery.</p>`,
    published: true,
    amazonProducts: []
  },
  {
    title: 'Senolytics: Clearing Zombie Cells for Healthspan',
    slug: 'senolytics-zombie-cells',
    category: 'longevity',
    excerpt: 'Identifying and removing senescent cells to reduce systemic inflammation and chronic disease.',
    imageUrl: '/images/longevity.png',
    content: `<h2>Senescence: The Zombie Cell Phenomenon</h2><p>Senolytic agents are a class of small molecules under intensive research for their ability to clear senescent cells—damaged cells that refuse to die and linger in the body, secreting inflammatory cytokines.</p><h3>Natural Senolytic Compounds</h3><p>Compounds such as Quercetin, Fisetin, and Spermidine are being heavily researched for their ability to clear "zombie cells" from the tissue matrix, drastically reducing systemic inflammation and extending lifespan.</p>`,
    published: true,
    amazonProducts: []
  },
  {
    title: 'Best Hydrolyzed Collagen 2026: Beauty and Biology',
    slug: 'best-collagen-guide',
    category: 'nutrition',
    excerpt: 'A comprehensive guide to dermal density and joint health through peptide optimization.',
    imageUrl: '/images/nutrition.png',
    content: `<h2>Structural Scaffolding: The Power of Collagen</h2><p>Hydrolyzed peptides are the gold standard for dermal density and joint health in 2026. Collagen is the fundamental structural scaffolding of the entire human organism.</p><h3>Why Hydrolysis Matters</h3><p>Eating raw animal ligaments does absolutely nothing to reverse biological aging. The collagen must be broken down into specific peptides that survive the digestive tract and signal the fibroblasts to produce new, healthy tissue.</p>`,
    published: true,
    amazonProducts: [{ name: "Standard Marine Collagen", asin: "B005H" }, { name: "Bovine Multi-Peptide", asin: "B002C" }]
  },
  {
    title: 'Intermittent Fasting 16:8: The Step-by-Step Guide',
    slug: 'fasting-16-8-guide',
    category: 'nutrition',
    excerpt: 'How to implement the 16:8 protocol for weight management and metabolic health.',
    imageUrl: '/images/nutrition.png',
    content: `<h2>Metabolic Resilience through Fasting</h2><p>Fasting is not starvation; it is the profound biological act of cleaning house. The 16:8 protocol is the foundation of modern metabolic health and insulin sensitivity.</p><h3>The Protocol</h3><p>By compressing your eating window into an 8-hour period and fasting for 16, you deliberately empty liver glycogen stores, forcing the body to begin fat oxidation and ketone production.</p>`,
    published: true,
    amazonProducts: [{ name: "Hydration Electrolyte Salt", asin: "B009G" }]
  },
  {
    title: 'Circadian Rhythm Reset: Science of Deep Rest',
    slug: 'circadian-reset',
    category: 'sleep',
    excerpt: 'The non-negotiable role of deep sleep in lymphatic drainage and long-term neuroprotection.',
    imageUrl: '/images/sleep.png',
    content: `<h2>Architecting the Perfect Sleep Environment</h2><p>Sleep is not a passive state of rest; it is an active, intensely regulated biological process of architectural repair, memory consolidation, and neuro-detoxification.</p><h3>Glymphatic Cleansing</h3><p>During deep sleep, the brain glial cells shrink in volume by up to 60%, allowing cerebrospinal fluid to wash away neurotoxic amyloid-beta plaques.</p>`,
    published: true,
    amazonProducts: []
  },
  {
    title: 'Bio-Sensors of 2026: Beyond Heart Rate',
    slug: 'bio-sensors-2026',
    category: 'wearables',
    excerpt: 'Exploring the new generation of continuous glucose monitors and stress-tracking tech.',
    imageUrl: '/images/wearable.png',
    content: `<h2>The Wearable Revolution</h2><p>The era of the "step-counter" is dead. We have entered the age of continuous, non-invasive biomarker monitoring. Clinical-grade sensors are now available to everyone.</p><h3>Continuous Glucose Monitoring (CGM)</h3><p>CGMs allow you to map your highly individualized glycemic responses to specific foods in real-time, eliminating guesswork and hunger crashes.</p>`,
    published: true,
    amazonProducts: []
  }
];

async function main() {
  console.log('Starting full-fidelity master restoration...');

  const reviewer = await prisma.reviewer.upsert({
    where: { id: 'default-marcus-id' },
    update: {},
    create: {
      id: 'default-marcus-id',
      name: 'Dr. Marcus Sterling',
      title: 'Medical Integrity Panel',
      bio: 'Licensed functional medicine practitioner specializing in longevity and genomics.',
      imageUrl: '/images/doctor.png',
    },
  });

  for (const a of articlesData) {
    await prisma.article.upsert({
      where: { slug: a.slug },
      update: {
        ...a,
        reviewerId: reviewer.id,
      },
      create: {
        ...a,
        reviewerId: reviewer.id,
      },
    });
    console.log(`Successfully restored: ${a.title}`);
  }

  console.log('Restoration complete. 11 articles are live with original content.');
}

main().catch(console.error).finally(() => prisma.$disconnect());
