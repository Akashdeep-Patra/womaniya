import { config } from 'dotenv';
import type { Config } from 'drizzle-kit';

// drizzle-kit doesn't load .env.local automatically — Next.js does, but CLI tools don't
config({ path: '.env.local' });

export default {
  schema:    './db/schema.ts',
  out:       './drizzle',
  dialect:   'postgresql',
  dbCredentials: {
    url: process.env.POSTGRES_URL!,
  },
} satisfies Config;
