const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Read .env.local file to get MONGODB_URI
const envPath = path.join(__dirname, '../.env.local');
let mongodbUri = '';

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const match = envContent.match(/^MONGODB_URI=(.*)$/m);
  if (match && match[1]) {
    mongodbUri = match[1].trim().replace(/['"]/g, '');
  }
}

if (!mongodbUri) {
  mongodbUri = 'mongodb+srv://mayamoybuilders:xI2QuBaFZsYQ5vRD@cluster0.e5n1hnl.mongodb.net/mayamoybuilders';
}

console.log('Connecting to MongoDB...');

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, unique: true },
});
const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  salePrice: { type: Number },
  purchasePrice: { type: Number },
  discountRate: { type: Number },
  sku: { type: String, required: true, unique: true },
  stock: { type: Number, required: true, default: 0 },
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
  tags: [{ type: String }],
  images: [{ type: String }],
  attributes: [
    {
      key: { type: String },
      value: { type: String },
    },
  ],
  isFeatured: { type: Boolean, default: false },
  isNewArrival: { type: Boolean, default: false },
  isFlashSale: { type: Boolean, default: false },
  isPublished: { type: Boolean, default: true },
  ratings: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  totalSales: { type: Number, default: 0 },
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

const productsData = [
  // ==================== Category 1: Thai Aluminum & Profiles ====================
  {
    name: 'Kai Sliding Frame Profile (Dark Grey)',
    slug: 'kai-sliding-frame-profile-dark-grey',
    description: 'Premium quality dark grey anodized aluminum sliding window frame profile. Durable, scratch-resistant, and perfect for modern residential and commercial installations.',
    price: 1200,
    purchasePrice: 800,
    stock: 150,
    sku: 'MB-ALP-KSF01',
    categorySlug: 'thai-aluminum-profiles',
    images: ['/assets/images/products/kai-sliding-frame-profile-dark-grey.webp'],
    tags: ['aluminum', 'sliding frame', 'kai', 'thai aluminum'],
    attributes: [{ key: 'Color', value: 'Dark Grey' }, { key: 'Material', value: 'Anodized Aluminum' }],
    isFeatured: true,
    isNewArrival: true,
    isFlashSale: false
  },
  {
    name: 'Sliding Window Top & Bottom Track (Bronze)',
    slug: 'sliding-window-top-bottom-track-bronze',
    description: 'Heavy-duty bronze anodized aluminum top and bottom track set. Engineered for smooth sliding window operations with minimal friction.',
    price: 1500,
    salePrice: 1200,
    discountRate: 20,
    purchasePrice: 900,
    stock: 120,
    sku: 'MB-ALP-SWT02',
    categorySlug: 'thai-aluminum-profiles',
    images: ['/assets/images/products/sliding-window-top-bottom-track-bronze.webp'],
    tags: ['track', 'sliding window', 'bronze', 'profiles'],
    attributes: [{ key: 'Finish', value: 'Bronze Anodized' }, { key: 'Length', value: '20 Feet' }],
    isFeatured: false,
    isNewArrival: true,
    isFlashSale: true
  },
  {
    name: 'Aluminum Partition H-Section (Silver)',
    slug: 'aluminum-partition-h-section-silver',
    description: 'Bright silver finish extruded aluminum H-section profile. Ideal for office partition systems, offering strong support and structural alignment.',
    price: 950,
    salePrice: 800,
    discountRate: 16,
    purchasePrice: 600,
    stock: 200,
    sku: 'MB-ALP-APH03',
    categorySlug: 'thai-aluminum-profiles',
    images: ['/assets/images/products/aluminum-partition-h-section-silver.webp'],
    tags: ['h-section', 'partition', 'silver', 'office'],
    attributes: [{ key: 'Color', value: 'Silver' }, { key: 'Length', value: '15 Feet' }],
    isFeatured: true,
    isNewArrival: false,
    isFlashSale: true
  },
  {
    name: 'Casement Window Frame Section (White)',
    slug: 'casement-window-frame-section-white',
    description: 'Pristine white powder-coated aluminum casement window frame profile. Offers excellent weatherproofing and modern minimalist styling.',
    price: 1800,
    purchasePrice: 1200,
    stock: 80,
    sku: 'MB-ALP-CWF04',
    categorySlug: 'thai-aluminum-profiles',
    images: ['/assets/images/products/casement-window-frame-section-white.webp'],
    tags: ['casement', 'white', 'window section', 'frame'],
    attributes: [{ key: 'Color', value: 'White' }, { key: 'Coating', value: 'Powder Coated' }],
    isFeatured: true,
    isNewArrival: false,
    isFlashSale: false
  },
  {
    name: 'Heavy-Duty Swing Door Aluminum Section (Anodized Black)',
    slug: 'heavy-duty-swing-door-aluminum-section-anodized-black',
    description: 'Strong anodized matte black aluminum section designed specifically for commercial swing door installations. Highly resistant to high-traffic wear.',
    price: 2400,
    salePrice: 1999,
    discountRate: 17,
    purchasePrice: 1500,
    stock: 60,
    sku: 'MB-ALP-SDA05',
    categorySlug: 'thai-aluminum-profiles',
    images: ['/assets/images/products/heavy-duty-swing-door-aluminum-section-anodized-black.webp'],
    tags: ['swing door', 'black', 'heavy duty', 'profiles'],
    attributes: [{ key: 'Finish', value: 'Anodized Black' }, { key: 'Application', value: 'Doors' }],
    isFeatured: false,
    isNewArrival: true,
    isFlashSale: false
  },

  // ==================== Category 2: Glass & Glazing Accessories ====================
  {
    name: 'Toyo Super Glass Cutter (Gold Finish)',
    slug: 'toyo-super-glass-cutter-gold-finish',
    description: 'Genuine Toyo glass cutter tool with a gold finish and integrated oil reservoir. Delivers precise score lines on clear and frosted glass with ease.',
    price: 850,
    purchasePrice: 500,
    stock: 90,
    sku: 'MB-GGA-TGC06',
    categorySlug: 'glass-glazing-accessories',
    images: ['/assets/images/products/toyo-super-glass-cutter-gold-finish.webp'],
    tags: ['glass cutter', 'toyo', 'hand tools', 'glazing'],
    attributes: [{ key: 'Brand', value: 'Toyo' }, { key: 'Handle', value: 'Metallic Gold' }],
    isFeatured: true,
    isNewArrival: true,
    isFlashSale: false
  },
  {
    name: 'Dual-Cup Heavy Duty Glass Suction Lifter',
    slug: 'dual-cup-heavy-duty-glass-suction-lifter',
    description: 'Premium orange dual-cup aluminum glass suction cup lifter. Capable of lifting and moving large panes of glass safely up to 100kg.',
    price: 1650,
    salePrice: 1399,
    discountRate: 15,
    purchasePrice: 1000,
    stock: 50,
    sku: 'MB-GGA-DSL07',
    categorySlug: 'glass-glazing-accessories',
    images: ['/assets/images/products/dual-cup-heavy-duty-glass-suction-lifter.webp'],
    tags: ['suction cup', 'glass lifter', 'heavy duty', 'safety tools'],
    attributes: [{ key: 'Capacity', value: '100 kg' }, { key: 'Cups', value: 'Double Cup' }],
    isFeatured: false,
    isNewArrival: true,
    isFlashSale: true
  },
  {
    name: 'Clear Silicone Sealant (OCI Clear Silicone)',
    slug: 'clear-silicone-sealant-oci-clear-silicone',
    description: 'High-performance OCI clear silicone sealant cartridge. Offers outstanding adhesion to glass, aluminum, and glazed surfaces, providing 100% waterproof seals.',
    price: 280,
    salePrice: 220,
    discountRate: 21,
    purchasePrice: 160,
    stock: 350,
    sku: 'MB-GGA-CSS08',
    categorySlug: 'glass-glazing-accessories',
    images: ['/assets/images/products/clear-silicone-sealant-oci-clear-silicone.webp'],
    tags: ['silicone', 'sealant', 'clear', 'waterproof'],
    attributes: [{ key: 'Volume', value: '300ml' }, { key: 'Color', value: 'Transparent' }],
    isFeatured: true,
    isNewArrival: false,
    isFlashSale: true
  },
  {
    name: 'Window Glazing Rubber Gasket (Black, 100m Roll)',
    slug: 'window-glazing-rubber-gasket-black-100m-roll',
    description: 'Premium black EPDM rubber glazing gasket profile. Essential for securing glass panels inside aluminum window frame tracks.',
    price: 1100,
    purchasePrice: 700,
    stock: 75,
    sku: 'MB-GGA-WRG09',
    categorySlug: 'glass-glazing-accessories',
    images: ['/assets/images/products/window-glazing-rubber-gasket-black-100m-roll.webp'],
    tags: ['rubber gasket', 'glazing', 'gasket roll', 'accessories'],
    attributes: [{ key: 'Length', value: '100 Meters' }, { key: 'Material', value: 'EPDM Rubber' }],
    isFeatured: true,
    isNewArrival: false,
    isFlashSale: false
  },
  {
    name: 'Glass Corner Protector Clamps (Stainless Steel)',
    slug: 'glass-corner-protector-clamps-stainless-steel',
    description: 'Polished stainless steel corner clamps designed to protect glass table corners or partition glass edges from chipping and impact.',
    price: 450,
    salePrice: 380,
    discountRate: 16,
    purchasePrice: 250,
    stock: 180,
    sku: 'MB-GGA-GCP10',
    categorySlug: 'glass-glazing-accessories',
    images: ['/assets/images/products/glass-corner-protector-clamps-stainless-steel.webp'],
    tags: ['clamps', 'corner protector', 'stainless steel', 'glass hardware'],
    attributes: [{ key: 'Material', value: 'SS 304' }, { key: 'Pack Size', value: '4 Pcs' }],
    isFeatured: false,
    isNewArrival: true,
    isFlashSale: false
  },

  // ==================== Category 3: Stainless Steel Fittings ====================
  {
    name: 'Premium SS Door Pull Handle (12 inch)',
    slug: 'premium-ss-door-pull-handle-12-inch',
    description: 'Sleek, modern 12-inch satin-finish stainless steel door pull handle. Easy to install and rustproof, giving your main entrance a luxury look.',
    price: 1350,
    purchasePrice: 900,
    stock: 80,
    sku: 'MB-SSF-DPH11',
    categorySlug: 'ss-fittings-hardware',
    images: ['/assets/images/products/premium-ss-door-pull-handle-12-inch.webp'],
    tags: ['door handle', 'ss handle', 'brushed steel', 'luxury'],
    attributes: [{ key: 'Length', value: '12 Inches' }, { key: 'Material', value: 'Stainless Steel' }],
    isFeatured: true,
    isNewArrival: true,
    isFlashSale: false
  },
  {
    name: 'Heavy-Duty Ball Bearing SS Butt Hinges (4x3 inch)',
    slug: 'heavy-duty-ball-bearing-ss-butt-hinges-4x3-inch',
    description: 'Satin finish stainless steel butt hinges equipped with smooth ball bearings. Capable of supporting heavy wooden and metallic doors.',
    price: 350,
    salePrice: 290,
    discountRate: 17,
    purchasePrice: 200,
    stock: 300,
    sku: 'MB-SSF-BBH12',
    categorySlug: 'ss-fittings-hardware',
    images: ['/assets/images/products/heavy-duty-ball-bearing-ss-butt-hinges-4x3-inch.webp'],
    tags: ['hinges', 'butt hinge', 'ball bearing', 'hardware'],
    attributes: [{ key: 'Dimensions', value: '4 x 3 inches' }, { key: 'Thickness', value: '3.0 mm' }],
    isFeatured: false,
    isNewArrival: true,
    isFlashSale: true
  },
  {
    name: 'Luxury SS Mortise Lock Set with Keys',
    slug: 'luxury-ss-mortise-lock-set-with-keys',
    description: 'High-security mortise lock handle set made of solid stainless steel. Comes with a double-locking mechanism and three brass computer keys.',
    price: 3200,
    salePrice: 2700,
    discountRate: 16,
    purchasePrice: 2000,
    stock: 45,
    sku: 'MB-SSF-MLS13',
    categorySlug: 'ss-fittings-hardware',
    images: ['/assets/images/products/luxury-ss-mortise-lock-set-with-keys.webp'],
    tags: ['mortise lock', 'door lock', 'keys', 'security'],
    attributes: [{ key: 'Keys', value: '3 Brass Keys' }, { key: 'Security Level', value: 'High' }],
    isFeatured: true,
    isNewArrival: false,
    isFlashSale: true
  },
  {
    name: 'SS Tower Bolt Flush Latch (8 inch)',
    slug: 'ss-tower-bolt-flush-latch-8-inch',
    description: 'Traditional 8-inch solid stainless steel tower bolt latch for securing doors, gates, and windows.',
    price: 480,
    purchasePrice: 300,
    stock: 220,
    sku: 'MB-SSF-TBL14',
    categorySlug: 'ss-fittings-hardware',
    images: ['/assets/images/products/ss-tower-bolt-flush-latch-8-inch.webp'],
    tags: ['tower bolt', 'latch', 'bolt lock', 'door fittings'],
    attributes: [{ key: 'Length', value: '8 Inches' }, { key: 'Material', value: 'SS 304' }],
    isFeatured: true,
    isNewArrival: false,
    isFlashSale: false
  },
  {
    name: 'Stainless Steel Window Friction Stay Hinge (16 inch)',
    slug: 'stainless-steel-window-friction-stay-hinge-16-inch',
    description: '16-inch adjustable friction stay hinge for casement and top-hung windows. Ensures windows remain open securely at any desired angle.',
    price: 850,
    salePrice: 720,
    discountRate: 15,
    purchasePrice: 500,
    stock: 140,
    sku: 'MB-SSF-FSH15',
    categorySlug: 'ss-fittings-hardware',
    images: ['/assets/images/products/stainless-steel-window-friction-stay-hinge-16-inch.webp'],
    tags: ['friction stay', 'stay hinge', 'casement window', 'hardware'],
    attributes: [{ key: 'Length', value: '16 Inches' }, { key: 'Type', value: 'Heavy Duty' }],
    isFeatured: false,
    isNewArrival: true,
    isFlashSale: false
  },

  // ==================== Category 4: Furniture & Cabinet Hardware ====================
  {
    name: 'Matte Black Furniture Drawer Handle (6 inch)',
    slug: 'matte-black-furniture-drawer-handle-6-inch',
    description: 'Elegant matte black finish alloy metal drawer handle. Ideal for modern kitchen cabinets, wardrobes, and dresser drawers.',
    price: 250,
    purchasePrice: 150,
    stock: 400,
    sku: 'MB-FCH-FDH16',
    categorySlug: 'furniture-cabinet-hardware',
    images: ['/assets/images/products/matte-black-furniture-drawer-handle-6-inch.webp'],
    tags: ['drawer handle', 'matte black', 'cabinet pull', 'furniture hardware'],
    attributes: [{ key: 'Size', value: '6 Inches' }, { key: 'Finish', value: 'Matte Black' }],
    isFeatured: true,
    isNewArrival: true,
    isFlashSale: false
  },
  {
    name: 'Hydraulic Soft-Close Cabinet Hinge (3D Adjustable)',
    slug: 'hydraulic-soft-close-cabinet-hinge-3d-adjustable',
    description: 'Nickel-plated hydraulic soft-close clip-on hinge with 3D adjustability. Prevents cabinet doors from slamming shut.',
    price: 180,
    salePrice: 140,
    discountRate: 22,
    purchasePrice: 100,
    stock: 500,
    sku: 'MB-FCH-HCH17',
    categorySlug: 'furniture-cabinet-hardware',
    images: ['/assets/images/products/hydraulic-soft-close-cabinet-hinge-3d-adjustable.webp'],
    tags: ['cabinet hinge', 'hydraulic', 'soft close', 'hinges'],
    attributes: [{ key: 'Type', value: 'Clip-On Soft Close' }, { key: 'Adjustment', value: '3-Way' }],
    isFeatured: false,
    isNewArrival: true,
    isFlashSale: true
  },
  {
    name: 'Telescopic Ball Bearing Drawer Slides (18 inch)',
    slug: 'telescopic-ball-bearing-drawer-slides-18-inch',
    description: 'Heavy-duty 18-inch telescopic three-fold ball bearing drawer slides. Provides smooth drawer movement and supports up to 45kg load.',
    price: 650,
    salePrice: 550,
    discountRate: 15,
    purchasePrice: 400,
    stock: 150,
    sku: 'MB-FCH-BDS18',
    categorySlug: 'furniture-cabinet-hardware',
    images: ['/assets/images/products/telescopic-ball-bearing-drawer-slides-18-inch.webp'],
    tags: ['drawer slides', 'ball bearing', 'telescopic runners', 'furniture track'],
    attributes: [{ key: 'Length', value: '18 Inches' }, { key: 'Load Capacity', value: '45 Kg' }],
    isFeatured: false,
    isNewArrival: false,
    isFlashSale: true
  },
  {
    name: 'Heavy-Duty Magnetic Cabinet Door Catch',
    slug: 'heavy-duty-magnetic-cabinet-door-catch',
    description: 'Premium magnetic cabinet latch catch in a chrome metal housing. Keeps cabinet, wardrobe, and pantry doors securely shut.',
    price: 150,
    purchasePrice: 80,
    stock: 300,
    sku: 'MB-FCH-MCC19',
    categorySlug: 'furniture-cabinet-hardware',
    images: ['/assets/images/products/heavy-duty-magnetic-cabinet-door-catch.webp'],
    tags: ['magnetic catch', 'door latch', 'cabinet magnet', 'hardware'],
    attributes: [{ key: 'Body Material', value: 'Chrome Plated Zinc' }, { key: 'Pull Force', value: '10 kg' }],
    isFeatured: false,
    isNewArrival: false,
    isFlashSale: false
  },
  {
    name: 'Modern Metal Furniture Sofa Legs (Gold Chrome)',
    slug: 'modern-metal-furniture-sofa-legs-gold-chrome',
    description: 'Glossy gold chrome plated steel furniture sofa legs. Adds an elegant, luxury lift to sofas, cabinets, beds, and coffee tables.',
    price: 750,
    purchasePrice: 450,
    stock: 120,
    sku: 'MB-FCH-FSL20',
    categorySlug: 'furniture-cabinet-hardware',
    images: ['/assets/images/products/modern-metal-furniture-sofa-legs-gold-chrome.webp'],
    tags: ['sofa leg', 'gold legs', 'furniture feet', 'chrome'],
    attributes: [{ key: 'Height', value: '6 Inches' }, { key: 'Color', value: 'Gold Chrome' }],
    isFeatured: false,
    isNewArrival: false,
    isFlashSale: false
  },

  // ==================== Category 5: Mosquito Nets & Insect Screens ====================
  {
    name: 'High-Density Fiberglass Insect Mesh Screen (Grey, 4ft x 50ft)',
    slug: 'high-density-fiberglass-insect-mesh-screen-grey-4ft-50ft',
    description: 'Premium quality grey fiberglass insect screen mesh. Offers great visibility, excellent airflow, and rustproof protection against mosquitoes.',
    price: 4200,
    purchasePrice: 2800,
    stock: 50,
    sku: 'MB-MNS-FMS21',
    categorySlug: 'mosquito-nets-insect-screens',
    images: ['/assets/images/products/high-density-fiberglass-insect-mesh-screen-grey-4ft-50ft.webp'],
    tags: ['mosquito net', 'fiberglass mesh', 'insect screen', 'windows'],
    attributes: [{ key: 'Dimensions', value: '4 x 50 Feet' }, { key: 'Color', value: 'Grey' }],
    isFeatured: false,
    isNewArrival: false,
    isFlashSale: false
  },
  {
    name: 'Mosquito Net Screen Rolling Tool with Wooden Handle',
    slug: 'mosquito-net-screen-rolling-tool-with-wooden-handle',
    description: 'Ergonomic wooden handle spline rolling tool equipped with dual steel wheels. Perfect for installing mosquito screens into aluminum window frame spline grooves.',
    price: 380,
    purchasePrice: 220,
    stock: 100,
    sku: 'MB-MNS-SRT22',
    categorySlug: 'mosquito-nets-insect-screens',
    images: ['/assets/images/products/mosquito-net-screen-rolling-tool-with-wooden-handle.webp'],
    tags: ['rolling tool', 'spline roller', 'wooden tool', 'net installation'],
    attributes: [{ key: 'Handle', value: 'Polished Wood' }, { key: 'Wheel Material', value: 'Steel' }],
    isFeatured: false,
    isNewArrival: false,
    isFlashSale: true
  },
  {
    name: 'Spline Retaining Rubber Cord (Black, 50m)',
    slug: 'spline-retaining-rubber-cord-black-50m',
    description: 'Flexible black vinyl spline retaining rubber cord. Specifically designed to lock insect screens tightly into aluminum window grooves.',
    price: 450,
    purchasePrice: 250,
    stock: 150,
    sku: 'MB-MNS-RRC23',
    categorySlug: 'mosquito-nets-insect-screens',
    images: ['/assets/images/products/spline-retaining-rubber-cord-black-50m.webp'],
    tags: ['spline cord', 'rubber spline', 'retaining cord', 'mosquito net'],
    attributes: [{ key: 'Length', value: '50 Meters' }, { key: 'Thickness', value: '5.0 mm' }],
    isFeatured: false,
    isNewArrival: false,
    isFlashSale: true
  },
  {
    name: 'Magnetic Window Screen Frame Corner Clips',
    slug: 'magnetic-window-screen-frame-corner-clips',
    description: 'Four-pack of plastic and magnetic corner clips for DIY magnetic window screen installations. Holds insect screen netting firmly in place.',
    price: 320,
    purchasePrice: 180,
    stock: 250,
    sku: 'MB-MNS-MCC24',
    categorySlug: 'mosquito-nets-insect-screens',
    images: ['/assets/images/products/magnetic-window-screen-frame-corner-clips.webp'],
    tags: ['corner clips', 'magnetic screen', 'diy window net', 'clips'],
    attributes: [{ key: 'Pack Size', value: '4 Pieces' }, { key: 'Material', value: 'PVC & Magnets' }],
    isFeatured: false,
    isNewArrival: false,
    isFlashSale: false
  },
  {
    name: 'Stainless Steel Mosquito Net Mesh (Durable Rustproof)',
    slug: 'stainless-steel-mosquito-net-mesh-durable-rustproof',
    description: 'Rustproof, scratch-proof, high-durability stainless steel mesh. Offers premium level insect protection and pet resistance for windows and doors.',
    price: 2900,
    purchasePrice: 1800,
    stock: 65,
    sku: 'MB-MNS-SNM25',
    categorySlug: 'mosquito-nets-insect-screens',
    images: ['/assets/images/products/stainless-steel-mosquito-net-mesh-durable-rustproof.webp'],
    tags: ['ss mesh', 'stainless steel net', 'rustproof screen', 'durable net'],
    attributes: [{ key: 'Material', value: 'Stainless Steel SS 304' }, { key: 'Width', value: '3 Feet' }],
    isFeatured: false,
    isNewArrival: false,
    isFlashSale: false
  }
];

