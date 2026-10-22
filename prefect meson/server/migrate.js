import { pool } from './db.js';
import { SCHEMA_SQL } from './schema.js';
import { galleryProjects } from './data/galleryData.js';
import { blogsData } from './data/blogsData.js';
import { defaultCommercialItems } from './data/commercialData.js';
import { defaultResidentialItems } from './data/residentialData.js';
import { defaultTurnkeyItems } from './data/turnkeyData.js';
import { defaultInteriorItems } from './data/interiorsData.js';

export async function runMigrations() {
  console.log(' Starting PostgreSQL database migration and schema setup on perfe392...');
  const client = await pool.connect();

  try {
    // 1. Run SQL Schema
    await client.query(SCHEMA_SQL);
    console.log(' All tables and indexes successfully created in PostgreSQL.');

    // 1.1 Non-destructive migration for page_contents draft workflow
    await client.query(`
      ALTER TABLE page_contents ADD COLUMN IF NOT EXISTS draft_data JSONB DEFAULT NULL;
      ALTER TABLE page_contents ADD COLUMN IF NOT EXISTS draft_updated_at TIMESTAMPTZ DEFAULT NULL;
      ALTER TABLE page_contents ADD COLUMN IF NOT EXISTS has_draft BOOLEAN DEFAULT false;
    `);
    console.log(' Verified page_contents draft workflow columns in PostgreSQL.');

    // 2. Initialize Storage Buckets
    const defaultBuckets = [
      { id: 'gallery', name: 'Gallery Media Bucket' },
      { id: 'blogs', name: 'Blog Media Bucket' },
      { id: 'commercial', name: 'Commercial Media Bucket' },
      { id: 'residential', name: 'Residential Media Bucket' },
      { id: 'turnkey', name: 'Turnkey Media Bucket' },
      { id: 'interiors', name: 'Interiors Media Bucket' },
      { id: 'general', name: 'General Media Bucket' },
    ];

    for (const b of defaultBuckets) {
      await client.query(
        `INSERT INTO storage_buckets (id, name) VALUES ($1, $2) ON CONFLICT (id) DO NOTHING;`,
        [b.id, b.name]
      );
    }
    console.log(' Storage buckets initialized in PostgreSQL.');

    // 3. Initialize Website Settings if not present
    const settingsCheck = await client.query('SELECT COUNT(*) FROM website_settings;');
    if (parseInt(settingsCheck.rows[0].count, 10) === 0) {
      await client.query(`
        INSERT INTO website_settings (
          id, company_name, tagline, phone, email, address, whatsapp_number,
          hero_headline, hero_subheadline, hero_badge, experience_years,
          projects_completed, sqft_delivered, on_time_delivery_rate,
          client_satisfaction_rate, about_brief, working_hours
        ) VALUES (
          'default',
          'PERFECT MASON',
          'ARCHITECTURAL & TURNKEY CONSTRUCTION',
          '+91 98863 29424',
          'contact@perfectmason.com',
          'AECS Layout, Hosur Main Road, Bengaluru, Karnataka 560068',
          '+919886329424',
          'Turnkey Architectural & Civil Construction Excellence',
          'Engineered precision, itemized BOQ billing, and flawless execution for luxury villas, commercial towers, and turnkey interiors.',
          'ISO 9001:2015 CERTIFIED • HIGH-PRECISION ENGINEERING',
          '18+',
          '150+',
          '1.5M+',
          '99.4%',
          '100%',
          'Perfect Mason is one of the finest architectural and turnkey construction firms in South Bangalore, delivering high-precision residential estates, commercial spaces, industrial buildings & detailed interiors across Bangalore.',
          'Mon - Sat: 9:00 AM - 7:00 PM'
        );
      `);
      console.log(' Default website settings seeded into PostgreSQL.');
    }

    // Safe non-destructive column additions for expanded settings (General, SEO, Branding & Appearance)
    await client.query(`
      ALTER TABLE website_settings ADD COLUMN IF NOT EXISTS logo_url TEXT DEFAULT '/logo.png';
      ALTER TABLE website_settings ADD COLUMN IF NOT EXISTS favicon_url TEXT DEFAULT '/favicon.svg';
      ALTER TABLE website_settings ADD COLUMN IF NOT EXISTS seo_title TEXT DEFAULT 'PERFECT MASON — Luxury Architectural & Turnkey Construction';
      ALTER TABLE website_settings ADD COLUMN IF NOT EXISTS seo_description TEXT DEFAULT 'Perfect Mason provides premier architectural design, civil engineering, turnkey luxury villas, and commercial construction across South Bangalore.';
      ALTER TABLE website_settings ADD COLUMN IF NOT EXISTS seo_indexing_preference VARCHAR(64) DEFAULT 'index, follow';
      ALTER TABLE website_settings ADD COLUMN IF NOT EXISTS social_share_image TEXT DEFAULT '/assets/cinematic_grand_estate.jpg';
      ALTER TABLE website_settings ADD COLUMN IF NOT EXISTS social_instagram TEXT DEFAULT 'https://instagram.com';
      ALTER TABLE website_settings ADD COLUMN IF NOT EXISTS social_facebook TEXT DEFAULT 'https://facebook.com';
      ALTER TABLE website_settings ADD COLUMN IF NOT EXISTS social_linkedin TEXT DEFAULT 'https://linkedin.com';
      ALTER TABLE website_settings ADD COLUMN IF NOT EXISTS social_twitter TEXT DEFAULT 'https://x.com';
      ALTER TABLE website_settings ADD COLUMN IF NOT EXISTS social_youtube TEXT DEFAULT 'https://youtube.com';
      ALTER TABLE website_settings ADD COLUMN IF NOT EXISTS primary_color VARCHAR(32) DEFAULT '#1d4ed8';
      ALTER TABLE website_settings ADD COLUMN IF NOT EXISTS secondary_color VARCHAR(32) DEFAULT '#d97706';
      ALTER TABLE website_settings ADD COLUMN IF NOT EXISTS font_heading VARCHAR(64) DEFAULT 'Plus Jakarta Sans';
      ALTER TABLE website_settings ADD COLUMN IF NOT EXISTS font_body VARCHAR(64) DEFAULT 'Inter';
      ALTER TABLE website_settings ADD COLUMN IF NOT EXISTS default_banner_image TEXT DEFAULT '/assets/cinematic_grand_estate.jpg';
      ALTER TABLE website_settings ADD COLUMN IF NOT EXISTS footer_copyright TEXT DEFAULT '© 2026 Perfect Mason. All rights reserved.';
      ALTER TABLE website_settings ADD COLUMN IF NOT EXISTS footer_description TEXT DEFAULT 'Civil engineering, turnkey construction, commercial complexes, luxury residences & interior fit-outs led by certified civil engineering directors.';
      ALTER TABLE website_settings ADD COLUMN IF NOT EXISTS footer_badge TEXT DEFAULT 'ISO 9001:2015 CERTIFIED • HIGH-PRECISION ENGINEERING';
      ALTER TABLE website_settings ADD COLUMN IF NOT EXISTS footer_legal_note TEXT DEFAULT 'Built with engineering precision & integrity.';
    `);

    // 4. Seed Gallery Projects if empty
    const galleryCheck = await client.query('SELECT COUNT(*) FROM gallery_projects;');
    if (parseInt(galleryCheck.rows[0].count, 10) === 0) {
      console.log(' Seeding authentic gallery projects from data catalog...');
      
      for (let i = 0; i < galleryProjects.length; i++) {
        const p = galleryProjects[i];
        await client.query(
          `INSERT INTO gallery_projects (
            id, slug, number, client, title, category, secondary_categories,
            project_type, status, location, area, city, architect, architect_practice,
            scope, cost, area_sqft, year, description, featured, image,
            gallery_images, highlights, specs, display_order
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25)
          ON CONFLICT (id) DO NOTHING;`,
          [
            p.id,
            p.slug || p.id,
            p.number || `.${i.toString().padStart(2, '0')}`,
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
            p.year || null,
            p.description || '',
            p.featured || false,
            p.image || '',
            JSON.stringify(p.galleryImages || []),
            JSON.stringify(p.highlights || []),
            JSON.stringify(p.specs || []),
            i
          ]
        );
      }
      console.log(` Seeded ${galleryProjects.length} gallery projects into PostgreSQL.`);
    }

    // 5. Seed Blogs if empty
    const blogsCheck = await client.query('SELECT COUNT(*) FROM blogs;');
    if (parseInt(blogsCheck.rows[0].count, 10) === 0) {
      console.log(' Seeding blog articles into PostgreSQL...');
      
      for (const b of blogsData) {
        await client.query(
          `INSERT INTO blogs (
            id, slug, title, excerpt, content, cover_image, category,
            author, date, read_time, featured, tags
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
          ON CONFLICT (id) DO NOTHING;`,
          [
            b.id,
            b.slug || b.id,
            b.title,
            b.excerpt || '',
            b.content || '',
            b.coverImage || '',
            b.category || 'Construction',
            b.author || 'Perfect Mason Editorial',
            b.date || 'March 2026',
            b.readTime || '5 min read',
            b.featured || false,
            JSON.stringify(b.tags || [])
          ]
        );
      }
      console.log(` Seeded ${blogsData.length} blogs into PostgreSQL.`);
    }

    // 6. Seed Commercial Items
    const commCheck = await client.query('SELECT COUNT(*) FROM commercial_items;');
    if (parseInt(commCheck.rows[0].count, 10) === 0) {
      console.log(' Seeding complete commercial catalog into PostgreSQL...');
      for (const item of defaultCommercialItems) {
        await client.query(
          `INSERT INTO commercial_items (
            id, slug, number, title, category, tagline, description, hero_image,
            gallery_images, capabilities, scope, client, architect, built_area,
            timeline, status, featured
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
          ON CONFLICT (id) DO NOTHING;`,
          [
            item.id,
            item.slug,
            item.number || '01',
            item.title,
            item.category,
            item.tagline,
            item.description,
            item.heroImage,
            JSON.stringify(item.galleryImages || []),
            JSON.stringify(item.capabilities || []),
            JSON.stringify(item.scope || []),
            item.client,
            item.architect,
            item.builtArea,
            item.timeline,
            item.status,
            item.featured || false
          ]
        );
      }
      console.log(` Seeded ${defaultCommercialItems.length} commercial items into PostgreSQL.`);
    }

    // 7. Seed Residential Items
    const resCheck = await client.query('SELECT COUNT(*) FROM residential_items;');
    if (parseInt(resCheck.rows[0].count, 10) === 0) {
      console.log(' Seeding complete residential catalog into PostgreSQL...');
      for (const item of defaultResidentialItems) {
        await client.query(
          `INSERT INTO residential_items (
            id, slug, number, title, category, tagline, description, hero_image,
            gallery_images, features, specs, client, architect, built_area,
            price_per_sqft, timeline, status, featured
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
          ON CONFLICT (id) DO NOTHING;`,
          [
            item.id,
            item.slug,
            item.number || '01',
            item.title,
            item.category,
            item.tagline,
            item.description,
            item.heroImage,
            JSON.stringify(item.galleryImages || []),
            JSON.stringify(item.features || []),
            JSON.stringify(item.specs || []),
            item.client,
            item.architect,
            item.builtArea,
            item.pricePerSqFt,
            item.timeline,
            item.status,
            item.featured || false
          ]
        );
      }
      console.log(` Seeded ${defaultResidentialItems.length} residential items into PostgreSQL.`);
    }

    // 8. Seed Turnkey Items
    const turnkeyCheck = await client.query('SELECT COUNT(*) FROM turnkey_items;');
    if (parseInt(turnkeyCheck.rows[0].count, 10) === 0) {
      console.log(' Seeding complete turnkey catalog into PostgreSQL...');
      for (const item of defaultTurnkeyItems) {
        await client.query(
          `INSERT INTO turnkey_items (
            id, slug, number, title, category, tagline, description, hero_image,
            gallery_images, stages, deliverables, client, architect, built_area,
            timeline, status, featured
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
          ON CONFLICT (id) DO NOTHING;`,
          [
            item.id,
            item.slug,
            item.number || '01',
            item.title,
            item.category,
            item.tagline,
            item.description,
            item.heroImage,
            JSON.stringify(item.galleryImages || []),
            JSON.stringify(item.stages || []),
            JSON.stringify(item.deliverables || []),
            item.client,
            item.architect,
            item.builtArea,
            item.timeline,
            item.status,
            item.featured || false
          ]
        );
      }
      console.log(` Seeded ${defaultTurnkeyItems.length} turnkey items into PostgreSQL.`);
    }

    // 9. Seed Interior Items
    const interiorCheck = await client.query('SELECT COUNT(*) FROM interior_items;');
    if (parseInt(interiorCheck.rows[0].count, 10) === 0) {
      console.log(' Seeding complete interior catalog into PostgreSQL...');
      for (const item of defaultInteriorItems) {
        await client.query(
          `INSERT INTO interior_items (
            id, slug, number, title, category, space_type, tagline, description, hero_image,
            gallery_images, materials, features, client, architect, built_area,
            timeline, status, featured
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
          ON CONFLICT (id) DO NOTHING;`,
          [
            item.id,
            item.slug,
            item.number || '01',
            item.title,
            item.category,
            item.spaceType || 'Residential',
            item.tagline,
            item.description,
            item.heroImage,
            JSON.stringify(item.galleryImages || []),
            JSON.stringify(item.materials || []),
            JSON.stringify(item.features || []),
            item.client,
            item.architect,
            item.builtArea,
            item.timeline,
            item.status,
            item.featured || false
          ]
        );
      }
      console.log(` Seeded ${defaultInteriorItems.length} interior items into PostgreSQL.`);
    }

    // 10. Seed Blogs Table if empty
    const blogCheck = await client.query('SELECT COUNT(*) FROM blogs;');
    if (parseInt(blogCheck.rows[0].count, 10) === 0) {
      console.log(' Seeding verified architectural blogs into PostgreSQL...');
      for (const blog of blogsData) {
        await client.query(
          `INSERT INTO blogs (
            id, slug, title, excerpt, content, cover_image, category,
            author, date, read_time, featured, tags
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
          ON CONFLICT (id) DO UPDATE SET cover_image = EXCLUDED.cover_image;`,
          [
            blog.id,
            blog.slug,
            blog.title,
            blog.excerpt || '',
            typeof blog.content === 'object' ? JSON.stringify(blog.content) : (blog.content || ''),
            blog.image || '/assets/about_hero.jpg',
            blog.category || 'Architecture',
            blog.author?.name || 'Vikramaditya Sen',
            blog.publishedDate || 'August 2026',
            blog.readTime || '5 min read',
            blog.featured || false,
            JSON.stringify(blog.tags || [])
          ]
        );
      }
      console.log(` Seeded ${blogsData.length} blogs into PostgreSQL.`);
    }

    // 11. Seed Page Contents Table (Visual Website Page Manager) if empty
    const pageCheck = await client.query('SELECT COUNT(*) FROM page_contents;');
    if (parseInt(pageCheck.rows[0].count, 10) === 0) {
      console.log(' Seeding authentic website page sections into PostgreSQL page_contents...');
      const defaultPages = [
        {
          id: 'home',
          title: 'Home Page',
          status: 'Published',
          data: {
            sections: ['Hero Headline', 'Company Intro', 'Corporate Stats', 'Manifesto', 'CTA Banner', 'SEO'],
            description: 'Hero headline, credibility badge, company intro narrative, corporate metrics, trust badges, and CTA banner.'
          }
        },
        {
          id: 'about',
          title: 'About Us',
          status: 'Published',
          data: {
            sections: ['Hero Section', 'Practice Overview', 'Vision & Mission', 'Core Values', 'Collaboration CTA', 'SEO'],
            description: 'Practice foundations, vision, mission statements, core engineering values, leadership text, and collaboration CTA.'
          }
        },
        {
          id: 'commercial',
          title: 'Commercial Construction',
          status: 'Published',
          data: {
            sections: ['Project Packages', 'Technical Scope', 'Capabilities', 'Galleries', 'Consultation CTA'],
            description: 'G+4 commercial complexes, retail flagship showrooms, PEB industrial builds, and itemized BOQ capabilities.'
          }
        },
        {
          id: 'residential',
          title: 'Residential Construction',
          status: 'Published',
          data: {
            sections: ['Villa Packages', 'Technical Specs', 'Pricing / SqFt', 'Galleries', 'Consultation CTA'],
            description: 'Luxury contemporary villas, duplexes, multi-storey residences, and turnkey residential packages.'
          }
        },
        {
          id: 'turnkey',
          title: 'Turnkey Projects',
          status: 'Published',
          data: {
            sections: ['5-Stage Process', 'Deliverables', 'Milestones', 'Galleries', 'Warranty Brief'],
            description: '5-stage turnkey lifecycle (Consultation -> Engineering -> Civil -> MEP -> Interiors) and milestone handovers.'
          }
        },
        {
          id: 'interiors',
          title: 'Interiors',
          status: 'Published',
          data: {
            sections: ['Space Types', 'Materials', 'Joinery Features', 'Galleries', 'Snagging Protocol'],
            description: 'Architectural joinery, Italian marble fit-outs, modular kitchens with Blum hardware, and turnkey styling.'
          }
        },
        {
          id: 'gallery',
          title: 'Gallery & Projects',
          status: 'Published',
          data: {
            sections: ['Projects Grid', 'Secondary Tags', 'Hero & Gallery Images', 'Specs', 'Architect Credits'],
            description: 'Full architectural portfolio catalog, project photography, completion status badges, and project details.'
          }
        },
        {
          id: 'testimonials',
          title: 'Testimonials & Reviews',
          status: 'Published',
          data: {
            sections: ['Standard Reviews', 'Featured Client Story', 'Star Ratings', 'Review Avatars'],
            description: 'Client reviews, star ratings, verified client locations, quotes, and featured client story.'
          }
        },
        {
          id: 'contact',
          title: 'Contact Page',
          status: 'Published',
          data: {
            sections: ['Hero & Taglines', 'Verified Contacts', 'Office Location', 'Consultation Steps', 'SEO'],
            description: 'Verified phone numbers, WhatsApp, official office address, landmark, working hours, and consultation intake.'
          }
        },
        {
          id: 'header-footer',
          title: 'Header & Footer',
          status: 'Published',
          data: {
            sections: ['Navbar Elements', 'Footer Brand Info', 'Verified Contacts', 'Social Media Links', 'Copyright'],
            description: 'Global site elements: top navigation bar, contact phone, quote button, verified footer info, and legal copyright.'
          }
        }
      ];

      for (const p of defaultPages) {
        await client.query(
          `INSERT INTO page_contents (page_id, page_title, data, status, updated_at)
           VALUES ($1, $2, $3, $4, NOW())
           ON CONFLICT (page_id) DO NOTHING;`,
          [p.id, p.title, JSON.stringify(p.data), p.status]
        );
      }
      console.log(` Seeded ${defaultPages.length} website pages into PostgreSQL page_contents.`);
    }

    console.log(' All database migrations and authentic data seeding completed successfully!');
  } catch (err) {
    console.error(' Migration Error:', err.message, err.stack);
    throw err;
  } finally {
    client.release();
  }
}

// Run directly if called from CLI
if (process.argv[1] && process.argv[1].endsWith('migrate.js')) {
  runMigrations()
    .then(() => {
      console.log('Migration completed successfully.');
      process.exit(0);
    })
    .catch((err) => {
      console.error('Migration failed:', err);
      process.exit(1);
    });
}
