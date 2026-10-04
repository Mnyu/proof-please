import Header from '@/components/header';
import { requireSessionOrRedirect } from '@/lib/auth-session';

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await requireSessionOrRedirect();
  return (
    <>
      <Header user={session.user} />
      <main className='w-full h-full flex flex-col p-3'>{children}</main>;
    </>
  );
  // return (
  //   <SidebarProvider defaultOpen={false}>
  //     <AppSidebar user={session.user} />
  //     <main className='w-full h-full flex flex-col p-3'>{children}</main>
  //   </SidebarProvider>
  // );
}
