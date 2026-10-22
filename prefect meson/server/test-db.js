import { pool, testDatabaseConnection } from './db.js';

async function testConnection() {
  const host = process.env.DB_HOST || process.env.PG_HOST || '127.0.0.1';
  const port = process.env.DB_PORT || process.env.PG_PORT || '5432';
  const db = process.env.DB_NAME || process.env.PG_DATABASE || 'perfe392';
  
  console.log(`Connecting to PostgreSQL at ${host}:${port} (${db})...`);
  try {
    const client = await pool.connect();
    console.log(`✅ Successfully connected to PostgreSQL database: ${db}`);
    
    const versionRes = await client.query('SELECT version();');
    console.log('PostgreSQL Version:', versionRes.rows[0].version);

    const tablesRes = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public';
    `);
    console.log('Existing tables in public schema:', tablesRes.rows.map(r => r.table_name));

    client.release();
    await pool.end();
  } catch (err) {
    console.error('❌ Connection error:', err.message, err.stack);
    process.exit(1);
  }
}

testConnection();
