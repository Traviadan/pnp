import {
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuPortal
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { publicLinks, privateLinks, adminLinks } from '@/lib/links';
import { isAuthenticated, isAdminUser } from "@/lib/helper";
import { DropdownMenuContainer } from './DropdownMenuContainer';

async function LinksDropdown() {
  const isAuth = await isAuthenticated();
  const isAdmin = await isAdminUser();

  return (
    <DropdownMenuContainer authenticated={isAuth}>
      {publicLinks.map((link) => {
        const { href, label } = link;
        return (
          <DropdownMenuItem key={href} asChild>
          <Link href={href} className='capitalize w-full cursor-pointer'>
            {label}
          </Link>
        </DropdownMenuItem>
        );
      })}
      {privateLinks.map((link) => {
        const { href, label } = link;
        if (!isAuth) return null;
        return (
          <DropdownMenuItem key={href} asChild>
          <Link href={href} className='capitalize w-full cursor-pointer'>
            {label}
          </Link>
        </DropdownMenuItem>
        );
      })}
      {isAdmin ? 
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            Admin
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              {adminLinks.map((link) => {
              const { href, label } = link;
              return (
                <DropdownMenuItem key={href} asChild>
                  <Link href={href} className='capitalize w-full cursor-pointer'>
                    {label}
                  </Link>
                </DropdownMenuItem>
                );
              })}
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        : ''
      }
    </DropdownMenuContainer>
  );
}
export default LinksDropdown;