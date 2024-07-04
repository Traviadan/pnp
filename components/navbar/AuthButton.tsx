import { Button } from '@/components/ui/button';
import { verifyAuth } from '@/lib/auth';
import Link from 'next/link'

export const AuthButton = async () => {
  const auth = await verifyAuth();
  if (!auth.user) {
    return (
      <Button type='button' className='mt-8 capitalize'>
        <Link href='/auth/sign-in'>login</Link>
      </Button>
    );
  }
  else {
    return (
      <Button type='button' className='mt-8 capitalize'>
        <Link href='/api/auth/sign-out'>logout</Link>
      </Button>
    );
  }
};
