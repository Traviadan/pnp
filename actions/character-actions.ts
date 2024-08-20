'use server';

import db from '@/lib/db';
import { redirect } from 'next/navigation';
import { currentUser, renderError } from '@/lib/helper';
import { 
  Character,
  Attribute,
  validateWithZodSchema
} from '@/lib/schemas';
import { revalidatePath } from 'next/cache';

export const fetchAllCharacters = ({ search = '' }: { search: string }) => {
  return db.character.findMany({
    where: {
      name: { contains: search, mode: 'insensitive' }
    },
    include: {
      user: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
};

export const fetchCharacterWithDetails = ({ search = '' }: { search: string }) => {
  return db.character.findMany({
    where: {
      name: { contains: search }
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
};


export const fetchAdminCharacters = () => {
  return db.character.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      user: true,
      attributes: true,
      skills: true
    }
  });
};

export const fetchSingleCharacter = async ({ characterId }: {characterId: string}) => {
  const character = await db.character.findUnique({
    where: {
      id: parseInt(characterId),
    },
    include: {
      notes: true,
      attributes: {
        include: {
          gameAttribute: true,
        }
      },
      skills: true,
      favorite: true,
    }
  });
  if (!character) {
    redirect('/heroes');
  }
  return character;
};

export const createCharacterAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  const user = await currentUser();
  if (user) {
    try {
      const rawData = Object.fromEntries(formData);
      const valId = validateWithZodSchema(
        Character.pick({ metatypeId: true }),
        rawData
      );
      const valFields = validateWithZodSchema(
        Character.pick({ name: true, finished: true}),
        rawData
      );
  
      await db.character.create({
        data: {
          ...valFields,
          userId: user.id,
          metatypeId: valId.metatypeId,
        },
      });
    } catch (error) {
      return renderError(error);
    }
  }
  redirect('/heroes');
};

export const updateCharacterAction = async (
  prevState: any,
  formData: FormData
) => {
  try {
    const rawData = Object.fromEntries(formData);
    const valId  = validateWithZodSchema(
      Character.pick({ id: true }),
      rawData
    );
    const valFields = validateWithZodSchema(
      Character.pick({ name: true, finished: true }),
      rawData
    );

    await db.character.update({
      where: {
        id: valId.id,
      },
      data: {
        ...valFields,
      },
    });
    revalidatePath(`/heroes/${valId.id}`);
    return { message: 'character updated successfully' };
  } catch (error) {
    return renderError(error);
  }
};

export const updateAttributeHandler = async (
  {entryId, listId, ...props}: {entryId: number, listId?: number, props: { value: number}}
) => {
  try {
    const valId = validateWithZodSchema(
      Attribute.pick({ id: true }),
      entryId
    );
    const validatedFields = validateWithZodSchema(
      Attribute.pick({ value:true, valueMax: true  }),
      props
    );

    await db.attribute.update({
      where: {
        id: valId.id,
      },
      data: {
        ...validatedFields
      }
    });
    return { message: 'attribute updated successfully' };
  } catch (error) {
    return renderError(error);
  }
};