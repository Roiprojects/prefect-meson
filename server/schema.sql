-- PERFECT MASON POSTGRESQL PRODUCTION SCHEMA
-- Database: perfe392 (localhost / 127.0.0.1)

-- 1. Storage Buckets & Storage Files (Direct PostgreSQL Storage)
CREATE TABLE IF NOT EXISTS storage_buckets (
  id VARCHAR(64) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS storage_files (
  id VARCHAR(64) PRIMARY KEY,
  bucket_id VARCHAR(64) REFERENCES storage_buckets(id) ON DELETE CASCADE,
  filename VARCHAR(255) NOT NULL,
  original_name VARCHAR(255),
  mime_type VARCHAR(128),
  size_bytes BIGINT,
  data TEXT, -- Base64 data URI or byte representation
  url TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Gallery Projects Table
CREATE TABLE IF NOT EXISTS gallery_projects (
  id VARCHAR(128) PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  number VARCHAR(32),
  client VARCHAR(255),
  title VARCHAR(255) NOT NULL,
  category VARCHAR(64) NOT NULL,
  secondary_categories JSONB DEFAULT '[]'::jsonb,
  project_type VARCHAR(255),
  status VARCHAR(64) DEFAULT 'Completed',
  location VARCHAR(255),
  area VARCHAR(255),
  city VARCHAR(128),
  architect VARCHAR(255),
  architect_practice VARCHAR(255),
  scope TEXT,
  cost VARCHAR(128),
  area_sqft VARCHAR(128),
  year VARCHAR(64),
  description TEXT,
  featured BOOLEAN DEFAULT false,
  image TEXT,
  gallery_images JSONB DEFAULT '[]'::jsonb,
  highlights JSONB DEFAULT '[]'::jsonb,
  specs JSONB DEFAULT '[]'::jsonb,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Commercial Items Table
CREATE TABLE IF NOT EXISTS commercial_items (
  id VARCHAR(128) PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  number VARCHAR(32),
  title VARCHAR(255) NOT NULL,
  category VARCHAR(128) NOT NULL,
  tagline TEXT,
  description TEXT,
  hero_image TEXT,
  gallery_images JSONB DEFAULT '[]'::jsonb,
  capabilities JSONB DEFAULT '[]'::jsonb,
  scope JSONB DEFAULT '[]'::jsonb,
  client VARCHAR(255),
  architect VARCHAR(255),
  built_area VARCHAR(128),
  timeline VARCHAR(128),
  status VARCHAR(64) DEFAULT 'Active',
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Residential Items Table
CREATE TABLE IF NOT EXISTS residential_items (
  id VARCHAR(128) PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  number VARCHAR(32),
  title VARCHAR(255) NOT NULL,
  category VARCHAR(128) NOT NULL,
  tagline TEXT,
  description TEXT,
  hero_image TEXT,
  gallery_images JSONB DEFAULT '[]'::jsonb,
  features JSONB DEFAULT '[]'::jsonb,
  specs JSONB DEFAULT '[]'::jsonb,
  client VARCHAR(255),
  architect VARCHAR(255),
  built_area VARCHAR(128),
  price_per_sqft VARCHAR(128),
  timeline VARCHAR(128),
  status VARCHAR(64) DEFAULT 'Active',
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Turnkey Items Table
CREATE TABLE IF NOT EXISTS turnkey_items (
  id VARCHAR(128) PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  number VARCHAR(32),
  title VARCHAR(255) NOT NULL,
  category VARCHAR(128) NOT NULL,
  tagline TEXT,
  description TEXT,
  hero_image TEXT,
  gallery_images JSONB DEFAULT '[]'::jsonb,
  stages JSONB DEFAULT '[]'::jsonb,
  deliverables JSONB DEFAULT '[]'::jsonb,
  client VARCHAR(255),
  architect VARCHAR(255),
  built_area VARCHAR(128),
  timeline VARCHAR(128),
  status VARCHAR(64) DEFAULT 'Active',
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Interior Items Table
CREATE TABLE IF NOT EXISTS interior_items (
  id VARCHAR(128) PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  number VARCHAR(32),
  title VARCHAR(255) NOT NULL,
  category VARCHAR(128) NOT NULL,
  space_type VARCHAR(64) DEFAULT 'Residential',
  tagline TEXT,
  description TEXT,
  hero_image TEXT,
  gallery_images JSONB DEFAULT '[]'::jsonb,
  materials JSONB DEFAULT '[]'::jsonb,
  features JSONB DEFAULT '[]'::jsonb,
  client VARCHAR(255),
  architect VARCHAR(255),
  built_area VARCHAR(128),
  timeline VARCHAR(128),
  status VARCHAR(64) DEFAULT 'Active',
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Blogs Table
CREATE TABLE IF NOT EXISTS blogs (
  id VARCHAR(128) PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  excerpt TEXT,
  content TEXT,
  cover_image TEXT,
  category VARCHAR(128),
  author VARCHAR(128),
  date VARCHAR(64),
  read_time VARCHAR(64),
  featured BOOLEAN DEFAULT false,
  tags JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Customer Enquiries & Quotes Table
CREATE TABLE IF NOT EXISTS enquiries (
  id VARCHAR(128) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(64) NOT NULL,
  service_type VARCHAR(128),
  project_type VARCHAR(128),
  location VARCHAR(255),
  estimated_area VARCHAR(128),
  budget VARCHAR(128),
  message TEXT,
  status VARCHAR(64) DEFAULT 'New',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Website Global Settings Table
CREATE TABLE IF NOT EXISTS website_settings (
  id VARCHAR(64) PRIMARY KEY DEFAULT 'default',
  company_name VARCHAR(255) NOT NULL DEFAULT 'PERFECT MASON',
  tagline VARCHAR(255) DEFAULT 'ARCHITECTURAL & TURNKEY CONSTRUCTION',
  phone VARCHAR(64) DEFAULT '+91 98863 29424',
  email VARCHAR(255) DEFAULT 'contact@perfectmason.com',
  address TEXT DEFAULT 'AECS Layout, Hosur Main Road, Bengaluru, Karnataka 560068',
  whatsapp_number VARCHAR(64) DEFAULT '+919886329424',
  hero_headline TEXT DEFAULT 'Turnkey Architectural & Civil Construction Excellence',
  hero_subheadline TEXT DEFAULT 'Engineered precision, itemized BOQ billing, and flawless execution for luxury villas, commercial towers, and turnkey interiors.',
  hero_badge VARCHAR(255) DEFAULT 'ISO 9001:2015 CERTIFIED • HIGH-PRECISION ENGINEERING',
  experience_years VARCHAR(64) DEFAULT '18+',
  projects_completed VARCHAR(64) DEFAULT '150+',
  sqft_delivered VARCHAR(64) DEFAULT '1.5M+',
  on_time_delivery_rate VARCHAR(64) DEFAULT '99.4%',
  client_satisfaction_rate VARCHAR(64) DEFAULT '100%',
  about_brief TEXT DEFAULT 'Perfect Mason is one of the finest architectural and turnkey construction firms in South Bangalore, delivering high-precision residential estates, commercial spaces, industrial buildings & detailed interiors across Bangalore.',
  working_hours VARCHAR(128) DEFAULT 'Mon - Sat: 9:00 AM - 7:00 PM',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. Admin Activity Logs Table
CREATE TABLE IF NOT EXISTS admin_activity_logs (
  id VARCHAR(128) PRIMARY KEY,
  type VARCHAR(64) NOT NULL,
  title VARCHAR(255) NOT NULL,
  action VARCHAR(255) NOT NULL,
  timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- Create helpful indexes
CREATE INDEX IF NOT EXISTS idx_gallery_category ON gallery_projects(category);
CREATE INDEX IF NOT EXISTS idx_gallery_featured ON gallery_projects(featured);
CREATE INDEX IF NOT EXISTS idx_blogs_category ON blogs(category);
CREATE INDEX IF NOT EXISTS idx_enquiries_status ON enquiries(status);
CREATE INDEX IF NOT EXISTS idx_storage_bucket ON storage_files(bucket_id);
