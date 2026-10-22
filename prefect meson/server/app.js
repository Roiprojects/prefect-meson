import express from 'express';
import cors from 'cors';
import multer from 'multer';
import crypto from 'crypto';
import dotenv from 'dotenv';
import { pool, query } from './db.js';
import { runMigrations } from './migrate.js';
import { processAiChat } from './aiService.js';

dotenv.config();

const app = express();

// Enable CORS for all origins
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Multer in-memory storage for handling file uploads directly into PostgreSQL
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB per file
});

// Auto-run migrations on cold start (cached promise)
let migrationPromise = null;
export async function ensureDbReady() {
  if (!migrationPromise) {
    migrationPromise = runMigrations().catch((err) => {
      console.error('Migration background error:', err);
      migrationPromise = null; // retry on next attempt if failed
    });
  }
  return migrationPromise;
}

// Router for all API routes
const router = express.Router();

// Middleware to ensure DB is initialized
router.use(async (req, res, next) => {
  try {
    await ensureDbReady();
  } catch (err) {
    console.warn('DB check warning:', err.message);
  }
  next();
});

// ==========================================
// 1. HEALTH & SYSTEM STATUS
// ==========================================
router.get('/health', async (req, res) => {
  try {
    const dbRes = await query('SELECT NOW() as current_time, version() as version;');
    res.json({
      status: 'ok',
      service: 'Perfect Mason PostgreSQL API',
      database: process.env.DB_NAME || process.env.PG_DATABASE || 'perfe392',
      host: process.env.DB_HOST || process.env.PG_HOST || '127.0.0.1',
      serverTime: dbRes.rows[0].current_time,
      pgVersion: dbRes.rows[0].version,
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// ==========================================
// 2. DIRECT POSTGRESQL STORAGE BUCKETS
// ==========================================
router.post('/storage/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file provided' });
    }

    const bucketId = req.body.bucketId || 'general';
    const fileId = 'file_' + Date.now() + '_' + crypto.randomBytes(4).toString('hex');
    const originalName = req.file.originalname;
    const mimeType = req.file.mimetype;
    const sizeBytes = req.file.size;
    
    // Encode as Data URI for instant serving & direct database storage
    const base64Data = `data:${mimeType};base64,${req.file.buffer.toString('base64')}`;
    const fileUrl = `/api/storage/file/${fileId}`;

    await query(
      `INSERT INTO storage_files (id, bucket_id, filename, original_name, mime_type, size_bytes, data, url)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`,
      [fileId, bucketId, `${fileId}_${originalName}`, originalName, mimeType, sizeBytes, base64Data, fileUrl]
    );

    res.json({
      success: true,
      fileId,
      url: base64Data,
      directUrl: fileUrl,
      filename: originalName,
      size: sizeBytes,
      mimeType,
      bucketId,
    });
  } catch (err) {
    console.error('Storage upload error:', err);
    res.status(500).json({ error: 'Failed to store image in database', details: err.message });
  }
});

router.get('/storage/file/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const fileRes = await query('SELECT * FROM storage_files WHERE id = $1;', [id]);
    
    if (fileRes.rows.length === 0) {
      return res.status(404).send('File not found in storage');
    }

    const file = fileRes.rows[0];
    if (file.data && file.data.startsWith('data:')) {
      const matches = file.data.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
      if (matches && matches.length === 3) {
        const contentType = matches[1];
        const buffer = Buffer.from(matches[2], 'base64');
        res.setHeader('Content-Type', contentType);
        res.setHeader('Cache-Control', 'public, max-age=31536000');
        return res.send(buffer);
      }
    }

    res.status(400).send('Invalid file format stored');
  } catch (err) {
    console.error('File retrieval error:', err);
    res.status(500).send('Error retrieving file');
  }
});

router.get('/storage/file/:id/download', async (req, res) => {
  try {
    const { id } = req.params;
    const fileRes = await query('SELECT * FROM storage_files WHERE id = $1;', [id]);
    if (fileRes.rows.length === 0) return res.status(404).send('File not found');

    const file = fileRes.rows[0];
    if (file.data && file.data.startsWith('data:')) {
      const matches = file.data.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
      if (matches && matches.length === 3) {
        const buffer = Buffer.from(matches[2], 'base64');
        res.setHeader('Content-Disposition', `attachment; filename="${file.original_name || file.filename}"`);
        res.setHeader('Content-Type', matches[1]);
        return res.send(buffer);
      }
    }
    res.status(400).send('Invalid file data');
  } catch (err) {
    res.status(500).send('Download error');
  }
});

router.get('/storage/files', async (req, res) => {
  try {
    const bucket = req.query.bucket;
    let sql = `
      SELECT id, bucket_id as "bucketId", filename, original_name as "originalName",
             mime_type as "mimeType", size_bytes as "sizeBytes", url, created_at as "createdAt"
      FROM storage_files
    `;
    const params = [];
    if (bucket && bucket !== 'all') {
      sql += ` WHERE bucket_id = $1`;
      params.push(bucket);
    }
    sql += ` ORDER BY created_at DESC;`;
    const result = await query(sql, params);
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching storage files:', err);
    res.status(500).json({ error: err.message });
  }
});

