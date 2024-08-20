'use server';

import db from '@/lib/db';
import { redirect } from 'next/navigation';
import { getAdminUser, renderError } from '@/lib/helper';
import { 
  GameAttribute,
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

export const updateGameAttributeAction = async (
  prevState: any,
  formData: FormData
) => {
  await getAdminUser();
  try {
    const isDefault = formData.get('isdefault') ? true : false;
    const rawData = Object.fromEntries(formData);
    const validatedFields = validateWithZodSchema(GameAttribute, rawData);

    await db.gameAttribute.update({
      where: {
        id: validatedFields.id,
      },
      data: {
        ...validatedFields,
        isDefault: isDefault
      },
    });
    revalidatePath(`/admin/attributes`);
    return { message: 'Attribute updated successfully' };
  } catch (error) {
    return renderError(error);
  }
};