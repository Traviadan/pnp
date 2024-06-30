import { Character } from '@prisma/client';
import Link from 'next/link';
import { Card, CardContent } from '../ui/card';
import Image from 'next/image';
import FavoriteToggleButton from './FavoriteToggleButton';

export function CharactersGrid({ characters }: { characters: Character[] }) {
  return (
    <div className='pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
      {characters.map((character) => {
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
