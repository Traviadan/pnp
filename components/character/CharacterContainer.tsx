import { CharactersGrid } from './CharactersGrid';
import { CharactersList } from './CharactersList';
import { LuLayoutGrid, LuList } from 'react-icons/lu';
import { Button } from '@/components/ui/button';
import { Separator } from '../ui/separator';
import { fetchAllCharacters } from '@/actions/character-actions';
import Link from 'next/link';

export async function ProductsContainer({
  layout,
  search,
}: {
  layout: string;
  search: string;
}) {
  const characters = await fetchAllCharacters({ search });
  const totalCharacters = characters.length;
  const searchTerm = search ? `&search=${search}` : '';
  return (
    <>
      {/* HEADER */}
      <section>
        <div className='flex justify-between items-center'>
          <h4 className='font-medium text-lg'>
            {totalCharacters} character{totalCharacters > 1 && 's'}
          </h4>
          <div className='flex gap-x-4'>
            <Button
              variant={layout === 'grid' ? 'default' : 'ghost'}
              size='icon'
              asChild
            >
              <Link href={`/heroes?layout=grid${searchTerm}`}>
                <LuLayoutGrid />
              </Link>
            </Button>
            <Button
              variant={layout === 'list' ? 'default' : 'ghost'}
              size='icon'
              asChild
            >
              <Link href={`/heroes?layout=list${searchTerm}`}>
                <LuList />
              </Link>
            </Button>
          </div>
        </div>
        <Separator className='mt-4' />
      </section>
      {/* PRODUCTS */}
      <div>
        {totalCharacters === 0 ? (
          <h5 className='text-2xl mt-16'>
            Sorry, no characters matched your search...
          </h5>
        ) : layout === 'grid' ? (
          <CharactersGrid characters={characters} />
        ) : (
          <CharactersList characters={characters} />
        )}
      </div>
    </>
  );
}