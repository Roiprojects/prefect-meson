import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

function createPool() {
  const connectionString =
    process.env.DATABASE_URL || process.env.POSTGRES_URL || process.env.POSTGRESQL_URL;

  const sslEnabled =
    process.env.DB_SSL === 'true' ||
    process.env.PGSSL === 'true' ||
    (connectionString ? connectionString.includes('sslmode=require') : false);

  const resolvedHost =
    process.env.DB_HOST ||
    process.env.PGHOST ||
    process.env.PG_HOST ||
    '127.0.0.1';

  const poolConfig = connectionString
    ? {
        connectionString,
        ssl: sslEnabled ? { rejectUnauthorized: false } : false,
        max: parseInt(process.env.DB_POOL_MAX || '20', 10),
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 5000,
      }
    : {
        host: resolvedHost,
        port: parseInt(process.env.DB_PORT || process.env.PGPORT || process.env.PG_PORT || '5432', 10),
        database: process.env.DB_NAME || process.env.PGDATABASE || process.env.PG_DATABASE || 'perfe392',
        user: process.env.DB_USER || process.env.PGUSER || process.env.PG_USER || 'perfe392',
        password:
          process.env.DB_PASSWORD ||
          process.env.PGPASSWORD ||
          process.env.PG_PASSWORD ||
          '3iBOw13hR4F2HCTFRneit3xsy',
        ssl: sslEnabled ? { rejectUnauthorized: false } : false,
        max: parseInt(process.env.DB_POOL_MAX || '20', 10),
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 5000,
      };

  const p = new Pool(poolConfig);

  p.on('error', (err) => {
    console.error('Unexpected error on idle PostgreSQL client:', err);
  });

  return p;
}

export const pool = globalThis.__pgPoolInstance ?? createPool();

if (process.env.NODE_ENV !== 'production') {
  globalThis.__pgPoolInstance = pool;
}

// Preserve native query method to prevent infinite recursion
const executeQuery = pool.query.bind(pool);

export async function query(text, params) {
  const start = Date.now();
  const res = await executeQuery(text, params);
  const duration = Date.now() - start;
  if (process.env.NODE_ENV === 'development') {
    console.log('[PostgreSQL Query]', { text, rows: res.rowCount, duration: `${duration}ms` });
  }
  return res;
}

export async function testDatabaseConnection() {
  try {
    const client = await pool.connect();
    try {
      const res = await client.query(
        'SELECT current_database() as database, NOW() as server_time, version() as version;'
      );
      const row = res.rows[0];
      return {
        success: true,
        database: row.database,
        serverTime: row.server_time,
        version: row.version,
      };
    } finally {
      client.release();
    }
  } catch (err) {
    console.error('PostgreSQL connection check failed:', err.message);
    return {
      success: false,
      error: err.message,
    };
  }
}

export default Object.assign(pool, {
  query,
  pool,
  testDatabaseConnection,
});
