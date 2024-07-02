import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { GameAttribute } from '@prisma/client';

export function GameAttributesList({ attributes }: { attributes:GameAttribute[] }) {
  return (
    <div className='mt-12 grid gap-y-8'>
      {attributes.map((attribute) => {
        const { name } = attribute;
        const attributeId = attribute.id;
        return (
          <article key={attributeId} className='group relative'>
            <Link href={`/game/attribute/${attributeId}/edit`}>
              <Card className='transform group-hover:shadow-xl transition-shadow duration-500'>
                <CardContent className='p-8 gap-y-4 grid md:grid-cols-3'>
                  <div>
                    <h2 className='text-xl font-semibold capitalize'>{name}</h2>
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
