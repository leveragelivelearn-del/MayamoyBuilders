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
  mongodbUri = 'mongodb+srv://mayamoybuilders:S4Epscw0SOkd5ZtG@cluster0.e5n1hnl.mongodb.net/mayamoybuilders';
}

console.log('Connecting to MongoDB...');

const BannerSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    image: { type: String, required: true },
    link: { type: String },
    primaryBtnText: { type: String },
    primaryBtnLink: { type: String },
    secondaryBtnText: { type: String },
    secondaryBtnLink: { type: String },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Banner = mongoose.models.Banner || mongoose.model('Banner', BannerSchema);

const banners = [
  {
    title: 'Sleek Aluminum & Glass Fittings',
    image: '/assets/images/Banner/Sleek Aluminum & Glass Fittings.webp',
    link: '/shop',
    primaryBtnText: 'Explore Shop',
    primaryBtnLink: '/shop',
    secondaryBtnText: 'Contact Us',
    secondaryBtnLink: 'https://wa.me/8801811228467',
    order: 1,
    isActive: true,
  },
  {
    title: 'Durable SS Hardware & Fittings',
    image: '/assets/images/Banner/Durable SS Hardware & Fittings.webp',
    link: '/shop',
    primaryBtnText: 'Explore Shop',
    primaryBtnLink: '/shop',
    secondaryBtnText: 'Contact Us',
    secondaryBtnLink: 'https://wa.me/8801811228467',
    order: 2,
    isActive: true,
  },
  {
    title: 'Durable Insect Screen Solutions',
    image: '/assets/images/Banner/Durable Insect Screen Solutions.webp',
    link: '/shop',
    primaryBtnText: 'Explore Shop',
    primaryBtnLink: '/shop',
    secondaryBtnText: 'Contact Us',
    secondaryBtnLink: 'https://wa.me/8801811228467',
    order: 3,
    isActive: true,
  },
  {
    title: 'Essential Construction Accessories',
    image: '/assets/images/Banner/Essential Construction Accessories.webp',
    link: '/shop',
    primaryBtnText: 'Explore Shop',
    primaryBtnLink: '/shop',
    secondaryBtnText: 'Contact Us',
    secondaryBtnLink: 'https://wa.me/8801811228467',
    order: 4,
    isActive: true,
  },
  {
    title: 'Premium Furniture Fittings',
    image: '/assets/images/Banner/Premium Furniture Fittings.webp',
    link: '/shop',
    primaryBtnText: 'Explore Shop',
    primaryBtnLink: '/shop',
    secondaryBtnText: 'Contact Us',
    secondaryBtnLink: 'https://wa.me/8801811228467',
    order: 5,
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

    // Clear existing banners
    const deleteResult = await Banner.deleteMany({});
    console.log(`Cleared ${deleteResult.deletedCount} existing banners.`);

    // Insert new banners
    const insertResult = await Banner.insertMany(banners);
    console.log(`Seeded ${insertResult.length} banners successfully:`);
    insertResult.forEach((b, i) => {
      console.log(`[Banner ${i + 1}] Title: "${b.title}", Image: "${b.image}"`);
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
