import { GameAttributesGrid } from './GameAttributesGrid';
import { GameAttributesList } from './GameAttributesList';
import { LuLayoutGrid, LuList } from 'react-icons/lu';
import { Button } from '@/components/ui/button';
import { Separator } from '../ui/separator';
import { fetchAllGameAttributes } from '@/actions/attribute-actions';
import Link from 'next/link';

export async function GameAttributesContainer({
  layout,
  search,
}: {
  layout: string;
  search: string;
}) {
  const attributes = await fetchAllGameAttributes({ search });
  const totalAttributes = attributes.length;
  const searchTerm = search ? `&search=${search}` : '';
  return (
    <>
      {/* HEADER */}
      <section>
        <div className='flex justify-between items-center'>
          <h4 className='font-medium text-lg'>
            {totalAttributes} attribute{totalAttributes > 1 && 's'}
          </h4>
          <div className='flex gap-x-4'>
            <Button
              variant={layout === 'grid' ? 'default' : 'ghost'}
              size='icon'
              asChild
            >
              <Link href={`/game/attributes?layout=grid${searchTerm}`}>
                <LuLayoutGrid />
              </Link>
            </Button>
            <Button
              variant={layout === 'list' ? 'default' : 'ghost'}
              size='icon'
              asChild
            >
              <Link href={`/game/attributes?layout=list${searchTerm}`}>
                <LuList />
              </Link>
            </Button>
          </div>
        </div>
        <Separator className='mt-4' />
      </section>
      {/* PRODUCTS */}
      <div>
        {totalAttributes === 0 ? (
          <h5 className='text-2xl mt-16'>
            Sorry, no attributes matched your search...
          </h5>
        ) : layout === 'grid' ? (
          <GameAttributesGrid attributes={attributes} />
        ) : (
          <GameAttributesList attributes={attributes} />
        )}
      </div>
    </>
  );
}