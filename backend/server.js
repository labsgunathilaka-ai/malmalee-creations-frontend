const express  = require('express');
const dotenv   = require('dotenv');
const cors     = require('cors');
const path     = require('path');
const connectDB    = require('./src/config/db');
const errorHandler = require('./src/middleware/errorHandler');

// Load env vars
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded images as static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ─── Routes ────────────────────────────────────────────────────────────────────
app.use('/api/admin/categories', require('./src/routes/categoryRoutes'));
app.use('/api/admin/products',   require('./src/routes/productRoutes'));

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Malmalee Creations API is running', status: 'OK' });
});

// Error Handler (must be last)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
