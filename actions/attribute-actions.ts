'use server';

import db from '@/lib/db';
import { redirect } from 'next/navigation';
import { getAdminUser, renderError } from '@/lib/helper';
import { 
  validateWithZodSchema
} from '@/lib/schemas';
import { revalidatePath } from 'next/cache';

export const fetchAllGameAttributes = ({ search = '' }: { search: string }) => {
  return db.gameAttribute.findMany({
    where: {
      id: { contains: search }
    },
    orderBy: {
      id: 'asc',
    },
  });
};

export const fetchGameAttributeDetails = async (attributeId: string) => {
  await getAdminUser();
  const attribute = await db.gameAttribute.findUnique({
    where: {
      id: attributeId,
    },
  });
  if (!attribute) redirect('/admin/attributes');
  return attribute;
};

export const fetchAttributesOfCharacter = async (characterId: number) => {
  return await db.attribute.findMany({
    where: { characterId: characterId },
    orderBy: { name: 'asc' },
  })
}