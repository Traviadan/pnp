import { CharactersContainer } from '@/components/character/CharactersContainer';

export default async function HeroesPage({
  searchParams,
}:{
  searchParams:{layout?: string; search?: string };
}) {
  const layout = searchParams.layout || 'grid';
  const search = searchParams.search || '';
  
  return <CharactersContainer layout={layout} search={search} />;
}
