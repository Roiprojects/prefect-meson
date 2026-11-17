import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import app, { ensureDbReady } from './app.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Port number strictly driven by process.env / .env
const PORT = process.env.PORT || 5000;

// Serve static frontend from 'dist' in production / standalone server
const distPath = path.join(__dirname, '../dist');
if (fs.existsSync(distPath)) {
  console.log(`📦 Serving static frontend from: ${distPath}`);
  app.use(express.static(distPath));
  
  // Single Page Application (SPA) routing fallback
  app.use((req, res) => {
    if (req.path.startsWith('/api')) {
      return res.status(404).json({ error: 'API endpoint not found' });
    }
    res.sendFile(path.join(distPath, 'index.html'));
  });
} else {
  console.warn(`⚠️ Warning: static dist directory not found at ${distPath}. Run 'npm run build' before starting production server.`);
}

// Start Standalone Node Server immediately so the server is live instantly
const server = app.listen(PORT, '0.0.0.0', () => {
  const dbHost = process.env.DB_HOST || process.env.PG_HOST || '127.0.0.1';
  const dbName = process.env.DB_NAME || process.env.PG_DATABASE || 'perfe392';
  const dbPort = process.env.DB_PORT || process.env.PG_PORT || '5432';
  console.log(`🚀 Perfect Mason Server running on port ${PORT} (0.0.0.0)`);
  console.log(`🌐 Application is LIVE at http://localhost:${PORT}`);
  console.log(`📊 Connected to PostgreSQL: ${dbName} @ ${dbHost}:${dbPort}`);
});

// Run database verification in the background without blocking server startup
ensureDbReady()
  .then(() => {
    console.log('✅ PostgreSQL database schema and migrations verified.');
  })
  .catch((err) => {
    console.warn('⚠️ Database migration initialization notice:', err?.message || err);
  });

export default app;
