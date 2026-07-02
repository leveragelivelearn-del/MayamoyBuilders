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
  // Fallback if env file doesn't parse correctly
  mongodbUri = 'mongodb+srv://mayamoybuilders:xI2QuBaFZsYQ5vRD@cluster0.e5n1hnl.mongodb.net/mayamoybuilders';
}

console.log('Connecting to MongoDB...');

const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, unique: true },
    image: { type: String },
    parentCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: null },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);

const categories = [
  {
    name: 'Thai Aluminum & Profiles',
    slug: 'thai-aluminum-profiles',
    image: '/assets/images/cagetory/Thai Aluminum & Profiles.webp',
    isActive: true,
  },
  {
    name: 'Glass & Glazing Accessories',
    slug: 'glass-glazing-accessories',
    image: '/assets/images/cagetory/Glass & Glazing Accessories.webp',
    isActive: true,
  },
  {
    name: 'Stainless Steel Fittings',
    slug: 'ss-fittings-hardware',
    image: '/assets/images/cagetory/Stainless Steel Fittings.webp',
    isActive: true,
  },
  {
    name: 'Furniture & Cabinet Hardware',
    slug: 'furniture-cabinet-hardware',
    image: '/assets/images/cagetory/Furniture & Cabinet Hardware.webp',
    isActive: true,
  },
  {
    name: 'Mosquito Nets & Insect Screens',
    slug: 'mosquito-nets-insect-screens',
    image: '/assets/images/cagetory/Mosquito Nets & Insect Screens.webp',
    isActive: true,
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

    // Clear existing categories
    const deleteResult = await Category.deleteMany({});
    console.log(`Cleared ${deleteResult.deletedCount} existing categories.`);

    // Insert new categories
    const insertResult = await Category.insertMany(categories);
    console.log(`Seeded ${insertResult.length} categories successfully:`);
    insertResult.forEach((c, i) => {
      console.log(`[Category ${i + 1}] Name: "${c.name}", Slug: "${c.slug}", Image: "${c.image}"`);
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