router.delete('/storage/file/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await query('DELETE FROM storage_files WHERE id = $1;', [id]);
    res.json({ success: true });
  } catch (err) {
    console.error('Error deleting storage file:', err);
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// 3. GALLERY PROJECTS CRUD
// ==========================================
router.get('/projects', async (req, res) => {
  try {
    const result = await query(`
      SELECT 
        id, slug, number, client, title, category,
        secondary_categories as "secondaryCategories",
        project_type as "projectType",
        status, location, area, city, architect,
        architect_practice as "architectPractice",
        scope, cost, area_sqft as "areaSqFt", year,
        description, featured, image,
        gallery_images as "galleryImages",
        highlights, specs, display_order as "displayOrder"
      FROM gallery_projects
      ORDER BY display_order ASC, created_at DESC;
    `);
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching projects:', err);
    res.status(500).json({ error: err.message });
  }
});

router.post('/projects', async (req, res) => {
  try {
    const p = req.body;
    const id = p.id || 'proj_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6);
    const slug = p.slug || p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    await query(`
      INSERT INTO gallery_projects (
        id, slug, number, client, title, category, secondary_categories,
        project_type, status, location, area, city, architect, architect_practice,
        scope, cost, area_sqft, year, description, featured, image,
        gallery_images, highlights, specs, display_order
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25)
      ON CONFLICT (id) DO UPDATE SET
        title = EXCLUDED.title,
        category = EXCLUDED.category,
        secondary_categories = EXCLUDED.secondary_categories,
        project_type = EXCLUDED.project_type,
        status = EXCLUDED.status,
        location = EXCLUDED.location,
        area = EXCLUDED.area,
        city = EXCLUDED.city,
        architect = EXCLUDED.architect,
        architect_practice = EXCLUDED.architect_practice,
        scope = EXCLUDED.scope,
        cost = EXCLUDED.cost,
        area_sqft = EXCLUDED.area_sqft,
        year = EXCLUDED.year,
        description = EXCLUDED.description,
        featured = EXCLUDED.featured,
        image = EXCLUDED.image,
        gallery_images = EXCLUDED.gallery_images,
        highlights = EXCLUDED.highlights,
        specs = EXCLUDED.specs,
        updated_at = NOW();
    `, [
      id,
      slug,
      p.number || '.00',
      p.client || null,
      p.title,
      p.category,
      JSON.stringify(p.secondaryCategories || []),
      p.projectType || null,
      p.status || 'Completed',
      p.location || 'Bengaluru, Karnataka',
      p.area || null,
      p.city || 'Bengaluru',
      p.architect || null,
      p.architectPractice || null,
      p.scope || '',
      p.cost || null,
      p.areaSqFt || null,
      p.year || new Date().getFullYear().toString(),
      p.description || '',
      p.featured || false,
      p.image || '',
      JSON.stringify(p.galleryImages || []),
      JSON.stringify(p.highlights || []),
      JSON.stringify(p.specs || []),
      p.displayOrder || 0
    ]);

    await query(`
      INSERT INTO admin_activity_logs (id, type, title, action)
      VALUES ($1, 'gallery', $2, 'Saved Project');
    `, ['log_' + Date.now(), p.title]);

    res.status(201).json({ success: true, id, slug });
  } catch (err) {
    console.error('Error saving project:', err);
    res.status(500).json({ error: err.message });
  }
});

router.put('/projects/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const p = req.body;

    await query(`
      UPDATE gallery_projects SET
        title = COALESCE($1, title),
        category = COALESCE($2, category),
        status = COALESCE($3, status),
        location = COALESCE($4, location),
        scope = COALESCE($5, scope),
        description = COALESCE($6, description),
        image = COALESCE($7, image),
        gallery_images = COALESCE($8, gallery_images),
        featured = COALESCE($9, featured),
        architect = COALESCE($10, architect),
        client = COALESCE($11, client),
        area_sqft = COALESCE($12, area_sqft),
        year = COALESCE($13, year),
        specs = COALESCE($14, specs),
        highlights = COALESCE($15, highlights),
        updated_at = NOW()
      WHERE id = $16;
    `, [
      p.title,
      p.category,
      p.status,
      p.location,
      p.scope,
      p.description,
      p.image,
      p.galleryImages ? JSON.stringify(p.galleryImages) : null,
      p.featured !== undefined ? p.featured : null,
      p.architect,
      p.client,
      p.areaSqFt,
      p.year,
      p.specs ? JSON.stringify(p.specs) : null,
      p.highlights ? JSON.stringify(p.highlights) : null,
      id
    ]);

    await query(`
      INSERT INTO admin_activity_logs (id, type, title, action)
      VALUES ($1, 'gallery', $2, 'Updated Project');
    `, ['log_' + Date.now(), p.title || id]);

    res.json({ success: true });
  } catch (err) {
    console.error('Error updating project:', err);
    res.status(500).json({ error: err.message });
  }
});

router.delete('/projects/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await query('DELETE FROM gallery_projects WHERE id = $1;', [id]);
    
    await query(`
      INSERT INTO admin_activity_logs (id, type, title, action)
      VALUES ($1, 'gallery', $2, 'Deleted Project');
    `, ['log_' + Date.now(), id]);

    res.json({ success: true });
  } catch (err) {
    console.error('Error deleting project:', err);
    res.status(500).json({ error: err.message });
  }
});

