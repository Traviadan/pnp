import { OptionCard } from '@/lib/helper';
import { CardContainer } from '@/components/global/CardContainer';

export default async function HeroesPage() {
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
        href="/game/attributes"
      />
      </div>
    </div>
  );
}
