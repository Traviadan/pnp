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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <OptionCard
          title="Charaktere anzeigen"
          description="Zeige alle erstellten Charaktere"
          href="/heroes"
        />
        <OptionCard
          title="Neuen Charakter erstellen"
          description="Erstelle einen brandneuen Charakter"
          href="/create-hero"
        />
        <OptionCard
          title="Spieldaten bearbeiten"
          description="Grundeinstellungen der Spielwelt"
          href="/game"
        />
        <OptionCard
          title="Benutzereinstellungen"
          description="Verwalte deine Benutzereinstellungen"
          href="/user-settings"
        />
      </div>
      {auth && !auth.user ? (
        <AuthForm mode={formMode} />
      ) : (
        <header id="auth-header">
          <p>Welcome {auth.session.userId}</p>
        </header>
      )}
    </main>
  );
}
