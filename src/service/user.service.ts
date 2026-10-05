import { requireSession } from '@/lib/auth-session';
import { findUserStats } from '@/repository';

const getUserStats = async () => {
  const { user } = await requireSession();
  const stats = await findUserStats(user.id);
  return stats;
};

export { getUserStats };
