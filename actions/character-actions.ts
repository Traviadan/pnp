'use server';

import { prisma } from '@/lib/db';
import { redirect } from 'next/navigation';
import { currentUser, renderError } from '@/lib/helper';
import { 
  characterSchema,
  validateWithZodSchema
 } from '@/lib/schemas';

export const fetchAllCharacters = ({ search = '' }: { search: string }) => {
  return prisma.character.findMany({
    where: {
      name: { contains: search }
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
};

export const fetchSingleCharacter = async (characterId: number) => {
  const character = await prisma.character.findUnique({
    where: {
      id: characterId,
    },
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
      const validatedFields = validateWithZodSchema(characterSchema, rawData);
  
      await prisma.character.create({
        data: {
          ...validatedFields,
          userId: user.id,
        },
      });
    } catch (error) {
      return renderError(error);
    }
  }
  redirect('/heroes');
};