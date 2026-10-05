'use client';

import Link from 'next/link';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from './ui/navigation-menu';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { User } from 'better-auth';
import ThemeToggle from './themeToggle';
import Logout from './logout';
import { Home, List } from 'lucide-react';
import { Button } from './ui/button';

type HeaderProps = {
  user: User;
};

const Header = ({ user }: HeaderProps) => {
  return (
    <header className='flex items-center justify-between px-2 py-2 border-b'>
      <div className='flex justify-center items-center'>
        <Link className='text-xl xl:text-2xl font-serif' href='/'>
          Proof <span className='text-primary'>Please</span>
        </Link>
      </div>
      {/* <div className=''>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link href='/'>Home</Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link href='/'>How it works</Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link href='/proofs'>Proofs</Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link href='/'>Pricing</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div> */}
      <div className='flex items-center'>
        <Link href={'/'}>
          <Button variant='ghost' className='cursor-pointer p-2'>
            <Home />
          </Button>
        </Link>
        <Link href={'/proofs'}>
          <Button variant='ghost' className='cursor-pointer p-2'>
            <List size={20} />
          </Button>
        </Link>

        <Logout />
        {/* <ThemeToggle showText={false} /> */}
        <Avatar className='h-8 w-8 rounded-xl'>
          <AvatarImage src={user.image ? user.image : ''} alt={user.name} />
          <AvatarFallback className='rounded-xl bg-primary text-primary-foreground'>
            {user.name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};
export default Header;
