/**
 * VERDORA Plant Care & Symptom Diagnostic Knowledgebase
 * Comprehensive care sheets, troubleshooting guides, and seasonal botanical wisdom.
 */

export const careCategories = [
  { id: 'all', name: 'All Guides' },
  { id: 'watering', name: 'Watering & Moisture' },
  { id: 'light', name: 'Light & Exposure' },
  { id: 'repotting', name: 'Soil & Repotting' },
  { id: 'seasonal', name: 'Seasonal Regimens' },
  { id: 'pests', name: 'Organic Pest Defense' },
];

export const careArticlesFull = [
  {
    id: 'art-01',
    slug: 'winter-hydration-tropical-leaves',
    title: 'The Art of Winter Hydration: Protecting Tropical Leaves',
    category: 'watering',
    categoryLabel: 'Watering & Moisture',
    readTime: '5 min read',
    date: 'November 2024',
    author: 'Elena Vance, Senior Botanist',
    image: 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=1000&q=80',
    summary:
      'As indoor heating kicks in, atmospheric humidity plummets below 30%. Discover our botanical regimen for preventing brittle leaf tips and maintaining vibrant fenestrations.',
    content: [
      {
        heading: 'The Winter Microclimate Paradox',
        body: 'During winter, outdoor temperatures drop while indoor heating artificializes our living environments. For tropical foliage native to humid rainforests, this dry ambient air saps cellular moisture faster than root systems can absorb it. The result is dry, crispy leaf margins on prayer plants and premature yellowing on lower monstera leaves.',
      },
      {
        heading: 'The Finger & Moisture Meter Test',
        body: 'Never water on a rigid calendar during colder months. Evaporation slows down dramatically. Push your index finger 2–3 inches into the soil. If you feel cool dampness, wait another 3–4 days before introducing filtered, room-temperature water.',
      },
      {
        heading: 'Creating Humidity Sanctuaries',
        body: 'Grouping plants together creates a collective micro-transpiration zone. Placing terracotta pebble trays filled with water beneath pots elevates ambient moisture by 15–25% without risking root rot.',
      },
    ],
    tips: [
      'Always use room-temperature water (18°C–22°C) to avoid thermal shock to delicate root hairs.',
      'Reduce liquid organic fertilizer by 50% between November and February as vegetative growth slows.',
      'Wipe broad glossy leaves with a damp microfiber cloth every fortnight to maximize photon absorption.',
    ],
  },
  {
    id: 'art-02',
    slug: 'decoding-indoor-plant-light',
    title: 'Decoding Light: Direct vs. Filtered Ambient Illumination',
    category: 'light',
    categoryLabel: 'Light & Exposure',
    readTime: '6 min read',
    date: 'October 2024',
    author: 'Dr. Arjun Singhania, Plant Physiologist',
    image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=1000&q=80',
    summary:
      'Why a south-facing windowsill is a paradise for Ficus but perilous for Calatheas. How to map the natural lux contours of your living space with precision.',
    content: [
      {
        heading: 'Understanding Light as Botanical Energy',
        body: 'Light is the food source for chlorophyll synthesis. What human eyes perceive as a "brightly lit room" can often be inadequate for photosynthesis. Light intensity decreases exponentially with distance according to the inverse-square law.',
      },
      {
        heading: 'The Shadow Test Method',
        body: 'Hold your hand 12 inches above a piece of white paper near your plant spot at midday. A crisp, sharp shadow signifies bright direct sunlight. A soft, blurred outline indicates bright indirect light (ideal for most houseplants). A faint silhouette means low light.',
      },
    ],
    tips: [
      'Sheer linen curtains diffuse harsh direct ultraviolet rays without diminishing photosynthetic active radiation.',
      'Rotate your specimens 90 degrees every week to maintain balanced, symmetrical canopy growth.',
    ],
  },
  {
    id: 'art-03',
    slug: 'architectural-repotting-rituals',
    title: 'The Architectural Repotting Ritual: Soil Aeration & Clay Vessels',
    category: 'repotting',
    categoryLabel: 'Soil & Repotting',
    readTime: '7 min read',
    date: 'September 2024',
    author: 'Maya Lin, Ceramicist & Horticulturist',
    image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=1000&q=80',
    summary:
      'From volcanic pumice ratios to breathable unglazed terracotta: how thoughtful root architecture allows statement specimens to thrive for decades.',
    content: [
      {
        heading: 'When is a Plant Truly Root-Bound?',
        body: 'Signs include water running straight through the drainage hole within seconds, roots coiling visibly on the soil surface, or growth completely stalling despite ideal lighting conditions.',
      },
      {
        heading: 'The Golden Aroid Soil Formula',
        body: '40% chunky pine or coco bark, 25% perlite or volcanic pumice, 25% organic coco peat compost, and 10% biochar with worm castings. This provides optimal oxygenation.',
      },
    ],
    tips: [
      'Only upsize pots by 2 to 3 inches in diameter. Oversized vessels retain stagnant water in unoccupied soil pockets.',
      'Always use containers with unobstructed drainage holes.',
    ],
  },
  {
    id: 'art-04',
    slug: 'organic-pest-defense-protocol',
    title: 'The Organic Pest Defense Protocol: Neem, Castile & Prevention',
    category: 'pests',
    categoryLabel: 'Organic Pest Defense',
    readTime: '4 min read',
    date: 'August 2024',
    author: 'Elena Vance, Senior Botanist',
    image: 'https://images.unsplash.com/photo-1617173944883-6ffbd35d584d?auto=format&fit=crop&w=1000&q=80',
    summary:
      'Prevent and treat common indoor pests like spider mites, fungus gnats, and mealybugs using gentle organic emulsified botanicals.',
    content: [
      {
        heading: 'Early Detection Over Eradication',
        body: 'Inspect leaf undersides and stem nodes weekly. Catching a colony of two spider mites prevents full-canopy webbing. Look for fine stippling or tiny silver dots on leaf blades.',
      },
    ],
    tips: [
      'Cold-pressed pure neem oil mixed with organic castile soap is safe for indoor pets and children.',
      'Isolate newly acquired plants for 7–10 days before introducing them to your main plant collection.',
    ],
  },
];

