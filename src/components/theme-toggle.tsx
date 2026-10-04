'use client';

import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

interface ThemeToggleProps {
  showText: boolean;
}

const ThemeToggle = ({ showText }: ThemeToggleProps) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant='outline' size='icon'>
        <div className='' />
      </Button>
    );
  }

  return (
    <Button
      variant='ghost'
      className='w-full flex items-center justify-start cursor-pointer hover:!bg-sidebar-accent mx-0 px-2'
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      {theme === 'dark' ? <Sun /> : <Moon />}
      {showText && `Switch Theme`}
    </Button>
    // <Button variant='outline' size='icon' onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
    //   {theme === 'dark' ? <Sun className='h-4 w-4' /> : <Moon className='h-4 w-4' />}
    // </Button>
  );
};

export default ThemeToggle;
