import { Product, Order } from '../types';

export const CATEGORIES = [
  'All',
  'Serums & Elixirs',
  'Moisturizers & Creams',
  'Cleansers & Balms',
  'Eye & Lip Care',
  'Facial Oils & Glow',
  'Sun Care & SPF'
] as const;

export const PRESET_IMAGES = [
  {
    name: 'Botanical Rosehip & Bakuchiol Serum',
    category: 'Serums & Elixirs',
    url: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1000&q=80'
  },
  {
    name: 'Celestial Dew Plumping Cream',
    category: 'Moisturizers & Creams',
    url: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=1000&q=80'
  },
  {
    name: 'Velvet Chamomile Cleansing Balm',
    category: 'Cleansers & Balms',
    url: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1000&q=80'
  },
  {
    name: 'Golden Camellia Nectar Face Oil',
    category: 'Facial Oils & Glow',
    url: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=1000&q=80'
  },
  {
    name: 'Silk Radiance Mineral Sunscreen SPF 50',
    category: 'Sun Care & SPF',
    url: 'https://images.unsplash.com/photo-1556228722-d9b3be373b9e?auto=format&fit=crop&w=1000&q=80'
  },
  {
    name: 'Peptide & Caffeine Eye Contour Gel',
    category: 'Eye & Lip Care',
    url: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=1000&q=80'
  },
  {
    name: 'Rose Damascena Hydrating Mist',
    category: 'Cleansers & Balms',
    url: 'https://images.unsplash.com/photo-1608248597359-216a67f00696?auto=format&fit=crop&w=1000&q=80'
  },
  {
    name: 'Honey Nectar & Peony Lip Treatment',
    category: 'Eye & Lip Care',
    url: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1000&q=80'
  },
  {
    name: 'Niacinamide 10% + Zinc Clarity Drops',
    category: 'Serums & Elixirs',
    url: 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=1000&q=80'
  },
  {
    name: 'Overnight Barrier Restorative Soufflé',
    category: 'Moisturizers & Creams',
    url: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1000&q=80'
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'lumiere-01',
    name: 'Rosehip & Phyto-Retinol Bakuchiol Elixir',
    tagline: 'Gentle botanical cell-renewing nighttime concentrate for sculpted, radiant skin',
    description: 'An exquisite lipid-replenishing active serum powered by cold-pressed Chilean rosehip seed oil and 2% natural Bakuchiol. Stimulates cellular turnover, smooths micro-textures, and restores youthful firmness without the irritation or photosensitivity of synthetic retinol.',
    price: 78,
    comparePrice: 92,
    category: 'Serums & Elixirs',
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1608248597359-216a67f00696?auto=format&fit=crop&w=1000&q=80'
    ],
    stock: 22,
    sku: 'LUM-SER-01',
    status: 'active',
    badge: 'bestseller',
    rating: 4.95,
    reviewsCount: 142,
    featured: true,
    volume: '30ml / 1.0 fl oz',
    skinType: 'All Skin Types, Ideal for Sensitive & Mature Skin',
    keyActives: ['2% Bakuchiol', 'Cold-Pressed Rosehip Fruit Oil', 'Olive Squalane', 'CoQ10'],
    howToUse: 'Warm 3 to 4 drops between clean palms. Gently press into cleansed face, neck, and décolletage every evening following your water-based mist.',
    specs: [
      { label: 'Key Ingredient', value: '2% Cold-Pressed Bakuchiol & Rosehip' },
      { label: 'Volume', value: '30ml / 1.0 fl. oz. Miron Glass Dropper' },
      { label: 'Formulation', value: '100% Waterless, Vegan & Fragrance-Free' },
      { label: 'Certification', value: 'Leaping Bunny Cruelty-Free & Ecocert' }
    ],
    createdAt: '2026-09-01T08:00:00Z'
  },
  {
    id: 'lumiere-02',
    name: 'Celestial Dew Multi-Hyaluronic Plumping Crème',
    tagline: 'Deep 72-hour moisture cushion infused with snow mushroom and ceramides',
    description: 'A cloud-soft moisturizing emulsion engineered with 5 molecular weights of hyaluronic acid, Tremella snow mushroom extract, and 3 skin-identical plant ceramides. Rebuilds the lipid barrier, drenching parched skin in dewy weightless comfort.',
    price: 64,
    comparePrice: 75,
    category: 'Moisturizers & Creams',
    images: [
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1000&q=80'
    ],
    stock: 18,
    sku: 'LUM-CRM-02',
    status: 'active',
    badge: 'award',
    rating: 4.9,
    reviewsCount: 98,
    featured: true,
    volume: '50ml / 1.7 fl oz',
    skinType: 'Dry, Dehydrated, Normal & Compromised Skin Barriers',
    keyActives: ['5D Hyaluronic Multi-Complex', 'Tremella Fuciformis Extract', 'Ceramide NP, AP, EOP'],
    howToUse: 'Smooth a dime-sized amount over face and neck morning and night after serums. Gently massage upward toward hairline.',
    specs: [
      { label: 'Texture', value: 'Whipped Velvety Gel-Cream' },
      { label: 'Hydration Clinicals', value: '+140% Instant Moisture Increase' },
      { label: 'Packaging', value: 'Refillable Frosted Glass Jar' },
      { label: 'Origin', value: 'Formulated in Provence, France' }
    ],
    createdAt: '2026-09-03T10:00:00Z'
  },
  {
    id: 'lumiere-03',
    name: 'Velvet Chamomile & Marula Melt Cleansing Balm',
    tagline: 'Silky oil-to-milk balm that melts stubborn SPF and waterproof makeup',
    description: 'Transformative melting balm that dissolves waterproof cosmetics, airborne particulates, and excess sebum without stripping the delicate acid mantle. Infused with soothing blue chamomile, cold-pressed marula oil, and calendula blossoms.',
    price: 46,
    comparePrice: 54,
    category: 'Cleansers & Balms',
    images: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1000&q=80'
    ],
    stock: 25,
    sku: 'LUM-CLN-03',
    status: 'active',
    badge: 'bestseller',
    rating: 4.88,
    reviewsCount: 86,
    featured: false,
    volume: '100ml / 3.4 fl oz',
    skinType: 'All Skin Types including Reactive & Rosacea-Prone',
    keyActives: ['German Blue Chamomile', 'Virgin Marula Kernel Oil', 'Bisabolol'],
    howToUse: 'Scoop a hazelnut amount onto dry hands. Massage across dry skin in circular motions. Add warm water to emulsify into a milky rinse and wipe clean.',
    specs: [
      { label: 'Scent Profile', value: 'Natural Blue Tansy & Sweet Chamomile' },
      { label: 'Eye Safety', value: 'Ophthalmologist Tested, Safe for Contacts' },
      { label: 'Includes', value: 'Complimentary Bamboo Spatula' }
    ],
    createdAt: '2026-09-04T12:00:00Z'
  },
  {
    id: 'lumiere-04',
    name: 'Golden Camellia & Maracuja Illuminating Nectar',
    tagline: 'Ultralight botanical dry oil for an ethereal glass-skin luminosity',
    description: 'A luxurious blend of Japanese Tsubaki camellia seed oil, wild Amazonian passionfruit seed oil, and botanical squalane. Delivers instant radiant glow without grease, locking in essential hydration and protecting against oxidative stressors.',
    price: 72,
    comparePrice: 85,
    category: 'Facial Oils & Glow',
    images: [
      'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=1000&q=80'
    ],
    stock: 14,
    sku: 'LUM-OIL-04',
    status: 'active',
    badge: 'new',
    rating: 4.92,
    reviewsCount: 64,
    featured: true,
    volume: '30ml / 1.0 fl oz',
    skinType: 'Dull, Dry, Normal, and Tired Complexions',
    keyActives: ['Japanese Camellia Japonica Oil', 'Maracuja Fruit Seed Oil', 'Vitamin E Complex'],
    howToUse: 'Press 2 to 3 drops onto high points of cheekbones as final skincare step, or mix one drop into foundation for a luminous dewy finish.',
    specs: [
      { label: 'Finish', value: 'Weightless Dry-Touch Glow' },
      { label: 'Absorption', value: 'Under 60 Seconds, Zero Greasy Residue' },
      { label: 'Purity', value: '100% Pure Cold-Pressed Seed Oils' }
    ],
    createdAt: '2026-09-05T14:30:00Z'
  },
  {
    id: 'lumiere-05',
    name: 'Silk Radiance Mineral Veil SPF 50+ PA++++',
    tagline: 'Invisible 100% zinc oxide broad spectrum shield with peptide tint',
    description: 'Non-nano zinc oxide physical sunscreen suspended in hydrating silk peptides and green tea polyphenols. Melts transparently on all skin tones with zero chalky white cast, blue light protection, and a satin skin finish.',
    price: 48,
    comparePrice: 58,
    category: 'Sun Care & SPF',
    images: [
      'https://images.unsplash.com/photo-1556228722-d9b3be373b9e?auto=format&fit=crop&w=1000&q=80'
    ],
    stock: 30,
    sku: 'LUM-SPF-05',
    status: 'active',
    badge: 'bestseller',
    rating: 4.96,
    reviewsCount: 210,
    featured: true,
    volume: '50ml / 1.7 fl oz',
    skinType: 'Everyday Daily Protection for All Skin Tones',
    keyActives: ['21% Non-Nano Micronized Zinc Oxide', 'Ectoin 1%', 'Matcha Green Tea Extract'],
    howToUse: 'Apply generously (two full finger lengths) to face, neck, and ears 15 minutes before sun exposure. Reapply every 2 hours or after swimming.',
    specs: [
      { label: 'UVA/UVB Rating', value: 'Broad Spectrum SPF 50+ / PA++++' },
      { label: 'Reef Safe', value: 'Compliant with Hawaii & Virgin Islands Eco-Standards' },
      { label: 'White Cast', value: '100% Invisible Universal Adaptive Finish' }
    ],
    createdAt: '2026-09-06T09:00:00Z'
  },
  {
    id: 'lumiere-06',
    name: 'Bio-Peptide & Caffeine Awakening Eye Sculptor',
    tagline: 'Targeted cooling gel that visibly diminishes dark circles and puffy under-eyes',
    description: 'Clinical botanical eye concentrate formulated with green tea caffeine, hexapeptide-8, and marine algae polysaccharides. De-puffs within 10 minutes while firming the delicate orbital area and smoothing expression lines.',
    price: 52,
    comparePrice: 62,
    category: 'Eye & Lip Care',
    images: [
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=1000&q=80'
    ],
    stock: 19,
    sku: 'LUM-EYE-06',
    status: 'active',
    badge: 'clean',
    rating: 4.87,
    reviewsCount: 77,
    featured: false,
    volume: '15ml / 0.5 fl oz',
    skinType: 'Fatigued Eyes, Dark Circles & Expression Fine Lines',
    keyActives: ['3% Active Caffeine', 'Palmitoyl Tripeptide-5', 'Niacinamide'],
    howToUse: 'Tap half a pump along orbital bone using your ring finger, sweeping outward from inner corner toward temples. Use AM and PM.',
    specs: [
      { label: 'Applicator', value: 'Aesthetic Hygienic Airless Pump' },
      { label: 'Clinical Result', value: '88% reported visible depuffing in 14 days' },
      { label: 'Safety', value: 'Fragrance-Free & Dermatologist Evaluated' }
    ],
    createdAt: '2026-09-07T11:00:00Z'
  },
  {
    id: 'lumiere-07',
    name: 'Rose Damascena Hydro-Bloom Balancing Essence',
    tagline: 'Distilled Bulgarian rose water micro-mist with fermented prebiotic lysate',
    description: 'Hand-harvested organic rose petals steam-distilled at dawn to capture pure botanical essences. Enriched with fermented Galactomyces and prebiotic inulin to rebalance the skin microbiome and prep the stratum corneum for maximum serum absorption.',
    price: 38,
    comparePrice: 45,
    category: 'Cleansers & Balms',
    images: [
      'https://images.unsplash.com/photo-1608248597359-216a67f00696?auto=format&fit=crop&w=1000&q=80'
    ],
    stock: 28,
    sku: 'LUM-MST-07',
    status: 'active',
    badge: 'clean',
    rating: 4.82,
    reviewsCount: 53,
    featured: false,
    volume: '120ml / 4.0 fl oz',
    skinType: 'All Complexions, Especially Stressed & Screen-Fatigued Skin',
    keyActives: ['Pure Organic Rose Hydrosol', 'Prebiotic Inulin', 'Centella Asiatica'],
    howToUse: 'Mist liberally over face post-cleanse, or spritz throughout the day over makeup to re-hydrate and revive complexion radiance.',
    specs: [
      { label: 'Nozzle Type', value: 'Ultra-Fine Cloud Micro-Atomizer' },
      { label: 'Alcohol Content', value: '0.00% Pure Waterless Hydrosol Base' }
    ],
    createdAt: '2026-09-08T16:00:00Z'
  },
  {
    id: 'lumiere-08',
    name: 'Wild Acacia Honey & Peony Nourishing Lip Butter',
    tagline: 'Velvety peptide restorative lip mask that restores volume and supple smoothness',
    description: 'Intensive lip treatment whipped with raw acacia honey, French peony extract, and shea nilotica. Eradicates dry flakes overnight and seals lips in cushiony hydration with a delicate rose-gold sheer shimmer.',
    price: 28,
    comparePrice: 34,
    category: 'Eye & Lip Care',
    images: [
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1000&q=80'
    ],
    stock: 35,
    sku: 'LUM-LIP-08',
    status: 'active',
    badge: 'bestseller',
    rating: 4.94,
    reviewsCount: 165,
    featured: true,
    volume: '15g / 0.5 oz',
    skinType: 'Chapped, Dry, or Dehydrated Lips',
    keyActives: ['Bioactive Acacia Honey', 'Tripeptide-1', 'Shea Nilotica Butter'],
    howToUse: 'Coat lips generously before sleep for an overnight plumping cocoon, or wear lightly during the day as a cushiony lip gloss.',
    specs: [
      { label: 'Finish', value: 'Non-Sticky Sheer Glass Luster' },
      { label: 'Flavor', value: 'Naturally Flavored with Wild Honey and Vanilla' }
    ],
    createdAt: '2026-09-09T13:00:00Z'
  },
  {
    id: 'lumiere-09',
    name: 'Niacinamide 12% + Zinc PCA Pore Refining Drops',
    tagline: 'Potent clarity booster that balances oil production and minimizes pores',
    description: 'High-strength clinical serum concentrated with 12% purified vitamin B3 (Niacinamide) and 1% Zinc PCA. Clarifies congestion, minimizes the appearance of enlarged pores, and calms redness without over-drying.',
    price: 54,
    comparePrice: 65,
    category: 'Serums & Elixirs',
    images: [
      'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=1000&q=80'
    ],
    stock: 12,
    sku: 'LUM-SER-09',
    status: 'active',
    badge: 'clean',
    rating: 4.89,
    reviewsCount: 92,
    featured: false,
    volume: '30ml / 1.0 fl oz',
    skinType: 'Combination, Oily, Blemish-Prone & Texture-Prone Skin',
    keyActives: ['12% Niacinamide', '1% Zinc PCA', 'Willow Bark BHA'],
    howToUse: 'Dispense 3-4 drops onto palms and press gently into cleansed skin morning and night prior to heavy oils or creams.',
    specs: [
      { label: 'pH Balance', value: 'Optimal Skin Physiological pH 5.5' },
      { label: 'Pore Reduction', value: '-32% apparent pore visibility in 21 days' }
    ],
    createdAt: '2026-09-10T09:30:00Z'
  },
  {
    id: 'lumiere-10',
    name: 'Ceramide Barrier Recovery Overnight Soufflé',
    tagline: 'Intensive restorative sleeping cream to repair damaged moisture barriers',
    description: 'A decadent nightly repair balm infused with oat beta-glucan, colloidal oatmeal, and multi-ceramides. Forms a protective breathable cocoon over sensitized skin, awakening you to calmer, plumper, resilient skin.',
    price: 68,
    comparePrice: 80,
    category: 'Moisturizers & Creams',
    images: [
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1000&q=80'
    ],
    stock: 8,
    sku: 'LUM-CRM-10',
    status: 'active',
    badge: 'sale',
    rating: 4.93,
    reviewsCount: 118,
    featured: true,
    volume: '50ml / 1.7 fl oz',
    skinType: 'Over-Exfoliated, Sensitized, or Winter-Dry Skin',
    keyActives: ['Bio-Identical Ceramide Complex', 'Oat Beta-Glucan', 'Allantoin'],
    howToUse: 'Warm between fingertips and gently press into skin as the final step in your evening routine. Let absorb for 5 minutes before sleeping.',
    specs: [
      { label: 'Texture', value: 'Rich Cushioning Soufflé' },
      { label: 'Dermatology Panel', value: 'Zero Sensitization in 100% of Subjects' }
    ],
    createdAt: '2026-09-11T15:00:00Z'
  },
  {
    id: 'lumiere-11',
    name: 'Brazilian Amethyst Radiance Sculpting Tool',
    tagline: 'Hand-carved natural Brazilian amethyst stone to promote lymphatic drainage',
    description: 'Ethically sourced genuine amethyst crystal hand-polished to contour the jawline, relieve facial tension, and enhance product absorption. Naturally cool to the touch to stimulate microcirculation and firm facial contours.',
    price: 36,
    comparePrice: 42,
    category: 'Facial Oils & Glow',
    images: [
      'https://images.unsplash.com/photo-1512290900672-1f41d0637172?auto=format&fit=crop&w=1000&q=80'
    ],
    stock: 16,
    sku: 'LUM-ACC-11',
    status: 'active',
    badge: 'new',
    rating: 4.88,
    reviewsCount: 45,
    featured: false,
    volume: '1 Precision Gua Sha Tool',
    skinType: 'All Skin Types for Facial Massage & Lymphatic Drainage',
    keyActives: ['100% Genuine Natural Amethyst Stone'],
    howToUse: 'After applying facial oil, glide the curved edge gently upward along neck, jawline, and cheekbones using light outward strokes.',
    specs: [
      { label: 'Material', value: 'Grade-A Natural Untreated Brazilian Amethyst' },
      { label: 'Includes', value: 'Storage Pouch & Step-by-Step Massage Guide' }
    ],
    createdAt: '2026-09-12T10:00:00Z'
  },
  {
    id: 'lumiere-12',
    name: 'French Pink Clay & Hibiscus Detox Mask',
    tagline: 'Purifying gentle clay treatment that unplugs pores without dehydrating',
    description: 'Sourced from the sun-drenched hills of Provence, French pink montmorillonite clay gently pulls impurities and micro-pollutants while hibiscus flower AHA gently brightens skin tone and revives cellular vitality.',
    price: 44,
    comparePrice: 50,
    category: 'Cleansers & Balms',
    images: [
      'https://images.unsplash.com/photo-1567928815104-b7980ee5032e?auto=format&fit=crop&w=1000&q=80'
    ],
    stock: 21,
    sku: 'LUM-MSK-12',
    status: 'active',
    badge: 'clean',
    rating: 4.86,
    reviewsCount: 68,
    featured: false,
    volume: '80g / 2.8 oz',
    skinType: 'Congested, Dull, or Environmental Stressed Skin',
    keyActives: ['French Pink Montmorillonite', 'Hibiscus AHA Flowers', 'Rose Petal Powder'],
    howToUse: 'Apply an even layer over face avoiding eye contour. Leave for 10 minutes until almost dry. Rinse with lukewarm water and a soft washcloth.',
    specs: [
      { label: 'Frequency', value: 'Use 1 to 2 times weekly' },
      { label: 'Clay Quality', value: '100% Sun-Dried French Clay' }
    ],
    createdAt: '2026-09-13T11:00:00Z'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-beauty-101',
    orderNumber: 'AYE-94821',
    createdAt: '2026-09-17T14:20:00Z',
    userId: 'usr-ayesha-01',
    trackingNumber: 'AYE-88291-US',
    items: [
      {
        productId: 'lumiere-01',
        name: 'Rosehip & Phyto-Retinol Bakuchiol Elixir',
        price: 78,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1000&q=80'
      },
      {
        productId: 'lumiere-08',
        name: 'Wild Acacia Honey & Peony Nourishing Lip Butter',
        price: 28,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1000&q=80'
      }
    ],
    customer: {
      fullName: 'Ayesha Khan',
      email: 'ayesha@ayeshabeauty.com',
      phone: '+1 (555) 234-5678',
      address: '742 Evergreen Terrace',
      city: 'Beverly Hills',
      postalCode: '90210'
    },
    subtotal: 106,
    shipping: 0,
    discount: 15.9,
    total: 90.1,
    status: 'processing',
    paymentMethod: 'Apple Pay',
    notes: 'Gift wrapping requested with personalized botanical card.'
  },
  {
    id: 'ord-beauty-102',
    orderNumber: 'AYE-94820',
    createdAt: '2026-09-10T18:45:00Z',
    userId: 'usr-ayesha-01',
    trackingNumber: 'AYE-77310-US',
    items: [
      {
        productId: 'lumiere-02',
        name: 'Celestial Dew Multi-Hyaluronic Plumping Crème',
        price: 64,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=1000&q=80'
      },
      {
        productId: 'lumiere-05',
        name: 'Silk Radiance Mineral Veil SPF 50+ PA++++',
        price: 48,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1556228722-d9b3be373b9e?auto=format&fit=crop&w=1000&q=80'
      }
    ],
    customer: {
      fullName: 'Ayesha Khan',
      email: 'ayesha@ayeshabeauty.com',
      phone: '+1 (555) 234-5678',
      address: '742 Evergreen Terrace',
      city: 'Beverly Hills',
      postalCode: '90210'
    },
    subtotal: 112,
    shipping: 0,
    discount: 0,
    total: 112,
    status: 'delivered',
    paymentMethod: 'Credit Card (Visa)',
    notes: 'Leave at front porch.'
  },
  {
    id: 'ord-beauty-103',
    orderNumber: 'LUM-94819',
    createdAt: '2026-09-15T09:12:00Z',
    items: [
      {
        productId: 'lumiere-04',
        name: 'Golden Camellia & Maracuja Illuminating Nectar',
        price: 72,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=1000&q=80'
      }
    ],
    customer: {
      fullName: 'Clara Kensington',
      email: 'clara.k@kensington-design.co.uk',
      phone: '+44 20 7946 0912',
      address: '22 Cheyne Walk, Chelsea',
      city: 'London',
      postalCode: 'SW3 5HH'
    },
    subtotal: 72,
    shipping: 0,
    discount: 7.2,
    total: 64.8,
    status: 'delivered',
    paymentMethod: 'PayPal',
    notes: 'Standard eco packaging.'
  }
];
