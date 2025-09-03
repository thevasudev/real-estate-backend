require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dns = require('dns');

// Prefer IPv4 first (Windows/DNS SRV hiccups)
dns.setDefaultResultOrder('ipv4first');

const app = express();

// --- Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));   // you previously had 1mb
// If you also receive URL-encoded forms sometimes:
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// --- Health check
app.get('/health', (req, res) => res.json({ ok: true, env: process.env.NODE_ENV || 'dev' }));

// --- Routes (use paths relative to THIS file)
const faqRoutes = require('./src/routes/faqRoutes');
const adminRoutes = require('./src/routes/adminRoutes');
const staticRoutes = require('./src/routes/staticRoutes');
const contactRoutes = require('./src/routes/contactRoutes');
const propertyRoutes = require('./src/routes/propertyRoutes');

app.use('/api/admin', adminRoutes);
app.use('/api/faq', faqRoutes);
app.use('/api/static', staticRoutes);
app.use('/api/contact', contactRoutes);
// NOTE: you used /api/property (singular). Keep it consistent with your Postman tests.
app.use('/api/property', propertyRoutes);

// 404 + error handlers
app.use((req, res) => res.status(404).json({ error: 'Not found' }));
app.use((err, req, res, next) => {
  console.error('ERROR:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
  });
});

const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ Missing MONGODB_URI in .env');
  process.exit(1);
}

// --- Connect to Mongo
(async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      autoIndex: true,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      family: 4, // prefer IPv4 sockets
    });
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => console.log(`🚀 Server listening on http://localhost:${PORT}`));
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    console.error('   → If using Atlas + SRV, switch to a non-SRV URI (see .env example below).');
    process.exit(1);
  }
})();

// Optional: catch unhandled rejections
process.on('unhandledRejection', (err) => {
  console.error('UNHANDLED REJECTION:', err);
});
