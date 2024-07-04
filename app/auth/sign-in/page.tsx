import AuthForm from '@/components/auth-form';
import { verifyAuth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function SignIn({
  searchParams,
}: {
  searchParams: { mode: string | undefined };
}) {
  const formMode = searchParams.mode || 'login';
  
  return (
    <main>
      <h1 className="text-4xl font-bold text-awi-blue mb-6">
        PnP - Login
      </h1>
      <AuthForm mode={formMode} />
    </main>
  );
}