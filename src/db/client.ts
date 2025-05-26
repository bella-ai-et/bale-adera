import { drizzle } from 'drizzle-orm/d1';
import * as schema from './schema';

type DbClient = ReturnType<typeof drizzle<typeof schema>>;

let _db: DbClient;

// Use dynamic import.meta.url to get the current module's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

declare global {
  // Add D1Database to the global scope for Cloudflare Workers
  // This is provided by the Cloudflare Workers runtime
  const DB: D1Database | undefined;
}

// Initialize the database client
export function initDb(dbInstance?: D1Database) {
  if (_db) return _db;

  if (typeof DB !== 'undefined' || dbInstance) {
    // Running in Cloudflare Workers environment
    _db = drizzle(dbInstance || DB!, { schema });
  } else {
    // Running in local development/testing
    const sqlite = new Database(path.join(__dirname, '../../local.db'));
    _db = drizzleLocal(sqlite, { schema });
  }
  
  return _db;
}

// Initialize with global DB if available
const db = initDb();

// Export types for type safety
export * from './schema';
