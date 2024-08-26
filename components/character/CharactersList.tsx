import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Character } from '@prisma/client';
import Container from '../global/Container';
import FavoriteToggleButton from './FavoriteToggleButton';

export function CharactersList({ characters }: { characters: Character[] }) {
  return (
    <div className='mt-12 grid gap-y-8'>
      {characters.map((character) => {
        const { id, name } = character;
        return (
          <Container key={id} className='group relative'>
            <Link href={`/heroes/${id}`}>
              <Card className='transform group-hover:shadow-xl transition-shadow duration-500'>
                <CardContent className='p-8 gap-y-4 grid md:grid-cols-3'>
                  <div>
                    <h2 className='text-xl font-semibold capitalize'>{name}</h2>
                  </div>
                </CardContent>
              </Card>
            </Link>
            <div className='absolute bottom-8 right-8 z-5'>
              <FavoriteToggleButton characterId={id} />
            </div>
          </Container>
        );
      })}
    </div>
  );
}
