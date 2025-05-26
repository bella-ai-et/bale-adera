import type { ExecutionContext } from '@cloudflare/workers-types';

// Define your environment variables interface
export interface Env {
  // Add your environment variables here
  // Example:
  // DB: D1Database;
  // ENVIRONMENT: 'development' | 'production';
}

export async function createContext({
  req,
  env,
  workerCtx,
}: {
  req: Request;
  env: Env;
  workerCtx: ExecutionContext;
}) {
  return {
    req,
    env,
    workerCtx,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
