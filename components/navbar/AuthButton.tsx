import { SignInButton, SignOutButton } from '../form/Buttons';
import { verifyAuth } from '@/lib/auth';
import Link from 'next/link'

export const AuthButton = async () => {
  const auth = await verifyAuth();
  if (!auth.user) {
    return (
      <SignInButton>
        <Link href='/auth/sign-in' className='capitalize'>login</Link>
      </SignInButton>
    );
  }
  else {
    return (
      <SignOutButton>
        <Link href='/api/auth/sign-out' className='capitalize'>logout</Link>
      </SignOutButton>
    );
  }
};
