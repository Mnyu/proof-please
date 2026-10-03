import { eq } from 'drizzle-orm';
import { db } from './client';
import { user } from './schema';
import { auth } from '@/lib/auth';

const seedUser = async () => {
  const name = process.env.SEED_USER_NAME;
  const email = process.env.SEED_USER_EMAIL;
  const password = process.env.SEED_USER_PASSWORD;

  if (!name || !email || !password) {
    return null;
  }
  const existingUser = await db.query.user.findFirst({
    where: eq(user.email, email),
  });
  if (existingUser) {
    console.log(`User already exists: ${email}`);
    return existingUser;
  }
  const result = await auth.api.signUpEmail({
    body: {
      email,
      password,
      name,
    },
  });
  return result.user;
};

const seed = async () => {
  console.log('🌱 Seeding database...');
  const user = await seedUser();
  if (!user) {
    console.log('⚠️ Unable to create user. Seeding stopped');
    return;
  }
  console.log('✅ Seed completed');
};

seed()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('❌ Seed failed');
    console.error(error);
    process.exit(1);
  });
