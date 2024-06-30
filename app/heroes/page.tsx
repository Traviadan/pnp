import { redirect } from 'next/navigation';
import { verifyAuth } from '@/lib/auth';

export default async function HeroesPage({
  searchParams,
}:{
  searchParams:{layout?: string; search?: string };
}) {
  const layout = searchParams.layout || 'grid';
  const search = searchParams.search || '';
  const result = await verifyAuth();

  if (!result.user) {
    return redirect('/');
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-awi-blue mb-4">
        Charaktere anzeigen
      </h1>
      <p>Hier können Sie alle erstellten Charaktere einsehen.</p>
    </div>
  );
}
