import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { LuAlignLeft } from 'react-icons/lu';
import Link from 'next/link';
import { Button } from '../ui/button';
import { publicLinks, privateLinks, adminLinks } from '@/lib/links';
import { isAuthenticated, isAdminUser } from "@/lib/helper";
import UserIcon from './UserIcon';
import { AuthButton } from './AuthButton';

async function LinksDropdown() {
  const isAuth = await isAuthenticated();
  const isAdmin = await isAdminUser();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' className='flex gap-4 max-w-[100px]'>
          <LuAlignLeft className='w-6 h-6' />
          <UserIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-40' align='start' sideOffset={10}>
      {publicLinks.map((link) => {
        const { href, label } = link;
        return (
          <DropdownMenuItem key={href}>
          <Link href={href} className='capitalize w-full'>
            {label}
          </Link>
        </DropdownMenuItem>
        );
      })}
      {privateLinks.map((link) => {
        const { href, label } = link;
        if (!isAuth) return null;
        return (
          <DropdownMenuItem key={href}>
          <Link href={href} className='capitalize w-full'>
            {label}
          </Link>
        </DropdownMenuItem>
        );
      })}
      {adminLinks.map((link) => {
        const { href, label } = link;
        if (!isAdmin) return null;
        return (
          <DropdownMenuItem key={href}>
            <Link href={href} className='capitalize w-full'>
              {label}
            </Link>
          </DropdownMenuItem>
          );
      })}
        <DropdownMenuSeparator />
        <AuthButton />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export default LinksDropdown;