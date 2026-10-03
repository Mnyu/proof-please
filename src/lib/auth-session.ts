import 'server-only';

import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { cache } from 'react';
import { UnauthorizedError } from '@/errors';

const getSession = async () => {
  return auth.api.getSession({
    headers: await headers(),
  });
};

export const requireSession = cache(async () => {
  const session = await getSession();
  if (!session?.user?.id) {
    throw new UnauthorizedError();
  }
  return session;
});

export const requireSessionOrRedirect = cache(async () => {
  const session = await getSession();
  if (!session?.user?.id) {
    redirect('/signin');
  }
  return session;
});

export const redirectIfSessionPresent = async () => {
  const session = await getSession();
  if (session?.user?.id) {
    redirect('/');
  }
  return null;
};
