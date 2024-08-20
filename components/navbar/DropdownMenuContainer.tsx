'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuGroup
} from '@/components/ui/dropdown-menu';
import { LuAlignLeft } from 'react-icons/lu';
import { Button } from '../ui/button';
import UserIcon from './UserIcon';
import { SignInButton, SignOutButton } from '../form/Buttons';
import Link from 'next/link'
import { useState } from 'react'

export const DropdownMenuContainer = ({
    authenticated,
    children
  }: {
    authenticated: boolean;
    children: React.ReactNode;
  }) => {
    const [open, setOpen] = useState(false)

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' className='flex gap-4 max-w-[100px]'>
          <LuAlignLeft className='w-6 h-6' />
          <UserIcon />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className='w-40' align='start' sideOffset={10}>
        {children}
        <DropdownMenuSeparator />
        <DropdownMenuItem key='auth' onClick={() => setOpen(false)}>
          {authenticated ?
            (<SignOutButton>
              <Link href='/auth/sign-out' className='capitalize'>logout</Link>
            </SignOutButton>) :
            (<SignInButton>
              <Link href='/auth/sign-in' className='capitalize'>login</Link>
            </SignInButton>)}
        </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
  );
};