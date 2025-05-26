import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

// For Cloudflare D1
export default {
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  driver: 'd1',
  dbCredentials: {
    wranglerConfigPath: 'wrangler.jsonc',
    dbName: 'baladera-db',
  },
  verbose: true,
  strict: true,
  // Ensure compatibility with Cloudflare D1
  dialect: 'sqlite',
} satisfies Config;
