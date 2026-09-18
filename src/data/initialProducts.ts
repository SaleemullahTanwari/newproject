import { Product, Order } from '../types';

export const CATEGORIES = [
  'All',
  'Electronics',
  'Home & Living',
  'Apparel',
  'Accessories',
  'Workspace'
] as const;

export const PRESET_IMAGES = [
  {
    name: 'Wireless Studio Headphones',
    category: 'Electronics',
    url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80'
  },
  {
    name: 'Mechanical Keychron Keyboard',
    category: 'Workspace',
    url: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1000&q=80'
  },
  {
    name: 'Minimalist Ceramic Mug',
    category: 'Home & Living',
    url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=80'
  },
  {
    name: 'Classic Chronograph Watch',
    category: 'Accessories',
    url: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1000&q=80'
  },
  {
    name: 'Matte Black Desk Lamp',
    category: 'Workspace',
    url: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=80'
  },
  {
    name: 'Organic Cotton Overshirt',
    category: 'Apparel',
    url: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1000&q=80'
  },
  {
    name: 'Handcrafted Leather Cardholder',
    category: 'Accessories',
    url: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=1000&q=80'
  },
  {
    name: 'Insulated Thermal Flask',
    category: 'Home & Living',
    url: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=1000&q=80'
  },
  {
    name: 'Noise Cancelling Earbuds',
    category: 'Electronics',
    url: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=1000&q=80'
  },
  {
    name: 'Ergonomic Merino Wool Beanie',
    category: 'Apparel',
    url: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=1000&q=80'
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Aura ANC Wireless Headphones',
    tagline: 'Precision engineered acoustic engineering with adaptive noise cancelling',
    description: 'Immerse yourself in studio-grade audio fidelity. Built with custom 40mm beryllium drivers, 38-hour battery reserve, plush memory foam ear cushions, and seamless multi-device Bluetooth 5.3 switching.',
    price: 289,
    comparePrice: 349,
    category: 'Electronics',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=1000&q=80'
    ],
    stock: 14,
    sku: 'AUR-HP-01',
    status: 'active',
    badge: 'bestseller',
    rating: 4.9,
    reviewsCount: 128,
    featured: true,
    specs: [
      { label: 'Battery Life', value: '38 hours playback' },
      { label: 'Connectivity', value: 'Bluetooth 5.3 & 3.5mm Aux' },
      { label: 'Weight', value: '254g' },
      { label: 'Warranty', value: '2 Years Manufacturer' }
    ],
    createdAt: '2026-09-01T08:00:00Z'
  },
  {
    id: 'prod-2',
    name: 'Tactile Mechanical Desk Keyboard',
    tagline: 'Custom tuned Gateron switches housed in CNC milled anodized aluminum',
    description: 'Designed for effortless typing stamina and tactile precision. Includes dye-sub PBT keycaps, hot-swappable PCB, acoustic silicone dampening, and programmable Mac/Windows hotkeys.',
    price: 165,
    comparePrice: 195,
    category: 'Workspace',
    images: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=1000&q=80'
    ],
    stock: 8,
    sku: 'TAC-KB-75',
    status: 'active',
    badge: 'sale',
    rating: 4.8,
    reviewsCount: 84,
    featured: true,
    specs: [
      { label: 'Layout', value: '75% Compact (84 keys)' },
      { label: 'Switches', value: 'Pre-lubed Gateron Pro Yellow' },
      { label: 'Connection', value: 'USB-C Detachable Braided' },
      { label: 'Chassis', value: 'CNC 6063 Aluminum' }
    ],
    createdAt: '2026-09-03T10:15:00Z'
  },
  {
    id: 'prod-3',
    name: 'Artisan Ceramic Pour-Over Dripper',
    tagline: 'Hand-thrown stoneware designed for uniform thermal extraction',
    description: 'Elevate your morning brew routine. Each piece is hand-glazed in small batches in Mino, Japan. Features internal spiraled ribs that optimize water flow rate and blooming contact time.',
    price: 48,
    category: 'Home & Living',
    images: [
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=1000&q=80'
    ],
    stock: 22,
    sku: 'DRP-CRM-03',
    status: 'active',
    badge: 'new',
    rating: 4.9,
    reviewsCount: 42,
    featured: false,
    specs: [
      { label: 'Material', value: 'High-fire ceramic stoneware' },
      { label: 'Capacity', value: '1-4 Cups (Filter size 02)' },
      { label: 'Dishwasher Safe', value: 'Yes' },
      { label: 'Origin', value: 'Gifu, Japan' }
    ],
    createdAt: '2026-09-05T12:00:00Z'
  },
  {
    id: 'prod-4',
    name: 'Monochrome Bauhaus Chronometer',
    tagline: 'Minimalist 38mm dial with Japanese automatic movement',
    description: 'A study in quiet restraint. Clean sapphire crystal with anti-reflective coating, surgical-grade 316L stainless casing, and an Italian vegetable-tanned calfskin quick-release band.',
    price: 340,
    comparePrice: 390,
    category: 'Accessories',
    images: [
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&q=80'
    ],
    stock: 4,
    sku: 'WAT-CHR-08',
    status: 'active',
    badge: 'limited',
    rating: 5.0,
    reviewsCount: 19,
    featured: true,
    specs: [
      { label: 'Case Diameter', value: '38mm' },
      { label: 'Movement', value: 'Miyota 9015 Automatic' },
      { label: 'Glass', value: 'Domed Sapphire Crystal' },
      { label: 'Water Resistance', value: '5 ATM (50 meters)' }
    ],
    createdAt: '2026-09-07T09:30:00Z'
  },
  {
    id: 'prod-5',
    name: 'Architectural LED Task Lamp',
    tagline: 'Continuous touch-dimming with 98+ CRI true-spectrum daylight illumination',
    description: 'Engineered for late-night focus sessions. Casts wide, even glare-free light across your workspace. Counter-balanced cantilever arm adjusts smoothly to any angle without squeaks or drift.',
    price: 195,
    category: 'Workspace',
    images: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=80'
    ],
    stock: 11,
    sku: 'LMP-ARC-12',
    status: 'active',
    rating: 4.7,
    reviewsCount: 31,
    specs: [
      { label: 'Brightness', value: '1100 Lumens variable' },
      { label: 'Color Temp', value: '2700K - 5000K tunable' },
      { label: 'Power', value: 'USB-C PD 24W' },
      { label: 'Lifespan', value: '50,000+ hours' }
    ],
    createdAt: '2026-09-09T14:20:00Z'
  },
  {
    id: 'prod-6',
    name: 'Raw Linen Utility Overshirt',
    tagline: 'Heavyweight washed Belgian linen with double-needle reinforcement',
    description: 'The definitive all-season layer. Breathable during warm days, structured enough to layer over knits in the cooler months. Finished with horn buttons and dual chest utility pockets.',
    price: 135,
    category: 'Apparel',
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1000&q=80'
    ],
    stock: 19,
    sku: 'APP-LIN-22',
    status: 'active',
    rating: 4.6,
    reviewsCount: 57,
    specs: [
      { label: 'Material', value: '100% Belgian flax linen (260gsm)' },
      { label: 'Fit', value: 'Relaxed modern box cut' },
      { label: 'Care', value: 'Machine wash cold, air dry' }
    ],
    createdAt: '2026-09-10T11:00:00Z'
  },
  {
    id: 'prod-7',
    name: 'Bifold Barenia Leather Wallet',
    tagline: 'Slimline silhouette that patinas beautifully with daily carry',
    description: 'Holds up to 10 cards and folded bills without bulk. Crafted from vegetable-tanned French Barenia leather that develops an amber sheen unique to your lifestyle over time.',
    price: 75,
    comparePrice: 90,
    category: 'Accessories',
    images: [
      'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=1000&q=80'
    ],
    stock: 3,
    sku: 'ACC-WLT-05',
    status: 'active',
    badge: 'sale',
    rating: 4.9,
    reviewsCount: 63,
    specs: [
      { label: 'Dimensions', value: '10.2cm x 7.6cm x 0.8cm' },
      { label: 'Leather', value: 'Full-Grain French Calfskin' },
      { label: 'RFID Protection', value: 'Integrated lining' }
    ],
    createdAt: '2026-09-11T16:40:00Z'
  },
  {
    id: 'prod-8',
    name: 'Vacuum Insulated Steel Tumbler',
    tagline: 'Triple-wall copper lining keeps contents cold for 24 hours or hot for 12',
    description: 'Ergonomic matte powder coat grip with leakproof magnetic cap. Fits standard automobile cup holders and features an electro-polished interior that never retains coffee or tea odors.',
    price: 38,
    category: 'Home & Living',
    images: [
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=1000&q=80'
    ],
    stock: 25,
    sku: 'HME-TMB-18',
    status: 'active',
    badge: 'new',
    rating: 4.8,
    reviewsCount: 78,
    specs: [
      { label: 'Volume', value: '550ml / 18.6 oz' },
      { label: 'Material', value: '18/8 Food-Grade Stainless Steel' },
      { label: 'BPA Free', value: '100% certified' }
    ],
    createdAt: '2026-09-12T13:00:00Z'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-1001',
    orderNumber: 'ORD-84920',
    createdAt: '2026-09-17T15:20:00Z',
    items: [
      {
        productId: 'prod-1',
        name: 'Aura ANC Wireless Headphones',
        price: 289,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80'
      },
      {
        productId: 'prod-8',
        name: 'Vacuum Insulated Steel Tumbler',
        price: 38,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=1000&q=80'
      }
    ],
    customer: {
      fullName: 'Elena Rostova',
      email: 'elena.rostova@example.com',
      phone: '+1 (555) 234-8910',
      address: '742 Evergreen Terrace',
      city: 'Seattle',
      postalCode: '98101'
    },
    subtotal: 327,
    shipping: 0,
    discount: 0,
    total: 327,
    status: 'processing',
    paymentMethod: 'Credit Card (Stripe)'
  },
  {
    id: 'ord-1002',
    orderNumber: 'ORD-84921',
    createdAt: '2026-09-16T09:12:00Z',
    items: [
      {
        productId: 'prod-2',
        name: 'Tactile Mechanical Desk Keyboard',
        price: 165,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1000&q=80'
      }
    ],
    customer: {
      fullName: 'Marcus Vance',
      email: 'marcus.v@example.com',
      phone: '+1 (555) 892-1200',
      address: '120 Market St, Apt 4B',
      city: 'San Francisco',
      postalCode: '94105'
    },
    subtotal: 165,
    shipping: 10,
    discount: 15,
    total: 160,
    status: 'shipped',
    paymentMethod: 'Apple Pay'
  },
  {
    id: 'ord-1003',
    orderNumber: 'ORD-84922',
    createdAt: '2026-09-15T18:45:00Z',
    items: [
      {
        productId: 'prod-4',
        name: 'Monochrome Bauhaus Chronometer',
        price: 340,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1000&q=80'
      }
    ],
    customer: {
      fullName: 'Sophia Lin',
      email: 'sophia.lin@example.com',
      phone: '+1 (555) 349-0012',
      address: '450 West End Ave',
      city: 'New York',
      postalCode: '10024'
    },
    subtotal: 340,
    shipping: 0,
    discount: 0,
    total: 340,
    status: 'delivered',
    paymentMethod: 'Credit Card (Visa)'
  }
];
