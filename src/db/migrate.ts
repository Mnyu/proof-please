import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { db } from './client';

await migrate(db, {
  migrationsFolder: './src/db/migrations',
});

process.exit(0);
