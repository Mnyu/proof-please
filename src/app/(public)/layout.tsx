import { redirectIfSessionPresent } from '@/lib/auth-session';

export default async function PublicAuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await redirectIfSessionPresent();
  return <>{children}</>;
}
