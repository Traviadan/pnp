import { type Character, FavoriteWithoutUser } from '@/lib/schemas';
import Link from 'next/link';
import { Card, CardContent } from '../ui/card';
import FavoriteToggleButton from './FavoriteToggleButton';

type GridParameter = {
  characters?: Character[],
  favorites?: FavoriteWithoutUser[],
}

export function CharactersGrid({ params }: { params: GridParameter }) {
  const { characters, favorites} = params;
  let characterArray = Array();
  if (favorites) {
    favorites.map((row) => {
      characterArray.push(row.character)
    })
  } else {
    characterArray = Array(characters);
  }

  return (
    <div className='pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
      {characterArray.map((character) => {
        const { name } = character;
        const characterId = character.id;

        return (
          <article key={characterId} className='group relative'>
            <Link href={`/heroes/${characterId}`}>
              <Card className='transform group-hover:shadow-xl transition-shadow duration-500'>
                <CardContent className='p-4'>
                  <div className='mt-4 text-center'>
                    <h2 className='text-lg capitalize'>{name}</h2>
                  </div>
                </CardContent>
              </Card>
            </Link>
            <div className='absolute top-7 right-7 z-5'>
              <FavoriteToggleButton characterId={characterId} />
            </div>
          </article>
        );
      })}
    </div>
  );
}
