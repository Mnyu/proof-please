import { db } from '@/db/client';
import * as schema from '@/db/schema';
import { apiKey } from '@better-auth/api-key';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: 'pg', schema: schema }),
  emailAndPassword: { enabled: true },
  plugins: [
    apiKey({
      requireName: true,
      rateLimit: {
        enabled: false, // TODO : fix this
      },
    }),
  ],
});
