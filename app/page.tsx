import AuthForm from '@/components/auth-form';
import { verifyAuth } from '@/lib/auth';
import { OptionCard } from '@/lib/helper';
import { logout } from '@/actions/auth-actions';


export default async function Home({
  searchParams,
}: {
  searchParams: { mode: string | undefined };
}) {
  const auth = await verifyAuth();

  const formMode = searchParams.mode || 'login';

  return (
    <main>
      <h1 className="text-4xl font-bold text-awi-blue mb-6">
        Willkommen bei PnP-App
      </h1>
    </main>
  );
}
