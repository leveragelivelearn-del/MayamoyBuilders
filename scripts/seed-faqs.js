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

const FAQSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const FAQ = mongoose.models.FAQ || mongoose.model('FAQ', FAQSchema);

const faqs = [
  {
    question: 'মায়াময় বিল্ডার্স মূলত কী ধরণের পণ্য বিক্রি করে?',
    answer: 'মায়াময় বিল্ডার্স থাই অ্যালুমিনিয়াম হার্ডওয়্যার, এস.এস ফিটিংস হার্ডওয়্যার, কবজা, হ্যান্ডেল, ফার্নিচার হার্ডওয়্যার, স্ক্রু, রয়েল প্লাগ, দেশি-বিদেশি পর্দার ক্লাম, ভিভিপি ক্লোজার, গ্লাস কাটার, মশারি নেট সহ যাবতীয় মানসম্মত হার্ডওয়্যার পণ্য পাইকারী ও খুচরা বিক্রি এবং অর্ডার সরবরাহ করে থাকে।',
    order: 1,
    isActive: true,
  },
  {
    question: 'আমি কি ঢাকা বা ঢাকার বাইরে থেকে প্রোডাক্ট অর্ডার করতে পারব?',
    answer: 'হ্যাঁ, আপনি সারা বাংলাদেশ থেকেই অনলাইনে বা ফোনের মাধ্যমে অর্ডার করতে পারবেন। আমাদের কাস্টমার সার্ভিস ও হোম ডেলিভারি সার্ভিসের মাধ্যমে আমরা দেশের প্রতিটি প্রান্তে নিরাপদভাবে প্রোডাক্ট পৌঁছে দিয়ে থাকি।',
    order: 2,
    isActive: true,
  },
  {
    question: 'ঢাকার ভেতরে এবং বাইরে ডেলিভারি পেতে কতদিন সময় লাগবে?',
    answer: 'সাধারণত ঢাকার ভেতরে ২৪ থেকে ৪৮ ঘণ্টার মধ্যে ডেলিভারি সম্পন্ন হয়। ঢাকার বাইরে কুরিয়ার সার্ভিসের মাধ্যমে ডেলিভারি পেতে ৩ থেকে ৫ কার্যদিবস সময় লাগতে পারে।',
    order: 3,
    isActive: true,
  },
  {
    question: 'আপনাদের দোকানে কি সরাসরি এসে প্রোডাক্ট কেনা যাবে?',
    answer: 'হ্যাঁ, আপনি সরাসরি আমাদের দোকানে এসে পণ্য দেখতে ও কিনতে পারেন। আমাদের ঠিকানা: ৭/৮ নবাবপুর রোড, আনোয়ার টাওয়ার, দোকান নং ২৪, ঢাকা ১১০০।',
    order: 4,
    isActive: true,
  },
  {
    question: 'আপনারা কি পাইকারী অর্ডার ও বিশেষ কোনো ছাড় দিয়ে থাকেন?',
    answer: 'হ্যাঁ, আমরা পাইকারী বিক্রেতা এবং বড় অর্ডারের জন্য বিশেষ ডিসকাউন্ট প্রদান করি। যেকোনো বড় প্রজেক্ট বা পাইকারী ক্রয়ের জন্য আমাদের দেওয়া কন্টাক্ট নাম্বারে সরাসরি যোগাযোগ করতে পারেন।',
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

    // Clear existing FAQs
    const deleteResult = await FAQ.deleteMany({});
    console.log(`Cleared ${deleteResult.deletedCount} existing FAQs.`);

    // Insert new FAQs
    const insertResult = await FAQ.insertMany(faqs);
    console.log(`Seeded ${insertResult.length} FAQs successfully:`);
    insertResult.forEach((f, i) => {
      console.log(`[FAQ ${i + 1}] Question: "${f.question}"`);
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
