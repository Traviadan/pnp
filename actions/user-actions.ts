'use server';

import { prisma } from '@/lib/db';

export const findSingleUser = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      name: userId,
    },
  });
  return user;
};