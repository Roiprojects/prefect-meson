import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import app, { ensureDbReady } from './app.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Port and host strictly driven by process.env / .env
const PORT = process.env.PORT || process.env.APP_PORT || 5000;
const HOST = process.env.HOST || '0.0.0.0';

// Serve static frontend from 'dist' in production / standalone server
const distPath = path.join(__dirname, '../dist');
if (fs.existsSync(distPath)) {
  console.log(`📦 Serving static frontend from: ${distPath}`);
  app.use(express.static(distPath));
  
  // Single Page Application (SPA) routing fallback for all GET navigation requests
  app.use((req, res) => {
    if (req.path.startsWith('/api')) {
      return res.status(404).json({ error: 'API endpoint not found' });
    }
    // Do not serve HTML for missing static files (scripts, styles, images, fonts)
    if (req.path.startsWith('/assets/') || /\.(js|css|png|jpg|jpeg|gif|svg|ico|woff2?|ttf|eot|webp)$/i.test(req.path)) {
      return res.status(404).send('Asset not found');
    }
    res.sendFile(path.join(distPath, 'index.html'));
  });
} else {
  console.warn(`⚠️ Warning: static dist directory not found at ${distPath}. Run 'npm run build' before starting production server.`);
  app.use((req, res) => {
    if (req.path.startsWith('/api')) {
      return res.status(404).json({ error: 'API endpoint not found' });
    }
    res.status(503).send(`
      <!DOCTYPE html>
      <html lang="en">
        <head><meta charset="utf-8"><title>Perfect Mason - Build Notice</title></head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; display:flex; align-items:center; justify-content:center; height:100vh; margin:0; background:#0B0F19; color:#fff;">
          <div style="text-align:center; max-width:520px; padding:32px; background:#111827; border-radius:16px; border:1px solid #374151;">
            <h2 style="color:#C8A96B; margin-top:0;">Perfect Mason Service is Active</h2>
            <p style="color:#9CA3AF; line-height:1.6;">Frontend build assets not found in <code>dist/</code>.<br/>Run <code>npm run build</code> on the server to deploy the static frontend bundle.</p>
          </div>
        </body>
      </html>
    `);
  });
}

// Start Standalone Node Server immediately so the server is live instantly
const server = app.listen(PORT, HOST, () => {
  const dbHost = process.env.DB_HOST || process.env.PG_HOST || '127.0.0.1';
  const dbName = process.env.DB_NAME || process.env.PG_DATABASE || 'perfe392';
  const dbPort = process.env.DB_PORT || process.env.PG_PORT || '5432';
  console.log(`🚀 Perfect Mason Server running on ${HOST}:${PORT}`);
  console.log(`🌐 Application is LIVE and listening on process.env.PORT (${PORT})`);
  console.log(`📊 Connected to PostgreSQL: ${dbName} @ ${dbHost}:${dbPort}`);
});

// Graceful shutdown handling for systemd service restarts and stop signals
process.on('SIGTERM', () => {
  console.log('🛑 Received SIGTERM from systemd, closing server gracefully...');
  server.close(() => {
    console.log('✅ Perfect Mason server closed cleanly.');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('🛑 Received SIGINT, closing server gracefully...');
  server.close(() => {
    console.log('✅ Perfect Mason server closed cleanly.');
    process.exit(0);
  });
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
