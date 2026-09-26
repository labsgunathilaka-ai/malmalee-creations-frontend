require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI).then(async () => {
  console.log('Connected to MongoDB');

  // Get models (use existing schemas already registered)
  const Category = require('./src/models/Category');
  const Product  = require('./src/models/Product');

  // Clear
  await Category.deleteMany({});
  await Product.deleteMany({});
  console.log('Cleared old data');

  // Insert categories using raw MongoDB (no pre-save hook issues)
  const catData = [
    { name: 'Scrunchies',       slug: 'scrunchies',       description: 'Luxury silk and velvet scrunchies',      status: 'Active', productCount: 0 },
    { name: 'Hair Bows',        slug: 'hair-bows',        description: 'Handcrafted velvet and lace hair bows',  status: 'Active', productCount: 0 },
    { name: 'Headbands',        slug: 'headbands',        description: 'Padded and embellished headbands',       status: 'Active', productCount: 0 },
    { name: 'Silk Accessories', slug: 'silk-accessories', description: 'Premium silk hair accessories',          status: 'Active', productCount: 0 },
    { name: 'Gift Sets',        slug: 'gift-sets',        description: 'Curated gift sets',                      status: 'Active', productCount: 0 },
  ];

  const cats = await Category.collection.insertMany(catData.map(c => ({ ...c, image: null, displayOrder: 0, createdAt: new Date(), updatedAt: new Date() })));
  const idList = Object.values(cats.insertedIds);
  const catMap = {};
  catData.forEach((c, i) => { catMap[c.name] = idList[i]; });
  console.log('Categories inserted:', catData.length);

  // Insert products
  const now = new Date();
  const prodData = [
    { name: 'Pure Mulberry Silk Cloud Scrunchie',  sku: 'MAL-SCR-001', price: 280,  stock: 48, status: 'Active',    tags: ['BESTSELLER'],     colors: ['Rose','Ivory','Noir'],        isFeatured: true,  isNewArrival: false, catName: 'Scrunchies'       },
    { name: 'Oversized Silk Scrunchie Midnight',   sku: 'MAL-SCR-002', price: 340,  stock: 22, status: 'Active',    tags: ['LIMITED RUN'],    colors: ['Noir','Bordeaux'],            isFeatured: true,  isNewArrival: false, catName: 'Scrunchies'       },
    { name: 'Velvet Ribbon Hair Bow Bordeaux',     sku: 'MAL-BOW-001', price: 420,  stock: 18, status: 'Active',    tags: ['NEW SEASON'],     colors: ['Bordeaux','Emerald','Navy'],  isFeatured: true,  isNewArrival: true,  catName: 'Hair Bows'        },
    { name: 'Pearl Embroidered French Bow',        sku: 'MAL-BOW-002', price: 580,  stock: 14, status: 'Active',    tags: ['BRIDAL ATELIER'], colors: ['Ivory'],                      isFeatured: true,  isNewArrival: true,  catName: 'Hair Bows'        },
    { name: 'The Juliette Silk-Velvet Tail Bow',   sku: 'MAL-BOW-003', price: 380,  stock: 25, status: 'Active',    tags: [],                 colors: ['Blush','Noir','Ivory'],       isFeatured: false, isNewArrival: true,  catName: 'Hair Bows'        },
    { name: 'Petite Silk Trio Gift Vault',         sku: 'MAL-SET-001', price: 480,  stock: 12, status: 'Active',    tags: ['BESTSELLER'],     colors: ['Multi'],                      isFeatured: true,  isNewArrival: false, catName: 'Gift Sets'        },
    { name: 'Versailles French Lace Ribbon',       sku: 'MAL-BOW-004', price: 340,  stock: 35, status: 'Active',    tags: [],                 colors: ['Champagne','Blush'],          isFeatured: false, isNewArrival: true,  catName: 'Hair Bows'        },
    { name: 'Emerald Botanical Silk Cloud',        sku: 'MAL-SCR-003', price: 320,  stock: 30, status: 'Active',    tags: ['NEW SEASON'],     colors: ['Emerald','Sage'],             isFeatured: true,  isNewArrival: true,  catName: 'Scrunchies'       },
    { name: 'Heirloom Padded Velvet Headband',     sku: 'MAL-HBD-001', price: 540,  stock: 8,  status: 'Low Stock', tags: ['LIMITED RUN'],    colors: ['Burgundy','Navy'],            isFeatured: false, isNewArrival: false, catName: 'Headbands'        },
    { name: 'Imperial Damask Velvet Bow',          sku: 'MAL-BOW-005', price: 480,  stock: 20, status: 'Active',    tags: ['BESTSELLER'],     colors: ['Black','Ivory'],              isFeatured: true,  isNewArrival: false, catName: 'Hair Bows'        },
  ];

  const prods = prodData.map(({ catName, ...p }) => ({
    ...p, category: catMap[catName], images: [], video: null,
    rating: (4.5 + Math.random() * 0.5).toFixed(1) * 1,
    reviewCount: Math.floor(20 + Math.random() * 100),
    createdAt: now, updatedAt: now,
  }));

  await Product.collection.insertMany(prods);
  console.log('Products inserted:', prods.length);

  // Update product counts
  for (const [name, id] of Object.entries(catMap)) {
    const cnt = prods.filter(p => p.category.toString() === id.toString()).length;
    await Category.collection.updateOne({ _id: id }, { $set: { productCount: cnt } });
  }

  console.log('\n✅ Database seeded successfully!');
  console.log('  - 5 categories');
  console.log('  - 10 products');
  mongoose.disconnect();
}).catch(err => { console.error('Failed:', err.message); process.exit(1); });