async function seed() {
  try {
    try {
      await mongoose.connect(mongodbUri);
    } catch (connErr) {
      console.log('SRV connection failed, trying direct connection fallback...');
      const directUri = 'mongodb://mayamoybuilders:xI2QuBaFZsYQ5vRD@ac-jrowhop-shard-00-00.e5n1hnl.mongodb.net:27017,ac-jrowhop-shard-00-01.e5n1hnl.mongodb.net:27017,ac-jrowhop-shard-00-02.e5n1hnl.mongodb.net:27017/mayamoybuilders?ssl=true&authSource=admin';
      await mongoose.connect(directUri);
    }
    console.log('Connected to MongoDB successfully.');

    // Clear existing products
    const deleteResult = await Product.deleteMany({});
    console.log(`Cleared ${deleteResult.deletedCount} existing products.`);

    // Query all categories
    const categoriesList = await Category.find({});
    console.log(`Fetched ${categoriesList.length} categories from DB.`);

    const categoryMap = {};
    categoriesList.forEach(c => {
      categoryMap[c.slug] = c._id;
    });

    // Prepare products with proper Category ObjectIds
    const finalProducts = productsData.map(p => {
      const categoryId = categoryMap[p.categorySlug];
      if (!categoryId) {
        throw new Error(`Category with slug "${p.categorySlug}" not found in DB! Seed categories first.`);
      }
      const pCopy = { ...p };
      pCopy.categories = [categoryId];
      delete pCopy.categorySlug;
      return pCopy;
    });

    // Insert new products
    const insertResult = await Product.insertMany(finalProducts);
    console.log(`Seeded ${insertResult.length} products successfully:`);
    insertResult.forEach((prod, i) => {
      console.log(`[Product ${i + 1}] Name: "${prod.name}", SKU: "${prod.sku}"`);
    });

  } catch (error) {
    console.error('Seeding error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
    process.exit(0);
  }
}

seed();
