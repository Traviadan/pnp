import { Prisma, PrismaClient } from '@prisma/client';

export async function createUser(
  nameInput: string,
  emailInput: string,
  passwordInput: string,
) {
  const prisma = new PrismaClient();
  let user: Prisma.UserCreateInput;
  user = { name: nameInput, email: emailInput, password: passwordInput };
  const createUser = await prisma.user.create({ data: user });
  return createUser;
}

export async function getUserByEmail(emailInput: string) {
  const prisma = new PrismaClient();
  const user = await prisma.user.findUnique({
    where: {
      email: emailInput,
    },
  });
  return user;
}
