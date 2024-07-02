import { GameAttribute } from '@prisma/client';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

export function GameAttributesGrid({ attributes }: { attributes: GameAttribute[] }) {
  return (
    <div className='pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
      {attributes.map((attribute) => {
        const { name } = attribute;
        const attributeId = attribute.id;

        return (
          <article key={attributeId} className='group relative'>
            <Link href={`/game/attributes/${attributeId}/edit`}>
              <Card className='transform group-hover:shadow-xl transition-shadow duration-500'>
                <CardContent className='p-4'>
                  <div className='mt-4 text-center'>
                    <h2 className='text-lg capitalize'>{name}</h2>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </article>
        );
      })}
    </div>
  );
}
