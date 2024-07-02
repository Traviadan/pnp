'use server';

import db from '@/lib/db';
import { Prisma } from '@prisma/client';

export async function createUser(
  nameInput: string,
  emailInput: string,
  passwordInput: string,
) {
  let user: Prisma.UserCreateInput;
  user = { name: nameInput, email: emailInput, password: passwordInput };
  const createUser = await db.user.create({ data: user });
  return createUser;
}

export async function getUserByEmail(emailInput: string) {
  const user = await db.user.findUnique({
    where: {
      email: emailInput,
    },
  });
  return user;
}

export const findSingleUser = async (userId: number) => {
  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      groups: true
    }
  });
  return user;
};