import { Character, FavoriteWithoutUser } from '@/lib/schemas';
import Link from 'next/link';
import { Card, CardContent } from '../ui/card';
import FavoriteToggleButton from './FavoriteToggleButton';
import Container from '../global/Container';

type GridParameter = {
  characters?: Character[],
  favorites?: FavoriteWithoutUser[],
}

export function CharactersGrid( 
  {characters, favorites}: {characters?: Character[], favorites?: FavoriteWithoutUser[]}) 
  {
  var characterArray: Character[] = Array<Character>() ;
  if (favorites) {
    favorites.map((row) => {
      characterArray.push(row.character)
    })
  } else if (characters) {
    characterArray = characters;
  }

  return (
    <div className='pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
      {characterArray.map((character) => {
        const { id, name } = character;
        return (
          <div key={id} className='group relative'>
            <Link href={`/heroes/${id}`}>
              <Card className='transform group-hover:shadow-xl transition-shadow duration-500'>
                <CardContent className='p-4'>
                  <div className='mt-4 text-center'>
                    <h2 className='text-lg capitalize'>{name}</h2>
                  </div>
                </CardContent>
              </Card>
            </Link>
            <div className='absolute top-7 right-7 z-5'>
              <FavoriteToggleButton characterId={id} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
