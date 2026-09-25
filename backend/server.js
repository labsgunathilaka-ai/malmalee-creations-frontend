const express  = require('express');
const dotenv   = require('dotenv');
const cors     = require('cors');
const path     = require('path');
const connectDB    = require('./src/config/db');
const errorHandler = require('./src/middleware/errorHandler');

dotenv.config();
connectDB();

const app = express();

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded media as static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ─── Routes ───────────────────────────────────────────────────────────────────

// Public routes (Home Page, Product Details, Categories)
app.use('/api', require('./src/routes/publicRoutes'));

// Search & Filter (Header search bar)
app.use('/api/search', require('./src/routes/searchRoutes'));

// Upload routes (image + video)
app.use('/api/upload', require('./src/routes/uploadRoutes'));

// Admin routes (CRUD)
app.use('/api/admin/categories', require('./src/routes/categoryRoutes'));
app.use('/api/admin/products',   require('./src/routes/productRoutes'));

// Health check
app.get('/', (req, res) => {
  res.json({
    message: 'Malmalee Creations API is running',
    status:  'OK',
    endpoints: {
      public:    ['GET /api/products', 'GET /api/products/:id', 'GET /api/products/featured', 'GET /api/products/new-arrivals', 'GET /api/categories'],
      search:    ['GET /api/search?q=', 'GET /api/search/suggestions?q='],
      upload:    ['POST /api/upload/images', 'POST /api/upload/video', 'POST /api/upload/product-media'],
      adminCat:  ['GET|POST /api/admin/categories', 'GET|PUT|DELETE /api/admin/categories/:id'],
      adminProd: ['GET|POST /api/admin/products',   'GET|PUT|DELETE /api/admin/products/:id'],
    },
  });
});

// Error Handler (must be last)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
