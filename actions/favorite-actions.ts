'use server';

import { prisma } from '@/lib/db';
import { currentUser, renderError } from '@/lib/helper';

export const fetchFavoriteId = async ({ characterId }: { characterId: number }) => {
  const user = await currentUser();
  if (user) {
    const favorite = await prisma.favorite.findFirst({
      where: {
        characterId: characterId,
        userId: user.id,
      },
      select: {
        id: true,
      },
    });
    return favorite?.id || null;
  }
  return null;
};

export const toggleFavoriteAction = async (prevState: {
  characterId: number;
  favoriteId: number | null;
}) => {
  const user = await currentUser();
  if (user) {
    const { characterId, favoriteId } = prevState;

    try {
      if (favoriteId) {
        await prisma.favorite.delete({
          where: {
            id: favoriteId,
          },
        });
      } else {
        await prisma.favorite.create({
          data: {
            characterId: characterId,
            userId: user.id,
          },
        });
      }
      return { message: favoriteId ? 'removed from faves' : 'added to faves' };
    } catch (error) {
      return renderError(error);
    }
  }
  return { message: 'no user logged in?' };
};

export const fetchUserFavorites = async () => {
  const user = await currentUser();
  if (user) {
    const favorites = await prisma.favorite.findMany({
      where: {
        userId: user.id,
      },
      include: {
        character: true,
      },
    });
    return favorites;
  }
};
