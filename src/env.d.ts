/// <reference types="@cloudflare/workers-types" />

interface ImportMetaEnv {
  readonly DATABASE_URL: string;
  readonly DATABASE_AUTH_TOKEN: string;
  readonly CLOUDFLARE_DATABASE_ID: string;
  readonly CLOUDFLARE_ACCOUNT_ID: string;
  readonly CLOUDFLARE_API_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
