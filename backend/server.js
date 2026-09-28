const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('./src/config/db');
const errorHandler = require('./src/middleware/errorHandler');

dotenv.config();
connectDB();

const app = express();

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5173', 'http://127.0.0.1:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded media as static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ─── Routes ───────────────────────────────────────────────────────────────────

// Auth & Customer Routes (Sign Up, Sign In, Sign Out, Forgot Password, Profile Update)
app.use('/api/auth', require('./src/routes/authRoutes'));
app.use('/api/customer', require('./src/routes/authRoutes'));

// Contact Us Routes
app.use('/api/contact', require('./src/routes/contactRoutes'));

// Public routes (Home Page, Product Details, Categories)
app.use('/api', require('./src/routes/publicRoutes'));

// Search & Filter (Header search bar)
app.use('/api/search', require('./src/routes/searchRoutes'));

// Upload routes (image + video)
app.use('/api/upload', require('./src/routes/uploadRoutes'));

// Admin & Order routes
app.use('/api/admin/categories', require('./src/routes/categoryRoutes'));
app.use('/api/admin/products',   require('./src/routes/productRoutes'));
app.use('/api/admin',            require('./src/routes/adminRoutes'));
app.use('/api/orders',           require('./src/routes/orderRoutes'));

// Health check / API Index
app.get('/', (req, res) => {
  res.json({
    message: 'Malmalee Creations API is running',
    status:  'OK',
    endpoints: {
      auth: {
        signUp:         'POST /api/auth/signup',
        signIn:         'POST /api/auth/signin',
        signOut:        'POST /api/auth/signout',
        forgotPassword: 'POST /api/auth/forgot-password',
        resetPassword:  'POST /api/auth/reset-password',
        getProfile:     'GET  /api/auth/profile (Bearer token)',
        updateProfile:  'PUT  /api/auth/profile (Bearer token)',
        updatePassword: 'PUT  /api/auth/update-password (Bearer token)'
      },
      contact: {
        submit: 'POST /api/contact',
        getAll: 'GET  /api/contact'
      },
      public:    ['GET /api/products', 'GET /api/products/:id', 'GET /api/products/featured', 'GET /api/products/new-arrivals', 'GET /api/categories'],
      search:    ['GET /api/search?q=', 'GET /api/search/suggestions?q='],
      upload:    ['POST /api/upload/images', 'POST /api/upload/video', 'POST /api/upload/product-media'],
      adminCat:  ['GET|POST /api/admin/categories', 'GET|PUT|DELETE /api/admin/categories/:id'],
      adminProd: ['GET|POST /api/admin/products',   'GET|PUT|DELETE /api/admin/products/:id'],
    },
  });
});

// Debug: check all products raw
const Product = require('./src/models/Product');
app.get('/api/debug/products', async (req, res) => {
  try {
    const all = await Product.find({}).select('name status stock');
    res.json({ count: all.length, data: all });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Error Handler (must be after routes)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
