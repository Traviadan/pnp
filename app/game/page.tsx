import { redirect } from 'next/navigation';
import { verifyAuth } from '@/lib/auth';
import { OptionCard } from '@/lib/helper';

export default async function HeroesPage() {
  const result = await verifyAuth();

  if (!result.user) {
    return redirect('/');
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-awi-blue mb-4">
        Spieldaten bearbeiten
      </h1>
      <p>Folgende Daten können bearbeitet werden:</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <OptionCard
        title="Attribute"
        description="Attribute bearbeiten"
        href="/game/attribute"
      />
      </div>
    </div>
  );
}
