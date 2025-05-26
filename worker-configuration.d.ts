/// <reference types="@cloudflare/workers-types" />

declare global {
  // This adds type definitions for the Cloudflare Workers environment
  namespace NodeJS {
    interface ProcessEnv {
      // Cloudflare D1 Database
      CLOUDFLARE_DATABASE_ID: string;
      CLOUDFLARE_ACCOUNT_ID: string;
      CLOUDFLARE_API_TOKEN: string;
    }
  }

  // Extend the global Cloudflare Worker environment types
  interface Env {
    DB: D1Database;
  }

  // This makes the DB available globally in your Worker
  const DB: D1Database;

  // For Node.js process compatibility in development
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
    }
  }
}

// This makes the file a module
export {};