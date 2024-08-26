import { Prisma, PrismaClient } from '@prisma/client'
import { hashUserPassword } from '../lib/hash';

const prisma = new PrismaClient()

async function main() {
  await prisma.user.create({
    data: {
      name: 'Thorsten',
      email: 'thorsten@eggers-bhv.de',
      password: hashUserPassword('password'),
      groups: {
        connectOrCreate: {
          where: {
            name: 'Administrator'
          },
          create: {
            name: 'Administrator'
          }
        }
      }
    }
  });
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })