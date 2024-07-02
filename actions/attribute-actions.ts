'use server';

import db from '@/lib/db';
import { redirect } from 'next/navigation';
import { currentUser, getAdminUser, renderError } from '@/lib/helper';
import { 
  gameAttributeSchema,
  validateWithZodSchema
 } from '@/lib/schemas';

export const fetchAllGameAttributes = ({ search = '' }: { search: string }) => {
  return db.gameAttribute.findMany({
    where: {
      name: { contains: search }
    },
    orderBy: {
      name: 'asc',
    },
  });
};

export const fetchGameAttributeDetails = async (attributeId: number) => {
  await getAdminUser();
  const attribute = await db.gameAttribute.findUnique({
    where: {
      id: attributeId,
    },
  });
  if (!attribute) redirect('/game/attributes');
  return attribute;
};

export const updateGameAttributeAction = async (
  prevState: any,
  formData: FormData
) => {
  await getAdminUser();
  try {
    const attributeId = parseInt(formData.get('id') as string);
    const rawData = Object.fromEntries(formData);
    const validatedFields = validateWithZodSchema(gameAttributeSchema, rawData);

    await db.gameAttribute.update({
      where: {
        id: attributeId,
      },
      data: {
        ...validatedFields,
      },
    });
    return { message: 'Product updated successfully' };
  } catch (error) {
    return renderError(error);
  }
};