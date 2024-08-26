'use server';

import db from '@/lib/db';
import { redirect } from 'next/navigation';
import { currentUser, renderError } from '@/lib/helper';
import { 
  Character,
  Attribute,
  validateWithZodSchema
} from '@/lib/schemas';
import type { AttributeFormType, CharacterFormType } from '@/lib/schemas';
import { revalidatePath } from 'next/cache';
import sr_metatypes from '@/lib/sr_metatypes.json';

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
      attributes: { orderBy: { name: 'asc' }},
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
  rawData: CharacterFormType
): Promise<{ message: string }> => {
  const user = await currentUser();
  if (user) {
    var newId

    try {
      const valId = validateWithZodSchema(
        Character.pick({ metatypeId: true }),
        rawData
      );
      const valFields = validateWithZodSchema(
        Character.pick({ name: true, finished: true}),
        rawData
      );
      const metatypeAttribute = sr_metatypes.metatypes.find((row) => {
        row.id === valId.metatypeId
      })?.attribute
      if (!metatypeAttribute) return {message: 'Fehler beim anlegen!'}
      newId = await db.character.create({
        data: {
          ...valFields,
          userId: user.id,
          metatypeId: valId.metatypeId,
          attributes: {
            createMany: {
              data: metatypeAttribute.map((row) => {
                  return {name: row.id, value: row.value, valueMax: row.maxValue}
              })
            }
          }
        },
      });
    } catch (error) {
      return renderError(error);
    }
    redirect(`/heroes/${newId}`);
  }
  return { message: 'login needed!' };
};

export const updateCharacterAction = async (
  prevState: any,
  rawData: CharacterFormType
) => {
  try {
    const valId  = validateWithZodSchema(
      Character.pick({ id: true }),
      rawData
    );
    const valFields = validateWithZodSchema(
      Character.pick({ name: true, finished: true, metatypeId: true }),
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

export const updateAttributeAction = async (
  prevState: any,
  rawData: AttributeFormType
) => {
  try {
    const valId = validateWithZodSchema(
      Attribute.pick({ id: true }),
      rawData
    );
    const valFields = validateWithZodSchema(
      Attribute.pick({ value:true, valueMax: true  }),
      rawData
    );

    await db.attribute.update({
      where: {
        id: valId.id,
      },
      data: {
        ...valFields
      }
    });
    revalidatePath(`/heroes/${valId.id}`);
    return { message: 'attribute updated successfully' };
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