export const plantDoctorSymptoms = [
  {
    id: 'sym-01',
    symptom: 'Yellowing Leaves (Lower Canopy)',
    commonCause: 'Overwatering & Root Oxygen Deprivation',
    urgency: 'Medium',
    solution:
      'Allow the top 50% of the soil to dry out completely. Ensure the pot has free-flowing drainage. Trim completely yellowed foliage with sterilized shears.',
    quickCheck: 'Is the soil constantly soggy or smelling musty?',
  },
  {
    id: 'sym-02',
    symptom: 'Brown, Crispy Leaf Tips & Edges',
    commonCause: 'Low Atmospheric Humidity or Tap Water Salts',
    urgency: 'Low',
    solution:
      'Switch to filtered or rainwater to prevent fluoride/chlorine buildup. Increase humidity to 50%+ using pebble trays or grouping plants together.',
    quickCheck: 'Are you using hard municipal tap water directly?',
  },
  {
    id: 'sym-03',
    symptom: 'Drooping, Limp Foliage',
    commonCause: 'Dehydration or Severe Root Rot',
    urgency: 'High',
    solution:
      'Check soil moisture. If bone dry, bottom-water thoroughly for 30 minutes. If soaking wet, inspect roots for dark, mushy rot and repot in fresh airy mix.',
    quickCheck: 'Does the plant perk up within 4 hours of watering?',
  },
  {
    id: 'sym-04',
    symptom: 'Stretched, Leggy Stems with Small Pale Leaves',
    commonCause: 'Insufficient Sunlight (Etiolation)',
    urgency: 'Low',
    solution:
      'Move your plant closer to an east or south window with bright filtered ambient light. Prune leggy vine tips to stimulate bushier, denser growth.',
    quickCheck: 'Is the plant placed more than 8 feet away from the nearest window?',
  },
  {
    id: 'sym-05',
    symptom: 'Black or Dark Brown Water-Soaked Leaf Spots',
    commonCause: 'Bacterial or Fungal Leaf Infection',
    urgency: 'High',
    solution:
      'Immediately isolate the specimen. Prune affected leaves. Improve room air circulation and avoid splashing water onto leaf blades during watering.',
    quickCheck: 'Do the brown spots have a yellow halo ring around them?',
  },
  {
    id: 'sym-06',
    symptom: 'Fine Webbing on Undersides of Leaves',
    commonCause: 'Spider Mites Infestation',
    urgency: 'High',
    solution:
      'Shower the plant with lukewarm water to physically dislodge pests. Treat foliage with cold-pressed neem oil and castile soap spray every 5 days for 3 weeks.',
    quickCheck: 'Do you notice tiny specks crawling across fine silk strands?',
  },
];

export const speciesCareSheets = [
  {
    species: 'Monstera Deliciosa',
    binomial: 'Monstera deliciosa',
    light: 'Bright indirect light (500–1000 lux). Avoid harsh noon sun.',
    water: 'Every 7–10 days. Allow top 2–3 inches of soil to dry.',
    humidity: '50% – 70% ideal. Enjoys periodic leaf misting.',
    temperature: '18°C – 28°C.',
    soil: 'Chunky aroid mix with bark, perlite, and coco chips.',
    petSafe: false,
  },
  {
    species: 'Fiddle Leaf Fig',
    binomial: 'Ficus lyrata',
    light: 'Very bright filtered light with 2–3 hours of gentle morning sun.',
    water: 'Every 7–10 days when top 2 inches dry out. Consistent schedule.',
    humidity: 'Average room humidity (45%–60%).',
    temperature: '18°C – 26°C. Avoid sudden cold drafts.',
    soil: 'Well-draining rich potting mix with perlite.',
    petSafe: false,
  },
  {
    species: 'Sansevieria Moonshine',
    binomial: 'Dracaena trifasciata Moonshine',
    light: 'Adaptable from dim corners up to bright sunny spots.',
    water: 'Every 14–21 days. Soil must dry completely between waterings.',
    humidity: 'Tolerates dry indoor environments.',
    temperature: '15°C – 32°C.',
    soil: 'Fast-draining cactus and succulent mix with coarse sand.',
    petSafe: false,
  },
  {
    species: 'Calathea Orbifolia',
    binomial: 'Goeppertia orbifolia',
    light: 'Medium indirect or dappled shade. Never direct sun.',
    water: 'Every 5–7 days with filtered or distilled water.',
    humidity: 'High humidity (60%+). Sensitive to dry heating.',
    temperature: '18°C – 25°C.',
    soil: 'Moisture-retentive yet aerated peat and perlite blend.',
    petSafe: true,
  },
];