router.put('/projects/reorder', async (req, res) => {
  try {
    const { items } = req.body;
    if (Array.isArray(items)) {
      for (const item of items) {
        if (item.id && typeof item.displayOrder === 'number') {
          await query('UPDATE gallery_projects SET display_order = $1 WHERE id = $2;', [item.displayOrder, item.id]);
        }
      }
    }
    res.json({ success: true });
  } catch (err) {
    console.error('Error reordering projects:', err);
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// 4. COMMERCIAL CATALOG CRUD
// ==========================================
router.get('/commercial', async (req, res) => {
  try {
    const result = await query(`
      SELECT 
        id, slug, number, title, category, tagline, description,
        hero_image as "heroImage",
        gallery_images as "galleryImages",
        capabilities, scope, client, architect,
        built_area as "builtArea",
        timeline, status, featured
      FROM commercial_items
      ORDER BY created_at ASC;
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/commercial', async (req, res) => {
  try {
    const item = req.body;
    const id = item.id || 'comm_' + Date.now();
    const slug = item.slug || item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    await query(`
      INSERT INTO commercial_items (
        id, slug, number, title, category, tagline, description,
        hero_image, gallery_images, capabilities, scope, client, architect,
        built_area, timeline, status, featured
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
      ON CONFLICT (id) DO UPDATE SET
        title = EXCLUDED.title,
        category = EXCLUDED.category,
        tagline = EXCLUDED.tagline,
        description = EXCLUDED.description,
        hero_image = EXCLUDED.hero_image,
        gallery_images = EXCLUDED.gallery_images,
        capabilities = EXCLUDED.capabilities,
        scope = EXCLUDED.scope,
        client = EXCLUDED.client,
        architect = EXCLUDED.architect,
        built_area = EXCLUDED.built_area,
        timeline = EXCLUDED.timeline,
        status = EXCLUDED.status,
        featured = EXCLUDED.featured,
        updated_at = NOW();
    `, [
      id, slug, item.number || '01', item.title, item.category, item.tagline || '', item.description || '',
      item.heroImage || '', JSON.stringify(item.galleryImages || []), JSON.stringify(item.capabilities || []),
      JSON.stringify(item.scope || []), item.client || null, item.architect || null,
      item.builtArea || null, item.timeline || null, item.status || 'Active', item.featured || false
    ]);

    await query(`
      INSERT INTO admin_activity_logs (id, type, title, action)
      VALUES ($1, 'commercial', $2, 'Saved Commercial Service');
    `, ['log_' + Date.now(), item.title]);

    res.status(201).json({ success: true, id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/commercial/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const item = req.body;
    await query(`
      UPDATE commercial_items SET
        title = COALESCE($1, title),
        category = COALESCE($2, category),
        tagline = COALESCE($3, tagline),
        description = COALESCE($4, description),
        hero_image = COALESCE($5, hero_image),
        gallery_images = COALESCE($6, gallery_images),
        capabilities = COALESCE($7, capabilities),
        scope = COALESCE($8, scope),
        status = COALESCE($9, status),
        featured = COALESCE($10, featured),
        updated_at = NOW()
      WHERE id = $11;
    `, [
      item.title, item.category, item.tagline, item.description, item.heroImage,
      item.galleryImages ? JSON.stringify(item.galleryImages) : null,
      item.capabilities ? JSON.stringify(item.capabilities) : null,
      item.scope ? JSON.stringify(item.scope) : null,
      item.status, item.featured, id
    ]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/commercial/:id', async (req, res) => {
  try {
    await query('DELETE FROM commercial_items WHERE id = $1;', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// 5. RESIDENTIAL CATALOG CRUD
// ==========================================
router.get('/residential', async (req, res) => {
  try {
    const result = await query(`
      SELECT 
        id, slug, number, title, category, tagline, description,
        hero_image as "heroImage",
        gallery_images as "galleryImages",
        features, specs, client, architect,
        built_area as "builtArea",
        price_per_sqft as "pricePerSqFt",
        timeline, status, featured
      FROM residential_items
      ORDER BY created_at ASC;
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/residential', async (req, res) => {
  try {
    const item = req.body;
    const id = item.id || 'res_' + Date.now();
    const slug = item.slug || item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    await query(`
      INSERT INTO residential_items (
        id, slug, number, title, category, tagline, description,
        hero_image, gallery_images, features, specs, client, architect,
        built_area, price_per_sqft, timeline, status, featured
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
      ON CONFLICT (id) DO UPDATE SET
        title = EXCLUDED.title,
        category = EXCLUDED.category,
        tagline = EXCLUDED.tagline,
        description = EXCLUDED.description,
        hero_image = EXCLUDED.hero_image,
        gallery_images = EXCLUDED.gallery_images,
        features = EXCLUDED.features,
        specs = EXCLUDED.specs,
        client = EXCLUDED.client,
        architect = EXCLUDED.architect,
        built_area = EXCLUDED.built_area,
        price_per_sqft = EXCLUDED.price_per_sqft,
        timeline = EXCLUDED.timeline,
        status = EXCLUDED.status,
        featured = EXCLUDED.featured,
        updated_at = NOW();
    `, [
      id, slug, item.number || '01', item.title, item.category, item.tagline || '', item.description || '',
      item.heroImage || '', JSON.stringify(item.galleryImages || []), JSON.stringify(item.features || []),
      JSON.stringify(item.specs || []), item.client || null, item.architect || null,
      item.builtArea || null, item.pricePerSqFt || null, item.timeline || null, item.status || 'Active', item.featured || false
    ]);

    await query(`
      INSERT INTO admin_activity_logs (id, type, title, action)
      VALUES ($1, 'residential', $2, 'Saved Residential Package');
    `, ['log_' + Date.now(), item.title]);

    res.status(201).json({ success: true, id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/residential/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const item = req.body;
    await query(`
      UPDATE residential_items SET
        title = COALESCE($1, title),
        category = COALESCE($2, category),
        tagline = COALESCE($3, tagline),
        description = COALESCE($4, description),
        hero_image = COALESCE($5, hero_image),
        gallery_images = COALESCE($6, gallery_images),
        features = COALESCE($7, features),
        specs = COALESCE($8, specs),
        status = COALESCE($9, status),
        featured = COALESCE($10, featured),
        updated_at = NOW()
      WHERE id = $11;
    `, [
      item.title, item.category, item.tagline, item.description, item.heroImage,
      item.galleryImages ? JSON.stringify(item.galleryImages) : null,
      item.features ? JSON.stringify(item.features) : null,
      item.specs ? JSON.stringify(item.specs) : null,
      item.status, item.featured, id
    ]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/residential/:id', async (req, res) => {
  try {
    await query('DELETE FROM residential_items WHERE id = $1;', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// 6. TURNKEY & INTERIORS CRUD
// ==========================================
router.get('/turnkey', async (req, res) => {
  try {
    const result = await query(`
      SELECT 
        id, slug, number, title, category, tagline, description,
        hero_image as "heroImage",
        gallery_images as "galleryImages",
        stages, deliverables, client, architect,
        built_area as "builtArea",
        timeline, status, featured
      FROM turnkey_items
      ORDER BY created_at ASC;
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/turnkey', async (req, res) => {
  try {
    const item = req.body;
    const id = item.id || 'turnkey_' + Date.now();
    const slug = item.slug || item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    await query(`
      INSERT INTO turnkey_items (
        id, slug, number, title, category, tagline, description,
        hero_image, gallery_images, stages, deliverables, client, architect,
        built_area, timeline, status, featured
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
      ON CONFLICT (id) DO UPDATE SET
        title = EXCLUDED.title,
        category = EXCLUDED.category,
        tagline = EXCLUDED.tagline,
        description = EXCLUDED.description,
        hero_image = EXCLUDED.hero_image,
        gallery_images = EXCLUDED.gallery_images,
        stages = EXCLUDED.stages,
        deliverables = EXCLUDED.deliverables,
        client = EXCLUDED.client,
        architect = EXCLUDED.architect,
        built_area = EXCLUDED.built_area,
        timeline = EXCLUDED.timeline,
        status = EXCLUDED.status,
        featured = EXCLUDED.featured,
        updated_at = NOW();
    `, [
      id, slug, item.number || '01', item.title, item.category, item.tagline || '', item.description || '',
      item.heroImage || '', JSON.stringify(item.galleryImages || []), JSON.stringify(item.stages || []),
      JSON.stringify(item.deliverables || []), item.client || null, item.architect || null,
      item.builtArea || null, item.timeline || null, item.status || 'Active', item.featured || false
    ]);

    await query(`
      INSERT INTO admin_activity_logs (id, type, title, action)
      VALUES ($1, 'turnkey', $2, 'Saved Turnkey Package');
    `, ['log_' + Date.now(), item.title]);

    res.status(201).json({ success: true, id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/turnkey/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const item = req.body;
    await query(`
      INSERT INTO turnkey_items (
        id, slug, number, title, category, tagline, description,
        hero_image, gallery_images, stages, deliverables, client, architect,
        built_area, timeline, status, featured
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
      ON CONFLICT (id) DO UPDATE SET
        title = EXCLUDED.title,
        category = EXCLUDED.category,
        tagline = EXCLUDED.tagline,
        description = EXCLUDED.description,
        hero_image = EXCLUDED.hero_image,
        gallery_images = EXCLUDED.gallery_images,
        stages = EXCLUDED.stages,
        deliverables = EXCLUDED.deliverables,
        client = EXCLUDED.client,
        architect = EXCLUDED.architect,
        built_area = EXCLUDED.built_area,
        timeline = EXCLUDED.timeline,
        status = EXCLUDED.status,
        featured = EXCLUDED.featured,
        updated_at = NOW();
    `, [
      id, item.slug || id, item.number || '01', item.title, item.category, item.tagline || '', item.description || '',
      item.heroImage || '', JSON.stringify(item.galleryImages || []), JSON.stringify(item.stages || []),
      JSON.stringify(item.deliverables || []), item.client || null, item.architect || null,
      item.builtArea || null, item.timeline || null, item.status || 'Active', item.featured || false
    ]);

    await query(`
      INSERT INTO admin_activity_logs (id, type, title, action)
      VALUES ($1, 'turnkey', $2, 'Updated Turnkey Package');
    `, ['log_' + Date.now(), item.title || id]);

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/turnkey/:id', async (req, res) => {
  try {
    await query('DELETE FROM turnkey_items WHERE id = $1;', [req.params.id]);
    await query(`
      INSERT INTO admin_activity_logs (id, type, title, action)
      VALUES ($1, 'turnkey', $2, 'Deleted Turnkey Package');
    `, ['log_' + Date.now(), req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/interiors', async (req, res) => {
  try {
    const result = await query(`
      SELECT 
        id, slug, number, title, category, space_type as "spaceType", tagline, description,
        hero_image as "heroImage",
        gallery_images as "galleryImages",
        materials, features, client, architect,
        built_area as "builtArea",
        timeline, status, featured
      FROM interior_items
      ORDER BY created_at ASC;
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/interiors', async (req, res) => {
  try {
    const item = req.body;
    const id = item.id || 'int_' + Date.now();
    const slug = item.slug || item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    await query(`
      INSERT INTO interior_items (
        id, slug, number, title, category, space_type, tagline, description,
        hero_image, gallery_images, materials, features, client, architect,
        built_area, timeline, status, featured
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
      ON CONFLICT (id) DO UPDATE SET
        title = EXCLUDED.title,
        category = EXCLUDED.category,
        space_type = EXCLUDED.space_type,
        tagline = EXCLUDED.tagline,
        description = EXCLUDED.description,
        hero_image = EXCLUDED.hero_image,
        gallery_images = EXCLUDED.gallery_images,
        materials = EXCLUDED.materials,
        features = EXCLUDED.features,
        client = EXCLUDED.client,
        architect = EXCLUDED.architect,
        built_area = EXCLUDED.built_area,
        timeline = EXCLUDED.timeline,
        status = EXCLUDED.status,
        featured = EXCLUDED.featured,
        updated_at = NOW();
    `, [
      id, slug, item.number || '01', item.title, item.category, item.spaceType || 'Residential',
      item.tagline || '', item.description || '', item.heroImage || '', JSON.stringify(item.galleryImages || []),
      JSON.stringify(item.materials || []), JSON.stringify(item.features || []), item.client || null, item.architect || null,
      item.builtArea || null, item.timeline || null, item.status || 'Active', item.featured || false
    ]);

    await query(`
      INSERT INTO admin_activity_logs (id, type, title, action)
      VALUES ($1, 'interiors', $2, 'Saved Interior Design Item');
    `, ['log_' + Date.now(), item.title]);

    res.status(201).json({ success: true, id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/interiors/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const item = req.body;
    await query(`
      INSERT INTO interior_items (
        id, slug, number, title, category, space_type, tagline, description,
        hero_image, gallery_images, materials, features, client, architect,
        built_area, timeline, status, featured
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
      ON CONFLICT (id) DO UPDATE SET
        title = EXCLUDED.title,
        category = EXCLUDED.category,
        space_type = EXCLUDED.space_type,
        tagline = EXCLUDED.tagline,
        description = EXCLUDED.description,
        hero_image = EXCLUDED.hero_image,
        gallery_images = EXCLUDED.gallery_images,
        materials = EXCLUDED.materials,
        features = EXCLUDED.features,
        client = EXCLUDED.client,
        architect = EXCLUDED.architect,
        built_area = EXCLUDED.built_area,
        timeline = EXCLUDED.timeline,
        status = EXCLUDED.status,
        featured = EXCLUDED.featured,
        updated_at = NOW();
    `, [
      id, item.slug || id, item.number || '01', item.title, item.category, item.spaceType || 'Residential',
      item.tagline || '', item.description || '', item.heroImage || '', JSON.stringify(item.galleryImages || []),
      JSON.stringify(item.materials || []), JSON.stringify(item.features || []), item.client || null, item.architect || null,
      item.builtArea || null, item.timeline || null, item.status || 'Active', item.featured || false
    ]);

    await query(`
      INSERT INTO admin_activity_logs (id, type, title, action)
      VALUES ($1, 'interiors', $2, 'Updated Interior Design Item');
    `, ['log_' + Date.now(), item.title || id]);

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/interiors/:id', async (req, res) => {
  try {
    await query('DELETE FROM interior_items WHERE id = $1;', [req.params.id]);
    await query(`
      INSERT INTO admin_activity_logs (id, type, title, action)
      VALUES ($1, 'interiors', $2, 'Deleted Interior Design Item');
    `, ['log_' + Date.now(), req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// 7. BLOGS CRUD
// ==========================================
router.get('/blogs', async (req, res) => {
  try {
    const result = await query(`
      SELECT 
        id, slug, title, excerpt, content,
        cover_image as "coverImage",
        cover_image as image,
        category, author, date,
        read_time as "readTime",
        featured, tags
      FROM blogs
      ORDER BY created_at DESC;
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/blogs', async (req, res) => {
  try {
    const b = req.body;
    const id = b.id || 'blog_' + Date.now();
    const slug = b.slug || b.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const coverImg = b.image || b.coverImage || b.cover_image || '/assets/about_hero.jpg';

    await query(`
      INSERT INTO blogs (
        id, slug, title, excerpt, content, cover_image, category,
        author, date, read_time, featured, tags
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      ON CONFLICT (id) DO UPDATE SET
        title = EXCLUDED.title,
        excerpt = EXCLUDED.excerpt,
        content = EXCLUDED.content,
        cover_image = EXCLUDED.cover_image,
        category = EXCLUDED.category,
        featured = EXCLUDED.featured,
        tags = EXCLUDED.tags,
        updated_at = NOW();
    `, [
      id, slug, b.title, b.excerpt || '', b.content || '', coverImg,
      b.category || 'Construction', b.author || 'Perfect Mason Editorial',
      b.date || new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      b.readTime || '5 min read', b.featured || false, JSON.stringify(b.tags || [])
    ]);

    await query(`
      INSERT INTO admin_activity_logs (id, type, title, action)
      VALUES ($1, 'blog', $2, 'Published Blog');
    `, ['log_' + Date.now(), b.title]);

    res.status(201).json({ success: true, id, slug });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/blogs/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const b = req.body;
    const coverImg = b.image || b.coverImage || b.cover_image;

    await query(`
      UPDATE blogs SET
        title = COALESCE($1, title),
        excerpt = COALESCE($2, excerpt),
        content = COALESCE($3, content),
        cover_image = COALESCE($4, cover_image),
        category = COALESCE($5, category),
        featured = COALESCE($6, featured),
        tags = COALESCE($7, tags),
        updated_at = NOW()
      WHERE id = $8;
    `, [
      b.title, b.excerpt, b.content, coverImg, b.category, b.featured,
      b.tags ? JSON.stringify(b.tags) : null, id
    ]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/blogs/:id', async (req, res) => {
  try {
    await query('DELETE FROM blogs WHERE id = $1;', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// 8. ENQUIRIES / QUOTE LEADS
// ==========================================
router.get('/enquiries', async (req, res) => {
  try {
    const result = await query(`
      SELECT 
        id,
        name as "fullName",
        name,
        email,
        phone,
        service_type as "serviceType",
        project_type as "projectType",
        location,
        estimated_area as "estimatedArea",
        budget,
        message,
        status,
        created_at as "createdAt"
      FROM enquiries
      ORDER BY created_at DESC;
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/enquiries', async (req, res) => {
  try {
    const e = req.body;
    const id = e.id || 'enq_' + Date.now();
    const clientName = e.fullName || e.name || 'Anonymous Client';

    await query(`
      INSERT INTO enquiries (
        id, name, email, phone, service_type, project_type,
        location, estimated_area, budget, message, status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      ON CONFLICT (id) DO UPDATE SET
        name = EXCLUDED.name,
        email = EXCLUDED.email,
        phone = EXCLUDED.phone,
        service_type = EXCLUDED.service_type,
        project_type = EXCLUDED.project_type,
        location = EXCLUDED.location,
        estimated_area = EXCLUDED.estimated_area,
        budget = EXCLUDED.budget,
        message = EXCLUDED.message,
        status = EXCLUDED.status;
    `, [
      id, clientName, e.email || '', e.phone || '', e.serviceType || '', e.projectType || '',
      e.location || '', e.estimatedArea || '', e.budget || '', e.message || '', e.status || 'New'
    ]);

    await query(`
      INSERT INTO admin_activity_logs (id, type, title, action)
      VALUES ($1, 'enquiry', $2, 'Received Enquiry');
    `, ['log_' + Date.now(), `Lead from ${clientName} (${e.phone || 'No phone'})`]);

    res.status(201).json({ success: true, id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/enquiries/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    await query('UPDATE enquiries SET status = $1 WHERE id = $2;', [status, id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/enquiries/:id', async (req, res) => {
  try {
    await query('DELETE FROM enquiries WHERE id = $1;', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// 9. WEBSITE SETTINGS
// ==========================================
router.get('/settings', async (req, res) => {
  try {
    const result = await query(`
      SELECT 
        company_name as "companyName",
        company_name as "websiteName",
        tagline, phone, email, address,
        whatsapp_number as "whatsappNumber",
        hero_headline as "heroHeadline",
        hero_subheadline as "heroSubheadline",
        hero_badge as "heroBadge",
        experience_years as "experienceYears",
        projects_completed as "projectsCompleted",
        sqft_delivered as "sqftDelivered",
        on_time_delivery_rate as "onTimeDeliveryRate",
        client_satisfaction_rate as "clientSatisfactionRate",
        about_brief as "aboutBrief",
        working_hours as "workingHours",
        COALESCE(logo_url, '/logo.png') as "logoUrl",
        COALESCE(favicon_url, '/favicon.svg') as "faviconUrl",
        COALESCE(seo_title, 'PERFECT MASON — Luxury Architectural & Turnkey Construction') as "seoTitle",
        COALESCE(seo_description, 'Perfect Mason provides premier architectural design, civil engineering, turnkey luxury villas, and commercial construction across South Bangalore.') as "seoDescription",
        COALESCE(seo_indexing_preference, 'index, follow') as "seoIndexingPreference",
        COALESCE(social_share_image, '/assets/cinematic_grand_estate.jpg') as "socialShareImage",
        COALESCE(social_instagram, 'https://instagram.com') as "socialInstagram",
        COALESCE(social_facebook, 'https://facebook.com') as "socialFacebook",
        COALESCE(social_linkedin, 'https://linkedin.com') as "socialLinkedin",
        COALESCE(social_twitter, 'https://x.com') as "socialTwitter",
        COALESCE(social_youtube, 'https://youtube.com') as "socialYoutube",
        COALESCE(primary_color, '#1d4ed8') as "primaryColor",
        COALESCE(secondary_color, '#d97706') as "secondaryColor",
        COALESCE(font_heading, 'Plus Jakarta Sans') as "fontHeading",
        COALESCE(font_body, 'Inter') as "fontBody",
        COALESCE(default_banner_image, '/assets/cinematic_grand_estate.jpg') as "defaultBannerImage",
        COALESCE(footer_copyright, '© 2026 Perfect Mason. All rights reserved.') as "footerCopyright",
        COALESCE(footer_description, 'Civil engineering, turnkey construction, commercial complexes, luxury residences & interior fit-outs led by certified civil engineering directors.') as "footerDescription",
        COALESCE(footer_badge, 'ISO 9001:2015 CERTIFIED • HIGH-PRECISION ENGINEERING') as "footerBadge",
        COALESCE(footer_legal_note, 'Built with engineering precision & integrity.') as "footerLegalNote"
      FROM website_settings
      WHERE id = 'default';
    `);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Settings not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/settings', async (req, res) => {
  try {
    const s = req.body;
    const companyName = s.companyName ?? s.websiteName;

    await query(`
      UPDATE website_settings SET
        company_name = COALESCE($1, company_name),
        tagline = COALESCE($2, tagline),
        phone = COALESCE($3, phone),
        email = COALESCE($4, email),
        address = COALESCE($5, address),
        whatsapp_number = COALESCE($6, whatsapp_number),
        hero_headline = COALESCE($7, hero_headline),
        hero_subheadline = COALESCE($8, hero_subheadline),
        hero_badge = COALESCE($9, hero_badge),
        experience_years = COALESCE($10, experience_years),
        projects_completed = COALESCE($11, projects_completed),
        sqft_delivered = COALESCE($12, sqft_delivered),
        on_time_delivery_rate = COALESCE($13, on_time_delivery_rate),
        client_satisfaction_rate = COALESCE($14, client_satisfaction_rate),
        about_brief = COALESCE($15, about_brief),
        working_hours = COALESCE($16, working_hours),
        logo_url = COALESCE($17, logo_url),
        favicon_url = COALESCE($18, favicon_url),
        seo_title = COALESCE($19, seo_title),
        seo_description = COALESCE($20, seo_description),
        seo_indexing_preference = COALESCE($21, seo_indexing_preference),
        social_share_image = COALESCE($22, social_share_image),
        social_instagram = COALESCE($23, social_instagram),
        social_facebook = COALESCE($24, social_facebook),
        social_linkedin = COALESCE($25, social_linkedin),
        social_twitter = COALESCE($26, social_twitter),
        social_youtube = COALESCE($27, social_youtube),
        primary_color = COALESCE($28, primary_color),
        secondary_color = COALESCE($29, secondary_color),
        font_heading = COALESCE($30, font_heading),
        font_body = COALESCE($31, font_body),
        default_banner_image = COALESCE($32, default_banner_image),
        footer_copyright = COALESCE($33, footer_copyright),
        footer_description = COALESCE($34, footer_description),
        footer_badge = COALESCE($35, footer_badge),
        footer_legal_note = COALESCE($36, footer_legal_note),
        updated_at = NOW()
      WHERE id = 'default';
    `, [
      companyName, s.tagline, s.phone, s.email, s.address, s.whatsappNumber,
      s.heroHeadline, s.heroSubheadline, s.heroBadge, s.experienceYears,
      s.projectsCompleted, s.sqftDelivered, s.onTimeDeliveryRate,
      s.clientSatisfactionRate, s.aboutBrief, s.workingHours,
      s.logoUrl, s.faviconUrl, s.seoTitle, s.seoDescription,
      s.seoIndexingPreference, s.socialShareImage, s.socialInstagram,
      s.socialFacebook, s.socialLinkedin, s.socialTwitter, s.socialYoutube,
      s.primaryColor, s.secondaryColor, s.fontHeading, s.fontBody,
      s.defaultBannerImage, s.footerCopyright, s.footerDescription,
      s.footerBadge, s.footerLegalNote
    ]);

    // Record audit log
    try {
      await query(`
        INSERT INTO admin_activity_logs (id, type, title, action, timestamp)
        VALUES ($1, 'settings', 'Global Website Settings', 'Updated General, SEO, and Branding configuration', NOW())
        ON CONFLICT (id) DO NOTHING;
      `, ['log_settings_' + Date.now()]);
    } catch (_) {}

    res.json({ success: true, message: 'Settings successfully updated in PostgreSQL' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// 10. ADMIN ACTIVITY LOGS
// ==========================================
router.get('/activity', async (req, res) => {
  try {
    const result = await query(`
      SELECT id, type, title, action, timestamp
      FROM admin_activity_logs
      ORDER BY timestamp DESC
      LIMIT 100;
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// 11. MASTER CATALOG RESET (RE-SEED DB)
// ==========================================
router.post('/reset-master', async (req, res) => {
  try {
    await query('TRUNCATE gallery_projects, commercial_items, residential_items, turnkey_items, interior_items, blogs CASCADE;');
    await runMigrations();
    res.json({ success: true, message: 'Master catalog successfully reset and re-seeded from PostgreSQL.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// 12. PAGE CONTENTS CRUD (Visual Website Page Manager)
// ==========================================
router.get('/pages', async (req, res) => {
  try {
    const result = await query(`
      SELECT 
        page_id as "pageId", 
        page_title as "pageTitle", 
        data, 
        draft_data as "draftData",
        COALESCE(has_draft, false) as "hasDraft",
        status, 
        updated_at as "updatedAt",
        draft_updated_at as "draftUpdatedAt"
      FROM page_contents 
      ORDER BY page_title ASC;
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/pages/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await query(`
      SELECT 
        page_id as "pageId", 
        page_title as "pageTitle", 
        data, 
        draft_data as "draftData",
        COALESCE(has_draft, false) as "hasDraft",
        status, 
        updated_at as "updatedAt",
        draft_updated_at as "draftUpdatedAt"
      FROM page_contents 
      WHERE page_id = $1;
    `, [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Page content not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/pages/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { pageTitle, data, draftData, status, action = 'publish' } = req.body;
    const now = new Date();

    if (action === 'draft' || status === 'Draft') {
      // 1. SAVE DRAFT: Update draft_data only; keep published data completely unchanged
      const contentToDraft = draftData || data || {};
      await query(`
        INSERT INTO page_contents (page_id, page_title, data, draft_data, has_draft, status, draft_updated_at)
        VALUES ($1, $2, $3, $4, true, 'Draft', NOW())
        ON CONFLICT (page_id) DO UPDATE SET
          page_title = COALESCE(EXCLUDED.page_title, page_contents.page_title),
          draft_data = EXCLUDED.draft_data,
          has_draft = true,
          draft_updated_at = NOW();
      `, [id, pageTitle || id, JSON.stringify(contentToDraft), JSON.stringify(contentToDraft)]);

      await query(`
        INSERT INTO admin_activity_logs (id, type, title, action)
        VALUES ($1, 'draft', $2, 'Saved Draft Edits');
      `, ['log_' + Date.now(), pageTitle || id]);

      return res.json({
        success: true,
        pageId: id,
        action: 'draft',
        hasDraft: true,
        draftUpdatedAt: now.toISOString(),
        message: 'Draft saved successfully without affecting published content.'
      });
    }

    if (action === 'discard_draft') {
      // 2. DISCARD DRAFT: Clear draft_data and reset has_draft flag
      await query(`
        UPDATE page_contents 
        SET draft_data = NULL, has_draft = false, draft_updated_at = NULL 
        WHERE page_id = $1;
      `, [id]);

      return res.json({
        success: true,
        pageId: id,
        action: 'discard_draft',
        hasDraft: false,
        message: 'Draft discarded. Reverted to published content.'
      });
    }

    // 3. PUBLISH: Commit content to live 'data', clear draft flag, and mark as Published
    const contentToPublish = data || draftData || {};
    await query(`
      INSERT INTO page_contents (page_id, page_title, data, draft_data, has_draft, status, updated_at, draft_updated_at)
      VALUES ($1, $2, $3, NULL, false, 'Published', NOW(), NULL)
      ON CONFLICT (page_id) DO UPDATE SET
        page_title = COALESCE(EXCLUDED.page_title, page_contents.page_title),
        data = EXCLUDED.data,
        draft_data = NULL,
        has_draft = false,
        status = 'Published',
        updated_at = NOW(),
        draft_updated_at = NULL;
    `, [id, pageTitle || id, JSON.stringify(contentToPublish)]);

    await query(`
      INSERT INTO admin_activity_logs (id, type, title, action)
      VALUES ($1, 'page', $2, 'Published Content Live');
    `, ['log_' + Date.now(), pageTitle || id]);

    res.json({
      success: true,
      pageId: id,
      action: 'publish',
      status: 'Published',
      hasDraft: false,
      updatedAt: now.toISOString(),
      message: 'Page content published live across website.'
    });
  } catch (err) {
    console.error('Error in /pages/:id:', err);
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// 13. TESTIMONIALS / CLIENT REVIEWS CRUD
// ==========================================
router.get('/testimonials', async (req, res) => {
  try {
    const result = await query(`
      SELECT 
        id, type, client_name as "clientName", service, category,
        location, quote, rating, avatar, image, featured,
        display_order as "displayOrder", created_at as "createdAt"
      FROM testimonials
      ORDER BY display_order ASC, created_at DESC;
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/testimonials', async (req, res) => {
  try {
    const t = req.body;
    const id = t.id || 'rev_' + Date.now();
    await query(`
      INSERT INTO testimonials (
        id, type, client_name, service, category, location, quote, rating, avatar, image, featured, display_order
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      ON CONFLICT (id) DO UPDATE SET
        client_name = EXCLUDED.client_name,
        service = EXCLUDED.service,
        category = EXCLUDED.category,
        location = EXCLUDED.location,
        quote = EXCLUDED.quote,
        rating = EXCLUDED.rating,
        avatar = EXCLUDED.avatar,
        image = EXCLUDED.image,
        featured = EXCLUDED.featured,
        display_order = EXCLUDED.display_order;
    `, [
      id, t.type || 'standard', t.clientName, t.service || '', t.category || 'General',
      t.location || 'Bengaluru, Karnataka', t.quote, t.rating || 5, t.avatar || '',
      t.image || '', t.featured || false, t.displayOrder || 0
    ]);
    res.status(201).json({ success: true, id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/testimonials/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const t = req.body;
    await query(`
      UPDATE testimonials SET
        client_name = COALESCE($1, client_name),
        service = COALESCE($2, service),
        category = COALESCE($3, category),
        location = COALESCE($4, location),
        quote = COALESCE($5, quote),
        rating = COALESCE($6, rating),
        avatar = COALESCE($7, avatar),
        image = COALESCE($8, image),
        featured = COALESCE($9, featured),
        type = COALESCE($10, type)
      WHERE id = $11;
    `, [t.clientName, t.service, t.category, t.location, t.quote, t.rating, t.avatar, t.image, t.featured, t.type, id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/testimonials/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await query('DELETE FROM testimonials WHERE id = $1;', [id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// 14. AI CHAT CONVERSATIONS LOGGING
// ==========================================
router.get('/ai/conversations', async (req, res) => {
  try {
    const result = await query(`
      SELECT 
        id, visitor_name as "visitorName", visitor_phone as "visitorPhone",
        project_type as "projectType", location, budget, timeline,
        summary, messages, status, created_at as "createdAt", updated_at as "updatedAt"
      FROM ai_chat_sessions
      ORDER BY updated_at DESC;
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/ai/conversations', async (req, res) => {
  try {
    const c = req.body;
    const id = c.id || 'chat_' + Date.now();
    await query(`
      INSERT INTO ai_chat_sessions (
        id, visitor_name, visitor_phone, project_type, location, budget, timeline, summary, messages, status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      ON CONFLICT (id) DO UPDATE SET
        visitor_name = COALESCE(EXCLUDED.visitor_name, ai_chat_sessions.visitor_name),
        visitor_phone = COALESCE(EXCLUDED.visitor_phone, ai_chat_sessions.visitor_phone),
        project_type = COALESCE(EXCLUDED.project_type, ai_chat_sessions.project_type),
        location = COALESCE(EXCLUDED.location, ai_chat_sessions.location),
        budget = COALESCE(EXCLUDED.budget, ai_chat_sessions.budget),
        timeline = COALESCE(EXCLUDED.timeline, ai_chat_sessions.timeline),
        summary = COALESCE(EXCLUDED.summary, ai_chat_sessions.summary),
        messages = EXCLUDED.messages,
        status = COALESCE(EXCLUDED.status, ai_chat_sessions.status),
        updated_at = NOW();
    `, [
      id, c.visitorName || null, c.visitorPhone || null, c.projectType || null,
      c.location || null, c.budget || null, c.timeline || null, c.summary || null,
      JSON.stringify(c.messages || []), c.status || 'New'
    ]);
    res.json({ success: true, id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/ai/conversations/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    await query('UPDATE ai_chat_sessions SET status = $1, updated_at = NOW() WHERE id = $2;', [status, id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// 15. AI CUSTOMER ASSISTANT
// ==========================================
router.post('/ai/chat', async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'messages array is required' });
    }

    const aiResponse = await processAiChat(messages);
    res.json({
      success: true,
      ...aiResponse,
    });
  } catch (err) {
    console.error('AI chat endpoint error:', err);
    res.status(500).json({
      success: false,
      error: 'An error occurred while communicating with the AI Assistant.',
    });
  }
});

// Mount router under both '/api' and '/'
app.use('/api', router);
app.use('/', router);

export default app;
