import { redirect } from 'next/navigation';
import { LuLayoutGrid, LuList } from 'react-icons/lu';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { CharactersContainer } from '@/components/character/CharactersContainer';
import { fetchAllCharacters } from '@/actions/character-actions';

export default async function HeroesPage({
  searchParams,
}:{
  searchParams:{layout?: string; search?: string };
}) {
  const layout = searchParams.layout || 'grid';
  const search = searchParams.search || '';
  
  return <CharactersContainer layout={layout} search={search} />;
}
